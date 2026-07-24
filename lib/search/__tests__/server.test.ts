import { describe, expect, it } from "vitest";
import { searchEverything } from "../server";

describe("searchEverything", () => {
  it("returns nothing for a blank query", async () => {
    const result = await searchEverything("");
    expect(result.titleResults).toEqual([]);
    expect(result.bodyResults).toEqual([]);
    expect(result.total).toBe(0);
  });

  it("finds articles whose title matches mid-word", async () => {
    const { titleResults } = await searchEverything("热力学");
    expect(titleResults.length).toBeGreaterThan(0);
    expect(titleResults.every((r) => r.url.startsWith("/"))).toBe(true);
  });

  it("finds articles that only mention the phrase in their prose", async () => {
    const { bodyResults } = await searchEverything("热力学第二定律");
    expect(bodyResults.length).toBeGreaterThan(0);
    expect(bodyResults.every((r) => typeof r.snippet === "string")).toBe(true);
  });

  it("never lists the same article in both tiers", async () => {
    const { titleResults, bodyResults } = await searchEverything("熵");
    const titles = new Set(titleResults.map((r) => r.url));
    expect(bodyResults.filter((r) => titles.has(r.url))).toEqual([]);
  });

  it("restricts results to one domain when asked", async () => {
    const { titleResults, bodyResults } = await searchEverything("演化", "life-science");
    expect(titleResults.length + bodyResults.length).toBeGreaterThan(0);
    for (const hit of [...titleResults, ...bodyResults]) {
      expect(hit.section).toBe("life-science");
    }
  });

  it("counts how many results each domain has, for the facet list", async () => {
    const { facets } = await searchEverything("科学");
    expect(facets.length).toBeGreaterThan(0);
    expect(facets.every((f) => f.count > 0)).toBe(true);
    // Sorted so the richest domain leads.
    expect(facets.map((f) => f.count)).toEqual(
      [...facets.map((f) => f.count)].sort((a, b) => b - a)
    );
  });

  it("reports facet counts for the whole query, not just the filtered domain", async () => {
    const all = await searchEverything("科学");
    const filtered = await searchEverything("科学", "philosophy");
    expect(filtered.facets.map((f) => f.section)).toEqual(all.facets.map((f) => f.section));
  });
});
