import { NextResponse } from "next/server";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import {
  KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
  type KnowledgeCoveragePayload,
} from "@/lib/knowledge-continuum-payload";

export const dynamic = "force-static";
export const revalidate = 86400;

const payload: KnowledgeCoveragePayload = {
  coverage: buildKnowledgeCoverageSnapshot(),
};

export function GET(): NextResponse<KnowledgeCoveragePayload> {
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
      "X-Content-Strategy": "deferred-static",
    },
  });
}
