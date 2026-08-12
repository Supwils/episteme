/**
 * Single enumeration of every prose article that has a real route, shared by
 * the generators that must not drift from each other (`gen-links`,
 * `gen-search-index`) and by the dev-time fallback in /api/search. A slug is
 * only emitted when the section it lives in is actually routable — an
 * `app/<domain>/<section>/[slug]/page.tsx` exists — so a generated URL can
 * never 404.
 *
 * SERVER AND BUILD ONLY. Reads `content/` and `app/` from `process.cwd()`; the
 * `app/` probe means this cannot run inside a deployed function, where the app
 * sources have been compiled away. Production reads the generated corpus.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { SKIP_FILES } from "../knowledge-base";
import { extractHeadings } from "./extract";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "content");
const APP = join(ROOT, "app");

const isDir = (p: string): boolean => existsSync(p) && statSync(p).isDirectory();
const isAsciiSlug = (s: string): boolean => /^[a-z][a-z0-9-]*$/.test(s);

export interface Article {
  domain: string;
  section: string;
  slug: string;
  url: string;
  title: string;
  /** English title from `title_en` / `titleEn` frontmatter; "" when absent. The
   *  search subtitle for engine-driven / frontier / math articles reads this
   *  directly, which is why those domains need no separate generated mirror. */
  titleEn: string;
  /** Raw markdown body, frontmatter removed. */
  body: string;
  /** Level 2–3 section headings, the topical signal the search index leans on. */
  headings: string[];
  /** Wiki-link keys that should resolve to this article (slug, plus aliases). */
  keys: string[];
  tags: string[];
  relations: string[];
}

const str = (value: unknown): string => (typeof value === "string" ? value : "");

const RELATION_KEYS = [
  "related",
  "relatedTheories",
  "relatedTheorists",
  "related_thinkers",
  "relatedPhenomena",
  "keyFigures",
  "key_figures",
] as const;

const stringList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "")
    : [];

function articleRelations(data: Record<string, unknown>): string[] {
  return [
    ...new Set(RELATION_KEYS.flatMap((key) => stringList(data[key]).map((ref) => ref.trim()))),
  ];
}

/** English title, tolerating both frontmatter spellings the content uses:
 *  `title_en` (1030 files) and `titleEn` (512 files). Reading only one drops the
 *  search subtitle for the other half — a real regression the mirror had. */
export const englishTitle = (data: Record<string, unknown>): string =>
  str(data.title_en) || str(data.titleEn);

/** Parse frontmatter, tolerating malformed YAML so one bad file can't crash the
 *  whole index (mirrors lib/content-utils.ts::safeParseMatter at runtime). */
function safeMatter(raw: string): { data: Record<string, unknown>; content: string } {
  try {
    const p = matter(raw);
    return { data: p.data as Record<string, unknown>, content: p.content };
  } catch {
    return { data: {}, content: raw.replace(/^---\n[\s\S]*?\n---\n?/, "") };
  }
}

/** Flat sections: content/<domain>/<section>/<ascii-slug>.(md|mdx) with a [slug] route. */
function collectFlatArticles(): Article[] {
  const out: Article[] = [];
  for (const domain of readdirSync(CONTENT)) {
    if (!isDir(join(CONTENT, domain))) continue;
    for (const section of readdirSync(join(CONTENT, domain))) {
      if (section === "knowledge-base") continue; // handled by collectKbArticles
      const sectionDir = join(CONTENT, domain, section);
      if (!isDir(sectionDir)) continue;
      if (!existsSync(join(APP, domain, section, "[slug]", "page.tsx"))) continue;

      for (const file of readdirSync(sectionDir)) {
        const m = file.match(/^(.+)\.(mdx|md)$/);
        if (!m) continue;
        const slug = m[1]!;
        if (!isAsciiSlug(slug)) continue;

        const parsed = safeMatter(readFileSync(join(sectionDir, file), "utf8"));
        const title = str(parsed.data.title) || slug;
        out.push({
          domain,
          section,
          slug,
          url: `/${domain}/${section}/${slug}`,
          title,
          titleEn: englishTitle(parsed.data),
          body: parsed.content,
          headings: extractHeadings(parsed.content),
          keys: [slug],
          tags: stringList(parsed.data.tags),
          relations: articleRelations(parsed.data),
        });
      }
    }
  }
  return out;
}

function walkMarkdown(dir: string, base = ""): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walkMarkdown(join(dir, e.name), rel));
    else if (
      (e.name.endsWith(".md") || e.name.endsWith(".mdx")) &&
      !e.name.endsWith(".narration.md")
    )
      out.push(rel);
  }
  return out;
}

/** Knowledge bases: nested .md (CJK-named, physics/cosmology/history/life) or
 *  flat .mdx (economics/psychology) served at a single [slug] route. The slug
 *  joins the path with `--` (matching lib/generic-kb.ts and the history loader).
 *  Keyed by full slug + bare file name for natural `[[名]]` links. */
function collectKbArticles(): Article[] {
  const out: Article[] = [];
  for (const domain of readdirSync(CONTENT)) {
    const kbDir = join(CONTENT, domain, "knowledge-base");
    if (!isDir(kbDir)) continue;
    const route = ["knowledge", "knowledge-base"].find((r) =>
      existsSync(join(APP, domain, r, "[slug]", "page.tsx"))
    );
    if (!route) continue;

    for (const rel of walkMarkdown(kbDir)) {
      // human-history keeps editorial meta-docs at the KB root; they have no
      // public route (lib/knowledge-base 404s them), so they must not enter
      // the search / wiki indexes either.
      if (domain === "human-history" && SKIP_FILES.has(rel.split("/").pop()!)) continue;
      const slug = rel.replace(/\.mdx?$/, "").replace(/\//g, "--");
      const bare = rel
        .replace(/\.mdx?$/, "")
        .split("/")
        .pop()!;
      const parsed = safeMatter(readFileSync(join(kbDir, rel), "utf8"));
      const title = str(parsed.data.title) || bare;
      out.push({
        domain,
        section: route,
        slug,
        url: `/${domain}/${route}/${slug}`,
        title,
        titleEn: englishTitle(parsed.data),
        body: parsed.content,
        headings: extractHeadings(parsed.content),
        keys: bare === slug ? [slug] : [slug, bare],
        tags: stringList(parsed.data.tags),
        relations: articleRelations(parsed.data),
      });
    }
  }
  return out;
}

export function collectArticles(): Article[] {
  return [...collectFlatArticles(), ...collectKbArticles()];
}
