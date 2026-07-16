import { NextResponse } from "next/server";
import { buildKnowledgeBranchCatalog } from "@/lib/knowledge-branch-catalog";
import {
  KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
  type KnowledgePlannerPayload,
} from "@/lib/knowledge-continuum-payload";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { buildKnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";

export const dynamic = "force-static";
export const revalidate = 86400;

const payload: KnowledgePlannerPayload = {
  catalog: buildLearningPlanCatalog(),
  terrain: buildKnowledgeTerrainSnapshot(buildKnowledgeBranchCatalog()),
};

export function GET(): NextResponse<KnowledgePlannerPayload> {
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
      "X-Content-Strategy": "deferred-static",
    },
  });
}
