/**
 * Shared heading-id rules for MarkdownRenderer anchors and discovery prompts.
 * Keep in sync: article "问问这篇" links must match rendered `id`s.
 */

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Authors mark explicit anchors as `## 标题 {#anchor}`. */
export function parseHeadingLine(raw: string): { text: string; id: string } {
  const match = raw.match(/^(.*?)\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
  if (match) return { text: match[1]!.trim(), id: match[2]! };
  return { text: raw, id: slugifyHeading(raw) };
}

export function extractH2Headings(content: string): { text: string; id: string }[] {
  const headings: { text: string; id: string }[] = [];
  for (const line of content.split("\n")) {
    const m = line.match(/^##\s+(.+)$/);
    if (!m) continue;
    headings.push(parseHeadingLine(m[1]!.trim()));
  }
  return headings;
}
