import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MathConcept, MathConceptFrontmatter } from "./types";
import { CONCEPTS_DIR } from "./content-paths";

const conceptBySlugCache = new Map<string, MathConcept | null>();
let cachedConcepts: MathConcept[] | null = null;

export function getMathConceptSlugs(): string[] {
  if (!fs.existsSync(CONCEPTS_DIR)) return [];
  return fs
    .readdirSync(CONCEPTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMathConceptBySlug(slug: string): MathConcept | null {
  if (conceptBySlugCache.has(slug)) return conceptBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(CONCEPTS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(CONCEPTS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: MathConcept | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
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
  } catch {
    // result stays null
  }
  conceptBySlugCache.set(slug, result);
  return result;
}

export function getAllMathConcepts(): MathConcept[] {
  if (cachedConcepts) return cachedConcepts;
  cachedConcepts = getMathConceptSlugs()
    .map((slug) => getMathConceptBySlug(slug))
    .filter((c): c is MathConcept => c !== null);
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
