/**
 * Shared by every article formula. `trust` stays unset: KaTeX's default
 * refuses `\href`, `\url`, and the HTML extensions, so a formula cannot emit
 * a link. `maxExpand` stops a hostile `\def` loop from hanging the render.
 */
export const KATEX_OPTIONS = {
  throwOnError: false,
  maxSize: 500,
  maxExpand: 1000,
  // Chinese inside `$…$` renders correctly; warning on it per formula floods server logs.
  strict: (errorCode: string) => (errorCode === "unicodeTextInMathMode" ? "ignore" : "warn"),
} as const;
