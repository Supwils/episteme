import { afterEach, describe, expect, it, vi } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { listRandomArticleUrls, pickRandomArticleUrl, toRedirectLocation } from "../random-article";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("pickRandomArticleUrl", () => {
  it("returns a real search-index article route, not a fallback shell", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const urls = listRandomArticleUrls();
    expect(pickRandomArticleUrl()).toBe(urls[0]);
    expect(urls[0]).not.toBe("/daily");
    expect(buildValidRoutes().has(urls[0]!)).toBe(true);
  });

  it("covers the far end of the pool as well", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);
    const urls = listRandomArticleUrls();
    expect(pickRandomArticleUrl()).toBe(urls[urls.length - 1]);
    expect(buildValidRoutes().has(urls.at(-1)!)).toBe(true);
  });

  it("falls back to /daily when the index draw is out of range", () => {
    vi.spyOn(Math, "random").mockReturnValue(1);
    expect(pickRandomArticleUrl()).toBe("/daily");
  });

  it("never lands on a domain homepage or a one-segment shell", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const url = pickRandomArticleUrl();
    expect(url.split("/").filter(Boolean).length).toBeGreaterThanOrEqual(3);
  });

  it("draws from thinkers and knowledge-base pages, not only generic entries", () => {
    const urls = listRandomArticleUrls();
    expect(urls.length).toBeGreaterThan(2000);
    expect(urls.some((u) => u.startsWith("/philosophy/thinkers/"))).toBe(true);
    expect(urls.some((u) => u.includes("/knowledge-base/"))).toBe(true);
    expect(urls.every((u) => u.split("/").filter(Boolean).length >= 3)).toBe(true);
  });

  it("encodes CJK figure slugs but leaves knowledge-base CJK as UTF-8", () => {
    const urls = listRandomArticleUrls();
    const figures = urls.filter((u) => u.startsWith("/human-history/figures/"));
    const kbCjk = urls.find((u) => u.includes("/knowledge-base/") && /[\u4e00-\u9fff]/.test(u));
    expect(figures.length).toBeGreaterThan(0);
    expect(
      figures.every((u) => {
        const last = u.split("/").at(-1) ?? "";
        return last === encodeURIComponent(decodeURIComponent(last));
      })
    ).toBe(true);
    expect(kbCjk).toBeDefined();
    expect(kbCjk).toMatch(/[\u4e00-\u9fff]/);
    expect(kbCjk).not.toMatch(/%E/);

    const historyKb = urls.find(
      (u) => u.startsWith("/human-history/knowledge/") && /[\u4e00-\u9fff]/.test(u)
    );
    expect(historyKb).toBeDefined();
    expect(historyKb).not.toMatch(/%E/);
    expect(buildValidRoutes().has(historyKb!)).toBe(true);
  });

  it("makes every pool URL safe for a Location header", () => {
    const urls = listRandomArticleUrls();
    expect(urls.some((u) => /[\u4e00-\u9fff]/.test(u))).toBe(true);
    for (const url of urls) {
      const location = toRedirectLocation(url);
      expect(location).toMatch(/^[\x00-\x7F]+$/);
      expect(toRedirectLocation(location)).toBe(location);
    }
  });
});
