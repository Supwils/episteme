/**
 * Shared heading-id rules for MarkdownRenderer anchors and discovery prompts.
 * Keep in sync: article "问问这篇" links must match rendered `id`s.
 */
import { splitMarkdownFences } from "./markdown-fences";

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

/** First use keeps the slug. A later heading in the same article gets `-2`, `-3`, … */
export function takeHeadingId(base: string, used: Set<string>): string {
  base ||= "section";
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  let n = 2;
  while (used.has(`${base}-${n}`)) n += 1;
  const id = `${base}-${n}`;
  used.add(id);
  return id;
}

export function extractH2Headings(content: string): { text: string; id: string }[] {
  const used = new Set<string>();
  const headings: { text: string; id: string }[] = [];
  const prose = splitMarkdownFences(content).filter((segment) => !segment.fenced);
  for (const line of prose.flatMap((segment) => segment.text.split("\n"))) {
    const m = line.match(/^##\s+(.+)$/);
    if (!m) continue;
    const parsed = parseHeadingLine(m[1]!.trim());
    headings.push({ text: parsed.text, id: takeHeadingId(parsed.id, used) });
  }
  return headings;
}
