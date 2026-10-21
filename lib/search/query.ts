/** Unicode code points, shared by every global-search entry point. */
export const MAX_SEARCH_QUERY_LENGTH = 120;

export function truncateSearchQuery(value: string): string {
  let result = "";
  let length = 0;
  for (const character of value) {
    if (length === MAX_SEARCH_QUERY_LENGTH) break;
    const codePoint = character.codePointAt(0)!;
    // URLSearchParams replaces lone surrogates too; direct client/Worker calls
    // need the same treatment before encodeURIComponent or index tokenization.
    result += codePoint >= 0xd800 && codePoint <= 0xdfff ? "\uFFFD" : character;
    length += 1;
  }
  return result;
}

export function normalizeSearchQuery(value: string): string {
  return truncateSearchQuery(value.trim()).trim();
}
