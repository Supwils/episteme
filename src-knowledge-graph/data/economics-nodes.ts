import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { GraphNode, GraphEdge } from './types';

interface MdxEntry {
  slug: string;
  frontmatter: Record<string, unknown>;
  content: string;
}

function findMonorepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

function readMdxFiles(dir: string): MdxEntry[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ''), frontmatter: data, content };
    });
}

function extractDescription(content: string): string {
  const lines = content.split('\n');
  let desc = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (desc) break;
      continue;
    }
    if (trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('|')) continue;
    if (trimmed.startsWith('>')) continue;
    desc += (desc ? ' ' : '') + trimmed;
    if (desc.length > 200) break;
  }
  desc = desc.replace(/\*\*(.*?)\*\*/g, '$1');
  desc = desc.replace(/\*(.*?)\*/g, '$1');
  desc = desc.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  if (desc.length > 150) {
    desc = desc.slice(0, 147) + '...';
  }
  return desc;
}

function normalizeEdgeKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function buildEconomicsGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const root = findMonorepoRoot();

  const economistsData = readMdxFiles(path.join(root, 'content/economics/economists'));
  const theoriesData = readMdxFiles(path.join(root, 'content/economics/theories'));

  const economistSlugToId = new Map<string, string>();
  const allSlugs = new Set<string>();
  for (const e of economistsData) {
    allSlugs.add(e.slug);
    economistSlugToId.set(e.slug, `economics:${e.slug}`);
  }
  for (const t of theoriesData) {
    allSlugs.add(t.slug);
  }

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const seenEdges = new Set<string>();

  function addEdge(source: string, target: string, type: GraphEdge['type'], label?: string): void {
    if (source === target) return;
    const key = normalizeEdgeKey(source, target);
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    edges.push({ source, target, type, label });
  }

  for (const e of economistsData) {
    nodes.push({
      id: `economics:${e.slug}`,
      label: e.frontmatter.title as string,
      domain: 'economics',
      type: 'economist',
      slug: e.slug,
      era: e.frontmatter.era as string | undefined,
      tags: (e.frontmatter.tags as string[]) ?? [],
      description: extractDescription(e.content),
    });
  }

  for (const t of theoriesData) {
    nodes.push({
      id: `economics:${t.slug}`,
      label: t.frontmatter.title as string,
      domain: 'economics',
      type: 'theory',
      slug: t.slug,
      tags: (t.frontmatter.tags as string[]) ?? [],
      description: extractDescription(t.content),
    });
  }

  for (const e of economistsData) {
    const id = `economics:${e.slug}`;
    for (const ref of (e.frontmatter.related as string[]) ?? []) {
      if (economistSlugToId.has(ref)) {
        addEdge(id, `economics:${ref}`, 'cross-reference');
      }
    }
  }

  for (const t of theoriesData) {
    const theoryId = `economics:${t.slug}`;
    for (const ref of (t.frontmatter.relatedEconomists as string[]) ?? []) {
      if (economistSlugToId.has(ref)) {
        addEdge(theoryId, `economics:${ref}`, 'hierarchy', '理论贡献者');
      }
    }
  }

  const eraGroups = new Map<string, string[]>();
  for (const e of economistsData) {
    const era = e.frontmatter.era as string | undefined;
    if (!era) continue;
    if (!eraGroups.has(era)) eraGroups.set(era, []);
    eraGroups.get(era)!.push(e.slug);
  }
  for (const slugs of eraGroups.values()) {
    slugs.sort();
    for (let i = 0; i < slugs.length - 1; i++) {
      addEdge(`economics:${slugs[i]!}`, `economics:${slugs[i + 1]!}`, 'temporal', '同时代');
    }
  }

  return { nodes, edges };
}

const graph = buildEconomicsGraph();
export const economicsNodes: GraphNode[] = graph.nodes;
export const economicsEdges: GraphEdge[] = graph.edges;
