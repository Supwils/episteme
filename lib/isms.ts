import path from "node:path";
import { loadAllContent, loadContentBySlug } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";

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

function toIsm(data: Record<string, unknown>, content: string, slug: string): Ism {
  return {
    ...(data as IsmFrontmatter),
    slug,
    content,
  };
}

export function getIsmSlugs(): string[] {
  return listContentSlugs(ISMS_DIR);
}

export function getIsmBySlug(slug: string): Ism | null {
  return loadContentBySlug(ISMS_DIR, slug, ismBySlugCache, toIsm);
}

export function getAllIsms(): Ism[] {
  if (cachedIsms) return cachedIsms;
  cachedIsms = loadAllContent(ISMS_DIR, ismBySlugCache, toIsm);
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
