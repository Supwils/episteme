import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "../../lib/content-paths";

const ISMS_DIR = path.join(getDomainContentDir("philosophy"), "isms");

export type IsmFrontmatter = {
  title: string;
  title_en: string;
  category: string;
  era: string;
  key_figures: string[];
  opposing: string[];
  tags: string[];
  status: string;
  updated: string;
};

export type Ism = IsmFrontmatter & {
  slug: string;
  content: string;
};

const ismBySlugCache = new Map<string, Ism | null>();
let cachedIsms: Ism[] | null = null;

export function getIsmSlugs(): string[] {
  if (!fs.existsSync(ISMS_DIR)) return [];
  return fs
    .readdirSync(ISMS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getIsmBySlug(slug: string): Ism | null {
  if (ismBySlugCache.has(slug)) return ismBySlugCache.get(slug)!;
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const filePath = path.join(ISMS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(ISMS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Ism | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as IsmFrontmatter),
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  ismBySlugCache.set(slug, result);
  return result;
}

export function getAllIsms(): Ism[] {
  if (cachedIsms) return cachedIsms;
  cachedIsms = getIsmSlugs()
    .map((slug) => getIsmBySlug(slug))
    .filter((i): i is Ism => i !== null);
  return cachedIsms;
}

export function getIsmsByCategory(): Record<string, Ism[]> {
  const all = getAllIsms();
  const grouped: Record<string, Ism[]> = {};
  for (const ism of all) {
    const cat = ism.category || "其他";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(ism);
  }
  return grouped;
}

const CATEGORY_ORDER = ["本体论", "认识论", "伦理学", "美学", "政治哲学", "逻辑学"];

export function getOrderedCategories(): string[] {
  const grouped = getIsmsByCategory();
  const known = CATEGORY_ORDER.filter((c) => c in grouped);
  const extra = Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c));
  return [...known, ...extra];
}

export function buildSlugByTitleMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const ism of getAllIsms()) {
    map.set(ism.title, ism.slug);
  }
  return map;
}
