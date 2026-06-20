import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "./content-paths";

/**
 * "Frontier" articles document what researchers are actively pushing on *right
 * now* (the 2020s): the open question, who is working on it, the recent
 * breakthroughs with dates and sources, and what is still unknown. They live as
 * `.md` files under content/<domain>/frontier/ and are auto-discovered — adding
 * an article is just dropping a file (search data is regenerated from the same
 * frontmatter, so the two never drift).
 */
export interface FrontierArticle {
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  horizon: string;
  tags: string[];
  researchers: string[];
  institutions: string[];
  related: string[];
  order: number;
  excerpt: string;
}

export interface FrontierArticleFull extends FrontierArticle {
  content: string;
  updated: string;
}

export interface FrontierDomainConfig {
  /** Chinese domain label, e.g. "宇宙物理". */
  label: string;
  /** Hex accent for headers and category chips. */
  accent: string;
  /** Where the back-link points (the domain home). */
  backHref: string;
}

export const FRONTIER_DOMAINS = [
  "universe-physics",
  "cosmology",
  "mathematics",
  "life-science",
  "philosophy",
  "economics",
  "psychology",
  "human-history",
  "computer-science",
  "political-science",
  "earth-science",
  "medicine",
  "chemistry",
] as const;

export type FrontierDomain = (typeof FRONTIER_DOMAINS)[number];

export const FRONTIER_DOMAIN_CONFIG: Record<FrontierDomain, FrontierDomainConfig> = {
  "universe-physics": { label: "宇宙物理", accent: "#6b8cce", backHref: "/universe-physics" },
  cosmology: { label: "宇宙学", accent: "#a88adf", backHref: "/cosmology" },
  mathematics: { label: "数学", accent: "#5fb3a3", backHref: "/mathematics" },
  "life-science": { label: "生命科学", accent: "#6bae6b", backHref: "/life-science" },
  philosophy: { label: "哲学", accent: "#c8956a", backHref: "/philosophy" },
  economics: { label: "经济学", accent: "#c8a45a", backHref: "/economics" },
  psychology: { label: "心理学", accent: "#c678dd", backHref: "/psychology" },
  "human-history": { label: "人类历史", accent: "#cf8a52", backHref: "/human-history" },
  "computer-science": { label: "计算机科学", accent: "#4f9cf0", backHref: "/computer-science" },
  "political-science": { label: "政治学", accent: "#c25b5b", backHref: "/political-science" },
  "earth-science": { label: "地球科学", accent: "#4f9d76", backHref: "/earth-science" },
  medicine: { label: "医学与公共卫生", accent: "#d9544d", backHref: "/medicine" },
  chemistry: { label: "化学", accent: "#e08a3c", backHref: "/chemistry" },
};

function safeParseMatter(raw: string): { data: Record<string, unknown>; content: string } {
  try {
    return matter(raw);
  } catch {
    return { data: {}, content: raw };
  }
}

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function stripLeadingHeading(content: string): string {
  return content.replace(/^\s*#\s+.+\n+/, "");
}

function firstHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1]!.trim() : null;
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
        !line.startsWith("-")
    );
  const text = lines
    .slice(0, 2)
    .join(" ")
    .replace(/[*_`#[\]]/g, "");
  return text.length > 160 ? text.slice(0, 160) + "…" : text;
}

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export interface Frontier {
  getAllArticles(): FrontierArticle[];
  getArticleBySlug(slug: string): FrontierArticleFull | null;
  getSlugs(): string[];
}

export function createFrontier(domain: string): Frontier {
  const root = path.join(getDomainContentDir(domain), "frontier");
  let cache: FrontierArticle[] | null = null;

  const listFiles = (): string[] => {
    if (!fs.existsSync(root)) return [];
    return fs.readdirSync(root).filter((f) => f.endsWith(".md"));
  };

  const toMeta = (file: string): FrontierArticle => {
    const { data, content } = safeParseMatter(fs.readFileSync(path.join(root, file), "utf-8"));
    const slug = file.replace(/\.md$/, "");
    return {
      slug,
      title:
        typeof data.title === "string" && data.title ? data.title : (firstHeading(content) ?? slug),
      titleEn: typeof data.title_en === "string" ? data.title_en : "",
      category: typeof data.category === "string" && data.category ? data.category : "前沿",
      horizon: typeof data.horizon === "string" ? data.horizon : "",
      tags: strArray(data.tags),
      researchers: strArray(data.researchers),
      institutions: strArray(data.institutions),
      related: strArray(data.related),
      order: typeof data.order === "number" ? data.order : 999,
      excerpt: extractExcerpt(content),
    };
  };

  const getAllArticles = (): FrontierArticle[] => {
    if (cache) return cache;
    cache = listFiles()
      .map(toMeta)
      .sort(
        (a, b) =>
          a.category.localeCompare(b.category, "zh") ||
          a.order - b.order ||
          a.title.localeCompare(b.title, "zh")
      );
    return cache;
  };

  const getArticleBySlug = (slug: string): FrontierArticleFull | null => {
    const wanted = decodeSlug(slug).normalize("NFC");
    if (!wanted || wanted.includes("..") || wanted.includes("/") || wanted.includes("\\"))
      return null;
    const file = `${wanted}.md`;
    const full = path.resolve(root, file);
    if (!full.startsWith(path.resolve(root)) || !fs.existsSync(full)) return null;
    const { data, content } = safeParseMatter(fs.readFileSync(full, "utf-8"));
    const meta = toMeta(file);
    return {
      ...meta,
      updated: typeof data.updated === "string" ? data.updated : "",
      content: stripLeadingHeading(content),
    };
  };

  const getSlugs = (): string[] => getAllArticles().map((a) => a.slug);

  return { getAllArticles, getArticleBySlug, getSlugs };
}
