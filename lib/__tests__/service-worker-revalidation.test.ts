import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((accept, decline) => {
    resolve = accept;
    reject = decline;
  });
  return { promise, resolve, reject };
}

function dispatchAsset(hasCache = true) {
  const network = deferred<Response>();
  const write = deferred<void>();
  const cached = new Response("cached");
  const cache = {
    match: vi.fn().mockResolvedValue(hasCache ? cached : undefined),
    put: vi.fn().mockReturnValue(write.promise),
  };
  const event = {
    request: new Request("https://episteme.example/fonts/cormorant.woff2"),
    respondWith: vi.fn<(response: Promise<Response>) => void>(),
    waitUntil: vi.fn<(work: Promise<unknown>) => void>(),
  };
  const listeners = new Map<string, (value: typeof event) => void>();
  const self = {
    location: { origin: "https://episteme.example" },
    addEventListener: (type: string, listener: (value: typeof event) => void) =>
      listeners.set(type, listener),
  };
  new Function("self", "caches", "fetch", readFileSync("public/sw.js", "utf8"))(
    self,
    { open: async () => cache },
    () => network.promise
  );
  listeners.get("fetch")!(event);
  return { event, network, write, cached, cache };
}

describe("service worker revalidation lifetime", () => {
  it("delivers an uncached network response before cache persistence finishes", async () => {
    const { event, network, write, cache } = dispatchAsset(false);
    const fresh = new Response("fresh");
    const delivered = vi.fn();
    void event.respondWith.mock.calls[0]![0].then(delivered);
    network.resolve(fresh);
    await vi.waitFor(() => expect(cache.put).toHaveBeenCalled());
    expect(delivered).toHaveBeenCalledWith(fresh);
    write.resolve();
    await event.waitUntil.mock.calls[0]![0];
  });

  it("registers lifetime synchronously and keeps it pending through fetch and cache.put", async () => {
    const { event, network, write, cached, cache } = dispatchAsset();
    expect(event.waitUntil).toHaveBeenCalledTimes(1);
    const lifetime = event.waitUntil.mock.calls[0]![0];
    let complete = false;
    void lifetime.then(() => {
      complete = true;
    });
    expect(await event.respondWith.mock.calls[0]![0]).toBe(cached);
    expect(complete).toBe(false);
    network.resolve(new Response("fresh"));
    await vi.waitFor(() => expect(cache.put).toHaveBeenCalled());
    expect(complete).toBe(false);
    write.resolve();
    await lifetime;
    expect(complete).toBe(true);
  });

  it.each(["network", "write"] as const)(
    "settles background %s failure without rejecting lifetime",
    async (failure) => {
      const { event, network, write, cached, cache } = dispatchAsset();
      expect(event.waitUntil).toHaveBeenCalledTimes(1);
      expect(await event.respondWith.mock.calls[0]![0]).toBe(cached);
      if (failure === "network") network.reject(new Error("offline"));
      else {
        network.resolve(new Response("fresh"));
        await vi.waitFor(() => expect(cache.put).toHaveBeenCalled());
        write.reject(new Error("quota"));
      }
      await expect(event.waitUntil.mock.calls[0]![0]).resolves.toBeUndefined();
    }
  );
});
