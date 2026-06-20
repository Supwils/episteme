import type { CrossReference } from "./types";

/**
 * Cross-domain links anchored in earth science. fromPath is the nested
 * earth-science route; toPath points at a verified existing route in the
 * target domain (route-integrity test asserts both resolve).
 */
export const EARTH_SCIENCE_REFS: CrossReference[] = [
  {
    fromDomain: "earth-science",
    fromId: "greenhouse-effect",
    fromTitle: "温室效应",
    fromPath: "/earth-science/concepts/greenhouse-effect",
    toDomain: "cosmology",
    toId: "太阳系--terrestrial-planets",
    toTitle: "类地行星",
    toPath: "/cosmology/knowledge-base/太阳系--terrestrial-planets",
    relation: "金星的失控温室效应是地球温室机制走向极端的警示性对照——同一套辐射物理，不同的归宿",
  },
  {
    fromDomain: "earth-science",
    fromId: "carbon-cycle",
    fromTitle: "碳循环",
    fromPath: "/earth-science/concepts/carbon-cycle",
    toDomain: "life-science",
    toId: "分子生物学--photosynthesis",
    toTitle: "光合作用",
    toPath: "/life-science/knowledge-base/分子生物学--photosynthesis",
    relation:
      "光合作用是碳循环「生物泵」的核心一步：生命把大气 CO₂ 固定进有机碳，深刻改写了地球碳收支",
  },
  {
    fromDomain: "earth-science",
    fromId: "great-oxidation-event",
    fromTitle: "大氧化事件",
    fromPath: "/earth-science/events/great-oxidation-event",
    toDomain: "life-science",
    toId: "分子生物学--photosynthesis",
    toTitle: "光合作用",
    toPath: "/life-science/knowledge-base/分子生物学--photosynthesis",
    relation: "蓝藻的产氧光合作用是大氧化事件的生物驱动力——生命第一次大规模改造了行星大气",
  },
  {
    fromDomain: "earth-science",
    fromId: "plate-tectonics",
    fromTitle: "板块构造",
    fromPath: "/earth-science/processes/plate-tectonics",
    toDomain: "life-science",
    toId: "进化机制--tree-of-life-phylogenetics",
    toTitle: "生命之树与系统发育",
    toPath: "/life-science/knowledge-base/进化机制--tree-of-life-phylogenetics",
    relation: "大陆的聚合与裂解隔离或连通了种群，是塑造生物地理分布与物种分化的深层地质引擎",
  },
];
