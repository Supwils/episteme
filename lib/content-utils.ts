import matter from "gray-matter";

/**
 * Shared content-loading helpers used by every markdown loader
 * (knowledge-domain, generic-kb, generic-dialogues). Extracted to one place so
 * the CJK-slug decoding and excerpt rules can't drift between domains.
 */

/** Parse frontmatter, falling back to "no frontmatter" instead of throwing. */
export function safeParseMatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  try {
    return matter(raw);
  } catch {
    return { data: {}, content: raw };
  }
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

/**
 * A short plain-text preview: first two prose lines, markdown stripped, capped
 * at `maxLength`. KB previews use 150, domain section previews use 160 — pass
 * the value to preserve each surface's existing length.
 */
export function extractExcerpt(content: string, maxLength = 160): string {
  const lines = content
    .split("\n")
    .filter(
      (line) =>
        line.trim() &&
        !line.startsWith("#") &&
        !line.startsWith("|") &&
        !line.startsWith(">") &&
        !line.startsWith("-")
    );
  const text = lines
    .slice(0, 2)
    .join(" ")
    .replace(/[*_`#[\]]/g, "");
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}
