import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "@/lib/content-paths";

/**
 * The scientist detail page is registry-driven (scientists.ts), but some
 * scientists also have a long-form `.mdx` bio in content/life-science/scientists/
 * named after the registry id. When present, its body is rendered below the
 * structured fact cards — otherwise the page falls back to the registry fields.
 */
const SCIENTISTS_DIR = path.join(getDomainContentDir("life-science"), "scientists");

export function getScientistArticleBody(id: string): string | null {
  if (!id || id.includes("..") || id.includes("/") || id.includes("\\")) return null;
  const file = path.join(SCIENTISTS_DIR, `${id}.mdx`);
  if (!file.startsWith(SCIENTISTS_DIR) || !fs.existsSync(file)) return null;
  try {
    const { content } = matter(fs.readFileSync(file, "utf-8"));
    const body = content.replace(/^\s*#\s+.+\n+/, "").trim();
    return body.length > 0 ? body : null;
  } catch {
    return null;
  }
}
