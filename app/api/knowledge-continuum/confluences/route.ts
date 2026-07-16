import { NextResponse } from "next/server";
import { buildKnowledgeConfluenceSummaryCatalog } from "@/lib/knowledge-confluence-catalog";
import {
  KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
  type KnowledgeConfluenceCatalogPayload,
} from "@/lib/knowledge-continuum-payload";

export const dynamic = "force-static";
export const revalidate = 86400;

const payload: KnowledgeConfluenceCatalogPayload = {
  catalog: buildKnowledgeConfluenceSummaryCatalog(),
};

export function GET(): NextResponse<KnowledgeConfluenceCatalogPayload> {
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
      "X-Content-Strategy": "deferred-static",
    },
  });
}
