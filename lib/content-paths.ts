import fs from "node:fs";
import path from "node:path";

// The app now lives at the repo root, so content sits at <cwd>/content.
export function getContentDir(): string {
  return path.join(process.cwd(), "content");
}

export function getDomainContentDir(domain: string): string {
  return path.join(getContentDir(), domain);
}

/** True when `fullPath` is `root` or a file inside it — not a sibling prefix like `root-extra`. */
export function isPathInsideRoot(fullPath: string, root: string): boolean {
  const resolvedRoot = path.resolve(root);
  const resolvedFull = path.resolve(fullPath);
  return resolvedFull === resolvedRoot || resolvedFull.startsWith(resolvedRoot + path.sep);
}

/** A single path segment that cannot walk out of a content directory. */
export function isSafeContentSegment(part: string): boolean {
  return part.length > 0 && !part.includes("..") && !/[\\/]/.test(part);
}

/**
 * Resolve `segments` under `root`. Returns null when any segment is unsafe or
 * the resolved path would leave `root`. Does not check that the file exists.
 */
export function resolveContentPath(root: string, ...segments: string[]): string | null {
  if (segments.length === 0 || !segments.every(isSafeContentSegment)) return null;
  const full = path.resolve(root, ...segments);
  return isPathInsideRoot(full, root) ? full : null;
}

/** `resolveContentPath`, then `existsSync`. Null when missing or outside `root`. */
export function existingContentFile(root: string, ...segments: string[]): string | null {
  const full = resolveContentPath(root, ...segments);
  if (!full || !fs.existsSync(full)) return null;
  return full;
}

const DEFAULT_ARTICLE_EXTS = [".mdx"] as const;

function sortedExtensions(extensions: readonly string[]): string[] {
  return [...extensions].sort((left, right) => right.length - left.length);
}

function matchingExtension(name: string, extensions: readonly string[]): string | null {
  return sortedExtensions(extensions).find((ext) => name.endsWith(ext)) ?? null;
}

/** Filenames in `dir` with a known article extension. Skips spoken `*.narration.md`. */
export function listContentFilenames(
  dir: string,
  extensions: readonly string[] = DEFAULT_ARTICLE_EXTS
): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) => {
    if (name.endsWith(".narration.md")) return false;
    return matchingExtension(name, extensions) !== null;
  });
}

/** Slugs derived from `listContentFilenames` — `.mdx` is not stripped as `.md`. */
export function listContentSlugs(
  dir: string,
  extensions: readonly string[] = DEFAULT_ARTICLE_EXTS
): string[] {
  return listContentFilenames(dir, extensions).map((name) => {
    const ext = matchingExtension(name, extensions);
    return ext ? name.slice(0, -ext.length) : name;
  });
}

/** First existing article for `slug` among `extensions`, in the given order. */
export function existingContentArticle(
  dir: string,
  slug: string,
  extensions: readonly string[] = DEFAULT_ARTICLE_EXTS
): string | null {
  for (const ext of extensions) {
    const found = existingContentFile(dir, `${slug}${ext}`);
    if (found) return found;
  }
  return null;
}
