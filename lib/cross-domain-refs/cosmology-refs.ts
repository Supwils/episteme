import type { CrossReference } from "./types";

// fromId is the real cosmology knowledge-base slug so the source KB page also
// renders the link; fromTitle is a concise display label. Refs to concepts with
// no cosmology KB article (curved-spacetime, copernican-revolution, space-race)
// or to non-existent target pages were removed. See scripts/check-cross-refs.ts.
export const COSMOLOGY_REFS: CrossReference[] = [
  {
    fromDomain: "cosmology",
    fromId: "大爆炸理论",
    fromTitle: "大爆炸理论",
    fromPath: "/cosmology/knowledge-base/大爆炸理论",
    toDomain: "philosophy",
    toId: "leibniz",
    toTitle: "莱布尼茨",
    toPath: "/philosophy/thinkers/leibniz",
    relation: "莱布尼茨提出的「为什么存在而非虚无」在大爆炸理论中获得了新的物理语境",
  },
  {
    fromDomain: "cosmology",
    fromId: "black-holes",
    fromTitle: "黑洞",
    fromPath: "/cosmology/knowledge-base/black-holes",
    toDomain: "universe-physics",
    toId: "relativity",
    toTitle: "相对论",
    toPath: "/universe-physics/physics/relativity",
    relation: "黑洞是广义相对论预言的最极端天体",
  },
  {
    fromDomain: "cosmology",
    fromId: "暗物质与暗能量",
    fromTitle: "暗能量",
    fromPath: "/cosmology/knowledge-base/暗物质与暗能量",
    toDomain: "universe-physics",
    toId: "quantum-mechanics",
    toTitle: "量子力学",
    toPath: "/universe-physics/physics/quantum-mechanics",
    relation: "暗能量可能与量子真空能有关，是物理学最大的未解之谜之一",
  },
  {
    fromDomain: "cosmology",
    fromId: "多重宇宙假说",
    fromTitle: "多重宇宙",
    fromPath: "/cosmology/knowledge-base/多重宇宙假说",
    toDomain: "philosophy",
    toId: "what-is-knowledge",
    toTitle: "认识论",
    toPath: "/philosophy/questions/what-is-knowledge",
    relation: "多重宇宙假说挑战了可证伪性的科学划界标准",
  },
  {
    fromDomain: "cosmology",
    fromId: "宇宙学基础--共动距离与宇宙学红移",
    fromTitle: "宇宙膨胀",
    fromPath: "/cosmology/knowledge-base/宇宙学基础--共动距离与宇宙学红移",
    toDomain: "universe-physics",
    toId: "relativity",
    toTitle: "相对论",
    toPath: "/universe-physics/physics/relativity",
    relation: "弗里德曼方程从广义相对论推导出宇宙膨胀解",
  },
  {
    fromDomain: "cosmology",
    fromId: "宇宙学基础--共动距离与宇宙学红移",
    fromTitle: "宇宙膨胀",
    fromPath: "/cosmology/knowledge-base/宇宙学基础--共动距离与宇宙学红移",
    toDomain: "mathematics",
    toId: "differential-equation",
    toTitle: "微分方程",
    toPath: "/mathematics/concepts/differential-equation",
    relation: "弗里德曼方程是一组描述宇宙膨胀的微分方程",
  },
];
