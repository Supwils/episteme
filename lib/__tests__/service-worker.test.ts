import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * public/sw.js is a hand-written file served verbatim to the browser, so it
 * can't import a tested module. Instead we load the shipped bytes and exercise
 * their pure decision functions directly — the test runs the real code, not a
 * copy. The file's top-level addEventListener calls run against a mock self.
 */
type Classification = "passthrough" | "navigation" | "immutable" | "asset";
interface SwExports {
  classify(url: URL, isNavigate: boolean, origin: string): Classification;
  trimCacheKeys(keys: string[], limit: number): string[];
}

let sw: SwExports;

beforeAll(() => {
  const source = readFileSync(join(process.cwd(), "public", "sw.js"), "utf-8");
  const mockSelf = {
    addEventListener() {},
    skipWaiting() {},
    clients: { claim() {} },
    location: { origin: "https://episteme.example" },
    registration: {},
  };
  const factory = new Function("self", "caches", `${source}\n;return { classify, trimCacheKeys };`);
  sw = factory(mockSelf, undefined) as SwExports;
});

const origin = "https://episteme.example";
const url = (path: string, o = origin) => new URL(path, o);

describe("service worker request classification", () => {
  it("never intercepts API requests, so /api/search keeps its own caching", () => {
    expect(sw.classify(url("/api/search?q=x"), false, origin)).toBe("passthrough");
    expect(sw.classify(url("/api/daily"), false, origin)).toBe("passthrough");
  });

  it("never intercepts cross-origin requests", () => {
    expect(sw.classify(url("https://fonts.gstatic.com/a.woff2"), false, origin)).toBe(
      "passthrough"
    );
    expect(sw.classify(url("https://api.iconify.design/x.svg"), false, origin)).toBe("passthrough");
  });

  it("treats page navigations as navigations", () => {
    expect(sw.classify(url("/philosophy/thinkers/socrates"), true, origin)).toBe("navigation");
    expect(sw.classify(url("/sociology"), true, origin)).toBe("navigation");
  });

  it("serves content-hashed build assets cache-first", () => {
    expect(sw.classify(url("/_next/static/chunks/abc123.js"), false, origin)).toBe("immutable");
    expect(sw.classify(url("/_next/static/media/font.woff2"), false, origin)).toBe("immutable");
  });

  it("treats unhashed static assets as revalidating assets", () => {
    expect(sw.classify(url("/icons/icon-192.png"), false, origin)).toBe("asset");
    expect(sw.classify(url("/search-index.json"), false, origin)).toBe("asset");
    expect(sw.classify(url("/link-previews.json"), false, origin)).toBe("asset");
  });

  it("passes through anything it has no strategy for", () => {
    expect(sw.classify(url("/some/unknown/thing"), false, origin)).toBe("passthrough");
  });
});

describe("service worker cache eviction", () => {
  it("keeps the newest entries and drops the oldest beyond the limit", () => {
    const keys = ["a", "b", "c", "d", "e"]; // Cache.keys() is insertion order, oldest first
    expect(sw.trimCacheKeys(keys, 3)).toEqual(["a", "b"]);
  });

  it("drops nothing when within the limit", () => {
    expect(sw.trimCacheKeys(["a", "b"], 5)).toEqual([]);
    expect(sw.trimCacheKeys(["a", "b", "c"], 3)).toEqual([]);
  });

  it("handles an empty cache", () => {
    expect(sw.trimCacheKeys([], 10)).toEqual([]);
  });
});
