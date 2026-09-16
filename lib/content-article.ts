import fs from "node:fs";
import matter from "gray-matter";
import { existingContentArticle, listContentSlugs } from "./content-paths";

export type ContentEntry = {
  slug: string;
  frontmatter: Record<string, unknown>;
  content: string;
};

export type ParsedMatter = {
  data: Record<string, unknown>;
  content: string;
};

/**
 * `strict` throws (callers that catch map it to null).
 * `safe` keeps the raw file as body when YAML is broken.
 * `lenient` also strips a leftover `---` fence, matching nested KB articles.
 */
export type MatterParseMode = "strict" | "safe" | "lenient";

const YAML_FENCE = "-".repeat(3);

/** Used when gray-matter throws. `lenient` matches nested history KB recovery. */
export function recoverBrokenFrontmatter(
  raw: string,
  mode: Exclude<MatterParseMode, "strict">
): ParsedMatter {
  if (mode === "lenient") {
    const contentStart = raw.indexOf(YAML_FENCE, YAML_FENCE.length);
    if (contentStart !== -1) {
      return { data: {}, content: raw.slice(contentStart + YAML_FENCE.length).trim() };
    }
  }
  return { data: {}, content: raw };
}

export function parseMatter(raw: string, mode: MatterParseMode = "strict"): ParsedMatter {
  try {
    const { data, content } = matter(raw);
    return { data: data as Record<string, unknown>, content };
  } catch (error) {
    if (mode === "strict") throw error;
    return recoverBrokenFrontmatter(raw, mode);
  }
}

export function parseMatterSafe(raw: string): ParsedMatter {
  return parseMatter(raw, "safe");
}

/**
 * Read one article under `dir` by slug. Missing files are not cached so a later
 * write can appear; parse/map failures are cached as null.
 */
export function loadContentBySlug<T>(
  dir: string,
  slug: string,
  cache: Map<string, T | null>,
  map: (data: Record<string, unknown>, content: string, slug: string) => T,
  extensions?: readonly string[]
): T | null {
  if (cache.has(slug)) return cache.get(slug)!;
  const file = existingContentArticle(dir, slug, extensions);
  if (!file) return null;
  let result: T | null = null;
  try {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = parseMatter(raw);
    result = map(data, content, slug);
  } catch {
    result = null;
  }
  cache.set(slug, result);
  return result;
}

export function loadAllContent<T>(
  dir: string,
  cache: Map<string, T | null>,
  map: (data: Record<string, unknown>, content: string, slug: string) => T,
  options?: {
    sort?: (a: T, b: T) => number;
    extensions?: readonly string[];
  }
): T[] {
  const items = listContentSlugs(dir, options?.extensions)
    .map((slug) => loadContentBySlug(dir, slug, cache, map, options?.extensions))
    .filter((item): item is T => item !== null);
  if (options?.sort) items.sort(options.sort);
  return items;
}

export function readContentBySlug(
  dir: string,
  slug: string,
  extensions?: readonly string[],
  mode: MatterParseMode = "strict"
): ContentEntry | null {
  const file = existingContentArticle(dir, slug, extensions);
  if (!file) return null;
  const parsed = parseMatter(fs.readFileSync(file, "utf-8"), mode);
  return { slug, frontmatter: parsed.data, content: parsed.content };
}

/** Uncached directory scan for graph builders and other bulk readers. */
export function readContentEntries(
  dir: string,
  extensions?: readonly string[],
  mode: MatterParseMode = "strict"
): ContentEntry[] {
  return listContentSlugs(dir, extensions).flatMap((slug) => {
    const entry = readContentBySlug(dir, slug, extensions, mode);
    return entry ? [entry] : [];
  });
}

/** Nested KB and other already-resolved files. Read errors return null. */
export function readParsedFile(
  fullPath: string,
  mode: MatterParseMode = "strict"
): ParsedMatter | null {
  let raw: string;
  try {
    raw = fs.readFileSync(fullPath, "utf-8");
  } catch {
    return null;
  }
  try {
    return parseMatter(raw, mode);
  } catch {
    return null;
  }
}
