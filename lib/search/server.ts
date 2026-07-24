import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getPhraseCorpus } from "./corpus-store";
import { loadEngine, type SearchEngine } from "./engine";
import { searchPhrases } from "./phrase";
import type { SearchIndexArtifact } from "./types";

const TITLE_LIMIT = 60;
const BODY_LIMIT = 40;

export interface ServerSearchResult {
  title: string;
  subtitle: string;
  url: string;
  section: string;
  kind: string;
  snippet?: string;
  matchStart?: number;
}

export interface DomainFacet {
  section: string;
  count: number;
}

export interface SearchPage {
  titleResults: ServerSearchResult[];
  bodyResults: ServerSearchResult[];
  facets: DomainFacet[];
  total: number;
}

const EMPTY: SearchPage = { titleResults: [], bodyResults: [], facets: [], total: 0 };

let engine: SearchEngine | null | undefined;

/** The same artifact the browser fetches, read from disk so /search can render
 *  on the server and be shared, crawled and linked. */
function getTitleEngine(): SearchEngine | null {
  if (engine !== undefined) return engine;
  try {
    const artifact = JSON.parse(
      readFileSync(join(process.cwd(), "public", "search-index.json"), "utf-8")
    ) as SearchIndexArtifact;
    engine = loadEngine(artifact);
  } catch (error) {
    console.error("[search] title index unavailable:", error);
    engine = null;
  }
  return engine;
}

export async function searchEverything(query: string, domain?: string): Promise<SearchPage> {
  const trimmed = query.trim();
  if (!trimmed) return EMPTY;

  const titleHits = getTitleEngine()?.search(trimmed, TITLE_LIMIT) ?? [];
  const { corpus, docs } = await getPhraseCorpus();

  const seen = new Set(titleHits.map((hit) => hit.url));
  const bodyHits = searchPhrases(corpus, docs, trimmed, BODY_LIMIT)
    .filter((hit) => !seen.has(hit.url))
    .map((hit) => ({ ...hit, subtitle: "" }));

  // Facets describe the whole query, so narrowing to one domain still shows what
  // the other domains hold.
  const counts = new Map<string, number>();
  for (const hit of [...titleHits, ...bodyHits]) {
    counts.set(hit.section, (counts.get(hit.section) ?? 0) + 1);
  }
  const facets = [...counts.entries()]
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count || a.section.localeCompare(b.section));

  const inDomain = <T extends { section: string }>(hits: T[]) =>
    domain ? hits.filter((hit) => hit.section === domain) : hits;

  const titleResults = inDomain(titleHits);
  const bodyResults = inDomain(bodyHits);

  return {
    titleResults,
    bodyResults,
    facets,
    total: titleResults.length + bodyResults.length,
  };
}
