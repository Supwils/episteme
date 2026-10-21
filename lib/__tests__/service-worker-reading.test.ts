import { afterEach, describe, expect, it, vi } from "vitest";
import { readServiceWorkerSource } from "./service-worker-source";

const origin = "https://episteme.example";
const path = "/philosophy/thinkers/socrates";
const html =
  '<html><link rel="stylesheet" href="/_next/static/a.css"><script src="/_next/static/a.js"></script><h1>苏格拉底</h1></html>';
const documentResponse = (body = html, headers = {}) =>
  new Response(body, {
    headers: { "Content-Type": "text/html", ...headers },
  });

function harness() {
  const entries = new Map<string, Map<string, Response>>();
  const storage = {
    open: vi.fn(async (name: string) => {
      if (!entries.has(name)) entries.set(name, new Map());
      const cache = entries.get(name)!;
      return {
        match: async (request: Request) => cache.get(request.url)?.clone(),
        put: vi.fn(async (request: Request, response: Response) => {
          cache.set(request.url, response);
        }),
        keys: async () => [...cache.keys()],
        delete: async (request: Request) => cache.delete(request.url),
      };
    }),
  };
  const fetch = vi.fn(async (request: Request) =>
    request.url.endsWith(".css")
      ? new Response("body{}", { headers: { "Content-Type": "text/css" } })
      : request.url.endsWith(".js")
        ? new Response("void 0", { headers: { "Content-Type": "text/javascript" } })
        : documentResponse()
  );
  const listeners = new Map<string, (event: unknown) => void>();
  const self = {
    location: { origin },
    addEventListener: (type: string, fn: (event: unknown) => void) => listeners.set(type, fn),
  };
  const sw = new Function(
    "self",
    "caches",
    "fetch",
    readServiceWorkerSource() +
      "\nreturn { retainReadingPage, retainReading, boundedBody, readingAssets, readingPath, PAGES_CACHE, STATIC_CACHE, readingJobs };"
  )(self, storage, fetch) as {
    retainReadingPage(path: string, signal: AbortSignal): Promise<void>;
    retainReading(event: ReturnType<typeof message>): Promise<void> | undefined;
    boundedBody(response: Response, budget: { remaining: number }): Promise<Blob>;
    readingAssets(html: string): string[];
    readingPath(value: unknown): string | undefined;
    PAGES_CACHE: string;
    STATIC_CACHE: string;
    readingJobs: Map<string, { controller: AbortController }>;
  };
  const retained = () => entries.get(sw.PAGES_CACHE)?.get(origin + path);
  return { sw, entries, storage, fetch, retained, listeners };
}

function message(articlePath = path, id = "reader") {
  return {
    source: { type: "window", url: origin + "/philosophy/thinkers", id },
    data: { type: "episteme:retain-article", path: articlePath },
    waitUntil: vi.fn(),
  };
}

afterEach(() => vi.useRealTimers());

describe("soft-navigation offline companions", () => {
  it("keeps HTML only after missing bootstrap resources, without cookies or RSC headers", async () => {
    const { sw, fetch, retained, entries } = harness();
    await sw.retainReadingPage(path, new AbortController().signal);
    expect(await retained()?.text()).toContain("苏格拉底");
    expect(entries.get(sw.STATIC_CACHE)?.size).toBe(2);
    for (const [request] of fetch.mock.calls) {
      expect(request.credentials).toBe("omit");
      expect(request.redirect).toBe("error");
      expect(request.cache).toBe(request.headers.has("accept") ? "no-cache" : "force-cache");
      expect(request.headers.has("rsc")).toBe(false);
    }
    fetch.mockClear();
    await sw.retainReadingPage(path, new AbortController().signal);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it.each(["private", "no-store", "NO-CACHE"])(
    "removes an old public copy when HTML becomes %s",
    async (control) => {
      const { sw, fetch, retained } = harness();
      await sw.retainReadingPage(path, new AbortController().signal);
      fetch.mockResolvedValue(documentResponse("private", { "Cache-Control": control }));
      await sw.retainReadingPage(path, new AbortController().signal);
      expect(retained()).toBeUndefined();
    }
  );

  it.each(["text/x-component", "application/json"])(
    "never stores %s as a document",
    async (type) => {
      const { sw, fetch, retained } = harness();
      fetch.mockResolvedValue(new Response("not HTML", { headers: { "Content-Type": type } }));
      await sw.retainReadingPage(path, new AbortController().signal);
      expect(retained()).toBeUndefined();
    }
  );

  it("does not commit HTML when a bootstrap fetch fails", async () => {
    const { sw, fetch, retained } = harness();
    const original = fetch.getMockImplementation()!;
    fetch.mockImplementation(async (request) => {
      if (request.url.endsWith(".js")) throw new Error("connection lost");
      return original(request);
    });
    await expect(sw.retainReadingPage(path, new AbortController().signal)).rejects.toThrow();
    expect(retained()).toBeUndefined();
  });

  it("does not accept an HTML error page as a bootstrap script", async () => {
    const { sw, fetch, retained } = harness();
    fetch.mockResolvedValue(documentResponse());
    await expect(sw.retainReadingPage(path, new AbortController().signal)).rejects.toThrow("asset");
    expect(retained()).toBeUndefined();
  });

  it.each([
    "/api/search/private",
    "/_next/static/a.js",
    path + "?draft=1",
    path + "#notes",
    "https://other.example/a/b/c",
    "/daily",
  ])("rejects non-canonical target %s", (value) => {
    expect(harness().sw.readingPath(value)).toBeUndefined();
  });

  it("collects only document bootstrap assets, not preloads, images or external scripts", () => {
    const { sw } = harness();
    expect(
      sw.readingAssets(
        html +
          '<script src="/_next/static/../../api/private.js"></script>' +
          '<link rel="preload" href="/_next/static/not-used.js"><script src="https://other.example/x.js"></script><img src="/huge.png"><script src="/_next/static/a.js"></script>'
      )
    ).toEqual(["/_next/static/a.css", "/_next/static/a.js"]);
    expect(() =>
      sw.readingAssets(
        Array.from({ length: 49 }, (_, i) => `<script src="/_next/static/${i}.js"></script>`).join(
          ""
        )
      )
    ).toThrow("budget");
  });
});

describe("bounded reading work", () => {
  it("does not commit documents larger than the HTML budget", async () => {
    const { sw, fetch, retained } = harness();
    fetch.mockResolvedValue(documentResponse("x".repeat(1024 * 1024 + 1)));
    await expect(sw.retainReadingPage(path, new AbortController().signal)).rejects.toThrow(
      "budget"
    );
    expect(retained()).toBeUndefined();
  });

  it("bounds the total new bootstrap bytes rather than only each asset", async () => {
    const { sw, fetch, retained } = harness();
    const original = fetch.getMockImplementation()!;
    fetch.mockImplementation(async (request) =>
      request.url.endsWith(".css") || request.url.endsWith(".js")
        ? new Response(new Uint8Array(5 * 1024 * 1024), {
            headers: {
              "Content-Type": request.url.endsWith(".css") ? "text/css" : "text/javascript",
            },
          })
        : original(request)
    );
    await expect(sw.retainReadingPage(path, new AbortController().signal)).rejects.toThrow(
      "budget"
    );
    expect(retained()).toBeUndefined();
  });

  it("counts streamed bytes even without Content-Length and cancels oversized bodies", async () => {
    const cancel = vi.fn();
    const response = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(5));
          controller.enqueue(new Uint8Array(5));
        },
        cancel,
      })
    );
    await expect(harness().sw.boundedBody(response, { remaining: 8 })).rejects.toThrow("budget");
    expect(cancel).toHaveBeenCalledOnce();
  });

  it("checks declared size before reading the body", async () => {
    const cancel = vi.fn();
    const response = new Response(new ReadableStream({ cancel }), {
      headers: { "Content-Length": "100" },
    });
    await expect(harness().sw.boundedBody(response, { remaining: 8 })).rejects.toThrow("budget");
    expect(cancel).toHaveBeenCalledOnce();
  });

  it("accepts a real window client after History navigation, registers lifetime synchronously and deduplicates", async () => {
    const { sw, listeners, fetch } = harness();
    const event = message();
    listeners.get("message")!(event);
    expect(event.waitUntil).toHaveBeenCalledOnce();
    const work = event.waitUntil.mock.calls[0]![0];
    expect(sw.retainReading(event)).toBe(work);
    await work;
    expect(fetch).toHaveBeenCalled();
    expect(sw.readingJobs.size).toBe(0);
    expect(
      sw.retainReading({
        ...message(),
        source: { ...event.source, url: "https://foreign.example/" },
      })
    ).toBeUndefined();
  });

  it("allows two tabs and aborts obsolete work from the same reader", async () => {
    const { sw, fetch } = harness();
    fetch.mockImplementation(
      (request) =>
        new Promise((_resolve, reject) => {
          request.signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          });
        })
    );
    const first = sw.retainReading(message());
    const previous = sw.readingJobs.get("reader")!;
    const second = sw.retainReading(message(path, "second"));
    expect(sw.retainReading(message(path, "third"))).toBeUndefined();
    const replacement = sw.retainReading(message("/philosophy/thinkers/plato"));
    expect(previous.controller.signal.aborted).toBe(true);
    for (const job of sw.readingJobs.values()) job.controller.abort();
    await Promise.all([first, second, replacement]);
    expect(sw.readingJobs.size).toBe(0);
  });

  it("aborts the complete request when its deadline expires", async () => {
    vi.useFakeTimers();
    const { sw, fetch } = harness();
    fetch.mockImplementation(
      (request) =>
        new Promise((_resolve, reject) => {
          request.signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          });
        })
    );
    const work = sw.retainReading(message());
    await vi.advanceTimersByTimeAsync(20_000);
    await work;
    expect(sw.readingJobs.size).toBe(0);
  });

  it("keeps the deadline after headers while the document body is still streaming", async () => {
    vi.useFakeTimers();
    const { sw, fetch, retained } = harness();
    fetch.mockImplementation(
      async (request) =>
        new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode("<html>"));
              request.signal.addEventListener(
                "abort",
                () => controller.error(new Error("aborted")),
                { once: true }
              );
            },
          }),
          { headers: { "Content-Type": "text/html" } }
        )
    );
    const work = sw.retainReading(message());
    await vi.advanceTimersByTimeAsync(20_000);
    await work;
    expect(retained()).toBeUndefined();
    expect(sw.readingJobs.size).toBe(0);
  });
});
