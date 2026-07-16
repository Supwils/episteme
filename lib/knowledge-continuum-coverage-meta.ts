import type { GraphNode } from "@/lib/graph-engine";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

export type CoverageDomainId = GraphNode["domain"];
export type CoverageEvidenceMode = NonNullable<GraphNode["evidenceMode"]>;
export type CoverageStatus = "established" | "preview";
export type CoverageLevelCounts = readonly [number, number, number, number, number];

export interface CoverageReference {
  pathId: string;
  pathTitle: string;
  nodeId: string;
  nodeLabel: string;
  level: KnowledgeLevel;
  transition: string;
}

export interface CoverageBridge {
  id: CoverageDomainId;
  label: string;
  count: number;
}

export interface CoverageBridgeTransition {
  id: string;
  pathId: string;
  pathTitle: string;
  fromDomain: CoverageDomainId;
  toDomain: CoverageDomainId;
  fromNodeId: string;
  fromNodeLabel: string;
  toNodeId: string;
  toNodeLabel: string;
  fromLevel: KnowledgeLevel;
  level: KnowledgeLevel;
  evidenceMode: CoverageEvidenceMode;
  transition: string;
}

export interface DomainCoverageRow {
  id: CoverageDomainId;
  label: string;
  shortLabel: string;
  href: string;
  color: string;
  status: CoverageStatus;
  total: number;
  levels: CoverageLevelCounts;
  evidence: readonly { id: CoverageEvidenceMode; label: string; count: number }[];
  bridges: readonly CoverageBridge[];
  references: readonly CoverageReference[];
}

export interface EvidenceCoverageRow {
  id: CoverageEvidenceMode;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  total: number;
  levels: CoverageLevelCounts;
  references: readonly CoverageReference[];
}

export interface KnowledgeCoverageSnapshot {
  summary: {
    nodeCount: number;
    pathCount: number;
    prerequisiteCount: number;
    crossDomainTransitionCount: number;
    establishedDomainCount: number;
    previewDomainCount: number;
  };
  domains: readonly DomainCoverageRow[];
  evidenceModes: readonly EvidenceCoverageRow[];
  bridgeTransitions: readonly CoverageBridgeTransition[];
}

export const COVERAGE_DOMAIN_META: Record<
  CoverageDomainId,
  { label: string; shortLabel: string; href: string; color: string; status: CoverageStatus }
> = {
  physics: {
    label: "物理学",
    shortLabel: "物理",
    href: "/universe-physics",
    color: "#6a6fd0",
    status: "established",
  },
  cosmology: {
    label: "宇宙学",
    shortLabel: "宇宙",
    href: "/cosmology",
    color: "#4f8fd8",
    status: "established",
  },
  chemistry: {
    label: "化学",
    shortLabel: "化学",
    href: "/chemistry",
    color: "#dc873d",
    status: "established",
  },
  "earth-science": {
    label: "地球科学",
    shortLabel: "地球",
    href: "/earth-science",
    color: "#4f9d76",
    status: "established",
  },
  "life-science": {
    label: "生命科学",
    shortLabel: "生命",
    href: "/life-science",
    color: "#58a86b",
    status: "established",
  },
  medicine: {
    label: "医学与公共卫生",
    shortLabel: "医学",
    href: "/medicine",
    color: "#d45d57",
    status: "established",
  },
  mathematics: {
    label: "数学",
    shortLabel: "数学",
    href: "/mathematics",
    color: "#8b67cf",
    status: "established",
  },
  "computer-science": {
    label: "计算机科学",
    shortLabel: "计算机",
    href: "/computer-science",
    color: "#4f9cf0",
    status: "established",
  },
  psychology: {
    label: "心理学",
    shortLabel: "心理",
    href: "/psychology",
    color: "#cf759a",
    status: "established",
  },
  philosophy: {
    label: "哲学",
    shortLabel: "哲学",
    href: "/philosophy",
    color: "#c79b45",
    status: "established",
  },
  history: {
    label: "人类历史",
    shortLabel: "历史",
    href: "/human-history",
    color: "#b96a52",
    status: "established",
  },
  sociology: {
    label: "社会学",
    shortLabel: "社会",
    href: "/sociology",
    color: "#7f965a",
    status: "established",
  },
  economics: {
    label: "经济学",
    shortLabel: "经济",
    href: "/economics",
    color: "#d6ad45",
    status: "established",
  },
  "political-science": {
    label: "政治学",
    shortLabel: "政治",
    href: "/political-science",
    color: "#bd6262",
    status: "established",
  },
  linguistics: {
    label: "语言学",
    shortLabel: "语言",
    href: "/linguistics",
    color: "#3f9b92",
    status: "established",
  },
};

export const COVERAGE_EVIDENCE_META: Record<
  CoverageEvidenceMode,
  { label: string; shortLabel: string; description: string; color: string }
> = {
  observation: {
    label: "观察与记录",
    shortLabel: "观察",
    description: "从可见现象、材料与测量记录建立问题。",
    color: "#55a8a1",
  },
  interpretation: {
    label: "解释与论证",
    shortLabel: "解释",
    description: "比较文本、事件与概念，提出可争论的意义结构。",
    color: "#c49a53",
  },
  formal: {
    label: "形式推演",
    shortLabel: "形式",
    description: "用定义、逻辑、数学结构和算法推出可检查结论。",
    color: "#806bc4",
  },
  experimental: {
    label: "实验检验",
    shortLabel: "实验",
    description: "通过操纵、对照和重复测量检验机制与因果。",
    color: "#d66b62",
  },
  comparative: {
    label: "比较证据",
    shortLabel: "比较",
    description: "跨案例、制度、人群或语言寻找差异与共同模式。",
    color: "#7f9a54",
  },
  simulation: {
    label: "模型与模拟",
    shortLabel: "模拟",
    description: "把机制写入模型，比较它能否重现观测与情景变化。",
    color: "#4f8fd8",
  },
  synthesis: {
    label: "综合前沿",
    shortLabel: "综合",
    description: "汇合多种证据，在不确定性中比较开放解释和行动方案。",
    color: "#d17f42",
  },
};
