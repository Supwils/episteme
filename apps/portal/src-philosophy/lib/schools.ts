import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { School, SchoolFrontmatter } from "./types";

const SCHOOLS_DIR = path.join(process.cwd(), "content", "philosophy", "schools");

export function getSchoolSlugs(): string[] {
  if (!fs.existsSync(SCHOOLS_DIR)) return [];
  return fs
    .readdirSync(SCHOOLS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getSchoolBySlug(slug: string): School | null {
  const filePath = path.join(SCHOOLS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...(data as SchoolFrontmatter),
    slug,
    content,
  };
}

export function getAllSchools(): School[] {
  return getSchoolSlugs()
    .map((slug) => getSchoolBySlug(slug))
    .filter((s): s is School => s !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 近代: 1, 现代: 2, 当代: 3 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
}
