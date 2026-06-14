import { describe, it, expect } from "vitest";
import { getAllContent, getBackReferences, findBySlug } from "../cross-references";
import { APP_URLS } from "../urls";

describe("philosophy cross-references", () => {
  it("getAllContent returns non-empty array", () => {
    const content = getAllContent();
    expect(content.length).toBeGreaterThan(0);
  });

  it("getAllContent items have required fields", () => {
    for (const item of getAllContent()) {
      expect(item.slug.length).toBeGreaterThan(0);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.category).toMatch(/^(thinker|school|ism|experiment|question|concept)$/);
      expect(Array.isArray(item.related)).toBe(true);
    }
  });

  it("getBackReferences returns related items for a known slug", () => {
    const allContent = getAllContent();
    let foundBackRefs = false;

    for (const item of allContent) {
      const backRefs = getBackReferences(item.slug);
      if (backRefs.length > 0) {
        foundBackRefs = true;
        for (const ref of backRefs) {
          expect(ref.slug).not.toBe(item.slug);
        }
        break;
      }
    }

    expect(foundBackRefs).toBe(true);
  });

  it("handles missing slugs gracefully", () => {
    const result = getBackReferences("nonexistent-slug-xyz");
    expect(result).toEqual([]);
  });

  it("findBySlug returns undefined for missing slug", () => {
    expect(findBySlug("nonexistent-xyz")).toBeUndefined();
  });

  it("findBySlug returns item for valid slug", () => {
    const allContent = getAllContent();
    const first = allContent[0]!;
    const found = findBySlug(first.slug);
    expect(found).toBeDefined();
    expect(found!.slug).toBe(first.slug);
  });

  it("no duplicate slugs within the same category", () => {
    const byCategory = new Map<string, string[]>();
    for (const item of getAllContent()) {
      const list = byCategory.get(item.category) ?? [];
      list.push(item.slug);
      byCategory.set(item.category, list);
    }
    for (const [, slugs] of byCategory) {
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("URL constants", () => {
  it("all section URLs start with /", () => {
    for (const url of Object.values(APP_URLS)) {
      expect(url.startsWith("/")).toBe(true);
    }
  });

  it("no trailing slashes", () => {
    for (const url of Object.values(APP_URLS)) {
      expect(url.endsWith("/")).toBe(false);
    }
  });

  it("no double slashes in URLs", () => {
    for (const url of Object.values(APP_URLS)) {
      expect(url).not.toMatch(/\/\//);
    }
  });

  it("APP_URLS has expected keys", () => {
    expect(Object.keys(APP_URLS).sort()).toEqual([
      "computer-science",
      "cosmology",
      "economics",
      "human-history",
      "knowledge-graph",
      "life-science",
      "mathematics",
      "philosophy",
      "political-science",
      "psychology",
      "universe-physics",
    ]);
  });
});
