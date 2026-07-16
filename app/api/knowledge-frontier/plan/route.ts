import { NextResponse } from "next/server";
import { buildCatalogKnowledgeGapPlan } from "@/lib/knowledge-gap-plan-catalog";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";

const VALID_MINUTES = new Set<LearningPlanMinutes>([20, 45, 90]);

function parseRequest(value: unknown): {
  targetId: string;
  knownIds: string[];
  minutes: LearningPlanMinutes;
} | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (
    typeof body.targetId !== "string" ||
    body.targetId.length === 0 ||
    body.targetId.length > 200
  ) {
    return null;
  }
  if (!Array.isArray(body.knownIds) || body.knownIds.length > 2000) return null;
  const knownIds = body.knownIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200
  );
  if (knownIds.length !== body.knownIds.length) return null;
  if (typeof body.minutes !== "number" || !VALID_MINUTES.has(body.minutes as LearningPlanMinutes)) {
    return null;
  }
  return {
    targetId: body.targetId,
    knownIds: [...new Set(knownIds)],
    minutes: body.minutes as LearningPlanMinutes,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = parseRequest(body);
  if (!parsed) return NextResponse.json({ error: "Invalid gap plan request" }, { status: 400 });
  try {
    return NextResponse.json(
      buildCatalogKnowledgeGapPlan(parsed.targetId, parsed.knownIds, parsed.minutes),
      { headers: { "Cache-Control": "private, no-store", "X-Profile-Storage": "local-only" } }
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Unknown knowledge target:")) {
      return NextResponse.json({ error: "Unknown knowledge target" }, { status: 404 });
    }
    throw error;
  }
}
