import path from "node:path";
import { loadContentBySlug } from "@/lib/content-article";
import { getDomainContentDir } from "@/lib/content-paths";
import { authorSummary } from "@/lib/content-utils";

/**
 * The scientist detail page is registry-driven (scientists.ts), but some
 * scientists also have a long-form `.mdx` bio in content/life-science/scientists/
 * named after the registry id. When present, its body is rendered below the
 * structured fact cards — otherwise the page falls back to the registry fields.
 */
const SCIENTISTS_DIR = path.join(getDomainContentDir("life-science"), "scientists");

const scientistBodyCache = new Map<string, { body: string; summary?: string } | null>();

export function getScientistArticle(id: string): { body: string; summary?: string } | null {
  const article = loadContentBySlug(SCIENTISTS_DIR, id, scientistBodyCache, (data, content) => ({
    body: content.replace(/^\s*#\s+.+\n+/, "").trim(),
    summary: authorSummary(data),
  }));
  if (!article || !article.body) return null;
  return article;
}

export function getScientistArticleBody(id: string): string | null {
  return getScientistArticle(id)?.body ?? null;
}
