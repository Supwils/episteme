import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeFrontierSnapshot, type KnowledgeFrontierStatus } from "./knowledge-frontier";
import { COVERAGE_DOMAIN_META, type CoverageDomainId } from "./knowledge-continuum-coverage-meta";
import type { KnowledgeLevel } from "./knowledge-levels";
import type {
  LearningRelationEvidenceReference,
  LearningRelationRole,
  ReviewedLearningRelation,
} from "@/subjects/knowledge-graph/data/learning-relation-types";
import type { ConfluenceMultiparentReleaseTarget } from "@/subjects/knowledge-graph/data/confluence-prerequisite-release";

export interface KnowledgeRelationReviewReference {
  id: string;
  label: string;
  domainId: CoverageDomainId;
  domainLabel: string;
  domainColor: string;
  level: KnowledgeLevel;
  articleHref?: string;
}

export interface KnowledgeRelationReviewItem {
  id: string;
  role: LearningRelationRole;
  roleLabel: string;
  source: KnowledgeRelationReviewReference;
  rationale: string;
  evidence: readonly LearningRelationEvidenceReference[];
}

export interface KnowledgeRelationTargetImpact {
  confluenceId: string;
  confluenceTitle: string;
  confluenceHref: string;
  graphHref: string;
  target: KnowledgeRelationReviewReference;
  baselineStatus: KnowledgeFrontierStatus;
  currentStatus: KnowledgeFrontierStatus;
  baselineRequiredCount: number;
  currentRequiredCount: number;
  netNewRequiredCount: number;
  baselineRouteNodeCount: number;
  currentRouteNodeCount: number;
  routeNodeDelta: number;
  downstreamAffectedCount: number;
  cycleRisk: "none" | "cycle";
  relations: readonly KnowledgeRelationReviewItem[];
}

export interface KnowledgeRelationReviewView {
  release: {
    id: string;
    title: string;
    version: string;
    reviewedAt: string;
    status: "published";
  };
  summary: {
    targetCount: number;
    relationCount: number;
    requiredRelationCount: number;
    netNewRequiredCount: number;
    recommendedRelationCount: number;
    contextRelationCount: number;
    routeNodeDelta: number;
    cycleCount: number;
    personalChangedTargetCount: number;
    personalReadyDelta: number;
    personalBlockedDelta: number;
    referenceReadyBefore: number;
    referenceReadyAfter: number;
    referenceBlockedAfter: number;
  };
  targets: readonly KnowledgeRelationTargetImpact[];
}

const ROLE_LABELS: Record<LearningRelationRole, string> = {
  "required-prerequisite": "必要前置",
  "recommended-background": "推荐背景",
  "related-context": "争议语境",
};

function referenceFor(node: GraphNode): KnowledgeRelationReviewReference {
  if (!node.knowledgeLevel) throw new Error(`Knowledge level is missing: ${node.id}`);
  const domain = COVERAGE_DOMAIN_META[node.domain];
  return {
    id: node.id,
    label: node.label,
    domainId: node.domain,
    domainLabel: domain.label,
    domainColor: domain.color,
    level: node.knowledgeLevel,
    articleHref: node.url,
  };
}

function prerequisiteClosure(
  targetId: string,
  nodeMap: ReadonlyMap<string, GraphNode>,
  includeTarget = true
): Set<string> {
  const result = new Set<string>();
  const visiting = new Set<string>();

  function visit(nodeId: string): void {
    if (result.has(nodeId)) return;
    if (visiting.has(nodeId)) throw new Error(`Prerequisite cycle detected at ${nodeId}`);
    const node = nodeMap.get(nodeId);
    if (!node) return;
    visiting.add(nodeId);
    for (const prerequisiteId of node.prerequisiteIds ?? []) visit(prerequisiteId);
    visiting.delete(nodeId);
    result.add(nodeId);
  }

  visit(targetId);
  if (!includeTarget) result.delete(targetId);
  return result;
}

export function wouldCreatePrerequisiteCycle(
  sourceId: string,
  targetId: string,
  nodes: readonly GraphNode[]
): boolean {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return prerequisiteClosure(sourceId, nodeMap).has(targetId);
}

function withBaselinePrerequisites(
  nodes: readonly GraphNode[],
  targets: readonly ConfluenceMultiparentReleaseTarget[]
): GraphNode[] {
  const baselineByTarget = new Map(
    targets.map((target) => [target.targetId, target.baselinePrerequisiteIds])
  );
  return nodes.map((node) => {
    const baseline = baselineByTarget.get(node.id);
    return baseline ? { ...node, prerequisiteIds: [...baseline] } : node;
  });
}

function downstreamCount(targetId: string, nodes: readonly GraphNode[]): number {
  const dependents = new Map<string, string[]>();
  for (const node of nodes) {
    for (const prerequisiteId of node.prerequisiteIds ?? []) {
      dependents.set(prerequisiteId, [...(dependents.get(prerequisiteId) ?? []), node.id]);
    }
  }
  const affected = new Set([targetId]);
  const pending = [targetId];
  while (pending.length > 0) {
    for (const dependentId of dependents.get(pending.pop()!) ?? []) {
      if (affected.has(dependentId)) continue;
      affected.add(dependentId);
      pending.push(dependentId);
    }
  }
  return affected.size;
}

export function buildKnowledgeRelationReviewView(
  nodes: readonly GraphNode[],
  relations: readonly ReviewedLearningRelation[],
  releaseTargets: readonly ConfluenceMultiparentReleaseTarget[],
  releaseMeta: {
    id: string;
    title: string;
    version: string;
    reviewedAt: string;
    status: "published";
  },
  requestedKnownIds: readonly string[]
): KnowledgeRelationReviewView {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const baselineNodes = withBaselinePrerequisites(nodes, releaseTargets);
  const baselineMap = new Map(baselineNodes.map((node) => [node.id, node]));
  const validKnownIds = requestedKnownIds.filter((id) => nodeMap.has(id));
  const baselineSnapshot = buildKnowledgeFrontierSnapshot(baselineNodes, validKnownIds);
  const currentSnapshot = buildKnowledgeFrontierSnapshot(nodes, validKnownIds);
  const releaseRelations = relations.filter((relation) => relation.releaseId === releaseMeta.id);

  const targets = releaseTargets.map<KnowledgeRelationTargetImpact>((releaseTarget) => {
    const targetNode = nodeMap.get(releaseTarget.targetId);
    if (!targetNode)
      throw new Error(`Relation review target is missing: ${releaseTarget.targetId}`);
    const targetRelations = releaseRelations.filter(
      (relation) => relation.targetId === releaseTarget.targetId
    );
    const requiredRelations = targetRelations.filter(
      (relation) => relation.role === "required-prerequisite"
    );
    const netNewRelations = requiredRelations.filter(
      (relation) => !releaseTarget.baselinePrerequisiteIds.includes(relation.sourceId)
    );
    const cycleRisk = netNewRelations.some((relation) =>
      wouldCreatePrerequisiteCycle(relation.sourceId, relation.targetId, baselineNodes)
    )
      ? "cycle"
      : "none";
    const baselineRouteNodeCount = prerequisiteClosure(releaseTarget.targetId, baselineMap).size;
    const currentRouteNodeCount = prerequisiteClosure(releaseTarget.targetId, nodeMap).size;
    const params = new URLSearchParams({
      focus: releaseTarget.targetId,
      level: "5",
      source: "relation-review",
    });
    return {
      confluenceId: releaseTarget.confluenceId,
      confluenceTitle: releaseTarget.confluenceTitle,
      confluenceHref:
        releaseTarget.evidenceHref ?? `/knowledge-confluence/${releaseTarget.confluenceId}`,
      graphHref: `/knowledge-graph?${params.toString()}`,
      target: referenceFor(targetNode),
      baselineStatus: baselineSnapshot.states.get(releaseTarget.targetId)!.status,
      currentStatus: currentSnapshot.states.get(releaseTarget.targetId)!.status,
      baselineRequiredCount: releaseTarget.baselinePrerequisiteIds.length,
      currentRequiredCount: targetNode.prerequisiteIds?.length ?? 0,
      netNewRequiredCount: netNewRelations.length,
      baselineRouteNodeCount,
      currentRouteNodeCount,
      routeNodeDelta: currentRouteNodeCount - baselineRouteNodeCount,
      downstreamAffectedCount: downstreamCount(releaseTarget.targetId, nodes),
      cycleRisk,
      relations: targetRelations.map((relation) => {
        const source = nodeMap.get(relation.sourceId);
        if (!source) throw new Error(`Relation review source is missing: ${relation.sourceId}`);
        return {
          id: relation.id,
          role: relation.role,
          roleLabel: ROLE_LABELS[relation.role],
          source: referenceFor(source),
          rationale: relation.rationale,
          evidence: relation.evidence,
        };
      }),
    };
  });

  const referenceTargetStates = releaseTargets.map((target) => {
    const referenceKnownIds = [...prerequisiteClosure(target.targetId, baselineMap, false)];
    const referenceBaseline = buildKnowledgeFrontierSnapshot(baselineNodes, referenceKnownIds);
    const referenceCurrent = buildKnowledgeFrontierSnapshot(nodes, referenceKnownIds);
    return {
      before: referenceBaseline.states.get(target.targetId)!.status,
      after: referenceCurrent.states.get(target.targetId)!.status,
    };
  });

  return {
    release: releaseMeta,
    summary: {
      targetCount: targets.length,
      relationCount: releaseRelations.length,
      requiredRelationCount: releaseRelations.filter(
        (relation) => relation.role === "required-prerequisite"
      ).length,
      netNewRequiredCount: targets.reduce((sum, target) => sum + target.netNewRequiredCount, 0),
      recommendedRelationCount: releaseRelations.filter(
        (relation) => relation.role === "recommended-background"
      ).length,
      contextRelationCount: releaseRelations.filter(
        (relation) => relation.role === "related-context"
      ).length,
      routeNodeDelta: targets.reduce((sum, target) => sum + target.routeNodeDelta, 0),
      cycleCount: targets.filter((target) => target.cycleRisk === "cycle").length,
      personalChangedTargetCount: targets.filter(
        (target) => target.baselineStatus !== target.currentStatus
      ).length,
      personalReadyDelta: currentSnapshot.summary.readyCount - baselineSnapshot.summary.readyCount,
      personalBlockedDelta:
        currentSnapshot.summary.blockedCount - baselineSnapshot.summary.blockedCount,
      referenceReadyBefore: referenceTargetStates.filter((state) => state.before === "ready")
        .length,
      referenceReadyAfter: referenceTargetStates.filter((state) => state.after === "ready").length,
      referenceBlockedAfter: referenceTargetStates.filter((state) => state.after === "blocked")
        .length,
    },
    targets: targets.sort(
      (left, right) =>
        Number(right.baselineStatus !== right.currentStatus) -
          Number(left.baselineStatus !== left.currentStatus) ||
        right.routeNodeDelta - left.routeNodeDelta ||
        right.downstreamAffectedCount - left.downstreamAffectedCount ||
        left.target.label.localeCompare(right.target.label, "zh-CN")
    ),
  };
}
