import { loadAllContent, loadContentBySlug } from "@/lib/content-article";
import { listContentSlugs } from "@/lib/content-paths";
import type { MathParadox } from "./types";
import { PARADOXES_DIR } from "./content-paths";

const paradoxBySlugCache = new Map<string, MathParadox | null>();
let cachedParadoxes: MathParadox[] | null = null;

function toParadox(data: Record<string, unknown>, content: string, slug: string): MathParadox {
  return {
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
}

export function getMathParadoxSlugs(): string[] {
  return listContentSlugs(PARADOXES_DIR);
}

export function getMathParadoxBySlug(slug: string): MathParadox | null {
  return loadContentBySlug(PARADOXES_DIR, slug, paradoxBySlugCache, toParadox);
}

export function getAllMathParadoxes(): MathParadox[] {
  if (cachedParadoxes) return cachedParadoxes;
  cachedParadoxes = loadAllContent(PARADOXES_DIR, paradoxBySlugCache, toParadox);
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
