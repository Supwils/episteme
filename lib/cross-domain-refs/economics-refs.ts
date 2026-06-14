import type { CrossReference } from "./types";

// human-history has no per-era article pages, so era links resolve to the
// timeline (a real, topical page) rather than 404ing. The economics
// "industrial-revolution" ref was dropped (no economics article for it).
export const ECONOMICS_REFS: CrossReference[] = [
  {
    fromDomain: "economics",
    fromId: "adam-smith",
    fromTitle: "亚当·斯密",
    fromPath: "/economics/economists/adam-smith",
    toDomain: "philosophy",
    toId: "utilitarianism",
    toTitle: "功利主义",
    toPath: "/philosophy/isms/utilitarianism",
    relation: "亚当·斯密的「看不见的手」与功利主义追求最大幸福的原则殊途同归",
  },
  {
    fromDomain: "economics",
    fromId: "great-depression",
    fromTitle: "大萧条",
    fromPath: "/economics/case-studies/great-depression",
    toDomain: "human-history",
    toId: "great-depression",
    toTitle: "历史时间线",
    toPath: "/human-history/timeline",
    relation: "1929 年大萧条是 20 世纪最严重的经济危机，重塑了全球经济格局",
  },
  {
    fromDomain: "economics",
    fromId: "bretton-woods",
    fromTitle: "布雷顿森林体系",
    fromPath: "/economics/case-studies/bretton-woods",
    toDomain: "human-history",
    toId: "bretton-woods",
    toTitle: "历史时间线",
    toPath: "/human-history/timeline",
    relation: "布雷顿森林会议建立了二战后以美元为中心的国际货币体系",
  },
];
