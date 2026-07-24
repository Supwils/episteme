"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createSearchClient, type SearchHit } from "@/lib/search/client";
import type { SearchResult } from "./types";

const TITLE_LIMIT = 30;
const BODY_LIMIT = 20;
const BODY_DEBOUNCE_MS = 180;

interface PhraseResponse {
  query: string;
  hits: SearchResult[];
}

export interface KnowledgeSearch {
  query: string;
  setQuery(value: string): void;
  /** Matches on an article's title or section headings, answered in-browser. */
  titleResults: SearchResult[];
  /** Matches found in article prose, answered by /api/search. */
  bodyResults: SearchResult[];
  searching: boolean;
}

/**
 * Drives both search tiers. The title tier answers from a Worker as the reader
 * types; the body tier is a debounced request, because scanning 10M characters
 * of prose is worth a round trip but not worth one per keystroke.
 */
export function useKnowledgeSearch(): KnowledgeSearch {
  const [query, setQuery] = useState("");
  const [titleResults, setTitleResults] = useState<SearchResult[]>([]);
  const [bodyHits, setBodyHits] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const client = useRef<ReturnType<typeof createSearchClient> | null>(null);
  if (client.current === null) client.current = createSearchClient();
  useEffect(() => () => client.current?.dispose(), []);

  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed) {
      setTitleResults([]);
      return;
    }
    let current = true;
    void client.current?.search(trimmed, TITLE_LIMIT).then((hits) => {
      if (current) setTitleResults(hits);
    });
    return () => {
      current = false;
    };
  }, [trimmed]);

  useEffect(() => {
    if (!trimmed) {
      setBodyHits([]);
      setSearching(false);
      return;
    }
    let current = true;
    setSearching(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=${BODY_LIMIT}`)
        .then((response) => (response.ok ? (response.json() as Promise<PhraseResponse>) : null))
        .catch(() => null)
        .then((payload) => {
          if (!current) return;
          // The endpoint echoes the query it answered, so a slow response for an
          // earlier keystroke cannot overwrite results for the current one.
          setBodyHits(payload && payload.query === trimmed ? payload.hits : []);
          setSearching(false);
        });
    }, BODY_DEBOUNCE_MS);

    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [trimmed]);

  const bodyResults = useMemo(() => {
    const alreadyShown = new Set(titleResults.map((r) => r.url));
    return bodyHits.filter((hit) => !alreadyShown.has(hit.url));
  }, [bodyHits, titleResults]);

  return {
    query,
    setQuery: useCallback((value: string) => setQuery(value), []),
    titleResults,
    bodyResults,
    searching,
  };
}
