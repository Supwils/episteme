import {
  KNOWLEDGE_BRANCH_CONFIDENCE_META,
  type KnowledgeBranchConfidence,
  type KnowledgeTargetFilter,
} from "@/lib/knowledge-branch";
import {
  COVERAGE_DOMAIN_META,
  type CoverageDomainId,
} from "@/lib/knowledge-continuum-coverage-meta";
import { parseKnowledgeLevel } from "@/lib/knowledge-levels";

export interface LearningRouteUrlState {
  mode: "curated" | "all-nodes";
  filter: KnowledgeTargetFilter | null;
  targetId: string | null;
  anchorNodeId: string | null;
}

const PARAMS = {
  mode: "learn",
  domain: "learnDomain",
  level: "learnLevel",
  confidence: "learnConfidence",
  target: "learnTarget",
  anchor: "learnAnchor",
} as const;

const LEARNING_ROUTE_PARAMS = Object.values(PARAMS);

export function hasLearningRouteUrlState(searchParams: URLSearchParams): boolean {
  return LEARNING_ROUTE_PARAMS.some((parameter) => searchParams.has(parameter));
}

export function parseLearningRouteUrlState(searchParams: URLSearchParams): LearningRouteUrlState {
  const requestedDomain = searchParams.get(PARAMS.domain)?.trim();
  const domainId =
    requestedDomain && requestedDomain in COVERAGE_DOMAIN_META
      ? (requestedDomain as CoverageDomainId)
      : undefined;
  const level = parseKnowledgeLevel(searchParams.get(PARAMS.level)) ?? undefined;
  const requestedConfidence = searchParams.get(PARAMS.confidence)?.trim();
  const confidence =
    requestedConfidence && requestedConfidence in KNOWLEDGE_BRANCH_CONFIDENCE_META
      ? (requestedConfidence as KnowledgeBranchConfidence)
      : undefined;
  const targetId = searchParams.get(PARAMS.target)?.trim() || null;
  const anchorNodeId = targetId ? searchParams.get(PARAMS.anchor)?.trim() || null : null;
  const filter = domainId || level || confidence ? { domainId, level, confidence } : null;
  const hasAllNodeState =
    searchParams.get(PARAMS.mode) === "all" || Boolean(filter || targetId || anchorNodeId);
  return {
    mode: hasAllNodeState ? "all-nodes" : "curated",
    filter,
    targetId,
    anchorNodeId,
  };
}

export function updateLearningRouteSearchParams(
  current: URLSearchParams,
  state: LearningRouteUrlState
): URLSearchParams {
  const next = new URLSearchParams(current);
  for (const parameter of LEARNING_ROUTE_PARAMS) next.delete(parameter);
  if (state.mode !== "all-nodes") return next;

  next.set(PARAMS.mode, "all");
  if (state.filter?.domainId) next.set(PARAMS.domain, state.filter.domainId);
  if (state.filter?.level) next.set(PARAMS.level, String(state.filter.level));
  if (state.filter?.confidence) next.set(PARAMS.confidence, state.filter.confidence);
  if (state.targetId) next.set(PARAMS.target, state.targetId);
  if (state.targetId && state.anchorNodeId) next.set(PARAMS.anchor, state.anchorNodeId);
  return next;
}

export function buildLearningRouteUrl(currentUrl: string, state: LearningRouteUrlState): string {
  const url = new URL(currentUrl);
  url.search = updateLearningRouteSearchParams(url.searchParams, state).toString();
  return url.toString();
}
