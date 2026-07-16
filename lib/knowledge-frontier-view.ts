import type { KnowledgeFrontierStatus, KnowledgeFrontierSummary } from "./knowledge-frontier";
import type { CoverageDomainId, CoverageEvidenceMode } from "./knowledge-continuum-coverage-meta";
import type { KnowledgeLevel } from "./knowledge-levels";

export interface KnowledgeFrontierFilter {
  status: KnowledgeFrontierStatus;
  domainId?: CoverageDomainId;
  level?: KnowledgeLevel;
  query?: string;
  offset?: number;
  limit?: number;
}

export interface KnowledgeFrontierReference {
  id: string;
  label: string;
  level: KnowledgeLevel;
  domainLabel: string;
}

export interface KnowledgeFrontierResult {
  id: string;
  label: string;
  domainId: CoverageDomainId;
  domainLabel: string;
  domainColor: string;
  level: KnowledgeLevel;
  source: "curated" | "inferred";
  evidenceMode: CoverageEvidenceMode;
  evidenceLabel: string;
  status: KnowledgeFrontierStatus;
  reason: string;
  prerequisites: readonly KnowledgeFrontierReference[];
  satisfiedPrerequisites: readonly KnowledgeFrontierReference[];
  missingPrerequisites: readonly KnowledgeFrontierReference[];
  gapPreview: readonly KnowledgeFrontierReference[];
  gapCount: number;
  metadataGap: boolean;
  articleHref?: string;
  graphHref: string;
}

export interface KnowledgeFrontierDomainProgress {
  id: CoverageDomainId;
  label: string;
  shortLabel: string;
  color: string;
  status: "established" | "preview";
  total: number;
  mastered: number;
  ready: number;
  blocked: number;
}

export interface KnowledgeFrontierConfluenceProgress {
  id: string;
  title: string;
  question: string;
  targetNodeId: string;
  status: KnowledgeFrontierStatus;
  knownPrerequisiteCount: number;
  prerequisiteCount: number;
  missingPreview: readonly KnowledgeFrontierReference[];
  missingCount: number;
  href: string;
  graphHref: string;
}

export interface KnowledgeProfileNodeSummary {
  id: string;
  label: string;
  domainId: CoverageDomainId;
  domainLabel: string;
  level: KnowledgeLevel;
}

export interface KnowledgeFrontierView {
  summary: KnowledgeFrontierSummary;
  domains: readonly KnowledgeFrontierDomainProgress[];
  recommendations: readonly KnowledgeFrontierResult[];
  confluences: readonly KnowledgeFrontierConfluenceProgress[];
  knownNodes: readonly KnowledgeProfileNodeSummary[];
  results: readonly KnowledgeFrontierResult[];
  resultCount: number;
  offset: number;
  limit: number;
}

export async function fetchKnowledgeFrontier(
  knownIds: readonly string[],
  filter: KnowledgeFrontierFilter,
  signal?: AbortSignal
): Promise<KnowledgeFrontierView> {
  const response = await fetch("/api/knowledge-frontier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ knownIds, filter }),
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Knowledge frontier request failed");
  return (await response.json()) as KnowledgeFrontierView;
}
