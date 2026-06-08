import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MathParadox } from "./types";
import { PARADOXES_DIR } from "./content-paths";

const paradoxBySlugCache = new Map<string, MathParadox | null>();
let cachedParadoxes: MathParadox[] | null = null;

export function getMathParadoxSlugs(): string[] {
  if (!fs.existsSync(PARADOXES_DIR)) return [];
  return fs
    .readdirSync(PARADOXES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMathParadoxBySlug(slug: string): MathParadox | null {
  if (paradoxBySlugCache.has(slug)) return paradoxBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(PARADOXES_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(PARADOXES_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: MathParadox | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      title: data.title as string,
      title_en: (data.title_en as string) ?? "",
      field: (data.field as string) ?? "其他",
      key_figures: (data.key_figures as string[]) ?? [],
      tags: (data.tags as string[]) ?? [],
      key_terms: (data.key_terms as string[]) ?? [],
      status: (data.status as "stub" | "draft" | "published") ?? "draft",
      updated: (data.updated as string) ?? "",
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  paradoxBySlugCache.set(slug, result);
  return result;
}

export function getAllMathParadoxes(): MathParadox[] {
  if (cachedParadoxes) return cachedParadoxes;
  cachedParadoxes = getMathParadoxSlugs()
    .map((slug) => getMathParadoxBySlug(slug))
    .filter((p): p is MathParadox => p !== null);
  return cachedParadoxes;
}

export function getMathParadoxesByField(): Record<string, MathParadox[]> {
  const all = getAllMathParadoxes();
  const grouped: Record<string, MathParadox[]> = {};
  for (const paradox of all) {
    const field = paradox.field || "其他";
    if (!grouped[field]) grouped[field] = [];
    grouped[field].push(paradox);
  }
  return grouped;
}
