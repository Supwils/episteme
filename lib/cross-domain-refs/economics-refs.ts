import type { CrossReference } from "./types";

export const ECONOMICS_REFS: CrossReference[] = [
  {
    fromDomain: "economics",
    fromId: "adam-smith",
    fromTitle: "亚当·斯密",
    toDomain: "philosophy",
    toId: "utilitarianism",
    toTitle: "功利主义",
    relation: "亚当·斯密的「看不见的手」与功利主义追求最大幸福的原则殊途同归",
  },
  {
    fromDomain: "economics",
    fromId: "great-depression",
    fromTitle: "大萧条",
    toDomain: "human-history",
    toId: "great-depression",
    toTitle: "大萧条",
    relation: "1929 年大萧条是 20 世纪最严重的经济危机，重塑了全球经济格局",
  },
  {
    fromDomain: "economics",
    fromId: "industrial-revolution",
    fromTitle: "工业革命经济学",
    toDomain: "human-history",
    toId: "industrial-revolution",
    toTitle: "工业革命",
    relation: "工业革命不仅是技术变革，更是经济结构和社会关系的根本转型",
  },
  {
    fromDomain: "economics",
    fromId: "bretton-woods",
    fromTitle: "布雷顿森林体系",
    toDomain: "human-history",
    toId: "bretton-woods",
    toTitle: "布雷顿森林体系",
    relation: "布雷顿森林会议建立了二战后以美元为中心的国际货币体系",
  },
];
