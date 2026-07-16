import { buildKnowledgeFrontierSnapshot } from "@/lib/knowledge-frontier";
import type {
  KnowledgeFrontierConfluenceProgress,
  KnowledgeFrontierFilter,
  KnowledgeFrontierReference,
  KnowledgeFrontierResult,
  KnowledgeFrontierView,
} from "@/lib/knowledge-frontier-view";
import {
  COVERAGE_DOMAIN_META,
  COVERAGE_EVIDENCE_META,
  type CoverageDomainId,
} from "@/lib/knowledge-continuum-coverage-meta";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CURATED_KNOWLEDGE_CONFLUENCES,
  getCuratedConfluenceNodeIds,
} from "@/subjects/knowledge-graph/data/curated-confluences";

const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));

function referenceFor(nodeId: string): KnowledgeFrontierReference | null {
  const node = nodeMap.get(nodeId);
  if (!node?.knowledgeLevel) return null;
  return {
    id: node.id,
    label: node.label,
    level: node.knowledgeLevel,
    domainLabel: COVERAGE_DOMAIN_META[node.domain].label,
  };
}

function resultFor(
  nodeId: string,
  snapshot: ReturnType<typeof buildKnowledgeFrontierSnapshot>
): KnowledgeFrontierResult {
  const node = nodeMap.get(nodeId)!;
  const state = snapshot.states.get(nodeId)!;
  const domain = COVERAGE_DOMAIN_META[node.domain];
  const evidenceMode = node.evidenceMode!;
  const params = new URLSearchParams({
    frontier: state.status,
    level: String(state.level),
    focus: node.id,
    source: "knowledge-frontier",
  });
  const references = (ids: readonly string[]) =>
    ids.flatMap((id) => {
      const reference = referenceFor(id);
      return reference ? [reference] : [];
    });
  return {
    id: node.id,
    label: node.label,
    domainId: node.domain,
    domainLabel: domain.label,
    domainColor: domain.color,
    level: state.level,
    source: state.source,
    evidenceMode,
    evidenceLabel: COVERAGE_EVIDENCE_META[evidenceMode].label,
    status: state.status,
    reason: state.reason,
    prerequisites: references(state.prerequisiteIds),
    satisfiedPrerequisites: references(state.satisfiedPrerequisiteIds),
    missingPrerequisites: references(state.missingPrerequisiteIds),
    gapPreview: references(state.gapIds.slice(0, 5)),
    gapCount: state.gapIds.length,
    metadataGap: state.metadataGap,
    articleHref: node.url,
    graphHref: `/knowledge-graph?${params.toString()}`,
  };
}

function compareResults(left: KnowledgeFrontierResult, right: KnowledgeFrontierResult): number {
  if (left.status === "ready" && right.status === "ready") {
    const connectedDifference =
      Number(right.satisfiedPrerequisites.length > 0) -
      Number(left.satisfiedPrerequisites.length > 0);
    if (connectedDifference) return connectedDifference;
    const curatedDifference =
      Number(right.source === "curated") - Number(left.source === "curated");
    if (curatedDifference) return curatedDifference;
    const prerequisiteDifference =
      right.satisfiedPrerequisites.length - left.satisfiedPrerequisites.length;
    if (prerequisiteDifference) return prerequisiteDifference;
  }
  if (left.status === "blocked" && right.status === "blocked") {
    const metadataDifference = Number(left.metadataGap) - Number(right.metadataGap);
    if (metadataDifference) return metadataDifference;
    const gapDifference = left.gapCount - right.gapCount;
    if (gapDifference) return gapDifference;
  }
  return left.level - right.level || left.label.localeCompare(right.label, "zh-CN");
}

function buildRecommendations(
  snapshot: ReturnType<typeof buildKnowledgeFrontierSnapshot>
): KnowledgeFrontierResult[] {
  const byDomain = new Map<CoverageDomainId, KnowledgeFrontierResult[]>();
  for (const node of ALL_NODES) {
    if (snapshot.states.get(node.id)?.status !== "ready") continue;
    const result = resultFor(node.id, snapshot);
    const domainResults = byDomain.get(node.domain) ?? [];
    domainResults.push(result);
    byDomain.set(node.domain, domainResults);
  }
  return (Object.keys(COVERAGE_DOMAIN_META) as CoverageDomainId[]).flatMap((domainId) => {
    const result = byDomain.get(domainId)?.sort(compareResults)[0];
    return result ? [result] : [];
  });
}

function buildConfluences(knownIds: ReadonlySet<string>): KnowledgeFrontierConfluenceProgress[] {
  return CURATED_KNOWLEDGE_CONFLUENCES.map((confluence) => {
    const nodeIds = getCuratedConfluenceNodeIds(confluence);
    const targetNodeId = nodeIds.at(-1)!;
    const prerequisiteIds = nodeIds.slice(0, -1);
    const missingIds = prerequisiteIds.filter((id) => !knownIds.has(id));
    const targetMastered = knownIds.has(targetNodeId);
    const params = new URLSearchParams({
      confluence: confluence.id,
      focus: targetNodeId,
      level: "5",
      source: "knowledge-frontier",
    });
    return {
      id: confluence.id,
      title: confluence.title,
      question: confluence.question,
      targetNodeId,
      status: targetMastered ? "mastered" : missingIds.length === 0 ? "ready" : "blocked",
      knownPrerequisiteCount: prerequisiteIds.length - missingIds.length,
      prerequisiteCount: prerequisiteIds.length,
      missingPreview: missingIds.slice(0, 4).flatMap((id) => {
        const reference = referenceFor(id);
        return reference ? [reference] : [];
      }),
      missingCount: missingIds.length,
      href: `/knowledge-confluence/${confluence.id}`,
      graphHref: `/knowledge-graph?${params.toString()}`,
    };
  });
}

function matchesQuery(nodeId: string, query: string): boolean {
  if (!query) return true;
  const node = nodeMap.get(nodeId)!;
  const haystack = `${node.label} ${node.description} ${node.tags.join(" ")}`.toLocaleLowerCase(
    "zh-CN"
  );
  return haystack.includes(query);
}

export function buildKnowledgeFrontierView(
  requestedKnownIds: readonly string[],
  filter: KnowledgeFrontierFilter
): KnowledgeFrontierView {
  const snapshot = buildKnowledgeFrontierSnapshot(ALL_NODES, requestedKnownIds);
  const validKnownIds = new Set(requestedKnownIds.filter((id) => nodeMap.has(id)));
  const query = filter.query?.trim().toLocaleLowerCase("zh-CN") ?? "";
  const offset = Math.max(0, filter.offset ?? 0);
  const limit = Math.min(48, Math.max(1, filter.limit ?? 24));
  const allResults = ALL_NODES.filter((node) => {
    const state = snapshot.states.get(node.id)!;
    return (
      state.status === filter.status &&
      (!filter.domainId || node.domain === filter.domainId) &&
      (!filter.level || node.knowledgeLevel === filter.level) &&
      matchesQuery(node.id, query)
    );
  })
    .map((node) => resultFor(node.id, snapshot))
    .sort(compareResults);

  const domains = (Object.keys(COVERAGE_DOMAIN_META) as CoverageDomainId[]).map((domainId) => {
    const nodes = ALL_NODES.filter((node) => node.domain === domainId);
    const counts = { mastered: 0, ready: 0, blocked: 0 };
    for (const node of nodes) counts[snapshot.states.get(node.id)!.status] += 1;
    const meta = COVERAGE_DOMAIN_META[domainId];
    return {
      id: domainId,
      label: meta.label,
      shortLabel: meta.shortLabel,
      color: meta.color,
      status: meta.status,
      total: nodes.length,
      ...counts,
    };
  });

  const knownNodes = [...validKnownIds].flatMap((id) => {
    const node = nodeMap.get(id);
    if (!node?.knowledgeLevel) return [];
    return [
      {
        id: node.id,
        label: node.label,
        domainId: node.domain,
        domainLabel: COVERAGE_DOMAIN_META[node.domain].label,
        level: node.knowledgeLevel,
      },
    ];
  });

  return {
    summary: snapshot.summary,
    domains,
    recommendations: buildRecommendations(snapshot),
    confluences: buildConfluences(validKnownIds),
    knownNodes,
    results: allResults.slice(offset, offset + limit),
    resultCount: allResults.length,
    offset,
    limit,
  };
}
