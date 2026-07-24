import MiniSearch from "minisearch";
import { SEARCH_INDEX_OPTIONS, type SearchIndexArtifact } from "./types";

/** A result in readable form. The artifact's single-letter keys are a wire
 *  format and stop here — consumers never see them. */
export interface SearchHit {
  title: string;
  subtitle: string;
  url: string;
  section: string;
  kind: string;
  score: number;
}

export interface SearchEngine {
  search(query: string, limit: number): SearchHit[];
}

/**
 * Wraps the generated artifact into something queryable. The index is restored
 * with the same options it was built with — MiniSearch does not persist them,
 * and a different `tokenize` would make every query miss.
 */
export function loadEngine(artifact: SearchIndexArtifact): SearchEngine {
  const index = MiniSearch.loadJS(
    artifact.index as Parameters<typeof MiniSearch.loadJS>[0],
    SEARCH_INDEX_OPTIONS
  );

  return {
    search(query, limit) {
      if (!query.trim()) return [];
      const hits: SearchHit[] = [];
      for (const result of index.search(query)) {
        const doc = artifact.docs[result.id as number];
        if (!doc) continue;
        hits.push({
          title: doc.t,
          subtitle: doc.s,
          url: doc.u,
          section: doc.c,
          kind: doc.k,
          score: result.score,
        });
        if (hits.length >= limit) break;
      }
      return hits;
    },
  };
}
