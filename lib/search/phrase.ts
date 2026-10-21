import { isSafeInternalPath } from "@/lib/urls";
import { locate, snippet, type Corpus } from "./corpus";
import { normalizeSearchText, tokenize } from "./tokenize";
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
  /** How many characters at `matchStart` are the match. A partial hit is one bigram. */
  matchLength: number;
  occurrences: number;
  /** False when the phrase itself was absent and the query was matched by parts. */
  exact: boolean;
  /** Fraction of the query's bigrams present in the article; 1 for exact hits. */
  coverage: number;
}

function tooShort(query: string): boolean {
  const han = query.match(/\p{Script=Han}/gu)?.length ?? 0;
  if (han > 0) return han < MIN_HAN_QUERY;
  return [...query].length < MIN_LATIN_QUERY;
}

/**
 * Latin letters folded to lower case, everything else untouched. ASCII folding
 * keeps every character at its original offset, so a hit found in the folded
 * view can be cut from the original text for the snippet. Full Unicode
 * `toLowerCase` cannot promise that (İ becomes two code units).
 */
export function foldAsciiCase(text: string): string {
  return text.replace(/[A-Z]+/g, (run) => run.toLowerCase());
}

const foldedTexts = new WeakMap<Corpus, string>();

function foldedText(corpus: Corpus): string {
  let folded = foldedTexts.get(corpus);
  if (folded === undefined) {
    folded = foldAsciiCase(corpus.text);
    foldedTexts.set(corpus, folded);
  }
  return folded;
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
  /** Length of the term found at `first`. */
  firstLength: number;
  occurrences: number;
  coverage: number;
}

function exactMatches(corpus: Corpus, query: string): Map<number, Match> {
  const byDocument = new Map<number, Match>();
  for (const at of positions(foldedText(corpus), foldAsciiCase(query))) {
    const document = locate(corpus.offsets, at);
    const existing = byDocument.get(document);
    if (existing) existing.occurrences += 1;
    else
      byDocument.set(document, {
        document,
        first: at,
        firstLength: query.length,
        occurrences: 1,
        coverage: 1,
      });
  }
  return byDocument;
}

/** A lone Han character or a two-letter fragment occurs in most articles, so it
 *  adds noise and one more full-corpus scan without telling articles apart. */
function isInformativeTerm(term: string): boolean {
  const length = [...term].length;
  return length >= (/\p{Script=Han}/u.test(term) ? MIN_HAN_QUERY : MIN_LATIN_QUERY);
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
export const MAX_BIGRAM_TERMS = 16;

function bigramMatches(corpus: Corpus, query: string): Map<number, Match> {
  const terms = [...new Set(tokenize(query))].filter(isInformativeTerm).slice(0, MAX_BIGRAM_TERMS);
  if (terms.length === 0) return new Map();

  const text = foldedText(corpus);
  const byDocument = new Map<number, Match>();
  for (const term of terms) {
    const seen = new Set<number>();
    for (const at of positions(text, term)) {
      const document = locate(corpus.offsets, at);
      const existing = byDocument.get(document);
      if (existing) {
        existing.occurrences += 1;
        if (at < existing.first) {
          existing.first = at;
          existing.firstLength = term.length;
        }
        if (!seen.has(document)) existing.coverage += 1;
      } else {
        byDocument.set(document, {
          document,
          first: at,
          firstLength: term.length,
          occurrences: 1,
          coverage: 1,
        });
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

export interface PhraseSearchOptions {
  /** Only articles in this section are returned; applied before `limit`. */
  section?: string;
  /** URLs to leave out (already answered by another tier); applied before `limit`. */
  exclude?: ReadonlySet<string>;
}

export interface PhraseSearchPage {
  hits: PhraseHit[];
  /** Matching articles per section before `section` and `limit` were applied. */
  sectionCounts: Map<string, number>;
}

export function searchPhrasePage(
  corpus: Corpus,
  docs: readonly SearchDoc[],
  query: string,
  limit: number,
  options: PhraseSearchOptions = {}
): PhraseSearchPage {
  const trimmed = normalizeSearchText(query).trim();
  if (!trimmed || tooShort(trimmed)) return { hits: [], sectionCounts: new Map() };

  let exact = true;
  let matches = exactMatches(corpus, trimmed);
  if (matches.size === 0) {
    exact = false;
    matches = bigramMatches(corpus, trimmed);
  }

  const sectionCounts = new Map<string, number>();
  const eligible: Match[] = [];
  for (const match of matches.values()) {
    const doc = docs[match.document];
    if (!doc || !isSafeInternalPath(doc.u) || options.exclude?.has(doc.u)) continue;
    sectionCounts.set(doc.c, (sectionCounts.get(doc.c) ?? 0) + 1);
    if (!options.section || doc.c === options.section) eligible.push(match);
  }

  const hits = eligible
    .sort((a, b) => b.coverage - a.coverage || b.occurrences - a.occurrences || a.first - b.first)
    .slice(0, limit)
    .flatMap((match) => {
      const doc = docs[match.document]!;
      const length = match.firstLength;
      const context = snippet(corpus, match.first, length, SNIPPET_RADIUS);
      return [
        {
          title: doc.t,
          url: doc.u,
          section: doc.c,
          kind: doc.k,
          snippet: context.text,
          matchStart: context.matchStart,
          matchLength: length,
          occurrences: match.occurrences,
          exact,
          coverage: match.coverage,
        },
      ];
    });
  return { hits, sectionCounts };
}

export function searchPhrases(
  corpus: Corpus,
  docs: readonly SearchDoc[],
  query: string,
  limit: number
): PhraseHit[] {
  return searchPhrasePage(corpus, docs, query, limit).hits;
}
