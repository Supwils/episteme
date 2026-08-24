import { afterEach, describe, expect, it, vi } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { listRandomArticleUrls, pickRandomArticleUrl } from "../random-article";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("pickRandomArticleUrl", () => {
  it("returns a real search-index article route, not a fallback shell", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const url = pickRandomArticleUrl();
    expect(url.startsWith("/")).toBe(true);
    expect(url).not.toBe("/daily");
    expect(url).not.toBe("/random");
    expect(buildValidRoutes().has(url)).toBe(true);
  });

  it("covers the far end of the pool as well", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);
    const url = pickRandomArticleUrl();
    expect(url.startsWith("/")).toBe(true);
    expect(buildValidRoutes().has(url)).toBe(true);
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
});
