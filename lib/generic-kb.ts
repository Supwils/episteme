import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "./content-paths";

export interface KBArticle {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export interface KBArticleFull extends KBArticle {
  content: string;
}

export interface KBCategoryGroup {
  category: string;
  articles: KBArticle[];
}

export interface KnowledgeBase {
  getAllArticles(): KBArticle[];
  getArticleBySlug(slug: string): KBArticleFull | null;
  getArticlesByCategory(): KBCategoryGroup[];
  getSlugs(): string[];
}

function safeParseMatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  try {
    return matter(raw);
  } catch {
    return { data: {}, content: raw };
  }
}

function firstHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1]!.trim() : null;
}

function stripLeadingHeading(content: string): string {
  return content.replace(/^\s*#\s+.+\n+/, "");
}

function extractExcerpt(content: string): string {
  const lines = content
    .split("\n")
    .filter(
      (line) =>
        line.trim() &&
        !line.startsWith("#") &&
        !line.startsWith("|") &&
        !line.startsWith(">") &&
        !line.startsWith("-"),
    );
  const text = lines.slice(0, 2).join(" ").replace(/[*_`#[\]]/g, "");
  return text.length > 150 ? text.slice(0, 150) + "…" : text;
}

function walkMarkdown(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkMarkdown(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith(".md")) {
      results.push(rel);
    }
  }
  return results;
}

export function createKnowledgeBase(domain: string): KnowledgeBase {
  const root = path.join(getDomainContentDir(domain), "knowledge-base");
  let cache: KBArticle[] | null = null;

  const categoryOf = (rel: string, data: Record<string, unknown>): string => {
    if (typeof data.category === "string" && data.category) return data.category;
    const segments = rel.split("/");
    return segments.length > 1 ? segments[0]! : "专题";
  };

  const titleOf = (
    rel: string,
    data: Record<string, unknown>,
    content: string,
  ): string => {
    if (typeof data.title === "string" && data.title) return data.title;
    return firstHeading(content) ?? path.basename(rel, ".md");
  };

  const slugOf = (rel: string): string =>
    rel.replace(/\.md$/, "").replace(/\//g, "--");

  const toArticle = (rel: string): KBArticle => {
    const { data, content } = safeParseMatter(
      fs.readFileSync(path.join(root, rel), "utf-8"),
    );
    return {
      slug: slugOf(rel),
      title: titleOf(rel, data, content),
      category: categoryOf(rel, data),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      excerpt: extractExcerpt(content),
    };
  };

  const getAllArticles = (): KBArticle[] => {
    if (cache) return cache;
    cache = walkMarkdown(root)
      .map(toArticle)
      .sort(
        (a, b) =>
          a.category.localeCompare(b.category, "zh") ||
          a.title.localeCompare(b.title, "zh"),
      );
    return cache;
  };

  const getArticleBySlug = (slug: string): KBArticleFull | null => {
    if (slug.includes("..")) return null;
    const rel = slug.replace(/--/g, "/") + ".md";
    const full = path.resolve(root, rel);
    if (!full.startsWith(path.resolve(root)) || !fs.existsSync(full)) return null;
    const { data, content } = safeParseMatter(fs.readFileSync(full, "utf-8"));
    return {
      slug,
      title: titleOf(rel, data, content),
      category: categoryOf(rel, data),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      excerpt: extractExcerpt(content),
      content: stripLeadingHeading(content),
    };
  };

  const getArticlesByCategory = (): KBCategoryGroup[] => {
    const grouped = new Map<string, KBArticle[]>();
    for (const article of getAllArticles()) {
      const existing = grouped.get(article.category) ?? [];
      existing.push(article);
      grouped.set(article.category, existing);
    }
    return Array.from(grouped.entries()).map(([category, articles]) => ({
      category,
      articles,
    }));
  };

  const getSlugs = (): string[] => getAllArticles().map((article) => article.slug);

  return { getAllArticles, getArticleBySlug, getArticlesByCategory, getSlugs };
}
