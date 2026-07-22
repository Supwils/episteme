import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { THOUGHT_TOURS } from "@/subjects/knowledge-graph/data/thought-tours";

const readContent = (relativePath: string) =>
  readFileSync(join(process.cwd(), "content", "chemistry", relativePath), "utf8");

const reviewedPages = {
  kinetics: readContent("concepts/reaction-kinetics.mdx"),
  catalysis: readContent("reactions/catalysis-reaction.mdx"),
  catalysts: readContent("substances/catalysts.mdx"),
  greenChemistry: readContent("milestones/green-chemistry.mdx"),
};

const countCjkChars = (value: string) => value.match(/\p{Script=Han}/gu)?.length ?? 0;

describe("chemistry kinetics, catalysis, and green-process evidence", () => {
  it("dates every reviewed page and keeps substantial evidence guidance", () => {
    for (const page of Object.values(reviewedPages)) {
      expect(page).toContain("updated: 2026-07-18");
      expect(page).toContain("## 证据怎么读");
      expect(countCjkChars(page)).toBeGreaterThan(2_500);
    }
  });

  it("treats rate laws and activation parameters as measured models", () => {
    expect(reviewedPages.kinetics).toContain("速率方程是经验关系，不是配平方程");
    expect(reviewedPages.kinetics).toContain("只有对已知的**基元反应**");
    expect(reviewedPages.kinetics).toContain("Arrhenius 活化能首先是描述速率系数温度依赖的**经验参数**");
    expect(reviewedPages.kinetics).toContain("混合、传质、传热和仪器响应限制");
    expect(reviewedPages.kinetics).not.toContain("温度每升高约 10°C，许多反应速率翻一倍");
  });

  it("separates catalytic cycles from transport-limited reactor observations", () => {
    expect(reviewedPages.catalysis).toContain("既是反应物，也是催化循环的产物");
    expect(reviewedPages.catalysis).toContain("周转频率 TOF");
    expect(reviewedPages.catalysis).toContain("周转数 TON");
    expect(reviewedPages.catalysis).toContain("Weisz–Prater");
    expect(reviewedPages.catalysis).toContain("位点如何计数");
    expect(reviewedPages.catalysis).not.toContain("自己却在反应前后毫发无损");
  });

  it("treats a catalyst as a dynamic, measurable, and degradable material", () => {
    expect(reviewedPages.catalysts).toContain("配方、表面与活性位不是一回事");
    expect(reviewedPages.catalysts).toContain("工作位点");
    expect(reviewedPages.catalysts).toContain("操作态研究");
    expect(reviewedPages.catalysts).toContain("中毒");
    expect(reviewedPages.catalysts).toContain("积碳");
    expect(reviewedPages.catalysts).toContain("烧结");
    expect(reviewedPages.catalysts).toContain("溶出、流失与机械破坏");
  });

  it("uses a metric stack and explicit boundaries for green claims", () => {
    expect(reviewedPages.greenChemistry).toContain("原子经济性");
    expect(reviewedPages.greenChemistry).toContain("E-factor");
    expect(reviewedPages.greenChemistry).toContain("过程质量强度 PMI");
    expect(reviewedPages.greenChemistry).toContain("功能单位、系统边界");
    expect(reviewedPages.greenChemistry).toContain("危害与暴露不能被一个质量数字替代");
    expect(reviewedPages.greenChemistry).not.toContain("水或超临界二氧化碳代替有机溶剂");
  });

  it("publishes a nine-step route from kinetics to a defensible process claim", () => {
    const route = THOUGHT_TOURS.find(
      (tour) => tour.id === "from-rate-data-to-defensible-green-process"
    );
    expect(route?.waypoints).toHaveLength(9);
    expect(route?.steps).toHaveLength(9);
    expect(route?.waypoints[0]).toBe("chemistry:chemical-thermodynamics");
    expect(route?.waypoints.at(-1)).toBe("chemistry:green-chemistry");
  });
});
