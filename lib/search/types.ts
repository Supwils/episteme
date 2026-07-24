import type { Options } from "minisearch";
import { tokenize } from "./tokenize";

/** Bumped whenever the artifact shape changes, so a stale cached index is
 *  ignored rather than misread. */
export const SEARCH_INDEX_VERSION = 1;

export const SEARCH_INDEX_URL = "/search-index.json";

/** Display metadata for one searchable item, parallel to the MiniSearch id. */
export interface SearchDoc {
  /** title */
  t: string;
  /** subtitle (English title, or an entity's descriptor) */
  s: string;
  /** url */
  u: string;
  /** section — the knowledge domain this belongs to */
  c: string;
  /** kind — the content type, e.g. "thinker" / "knowledgeBase" */
  k: string;
}

export interface SearchIndexArtifact {
  v: number;
  docs: SearchDoc[];
  index: unknown;
}

interface IndexedFields {
  id: number;
  title: string;
  text: string;
}

/**
 * Shared by the build-time generator and every consumer. `MiniSearch.loadJSON`
 * must be handed the same options the index was built with — in particular the
 * same `tokenize`, or queries tokenize differently from the index and silently
 * return nothing.
 *
 * `storeFields` is deliberately empty: the display metadata lives in the compact
 * `docs` array instead, which keeps the shipped artifact around 400KB.
 */
export const SEARCH_INDEX_OPTIONS: Options<IndexedFields> = {
  fields: ["title", "text"],
  storeFields: [],
  tokenize,
  searchOptions: {
    boost: { title: 3 },
    prefix: true,
    combineWith: "AND",
  },
};
