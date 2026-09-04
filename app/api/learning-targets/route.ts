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
import { checkRateLimit, extractClientIp } from "@/lib/api-rate-limiter";
import { logValidationFailure } from "@/lib/api-validation-logger";

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
  // Rate limiting: 120 req/min per IP for general public endpoints
  const rateLimitResponse = checkRateLimit(request, "general");
  if (rateLimitResponse) {
    logValidationFailure({
      route: "/api/learning-targets",
      reason: "rate_limit_exceeded",
      ip: extractClientIp(request),
    });
    return rateLimitResponse;
  }

  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get("id")?.trim();

  if (targetId) {
    const target = catalog.targets.find((candidate) => candidate.id === targetId);
    if (!target) {
      logValidationFailure({
        route: "/api/learning-targets",
        reason: "target_not_found",
        ip: extractClientIp(request),
        metadata: { targetId: targetId.slice(0, 100) },
      });
      return NextResponse.json({ error: "Unknown knowledge target" }, { status: 404 });
    }
    return NextResponse.json(
      { target },
      { headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } }
    );
  }

  const filter = parseFilter(searchParams);
  if (!filter) {
    logValidationFailure({
      route: "/api/learning-targets",
      reason: "invalid_filter",
      ip: extractClientIp(request),
      metadata: {
        domain: searchParams.get("domain") || "missing",
        level: searchParams.get("level") || "missing",
        confidence: searchParams.get("confidence") || "missing",
      },
    });
    return NextResponse.json({ error: "Invalid knowledge target filter" }, { status: 400 });
  }

  const query = searchParams.get("q") ?? "";
  const results = searchKnowledgeBranchTargets(catalog, query, 20, filter).map(
    toKnowledgeTargetSearchResult
  );
  return NextResponse.json(
    { summary: catalog.summary, results },
    { headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } }
  );
}
