import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const readContent = (relativePath: string) =>
  readFileSync(join(process.cwd(), "content", "medicine", relativePath), "utf8");

const reviewedPages = {
  covidDisease: readContent("diseases/covid-19.mdx"),
  covidEvent: readContent("events/covid-19-pandemic.mdx"),
  influenza: readContent("diseases/influenza.mdx"),
  antibioticEra: readContent("events/antibiotic-era.mdx"),
  smallpoxDisease: readContent("diseases/smallpox.mdx"),
  smallpoxEvent: readContent("events/smallpox-eradication.mdx"),
};

describe("high-risk medical evidence content", () => {
  it("dates every reviewed page and explains how its evidence should be read", () => {
    for (const page of Object.values(reviewedPages)) {
      expect(page).toContain("updated: 2026-07-18");
      expect(page).toContain("## 证据怎么读");
    }
  });

  it("separates COVID-19 denominators, time periods, outcomes, and model counterfactuals", () => {
    expect(reviewedPages.covidDisease).toContain("病死率（CFR）");
    expect(reviewedPages.covidDisease).toContain("感染死亡率（IFR）");
    expect(reviewedPages.covidDisease).toContain("超额死亡");
    expect(reviewedPages.covidDisease).toContain("研究时期、变异株、接种剂次");
    expect(reviewedPages.covidEvent).toContain("早期高风险，不等于每项措施都同样有效");
    expect(reviewedPages.covidEvent).toContain("绝对风险、相对效果、置信区间");
    expect(reviewedPages.covidEvent).toContain("若没有疫苗会怎样");
    expect(reviewedPages.covidDisease).toContain("10.1016/S1473-3099(22)00320-6");
  });

  it("explains influenza burden estimation and test-negative vaccine studies", () => {
    expect(reviewedPages.influenza).toContain("检测阴性设计");
    expect(reviewedPages.influenza).toContain("(1 - 校正后比值比) × 100%");
    expect(reviewedPages.influenza).toContain("继发的细菌性肺炎");
    expect(reviewedPages.influenza).toContain("不是已经证实的单一答案");
    expect(reviewedPages.influenza).toContain("How CDC Estimates the Burden");
  });

  it("keeps antibiotic credit, duration, and AMR counterfactuals explicit", () => {
    expect(reviewedPages.antibioticEra).toContain("阿尔伯特·沙茨");
    expect(reviewedPages.antibioticEra).toContain("伊丽莎白·布吉");
    expect(reviewedPages.antibioticEra).toContain("正确药物、剂量、给药途径和疗程");
    expect(reviewedPages.antibioticEra).toContain("归因于耐药");
    expect(reviewedPages.antibioticEra).toContain("与耐药相关");
    expect(reviewedPages.antibioticEra).toContain("10.1016/S0140-6736(24)01867-1");
  });

  it("attributes smallpox eradication to a staged delivery and verification system", () => {
    for (const page of [reviewedPages.smallpoxDisease, reviewedPages.smallpoxEvent]) {
      expect(page).toContain("大规模接种");
      expect(page).toContain("监测");
      expect(page).toContain("1979");
      expect(page).toContain("WHA33.3");
    }
    expect(reviewedPages.smallpoxEvent).toContain("经监测的大规模接种");
    expect(reviewedPages.smallpoxEvent).toContain("独立认证");
  });

  it("does not restore the reviewed single-cause claims", () => {
    const combined = Object.values(reviewedPages).join("\n");
    const rejectedClaims = [
      "真正起决定作用的是一套更聪明的策略",
      "患者不按疗程服药",
      '一种主流假说是"细胞因子风暴"',
      "人类从未拥有治疗天花的特效药",
      "COVID-19 远比流感致命",
    ];

    for (const claim of rejectedClaims) {
      expect(combined).not.toContain(claim);
    }
  });
});
