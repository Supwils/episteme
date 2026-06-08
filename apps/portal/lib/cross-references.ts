import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "./content-paths";

export type ContentCategory = "thinker" | "school" | "ism" | "experiment" | "question" | "concept";

export type ContentItem = {
  slug: string;
  title: string;
  category: ContentCategory;
  related: string[];
};

const CATEGORY_LABELS: Record<ContentCategory, string> = {
  thinker: "哲学家",
  school: "流派",
  ism: "主义",
  concept: "概念",
  experiment: "思想实验",
  question: "哲学大问题",
};

const CATEGORY_ROUTES: Record<ContentCategory, string> = {
  thinker: "/philosophy/thinkers",
  school: "/philosophy/schools",
  ism: "/philosophy/isms",
  concept: "/philosophy/concepts",
  experiment: "/philosophy/experiments",
  question: "/philosophy/questions",
};

function scanDir(dir: string, category: ContentCategory): ContentItem[] {
  const fullDir = path.join(getDomainContentDir("philosophy"), dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(fullDir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title || f,
        category,
        related: data.related || data.related_thinkers || [],
      };
    });
}

let cachedAllContent: ContentItem[] | null = null;

export function getAllContent(): ContentItem[] {
  if (cachedAllContent) return cachedAllContent;
  cachedAllContent = [
    ...scanDir("thinkers", "thinker"),
    ...scanDir("schools", "school"),
    ...scanDir("isms", "ism"),
    ...scanDir("concepts", "concept"),
    ...scanDir("experiments", "experiment"),
    ...scanDir("questions", "question"),
  ];
  return cachedAllContent;
}

export function findBySlug(slug: string): ContentItem | undefined {
  return getAllContent().find((item) => item.slug === slug);
}

export function findByTitle(title: string): ContentItem | undefined {
  return getAllContent().find((item) => item.title === title || item.slug === title);
}

function matchRelated(rel: string, item: ContentItem): boolean {
  return (
    rel === item.title || rel === item.slug || item.title.includes(rel) || rel.includes(item.title)
  );
}

export function getRelatedItems(item: ContentItem): ContentItem[] {
  const all = getAllContent();
  return item.related
    .map((rel) => all.find((i) => matchRelated(rel, i)))
    .filter((i): i is ContentItem => i !== undefined && i.slug !== item.slug);
}

export function getBackReferences(slug: string): ContentItem[] {
  const all = getAllContent();
  const item = all.find((i) => i.slug === slug);
  if (!item) return [];
  return all.filter((i) => i.slug !== slug && i.related.some((rel) => matchRelated(rel, item)));
}

export function getItemsByCategory(items: ContentItem[]): Record<ContentCategory, ContentItem[]> {
  const grouped: Record<ContentCategory, ContentItem[]> = {
    thinker: [],
    school: [],
    ism: [],
    concept: [],
    experiment: [],
    question: [],
  };
  for (const item of items) {
    grouped[item.category].push(item);
  }
  return grouped;
}

export function getCategoryLabel(category: ContentCategory): string {
  return CATEGORY_LABELS[category];
}

export function getCategoryRoute(category: ContentCategory): string {
  return CATEGORY_ROUTES[category];
}

export function getItemUrl(item: ContentItem): string {
  return `${CATEGORY_ROUTES[item.category]}/${item.slug}`;
}
