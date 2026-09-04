import { NextResponse } from "next/server";
import { buildCatalogKnowledgeRelationReview } from "@/lib/knowledge-relation-review-catalog";
import { getRequestId, withRequestId } from "@/lib/api-request-id";
import { checkRateLimit, getClientIdentifier } from "@/lib/api-rate-limiter";
import { logRateLimitHit, logValidationError } from "@/lib/api-validation-logger";

const MAX_BODY_SIZE = 100_000; // 100KB

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
  const requestId = getRequestId(request);
  const clientId = getClientIdentifier(request);

  const rateLimitResult = checkRateLimit(clientId, {
    capacity: 30,
    refillRate: 0.5,
    keyPrefix: "frontier-review:",
  });

  if (!rateLimitResult.allowed) {
    logRateLimitHit(
      { requestId, endpoint: "/api/knowledge-frontier/relation-review", clientId },
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
    logValidationError(
      { requestId, endpoint: "/api/knowledge-frontier/relation-review", clientId },
      [{ field: "body", reason: "Payload too large", value: contentLength }]
    );
    return NextResponse.json(
      { error: "Payload too large" },
      { status: 413, headers: withRequestId(requestId) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logValidationError(
      { requestId, endpoint: "/api/knowledge-frontier/relation-review", clientId },
      [{ field: "body", reason: "Invalid JSON" }]
    );
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  const knownIds = parseRequest(body);
  if (!knownIds) {
    logValidationError(
      { requestId, endpoint: "/api/knowledge-frontier/relation-review", clientId },
      [{ reason: "Invalid relation review request structure" }]
    );
    return NextResponse.json(
      { error: "Invalid relation review request" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  return NextResponse.json(buildCatalogKnowledgeRelationReview(knownIds), {
    headers: withRequestId(requestId, {
      "Cache-Control": "private, no-store",
      "X-Profile-Storage": "local-only",
    }),
  });
}
