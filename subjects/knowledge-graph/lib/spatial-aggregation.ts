import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";
import type { GraphEdge, GraphNode } from "../data/types";

const ANCHOR_LIMIT = 4;

export type SpatialStageSummary = {
  level: KnowledgeLevel;
  label: string;
  shortLabel: string;
  description: string;
  nodeCount: number;
  articleCount: number;
  crossDomainEdgeCount: number;
  anchorNodes: GraphNode[];
};

export type SpatialDomainSummary = {
  domainId: GraphNode["domain"];
  nodeCount: number;
  articleCount: number;
  crossDomainEdgeCount: number;
  stages: SpatialStageSummary[];
  anchorNodes: GraphNode[];
};

function rankAnchorNodes(
  nodes: readonly GraphNode[],
  importanceByNode: ReadonlyMap<string, number>
): GraphNode[] {
  return [...nodes]
    .sort(
      (left, right) =>
        Number(Boolean(right.url)) - Number(Boolean(left.url)) ||
        (importanceByNode.get(right.id) ?? 0) - (importanceByNode.get(left.id) ?? 0) ||
        left.label.localeCompare(right.label, "zh-CN")
    )
    .slice(0, ANCHOR_LIMIT);
}

export function buildSpatialDomainSummary(
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  domainId: GraphNode["domain"],
  importanceByNode: ReadonlyMap<string, number>
): SpatialDomainSummary {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const domainNodes = nodes.filter((node) => node.domain === domainId);
  const crossDomainEdges = edges.filter((edge) => {
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    return (
      source !== undefined &&
      target !== undefined &&
      source.domain !== target.domain &&
      (source.domain === domainId || target.domain === domainId)
    );
  });

  const stages = KNOWLEDGE_LEVELS.map((levelMeta) => {
    const stageNodes = domainNodes.filter(
      (node) => (node.knowledgeLevel ?? 2) === levelMeta.id
    );
    const stageNodeIds = new Set(stageNodes.map((node) => node.id));
    return {
      level: levelMeta.id,
      label: levelMeta.label,
      shortLabel: levelMeta.shortLabel,
      description: levelMeta.description,
      nodeCount: stageNodes.length,
      articleCount: stageNodes.filter((node) => Boolean(node.url)).length,
      crossDomainEdgeCount: crossDomainEdges.filter(
        (edge) => stageNodeIds.has(edge.source) || stageNodeIds.has(edge.target)
      ).length,
      anchorNodes: rankAnchorNodes(stageNodes, importanceByNode),
    };
  });

  return {
    domainId,
    nodeCount: domainNodes.length,
    articleCount: domainNodes.filter((node) => Boolean(node.url)).length,
    crossDomainEdgeCount: crossDomainEdges.length,
    stages,
    anchorNodes: rankAnchorNodes(domainNodes, importanceByNode),
  };
}
