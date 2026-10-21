import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/constants";

describe("sitemap emission", () => {
  it("emits exploration routes and encoded CJK knowledge URLs", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    expect(urls.has(`${SITE_URL}/search`)).toBe(true);
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

  it("lists each URL once and leaves out index paths that only redirect", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const redirecting of [
      "/random",
      "/universe-physics/universe",
      "/universe-physics/physics",
      "/human-history/events",
      "/human-history/eras",
      "/cosmology/universe",
    ]) {
      expect(urls).not.toContain(`${SITE_URL}${redirecting}`);
    }
  });

  it("lists the history event, figure and era detail pages", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(
      `${SITE_URL}/human-history/figures/${encodeURIComponent("亚伯拉罕·林肯")}`
    );
    expect(urls.filter((url) => url.includes("/human-history/events/")).length).toBeGreaterThan(50);
    expect(urls).toContain(`${SITE_URL}/human-history/eras/classical`);
  });
});
