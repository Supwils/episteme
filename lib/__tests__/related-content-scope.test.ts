import { describe, expect, it } from "vitest";
import { philosophyRelations } from "@/lib/philosophy-relations";

/**
 * `lib/cross-references` scans `content/philosophy` only, yet <RelatedContent>
 * is rendered by mathematics, life-science and every engine domain. Without a
 * domain guard a future slug collision (say a `justice` in both philosophy and
 * political-science) would silently show philosophy links on a politics page.
 */
describe("philosophyRelations", () => {
  it("resolves related items and back-references for philosophy articles", () => {
    const { related, backRefs } = philosophyRelations("kant", "philosophy");
    expect(related.length + backRefs.length).toBeGreaterThan(0);
  });

  it("treats an unspecified domain as philosophy (the legacy call shape)", () => {
    const withDomain = philosophyRelations("kant", "philosophy");
    const withoutDomain = philosophyRelations("kant", undefined);
    expect(withoutDomain.related.map((i) => i.slug)).toEqual(withDomain.related.map((i) => i.slug));
  });

  it("returns nothing for a non-philosophy domain even when the slug exists", () => {
    // "kant" resolves inside the philosophy index; a politics page asking for
    // the same slug must not inherit philosophy's relations.
    const { related, backRefs } = philosophyRelations("kant", "political-science");
    expect(related).toEqual([]);
    expect(backRefs).toEqual([]);
  });
});
