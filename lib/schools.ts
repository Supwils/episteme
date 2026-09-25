import path from "node:path";
import type { School, SchoolFrontmatter } from "./types";
import { loadAllContent, loadContentBySlug } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";

const SCHOOLS_DIR = path.join(getDomainContentDir("philosophy"), "schools");

const schoolBySlugCache = new Map<string, School | null>();
let cachedSchools: School[] | null = null;

const ERA_ORDER: Record<string, number> = { 古代: 0, 中世纪: 1, 近代: 2, 现代: 3, 当代: 4 };

function toSchool(data: Record<string, unknown>, content: string, slug: string): School {
  return {
    ...(data as SchoolFrontmatter),
    slug,
    content,
  };
}

export function getSchoolSlugs(): string[] {
  return listContentSlugs(SCHOOLS_DIR);
}

export function getSchoolBySlug(slug: string): School | null {
  return loadContentBySlug(SCHOOLS_DIR, slug, schoolBySlugCache, toSchool);
}

export function getAllSchools(): School[] {
  if (cachedSchools) return cachedSchools;
  cachedSchools = loadAllContent(SCHOOLS_DIR, schoolBySlugCache, toSchool, {
    sort: (a, b) => (ERA_ORDER[a.era] ?? 99) - (ERA_ORDER[b.era] ?? 99),
  });
  return cachedSchools;
}
