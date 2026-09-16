export const APP_URLS = {
  "universe-physics": "/universe-physics",
  cosmology: "/cosmology",
  "human-history": "/human-history",
  philosophy: "/philosophy",
  arts: "/arts",
  literature: "/literature",
  religion: "/religion",
  anthropology: "/anthropology",
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
  education: "/education",
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

const INTERNAL_PATH_ORIGIN = "https://episteme.invalid";

/** Same-origin article paths only. Rejects protocol-relative and non-http(s) URLs. */
export function isSafeInternalPath(url: string): boolean {
  if (!url.startsWith("/") || url.startsWith("//") || url.includes("\\")) return false;
  try {
    const parsed = new URL(url, INTERNAL_PATH_ORIGIN);
    return parsed.origin === INTERNAL_PATH_ORIGIN && parsed.pathname.startsWith("/");
  } catch {
    return false;
  }
}

/** Markdown `[text](href)` / images: internal paths, hash, or http(s) only. */
export function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.startsWith("#") && !trimmed.includes(":")) return true;
  if (isSafeInternalPath(trimmed)) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
