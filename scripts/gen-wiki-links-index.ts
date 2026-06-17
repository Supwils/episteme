/**
 * Regenerates the two cross-reference indexes that bring the prose knowledge
 * web to life:
 *
 *   lib/wiki-link-index.ts — slug → URL, so inline `[[wiki-links]]` become
 *     clickable internal links (forward direction).
 *   lib/backlinks-index.ts — URL → the articles that link to it, so each page
 *     can show a "referenced by" panel (reverse direction).
 *
 * MarkdownRenderer / Backlinks are client components and can't read the
 * filesystem, so they consume these precomputed maps. We only emit a slug when
 * the section it lives in is actually routable (an
 * `app/<domain>/<section>/[slug]/page.tsx` exists), so a resolved link can
 * never 404. When the same slug exists in several domains (e.g. `justice`) the
 * forward value is a { domain: url } map and the reader's current domain wins.
 *
 * Knowledge bases (`content/<domain>/knowledge-base/**.md`, nested + CJK names,
 * served at /<domain>/knowledge or /<domain>/knowledge-base) are indexed too:
 * keyed by both the full `dir--dir--name` slug and the bare file name, so an
 * author can write `[[特奥蒂瓦坎]]`. A bare name shared by two files in the same
 * domain is dropped (a non-link chip beats a wrong link).
 *
 * Output is prettier-formatted so re-running is idempotent and commit-clean.
 *
 * Run: pnpm gen-links
 */
import { readdirSync, readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import prettier from "prettier";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "content");
const APP = join(ROOT, "app");
const OUT_LINKS = join(ROOT, "lib", "wiki-link-index.ts");
const OUT_BACKLINKS = join(ROOT, "lib", "backlinks-index.ts");

const isDir = (p: string): boolean => existsSync(p) && statSync(p).isDirectory();
const isAsciiSlug = (s: string): boolean => /^[a-z][a-z0-9-]*$/.test(s);

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

interface Article {
  domain: string;
  url: string;
  title: string;
  body: string;
  /** Wiki-link keys that should resolve to this article (slug, plus aliases). */
  keys: string[];
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
        const title = typeof parsed.data.title === "string" ? parsed.data.title : slug;
        out.push({
          domain,
          url: `/${domain}/${section}/${slug}`,
          title,
          body: parsed.content,
          keys: [slug],
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
      const slug = rel.replace(/\.mdx?$/, "").replace(/\//g, "--");
      const bare = rel
        .replace(/\.mdx?$/, "")
        .split("/")
        .pop()!;
      const parsed = safeMatter(readFileSync(join(kbDir, rel), "utf8"));
      const title = typeof parsed.data.title === "string" ? parsed.data.title : bare;
      out.push({
        domain,
        url: `/${domain}/${route}/${slug}`,
        title,
        body: parsed.content,
        keys: bare === slug ? [slug] : [slug, bare],
      });
    }
  }
  return out;
}

type Forward = Record<string, string | Record<string, string>>;

function buildForward(articles: Article[]): Forward {
  const byKey = new Map<string, Map<string, Set<string>>>(); // key → domain → urls
  for (const a of articles) {
    for (const key of a.keys) {
      const dm = byKey.get(key) ?? new Map<string, Set<string>>();
      const set = dm.get(a.domain) ?? new Set<string>();
      set.add(a.url);
      dm.set(a.domain, set);
      byKey.set(key, dm);
    }
  }

  const index: Forward = {};
  for (const [key, dm] of [...byKey.entries()].sort()) {
    // A key that maps to two different URLs within one domain is ambiguous
    // (e.g. a bare KB name reused in two folders) — skip it so it stays a chip.
    const domainUrl = new Map<string, string>();
    let ambiguous = false;
    for (const [domain, urls] of dm) {
      if (urls.size > 1) {
        ambiguous = true;
        break;
      }
      domainUrl.set(domain, [...urls][0]!);
    }
    if (ambiguous) continue;

    const urls = new Set(domainUrl.values());
    index[key] =
      urls.size === 1 ? [...urls][0]! : Object.fromEntries([...domainUrl.entries()].sort());
  }
  return index;
}

function resolve(forward: Forward, slug: string, domain: string): string | null {
  const e = forward[slug];
  if (!e) return null;
  if (typeof e === "string") return e;
  return e[domain] || Object.values(e)[0] || null;
}

const WIKI_RE = /\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/g;

function buildBacklinks(
  articles: Article[],
  forward: Forward
): Record<string, { url: string; title: string }[]> {
  const back = new Map<string, Map<string, string>>(); // targetUrl → (sourceUrl → title)
  for (const a of articles) {
    const seen = new Set<string>();
    for (const m of a.body.matchAll(WIKI_RE)) {
      const ref = m[1]!.trim();
      const target = resolve(forward, ref, a.domain);
      if (!target || target === a.url || seen.has(target)) continue;
      seen.add(target);
      const sources = back.get(target) ?? new Map<string, string>();
      sources.set(a.url, a.title);
      back.set(target, sources);
    }
  }
  const index: Record<string, { url: string; title: string }[]> = {};
  for (const [target, sources] of [...back.entries()].sort()) {
    index[target] = [...sources.entries()]
      .map(([url, title]) => ({ url, title }))
      .sort((x, y) => x.title.localeCompare(y.title, "zh"));
  }
  return index;
}

async function emit(file: string, body: string): Promise<void> {
  writeFileSync(file, await prettier.format(body, { parser: "typescript" }));
}

async function main(): Promise<void> {
  const articles = [...collectFlatArticles(), ...collectKbArticles()];
  const forward = buildForward(articles);
  const backlinks = buildBacklinks(articles, forward);

  await emit(
    OUT_LINKS,
    `// AUTO-GENERATED by scripts/gen-wiki-links-index.ts — do not edit by hand.
// Run \`pnpm gen-links\` to regenerate. Maps a wiki-link slug to its article
// URL; a { domain: url } value means the slug is routable in several domains.

export type WikiLinkTarget = string | Record<string, string>;

export const WIKI_LINK_INDEX: Record<string, WikiLinkTarget> = ${JSON.stringify(forward, null, 2)};

/** Resolve a \`[[slug]]\` to a URL, preferring the reader's current domain. */
export function resolveWikiLink(slug: string, domain?: string): string | null {
  const entry = WIKI_LINK_INDEX[slug];
  if (!entry) return null;
  if (typeof entry === "string") return entry;
  return (domain && entry[domain]) || Object.values(entry)[0] || null;
}
`
  );

  await emit(
    OUT_BACKLINKS,
    `// AUTO-GENERATED by scripts/gen-wiki-links-index.ts — do not edit by hand.
// Run \`pnpm gen-links\` to regenerate. Maps an article URL to the articles that
// reference it through inline \`[[wiki-links]]\` (the reverse of wiki-link-index).

export interface Backlink {
  url: string;
  title: string;
}

export const BACKLINKS_INDEX: Record<string, Backlink[]> = ${JSON.stringify(backlinks, null, 2)};

export function getBacklinks(url: string): Backlink[] {
  return BACKLINKS_INDEX[url] ?? [];
}
`
  );

  const collisions = Object.values(forward).filter((v) => typeof v !== "string").length;
  const targets = Object.keys(backlinks).length;
  const edges = Object.values(backlinks).reduce((n, list) => n + list.length, 0);
  console.log(
    `✅ wiki-links: ${Object.keys(forward).length} slugs (${collisions} multi-domain); ` +
      `backlinks: ${targets} targets, ${edges} edges`
  );
}

void main();
