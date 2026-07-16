import { NextResponse } from "next/server";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import {
  KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
  type KnowledgeSpinePayload,
} from "@/lib/knowledge-continuum-payload";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { buildKnowledgeSpineAtlas } from "@/lib/knowledge-spine-atlas";

export const dynamic = "force-static";
export const revalidate = 86400;

const payload: KnowledgeSpinePayload = {
  atlas: buildKnowledgeSpineAtlas(buildLearningPlanCatalog(), buildKnowledgeCoverageSnapshot()),
};

export function GET(): NextResponse<KnowledgeSpinePayload> {
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
      "X-Content-Strategy": "deferred-static",
    },
  });
}
