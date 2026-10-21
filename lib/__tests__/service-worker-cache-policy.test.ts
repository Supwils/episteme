import { readServiceWorkerSource } from "./service-worker-source";
import { describe, expect, it, vi } from "vitest";

const origin = "https://episteme.example";
const source = readServiceWorkerSource();

function harness(names: string[] = []) {
  const entries = new Map<string, Response>();
  const cache = {
    match: vi.fn(async (key: RequestInfo) => entries.get(typeof key === "string" ? key : key.url)),
    put: vi.fn(async (key: Request, response: Response) => {
      entries.set(key.url, response);
    }),
    delete: vi.fn(async (key: RequestInfo) =>
      entries.delete(typeof key === "string" ? key : key.url)
    ),
    keys: vi.fn(async () => [...entries.keys()]),
  };
  const storage = {
    match: vi.fn((key: RequestInfo) => cache.match(key)),
    open: vi.fn(async () => cache),
    keys: vi.fn(async () => names),
    delete: vi.fn<(name: string) => Promise<boolean>>().mockResolvedValue(true),
  };
  const listeners = new Map<string, (event: unknown) => void>();
  const self = {
    location: { origin },
    clients: { claim: vi.fn() },
    addEventListener: (type: string, handler: (event: unknown) => void) =>
      listeners.set(type, handler),
  };
  const fetch = vi.fn(async () => new Response("network"));
  const sw = new Function(
    "self",
    "caches",
    "fetch",
    `${source}\nreturn { storeResponse, readCached, networkFirst };`
  )(self, storage, fetch) as {
    storeResponse(
      request: Request,
      response: Response,
      name: string,
      limit?: number
    ): Promise<void>;
    readCached(request: Request, name: string): Promise<Response | undefined>;
    networkFirst(request: Request, name: string): Promise<Response>;
  };
  return { sw, cache, storage, entries, listeners, fetch, self };
}

describe("service worker persistence permissions", () => {
  it.each([
    "no-store",
    "PRIVATE, max-age=0",
    'public, no-cache="Set-Cookie"',
    "max-age=0, NO-STORE",
  ])(
    "does not retain a successful %s response, and removes a prior public copy",
    async (control) => {
      const { sw, cache, entries } = harness();
      const request = new Request(origin + "/page");
      entries.set(request.url, new Response("old public page"));
      await sw.storeResponse(
        request,
        new Response("private", { headers: { "Cache-Control": control } }),
        "pages",
        60
      );
      expect(cache.put).not.toHaveBeenCalled();
      expect(entries.has(request.url)).toBe(false);
    }
  );

  it.each<RequestInit>([
    { cache: "no-store" },
    { headers: { Authorization: "Bearer test" } },
    { headers: { "Cache-Control": "NO-STORE" } },
  ])("never reads or writes a cache for a non-persistent request: %j", async (options) => {
    const { sw, cache } = harness();
    const request = new Request(origin + "/page", options);
    await sw.storeResponse(request, new Response("fresh"), "pages");
    expect(await sw.readCached(request, "pages")).toBeUndefined();
    expect(cache.put).not.toHaveBeenCalled();
    expect(cache.match).not.toHaveBeenCalled();
  });
});

describe("cached entry validation", () => {
  it.each(["no-store", "private", "no-cache"])(
    "does not replay a cached %s response",
    async (control) => {
      const { sw, entries } = harness();
      const request = new Request(origin + "/daily");
      entries.set(request.url, new Response("old day", { headers: { "Cache-Control": control } }));
      expect(await sw.readCached(request, "pages")).toBeUndefined();
      expect(entries.has(request.url)).toBe(false);
    }
  );

  it("does not serve homepage HTML under an uncached article URL", async () => {
    const { sw, entries, fetch } = harness();
    entries.set("/", new Response("homepage"));
    fetch.mockRejectedValue(new Error("offline"));
    expect((await sw.networkFirst(new Request(origin + "/unseen-article"), "pages")).status).toBe(
      503
    );
  });

  it("does not search unrelated cache buckets for an offline fallback", async () => {
    const { sw, storage, fetch } = harness();
    storage.match.mockResolvedValue(new Response("foreign cached content"));
    fetch.mockRejectedValue(new Error("offline"));
    expect((await sw.networkFirst(new Request(origin + "/page"), "pages")).status).toBe(503);
    expect(storage.match).not.toHaveBeenCalled();
  });
});

describe("service worker cache ownership", () => {
  it.each(["keys", "delete"] as const)(
    "still claims clients when cache %s maintenance fails",
    async (method) => {
      const { listeners, storage, self } = harness(["pages-v3"]);
      storage[method].mockRejectedValue(new Error("storage unavailable"));
      let work!: Promise<void>;
      listeners.get("activate")!({
        waitUntil: (promise: Promise<void>) => {
          work = promise;
        },
      });
      await work;
      expect(self.clients.claim).toHaveBeenCalledOnce();
    }
  );
  it("retires legacy and old Episteme buckets while preserving unrelated caches", async () => {
    const { listeners, storage, self } = harness([
      "pages-v3",
      "assets-v2",
      "episteme-pages-v1",
      "unrelated-cache",
    ]);
    let work!: Promise<void>;
    listeners.get("activate")!({
      waitUntil: (promise: Promise<void>) => {
        work = promise;
      },
    });
    await work;
    expect(storage.delete.mock.calls.map(([name]) => name)).toEqual([
      "pages-v3",
      "assets-v2",
      "episteme-pages-v1",
    ]);
    expect(self.clients.claim).toHaveBeenCalledOnce();
  });
});
