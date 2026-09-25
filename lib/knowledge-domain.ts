import path from "node:path";
import { readContentBySlug, readContentEntries, type ContentEntry } from "./content-article";
import { getDomainContentDir } from "./content-paths";
import { decodeSlug, extractExcerpt, firstHeading, stripLeadingHeading } from "./content-utils";

/**
 * A generic typed-content engine for whole knowledge domains (computer-science,
 * political-science, …). It reads content/<domain>/<section>/*.{md,mdx} and is
 * the shared spine behind every section list + detail page, so a new domain is
 * (config + thin routes + content) rather than a bespoke loader per section.
 * Modeled on the per-subtype economics loader but generalized over an arbitrary
 * domain/section pair with a uniform item shape.
 */
export interface KnowledgeInfo {
  label: string;
  value: string;
}

export interface KnowledgeItem {
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  tags: string[];
  related: string[];
  order: number;
  /** Author-written `summary`/`dek` when present, else whole sentences from the body. */
  excerpt: string;
  /** Author-written dek only. A derived excerpt repeats the first paragraph, so
   * article headers show this and nothing else. */
  summary?: string;
  /** Frontmatter `updated` date (YYYY-MM-DD), used by 最近更新 strips. */
  updated: string;
  /** Present optional frontmatter fields, surfaced verbatim in the sidebar. */
  info: KnowledgeInfo[];
}

export interface KnowledgeItemFull extends KnowledgeItem {
  content: string;
  updated: string;
  /** Optional one-sentence takeaway (frontmatter `keyInsight` / `takeaway`). */
  keyInsight?: string;
  /** Optional RCSB PDB id; when set, the article renders a 3D molecule viewer. */
  molecule?: string;
  /** Optional interactive id; when set, the article renders a matching explorer
   * (see the registry in components/domain/DomainArticle). */
  interactive?: string;
}

export interface KnowledgeSection {
  getAll(): KnowledgeItem[];
  getBySlug(slug: string): KnowledgeItemFull | null;
  getSlugs(): string[];
}

/** String frontmatter fields that become sidebar rows when present, in order. */
const INFO_FIELDS: { key: string; label: string }[] = [
  { key: "era", label: "时代" },
  { key: "period", label: "时期" },
  { key: "years", label: "生卒" },
  { key: "born", label: "生卒" },
  { key: "nationality", label: "国籍 / 地区" },
  { key: "region", label: "地区" },
  { key: "field", label: "领域" },
  { key: "founder", label: "代表人物" },
];

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** gray-matter parses unquoted YYYY-MM-DD frontmatter into Date objects;
 *  quoted dates stay strings — normalize both to an ISO date string. */
function strDate(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return "";
}

function buildInfo(data: Record<string, unknown>): KnowledgeInfo[] {
  const info: KnowledgeInfo[] = [];
  if (typeof data.knowledge_level === "number") {
    info.push({ label: "认知阶段", value: `L${data.knowledge_level}` });
  }
  for (const { key, label } of INFO_FIELDS) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) {
      info.push({ label, value: value.trim() });
    }
  }
  const keyFigures = strArray(data.key_figures);
  if (keyFigures.length > 0) {
    info.push({ label: "关键人物", value: keyFigures.join("、") });
  }
  return info;
}

const ARTICLE_EXTS = [".mdx", ".md"] as const;

// Content only changes with a deployment, so one section instance (and its
// parsed lists) can live for the whole server instance. Without this every
// caller — page, generateMetadata, home cards, recent-updates strip — rebuilt
// the section and re-parsed every file in it per render.
const sectionInstances = new Map<string, KnowledgeSection>();

export function createKnowledgeSection(domain: string, section: string): KnowledgeSection {
  const key = `${domain}/${section}`;
  const existing = sectionInstances.get(key);
  if (existing) return existing;
  const instance = buildKnowledgeSection(domain, section);
  sectionInstances.set(key, instance);
  return instance;
}

function buildKnowledgeSection(domain: string, section: string): KnowledgeSection {
  const root = path.join(getDomainContentDir(domain), section);
  let cache: KnowledgeItem[] | null = null;
  const bySlug = new Map<string, KnowledgeItemFull | null>();

  const toItem = (entry: ContentEntry): KnowledgeItem => {
    const { slug, frontmatter: data, content } = entry;
    const summary = str(data.summary) || str(data.dek) || undefined;
    return {
      slug,
      title: str(data.title) || firstHeading(content) || slug,
      titleEn: str(data.title_en) || str(data.titleEn),
      category: str(data.category) || "",
      tags: strArray(data.tags),
      related: strArray(data.related),
      order: typeof data.order === "number" ? data.order : 999,
      excerpt: summary ?? extractExcerpt(content),
      summary,
      updated: strDate(data.updated),
      info: buildInfo(data),
    };
  };

  const getAll = (): KnowledgeItem[] => {
    if (cache) return cache;
    cache = readContentEntries(root, ARTICLE_EXTS, "safe")
      .map(toItem)
      .sort(
        (a, b) =>
          a.order - b.order ||
          a.category.localeCompare(b.category, "zh") ||
          a.title.localeCompare(b.title, "zh")
      );
    return cache;
  };

  const getBySlug = (slug: string): KnowledgeItemFull | null => {
    const wanted = decodeSlug(slug).normalize("NFC");
    // `<slug>.narration` would otherwise resolve to the sibling .narration.md and
    // render a spoken script as a phantom article — block it explicitly.
    if (wanted.endsWith(".narration")) return null;
    const cached = bySlug.get(wanted);
    if (cached !== undefined) return cached;
    const entry = readContentBySlug(root, wanted, ARTICLE_EXTS, "safe");
    const full = entry
      ? {
          ...toItem(entry),
          content: stripLeadingHeading(entry.content),
          keyInsight:
            str(entry.frontmatter.keyInsight) || str(entry.frontmatter.takeaway) || undefined,
          molecule: str(entry.frontmatter.molecule) || undefined,
          interactive: str(entry.frontmatter.interactive) || undefined,
        }
      : null;
    // Misses are cached too: a 404 slug is hit repeatedly by crawlers.
    bySlug.set(wanted, full);
    return full;
  };

  const getSlugs = (): string[] => getAll().map((item) => item.slug);

  return { getAll, getBySlug, getSlugs };
}
