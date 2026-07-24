const FENCED_CODE = /^```[\s\S]*?^```/gm;
const HEADING_2_3 = /^#{2,3}[ \t]+(.+)$/gm;

/** Strip the inline markers that survive inside a heading or a line of prose. */
function stripInline(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images: keep alt text
    .replace(/\[\[[^\]|]*\|([^\]]+)\]\]/g, "$1") // wiki-link with label
    .replace(/\[\[([^\]]+)\]\]/g, "$1") // bare wiki-link
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown link: keep text
    .replace(/[*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Section headings of an article, level 2–3. Deep articles here carry most of
 * their topical signal in headings, which is why the client index can stay at
 * ~400KB and still reach every article: indexing title + headings scores 100%
 * recall@5 on both mid-title and heading queries, where full-text costs 9.9MB.
 */
export function extractHeadings(markdown: string): string[] {
  const withoutCode = markdown.replace(FENCED_CODE, "");
  const headings: string[] = [];
  for (const match of withoutCode.matchAll(HEADING_2_3)) {
    const text = stripInline(match[1]!);
    if (text) headings.push(text);
  }
  return headings;
}

/**
 * Article prose reduced to the text a reader actually sees, for the server-side
 * phrase corpus. Line wrapping is collapsed so a phrase split across two source
 * lines still matches, and markup is removed so `**熵**增` does not hide 熵增.
 */
export function toSearchableText(markdown: string): string {
  return stripInline(
    markdown
      .replace(FENCED_CODE, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)[ \t]+/gm, " ")
      .replace(/^\s*([-*_])\s*\1\s*\1[\s\S]*?$/gm, " ")
      .replace(/^\s*\|/gm, " ")
  );
}
