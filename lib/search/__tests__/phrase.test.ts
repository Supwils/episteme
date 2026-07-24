import { describe, expect, it } from "vitest";
import { buildCorpus } from "../corpus";
import { MIN_HAN_QUERY, MIN_LATIN_QUERY, searchPhrases } from "../phrase";
import type { SearchDoc } from "../types";

const bodies = [
  "克劳修斯提出了热力学第二定律，熵在孤立系统中不会减少。热力学第二定律因此规定了时间之矢。",
  "玻尔兹曼给出了熵的统计解释，把宏观的热力学第二定律还原为微观状态数的对数。",
  "达尔文提出自然选择，但选择作用的单位究竟是基因、个体还是群体，至今仍有争论。",
  "边际效用递减是消费者理论的基石。",
];

const docs: SearchDoc[] = bodies.map((_, i) => ({
  t: `文章${i}`,
  s: "",
  u: `/a/${i}`,
  c: "physics",
  k: "article",
}));

const corpus = buildCorpus(bodies);
const run = (query: string, limit = 10) => searchPhrases(corpus, docs, query, limit);

describe("searchPhrases", () => {
  it("finds every article containing the exact phrase", () => {
    expect(run("热力学第二定律").map((h) => h.url)).toEqual(["/a/0", "/a/1"]);
  });

  it("ranks an article that repeats the phrase above one that mentions it once", () => {
    // Article 0 says it twice, article 1 once.
    expect(run("热力学第二定律")[0]!.url).toBe("/a/0");
    expect(run("热力学第二定律")[0]!.occurrences).toBe(2);
  });

  it("returns one hit per article, not one per occurrence", () => {
    const urls = run("热力学第二定律").map((h) => h.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("carries a snippet showing the phrase in context", () => {
    const hit = run("边际效用递减")[0]!;
    expect(hit.snippet).toContain("边际效用递减");
    expect(hit.snippet.slice(hit.matchStart, hit.matchStart + 6)).toBe("边际效用递减");
  });

  it("matches a phrase mid-sentence, which title search cannot reach", () => {
    expect(run("统计解释").map((h) => h.url)).toEqual(["/a/1"]);
  });

  it("honours the result limit", () => {
    expect(run("热力学第二定律").length).toBe(2);
    expect(run("热力学第二定律", 1).length).toBe(1);
  });

  describe("when no article contains the exact phrase", () => {
    it("falls back to articles that cover most of the query", () => {
      // Article 2 says 自然选择 … 作用的单位, so the bigram 择的 is absent and an
      // all-or-nothing fallback would find nothing — which would make the
      // fallback useless for anyone misremembering a word.
      expect(run("热力学第二定律").every((h) => h.exact)).toBe(true);
      const degraded = run("自然选择的单位");
      expect(degraded.map((h) => h.url)).toEqual(["/a/2"]);
      expect(degraded[0]!.exact).toBe(false);
    });

    it("ignores an article that merely shares a fragment of the query", () => {
      // 边际 appears in article 3 and 自然 in article 2, but neither covers
      // enough of 边际自然 to be a plausible answer.
      expect(run("边际自然")).toEqual([]);
    });

    it("ranks the article covering more of the query first", () => {
      // Both articles carry 热力学第二定律; only article 1 also says 的统计.
      const hits = run("热力学第二定律的统计");
      expect(hits.map((h) => h.url)).toEqual(["/a/1", "/a/0"]);
      expect(hits[0]!.coverage).toBeGreaterThan(hits[1]!.coverage);
      expect(hits[0]!.coverage).toBeLessThan(1); // 1 is reserved for exact hits
    });
  });

  describe("query guards", () => {
    it("ignores a Chinese query shorter than the minimum", () => {
      expect(MIN_HAN_QUERY).toBe(2);
      expect(run("熵".repeat(MIN_HAN_QUERY - 1))).toEqual([]);
    });

    it("ignores a Latin query shorter than the minimum", () => {
      expect(MIN_LATIN_QUERY).toBe(3);
      expect(run("ab")).toEqual([]);
    });

    it("ignores blank input", () => {
      expect(run("")).toEqual([]);
      expect(run("   ")).toEqual([]);
    });
  });
});
