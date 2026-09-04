import { NextResponse } from "next/server";
import { buildCatalogKnowledgeGapPlan } from "@/lib/knowledge-gap-plan-catalog";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import { getRequestId, withRequestId } from "@/lib/api-request-id";
import { checkRateLimit, getClientIdentifier } from "@/lib/api-rate-limiter";
import { logRateLimitHit, logValidationError } from "@/lib/api-validation-logger";

const VALID_MINUTES = new Set<LearningPlanMinutes>([20, 45, 90]);
const MAX_BODY_SIZE = 100_000; // 100KB

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
  const requestId = getRequestId(request);
  const clientId = getClientIdentifier(request);

  const rateLimitResult = checkRateLimit(clientId, {
    capacity: 20,
    refillRate: 0.3,
    keyPrefix: "frontier-plan:",
  });

  if (!rateLimitResult.allowed) {
    logRateLimitHit(
      { requestId, endpoint: "/api/knowledge-frontier/plan", clientId },
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
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier/plan", clientId }, [
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
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier/plan", clientId }, [
      { field: "body", reason: "Invalid JSON" },
    ]);
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  const parsed = parseRequest(body);
  if (!parsed) {
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier/plan", clientId }, [
      { reason: "Invalid gap plan request structure" },
    ]);
    return NextResponse.json(
      { error: "Invalid gap plan request" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  try {
    return NextResponse.json(
      buildCatalogKnowledgeGapPlan(parsed.targetId, parsed.knownIds, parsed.minutes),
      {
        headers: withRequestId(requestId, {
          "Cache-Control": "private, no-store",
          "X-Profile-Storage": "local-only",
        }),
      }
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Unknown knowledge target:")) {
      logValidationError({ requestId, endpoint: "/api/knowledge-frontier/plan", clientId }, [
        { field: "targetId", reason: "Unknown knowledge target", value: parsed.targetId },
      ]);
      return NextResponse.json(
        { error: "Unknown knowledge target" },
        { status: 404, headers: withRequestId(requestId) }
      );
    }
    throw error;
  }
}
