import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ISMS_DIR = path.join(process.cwd(), "content", "isms");

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

export function getIsmSlugs(): string[] {
  if (!fs.existsSync(ISMS_DIR)) return [];
  return fs
    .readdirSync(ISMS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getIsmBySlug(slug: string): Ism | null {
  const filePath = path.join(ISMS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...(data as IsmFrontmatter),
    slug,
    content,
  };
}

export function getAllIsms(): Ism[] {
  return getIsmSlugs()
    .map((slug) => getIsmBySlug(slug))
    .filter((i): i is Ism => i !== null);
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

const CATEGORY_ORDER = [
  "本体论",
  "认识论",
  "伦理学",
  "美学",
  "政治哲学",
  "逻辑学",
];

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
