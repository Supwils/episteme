import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Concept, ConceptFrontmatter } from "./types";
import { getDomainContentDir } from "@/lib/content-paths";

const CONCEPTS_DIR = path.join(getDomainContentDir("philosophy"), "concepts");

const conceptBySlugCache = new Map<string, Concept | null>();
let cachedConcepts: Concept[] | null = null;

export function getConceptSlugs(): string[] {
  if (!fs.existsSync(CONCEPTS_DIR)) return [];
  return fs
    .readdirSync(CONCEPTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getConceptBySlug(slug: string): Concept | null {
  if (conceptBySlugCache.has(slug)) return conceptBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(CONCEPTS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(CONCEPTS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Concept | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as ConceptFrontmatter),
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  conceptBySlugCache.set(slug, result);
  return result;
}

export function getAllConcepts(): Concept[] {
  if (cachedConcepts) return cachedConcepts;
  cachedConcepts = getConceptSlugs()
    .map((slug) => getConceptBySlug(slug))
    .filter((c): c is Concept => c !== null);
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

const FIELD_ORDER = [
  "形而上学",
  "认识论",
  "伦理学",
  "美学",
  "政治哲学",
  "逻辑学",
];

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
