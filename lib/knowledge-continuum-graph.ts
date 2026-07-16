import type { KnowledgeContinuumNode } from "./knowledge-continuum";

export const CONTINUUM_GRAPH_NODE_IDS: Readonly<Record<string, string>> = {
  "universe-matter-1": "physics:T6",
  "universe-matter-2": "chemistry:atomic-structure",
  "universe-matter-3": "cosmology:stellar-evolution",
  "universe-matter-4": "chemistry:x-ray-crystallography",
  "universe-matter-5": "cosmology:暗物质与暗能量",
  "earth-life-body-1": "lifescience:human-evolution",
  "earth-life-body-2": "lifescience:mendel",
  "earth-life-body-3": "earth-science:plate-tectonics",
  "earth-life-body-4": "medicine:clinical-trials",
  "earth-life-body-5": "medicine:crispr-gene-editing",
  "patterns-computation-1": "mathematics:number-line",
  "patterns-computation-2": "mathematics:function",
  "patterns-computation-3": "computer-science:graph-traversal",
  "patterns-computation-4": "psychology:bayesian-modeling-psychology",
  "patterns-computation-5": "computer-science:ai-interpretability",
  "mind-meaning-1": "psychology:cognitive-bias",
  "mind-meaning-2": "psychology:attachment-theory",
  "mind-meaning-3": "philosophy:causation",
  "mind-meaning-4": "psychology:preregistration-registered-reports",
  "mind-meaning-5": "philosophy:consciousness-iit-gnw",
  "people-institutions-1": "history:event-农业革命",
  "people-institutions-2": "sociology:social-structure",
  "people-institutions-3": "economics:market-failures",
  "people-institutions-4": "political-science:comparative-method",
  "people-institutions-5": "sociology:platform-governance",
  "shared-future-1": "earth-science:water-cycle",
  "shared-future-2": "economics:commons-governance",
  "shared-future-3": "political-science:public-policy",
  "shared-future-4": "medicine:health-economic-evaluation-priority-setting",
  "shared-future-5": "earth-science:climate-tipping-points",
};

export function getContinuumGraphNodeId(continuumNodeId: string): string {
  const graphNodeId = CONTINUUM_GRAPH_NODE_IDS[continuumNodeId];
  if (!graphNodeId) throw new Error(`Missing graph mapping for ${continuumNodeId}`);
  return graphNodeId;
}

export function buildContinuumGraphHref(node: KnowledgeContinuumNode): string {
  const params = new URLSearchParams({
    level: String(node.stage),
    focus: getContinuumGraphNodeId(node.id),
    source: "continuum-node",
  });
  return `/knowledge-graph?${params.toString()}`;
}
