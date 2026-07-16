import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeFrontierSnapshot, type KnowledgeFrontierStatus } from "./knowledge-frontier";
import {
  allocateLearningMinutes,
  learningActivityFor,
  type LearningPlanMinutes,
} from "./knowledge-learning-plan";
import {
  COVERAGE_DOMAIN_META,
  COVERAGE_EVIDENCE_META,
  type CoverageDomainId,
  type CoverageEvidenceMode,
} from "./knowledge-continuum-coverage-meta";
import type { KnowledgeLevel } from "./knowledge-levels";
import type {
  LearningRelationRole,
  ReviewedLearningRelation,
} from "@/subjects/knowledge-graph/data/frontier-prerequisite-relations";

export interface KnowledgeGapPlanReference {
  id: string;
  label: string;
  domainId: CoverageDomainId;
  domainLabel: string;
  level: KnowledgeLevel;
}

export interface KnowledgeGapPlanEdge {
  sourceId: string;
  targetId: string;
}

export interface KnowledgeGapPlanStep extends KnowledgeGapPlanReference {
  domainColor: string;
  evidenceMode: CoverageEvidenceMode;
  evidenceLabel: string;
  layer: number;
  order: number;
  minutes: number;
  activity: string;
  reason: string;
  articleHref?: string;
  graphHref: string;
}

export interface KnowledgeGapPlanContext {
  role: Exclude<LearningRelationRole, "required-prerequisite">;
  roleLabel: string;
  node: KnowledgeGapPlanReference;
  rationale: string;
}

export interface KnowledgeGapPlanRelease {
  releaseId: string;
  version: string;
}

export interface KnowledgeGapPlanVersion {
  schemaVersion: 1;
  fingerprint: string;
  relationReleases: readonly KnowledgeGapPlanRelease[];
  relationIds: readonly string[];
}

export interface KnowledgeGapPlan {
  target: KnowledgeGapPlanReference;
  status: KnowledgeFrontierStatus;
  available: boolean;
  boundaryMessage?: string;
  totalMinutes: LearningPlanMinutes;
  gapCount: number;
  knownBoundary: readonly KnowledgeGapPlanReference[];
  steps: readonly KnowledgeGapPlanStep[];
  edges: readonly KnowledgeGapPlanEdge[];
  contexts: readonly KnowledgeGapPlanContext[];
  version: KnowledgeGapPlanVersion;
}

function fingerprint(parts: readonly string[]): string {
  let hash = 2166136261;
  for (const character of parts.join("\u001f")) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `kgp-1-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function versionFor(
  targetId: string,
  status: KnowledgeFrontierStatus,
  stepIds: readonly string[],
  edges: readonly KnowledgeGapPlanEdge[],
  knownBoundaryIds: readonly string[],
  relations: readonly ReviewedLearningRelation[]
): KnowledgeGapPlanVersion {
  const routeIds = new Set([targetId, ...stepIds]);
  const routeRelations = relations
    .filter((relation) => routeIds.has(relation.targetId))
    .sort((left, right) => left.id.localeCompare(right.id));
  const relationReleases = [
    ...new Map(
      routeRelations.map((relation) => [
        `${relation.releaseId}@${relation.version}`,
        { releaseId: relation.releaseId, version: relation.version },
      ])
    ).values(),
  ].sort((left, right) =>
    `${left.releaseId}@${left.version}`.localeCompare(`${right.releaseId}@${right.version}`)
  );
  const relationIds = routeRelations.map((relation) => relation.id);
  const signature = [
    `target:${targetId}`,
    `status:${status}`,
    ...stepIds.map((id) => `step:${id}`),
    ...edges
      .map((edge) => `${edge.sourceId}->${edge.targetId}`)
      .sort()
      .map((edge) => `edge:${edge}`),
    ...knownBoundaryIds
      .slice()
      .sort()
      .map((id) => `boundary:${id}`),
    ...routeRelations.map(
      (relation) =>
        `relation:${relation.id}@${relation.version}:${relation.sourceId}->${relation.targetId}:${relation.role}`
    ),
  ];
  return {
    schemaVersion: 1,
    fingerprint: fingerprint(signature),
    relationReleases,
    relationIds,
  };
}

function referenceFor(node: GraphNode): KnowledgeGapPlanReference {
  if (!node.knowledgeLevel) throw new Error(`Knowledge level is missing: ${node.id}`);
  return {
    id: node.id,
    label: node.label,
    domainId: node.domain,
    domainLabel: COVERAGE_DOMAIN_META[node.domain].label,
    level: node.knowledgeLevel,
  };
}

function topologicalRoute(
  targetId: string,
  routeIds: ReadonlySet<string>,
  nodeMap: ReadonlyMap<string, GraphNode>
): GraphNode[] {
  const ordered: GraphNode[] = [];
  const visiting = new Set<string>();
  const visited = new Set<string>();

  function visit(nodeId: string): void {
    if (!routeIds.has(nodeId) || visited.has(nodeId)) return;
    if (visiting.has(nodeId)) throw new Error(`Prerequisite cycle detected at ${nodeId}`);
    visiting.add(nodeId);
    const node = nodeMap.get(nodeId)!;
    for (const prerequisiteId of node.prerequisiteIds ?? []) visit(prerequisiteId);
    visiting.delete(nodeId);
    visited.add(nodeId);
    ordered.push(node);
  }

  visit(targetId);
  return ordered;
}

export function buildKnowledgeGapPlan(
  nodes: readonly GraphNode[],
  relations: readonly ReviewedLearningRelation[],
  targetId: string,
  requestedKnownIds: readonly string[],
  totalMinutes: LearningPlanMinutes
): KnowledgeGapPlan {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const targetNode = nodeMap.get(targetId);
  if (!targetNode) throw new Error(`Unknown knowledge target: ${targetId}`);
  const target = referenceFor(targetNode);
  const snapshot = buildKnowledgeFrontierSnapshot(nodes, requestedKnownIds);
  const state = snapshot.states.get(targetId)!;
  const knownIds = new Set(requestedKnownIds.filter((id) => nodeMap.has(id)));

  if (state.metadataGap) {
    const version = versionFor(targetId, state.status, [], [], [], relations);
    return {
      target,
      status: state.status,
      available: false,
      boundaryMessage: "该目标尚无经过复核的低阶锚点，平台不会用普通相关关系代替前置。",
      totalMinutes,
      gapCount: 0,
      knownBoundary: [],
      steps: [],
      edges: [],
      contexts: [],
      version,
    };
  }

  const routeIds = new Set(state.gapIds);
  if (!knownIds.has(targetId)) routeIds.add(targetId);
  const routeNodes = routeIds.size > 0 ? topologicalRoute(targetId, routeIds, nodeMap) : [];
  const layerById = new Map<string, number>();
  for (const node of routeNodes) {
    const prerequisiteLayers = (node.prerequisiteIds ?? [])
      .filter((id) => routeIds.has(id))
      .map((id) => layerById.get(id) ?? 0);
    layerById.set(node.id, prerequisiteLayers.length > 0 ? Math.max(...prerequisiteLayers) + 1 : 1);
  }

  const allocations =
    routeNodes.length > 0
      ? allocateLearningMinutes(
          totalMinutes,
          routeNodes.map((node) => ({ level: node.knowledgeLevel! }))
        )
      : [];
  const dependents = new Map<string, string[]>();
  const edges: KnowledgeGapPlanEdge[] = [];
  const knownBoundaryIds = new Set<string>();
  for (const node of routeNodes) {
    for (const prerequisiteId of node.prerequisiteIds ?? []) {
      if (routeIds.has(prerequisiteId)) {
        edges.push({ sourceId: prerequisiteId, targetId: node.id });
        dependents.set(prerequisiteId, [...(dependents.get(prerequisiteId) ?? []), node.id]);
      } else if (knownIds.has(prerequisiteId)) {
        knownBoundaryIds.add(prerequisiteId);
      }
    }
  }

  const steps = routeNodes.map<KnowledgeGapPlanStep>((node, index) => {
    const reference = referenceFor(node);
    const evidenceMode = node.evidenceMode!;
    const dependentLabels = (dependents.get(node.id) ?? [])
      .map((id) => nodeMap.get(id)?.label)
      .filter((label): label is string => Boolean(label));
    const params = new URLSearchParams({
      focus: node.id,
      level: String(reference.level),
      source: "gap-plan",
    });
    return {
      ...reference,
      domainColor: COVERAGE_DOMAIN_META[node.domain].color,
      evidenceMode,
      evidenceLabel: COVERAGE_EVIDENCE_META[evidenceMode].label,
      layer: layerById.get(node.id)!,
      order: index + 1,
      minutes: allocations[index]!,
      activity: learningActivityFor({ evidenceMode }, totalMinutes),
      reason:
        node.id === targetId
          ? "这是本次补缺路线的目标节点。"
          : `完成后可解锁：${dependentLabels.join("、")}。`,
      articleHref: node.url,
      graphHref: `/knowledge-graph?${params.toString()}`,
    };
  });

  const roleLabels: Record<KnowledgeGapPlanContext["role"], string> = {
    "recommended-background": "推荐背景",
    "related-context": "相关语境",
  };
  const contexts = relations.flatMap<KnowledgeGapPlanContext>((relation) => {
    if (relation.targetId !== targetId || relation.role === "required-prerequisite") return [];
    const node = nodeMap.get(relation.sourceId);
    if (!node) return [];
    return [
      {
        role: relation.role,
        roleLabel: roleLabels[relation.role],
        node: referenceFor(node),
        rationale: relation.rationale,
      },
    ];
  });
  const knownBoundary = [...knownBoundaryIds]
    .map((id) => referenceFor(nodeMap.get(id)!))
    .sort(
      (left, right) => left.level - right.level || left.label.localeCompare(right.label, "zh-CN")
    );
  const version = versionFor(
    targetId,
    state.status,
    steps.map((step) => step.id),
    edges,
    knownBoundary.map((node) => node.id),
    relations
  );

  return {
    target,
    status: state.status,
    available: true,
    totalMinutes,
    gapCount: state.gapIds.length,
    knownBoundary,
    steps,
    edges,
    contexts,
    version,
  };
}
