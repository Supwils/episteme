export const APP_URLS = {
  "universe-physics": "/universe-physics",
  cosmology: "/cosmology",
  "human-history": "/human-history",
  philosophy: "/philosophy",
  arts: "/arts",
  "life-science": "/life-science",
  mathematics: "/mathematics",
  engineering: "/engineering",
  economics: "/economics",
  psychology: "/psychology",
  "computer-science": "/computer-science",
  "political-science": "/political-science",
  "earth-science": "/earth-science",
  medicine: "/medicine",
  chemistry: "/chemistry",
  sociology: "/sociology",
  law: "/law",
  linguistics: "/linguistics",
  "knowledge-graph": "/knowledge-graph",
} as const;

/**
 * Routes that render their own section shell (nav + footer) and must therefore
 * suppress the portal chrome. Derived from APP_URLS on purpose: hand-maintained
 * copies of this list silently rotted through the law/arts/engineering launches,
 * leaving those domains with duplicated navigation and a portal header that
 * inherited dark-theme foreground tokens on a light background.
 */
export const SECTION_SHELL_PREFIXES: readonly string[] = [
  ...Object.values(APP_URLS),
  "/read",
  "/curiosities",
];
