import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { collectArticles, type Article } from "@/lib/search/articles";
import type { GraphEdge, GraphNode } from "./types";
import {
  DERIVED_DOMAINS,
  DOMAIN_DEFAULT_NODE_TYPE,
  SECTION_ANCHOR_OVERRIDES,
  SECTION_KNOWLEDGE_LEVEL,
  SECTION_NODE_TYPE,
  type DerivedDomain,
} from "./derived-node-taxonomy";

/**
 * Graph nodes derived from article frontmatter.
 *
 * Hand-curated node lists never keep up with a domain that is still being
 * written: a 2026-08 census found 573 finished, cross-linked articles with no
 * node at all, which makes them invisible to learning paths, recommendations and
 * every other graph-driven surface. Closing that by hand would close it once and
 * reopen it with the next content round.
 *
 * This module reads the articles instead and derives the node from what the
 * frontmatter already states, so a new article joins the graph the moment it is
 * written. Curated nodes win on every field — graph-data drops any derived node
 * whose id or URL a curated node already claims.
 */

interface DerivedArticle {
  domain: DerivedDomain;
  section: string;
  routeSection: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  relations: string[];
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

function readArticles(allArticles: readonly Article[], domain: DerivedDomain): DerivedArticle[] {
  const sections = new Set(domain.sections);
  return allArticles
    .filter((article) => article.domain === domain.contentDirectory)
    .map((article) => ({
      article,
      contentSection: domain.routeSectionAliases?.[article.section] ?? article.section,
    }))
    .filter(({ contentSection }) => sections.has(contentSection))
    .map(({ article, contentSection }) => ({
      domain,
      section: contentSection,
      routeSection: article.section,
      slug: article.slug,
      url: article.url,
      title: article.title,
      description: extractDescription(article.body),
      tags: article.tags.slice(0, 4),
      relations: article.relations,
    }));
}

function nodeTypeFor(article: DerivedArticle): GraphNode["type"] {
  return (
    SECTION_NODE_TYPE[article.section] ??
    DOMAIN_DEFAULT_NODE_TYPE[article.domain.contentDirectory] ??
    "concept"
  );
}

function levelFor(section: string): KnowledgeLevel {
  return SECTION_KNOWLEDGE_LEVEL[section] ?? 2;
}

function anchorFor(article: DerivedArticle): string | null {
  return (
    SECTION_ANCHOR_OVERRIDES[`${article.domain.contentDirectory}/${article.section}`] ??
    article.domain.entryNodeId
  );
}

function toNode(article: DerivedArticle, id: string): GraphNode {
  return {
    id,
    label: article.title,
    domain: article.domain.graphDomain,
    type: nodeTypeFor(article),
    slug: article.slug,
    section: article.section,
    url: article.url,
    description: article.description,
    tags: article.tags,
    knowledgeLevel: levelFor(article.section),
  };
}

/**
 * Slug → node ids. A slug is only unique inside a domain — `evolution` and
 * `emotions` exist in several — so a relation resolves to its own domain first
 * and to another domain only when exactly one article claims that slug.
 */
function resolveRelation(
  ref: string,
  fromDomain: string,
  idsBySlug: ReadonlyMap<string, string[]>
): string | null {
  const candidates = idsBySlug.get(ref);
  if (!candidates || candidates.length === 0) return null;
  const sameDomain = candidates.find((id) => id.startsWith(`${fromDomain}:`));
  if (sameDomain) return sameDomain;
  return candidates.length === 1 ? (candidates[0] ?? null) : null;
}

/** Union-find over derived node ids, used to spot clusters that never reach a
 *  curated anchor. */
class NodeGrouping {
  private readonly parent = new Map<string, string>();

  rootOf(id: string): string {
    const parent = this.parent.get(id);
    if (parent === undefined) {
      this.parent.set(id, id);
      return id;
    }
    if (parent === id) return id;
    const root = this.rootOf(parent);
    this.parent.set(id, root);
    return root;
  }

  join(left: string, right: string): void {
    const leftRoot = this.rootOf(left);
    const rightRoot = this.rootOf(right);
    if (leftRoot !== rightRoot) this.parent.set(rightRoot, leftRoot);
  }
}

function build(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const allArticles = collectArticles();
  const articles = DERIVED_DOMAINS.flatMap((domain) => readArticles(allArticles, domain));

  const nodes: GraphNode[] = [];
  const idByArticle = new Map<DerivedArticle, string>();
  const idsBySlug = new Map<string, string[]>();
  const claimed = new Set<string>();

  for (const article of articles) {
    const namespace = ["knowledge", "knowledge-base"].includes(article.routeSection) ? "kb:" : "";
    const id = `${article.domain.idPrefix}:${namespace}${article.slug}`;
    if (claimed.has(id)) continue;
    claimed.add(id);
    idByArticle.set(article, id);
    nodes.push(toNode(article, id));
    idsBySlug.set(article.slug, [...(idsBySlug.get(article.slug) ?? []), id]);
  }

  const levelById = new Map(nodes.map((node) => [node.id, node.knowledgeLevel ?? 2]));

  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  const addEdge = (source: string, target: string, label: string) => {
    if (!target || target === source) return;
    const key = source < target ? `${source}|${target}` : `${target}|${source}`;
    if (seen.has(key)) return;
    seen.add(key);
    // A frontmatter relation may name an article in another domain, and the graph
    // renders those differently — typing them all as same-domain would hide the
    // cross-domain connections the content was written to make.
    const sameDomain = source.split(":")[0] === target.split(":")[0];
    edges.push({ source, target, type: sameDomain ? "cross-reference" : "domain-link", label });
  };

  const grouping = new NodeGrouping();
  const anchoredIds = new Set<string>();

  for (const article of articles) {
    const source = idByArticle.get(article);
    if (!source) continue;
    const level = levelFor(article.section);
    let hasLowerNeighbour = false;

    for (const ref of article.relations) {
      const target = resolveRelation(ref, article.domain.idPrefix, idsBySlug);
      if (!target || target === source) continue;
      if ((levelById.get(target) ?? level) < level) hasLowerNeighbour = true;
      addEdge(source, target, "相关条目");
      grouping.join(source, target);
    }

    if (!hasLowerNeighbour && level > 1) {
      const anchor = anchorFor(article);
      if (anchor && anchor !== source) {
        addEdge(source, anchor, "前置基础");
        anchoredIds.add(source);
      }
    }
  }

  // Every node has to reach a curated learning-path node, or the branch catalog
  // refuses to build. The prerequisite rule above grounds anything above L1 that
  // cites only sideways, but an L1 article — a species, a figure, a dated event —
  // has nothing below it to anchor to, and a cluster of such articles citing only
  // each other stays adrift. One edge per adrift cluster is enough to reach the
  // domain. Clusters are read after every relation is in, because a group's root
  // moves as it merges.
  const groundedRoots = new Set([...anchoredIds].map((id) => grouping.rootOf(id)));
  for (const article of articles) {
    const id = idByArticle.get(article);
    if (!id) continue;
    const root = grouping.rootOf(id);
    if (groundedRoots.has(root)) continue;
    const anchor = anchorFor(article);
    if (!anchor || anchor === id) continue;
    addEdge(id, anchor, "领域入口");
    groundedRoots.add(root);
  }

  return { nodes, edges };
}

const derived = build();

export const MDX_DERIVED_NODES: GraphNode[] = derived.nodes;
export const MDX_DERIVED_EDGES: GraphEdge[] = derived.edges;
