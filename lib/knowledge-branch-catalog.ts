import type { GraphEdge, GraphNode } from "@/lib/graph-engine";
import { ALL_EDGES, ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { CURATED_LEARNING_PATHS } from "@/subjects/knowledge-graph/data/curated-learning-paths";
import {
  COVERAGE_DOMAIN_META,
  COVERAGE_EVIDENCE_META,
} from "@/lib/knowledge-continuum-coverage-meta";
import type {
  KnowledgeAnchorCandidate,
  KnowledgeBranchCatalog,
  KnowledgeBranchConfidence,
  KnowledgeBranchPathNode,
  KnowledgeBranchTarget,
  KnowledgeTargetSearchResult,
  KnowledgeTargetFilter,
} from "@/lib/knowledge-branch";

type Neighbor = { nodeId: string; edge: GraphEdge };

function pairKey(left: string, right: string): string {
  return left < right ? `${left}|${right}` : `${right}|${left}`;
}

function confidenceFor(distance: number): KnowledgeBranchConfidence {
  if (distance === 0) return "curated";
  if (distance === 1) return "direct";
  if (distance === 2) return "contextual";
  return "exploratory";
}

function relationLabelFor(edge: GraphEdge): string {
  if (edge.label) return edge.label;
  if (edge.type === "temporal") return "时间上的前后联系";
  if (edge.type === "hierarchy") return "层级或组成关系";
  if (edge.type === "domain-link") return "跨学科相关关系";
  return "正文交叉引用";
}

function graphStep(
  node: GraphNode,
  transition: string,
  graphSource: string
): KnowledgeBranchPathNode {
  const domain = COVERAGE_DOMAIN_META[node.domain];
  const evidence = COVERAGE_EVIDENCE_META[node.evidenceMode!];
  const params = new URLSearchParams({
    level: String(node.knowledgeLevel),
    focus: node.id,
    source: graphSource,
  });
  return {
    nodeId: node.id,
    label: node.label,
    level: node.knowledgeLevel!,
    domainId: node.domain,
    domainLabel: domain.label,
    domainColor: domain.color,
    evidenceMode: node.evidenceMode!,
    evidenceLabel: evidence.label,
    evidenceColor: evidence.color,
    transition,
    articleHref: node.url,
    graphHref: `/knowledge-graph?${params.toString()}`,
  };
}

function compareAnchorPaths(
  target: GraphNode,
  anchorNodes: ReadonlyMap<string, GraphNode>,
  left: string[],
  right: string[]
): number {
  const leftAnchorId = left.at(-1)!;
  const rightAnchorId = right.at(-1)!;
  const leftAnchor = anchorNodes.get(leftAnchorId)!;
  const rightAnchor = anchorNodes.get(rightAnchorId)!;
  const domainDifference =
    Number(leftAnchor.domain !== target.domain) - Number(rightAnchor.domain !== target.domain);
  if (domainDifference !== 0) return domainDifference;
  const levelDifference =
    Math.abs(target.knowledgeLevel! - leftAnchor.knowledgeLevel!) -
    Math.abs(target.knowledgeLevel! - rightAnchor.knowledgeLevel!);
  if (levelDifference !== 0) return levelDifference;
  const directionDifference =
    Number(leftAnchor.knowledgeLevel! > target.knowledgeLevel!) -
    Number(rightAnchor.knowledgeLevel! > target.knowledgeLevel!);
  if (directionDifference !== 0) return directionDifference;
  return leftAnchor.id.localeCompare(rightAnchor.id);
}

function nearestAnchorPaths(
  target: GraphNode,
  neighbors: ReadonlyMap<string, readonly Neighbor[]>,
  anchorNodes: ReadonlyMap<string, GraphNode>
): string[][] {
  if (anchorNodes.has(target.id)) return [[target.id]];
  const visited = new Set([target.id]);
  let frontier: string[][] = [[target.id]];

  while (frontier.length > 0) {
    const candidates = frontier.filter((path) => anchorNodes.has(path.at(-1)!));
    if (candidates.length > 0) {
      return candidates.sort((left, right) => compareAnchorPaths(target, anchorNodes, left, right));
    }

    const nextFrontier: string[][] = [];
    for (const path of frontier) {
      for (const neighbor of neighbors.get(path.at(-1)!) ?? []) {
        if (visited.has(neighbor.nodeId)) continue;
        visited.add(neighbor.nodeId);
        nextFrontier.push([...path, neighbor.nodeId]);
      }
    }
    frontier = nextFrontier;
  }
  throw new Error(`No compatible curated anchor for graph node: ${target.id}`);
}

function anchorSelectionReason(
  target: GraphNode,
  anchor: GraphNode,
  candidateCount: number
): string {
  const domainReason =
    anchor.domain === target.domain
      ? `与目标同属${COVERAGE_DOMAIN_META[target.domain].label}`
      : `由${COVERAGE_DOMAIN_META[anchor.domain].label}跨学科接入`;
  const levelGap = Math.abs(target.knowledgeLevel! - anchor.knowledgeLevel!);
  const levelReason =
    levelGap === 0 ? `与目标同为L${target.knowledgeLevel}` : `与目标层级相差${levelGap}级`;
  const directionReason =
    anchor.knowledgeLevel! > target.knowledgeLevel!
      ? "需从较高层锚点回看相关概念"
      : "锚点层级不高于目标";
  return `${candidateCount}个最短候选等距；${domainReason}；${levelReason}；${directionReason}`;
}

export function buildKnowledgeBranchCatalog(): KnowledgeBranchCatalog {
  const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
  const neighbors = new Map<string, Neighbor[]>();
  const edgeMap = new Map<string, GraphEdge>();
  for (const node of ALL_NODES) neighbors.set(node.id, []);
  for (const edge of ALL_EDGES) {
    neighbors.get(edge.source)?.push({ nodeId: edge.target, edge });
    neighbors.get(edge.target)?.push({ nodeId: edge.source, edge });
    edgeMap.set(pairKey(edge.source, edge.target), edge);
  }

  const anchorPathByNode = new Map<string, (typeof CURATED_LEARNING_PATHS)[number]>();
  for (const path of CURATED_LEARNING_PATHS) {
    for (const step of path.steps) anchorPathByNode.set(step.nodeId, path);
  }
  const anchorNodes = new Map(
    [...anchorPathByNode.keys()].map((nodeId) => [nodeId, nodeMap.get(nodeId)!])
  );

  const targets: KnowledgeBranchTarget[] = ALL_NODES.map((target) => {
    const targetToAnchors = nearestAnchorPaths(target, neighbors, anchorNodes);
    const candidateCount = targetToAnchors.length;
    const anchorCandidates: KnowledgeAnchorCandidate[] = targetToAnchors
      .slice(0, 3)
      .map((targetToAnchor) => {
        const anchorToTarget = [...targetToAnchor].reverse();
        const anchorNode = nodeMap.get(anchorToTarget[0]!)!;
        const anchorPath = anchorPathByNode.get(anchorNode.id)!;
        const branchPath = anchorToTarget.map((nodeId, index) => {
          const node = nodeMap.get(nodeId)!;
          const edge =
            index > 0 ? edgeMap.get(pairKey(anchorToTarget[index - 1]!, nodeId)) : undefined;
          const relationLabel = edge ? relationLabelFor(edge) : undefined;
          return {
            ...graphStep(node, relationLabel ?? "图谱相关关系", "branch-plan"),
            relationFromPrevious: relationLabel,
          };
        });
        const distance = branchPath.length - 1;
        return {
          anchorNodeId: anchorNode.id,
          anchorLabel: anchorNode.label,
          anchorPathId: anchorPath.id,
          anchorPathTitle: anchorPath.title,
          anchorLevel: anchorNode.knowledgeLevel!,
          anchorDomainId: anchorNode.domain,
          anchorDomainLabel: COVERAGE_DOMAIN_META[anchorNode.domain].label,
          distance,
          confidence: confidenceFor(distance),
          branchPath,
          sameDomain: anchorNode.domain === target.domain,
          levelGap: Math.abs(target.knowledgeLevel! - anchorNode.knowledgeLevel!),
          requiresHigherAnchor: anchorNode.knowledgeLevel! > target.knowledgeLevel!,
          selectionReason: anchorSelectionReason(target, anchorNode, candidateCount),
        };
      });
    const selectedAnchor = anchorCandidates[0]!;
    const domain = COVERAGE_DOMAIN_META[target.domain];
    const evidence = COVERAGE_EVIDENCE_META[target.evidenceMode!];
    return {
      id: target.id,
      label: target.label,
      description: target.description,
      level: target.knowledgeLevel!,
      levelSource: target.knowledgeLevelSource!,
      domainId: target.domain,
      domainLabel: domain.label,
      domainColor: domain.color,
      evidenceMode: target.evidenceMode!,
      evidenceLabel: evidence.label,
      articleHref: target.url,
      anchorNodeId: selectedAnchor.anchorNodeId,
      anchorLabel: selectedAnchor.anchorLabel,
      anchorPathId: selectedAnchor.anchorPathId,
      anchorPathTitle: selectedAnchor.anchorPathTitle,
      anchorLevel: selectedAnchor.anchorLevel,
      distance: selectedAnchor.distance,
      confidence: selectedAnchor.confidence,
      branchPath: selectedAnchor.branchPath,
      candidateCount,
      anchorCandidates,
      keywords: target.tags,
    };
  });

  const confidenceCounts: Record<KnowledgeBranchConfidence, number> = {
    curated: 0,
    direct: 0,
    contextual: 0,
    exploratory: 0,
  };
  for (const target of targets) confidenceCounts[target.confidence] += 1;
  return {
    summary: {
      nodeCount: targets.length,
      anchorCount: anchorNodes.size,
      inferredBranchCount: targets.length - anchorNodes.size,
      maximumDistance: Math.max(...targets.map((target) => target.distance)),
      ambiguousTargetCount: targets.filter((target) => target.candidateCount > 1).length,
      maximumCandidateCount: Math.max(...targets.map((target) => target.candidateCount)),
      confidenceCounts,
    },
    targets,
  };
}

export function searchKnowledgeBranchTargets(
  catalog: KnowledgeBranchCatalog,
  query: string,
  limit = 20,
  filter: KnowledgeTargetFilter = {}
): KnowledgeBranchTarget[] {
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  const candidates = catalog.targets.map((target) => {
    const label = target.label.toLocaleLowerCase("zh-CN");
    const keywords = target.keywords.join(" ").toLocaleLowerCase("zh-CN");
    const score = !normalized
      ? target.confidence === "curated"
        ? 2
        : 1
      : label === normalized
        ? 0
        : label.startsWith(normalized)
          ? 1
          : label.includes(normalized)
            ? 2
            : keywords.includes(normalized)
              ? 3
              : Number.POSITIVE_INFINITY;
    return { target, score };
  });
  return candidates
    .filter(
      ({ target, score }) =>
        Number.isFinite(score) &&
        (!filter.domainId || target.domainId === filter.domainId) &&
        (!filter.level || target.level === filter.level) &&
        (!filter.confidence || target.confidence === filter.confidence)
    )
    .sort(
      (left, right) =>
        left.score - right.score ||
        left.target.distance - right.target.distance ||
        left.target.label.localeCompare(right.target.label, "zh-CN")
    )
    .slice(0, limit)
    .map((candidate) => candidate.target);
}

export function toKnowledgeTargetSearchResult(
  target: KnowledgeBranchTarget
): KnowledgeTargetSearchResult {
  return {
    id: target.id,
    label: target.label,
    domainLabel: target.domainLabel,
    domainColor: target.domainColor,
    level: target.level,
    levelSource: target.levelSource,
    anchorLabel: target.anchorLabel,
    distance: target.distance,
    confidence: target.confidence,
    candidateCount: target.candidateCount,
  };
}
