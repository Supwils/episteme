import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Theorem, TheoremFrontmatter } from "./types";
import { THEOREMS_DIR } from "./content-paths";

const theoremBySlugCache = new Map<string, Theorem | null>();
let cachedTheorems: Theorem[] | null = null;

export function getTheoremSlugs(): string[] {
  if (!fs.existsSync(THEOREMS_DIR)) return [];
  return fs
    .readdirSync(THEOREMS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getTheoremBySlug(slug: string): Theorem | null {
  if (theoremBySlugCache.has(slug)) return theoremBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(THEOREMS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(THEOREMS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Theorem | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      title: data.title as string,
      title_en: (data.title_en as string) ?? "",
      field: (data.field as string) ?? "其他",
      mathematician: (data.mathematician as string) ?? "",
      year: (data.year as number | null) ?? null,
      difficulty: (data.difficulty as "基础" | "进阶" | "高级") ?? "基础",
      tags: (data.tags as string[]) ?? [],
      related: (data.related as string[]) ?? [],
      status: (data.status as "stub" | "draft" | "published") ?? "draft",
      updated: (data.updated as string) ?? "",
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  theoremBySlugCache.set(slug, result);
  return result;
}

export function getAllTheorems(): Theorem[] {
  if (cachedTheorems) return cachedTheorems;
  cachedTheorems = getTheoremSlugs()
    .map((slug) => getTheoremBySlug(slug))
    .filter((t): t is Theorem => t !== null);
  return cachedTheorems;
}

export function getTheoremsByField(): Record<string, Theorem[]> {
  const all = getAllTheorems();
  const grouped: Record<string, Theorem[]> = {};
  for (const theorem of all) {
    const field = theorem.field || "其他";
    if (!grouped[field]) grouped[field] = [];
    grouped[field].push(theorem);
  }
  return grouped;
}
