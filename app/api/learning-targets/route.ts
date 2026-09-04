import { NextResponse } from "next/server";
import {
  buildKnowledgeBranchCatalog,
  searchKnowledgeBranchTargets,
  toKnowledgeTargetSearchResult,
} from "@/lib/knowledge-branch-catalog";
import {
  KNOWLEDGE_BRANCH_CONFIDENCE_META,
  type KnowledgeBranchConfidence,
  type KnowledgeTargetFilter,
} from "@/lib/knowledge-branch";
import {
  COVERAGE_DOMAIN_META,
  type CoverageDomainId,
} from "@/lib/knowledge-continuum-coverage-meta";
import { parseKnowledgeLevel } from "@/lib/knowledge-levels";
import { getRequestId, withRequestId } from "@/lib/api-request-id";
import { checkRateLimit, getClientIdentifier } from "@/lib/api-rate-limiter";
import { logRateLimitHit, logValidationError } from "@/lib/api-validation-logger";

const catalog = buildKnowledgeBranchCatalog();

function parseFilter(searchParams: URLSearchParams): KnowledgeTargetFilter | null {
  const domain = searchParams.get("domain")?.trim();
  const level = searchParams.get("level")?.trim();
  const confidence = searchParams.get("confidence")?.trim();
  if (domain && !Object.hasOwn(COVERAGE_DOMAIN_META, domain)) return null;
  const parsedLevel = level ? parseKnowledgeLevel(level) : undefined;
  if (level && !parsedLevel) return null;
  if (confidence && !Object.hasOwn(KNOWLEDGE_BRANCH_CONFIDENCE_META, confidence)) return null;
  return {
    domainId: domain as CoverageDomainId | undefined,
    level: parsedLevel || undefined,
    confidence: confidence as KnowledgeBranchConfidence | undefined,
  };
}

export async function GET(request: Request): Promise<NextResponse> {
  const requestId = getRequestId(request);
  const clientId = getClientIdentifier(request);

  const rateLimitResult = checkRateLimit(clientId, {
    capacity: 100,
    refillRate: 2,
    keyPrefix: "learning-targets:",
  });

  if (!rateLimitResult.allowed) {
    logRateLimitHit(
      { requestId, endpoint: "/api/learning-targets", clientId },
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

  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get("id")?.trim();

  if (targetId) {
    const target = catalog.targets.find((candidate) => candidate.id === targetId);
    if (!target) {
      logValidationError({ requestId, endpoint: "/api/learning-targets", clientId }, [
        { field: "id", reason: "Unknown knowledge target", value: targetId },
      ]);
      return NextResponse.json(
        { error: "Unknown knowledge target" },
        { status: 404, headers: withRequestId(requestId) }
      );
    }
    return NextResponse.json(
      { target },
      {
        headers: withRequestId(requestId, {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        }),
      }
    );
  }

  const filter = parseFilter(searchParams);
  if (!filter) {
    logValidationError({ requestId, endpoint: "/api/learning-targets", clientId }, [
      { reason: "Invalid knowledge target filter" },
    ]);
    return NextResponse.json(
      { error: "Invalid knowledge target filter" },
      { status: 400, headers: withRequestId(requestId) }
    );
  }
  const query = searchParams.get("q") ?? "";
  const results = searchKnowledgeBranchTargets(catalog, query, 20, filter).map(
    toKnowledgeTargetSearchResult
  );
  return NextResponse.json(
    { summary: catalog.summary, results },
    {
      headers: withRequestId(requestId, {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      }),
    }
  );
}
