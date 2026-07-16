import type { KnowledgeConfluenceSummaryCatalog } from "@/lib/knowledge-confluence";
import type { KnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import type { LearningPlanCatalog } from "@/lib/knowledge-learning-plan";
import type { KnowledgeSpineAtlas } from "@/lib/knowledge-spine-atlas";
import type { KnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";

export const KNOWLEDGE_CONTINUUM_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export interface KnowledgeSpinePayload {
  atlas: KnowledgeSpineAtlas;
}

export interface KnowledgePlannerPayload {
  catalog: LearningPlanCatalog;
  terrain: KnowledgeTerrainSnapshot;
}

export interface KnowledgeCoveragePayload {
  coverage: KnowledgeCoverageSnapshot;
}

export interface KnowledgeConfluenceCatalogPayload {
  catalog: KnowledgeConfluenceSummaryCatalog;
}
