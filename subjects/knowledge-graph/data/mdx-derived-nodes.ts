import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { GraphEdge, GraphNode, GraphNodeType } from "./types";

/**
 * Graph nodes derived from MDX frontmatter for computer-science and psychology.
 *
 * Both domains grew far faster than their hand-curated node lists: 120 of 179
 * computer-science articles and 59 of 219 psychology articles had no node at
 * all, which made them invisible to learning paths, frontier recommendations
 * and every graph-driven surface — despite being finished, cross-linked content.
 * Hand-authoring 179 entries would have closed the gap once and reopened it with
 * the next content round.
 *
 * This module follows the philosophy-nodes.ts precedent instead: read the
 * articles at load time and derive the node from what the frontmatter already
 * states. New articles join the graph the moment they are written.
 *
 * Curated nodes win. Anything already defined in computer-science-nodes.ts,
 * computer-science-coverage.ts, psychology-nodes.ts or psychology-methods-nodes.ts
 * keeps its hand-written description, level and prerequisites; this module only
 * fills the holes (duplicate ids fail graph-integrity.test.ts).
 */

const DERIVED_DOMAINS = ["computer-science", "psychology"] as const;

/** Section → node type. The type drives the inferred knowledge level in
 *  cognitive-metadata.ts, so pioneers/theorists must stay in the level-1 set:
 *  they are what anchors the rest of each domain to an entry point. */
const TYPE_BY_SECTION: Record<string, GraphNodeType> = {
  algorithms: "algorithm",
  concepts: "concept",
  theory: "theory",
  pioneers: "pioneer",
  frontier: "concept",
  theorists: "theorist",
  experiments: "experiment",
  phenomena: "phenomenon",
  disorders: "disease",
  schools: "school",
  debates: "question",
  dialogues: "question",
  methods: "concept",
  "knowledge-base": "concept",
};

/** Frontmatter keys that point at other articles. The content uses several
 *  spellings across domains and sections; reading only one drops most edges. */
const RELATION_KEYS = [
  "related",
  "relatedTheorists",
  "related_thinkers",
  "relatedPhenomena",
  "keyFigures",
  "key_figures",
] as const;

/**
 * Where a derived node hangs when its own `related` list points only sideways.
 *
 * cognitive-metadata.ts only accepts a prerequisite that is a graph neighbour AND
 * strictly lower level, so a cluster of same-section articles that cite each
 * other ends up with no prerequisites at all — 112 nodes did on the first run.
 * That breaks the learning-path invariant (every node above L1 must be
 * reachable from an entry point), which is why the same defect has been patched
 * by hand in five previous rounds.
 *
 * The rank table mirrors the level inference in cognitive-metadata.ts; the
 * anchors below it are genuine prerequisites, not filler: algorithms do build on
 * data structures, and both domains have a real entry concept.
 */
const SECTION_RANK: Record<string, number> = {
  pioneers: 1,
  theorists: 1,
  concepts: 2,
  "knowledge-base": 2,
  schools: 2,
  phenomena: 2,
  debates: 2,
  dialogues: 2,
  algorithms: 3,
  theory: 3,
  disorders: 3,
  experiments: 4,
  methods: 4,
  frontier: 5,
};

const DOMAIN_ENTRY: Record<string, string> = {
  "computer-science": "computer-science:abstraction",
  psychology: "psychology:behavior-mind-evidence",
};

const SECTION_ANCHOR: Record<string, string> = {
  "computer-science/algorithms": "computer-science:data-structures",
};

const rankOf = (section: string): number => SECTION_RANK[section] ?? 2;

function anchorFor(domain: string, section: string): string | null {
  return SECTION_ANCHOR[`${domain}/${section}`] ?? DOMAIN_ENTRY[domain] ?? null;
}

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, "content")) && fs.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

function extractDescription(content: string): string {
  let desc = "";
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (desc) break;
      continue;
    }
    if (/^(#|---|\||>|!\[|:::)/.test(trimmed)) continue;
    desc += (desc ? " " : "") + trimmed;
    if (desc.length > 160) break;
  }
  desc = desc
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .trim();
  return desc.length > 160 ? `${desc.slice(0, 158)}…` : desc;
}

interface DerivedArticle {
  domain: string;
  section: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  relations: string[];
}

function readDomainArticles(root: string, domain: string): DerivedArticle[] {
  const domainDir = path.join(root, "content", domain);
  if (!fs.existsSync(domainDir)) return [];

  const articles: DerivedArticle[] = [];
  for (const entry of fs.readdirSync(domainDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const section = entry.name;
    const sectionDir = path.join(domainDir, section);
    for (const file of fs.readdirSync(sectionDir)) {
      if (!/\.mdx?$/.test(file) || file.endsWith(".narration.md")) continue;
      const parsed = matter(fs.readFileSync(path.join(sectionDir, file), "utf-8"));
      const fm = parsed.data as Record<string, unknown>;
      if (fm.status && fm.status !== "published") continue;

      const relations = new Set<string>();
      for (const key of RELATION_KEYS) {
        const value = fm[key];
        if (!Array.isArray(value)) continue;
        for (const ref of value)
          if (typeof ref === "string" && ref.trim()) relations.add(ref.trim());
      }

      articles.push({
        domain,
        section,
        slug: file.replace(/\.mdx?$/, ""),
        title: typeof fm.title === "string" ? fm.title : file.replace(/\.mdx?$/, ""),
        description: extractDescription(parsed.content),
        tags: Array.isArray(fm.tags)
          ? fm.tags.filter((t): t is string => typeof t === "string").slice(0, 4)
          : [],
        relations: [...relations],
      });
    }
  }
  return articles;
}

function build(): { nodes: GraphNode[]; edges: GraphEdge[]; bySlug: Map<string, string> } {
  const root = findRepoRoot();
  const nodes: GraphNode[] = [];
  const bySlug = new Map<string, string>();

  for (const domain of DERIVED_DOMAINS) {
    for (const article of readDomainArticles(root, domain)) {
      const id = `${domain}:${article.slug}`;
      if (bySlug.has(article.slug)) continue;
      bySlug.set(article.slug, id);
      nodes.push({
        id,
        label: article.title,
        domain,
        type: TYPE_BY_SECTION[article.section] ?? "concept",
        slug: article.slug,
        section: article.section,
        url: `/${domain}/${article.section}/${article.slug}`,
        description: article.description,
        tags: article.tags,
      });
    }
  }

  const sectionBySlug = new Map<string, string>();
  for (const node of nodes) sectionBySlug.set(node.slug, node.section ?? "");

  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  const addEdge = (source: string, target: string, label: string) => {
    if (!target || target === source) return;
    const key = source < target ? `${source}|${target}` : `${target}|${source}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ source, target, type: "cross-reference", label });
  };

  for (const domain of DERIVED_DOMAINS) {
    for (const article of readDomainArticles(root, domain)) {
      const source = `${domain}:${article.slug}`;
      const rank = rankOf(article.section);
      let hasLowerNeighbour = false;
      for (const ref of article.relations) {
        const target = bySlug.get(ref);
        if (!target || target === source) continue;
        if (rankOf(sectionBySlug.get(ref) ?? "") < rank) hasLowerNeighbour = true;
        addEdge(source, target, "相关条目");
      }
      if (!hasLowerNeighbour && rank > 1) {
        const anchor = anchorFor(domain, article.section);
        if (anchor && anchor !== source) addEdge(source, anchor, "前置基础");
      }
    }
  }

  return { nodes, edges, bySlug };
}

const derived = build();

/** Every slug either domain publishes, mapped to its node id — used by
 *  graph-data.ts to drop the derived duplicates of curated nodes. */
export const MDX_DERIVED_SLUG_IDS = derived.bySlug;
export const MDX_DERIVED_NODES: GraphNode[] = derived.nodes;
export const MDX_DERIVED_EDGES: GraphEdge[] = derived.edges;
