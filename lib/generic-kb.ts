import fs from "node:fs";
import path from "node:path";
import { readParsedFile } from "./content-article";
import { getDomainContentDir, existingContentFile } from "./content-paths";
import { decodeSlug, extractExcerpt, firstHeading, stripLeadingHeading } from "./content-utils";

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

function walkMarkdown(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkMarkdown(path.join(dir, entry.name), rel));
    } else if (
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) &&
      !entry.name.endsWith(".narration.md")
    ) {
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

  const titleOf = (rel: string, data: Record<string, unknown>, content: string): string => {
    if (typeof data.title === "string" && data.title) return data.title;
    return firstHeading(content) ?? path.basename(rel).replace(/\.mdx?$/, "");
  };

  const slugOf = (rel: string): string => rel.replace(/\.mdx?$/, "").replace(/\//g, "--");

  const toArticle = (rel: string): KBArticle | null => {
    const parsed = readParsedFile(path.join(root, rel), "safe");
    if (!parsed) return null;
    const { data, content } = parsed;
    return {
      slug: slugOf(rel),
      title: titleOf(rel, data, content),
      category: categoryOf(rel, data),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      excerpt: extractExcerpt(content, 150),
    };
  };

  const getAllArticles = (): KBArticle[] => {
    if (cache) return cache;
    cache = walkMarkdown(root)
      .map(toArticle)
      .filter((article): article is KBArticle => article !== null)
      .sort(
        (a, b) => a.category.localeCompare(b.category, "zh") || a.title.localeCompare(b.title, "zh")
      );
    return cache;
  };

  const getArticleBySlug = (slug: string): KBArticleFull | null => {
    // CJK route params arrive percent-encoded (and possibly in a different
    // Unicode normalization form than the on-disk filename). Decode + NFC, then
    // match against the real readdir-derived slugs and rebuild the path from the
    // filesystem's own form — otherwise every CJK-named article (暗物质与暗能量,
    // 相对论--黑洞, 当代议题--第六次大灭绝) 404s. ASCII slugs are unaffected.
    const wanted = decodeSlug(slug).normalize("NFC");
    const match = getAllArticles().find((a) => a.slug.normalize("NFC") === wanted);
    if (!match) return null;
    const relStem = match.slug.replace(/--/g, "/");
    const full =
      existingContentFile(root, ...`${relStem}.md`.split("/")) ??
      existingContentFile(root, ...`${relStem}.mdx`.split("/"));
    if (!full) return null;
    const parsed = readParsedFile(full, "safe");
    if (!parsed) return null;
    const { data, content } = parsed;
    return {
      slug: match.slug,
      title: titleOf(relStem, data, content),
      category: categoryOf(relStem, data),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      excerpt: extractExcerpt(content, 150),
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
