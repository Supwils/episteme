import { describe, expect, it } from "vitest";
import { buildCorpus } from "../corpus";
import {
  MAX_BIGRAM_TERMS,
  MIN_HAN_QUERY,
  MIN_LATIN_QUERY,
  searchPhrasePage,
  searchPhrases,
} from "../phrase";
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
      expect(degraded[0]!.matchLength).toBe(2);
      expect(run("热力学第二定律")[0]!.matchLength).toBe("热力学第二定律".length);
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

  it("drops a hit whose url is not a same-origin path", () => {
    const unsafe = docs.map((doc, index) =>
      index === 0 ? { ...doc, u: "//evil.example/a/b" } : doc
    );
    expect(searchPhrases(corpus, unsafe, "热力学第二定律", 10).map((hit) => hit.url)).toEqual([
      "/a/1",
    ]);
  });

  it("skips a match whose document slot is missing instead of throwing", () => {
    expect(() => searchPhrases(corpus, [], "热力学第二定律", 10)).not.toThrow();
    expect(searchPhrases(corpus, [], "热力学第二定律", 10)).toEqual([]);
  });

  describe("query guards", () => {
    it("counts supplementary Han characters once and keeps UTF-16 snippet offsets", () => {
      const supplementary = buildCorpus(["前言𠀀𠀁后文"]);
      const supplementaryDocs = [docs[0]!];
      expect(searchPhrases(supplementary, supplementaryDocs, "𠀀", 10)).toEqual([]);
      const hits = searchPhrases(supplementary, supplementaryDocs, "𠀀𠀁", 10);
      expect(hits).toHaveLength(1);
      const hit = hits[0]!;
      expect(hit.snippet.slice(hit.matchStart, hit.matchStart + hit.matchLength)).toBe("𠀀𠀁");
    });

    it("applies the short-word guard to supplementary letters in exact and fallback queries", () => {
      const supplementary = buildCorpus(["𐐀𐐁𐐂"]);
      const supplementaryDocs = [docs[0]!];
      expect(searchPhrases(supplementary, supplementaryDocs, "𐐀𐐁", 10)).toEqual([]);
      expect(searchPhrases(supplementary, supplementaryDocs, "𐐀𐐁 xx", 10)).toEqual([]);
      expect(searchPhrases(supplementary, supplementaryDocs, "𐐀𐐁𐐂", 10)).toHaveLength(1);
    });

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

    it("caps unique fallback terms so a 120-character query cannot scan the corpus once per bigram", () => {
      expect(MAX_BIGRAM_TERMS).toBe(16);
      const long = Array.from({ length: 40 }, (_, index) => `词${index}`).join("");
      expect(() => run(long)).not.toThrow();
    });
  });

  describe("case and width", () => {
    const latinBodies = [
      "Bell 不等式把定域实在论变成了可以检验的预言。",
      "CRISPR 让基因编辑变得便宜。",
      "拉丁文 bellum 指战争。",
    ];
    const latinDocs: SearchDoc[] = latinBodies.map((_, i) => ({
      t: `L${i}`,
      s: "",
      u: `/l/${i}`,
      c: i === 1 ? "life-science" : "physics",
      k: "article",
    }));
    const latin = buildCorpus(latinBodies);
    const find = (query: string) => searchPhrases(latin, latinDocs, query, 10);

    it("matches Latin words regardless of case", () => {
      expect(find("crispr").map((h) => h.url)).toEqual(["/l/1"]);
      expect(find("Crispr").map((h) => h.url)).toEqual(["/l/1"]);
    });

    it("keeps the snippet in its original case", () => {
      const [hit] = find("crispr");
      expect(hit!.snippet.slice(hit!.matchStart, hit!.matchStart + hit!.matchLength)).toBe(
        "CRISPR"
      );
    });

    it("lets the fallback tier find a capitalized word", () => {
      const urls = find("Bell 实在论检验").map((h) => h.url);
      expect(urls[0]).toBe("/l/0");
    });

    it("reads full-width letters as their ASCII form", () => {
      expect(find("ＣＲＩＳＰＲ").map((h) => h.url)).toEqual(["/l/1"]);
    });

    it("highlights the fallback term that was found, at its own length", () => {
      const [hit] = find("Bell 实在论检验");
      expect(hit!.snippet.slice(hit!.matchStart, hit!.matchStart + hit!.matchLength)).toBe("Bell");
    });
  });

  describe("searchPhrasePage", () => {
    it("filters to a section before applying the limit", () => {
      const page = searchPhrasePage(
        corpus,
        docs.map((d, i) => ({ ...d, c: i === 1 ? "x" : d.c })),
        "热力学第二定律",
        1,
        {
          section: "x",
        }
      );
      expect(page.hits.map((h) => h.url)).toEqual(["/a/1"]);
    });

    it("counts every match per section, uncapped", () => {
      const page = searchPhrasePage(corpus, docs, "热力学第二定律", 1);
      expect(page.hits).toHaveLength(1);
      expect(page.sectionCounts.get("physics")).toBe(2);
    });

    it("leaves out excluded urls from both the hits and the counts", () => {
      const page = searchPhrasePage(corpus, docs, "热力学第二定律", 10, {
        exclude: new Set(["/a/0"]),
      });
      expect(page.hits.map((h) => h.url)).toEqual(["/a/1"]);
      expect(page.sectionCounts.get("physics")).toBe(1);
    });
  });
});
