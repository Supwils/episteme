import path from "node:path";
import type { Concept, ConceptFrontmatter } from "./types";
import { loadAllContent, loadContentBySlug } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";

const CONCEPTS_DIR = path.join(getDomainContentDir("philosophy"), "concepts");

const conceptBySlugCache = new Map<string, Concept | null>();
let cachedConcepts: Concept[] | null = null;

function toConcept(data: Record<string, unknown>, content: string, slug: string): Concept {
  return {
    title: (data.title as string) ?? "",
    title_en: (data.title_en as string) ?? "",
    field: (data.field as string) ?? "",
    key_figures: Array.isArray(data.key_figures) ? (data.key_figures as string[]) : [],
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    related: Array.isArray(data.related) ? (data.related as string[]) : [],
    status: (data.status as ConceptFrontmatter["status"]) ?? "draft",
    updated: (data.updated as string) ?? "",
    slug,
    content,
  };
}

export function getConceptSlugs(): string[] {
  return listContentSlugs(CONCEPTS_DIR);
}

export function getConceptBySlug(slug: string): Concept | null {
  return loadContentBySlug(CONCEPTS_DIR, slug, conceptBySlugCache, toConcept);
}

export function getAllConcepts(): Concept[] {
  if (cachedConcepts) return cachedConcepts;
  cachedConcepts = loadAllContent(CONCEPTS_DIR, conceptBySlugCache, toConcept);
  return cachedConcepts;
}

export function getConceptsByField(): Record<string, Concept[]> {
  const all = getAllConcepts();
  const grouped: Record<string, Concept[]> = {};
  for (const concept of all) {
    const field = concept.field || "其他";
    if (!grouped[field]) grouped[field] = [];
    grouped[field].push(concept);
  }
  return grouped;
}

const FIELD_ORDER = ["形而上学", "认识论", "伦理学", "美学", "政治哲学", "逻辑学"];

export function getOrderedFields(): string[] {
  const grouped = getConceptsByField();
  const known = FIELD_ORDER.filter((f) => f in grouped);
  const extra = Object.keys(grouped).filter((f) => !FIELD_ORDER.includes(f));
  return [...known, ...extra];
}

export function buildConceptSlugByTitleMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const concept of getAllConcepts()) {
    map.set(concept.title, concept.slug);
  }
  return map;
}
