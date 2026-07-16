import { NextResponse } from "next/server";
import { buildCatalogKnowledgeRelationReview } from "@/lib/knowledge-relation-review-catalog";

function parseRequest(value: unknown): readonly string[] | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (!Array.isArray(body.knownIds) || body.knownIds.length > 2000) return null;
  const knownIds = body.knownIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200
  );
  return knownIds.length === body.knownIds.length ? [...new Set(knownIds)] : null;
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const knownIds = parseRequest(body);
  if (!knownIds)
    return NextResponse.json({ error: "Invalid relation review request" }, { status: 400 });
  return NextResponse.json(buildCatalogKnowledgeRelationReview(knownIds), {
    headers: { "Cache-Control": "private, no-store", "X-Profile-Storage": "local-only" },
  });
}
