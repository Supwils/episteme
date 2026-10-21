import { parseMatterSafe } from "./content-article";

/**
 * Shared content-loading helpers used by every markdown loader
 * (knowledge-domain, generic-kb, generic-dialogues). Extracted to one place so
 * the CJK-slug decoding and excerpt rules can't drift between domains.
 */

/** Parse frontmatter, falling back to "no frontmatter" instead of throwing. */
export const safeParseMatter = parseMatterSafe;

/** Only author-written plain-text leads belong in the article header. */
export function authorSummary(data: Record<string, unknown>): string | undefined {
  for (const value of [data.summary, data.dek]) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

/** URL slugs arrive percent-encoded (CJK); decode defensively. */
export function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/** First `# H1` heading in the body, or null. */
export function firstHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1]!.trim() : null;
}

/** Drop the leading `# H1` so the title isn't repeated in the rendered body. */
export function stripLeadingHeading(content: string): string {
  return content.replace(/^\s*#\s+.+\n+/, "");
}

// Lines that are structure, not prose: headings, tables, quotes, lists, JSX/HTML,
// images, display math and fences.
const NON_PROSE_LINE =
  /^(#|\||>|[-*+]\s|\d+[.)]\s|<|!\[|\$\$|```|import\s|export\s|(?:-{3,}|\*{3,}|_{3,})$)/;
// A paragraph with no sentence end is a keyword list, a date line or a lead-in
// to a list ("……想法："), none of which reads as a preview on its own.
const SENTENCE_END = /[。！？!?]/;
const SENTENCE = /[^。！？!?]+[。！？!?]+[」』”’"）)]*/g;
const MIN_PARAGRAPH_CHARS = 20;

function toPlainText(markdown: string): string {
  return markdown
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstProseParagraph(content: string): string {
  let inFence = false;
  let paragraph: string[] = [];
  let fallback = "";
  const consider = (text: string): boolean => {
    if (text.length < MIN_PARAGRAPH_CHARS) return false;
    if (SENTENCE_END.test(text)) return true;
    fallback ||= text;
    return false;
  };
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    if (line && !NON_PROSE_LINE.test(line)) {
      paragraph.push(line);
      continue;
    }
    const text = toPlainText(paragraph.join(" "));
    if (consider(text)) return text;
    paragraph = [];
  }
  const last = toPlainText(paragraph.join(" "));
  return consider(last) ? last : fallback || last;
}

/**
 * A plain-text preview made of whole sentences from the first prose paragraph:
 * as many as fit in `maxLength`, and always at least the first one — a preview
 * never stops mid-sentence. KB previews use 150, section previews 160.
 */
export function extractExcerpt(content: string, maxLength = 160): string {
  const paragraph = firstProseParagraph(content);
  const sentences = paragraph.match(SENTENCE) ?? [paragraph];
  let excerpt = sentences[0]!.trim();
  for (const sentence of sentences.slice(1)) {
    if (excerpt.length + sentence.trim().length > maxLength) break;
    excerpt += sentence.trim();
  }
  return excerpt;
}
