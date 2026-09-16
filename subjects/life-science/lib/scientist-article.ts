import path from "node:path";
import { loadContentBySlug } from "@/lib/content-article";
import { getDomainContentDir } from "@/lib/content-paths";

/**
 * The scientist detail page is registry-driven (scientists.ts), but some
 * scientists also have a long-form `.mdx` bio in content/life-science/scientists/
 * named after the registry id. When present, its body is rendered below the
 * structured fact cards — otherwise the page falls back to the registry fields.
 */
const SCIENTISTS_DIR = path.join(getDomainContentDir("life-science"), "scientists");

const scientistBodyCache = new Map<string, { body: string } | null>();

export function getScientistArticleBody(id: string): string | null {
  const article = loadContentBySlug(SCIENTISTS_DIR, id, scientistBodyCache, (_data, content) => ({
    body: content.replace(/^\s*#\s+.+\n+/, "").trim(),
  }));
  if (!article || !article.body) return null;
  return article.body;
}
