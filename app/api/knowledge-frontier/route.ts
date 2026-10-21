import type { NextResponse } from "next/server";
import {
  knowledgeJsonResponse,
  parseKnownNodeIds,
  readKnowledgeRequestBody,
} from "@/lib/knowledge-api-request";
import { normalizeSearchQuery } from "@/lib/search/query";
import { buildKnowledgeFrontierView } from "@/lib/knowledge-frontier-catalog";
import { KNOWLEDGE_FRONTIER_STATUS_META } from "@/lib/knowledge-frontier";
import type { KnowledgeFrontierFilter } from "@/lib/knowledge-frontier-view";
import { COVERAGE_DOMAIN_META } from "@/lib/knowledge-continuum-coverage-meta";
import { parseKnowledgeLevel } from "@/lib/knowledge-levels";

function parseRequest(value: unknown): {
  knownIds: string[];
  filter: KnowledgeFrontierFilter;
} | null {
  if (!value || typeof value !== "object") return null;
  const body = value as { knownIds?: unknown; filter?: unknown };
  const knownIds = parseKnownNodeIds(body.knownIds);
  if (!knownIds) return null;
  if (!body.filter || typeof body.filter !== "object") return null;
  const raw = body.filter as Record<string, unknown>;
  if (
    typeof raw.status !== "string" ||
    !Object.hasOwn(KNOWLEDGE_FRONTIER_STATUS_META, raw.status)
  ) {
    return null;
  }
  if (raw.domainId !== undefined && typeof raw.domainId !== "string") return null;
  const domainId = typeof raw.domainId === "string" ? raw.domainId : undefined;
  if (domainId && !Object.hasOwn(COVERAGE_DOMAIN_META, domainId)) return null;
  if (raw.level !== undefined && typeof raw.level !== "number" && typeof raw.level !== "string") {
    return null;
  }
  const level = raw.level === undefined ? undefined : parseKnowledgeLevel(String(raw.level));
  if (raw.level !== undefined && !level) return null;
  if (raw.query !== undefined && typeof raw.query !== "string") return null;
  const query = typeof raw.query === "string" ? normalizeSearchQuery(raw.query) : undefined;
  const offset = raw.offset === undefined ? 0 : raw.offset;
  const limit = raw.limit === undefined ? 24 : raw.limit;
  // Catalog size is a few thousand nodes; anything beyond this is a pagination
  // probe, not a real page, and must not skip the integer/range checks.
  if (typeof offset !== "number" || !Number.isInteger(offset) || offset < 0 || offset > 10_000) {
    return null;
  }
  if (typeof limit !== "number" || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return null;
  }
  return {
    knownIds,
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
  const body = await readKnowledgeRequestBody(request);
  if (!body.ok) return body.response;
  const parsed = parseRequest(body.body);
  if (!parsed) return knowledgeJsonResponse({ error: "Invalid frontier request" }, 400);
  return knowledgeJsonResponse(buildKnowledgeFrontierView(parsed.knownIds, parsed.filter));
}
