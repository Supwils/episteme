import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { authorSummary, safeParseMatter } from "@/lib/content-utils";
import { getThinkerBySlug } from "@/lib/mdx";
import { getConceptBySlug } from "@/subjects/economics/lib/mdx";
import { getPhenomenonBySlug } from "@/subjects/psychology/lib/mdx";
import { getMathConceptBySlug } from "@/subjects/mathematics/lib/concepts";
import { universePhysicsKB } from "@/lib/universe-physics-kb";
import { lifeScienceKB } from "@/lib/life-science-kb";
import { cosmologyKB } from "@/lib/cosmology-kb";

describe("author-written article leads", () => {
  it("accepts summary or dek, never invents a lead from invalid metadata", () => {
    expect(authorSummary({ summary: "  作者导语。  ", dek: "副题。" })).toBe("作者导语。");
    expect(authorSummary({ summary: " ", dek: "作者副题。" })).toBe("作者副题。");
    expect(authorSummary({ summary: 42 })).toBeUndefined();
    expect(authorSummary({})).toBeUndefined();
  });

  const cases = [
    ["philosophy/thinkers/socrates.mdx", () => getThinkerBySlug("socrates")],
    ["economics/concepts/opportunity-cost.mdx", () => getConceptBySlug("opportunity-cost")],
    ["psychology/phenomena/confirmation-bias.mdx", () => getPhenomenonBySlug("confirmation-bias")],
    ["mathematics/concepts/probability.mdx", () => getMathConceptBySlug("probability")],
    [
      "universe-physics/knowledge-base/量子物理/quantum-decoherence.md",
      () => universePhysicsKB.getArticleBySlug("量子物理--quantum-decoherence"),
    ],
    [
      "life-science/knowledge-base/分子生物学/蛋白质折叠.md",
      () => lifeScienceKB.getArticleBySlug("分子生物学--蛋白质折叠"),
    ],
    ["cosmology/knowledge-base/大爆炸理论.md", () => cosmologyKB.getArticleBySlug("大爆炸理论")],
  ] as const;

  it.each(cases)("preserves the reviewed summary through the %s loader", (file, load) => {
    const source = safeParseMatter(readFileSync(`content/${file}`, "utf8"));
    const article = load();
    expect(article).not.toBeNull();
    expect(article?.summary).toBe(source.data.summary);
    expect(article?.summary).toMatch(/[。！？]$/);
  });
});
