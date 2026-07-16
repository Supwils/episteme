import type { GraphEdge, GraphNode } from "./types";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { CURATED_COGNITIVE_OVERRIDES, getCuratedPathForNode } from "./curated-learning-paths";
import { REVIEWED_REQUIRED_PREREQUISITES } from "./frontier-prerequisite-relations";

export type EvidenceMode = NonNullable<GraphNode["evidenceMode"]>;
export type CognitiveGraphNode = GraphNode & {
  knowledgeLevel: KnowledgeLevel;
  knowledgeLevelSource: "curated" | "inferred";
  prerequisiteIds: string[];
  evidenceMode: EvidenceMode;
};

const LEVEL_THREE_TYPES = new Set<GraphNode["type"]>([
  "algorithm",
  "cosmic",
  "disease",
  "extinction",
  "institution",
  "process",
  "reaction",
  "technology",
  "theory",
]);

const LEVEL_ONE_TYPES = new Set<GraphNode["type"]>([
  "cosmos-tier",
  "economist",
  "era",
  "event",
  "figure",
  "mathematician",
  "pioneer",
  "scientist",
  "species",
  "theorist",
  "thinker",
]);

export function inferKnowledgeLevel(node: GraphNode): KnowledgeLevel {
  if (node.knowledgeLevel) return node.knowledgeLevel;

  const route = `${node.section ?? ""} ${node.url ?? ""}`.toLowerCase();
  if (route.includes("frontier")) return 5;
  if (
    route.includes("methods") ||
    route.includes("experiments") ||
    route.includes("climate-risks") ||
    node.type === "experiment" ||
    node.type === "theorem"
  ) {
    return 4;
  }
  if (LEVEL_THREE_TYPES.has(node.type)) return 3;
  if (LEVEL_ONE_TYPES.has(node.type)) return 1;
  return 2;
}

export function inferEvidenceMode(node: GraphNode): EvidenceMode {
  if (node.evidenceMode) return node.evidenceMode;

  const route = `${node.section ?? ""} ${node.url ?? ""}`.toLowerCase();
  if (route.includes("frontier")) return "synthesis";
  if (route.includes("methods") || node.type === "experiment") return "experimental";
  if (
    node.type === "theorem" ||
    node.type === "algorithm" ||
    node.domain === "mathematics" ||
    node.domain === "computer-science"
  ) {
    return "formal";
  }
  if (node.type === "cosmic" || node.type === "process") return "simulation";
  if (
    node.domain === "economics" ||
    node.domain === "political-science" ||
    node.domain === "sociology"
  ) {
    return "comparative";
  }
  if (
    node.type === "event" ||
    node.type === "figure" ||
    node.type === "thinker" ||
    node.type === "school" ||
    node.type === "ism"
  ) {
    return "interpretation";
  }
  return "observation";
}

export function annotateCognitiveMetadata(
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[]
): CognitiveGraphNode[] {
  const levels = new Map(
    nodes.map((node) => [
      node.id,
      CURATED_COGNITIVE_OVERRIDES.get(node.id)?.knowledgeLevel ?? inferKnowledgeLevel(node),
    ])
  );
  const neighbors = new Map<string, Set<string>>();

  for (const edge of edges) {
    if (!neighbors.has(edge.source)) neighbors.set(edge.source, new Set());
    if (!neighbors.has(edge.target)) neighbors.set(edge.target, new Set());
    neighbors.get(edge.source)!.add(edge.target);
    neighbors.get(edge.target)!.add(edge.source);
  }

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return nodes.map((node) => {
    const knowledgeLevel = levels.get(node.id)!;
    const curated = CURATED_COGNITIVE_OVERRIDES.get(node.id);
    const reviewedPrerequisiteIds = (REVIEWED_REQUIRED_PREREQUISITES.get(node.id) ?? []).filter(
      (id) => nodeMap.has(id) && (levels.get(id) ?? knowledgeLevel) < knowledgeLevel
    );
    const authoredPrerequisiteIds = (node.prerequisiteIds ?? []).filter(
      (id) =>
        id !== node.id &&
        nodeMap.has(id) &&
        (levels.get(id) ?? knowledgeLevel) < knowledgeLevel &&
        neighbors.get(node.id)?.has(id)
    );
    const prerequisiteIds = curated
      ? [...new Set([...curated.prerequisiteIds, ...reviewedPrerequisiteIds])].filter(
          (id) => nodeMap.has(id) && (levels.get(id) ?? knowledgeLevel) < knowledgeLevel
        )
      : reviewedPrerequisiteIds.length > 0
        ? reviewedPrerequisiteIds
        : authoredPrerequisiteIds.length > 0
          ? authoredPrerequisiteIds
          : [...(neighbors.get(node.id) ?? [])]
              .filter((id) => (levels.get(id) ?? knowledgeLevel) < knowledgeLevel)
              .sort((left, right) => {
                const leftNode = nodeMap.get(left)!;
                const rightNode = nodeMap.get(right)!;
                const leftDomainPenalty = leftNode.domain === node.domain ? 0 : 1;
                const rightDomainPenalty = rightNode.domain === node.domain ? 0 : 1;
                if (leftDomainPenalty !== rightDomainPenalty) {
                  return leftDomainPenalty - rightDomainPenalty;
                }
                return knowledgeLevel - levels.get(left)! - (knowledgeLevel - levels.get(right)!);
              })
              .slice(0, 3);

    return {
      ...node,
      knowledgeLevel,
      knowledgeLevelSource:
        curated || reviewedPrerequisiteIds.length > 0
          ? "curated"
          : (node.knowledgeLevelSource ?? "inferred"),
      prerequisiteIds,
      evidenceMode: curated?.evidenceMode ?? inferEvidenceMode(node),
    };
  });
}

export function buildPrimaryPrerequisitePath(
  nodeId: string,
  nodes: readonly GraphNode[],
  maxNodes = 5
): string[] {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const curatedPath = getCuratedPathForNode(nodeId);
  if (curatedPath) {
    const targetIndex = curatedPath.steps.findIndex((step) => step.nodeId === nodeId);
    return curatedPath.steps
      .slice(Math.max(0, targetIndex - maxNodes + 1), targetIndex + 1)
      .map((step) => step.nodeId)
      .filter((id) => nodeMap.has(id));
  }

  const reversedPath: string[] = [];
  const visited = new Set<string>();
  let current = nodeMap.get(nodeId);

  while (current && reversedPath.length < maxNodes && !visited.has(current.id)) {
    reversedPath.push(current.id);
    visited.add(current.id);
    const candidates = (current.prerequisiteIds ?? [])
      .map((id) => nodeMap.get(id))
      .filter((node): node is GraphNode => node !== undefined && !visited.has(node.id))
      .sort((left, right) => {
        const sourcePriority =
          Number(right.knowledgeLevelSource === "curated") -
          Number(left.knowledgeLevelSource === "curated");
        if (sourcePriority !== 0) return sourcePriority;
        return (right.knowledgeLevel ?? 0) - (left.knowledgeLevel ?? 0);
      });
    current = candidates[0];
  }

  return reversedPath.reverse();
}

export function buildCognitiveSubgraph(
  nodes: readonly GraphNode[],
  level: KnowledgeLevel | null,
  nodeType: GraphNode["type"] | null
): { nodes: GraphNode[]; targetNodeIds: Set<string> } {
  if (!level) {
    const visibleNodes = nodeType ? nodes.filter((node) => node.type === nodeType) : [...nodes];
    return { nodes: visibleNodes, targetNodeIds: new Set(visibleNodes.map((node) => node.id)) };
  }

  const targetNodes = nodes.filter(
    (node) => node.knowledgeLevel === level && (!nodeType || node.type === nodeType)
  );
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const visibleIds = new Set(targetNodes.map((node) => node.id));
  const pending = [...targetNodes];

  while (pending.length > 0) {
    const current = pending.pop()!;
    for (const prerequisiteId of current.prerequisiteIds ?? []) {
      if (visibleIds.has(prerequisiteId)) continue;
      const prerequisite = nodeMap.get(prerequisiteId);
      if (!prerequisite) continue;
      visibleIds.add(prerequisiteId);
      pending.push(prerequisite);
    }
  }

  return {
    nodes: nodes.filter((node) => visibleIds.has(node.id)),
    targetNodeIds: new Set(targetNodes.map((node) => node.id)),
  };
}
