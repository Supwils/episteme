import { loadAllContent, loadContentBySlug } from "@/lib/content-article";
import { listContentSlugs } from "@/lib/content-paths";
import type { MathConcept } from "./types";
import { CONCEPTS_DIR } from "./content-paths";

const conceptBySlugCache = new Map<string, MathConcept | null>();
let cachedConcepts: MathConcept[] | null = null;

function toConcept(data: Record<string, unknown>, content: string, slug: string): MathConcept {
  return {
    title: data.title as string,
    title_en: (data.title_en as string) ?? "",
    field: (data.field as string) ?? "其他",
    key_figures: (data.key_figures as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    related: (data.related as string[]) ?? [],
    status: (data.status as "stub" | "draft" | "published") ?? "draft",
    updated: (data.updated as string) ?? "",
    slug,
    content,
  };
}

export function getMathConceptSlugs(): string[] {
  return listContentSlugs(CONCEPTS_DIR);
}

export function getMathConceptBySlug(slug: string): MathConcept | null {
  return loadContentBySlug(CONCEPTS_DIR, slug, conceptBySlugCache, toConcept);
}

export function getAllMathConcepts(): MathConcept[] {
  if (cachedConcepts) return cachedConcepts;
  cachedConcepts = loadAllContent(CONCEPTS_DIR, conceptBySlugCache, toConcept);
  return cachedConcepts;
}

export function getMathConceptsByField(): Record<string, MathConcept[]> {
  const all = getAllMathConcepts();
  const grouped: Record<string, MathConcept[]> = {};
  for (const concept of all) {
    const field = concept.field || "其他";
    if (!grouped[field]) grouped[field] = [];
    grouped[field].push(concept);
  }
  return grouped;
}
