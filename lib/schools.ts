import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { School, SchoolFrontmatter } from "./types";
import { getDomainContentDir } from "./content-paths";

const SCHOOLS_DIR = path.join(getDomainContentDir("philosophy"), "schools");

const schoolBySlugCache = new Map<string, School | null>();
let cachedSchools: School[] | null = null;

export function getSchoolSlugs(): string[] {
  if (!fs.existsSync(SCHOOLS_DIR)) return [];
  return fs
    .readdirSync(SCHOOLS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getSchoolBySlug(slug: string): School | null {
  if (schoolBySlugCache.has(slug)) return schoolBySlugCache.get(slug)!;
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const filePath = path.join(SCHOOLS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(SCHOOLS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: School | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as SchoolFrontmatter),
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  schoolBySlugCache.set(slug, result);
  return result;
}

export function getAllSchools(): School[] {
  if (cachedSchools) return cachedSchools;
  cachedSchools = getSchoolSlugs()
    .map((slug) => getSchoolBySlug(slug))
    .filter((s): s is School => s !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 近代: 1, 现代: 2, 当代: 3 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
  return cachedSchools;
}
