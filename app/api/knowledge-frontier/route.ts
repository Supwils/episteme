import { NextResponse } from "next/server";
import { buildKnowledgeFrontierView } from "@/lib/knowledge-frontier-catalog";
import { KNOWLEDGE_FRONTIER_STATUS_META } from "@/lib/knowledge-frontier";
import type { KnowledgeFrontierFilter } from "@/lib/knowledge-frontier-view";
import { COVERAGE_DOMAIN_META } from "@/lib/knowledge-continuum-coverage-meta";
import { parseKnowledgeLevel } from "@/lib/knowledge-levels";
import { checkRateLimit, extractClientIp } from "@/lib/api-rate-limiter";
import { logValidationFailure, createSafeMetadata } from "@/lib/api-validation-logger";

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
  // Rate limiting: 30 req/min per IP for user profile endpoints
  const rateLimitResponse = checkRateLimit(request, "userProfile");
  if (rateLimitResponse) {
    logValidationFailure({
      route: "/api/knowledge-frontier",
      reason: "rate_limit_exceeded",
      ip: extractClientIp(request),
    });
    return rateLimitResponse;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    logValidationFailure({
      route: "/api/knowledge-frontier",
      reason: "invalid_json",
      ip: extractClientIp(request),
      metadata: { error: error instanceof Error ? error.message : "unknown" },
    });
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseRequest(body);
  if (!parsed) {
    logValidationFailure({
      route: "/api/knowledge-frontier",
      reason: "invalid_request_structure",
      ip: extractClientIp(request),
      metadata: createSafeMetadata({
        hasKnownIds: body && typeof body === "object" && "knownIds" in body,
        hasFilter: body && typeof body === "object" && "filter" in body,
      }),
    });
    return NextResponse.json({ error: "Invalid frontier request" }, { status: 400 });
  }

  return NextResponse.json(buildKnowledgeFrontierView(parsed.knownIds, parsed.filter), {
    headers: {
      "Cache-Control": "private, no-store",
      "X-Profile-Storage": "local-only",
    },
  });
}
