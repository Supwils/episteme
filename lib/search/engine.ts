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
      const normalized = query.trim();
      if (!normalized) return [];
      // Scan wider than `limit` so an exact title match can be promoted past
      // tf-idf. A dialogue titled "柏拉图与孔子" that discusses 理想国 outscores
      // the article actually named 理想国, because the dialogue is longer and
      // mentions the term more often — but a reader typing a full title wants
      // that title's own article, not one that talks about it.
      const window = Math.max(limit * 4, 40);
      const scanned: SearchHit[] = [];
      for (const result of index.search(normalized)) {
        const doc = artifact.docs[result.id as number];
        if (!doc) continue;
        scanned.push({
          title: doc.t,
          subtitle: doc.s,
          url: doc.u,
          section: doc.c,
          kind: doc.k,
          score: result.score,
        });
        if (scanned.length >= window) break;
      }
      const exact = normalized.toLowerCase();
      const isExact = (hit: SearchHit) => hit.title.trim().toLowerCase() === exact;
      // Stable partition: exact title matches keep their relative tf-idf order,
      // everything else follows unchanged.
      return [...scanned.filter(isExact), ...scanned.filter((hit) => !isExact(hit))].slice(
        0,
        limit
      );
    },
  };
}
