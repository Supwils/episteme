import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SEARCH_SECTIONS, SECTION_META, TYPE_LABELS } from "../types";
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
