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
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import prettier from "prettier";
import { collectArticles, type Article } from "../lib/search/articles";

const ROOT = process.cwd();
const OUT_LINKS = join(ROOT, "lib", "wiki-link-index.ts");
const OUT_BACKLINKS = join(ROOT, "lib", "backlinks-index.ts");
// Static asset, lazy-fetched on first wiki-link hover — never enters any page
// bundle. Maps an article URL to a compact { t:title, e:excerpt, d:domain }
// so a reader can preview where a `[[link]]` goes without losing their place.
const OUT_PREVIEWS = join(ROOT, "public", "link-previews.json");

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

/** Markdown links pointing at an internal route. Two citation syntaxes coexist
 *  in the corpus: `[[measure-theory]]` and `[测度论](/mathematics/concepts/
 *  measure-theory)`. Only the first used to produce a backlink, so an article
 *  cited the second way never learned it was referenced — mathematics writes
 *  its cross-domain sections almost entirely in markdown links, and every one
 *  of those edges was invisible to the reverse index and to the graph.
 *  Resolution goes through the real article URL set, which is also what keeps
 *  images (`![x](/a.png)`) and non-article routes out. */
const MD_LINK_RE = /\[[^\]]*\]\((\/[^)\s#]+)(?:#[^)\s]*)?\)/g;

/** Trailing slashes and anchors are authoring noise, not distinct targets. */
function canonicalUrl(url: string): string {
  return url.length > 1 && url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildBacklinks(
  articles: Article[],
  forward: Forward
): Record<string, { url: string; title: string }[]> {
  const back = new Map<string, Map<string, string>>(); // targetUrl → (sourceUrl → title)
  const articleUrls = new Set(articles.map((a) => canonicalUrl(a.url)));

  for (const a of articles) {
    const seen = new Set<string>();
    const record = (raw: string | null): void => {
      if (!raw) return;
      const target = canonicalUrl(raw);
      if (target === canonicalUrl(a.url) || seen.has(target)) return;
      seen.add(target);
      const sources = back.get(target) ?? new Map<string, string>();
      sources.set(a.url, a.title);
      back.set(target, sources);
    };

    for (const m of a.body.matchAll(WIKI_RE)) {
      record(resolve(forward, m[1]!.trim(), a.domain));
    }
    for (const m of a.body.matchAll(MD_LINK_RE)) {
      if (articleUrls.has(canonicalUrl(m[1]!))) record(m[1]!);
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
  const config = await prettier.resolveConfig(file);
  writeFileSync(file, await prettier.format(body, { ...config, parser: "typescript" }));
}

/** First substantial prose sentence of a body, stripped of markdown, for a
 *  hover preview. Skips headings, lists, tables, quotes and code. */
function excerpt(body: string): string {
  for (const raw of body.split("\n")) {
    const t = raw.trim();
    if (!t || /^[#>\-*|`:]/.test(t) || /^\d+\.\s/.test(t)) continue;
    const s = t
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\$\$?([^$]*)\$\$?/g, "$1")
      .trim();
    if (s.length < 12) continue;
    return s.length > 96 ? s.slice(0, 96) + "…" : s;
  }
  return "";
}

function buildPreviews(articles: Article[]): Record<string, { t: string; e: string; d: string }> {
  const out: Record<string, { t: string; e: string; d: string }> = {};
  for (const a of articles) {
    if (out[a.url]) continue;
    out[a.url] = { t: a.title, e: excerpt(a.body), d: a.domain };
  }
  return out;
}

async function main(): Promise<void> {
  const articles = collectArticles();
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

  const previews = buildPreviews(articles);
  const previewConfig = await prettier.resolveConfig(OUT_PREVIEWS);
  writeFileSync(
    OUT_PREVIEWS,
    await prettier.format(JSON.stringify(previews), { ...previewConfig, parser: "json" })
  );

  const collisions = Object.values(forward).filter((v) => typeof v !== "string").length;
  const targets = Object.keys(backlinks).length;
  const edges = Object.values(backlinks).reduce((n, list) => n + list.length, 0);
  console.log(
    `✅ wiki-links: ${Object.keys(forward).length} slugs (${collisions} multi-domain); ` +
      `backlinks: ${targets} targets, ${edges} edges; ` +
      `previews: ${Object.keys(previews).length} articles`
  );
}

void main();
