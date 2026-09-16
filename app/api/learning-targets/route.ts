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

const catalog = buildKnowledgeBranchCatalog();

/** Same cap as `/api/search` and frontier `filter.query`. */
const MAX_QUERY_LENGTH = 120;
/** Same cap as frontier `knownIds` entries. */
const MAX_ID_LENGTH = 200;

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
  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get("id")?.trim();

  if (targetId) {
    if (targetId.length > MAX_ID_LENGTH) {
      return NextResponse.json({ error: "Unknown knowledge target" }, { status: 404 });
    }
    const target = catalog.targets.find((candidate) => candidate.id === targetId);
    if (!target) return NextResponse.json({ error: "Unknown knowledge target" }, { status: 404 });
    return NextResponse.json(
      { target },
      { headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } }
    );
  }

  const filter = parseFilter(searchParams);
  if (!filter)
    return NextResponse.json({ error: "Invalid knowledge target filter" }, { status: 400 });
  const query = (searchParams.get("q") ?? "").slice(0, MAX_QUERY_LENGTH);
  const results = searchKnowledgeBranchTargets(catalog, query, 20, filter).map(
    toKnowledgeTargetSearchResult
  );
  return NextResponse.json(
    { summary: catalog.summary, results },
    { headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } }
  );
}
