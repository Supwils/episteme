import type { GraphNode } from "@/lib/graph-engine";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CURATED_LEARNING_PATHS,
  type CuratedLearningPath,
} from "@/subjects/knowledge-graph/data/curated-learning-paths";
import {
  COVERAGE_DOMAIN_META,
  COVERAGE_EVIDENCE_META,
  type CoverageDomainId,
  type CoverageEvidenceMode,
  type CoverageReference,
  type CoverageBridgeTransition,
  type DomainCoverageRow,
  type EvidenceCoverageRow,
  type KnowledgeCoverageSnapshot,
} from "@/lib/knowledge-continuum-coverage-meta";

export type {
  CoverageBridge,
  CoverageBridgeTransition,
  CoverageDomainId,
  CoverageEvidenceMode,
  CoverageLevelCounts,
  CoverageReference,
  CoverageStatus,
  DomainCoverageRow,
  EvidenceCoverageRow,
  KnowledgeCoverageSnapshot,
} from "@/lib/knowledge-continuum-coverage-meta";

function emptyLevelCounts(): [number, number, number, number, number] {
  return [0, 0, 0, 0, 0];
}

function addLevel(counts: number[], level: KnowledgeLevel): void {
  counts[level - 1] = (counts[level - 1] ?? 0) + 1;
}

function referenceFor(
  path: CuratedLearningPath,
  step: CuratedLearningPath["steps"][number],
  node: GraphNode
): CoverageReference {
  return {
    pathId: path.id,
    pathTitle: path.title,
    nodeId: node.id,
    nodeLabel: node.label,
    level: step.level,
    transition: step.transition,
  };
}

export function buildKnowledgeCoverageSnapshot(): KnowledgeCoverageSnapshot {
  const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
  const uniqueReferences = new Map<string, CoverageReference>();
  const uniqueEvidence = new Map<string, CoverageEvidenceMode>();
  const bridgePairs = new Map<string, number>();
  const bridgeTransitions: CoverageBridgeTransition[] = [];

  for (const path of CURATED_LEARNING_PATHS) {
    path.steps.forEach((step, index) => {
      const node = nodeMap.get(step.nodeId);
      if (!node) throw new Error(`Curated coverage node is missing: ${path.id}/${step.nodeId}`);
      const existing = uniqueReferences.get(node.id);
      if (existing && existing.level !== step.level) {
        throw new Error(`Curated coverage level conflict: ${node.id}`);
      }
      uniqueReferences.set(node.id, referenceFor(path, step, node));
      uniqueEvidence.set(node.id, step.evidenceMode);

      if (index === 0) return;
      const previous = nodeMap.get(path.steps[index - 1]!.nodeId)!;
      if (previous.domain === node.domain) return;
      const previousStep = path.steps[index - 1]!;
      bridgeTransitions.push({
        id: `${path.id}:${index}`,
        pathId: path.id,
        pathTitle: path.title,
        fromDomain: previous.domain,
        toDomain: node.domain,
        fromNodeId: previous.id,
        fromNodeLabel: previous.label,
        toNodeId: node.id,
        toNodeLabel: node.label,
        fromLevel: previousStep.level,
        level: step.level,
        evidenceMode: step.evidenceMode,
        transition: step.transition,
      });
      const pair = [previous.domain, node.domain].sort().join("|");
      bridgePairs.set(pair, (bridgePairs.get(pair) ?? 0) + 1);
    });
  }

  const domainRows = Object.entries(COVERAGE_DOMAIN_META).map(([id, meta]) => {
    const domainId = id as CoverageDomainId;
    const references = [...uniqueReferences.entries()]
      .filter(([nodeId]) => nodeMap.get(nodeId)?.domain === domainId)
      .map(([, reference]) => reference)
      .sort(
        (left, right) => left.level - right.level || left.pathTitle.localeCompare(right.pathTitle)
      );
    const levels = emptyLevelCounts();
    const evidenceCounts = new Map<CoverageEvidenceMode, number>();
    for (const reference of references) {
      addLevel(levels, reference.level);
      const evidence = uniqueEvidence.get(reference.nodeId)!;
      evidenceCounts.set(evidence, (evidenceCounts.get(evidence) ?? 0) + 1);
    }
    const bridges = [...bridgePairs.entries()]
      .flatMap(([pair, count]) => {
        const [left, right] = pair.split("|") as [CoverageDomainId, CoverageDomainId];
        const peer = left === domainId ? right : right === domainId ? left : null;
        return peer ? [{ id: peer, label: COVERAGE_DOMAIN_META[peer].label, count }] : [];
      })
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));

    return {
      id: domainId,
      ...meta,
      total: references.length,
      levels,
      evidence: [...evidenceCounts.entries()]
        .map(([evidenceId, count]) => ({
          id: evidenceId,
          label: COVERAGE_EVIDENCE_META[evidenceId].label,
          count,
        }))
        .sort((left, right) => right.count - left.count),
      bridges,
      references,
    } satisfies DomainCoverageRow;
  });

  const evidenceRows = Object.entries(COVERAGE_EVIDENCE_META).map(([id, meta]) => {
    const evidenceId = id as CoverageEvidenceMode;
    const references = [...uniqueReferences.values()]
      .filter((reference) => uniqueEvidence.get(reference.nodeId) === evidenceId)
      .sort(
        (left, right) => left.level - right.level || left.pathTitle.localeCompare(right.pathTitle)
      );
    const levels = emptyLevelCounts();
    for (const reference of references) addLevel(levels, reference.level);
    return {
      id: evidenceId,
      ...meta,
      total: references.length,
      levels,
      references,
    } satisfies EvidenceCoverageRow;
  });

  return {
    summary: {
      nodeCount: uniqueReferences.size,
      pathCount: CURATED_LEARNING_PATHS.length,
      prerequisiteCount: CURATED_LEARNING_PATHS.reduce(
        (total, path) => total + Math.max(0, path.steps.length - 1),
        0
      ),
      crossDomainTransitionCount: bridgeTransitions.length,
      establishedDomainCount: domainRows.filter((row) => row.status === "established").length,
      previewDomainCount: domainRows.filter((row) => row.status === "preview").length,
    },
    domains: domainRows,
    evidenceModes: evidenceRows,
    bridgeTransitions,
  };
}
