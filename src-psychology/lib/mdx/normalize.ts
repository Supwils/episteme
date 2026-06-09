import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Era,
  Theorist,
  Experiment,
  Phenomenon,
  School,
  Disorder,
  Debate,
  Dialogue,
} from "../types";
import { getDomainContentDir } from "../../../lib/content-paths";

export const CONTENT_ROOT = getDomainContentDir("psychology");

export const DIRS = {
  theorists: path.join(CONTENT_ROOT, "theorists"),
  experiments: path.join(CONTENT_ROOT, "experiments"),
  phenomena: path.join(CONTENT_ROOT, "phenomena"),
  schools: path.join(CONTENT_ROOT, "schools"),
  disorders: path.join(CONTENT_ROOT, "disorders"),
  debates: path.join(CONTENT_ROOT, "debates"),
  dialogues: path.join(CONTENT_ROOT, "dialogues"),
} as const;

export const caches = {
  theorists: new Map<string, Theorist | null>(),
  experiments: new Map<string, Experiment | null>(),
  phenomena: new Map<string, Phenomenon | null>(),
  schools: new Map<string, School | null>(),
  disorders: new Map<string, Disorder | null>(),
  debates: new Map<string, Debate | null>(),
  dialogues: new Map<string, Dialogue | null>(),
} as const;

export const listCaches: {
  theorists: Theorist[] | null;
  experiments: Experiment[] | null;
  phenomena: Phenomenon[] | null;
  schools: School[] | null;
  disorders: Disorder[] | null;
  debates: Debate[] | null;
  dialogues: Dialogue[] | null;
} = {
  theorists: null,
  experiments: null,
  phenomena: null,
  schools: null,
  disorders: null,
  debates: null,
  dialogues: null,
};

const FIELD_MAP: Record<string, string> = {
  titleEn: "title_en",
  psychologist: "name_en",
  nameEn: "name_en",
  contributions: "key_contributions",
  keyContributions: "key_contributions",
  keyFigures: "key_figures",
  relatedTheorists: "related",
  relatedExperiments: "related",
  dsmCode: "dsm_code",
  keySymptoms: "key_symptoms",
};

const ARRAY_FIELDS = new Set([
  "tags", "related", "key_figures", "key_contributions", "participants", "key_symptoms",
]);

export function normalizeFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = FIELD_MAP[key] ?? key;
    if (result[normalizedKey] === undefined) {
      result[normalizedKey] = value;
    }
  }
  for (const field of ARRAY_FIELDS) {
    if (result[field] === undefined || result[field] === null) {
      result[field] = [];
    }
  }
  return result;
}

export function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBySlug<T extends { slug: string; content: string }>(
  dir: string,
  slug: string,
  cache: Map<string, T | null>,
  cast: (data: unknown, slug: string, content: string) => T
): T | null {
  if (cache.has(slug)) return cache.get(slug)!;
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!filePath.startsWith(dir)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: T | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const normalized = normalizeFrontmatter(data as Record<string, unknown>);
    result = cast(normalized, slug, content);
  } catch {
    // result stays null
  }
  cache.set(slug, result);
  return result;
}

export function getAll<T extends { slug: string; content: string }>(
  dir: string,
  cache: Map<string, T | null>,
  listCache: { value: T[] | null },
  cast: (data: unknown, slug: string, content: string) => T,
  sort?: (a: T, b: T) => number
): T[] {
  if (listCache.value) return listCache.value;
  const items = getSlugs(dir)
    .map((slug) => getBySlug(dir, slug, cache, cast))
    .filter((item): item is T => item !== null);
  if (sort) items.sort(sort);
  listCache.value = items;
  return items;
}

export const eraOrder: Record<string, number> = { 经典: 0, 现代: 1, 当代: 2 };
