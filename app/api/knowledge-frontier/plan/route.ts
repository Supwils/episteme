import type { NextResponse } from "next/server";
import {
  knowledgeJsonResponse,
  MAX_KNOWLEDGE_ID_LENGTH,
  parseKnownNodeIds,
  readKnowledgeRequestBody,
} from "@/lib/knowledge-api-request";
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
    body.targetId.length > MAX_KNOWLEDGE_ID_LENGTH
  ) {
    return null;
  }
  const knownIds = parseKnownNodeIds(body.knownIds);
  if (!knownIds) return null;
  if (typeof body.minutes !== "number" || !VALID_MINUTES.has(body.minutes as LearningPlanMinutes)) {
    return null;
  }
  return {
    targetId: body.targetId,
    knownIds,
    minutes: body.minutes as LearningPlanMinutes,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await readKnowledgeRequestBody(request);
  if (!body.ok) return body.response;
  const parsed = parseRequest(body.body);
  if (!parsed) return knowledgeJsonResponse({ error: "Invalid gap plan request" }, 400);
  try {
    return knowledgeJsonResponse(
      buildCatalogKnowledgeGapPlan(parsed.targetId, parsed.knownIds, parsed.minutes)
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Unknown knowledge target:")) {
      return knowledgeJsonResponse({ error: "Unknown knowledge target" }, 404);
    }
    throw error;
  }
}
