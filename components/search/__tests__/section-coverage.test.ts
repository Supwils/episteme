import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SEARCH_NO_RESULTS_EXITS, SEARCH_SECTIONS, SECTION_META, TYPE_LABELS } from "../types";
import { buildValidRoutes } from "@/scripts/valid-routes";
import type { SearchIndexArtifact } from "@/lib/search/types";

/**
 * The search dialog groups hits by section and drops anything it has no
 * metadata for. Sociology and linguistics shipped as full subjects while this
 * list still had thirteen entries, so 78 articles were silently unreachable by
 * search. These assertions turn that into a failing test instead.
 */
const artifact = JSON.parse(
  readFileSync("public/search-index.json", "utf-8")
) as SearchIndexArtifact;

describe("search result grouping", () => {
  it("can render every section present in the index", () => {
    const indexed = [...new Set(artifact.docs.map((d) => d.c))].sort();
    const renderable = Object.keys(SECTION_META).sort();
    expect(indexed.filter((s) => !renderable.includes(s))).toEqual([]);
  });

  it("lists every section it has metadata for", () => {
    expect([...SEARCH_SECTIONS].sort()).toEqual(Object.keys(SECTION_META).sort());
  });

  it("has a label for every content type in the index", () => {
    const kinds = [...new Set(artifact.docs.map((d) => d.k))].sort();
    expect(kinds.filter((k) => !(k in TYPE_LABELS))).toEqual([]);
  });
});

describe("search empty-result exits", () => {
  it("points only at real static routes", () => {
    const valid = buildValidRoutes();
    for (const exit of SEARCH_NO_RESULTS_EXITS) {
      expect(valid.has(exit.href), exit.href).toBe(true);
    }
  });

  it("includes the curiosities wall among curated exits", () => {
    expect(SEARCH_NO_RESULTS_EXITS.map((e) => e.href)).toContain("/curiosities");
  });

  it("is wired into the results page with a live article count", () => {
    const source = readFileSync("app/search/page.tsx", "utf-8");
    expect(source).toContain("SEARCH_NO_RESULTS_EXITS");
    expect(source).toContain("SEARCH_STATS.articles");
    expect(source).toContain("search-idle");
    expect(source).not.toContain("2200+");
  });

  it("is wired into the command palette empty state", () => {
    const source = readFileSync("components/GlobalSearch.tsx", "utf-8");
    expect(source).toContain("SEARCH_NO_RESULTS_EXITS");
    expect(source).toContain("/search?q=");
  });
});
