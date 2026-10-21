import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getPhraseCorpus } from "./corpus-store";
import { loadEngine, type SearchEngine } from "./engine";
import { searchPhrasePage } from "./phrase";
import type { SearchIndexArtifact } from "./types";
import { normalizeSearchQuery } from "./query";

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
  matchLength?: number;
}

export interface DomainFacet {
  section: string;
  count: number;
}

export interface SearchPage {
  titleResults: ServerSearchResult[];
  bodyResults: ServerSearchResult[];
  facets: DomainFacet[];
  /** Every match in scope (the selected domain, or all of them); the result
   *  lists are capped, this is not. */
  total: number;
}

const EMPTY: SearchPage = { titleResults: [], bodyResults: [], facets: [], total: 0 };

/** MiniSearch scores every match anyway; asking for all of them only costs the
 *  mapping, and lets the domain filter and the facet counts see past the cap. */
const ALL_TITLE_HITS = Number.MAX_SAFE_INTEGER;

let engine: SearchEngine | null = null;

/** The same artifact the browser fetches, read from disk so /search can render
 *  on the server and be shared, crawled and linked. */
function getTitleEngine(): SearchEngine | null {
  if (engine) return engine;
  try {
    const artifact = JSON.parse(
      readFileSync(join(process.cwd(), "public", "search-index.json"), "utf-8")
    ) as SearchIndexArtifact;
    engine = loadEngine(artifact);
  } catch (error) {
    console.error("[search] title index unavailable:", error);
    // A temporary read failure must not disable title search for this process.
    engine = null;
  }
  return engine;
}

export async function searchEverything(query: string, domain?: string): Promise<SearchPage> {
  const trimmed = normalizeSearchQuery(query);
  if (!trimmed) return EMPTY;

  const allTitleHits = getTitleEngine()?.search(trimmed, ALL_TITLE_HITS) ?? [];
  const { corpus, docs } = await getPhraseCorpus();

  // Body hits answer "which other articles mention it", so an article already
  // matched by title is not listed (or counted) twice.
  const body = searchPhrasePage(corpus, docs, trimmed, BODY_LIMIT, {
    section: domain,
    exclude: new Set(allTitleHits.map((hit) => hit.url)),
  });

  // Facets describe the whole query, so narrowing to one domain still shows what
  // the other domains hold.
  const counts = new Map(body.sectionCounts);
  for (const hit of allTitleHits) {
    counts.set(hit.section, (counts.get(hit.section) ?? 0) + 1);
  }
  const facets = [...counts.entries()]
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count || a.section.localeCompare(b.section));

  const titleInScope = domain ? allTitleHits.filter((hit) => hit.section === domain) : allTitleHits;
  const total = domain
    ? (counts.get(domain) ?? 0)
    : facets.reduce((sum, facet) => sum + facet.count, 0);

  return {
    titleResults: titleInScope.slice(0, TITLE_LIMIT),
    bodyResults: body.hits.map((hit) => ({ ...hit, subtitle: "" })),
    facets,
    total,
  };
}
