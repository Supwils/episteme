import { locate, snippet, type Corpus } from "./corpus";
import { tokenize } from "./tokenize";
import type { SearchDoc } from "./types";

/** A single Han character matches thousands of articles and tells us nothing. */
export const MIN_HAN_QUERY = 2;
/** Latin terms are whole words, so two letters is still mostly noise. */
export const MIN_LATIN_QUERY = 3;

const SNIPPET_RADIUS = 40;

export interface PhraseHit {
  title: string;
  url: string;
  section: string;
  kind: string;
  snippet: string;
  /** Where the match starts inside `snippet`, for highlighting. */
  matchStart: number;
  occurrences: number;
  /** False when the phrase itself was absent and the query was matched by parts. */
  exact: boolean;
  /** Fraction of the query's bigrams present in the article; 1 for exact hits. */
  coverage: number;
}

function tooShort(query: string): boolean {
  const han = query.replace(/[^\p{Script=Han}]/gu, "").length;
  if (han > 0) return han < MIN_HAN_QUERY;
  return query.length < MIN_LATIN_QUERY;
}

/** Every position of `needle` in `haystack`. */
function* positions(haystack: string, needle: string): Generator<number> {
  let from = 0;
  let at: number;
  while ((at = haystack.indexOf(needle, from)) !== -1) {
    yield at;
    from = at + needle.length;
  }
}

/** An article sharing fewer than this many of the query's bigrams is a
 *  coincidence, not an answer. */
export const MIN_BIGRAM_COVERAGE = 0.6;

interface Match {
  document: number;
  first: number;
  occurrences: number;
  coverage: number;
}

function exactMatches(corpus: Corpus, query: string): Map<number, Match> {
  const byDocument = new Map<number, Match>();
  for (const at of positions(corpus.text, query)) {
    const document = locate(corpus.offsets, at);
    const existing = byDocument.get(document);
    if (existing) existing.occurrences += 1;
    else byDocument.set(document, { document, first: at, occurrences: 1, coverage: 1 });
  }
  return byDocument;
}

/**
 * Articles covering most of the query's bigrams, for when the phrase never
 * occurs verbatim. Demanding *every* bigram would be barely weaker than exact
 * matching — one misremembered word breaks a junction bigram — so articles are
 * scored by how much of the query they contain.
 *
 * Each bigram costs one ~1ms scan of the corpus, so a handful of them is still
 * far cheaper than the 36MB full-text index this tier exists to avoid.
 */
function bigramMatches(corpus: Corpus, query: string): Map<number, Match> {
  const terms = [...new Set(tokenize(query))];
  if (terms.length === 0) return new Map();

  const byDocument = new Map<number, Match>();
  for (const term of terms) {
    const seen = new Set<number>();
    for (const at of positions(corpus.text, term)) {
      const document = locate(corpus.offsets, at);
      const existing = byDocument.get(document);
      if (existing) {
        existing.occurrences += 1;
        existing.first = Math.min(existing.first, at);
        if (!seen.has(document)) existing.coverage += 1;
      } else {
        byDocument.set(document, { document, first: at, occurrences: 1, coverage: 1 });
      }
      seen.add(document);
    }
  }

  const matches = new Map<number, Match>();
  for (const [document, match] of byDocument) {
    match.coverage /= terms.length;
    if (match.coverage >= MIN_BIGRAM_COVERAGE) matches.set(document, match);
  }
  return matches;
}

export function searchPhrases(
  corpus: Corpus,
  docs: readonly SearchDoc[],
  query: string,
  limit: number
): PhraseHit[] {
  const trimmed = query.trim();
  if (!trimmed || tooShort(trimmed)) return [];

  let exact = true;
  let matches = exactMatches(corpus, trimmed);
  if (matches.size === 0) {
    exact = false;
    matches = bigramMatches(corpus, trimmed);
  }

  return [...matches.values()]
    .sort((a, b) => b.coverage - a.coverage || b.occurrences - a.occurrences || a.first - b.first)
    .slice(0, limit)
    .map((match) => {
      const doc = docs[match.document]!;
      const length = exact ? trimmed.length : 2;
      const context = snippet(corpus, match.first, length, SNIPPET_RADIUS);
      return {
        title: doc.t,
        url: doc.u,
        section: doc.c,
        kind: doc.k,
        snippet: context.text,
        matchStart: context.matchStart,
        occurrences: match.occurrences,
        exact,
        coverage: match.coverage,
      };
    });
}
