import type { Citation } from "./content-schemas";

// Headings under which authors list sources. Matches the four historical
// variants (参考文献 / 延伸阅读 / References / 推荐阅读) plus close synonyms so
// every already-written article is covered regardless of which it used.
const CITATION_HEADING =
  /^(参考文献|延伸阅读|进一步阅读|参考书目|参考资料|参考来源|引用|学术文献|推荐阅读|推荐阅读书目|references?|further\s+reading)$/i;

/**
 * Pull the bibliography out of an article body. Existing content stores sources
 * as an in-body `## 参考文献` / `## 延伸阅读` list, not as structured frontmatter,
 * so this exposes every already-written article's sources (e.g. to JSON-LD)
 * without a content migration. Returns the plain-text entry lines, markdown
 * stripped. The section ends at the next heading of equal-or-higher level.
 */
export function extractBibliography(content: string): string[] {
  const entries: string[] = [];
  let inSection = false;
  for (const line of content.split("\n")) {
    const heading = line.match(/^(#{2,4})\s+(.+?)\s*$/);
    if (heading) {
      inSection = CITATION_HEADING.test(heading[2]!.trim());
      continue;
    }
    if (!inSection) continue;
    const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.+?)\s*$/);
    if (item) entries.push(stripInline(item[1]!));
  }
  return entries;
}

function stripInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

/**
 * schema.org `Article.citation` accepts plain strings — good enough to signal
 * "this article is sourced" to search engines from the in-body bibliography.
 */
export function bibliographyToJsonLd(content: string): string[] {
  return extractBibliography(content);
}

/** Render a structured frontmatter Citation into a single display line. */
export function formatCitation(c: Citation): string {
  const parts: string[] = [];
  if (c.author) parts.push(c.author);
  if (c.year !== undefined) parts.push(`(${c.year})`);
  parts.push(c.title);
  if (c.publisher) parts.push(c.publisher);
  if (c.doi) parts.push(`DOI: ${c.doi}`);
  return parts.filter(Boolean).join(". ");
}
