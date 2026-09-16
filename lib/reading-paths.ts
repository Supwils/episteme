/**
 * Reading paths turn the browsable encyclopedia into something you can read
 * front-to-back like a book: each path is a curated, ordered sequence of
 * EXISTING articles. The <ReadingPathBar> uses `?path=<slug>&step=<n>` to thread
 * prev/next across any article page, so no per-article wiring is needed.
 * If the query is absent, the same bar can invite you into a path that already
 * lists the current article as a chapter.
 *
 * Every `href` here must resolve to a real article route. This module is plain
 * data (no fs), so it is safe to import in client components.
 */

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

export type ReadingPathChapter = {
  path: ReadingPath;
  step: number;
};

export function getReadingPath(slug: string): ReadingPath | undefined {
  return READING_PATHS.find((p) => p.slug === slug);
}

/** Strip query and a trailing slash so invite lookup matches catalog hrefs. */
export function normalizeArticleHref(href: string): string {
  const withoutQuery = href.split("?")[0] ?? href;
  if (withoutQuery.length > 1) return withoutQuery.replace(/\/+$/, "");
  return withoutQuery || "/";
}

/** Total chapters across all paths — used for the index header. */
export function totalReadingSteps(): number {
  return READING_PATHS.reduce((n, p) => n + p.steps.length, 0);
}

export function readingPathChaptersFor(href: string): ReadingPathChapter[] {
  const normalized = normalizeArticleHref(href);
  const hits: ReadingPathChapter[] = [];
  for (const path of READING_PATHS) {
    const index = path.steps.findIndex((step) => step.href === normalized);
    if (index >= 0) hits.push({ path, step: index + 1 });
  }
  const domain = normalized.split("/").filter(Boolean)[0];
  return hits.sort((left, right) => {
    const leftMatch = left.path.domain === domain ? 0 : 1;
    const rightMatch = right.path.domain === domain ? 0 : 1;
    return leftMatch - rightMatch || left.path.title.localeCompare(right.path.title, "zh-CN");
  });
}
