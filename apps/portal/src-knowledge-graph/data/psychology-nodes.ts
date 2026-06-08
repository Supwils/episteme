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

function buildPsychologyGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const root = findMonorepoRoot();

  const theoristsData = readMdxFiles(path.join(root, 'content/psychology/theorists'));
  const experimentsData = readMdxFiles(path.join(root, 'content/psychology/experiments'));
  const phenomenaData = readMdxFiles(path.join(root, 'content/psychology/phenomena'));

  const theoristSlugToId = new Map<string, string>();
  const allSlugs = new Set<string>();
  for (const t of theoristsData) {
    allSlugs.add(t.slug);
    theoristSlugToId.set(t.slug, `psychology:${t.slug}`);
  }
  for (const e of experimentsData) {
    allSlugs.add(e.slug);
  }
  for (const p of phenomenaData) {
    allSlugs.add(p.slug);
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

  for (const t of theoristsData) {
    nodes.push({
      id: `psychology:${t.slug}`,
      label: t.frontmatter.title as string,
      domain: 'psychology',
      type: 'theorist',
      slug: t.slug,
      era: t.frontmatter.era as string | undefined,
      tags: (t.frontmatter.tags as string[]) ?? [],
      description: extractDescription(t.content),
    });
  }

  for (const e of experimentsData) {
    nodes.push({
      id: `psychology:${e.slug}`,
      label: e.frontmatter.title as string,
      domain: 'psychology',
      type: 'experiment',
      slug: e.slug,
      year: e.frontmatter.year as number | undefined,
      tags: (e.frontmatter.tags as string[]) ?? [],
      description: extractDescription(e.content),
    });
  }

  for (const p of phenomenaData) {
    nodes.push({
      id: `psychology:${p.slug}`,
      label: p.frontmatter.title as string,
      domain: 'psychology',
      type: 'phenomenon',
      slug: p.slug,
      tags: (p.frontmatter.tags as string[]) ?? [],
      description: extractDescription(p.content),
    });
  }

  for (const t of theoristsData) {
    const id = `psychology:${t.slug}`;
    for (const ref of (t.frontmatter.related as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(id, `psychology:${ref}`, 'cross-reference');
      }
    }
  }

  for (const e of experimentsData) {
    const expId = `psychology:${e.slug}`;
    for (const ref of (e.frontmatter.relatedTheorists as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(expId, `psychology:${ref}`, 'hierarchy', '研究者');
      }
    }
    for (const ref of (e.frontmatter.related as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(expId, `psychology:${ref}`, 'hierarchy', '研究者');
      }
    }
  }

  for (const p of phenomenaData) {
    const phenId = `psychology:${p.slug}`;
    for (const ref of (p.frontmatter.relatedTheorists as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(phenId, `psychology:${ref}`, 'cross-reference', '研究者');
      }
    }
    for (const ref of (p.frontmatter.relatedExperiments as string[]) ?? []) {
      if (allSlugs.has(ref)) {
        addEdge(phenId, `psychology:${ref}`, 'cross-reference', '相关实验');
      }
    }
  }

  const eraGroups = new Map<string, string[]>();
  for (const t of theoristsData) {
    const era = t.frontmatter.era as string | undefined;
    if (!era) continue;
    if (!eraGroups.has(era)) eraGroups.set(era, []);
    eraGroups.get(era)!.push(t.slug);
  }
  for (const slugs of eraGroups.values()) {
    slugs.sort();
    for (let i = 0; i < slugs.length - 1; i++) {
      addEdge(`psychology:${slugs[i]!}`, `psychology:${slugs[i + 1]!}`, 'temporal', '同时代');
    }
  }

  return { nodes, edges };
}

const graph = buildPsychologyGraph();
export const psychologyNodes: GraphNode[] = graph.nodes;
export const psychologyEdges: GraphEdge[] = graph.edges;
