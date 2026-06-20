import fs from "node:fs";
import path from "node:path";
import { getDomainContentDir } from "./content-paths";
import {
  safeParseMatter,
  decodeSlug,
  stripLeadingHeading,
  firstHeading,
  extractExcerpt,
} from "./content-utils";

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
  excerpt: string;
  /** Present optional frontmatter fields, surfaced verbatim in the sidebar. */
  info: KnowledgeInfo[];
}

export interface KnowledgeItemFull extends KnowledgeItem {
  content: string;
  updated: string;
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

function buildInfo(data: Record<string, unknown>): KnowledgeInfo[] {
  const info: KnowledgeInfo[] = [];
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

export function createKnowledgeSection(domain: string, section: string): KnowledgeSection {
  const root = path.join(getDomainContentDir(domain), section);
  let cache: KnowledgeItem[] | null = null;

  const listFiles = (): string[] => {
    if (!fs.existsSync(root)) return [];
    // `<slug>.narration.md` are spoken companions, not articles — never list them.
    return fs
      .readdirSync(root)
      .filter((f) => (f.endsWith(".md") || f.endsWith(".mdx")) && !f.endsWith(".narration.md"));
  };

  const slugOf = (file: string): string => file.replace(/\.mdx?$/, "");

  const toItem = (file: string): KnowledgeItem => {
    const { data, content } = safeParseMatter(fs.readFileSync(path.join(root, file), "utf-8"));
    const slug = slugOf(file);
    return {
      slug,
      title: str(data.title) || firstHeading(content) || slug,
      titleEn: str(data.title_en) || str(data.titleEn),
      category: str(data.category) || "",
      tags: strArray(data.tags),
      related: strArray(data.related),
      order: typeof data.order === "number" ? data.order : 999,
      excerpt: extractExcerpt(content),
      info: buildInfo(data),
    };
  };

  const getAll = (): KnowledgeItem[] => {
    if (cache) return cache;
    cache = listFiles()
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
    if (!wanted || wanted.includes("..") || wanted.includes("/") || wanted.includes("\\"))
      return null;
    // `<slug>.narration` would otherwise resolve to the sibling .narration.md and
    // render a spoken script as a phantom article — block it explicitly.
    if (wanted.endsWith(".narration")) return null;
    const file = fs.existsSync(path.join(root, `${wanted}.mdx`))
      ? `${wanted}.mdx`
      : fs.existsSync(path.join(root, `${wanted}.md`))
        ? `${wanted}.md`
        : null;
    if (!file) return null;
    const full = path.resolve(root, file);
    if (!full.startsWith(path.resolve(root))) return null;
    const { data, content } = safeParseMatter(fs.readFileSync(full, "utf-8"));
    return {
      ...toItem(file),
      updated: str(data.updated),
      content: stripLeadingHeading(content),
      molecule: str(data.molecule) || undefined,
      interactive: str(data.interactive) || undefined,
    };
  };

  const getSlugs = (): string[] => getAll().map((item) => item.slug);

  return { getAll, getBySlug, getSlugs };
}
