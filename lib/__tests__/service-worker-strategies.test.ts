import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

type Strategy = "networkFirst" | "cacheFirst" | "staleWhileRevalidate";
const strategies: Strategy[] = ["networkFirst", "cacheFirst", "staleWhileRevalidate"];
const request = new Request("https://episteme.example/article");
const source = readFileSync("public/sw.js", "utf8");

function harness() {
  const match = vi
    .fn<(key: RequestInfo) => Promise<Response | undefined>>()
    .mockResolvedValue(undefined);
  const cache = {
    match,
    put: vi.fn().mockResolvedValue(undefined),
    keys: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(true),
  };
  const storage = { match, open: vi.fn().mockResolvedValue(cache) };
  const fresh = new Response("fresh", { headers: { "x-test": "network" } });
  const fetch = vi.fn().mockResolvedValue(fresh);
  const factory = new Function(
    "self",
    "caches",
    "fetch",
    `${source}\nreturn { networkFirst, cacheFirst,
      staleWhileRevalidate: (request, name) => staleWhileRevalidate(request, name).response };`
  );
  const sw = factory({ addEventListener() {} }, storage, fetch) as Record<
    Strategy,
    (request: Request, name: string, limit?: number) => Promise<Response>
  >;
  return { sw, storage, cache, fetch, fresh };
}

describe.each(strategies)("service worker %s", (strategy) => {
  it.each(["open", "match", "put"] as const)(
    "keeps a successful network response when cache %s fails",
    async (operation) => {
      const { sw, storage, cache, fresh } = harness();
      const method = operation === "open" ? storage.open : cache[operation];
      method.mockRejectedValue(new Error("storage unavailable"));
      const response = await sw[strategy](request, "cache", 60);
      expect(response).toBe(fresh);
      expect(response.headers.get("x-test")).toBe("network");
      expect(await response.text()).toBe("fresh");
    }
  );

  it("returns HTTP errors unchanged without caching them", async () => {
    const { sw, fetch, cache } = harness();
    const missing = new Response("missing", { status: 404 });
    fetch.mockResolvedValue(missing);
    expect(await sw[strategy](request, "cache")).toBe(missing);
    expect(cache.put).not.toHaveBeenCalled();
  });

  it("returns 503 when both the network and cache are unavailable", async () => {
    const { sw, fetch, cache } = harness();
    fetch.mockRejectedValue(new Error("offline"));
    cache.match.mockRejectedValue(new Error("cache failure"));
    expect((await sw[strategy](request, "cache")).status).toBe(503);
  });

  it("stores a clone without consuming the network response body", async () => {
    const { sw, cache, fresh } = harness();
    expect(await sw[strategy](request, "cache")).toBe(fresh);
    const stored = cache.put.mock.calls[0]?.[1] as Response;
    expect(stored).not.toBe(fresh);
    expect(await stored.text()).toBe("fresh");
    expect(await fresh.text()).toBe("fresh");
  });
});

describe("navigation fallback and maintenance", () => {
  it.each(["keys", "delete"] as const)(
    "keeps fresh navigation when trimming %s fails",
    async (operation) => {
      const { sw, cache, fresh } = harness();
      cache.keys.mockResolvedValue(Array.from({ length: 61 }, (_, index) => String(index)));
      cache[operation].mockRejectedValue(new Error("maintenance failed"));
      expect(await sw.networkFirst(request, "pages", 60)).toBe(fresh);
    }
  );

  it("still evicts only the oldest page above the 60-page limit", async () => {
    const { sw, cache } = harness();
    cache.keys.mockResolvedValue(Array.from({ length: 61 }, (_, index) => String(index)));
    await sw.networkFirst(request, "pages", 60);
    expect(cache.delete.mock.calls).toEqual([["0"]]);
  });

  it("falls back to the requested page when offline", async () => {
    const { sw, cache, fetch } = harness();
    const saved = new Response("saved page");
    cache.match.mockResolvedValue(saved);
    fetch.mockRejectedValue(new Error("offline"));
    expect(await sw.networkFirst(request, "pages")).toBe(saved);
  });

  it("tries the homepage even if reading the requested page fails", async () => {
    const { sw, cache, fetch } = harness();
    const home = new Response("home");
    cache.match.mockImplementation(async (key) => {
      if (key === "/") return home;
      throw new Error("bad cached page");
    });
    fetch.mockRejectedValue(new Error("offline"));
    expect(await sw.networkFirst(request, "pages")).toBe(home);
  });

  it.each(["cacheFirst", "staleWhileRevalidate"] as const)(
    "never serves homepage HTML as an offline asset in %s",
    async (strategy) => {
      const { sw, cache, fetch } = harness();
      cache.match.mockImplementation(async (key) =>
        key === "/" ? new Response("home") : undefined
      );
      fetch.mockRejectedValue(new Error("offline"));
      expect((await sw[strategy](request, "assets")).status).toBe(503);
    }
  );
});

describe("stale asset revalidation", () => {
  it("returns cached content without waiting for the network or a failing cache write", async () => {
    const { sw, cache, fetch, fresh } = harness();
    const stale = new Response("stale");
    cache.match.mockResolvedValue(stale);
    let release!: (response: Response) => void;
    fetch.mockReturnValue(
      new Promise<Response>((resolve) => {
        release = resolve;
      })
    );
    cache.put.mockRejectedValue(new Error("quota exceeded"));
    expect(await sw.staleWhileRevalidate(request, "assets")).toBe(stale);
    release(fresh);
    await vi.waitFor(() => expect(cache.put).toHaveBeenCalled());
  });

  it("keeps an existing asset when background revalidation returns 404", async () => {
    const { sw, cache, fetch } = harness();
    const stale = new Response("stale");
    cache.match.mockResolvedValue(stale);
    fetch.mockResolvedValue(new Response("missing", { status: 404 }));
    expect(await sw.staleWhileRevalidate(request, "assets")).toBe(stale);
    expect(cache.put).not.toHaveBeenCalled();
  });
});
