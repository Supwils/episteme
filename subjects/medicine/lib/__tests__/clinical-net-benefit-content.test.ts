import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const readContent = (relativePath: string) =>
  readFileSync(join(process.cwd(), "content", "medicine", relativePath), "utf8");

const reviewedPages = {
  screening: readContent("concepts/screening-and-early-detection.mdx"),
  cancer: readContent("diseases/cancer.mdx"),
  pain: readContent("concepts/pain-and-analgesia.mdx"),
  depression: readContent("diseases/depression.mdx"),
};

describe("clinical net-benefit content", () => {
  it("dates every reviewed page and gives readers an evidence checklist", () => {
    for (const page of Object.values(reviewedPages)) {
      expect(page).toContain("updated: 2026-07-18");
      expect(page).toContain("## 证据怎么读");
    }
  });

  it("separates screening accuracy from diagnosis and population outcomes", () => {
    expect(reviewedPages.screening).toContain("PPV = 90 / 585");
    expect(reviewedPages.screening).toContain("提前期偏倚");
    expect(reviewedPages.screening).toContain("病程长度偏倚");
    expect(reviewedPages.screening).toContain("过度诊断");
    expect(reviewedPages.screening).toContain("全因死亡");
    expect(reviewedPages.screening).toContain("确认诊断完成率");
    expect(reviewedPages.screening).not.toContain("早发现一定");
  });

  it("keeps cancer surrogate endpoints distinct from survival and net benefit", () => {
    expect(reviewedPages.cancer).toContain("客观缓解率 ORR");
    expect(reviewedPages.cancer).toContain("无进展生存 PFS");
    expect(reviewedPages.cancer).toContain("总生存 OS");
    expect(reviewedPages.cancer).toContain("FDA 加速批准");
    expect(reviewedPages.cancer).toContain("绝对风险降低");
    expect(reviewedPages.cancer).toContain("意向治疗分析");
    expect(reviewedPages.cancer).not.toContain("主流指南强调早筛早诊");
  });

  it("distinguishes opioid benefit, dependence, use disorder, overdose, and taper harms", () => {
    expect(reviewedPages.pain).toContain("生理依赖");
    expect(reviewedPages.pain).toContain("阿片使用障碍（OUD）");
    expect(reviewedPages.pain).toContain("不应突然停药或快速大幅减量");
    expect(reviewedPages.pain).toContain("丁丙诺啡、美沙酮和纳曲酮");
    expect(reviewedPages.pain).toContain("纳洛酮");
    expect(reviewedPages.pain).toContain("SPACE 随机试验");
    expect(reviewedPages.pain).not.toContain("强调阿片类应审慎、限量、限时使用");
  });

  it("tracks depression response, remission, function, attrition, relapse, and withdrawal", () => {
    expect(reviewedPages.depression).toContain("反应");
    expect(reviewedPages.depression).toContain("缓解");
    expect(reviewedPages.depression).toContain("功能");
    expect(reviewedPages.depression).toContain("失访与缺失数据");
    expect(reviewedPages.depression).toContain("停药反应和复发");
    expect(reviewedPages.depression).toContain("并不推出“抗抑郁药无效”");
    expect(reviewedPages.depression).toContain("共同决策");
    expect(reviewedPages.depression).not.toContain("在很大程度上被推翻");
  });
});
