import { NextResponse } from "next/server";
import { buildKnowledgeFrontierView } from "@/lib/knowledge-frontier-catalog";
import { KNOWLEDGE_FRONTIER_STATUS_META } from "@/lib/knowledge-frontier";
import type { KnowledgeFrontierFilter } from "@/lib/knowledge-frontier-view";
import { COVERAGE_DOMAIN_META } from "@/lib/knowledge-continuum-coverage-meta";
import { parseKnowledgeLevel } from "@/lib/knowledge-levels";
import { getRequestId, withRequestId } from "@/lib/api-request-id";
import { checkRateLimit, getClientIdentifier } from "@/lib/api-rate-limiter";
import { logRateLimitHit, logValidationError } from "@/lib/api-validation-logger";

const MAX_BODY_SIZE = 100_000; // 100KB for JSON payloads

function parseRequest(value: unknown): {
  knownIds: string[];
  filter: KnowledgeFrontierFilter;
} | null {
  if (!value || typeof value !== "object") return null;
  const body = value as { knownIds?: unknown; filter?: unknown };
  if (!Array.isArray(body.knownIds) || body.knownIds.length > 2000) return null;
  const knownIds = body.knownIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200
  );
  if (knownIds.length !== body.knownIds.length) return null;
  if (!body.filter || typeof body.filter !== "object") return null;
  const raw = body.filter as Record<string, unknown>;
  if (
    typeof raw.status !== "string" ||
    !Object.hasOwn(KNOWLEDGE_FRONTIER_STATUS_META, raw.status)
  ) {
    return null;
  }
  const domainId = typeof raw.domainId === "string" ? raw.domainId : undefined;
  if (domainId && !Object.hasOwn(COVERAGE_DOMAIN_META, domainId)) return null;
  if (raw.level !== undefined && typeof raw.level !== "number" && typeof raw.level !== "string") {
    return null;
  }
  const level = raw.level === undefined ? undefined : parseKnowledgeLevel(String(raw.level));
  if (raw.level !== undefined && !level) return null;
  const query = typeof raw.query === "string" ? raw.query.slice(0, 120) : undefined;
  const offset = raw.offset === undefined ? 0 : raw.offset;
  const limit = raw.limit === undefined ? 24 : raw.limit;
  if (typeof offset !== "number" || !Number.isInteger(offset) || offset < 0) return null;
  if (typeof limit !== "number" || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return null;
  }
  return {
    knownIds: [...new Set(knownIds)],
    filter: {
      status: raw.status as KnowledgeFrontierFilter["status"],
      domainId: domainId as KnowledgeFrontierFilter["domainId"],
      level: level || undefined,
      query,
      offset,
      limit,
    },
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  const requestId = getRequestId(request);
  const clientId = getClientIdentifier(request);

  const rateLimitResult = checkRateLimit(clientId, {
    capacity: 30,
    refillRate: 0.5,
    keyPrefix: "frontier:",
  });

  if (!rateLimitResult.allowed) {
    logRateLimitHit(
      { requestId, endpoint: "/api/knowledge-frontier", clientId },
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
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier", clientId }, [
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
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier", clientId }, [
      { field: "body", reason: "Invalid JSON" },
    ]);
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  const parsed = parseRequest(body);
  if (!parsed) {
    logValidationError({ requestId, endpoint: "/api/knowledge-frontier", clientId }, [
      { reason: "Invalid frontier request structure" },
    ]);
    return NextResponse.json(
      { error: "Invalid frontier request" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  return NextResponse.json(buildKnowledgeFrontierView(parsed.knownIds, parsed.filter), {
    headers: withRequestId(requestId, {
      "Cache-Control": "private, no-store",
      "X-Profile-Storage": "local-only",
    }),
  });
}
