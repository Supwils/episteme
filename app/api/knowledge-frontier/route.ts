import { NextResponse } from "next/server";
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
  if (!Array.isArray(body.knownIds) || body.knownIds.length > 2000) return null;
  const knownIds = body.knownIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200
  );
  if (knownIds.length !== body.knownIds.length) return null;
  if (!body.filter || typeof body.filter !== "object") return null;
  const raw = body.filter as Record<string, unknown>;
  if (typeof raw.status !== "string" || !(raw.status in KNOWLEDGE_FRONTIER_STATUS_META)) {
    return null;
  }
  const domainId = typeof raw.domainId === "string" ? raw.domainId : undefined;
  if (domainId && !(domainId in COVERAGE_DOMAIN_META)) return null;
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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = parseRequest(body);
  if (!parsed) return NextResponse.json({ error: "Invalid frontier request" }, { status: 400 });
  return NextResponse.json(buildKnowledgeFrontierView(parsed.knownIds, parsed.filter), {
    headers: {
      "Cache-Control": "private, no-store",
      "X-Profile-Storage": "local-only",
    },
  });
}
