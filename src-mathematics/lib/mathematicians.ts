import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Mathematician, MathematicianFrontmatter, MathEra } from "./types";
import { MATHEMATICIANS_DIR } from "./content-paths";

const ERA_MAP: Record<string, MathEra> = {
  ancient: "古代",
  medieval: "中世纪",
  "early-modern": "近代",
  modern: "现代",
  contemporary: "当代",
  "foundations-crisis": "现代",
  renaissance: "近代",
};

const mathematicianBySlugCache = new Map<string, Mathematician | null>();
let cachedMathematicians: Mathematician[] | null = null;

export function getMathematicianSlugs(): string[] {
  if (!fs.existsSync(MATHEMATICIANS_DIR)) return [];
  return fs
    .readdirSync(MATHEMATICIANS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMathematicianBySlug(slug: string): Mathematician | null {
  if (mathematicianBySlugCache.has(slug)) return mathematicianBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(MATHEMATICIANS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(MATHEMATICIANS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Mathematician | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const era = ERA_MAP[data.era as string] ?? data.era ?? "古代";
    const fields: string[] = Array.isArray(data.fields) ? data.fields : [];
    const field = (data.field as string) ?? fields[0] ?? "其他";
    const name = (data.name as string) ?? (data.title_en as string) ?? "";
    result = {
      title: data.title as string,
      name,
      era: era as MathEra,
      field,
      birthYear: data.birthYear as number,
      deathYear: (data.deathYear as number | null) ?? null,
      nationality: (data.nationality as string) ?? "",
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
  mathematicianBySlugCache.set(slug, result);
  return result;
}

export function getAllMathematicians(): Mathematician[] {
  if (cachedMathematicians) return cachedMathematicians;
  cachedMathematicians = getMathematicianSlugs()
    .map((slug) => getMathematicianBySlug(slug))
    .filter((m): m is Mathematician => m !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 中世纪: 1, 近代: 2, 现代: 3, 当代: 4 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
  return cachedMathematicians;
}
