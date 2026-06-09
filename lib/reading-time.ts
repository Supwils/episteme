/**
 * Estimated reading time in minutes for article content.
 *
 * Tuned for the platform's CJK-heavy prose: counts non-whitespace characters at
 * ~400 chars/minute and never returns less than 1. This is the single source of
 * truth — detail pages previously inlined this formula 27 times, with two
 * divergent variants (some counted raw `.length`, including whitespace).
 */
export function readingMinutes(content: string): number {
  return Math.max(1, Math.ceil(content.replace(/\s/g, "").length / 400));
}
