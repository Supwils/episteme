/**
 * The server-side phrase tier stores article prose as one string plus a table of
 * where each article starts. A 10MB `indexOf` scan answers in ~1ms, so exact
 * phrase search needs no inverted index at all — the full-text MiniSearch index
 * that would replace this costs 36MB and 6.8s to load.
 */

/** Document boundary. Bodies are whitespace-collapsed before they get here, so a
 *  newline cannot occur inside one and no phrase can span two articles. */
const SEPARATOR = "\n";

export interface Corpus {
  text: string;
  /** `offsets[i]` is where body `i` starts in `text`. */
  offsets: number[];
}

export function buildCorpus(bodies: readonly string[]): Corpus {
  const offsets: number[] = [];
  let position = 0;
  for (const body of bodies) {
    offsets.push(position);
    position += body.length + SEPARATOR.length;
  }
  return { text: bodies.join(SEPARATOR), offsets };
}

/** Index of the document containing `position`. */
export function locate(offsets: readonly number[], position: number): number {
  let low = 0;
  let high = offsets.length - 1;
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (offsets[mid]! <= position) low = mid;
    else high = mid - 1;
  }
  return low;
}

export interface Snippet {
  text: string;
  /** Where the match starts within `text`, for highlighting. */
  matchStart: number;
}

/**
 * `radius` characters of context on each side of a match. The containing
 * document's bounds are derived here rather than accepted as arguments, so a
 * caller cannot forget them and leak a neighbouring article into the snippet.
 */
export function snippet(
  corpus: Corpus,
  position: number,
  matchLength: number,
  radius: number
): Snippet {
  const document = locate(corpus.offsets, position);
  const documentStart = corpus.offsets[document]!;
  const next = corpus.offsets[document + 1];
  const documentEnd = next === undefined ? corpus.text.length : next - SEPARATOR.length;

  const start = Math.max(documentStart, position - radius);
  const end = Math.min(documentEnd, position + matchLength + radius);
  return { text: corpus.text.slice(start, end), matchStart: position - start };
}
