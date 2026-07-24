/**
 * Reading paths turn the browsable encyclopedia into something you can read
 * front-to-back like a book: each path is a curated, ordered sequence of
 * EXISTING articles. The <ReadingPathBar> uses `?path=<slug>&step=<n>` to thread
 * prev/next across any article page, so no per-article wiring is needed.
 *
 * Every `href` here must resolve to a real article route. This module is plain
 * data (no fs), so it is safe to import in client components.
 */

// The catalog lives in reading-paths-data.ts; re-export it so consumers keep
// importing READING_PATHS from here unchanged.
import { READING_PATHS } from "./reading-paths-data";
export { READING_PATHS };

export interface ReadingStep {
  /** Display title for the chapter (the article's own title). */
  title: string;
  /** Canonical article URL, no query string. */
  href: string;
  /** One line on why this step matters / what it adds to the journey. */
  blurb?: string;
}

export interface ReadingPath {
  slug: string;
  title: string;
  /** Short tagline shown under the title. */
  subtitle: string;
  /** Jacket-copy intro paragraph for the path page. */
  description: string;
  /** Domain id used for color/labeling (matches lib/data DOMAINS ids). */
  domain: string;
  domainLabel: string;
  accent: string;
  steps: ReadingStep[];
}

export function getReadingPath(slug: string): ReadingPath | undefined {
  return READING_PATHS.find((p) => p.slug === slug);
}

/** Total chapters across all paths — used for the index header. */
export function totalReadingSteps(): number {
  return READING_PATHS.reduce((n, p) => n + p.steps.length, 0);
}
