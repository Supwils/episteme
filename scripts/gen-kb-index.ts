import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { COSMOLOGY_KB_DATA } from "../content/cosmology/knowledge-base-data.ts";
import { UNIVERSE_PHYSICS_KB_DATA } from "../content/universe-physics/knowledge-base-data.ts";
import { writeFormattedTs } from "./format-ts";

/**
 * Knowledge-base search data mirrors the .md files for the client search index.
 * It used to be hand-edited — which doesn't scale when many agents add files in
 * parallel (they'd all fight over one .ts). This MERGE generator preserves every
 * existing entry verbatim and appends one entry per *new* file (derived from its
 * frontmatter + folder), so agents only drop .md files into category folders.
 *   pnpm gen-kb
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT = path.resolve(__dirname, "..", "content");

function walk(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else if (e.name.endsWith(".md") && !e.name.endsWith(".narration.md")) out.push(rel);
  }
  return out;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function firstHeading(content: string): string | null {
  const m = content.match(/^#\s+(.+)$/m);
  return m ? m[1]!.trim() : null;
}

function excerptOf(content: string, fm: Record<string, unknown>): string {
  if (Array.isArray(fm.tags) && fm.tags.length) {
    return (fm.tags as unknown[]).filter((t) => typeof t === "string").join("、");
  }
  const line = content
    .split("\n")
    .map((l) => l.trim())
    .find(
      (l) =>
        l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("|") && !l.startsWith("-")
    );
  const text = (line ?? "").replace(/[*_`#[\]]/g, "");
  return text.length > 90 ? text.slice(0, 90) + "…" : text;
}

interface Built {
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  excerpt: string;
}

function build(domain: string): Built[] {
  const root = path.join(CONTENT, domain, "knowledge-base");
  return walk(root).map((rel) => {
    const slug = rel.replace(/\.md$/, "").replace(/\//g, "--");
    const segments = rel.split("/");
    const { data, content } = matter(fs.readFileSync(path.join(root, rel), "utf-8"));
    const category = segments.length > 1 ? segments[0]! : str(data.category) || "专题";
    return {
      slug,
      title: str(data.title) || firstHeading(content) || path.basename(rel, ".md"),
      titleEn: str(data.title_en) || str(data.titleEn),
      category,
      excerpt: excerptOf(content, data as Record<string, unknown>),
    };
  });
}

function mergeCosmology(): string {
  const built = build("cosmology");
  const live = new Set(built.map((b) => b.slug));
  // Prune entries whose file was removed/renamed so search never links a 404.
  const existing = COSMOLOGY_KB_DATA.filter((e) => live.has(e.slug)).map((e) => ({ ...e }));
  const known = new Set(existing.map((e) => e.slug));
  const added: { slug: string; title: string; titleEn: string; category: string }[] = [];
  for (const b of built) {
    if (known.has(b.slug)) continue;
    known.add(b.slug);
    added.push({ slug: b.slug, title: b.title, titleEn: b.titleEn, category: b.category });
  }
  const rows = [...existing, ...added]
    .map(
      (e) =>
        `  { slug: ${JSON.stringify(e.slug)}, title: ${JSON.stringify(e.title)}, titleEn: ${JSON.stringify(e.titleEn)}, category: ${JSON.stringify(e.category)} },`
    )
    .join("\n");
  console.log(`cosmology KB: ${existing.length} existing + ${added.length} new`);
  return `// AUTO-GENERATED + merge-preserved by scripts/gen-kb-index.ts (pnpm gen-kb).
// Each slug MUST resolve to a real file under content/cosmology/knowledge-base/.
export const COSMOLOGY_KB_DATA = [
${rows}
];
`;
}

function mergePhysics(): string {
  const built = build("universe-physics");
  const live = new Set(built.map((b) => b.slug));
  const existing = UNIVERSE_PHYSICS_KB_DATA.filter((e) => live.has(e.slug)).map((e) => ({ ...e }));
  const known = new Set(existing.map((e) => e.slug));
  const added: { slug: string; title: string; category: string; excerpt: string }[] = [];
  for (const b of built) {
    if (known.has(b.slug)) continue;
    known.add(b.slug);
    added.push({ slug: b.slug, title: b.title, category: b.category, excerpt: b.excerpt });
  }
  const rows = [...existing, ...added]
    .map(
      (e) =>
        `  { slug: ${JSON.stringify(e.slug)}, title: ${JSON.stringify(e.title)}, category: ${JSON.stringify(e.category)}, excerpt: ${JSON.stringify(e.excerpt)} },`
    )
    .join("\n");
  console.log(`universe-physics KB: ${existing.length} existing + ${added.length} new`);
  return `// AUTO-GENERATED + merge-preserved by scripts/gen-kb-index.ts (pnpm gen-kb).
// Each slug MUST resolve to a real file under content/universe-physics/knowledge-base/.
export const UNIVERSE_PHYSICS_KB_DATA = [
${rows}
];
`;
}

async function main(): Promise<void> {
  await writeFormattedTs(
    path.join(CONTENT, "cosmology", "knowledge-base-data.ts"),
    mergeCosmology()
  );
  await writeFormattedTs(
    path.join(CONTENT, "universe-physics", "knowledge-base-data.ts"),
    mergePhysics()
  );
}

void main();
