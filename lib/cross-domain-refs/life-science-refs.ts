import type { CrossReference } from "./types";

// Most legacy life-science refs pointed at pages that were never built
// (ecology, genetic-engineering, consciousness-studies, evolution-theory,
// human-evolution, mass-extinction, medicine-history) or duplicated refs
// already declared from philosophy/history; they were removed. The darwin page
// still receives incoming links from philosophy (nietzsche) and history
// (scientific-revolution). Below is one accurate, both-ends-real bridge.
export const LIFE_SCIENCE_REFS: CrossReference[] = [
  {
    fromDomain: "life-science",
    fromId: "mendel",
    fromTitle: "孟德尔",
    fromPath: "/life-science/scientists/mendel",
    toDomain: "mathematics",
    toId: "probability",
    toTitle: "概率论",
    toPath: "/mathematics/concepts/probability",
    relation: "孟德尔用豌豆杂交的统计比例揭示遗传规律，是概率论在生物学中的早期典范",
  },
];
