import { NextResponse } from "next/server";
import { getPhraseCorpus } from "@/lib/search/corpus-store";
import { searchPhrases } from "@/lib/search/phrase";

// Dynamic (reads ?q). The title tier answers in the browser; this endpoint is
// the one that can reach a phrase buried in an article's prose.
export const dynamic = "force-dynamic";

/** The corpus only changes when a deployment does, so the CDN can answer
 *  repeats of a popular query without touching a function. */
export const SEARCH_CACHE_CONTROL = "public, s-maxage=86400, stale-while-revalidate=604800";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;
const MAX_QUERY_LENGTH = 120;

function parseLimit(raw: string | null): number {
  const value = Number(raw);
  if (!Number.isFinite(value)) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.max(1, Math.trunc(value)));
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").slice(0, MAX_QUERY_LENGTH);
  const limit = parseLimit(searchParams.get("limit"));

  const { corpus, docs } = await getPhraseCorpus();
  const hits = searchPhrases(corpus, docs, query, limit);

  return NextResponse.json({ query, hits }, { headers: { "Cache-Control": SEARCH_CACHE_CONTROL } });
}
