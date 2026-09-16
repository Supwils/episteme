import { loadAllContent, loadContentBySlug } from "@/lib/content-article";
import { listContentSlugs } from "@/lib/content-paths";
import type { Mathematician, MathEra } from "./types";
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

const ERA_ORDER: Record<string, number> = { 古代: 0, 中世纪: 1, 近代: 2, 现代: 3, 当代: 4 };

function toMathematician(
  data: Record<string, unknown>,
  content: string,
  slug: string
): Mathematician {
  const era = ERA_MAP[data.era as string] ?? data.era ?? "古代";
  const fields: string[] = Array.isArray(data.fields) ? data.fields : [];
  const field = (data.field as string) ?? fields[0] ?? "其他";
  const name = (data.name as string) ?? (data.title_en as string) ?? "";
  return {
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
}

export function getMathematicianSlugs(): string[] {
  return listContentSlugs(MATHEMATICIANS_DIR);
}

export function getMathematicianBySlug(slug: string): Mathematician | null {
  return loadContentBySlug(MATHEMATICIANS_DIR, slug, mathematicianBySlugCache, toMathematician);
}

export function getAllMathematicians(): Mathematician[] {
  if (cachedMathematicians) return cachedMathematicians;
  cachedMathematicians = loadAllContent(
    MATHEMATICIANS_DIR,
    mathematicianBySlugCache,
    toMathematician,
    {
      sort: (a, b) => (ERA_ORDER[a.era] ?? 99) - (ERA_ORDER[b.era] ?? 99),
    }
  );
  return cachedMathematicians;
}
