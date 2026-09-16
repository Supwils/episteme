import path from "node:path";
import { readContentBySlug, readContentEntries, type ContentEntry } from "./content-article";
import { getDomainContentDir } from "./content-paths";
import { decodeSlug, extractExcerpt, firstHeading, stripLeadingHeading } from "./content-utils";

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

/**
 * Genre registry for 2020s research-frontier articles. Keep this list equal to
 * `DOMAINS.map((d) => d.id)` in `lib/data.tsx`: a subject that ships without a
 * frontier genre is how linguistics/law/education went missing before. The
 * homepage catalog test asserts the sorted arrays match; App Router still needs
 * `app/<id>/frontier/page.tsx` and `[slug]/page.tsx` as thin files.
 */
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
  "sociology",
  "arts",
  "literature",
  "religion",
  "anthropology",
  "education",
  "engineering",
  "law",
  "linguistics",
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
  sociology: { label: "社会学", accent: "#7a8f5a", backHref: "/sociology" },
  arts: { label: "艺术、建筑与美学", accent: "#b0783c", backHref: "/arts" },
  literature: { label: "文学与叙事", accent: "#8b5e4a", backHref: "/literature" },
  religion: { label: "宗教学", accent: "#6b5c8a", backHref: "/religion" },
  anthropology: { label: "人类学与考古", accent: "#8b5a3c", backHref: "/anthropology" },
  education: { label: "教育学与学习科学", accent: "#3d6b8a", backHref: "/education" },
  engineering: { label: "工程与技术", accent: "#8a919e", backHref: "/engineering" },
  law: { label: "法学", accent: "#9a6f52", backHref: "/law" },
  linguistics: { label: "语言学", accent: "#3f8f8a", backHref: "/linguistics" },
};

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function toMeta(entry: ContentEntry): FrontierArticle {
  const { slug, frontmatter: data, content } = entry;
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
}

export interface Frontier {
  getAllArticles(): FrontierArticle[];
  getArticleBySlug(slug: string): FrontierArticleFull | null;
  getSlugs(): string[];
}

export function createFrontier(domain: string): Frontier {
  const root = path.join(getDomainContentDir(domain), "frontier");
  let cache: FrontierArticle[] | null = null;

  const getAllArticles = (): FrontierArticle[] => {
    if (cache) return cache;
    cache = readContentEntries(root, [".md"], "safe")
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
    const entry = readContentBySlug(root, wanted, [".md"], "safe");
    if (!entry) return null;
    return {
      ...toMeta(entry),
      updated: typeof entry.frontmatter.updated === "string" ? entry.frontmatter.updated : "",
      content: stripLeadingHeading(entry.content),
    };
  };

  const getSlugs = (): string[] => getAllArticles().map((a) => a.slug);

  return { getAllArticles, getArticleBySlug, getSlugs };
}
