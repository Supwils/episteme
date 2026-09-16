import { loadAllContent, loadContentBySlug } from "@/lib/content-article";
import { listContentSlugs } from "@/lib/content-paths";
import type { Theorem } from "./types";
import { THEOREMS_DIR } from "./content-paths";

const theoremBySlugCache = new Map<string, Theorem | null>();
let cachedTheorems: Theorem[] | null = null;

function toTheorem(data: Record<string, unknown>, content: string, slug: string): Theorem {
  return {
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
}

export function getTheoremSlugs(): string[] {
  return listContentSlugs(THEOREMS_DIR);
}

export function getTheoremBySlug(slug: string): Theorem | null {
  return loadContentBySlug(THEOREMS_DIR, slug, theoremBySlugCache, toTheorem);
}

export function getAllTheorems(): Theorem[] {
  if (cachedTheorems) return cachedTheorems;
  cachedTheorems = loadAllContent(THEOREMS_DIR, theoremBySlugCache, toTheorem);
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
