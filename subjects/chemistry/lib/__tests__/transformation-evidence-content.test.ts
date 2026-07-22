import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const readContent = (relativePath: string) =>
  readFileSync(join(process.cwd(), "content", "chemistry", relativePath), "utf8");

const reviewedPages = {
  electrolysis: readContent("reactions/electrolysis.mdx"),
  precipitation: readContent("reactions/precipitation-reactions.mdx"),
  grignard: readContent("reactions/grignard-reaction.mdx"),
  polymers: readContent("substances/polymers.mdx"),
};

describe("chemistry transformation evidence content", () => {
  it("dates every reviewed page and gives readers an evidence checklist", () => {
    for (const page of Object.values(reviewedPages)) {
      expect(page).toContain("updated: 2026-07-18");
      expect(page).toContain("## 证据怎么读");
    }
  });

  it("closes the electrolysis charge, voltage, selectivity, and system boundaries", () => {
    expect(reviewedPages.electrolysis).toContain("n_theoretical = Q / (z F)");
    expect(reviewedPages.electrolysis).toContain("法拉第效率");
    expect(reviewedPages.electrolysis).toContain("Vcell = Erev");
    expect(reviewedPages.electrolysis).toContain("电流密度");
    expect(reviewedPages.electrolysis).toContain("氢中氧、氧中氢或氯中氢");
    expect(reviewedPages.electrolysis).not.toContain("全球电解铝消耗了约 3–4%");
  });

  it("separates precipitation equilibrium, speciation, nucleation, and solids handling", () => {
    expect(reviewedPages.precipitation).toContain("Qsp > Ksp");
    expect(reviewedPages.precipitation).toContain("离子活度");
    expect(reviewedPages.precipitation).toContain("成核势垒");
    expect(reviewedPages.precipitation).toContain("共沉淀");
    expect(reviewedPages.precipitation).toContain("混凝、絮凝和沉淀");
    expect(reviewedPages.precipitation).not.toContain("Ksp 越小，越不溶，越容易析出");
  });

  it("connects Grignard molecular structure to assay and delayed-initiation risk", () => {
    expect(reviewedPages.grignard).toContain("Schlenk 平衡");
    expect(reviewedPages.grignard).toContain("2 RMgX <=> R2Mg + MgX2");
    expect(reviewedPages.grignard).toContain("原位 FTIR");
    expect(reviewedPages.grignard).toContain("引发延迟 -> 卤代物累积");
    expect(reviewedPages.grignard).toContain("反应量热");
    expect(reviewedPages.grignard).not.toContain('碳原子本身很"安分"');
  });

  it("treats polymer performance as a measured multiscale system", () => {
    expect(reviewedPages.polymers).toContain("Đ = Mw / Mn");
    expect(reviewedPages.polymers).toContain("SEC/GPC");
    expect(reviewedPages.polymers).toContain("DSC");
    expect(reviewedPages.polymers).toContain("加工历史");
    expect(reviewedPages.polymers).toContain("约 9% 的塑料废物最终被回收利用");
    expect(reviewedPages.polymers).toContain("检出、暴露与健康效应是三种结论");
    expect(reviewedPages.polymers).not.toContain("硬过钢材");
    expect(reviewedPages.polymers).not.toContain("受热能软化重塑、可回收");
  });
});
