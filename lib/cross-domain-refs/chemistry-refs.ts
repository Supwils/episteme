import type { CrossReference } from "./types";

/**
 * Cross-domain links anchored in chemistry. fromPath is the chemistry route;
 * toPath points at a verified existing route in the target domain (the
 * route-integrity test asserts both resolve). Chemistry is the "central
 * science", so it bridges to physics, life-science and earth-science.
 */
export const CHEMISTRY_REFS: CrossReference[] = [
  {
    fromDomain: "chemistry",
    fromId: "thermochemistry",
    fromTitle: "热化学",
    fromPath: "/chemistry/concepts/thermochemistry",
    toDomain: "universe-physics",
    toId: "热力学--熵与时间之箭",
    toTitle: "熵与时间之箭",
    toPath: "/universe-physics/knowledge-base/热力学--熵与时间之箭",
    relation:
      "化学反应的自发与否由吉布斯自由能（焓与熵的权衡）决定——化学热力学正是物理熵增定律在分子尺度的展开",
  },
  {
    fromDomain: "chemistry",
    fromId: "atomic-structure",
    fromTitle: "原子结构",
    fromPath: "/chemistry/concepts/atomic-structure",
    toDomain: "universe-physics",
    toId: "量子物理--波粒二象性",
    toTitle: "波粒二象性",
    toPath: "/universe-physics/knowledge-base/量子物理--波粒二象性",
    relation: "电子的能级量子化、化学键的成因，根植于量子力学——原子结构是物理量子论与化学的交界",
  },
  {
    fromDomain: "chemistry",
    fromId: "electrochemistry",
    fromTitle: "电化学",
    fromPath: "/chemistry/concepts/electrochemistry",
    toDomain: "universe-physics",
    toId: "电磁学--法拉第与电磁感应",
    toTitle: "法拉第与电磁感应",
    toPath: "/universe-physics/knowledge-base/电磁学--法拉第与电磁感应",
    relation:
      "法拉第既奠基了电磁感应，也奠基了电解定律——电与化学的相互转换是电化学的核心，物理与化学在此同源",
  },
  {
    fromDomain: "chemistry",
    fromId: "catalysts",
    fromTitle: "催化剂",
    fromPath: "/chemistry/substances/catalysts",
    toDomain: "life-science",
    toId: "分子生物学--酶与生物催化",
    toTitle: "酶与生物催化",
    toPath: "/life-science/knowledge-base/分子生物学--酶与生物催化",
    relation:
      "酶是大自然的催化剂：用与工业催化剂相同的「降低活化能」原理，却在常温常压下实现惊人的选择性",
  },
  {
    fromDomain: "chemistry",
    fromId: "water",
    fromTitle: "水",
    fromPath: "/chemistry/substances/water",
    toDomain: "earth-science",
    toId: "water-cycle",
    toTitle: "水循环",
    toPath: "/earth-science/concepts/water-cycle",
    relation:
      "水分子的极性与氢键赋予它反常的物性，正是这些化学性质驱动了全球水循环、塑造了宜居的地球",
  },
];
