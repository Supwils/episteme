import { NextResponse } from "next/server";
import { buildCatalogKnowledgeGapPlan } from "@/lib/knowledge-gap-plan-catalog";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import type { KnowledgeGapJourneyPlanInput } from "@/lib/knowledge-gap-journey-plans-view";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import { getRequestId, withRequestId } from "@/lib/api-request-id";
import { checkRateLimit, getClientIdentifier } from "@/lib/api-rate-limiter";
import { logRateLimitHit, logValidationError } from "@/lib/api-validation-logger";

const VALID_MINUTES = new Set<LearningPlanMinutes>([20, 45, 90]);
const MAX_JOURNEYS = 16;
const MAX_BODY_SIZE = 100_000; // 100KB

function parseRequest(value: unknown): {
  knownIds: string[];
  journeys: KnowledgeGapJourneyPlanInput[];
} | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (!Array.isArray(body.knownIds) || body.knownIds.length > 2000) return null;
  const knownIds = body.knownIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200
  );
  if (knownIds.length !== body.knownIds.length) return null;
  if (
    !Array.isArray(body.journeys) ||
    body.journeys.length === 0 ||
    body.journeys.length > MAX_JOURNEYS
  ) {
    return null;
  }
  const journeys = body.journeys.flatMap<KnowledgeGapJourneyPlanInput>((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const candidate = entry as Record<string, unknown>;
    if (
      typeof candidate.targetId !== "string" ||
      candidate.targetId.length === 0 ||
      candidate.targetId.length > 200 ||
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
  return { knownIds: [...new Set(knownIds)], journeys };
}

export async function POST(request: Request): Promise<NextResponse> {
  const requestId = getRequestId(request);
  const clientId = getClientIdentifier(request);

  const rateLimitResult = checkRateLimit(clientId, {
    capacity: 15,
    refillRate: 0.2,
    keyPrefix: "frontier-journeys:",
  });

  if (!rateLimitResult.allowed) {
    logRateLimitHit(
      { requestId, endpoint: "/api/knowledge-frontier/journeys", clientId },
      rateLimitResult.retryAfter!
    );
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: withRequestId(requestId, {
          "Retry-After": String(rateLimitResult.retryAfter),
        }),
      }
    );
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier/journeys", clientId }, [
      { field: "body", reason: "Payload too large", value: contentLength },
    ]);
    return NextResponse.json(
      { error: "Payload too large" },
      { status: 413, headers: withRequestId(requestId) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier/journeys", clientId }, [
      { field: "body", reason: "Invalid JSON" },
    ]);
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  const parsed = parseRequest(body);
  if (!parsed) {
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier/journeys", clientId }, [
      { reason: "Invalid journey plan request structure" },
    ]);
    return NextResponse.json(
      { error: "Invalid journey plan request" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
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
  return NextResponse.json(
    { plans, unavailableTargetIds },
    {
      headers: withRequestId(requestId, {
        "Cache-Control": "private, no-store",
        "X-Profile-Storage": "local-only",
      }),
    }
  );
}
