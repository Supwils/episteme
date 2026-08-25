import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/constants";

describe("sitemap emission", () => {
  it("emits exploration routes and encoded CJK knowledge URLs", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    expect(urls.has(`${SITE_URL}/search`)).toBe(true);
    expect(urls.has(`${SITE_URL}/random`)).toBe(true);
    expect(urls.has(`${SITE_URL}/molecules`)).toBe(true);
    expect(urls.has(`${SITE_URL}/life-science/tree/bacteria`)).toBe(true);
    expect(urls.has(`${SITE_URL}/life-science/species/naked-mole-rat`)).toBe(true);
    expect(
      [...urls].some(
        (url) =>
          url.includes("/economics/knowledge-base/") &&
          url !== `${SITE_URL}/economics/knowledge-base`
      )
    ).toBe(true);
    const encodedHistoryKb = [...urls].filter(
      (url) => url.includes("/human-history/knowledge/") && url.includes("%")
    );
    expect(encodedHistoryKb.length).toBeGreaterThan(10);
  });
});
