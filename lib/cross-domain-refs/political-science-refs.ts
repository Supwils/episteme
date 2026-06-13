import type { CrossReference } from "./types";

/**
 * Cross-domain links anchored in political science — the political-economy and
 * geopolitics bridges into economics, philosophy, and history.
 */
export const POLITICAL_SCIENCE_REFS: CrossReference[] = [
  {
    fromDomain: "political-science",
    fromId: "karl-marx",
    fromTitle: "卡尔·马克思（政治理论）",
    fromPath: "/political-science/thinkers/karl-marx",
    toDomain: "economics",
    toId: "karl-marx",
    toTitle: "卡尔·马克思（政治经济学）",
    toPath: "/economics/economists/karl-marx",
    relation: "同一人物的两面：阶级与国家的政治理论，与《资本论》的政治经济学分析互为表里",
  },
  {
    fromDomain: "political-science",
    fromId: "liberalism",
    fromTitle: "自由主义",
    fromPath: "/political-science/isms/liberalism",
    toDomain: "economics",
    toId: "friedrich-hayek",
    toTitle: "弗里德里希·哈耶克",
    toPath: "/economics/economists/friedrich-hayek",
    relation: "古典自由主义的政治原则在哈耶克的市场秩序与自发秩序理论中获得经济学表达",
  },
  {
    fromDomain: "political-science",
    fromId: "the-state",
    fromTitle: "国家",
    fromPath: "/political-science/concepts/the-state",
    toDomain: "economics",
    toId: "central-banking-monetary-transmission",
    toTitle: "央行与货币政策传导",
    toPath: "/economics/knowledge-base/central-banking-monetary-transmission",
    relation: "现代国家的货币主权与央行制度，是政治学「国家」概念与经济学的交汇点",
  },
  {
    fromDomain: "political-science",
    fromId: "justice",
    fromTitle: "正义（政治学）",
    fromPath: "/political-science/concepts/justice",
    toDomain: "philosophy",
    toId: "rawls",
    toTitle: "约翰·罗尔斯",
    toPath: "/philosophy/thinkers/rawls",
    relation: "政治学对分配正义的制度追问，与罗尔斯「无知之幕」的正义论共享同一思想内核",
  },
];
