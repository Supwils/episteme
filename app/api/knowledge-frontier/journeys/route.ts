import type { NextResponse } from "next/server";
import {
  knowledgeJsonResponse,
  MAX_KNOWLEDGE_ID_LENGTH,
  MAX_KNOWLEDGE_JOURNEYS,
  parseKnownNodeIds,
  readKnowledgeRequestBody,
} from "@/lib/knowledge-api-request";
import { buildCatalogKnowledgeGapPlan } from "@/lib/knowledge-gap-plan-catalog";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import type { KnowledgeGapJourneyPlanInput } from "@/lib/knowledge-gap-journey-plans-view";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";

const VALID_MINUTES = new Set<LearningPlanMinutes>([20, 45, 90]);

function parseRequest(value: unknown): {
  knownIds: string[];
  journeys: KnowledgeGapJourneyPlanInput[];
} | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const knownIds = parseKnownNodeIds(body.knownIds);
  if (!knownIds) return null;
  if (
    !Array.isArray(body.journeys) ||
    body.journeys.length === 0 ||
    body.journeys.length > MAX_KNOWLEDGE_JOURNEYS
  ) {
    return null;
  }
  const journeys = body.journeys.flatMap<KnowledgeGapJourneyPlanInput>((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const candidate = entry as Record<string, unknown>;
    if (
      typeof candidate.targetId !== "string" ||
      candidate.targetId.length === 0 ||
      candidate.targetId.length > MAX_KNOWLEDGE_ID_LENGTH ||
      typeof candidate.minutes !== "number" ||
      !VALID_MINUTES.has(candidate.minutes as LearningPlanMinutes)
    ) {
      return [];
    }
    return [
      {
        targetId: candidate.targetId,
        minutes: candidate.minutes as LearningPlanMinutes,
      },
    ];
  });
  if (
    journeys.length !== body.journeys.length ||
    new Set(journeys.map((journey) => journey.targetId)).size !== journeys.length
  ) {
    return null;
  }
  return { knownIds, journeys };
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await readKnowledgeRequestBody(request);
  if (!body.ok) return body.response;
  const parsed = parseRequest(body.body);
  if (!parsed) return knowledgeJsonResponse({ error: "Invalid journey plan request" }, 400);
  const plans: KnowledgeGapPlan[] = [];
  const unavailableTargetIds: string[] = [];
  for (const journey of parsed.journeys) {
    try {
      plans.push(buildCatalogKnowledgeGapPlan(journey.targetId, parsed.knownIds, journey.minutes));
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Unknown knowledge target:")) {
        unavailableTargetIds.push(journey.targetId);
        continue;
      }
      throw error;
    }
  }
  return knowledgeJsonResponse({ plans, unavailableTargetIds });
}
