import type { NextResponse } from "next/server";
import {
  knowledgeJsonResponse,
  parseKnownNodeIds,
  readKnowledgeRequestBody,
} from "@/lib/knowledge-api-request";
import { buildCatalogKnowledgeRelationReview } from "@/lib/knowledge-relation-review-catalog";

function parseRequest(value: unknown): readonly string[] | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  return parseKnownNodeIds(body.knownIds);
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await readKnowledgeRequestBody(request);
  if (!body.ok) return body.response;
  const knownIds = parseRequest(body.body);
  if (!knownIds) return knowledgeJsonResponse({ error: "Invalid relation review request" }, 400);
  return knowledgeJsonResponse(buildCatalogKnowledgeRelationReview(knownIds));
}
