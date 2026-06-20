import type { CrossReference } from "./types";

/**
 * Cross-domain links anchored in medicine. fromPath is the nested medicine
 * route; toPath points at a verified existing route in the target domain
 * (the route-integrity test asserts both resolve).
 */
export const MEDICINE_REFS: CrossReference[] = [
  {
    fromDomain: "medicine",
    fromId: "covid-19",
    fromTitle: "COVID-19",
    fromPath: "/medicine/diseases/covid-19",
    toDomain: "life-science",
    toId: "当代议题--病毒学",
    toTitle: "病毒学",
    toPath: "/life-science/knowledge-base/当代议题--病毒学",
    relation:
      "病毒学解释了 SARS-CoV-2 如何复制、变异与逃逸免疫——医学的「应对」建立在生命科学的「机制」之上",
  },
  {
    fromDomain: "medicine",
    fromId: "epidemiology",
    fromTitle: "流行病学",
    fromPath: "/medicine/concepts/epidemiology",
    toDomain: "mathematics",
    toId: "differential-equation",
    toTitle: "微分方程",
    toPath: "/mathematics/concepts/differential-equation",
    relation: "SIR 等传染病模型用微分方程刻画易感—感染—康复人群的此消彼长，是流行病学的数学骨架",
  },
  {
    fromDomain: "medicine",
    fromId: "antibiotic-resistance",
    fromTitle: "抗生素耐药性",
    fromPath: "/medicine/concepts/antibiotic-resistance",
    toDomain: "life-science",
    toId: "进化机制--tree-of-life-phylogenetics",
    toTitle: "生命之树与系统发育",
    toPath: "/life-science/knowledge-base/进化机制--tree-of-life-phylogenetics",
    relation:
      "耐药性是自然选择的实时演示：抗生素是选择压力，幸存的耐药菌把基因传开——达尔文进化在医院里上演",
  },
  {
    fromDomain: "medicine",
    fromId: "informed-consent",
    fromTitle: "知情同意",
    fromPath: "/medicine/concepts/informed-consent",
    toDomain: "philosophy",
    toId: "utilitarianism",
    toTitle: "功利主义",
    toPath: "/philosophy/isms/utilitarianism",
    relation:
      "医学伦理在「尊重个人自主」与「追求最大福祉」之间拉扯——知情同意正是对功利主义式权衡的一道道德约束",
  },
];
