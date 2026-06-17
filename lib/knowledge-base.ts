import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "./content-paths";

const KB_ROOT = path.join(getDomainContentDir("human-history"), "knowledge-base");

const SKIP_FILES = new Set([
  "索引.md",
  "工程守则.md",
  "审校工作台.md",
  "开发规范.md",
  "内容深度规范.md",
  "项目规划.md",
]);

export interface KBArticle {
  slug: string;
  title: string;
  era: string;
  eraLabel: string;
  category: string;
  region?: string;
  period?: string;
  date?: string;
  tags: string[];
  excerpt: string;
  filePath: string;
}

export interface KBArticleFull extends KBArticle {
  content: string;
}

const ERA_MAP: Record<string, { label: string; order: number }> = {
  远古时期: { label: "远古时期", order: 0 },
  古典时期: { label: "古典时期", order: 1 },
  中世纪: { label: "中世纪", order: 2 },
  近代: { label: "近代", order: 3 },
  现代: { label: "现代", order: 4 },
  当代: { label: "当代", order: 5 },
  未来展望: { label: "未来展望", order: 6 },
  人物: { label: "人物", order: 7 },
  文明: { label: "文明", order: 8 },
  事件: { label: "事件", order: 9 },
};

function makeSlug(relativePath: string): string {
  return relativePath.replace(/\.md$/, "").replace(/\//g, "--");
}

function extractExcerpt(content: string): string {
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
  const text = lines
    .slice(0, 3)
    .join(" ")
    .replace(/[*_`#\[\]]/g, "");
  return text.length > 160 ? text.slice(0, 160) + "…" : text;
}

function walkDir(dir: string, base: string = ""): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkDir(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith(".md") && !SKIP_FILES.has(entry.name)) {
      results.push(rel);
    }
  }
  return results;
}

function getEraFromPath(relPath: string): string {
  const topDir = relPath.split("/")[0] ?? "";
  return ERA_MAP[topDir] ? topDir : "其他";
}

function safeParseMatter(raw: string): { data: Record<string, unknown>; content: string } {
  try {
    return matter(raw);
  } catch {
    const contentStart = raw.indexOf("---", 3);
    if (contentStart !== -1) {
      return { data: {}, content: raw.slice(contentStart + 3).trim() };
    }
    return { data: {}, content: raw };
  }
}

let articlesCache: KBArticle[] | null = null;

function buildArticle(rel: string): KBArticle | null {
  const fullPath = path.join(KB_ROOT, rel);
  let raw: string;
  try {
    raw = fs.readFileSync(fullPath, "utf-8");
  } catch {
    return null;
  }
  const { data, content } = safeParseMatter(raw);
  const era = getEraFromPath(rel);
  const parts = rel.replace(/\.md$/, "").split("/");
  const category =
    parts.length > 2 ? (parts[1] ?? "概述") : parts.length > 1 ? (parts[1] ?? "概述") : "概述";

  return {
    slug: makeSlug(rel),
    title: (data.title as string) || (parts[parts.length - 1] ?? ""),
    era,
    eraLabel: ERA_MAP[era]?.label ?? era,
    category,
    region: data.region as string | undefined,
    period: (data.period as string) || undefined,
    date: (data.date as string) || undefined,
    tags: (data.tags as string[]) || [],
    excerpt: extractExcerpt(content),
    filePath: rel,
  };
}

export function getAllArticles(): KBArticle[] {
  if (articlesCache) return articlesCache;
  const relPaths = walkDir(KB_ROOT);
  const articles: KBArticle[] = [];
  for (const rel of relPaths) {
    const article = buildArticle(rel);
    if (article) articles.push(article);
  }
  articlesCache = articles.sort((a, b) => {
    const ea = ERA_MAP[a.era]?.order ?? 99;
    const eb = ERA_MAP[b.era]?.order ?? 99;
    if (ea !== eb) return ea - eb;
    return a.title.localeCompare(b.title, "zh");
  });
  return articlesCache;
}

export function getArticleBySlug(slug: string): KBArticleFull | null {
  // CJK slugs arrive percent-encoded on on-demand (ISR) requests; decode + NFC so
  // the on-disk lookup matches the prerendered raw-name behavior.
  let wanted: string;
  try {
    wanted = decodeURIComponent(slug).normalize("NFC");
  } catch {
    wanted = slug.normalize("NFC");
  }
  if (wanted.includes("..")) return null;
  const relPath = wanted.replace(/--/g, "/") + ".md";
  const fullPath = path.resolve(KB_ROOT, relPath);
  if (!fullPath.startsWith(path.resolve(KB_ROOT))) return null;
  let raw: string;
  try {
    if (!fs.existsSync(fullPath)) return null;
    raw = fs.readFileSync(fullPath, "utf-8");
  } catch {
    return null;
  }
  const { data, content } = safeParseMatter(raw);
  const era = getEraFromPath(relPath);
  const parts = relPath.replace(/\.md$/, "").split("/");
  const category =
    parts.length > 2 ? (parts[1] ?? "概述") : parts.length > 1 ? (parts[1] ?? "概述") : "概述";

  return {
    slug,
    title: (data.title as string) || (parts[parts.length - 1] ?? ""),
    era,
    eraLabel: ERA_MAP[era]?.label ?? era,
    category,
    region: data.region as string | undefined,
    period: (data.period as string) || undefined,
    date: (data.date as string) || undefined,
    tags: (data.tags as string[]) || [],
    excerpt: extractExcerpt(content),
    filePath: relPath,
    content,
  };
}

export function getArticlesByEra(): Map<string, KBArticle[]> {
  const all = getAllArticles();
  const grouped = new Map<string, KBArticle[]>();
  for (const article of all) {
    const existing = grouped.get(article.era) ?? [];
    existing.push(article);
    grouped.set(article.era, existing);
  }
  return grouped;
}
