import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadEngine } from "../engine";
import { SEARCH_INDEX_VERSION, type SearchIndexArtifact } from "../types";

/**
 * The gate that keeps Chinese search working.
 *
 * MiniSearch's default tokenizer splits on whitespace and punctuation, which a
 * Chinese sentence has none of, so a whole clause becomes one term and recall on
 * mid-token queries measured 9%. Any change that reverts the tokenizer, the
 * index depth or the search options shows up here as a recall collapse rather
 * than as a silent product regression.
 *
 * Ground truth is derived from the shipped artifact instead of hand-labelled, so
 * it keeps covering new content automatically. Selection is deterministic.
 */
const artifact = JSON.parse(
  readFileSync("public/search-index.json", "utf-8")
) as SearchIndexArtifact;

const engine = loadEngine(artifact);

interface Case {
  query: string;
  url: string;
}

/** Titles sliced away from their first character — the query shape that the
 *  default tokenizer cannot answer. Only titles whose slice is unique across the
 *  whole corpus become cases, so "correct" is unambiguous. */
function midTitleCases(stride: number, limit: number): Case[] {
  const cases: Case[] = [];
  const titles = artifact.docs.map((d) => d.t);
  for (let i = 0; i < artifact.docs.length && cases.length < limit; i += stride) {
    const doc = artifact.docs[i]!;
    const han = doc.t.replace(/[^\p{Script=Han}]/gu, "");
    if (han.length < 6) continue;
    const query = han.slice(2, 6);
    if (titles.filter((t) => t.includes(query)).length !== 1) continue;
    cases.push({ query, url: doc.u });
  }
  return cases;
}

function recallAt(cases: Case[], k: number): number {
  const found = cases.filter((c) =>
    engine
      .search(c.query, k)
      .slice(0, k)
      .some((hit) => hit.url === c.url)
  ).length;
  return found / cases.length;
}

describe("search index artifact", () => {
  it("is the version the code expects", () => {
    expect(artifact.v).toBe(SEARCH_INDEX_VERSION);
  });

  it("covers every knowledge domain", () => {
    const sections = new Set(artifact.docs.map((d) => d.c));
    expect(sections.size).toBeGreaterThanOrEqual(15);
    expect(artifact.docs.length).toBeGreaterThan(2000);
  });
});

describe("Chinese recall", () => {
  const cases = midTitleCases(7, 200);

  it("builds a meaningful ground-truth set", () => {
    expect(cases.length).toBeGreaterThanOrEqual(100);
  });

  it("finds an article from a query that starts mid-title", () => {
    // Measured 100% with bigram tokenization, 9% with MiniSearch's default.
    expect(recallAt(cases, 5)).toBeGreaterThanOrEqual(0.95);
  });

  it("ranks the exact article first for a full title", () => {
    const sample = artifact.docs.filter((_, i) => i % 97 === 0).slice(0, 20);
    const top1 = sample.filter((doc) => engine.search(doc.t, 1)[0]?.url === doc.u).length;
    expect(top1 / sample.length).toBeGreaterThanOrEqual(0.9);
  });
});

describe("search behaviour", () => {
  it("returns nothing for a blank query instead of everything", () => {
    expect(engine.search("", 5)).toEqual([]);
    expect(engine.search("   ", 5)).toEqual([]);
  });

  it("respects the requested result limit", () => {
    expect(engine.search("学", 3).length).toBeLessThanOrEqual(3);
  });

  it("matches a Latin term case-insensitively", () => {
    const upper = engine.search("DNA", 10).map((h) => h.url);
    const lower = engine.search("dna", 10).map((h) => h.url);
    expect(upper.length).toBeGreaterThan(0);
    expect(lower).toEqual(upper);
  });
});
