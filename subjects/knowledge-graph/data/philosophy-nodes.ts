import path from "node:path";
import { readContentEntries } from "@/lib/content-article";
import { getDomainContentDir } from "@/lib/content-paths";
import type { GraphNode, GraphEdge } from "./types";

type PhilosophyNodeSource = "school" | "concept" | "ism";

// A few legacy articles describe the same philosophical object under multiple
// editorial sections. The graph represents each object once, while still
// collecting relationships contributed by every source article below.
//
// 2026-07-26: the duplicate *files* were disambiguated so the bare wiki-link key
// resolves again — the concept/ism copies became `philosophy-of-mind-overview` /
// `utilitarianism-doctrine`, leaving the school articles named after the bare
// slug that this table designates canonical. Keep this map in sync with whichever
// section owns the bare slug, or the canonical node disappears and curated edges
// targeting it fail at load time (guarded by graph-integrity.test.ts).
const PHILOSOPHY_CANONICAL_NODE_SOURCES: Partial<Record<string, PhilosophyNodeSource>> = {
  "buddhism-philosophy": "school",
  epicureanism: "school",
  idealism: "school",
  "philosophy-of-mind": "school",
  skepticism: "school",
  utilitarianism: "school",
};

function isCanonicalNodeSource(slug: string, source: PhilosophyNodeSource): boolean {
  const canonicalSource = PHILOSOPHY_CANONICAL_NODE_SOURCES[slug];
  return !canonicalSource || canonicalSource === source;
}

function extractDescription(content: string): string {
  const lines = content.split("\n");
  let desc = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (desc) break;
      continue;
    }
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("---")) continue;
    if (trimmed.startsWith("|")) continue;
    if (trimmed.startsWith(">")) continue;
    desc += (desc ? " " : "") + trimmed;
    if (desc.length > 200) break;
  }
  desc = desc.replace(/\*\*(.*?)\*\*/g, "$1");
  desc = desc.replace(/\*(.*?)\*/g, "$1");
  desc = desc.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  if (desc.length > 150) {
    desc = desc.slice(0, 147) + "...";
  }
  return desc;
}

function resolveToSlug(
  name: string,
  allSlugs: Set<string>,
  thinkerTitleToSlug: Map<string, string>
): string | null {
  if (allSlugs.has(name)) return name;
  return thinkerTitleToSlug.get(name) ?? null;
}

function normalizeEdgeKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

// ---- Build ----

function buildPhilosophyGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const philosophyDir = getDomainContentDir("philosophy");
  const thinkersData = readContentEntries(path.join(philosophyDir, "thinkers"));
  const schoolsData = readContentEntries(path.join(philosophyDir, "schools"));
  const conceptsData = readContentEntries(path.join(philosophyDir, "concepts"));
  const experimentsData = readContentEntries(path.join(philosophyDir, "experiments"));
  const questionsData = readContentEntries(path.join(philosophyDir, "questions"));
  const ismsData = readContentEntries(path.join(philosophyDir, "isms"));
  const dialoguesData = readContentEntries(path.join(philosophyDir, "dialogues"));

  // ---- Lookup Maps ----

  const thinkerTitleToSlug = new Map<string, string>();
  for (const t of thinkersData) {
    if (!t.slug.endsWith("-extended")) {
      thinkerTitleToSlug.set(t.frontmatter.title as string, t.slug);
    }
  }

  const schoolTitleToSlug = new Map<string, string>();
  for (const s of schoolsData) {
    schoolTitleToSlug.set(s.frontmatter.title as string, s.slug);
  }

  const ismTitleToSlug = new Map<string, string>();
  for (const i of ismsData) {
    ismTitleToSlug.set(i.frontmatter.title as string, i.slug);
  }

  const allSlugs = new Set<string>();
  for (const t of thinkersData) {
    if (!t.slug.endsWith("-extended")) allSlugs.add(t.slug);
  }
  for (const s of schoolsData) allSlugs.add(s.slug);
  for (const c of conceptsData) allSlugs.add(c.slug);
  for (const e of experimentsData) allSlugs.add(e.slug);
  for (const q of questionsData) allSlugs.add(q.slug);
  for (const i of ismsData) allSlugs.add(i.slug);

  // ---- Build Nodes ----

  const nodes: GraphNode[] = [];

  for (const t of thinkersData) {
    if (t.slug.endsWith("-extended")) continue;
    nodes.push({
      id: `philosophy:${t.slug}`,
      label: t.frontmatter.title as string,
      domain: "philosophy",
      type: "thinker",
      slug: t.slug,
      era: t.frontmatter.era as string | undefined,
      tags: (t.frontmatter.tags as string[]) ?? [],
      description: extractDescription(t.content),
    });
  }

  for (const s of schoolsData) {
    if (!isCanonicalNodeSource(s.slug, "school")) continue;
    nodes.push({
      id: `philosophy:${s.slug}`,
      label: s.frontmatter.title as string,
      domain: "philosophy",
      type: "school",
      slug: s.slug,
      era: s.frontmatter.era as string | undefined,
      tags: (s.frontmatter.tags as string[]) ?? [],
      description: extractDescription(s.content),
    });
  }

  for (const c of conceptsData) {
    if (!isCanonicalNodeSource(c.slug, "concept")) continue;
    nodes.push({
      id: `philosophy:${c.slug}`,
      label: c.frontmatter.title as string,
      domain: "philosophy",
      type: "concept",
      slug: c.slug,
      tags: (c.frontmatter.tags as string[]) ?? [],
      description: extractDescription(c.content),
    });
  }

  for (const e of experimentsData) {
    nodes.push({
      id: `philosophy:${e.slug}`,
      label: e.frontmatter.title as string,
      domain: "philosophy",
      type: "experiment",
      slug: e.slug,
      tags: (e.frontmatter.tags as string[]) ?? [],
      description: extractDescription(e.content),
    });
  }

  for (const q of questionsData) {
    nodes.push({
      id: `philosophy:${q.slug}`,
      label: q.frontmatter.title as string,
      domain: "philosophy",
      type: "question",
      slug: q.slug,
      tags: (q.frontmatter.tags as string[]) ?? [],
      description: extractDescription(q.content),
    });
  }

  for (const i of ismsData) {
    if (!isCanonicalNodeSource(i.slug, "ism")) continue;
    nodes.push({
      id: `philosophy:${i.slug}`,
      label: i.frontmatter.title as string,
      domain: "philosophy",
      type: "ism",
      slug: i.slug,
      tags: (i.frontmatter.tags as string[]) ?? [],
      description: extractDescription(i.content),
    });
  }

  // ---- Build Edges ----

  const edges: GraphEdge[] = [];
  const seenEdges = new Set<string>();

  function addEdge(source: string, target: string, type: GraphEdge["type"], label?: string): void {
    if (source === target) return;
    const key = normalizeEdgeKey(source, target);
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    edges.push({ source, target, type, label });
  }

  function resolveAndAdd(
    fromId: string,
    ref: string,
    type: GraphEdge["type"],
    label?: string
  ): void {
    const slug = resolveToSlug(ref, allSlugs, thinkerTitleToSlug);
    if (slug) {
      addEdge(fromId, `philosophy:${slug}`, type, label);
    }
  }

  // Cross-reference: thinkers' related
  for (const t of thinkersData) {
    if (t.slug.endsWith("-extended")) continue;
    const id = `philosophy:${t.slug}`;
    for (const ref of (t.frontmatter.related as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
  }

  // Cross-reference: schools' related_thinkers + related + key_figures
  for (const s of schoolsData) {
    const id = `philosophy:${s.slug}`;
    for (const ref of (s.frontmatter.related_thinkers as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
    for (const ref of (s.frontmatter.related as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
    for (const ref of (s.frontmatter.key_figures as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
  }

  // Cross-reference: concepts' key_figures
  for (const c of conceptsData) {
    const id = `philosophy:${c.slug}`;
    for (const ref of (c.frontmatter.key_figures as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
  }

  // Cross-reference: experiments' related_thinkers
  for (const e of experimentsData) {
    const id = `philosophy:${e.slug}`;
    for (const ref of (e.frontmatter.related_thinkers as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
  }

  // Cross-reference: questions' key_figures + related_thinkers
  for (const q of questionsData) {
    const id = `philosophy:${q.slug}`;
    for (const ref of (q.frontmatter.key_figures as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
    for (const ref of (q.frontmatter.related_thinkers as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
  }

  // Cross-reference: isms' key_figures + opposing
  for (const i of ismsData) {
    const id = `philosophy:${i.slug}`;
    for (const ref of (i.frontmatter.key_figures as string[]) ?? []) {
      resolveAndAdd(id, ref, "cross-reference");
    }
    for (const ref of (i.frontmatter.opposing as string[]) ?? []) {
      const ismSlug = ismTitleToSlug.get(ref);
      if (ismSlug) {
        addEdge(id, `philosophy:${ismSlug}`, "cross-reference", "对立");
      }
    }
  }

  // Hierarchy: school → thinker (from schools' related_thinkers)
  for (const s of schoolsData) {
    const schoolId = `philosophy:${s.slug}`;
    for (const ref of (s.frontmatter.related_thinkers as string[]) ?? []) {
      const slug = resolveToSlug(ref, allSlugs, thinkerTitleToSlug);
      if (slug && thinkersData.some((t) => t.slug === slug)) {
        addEdge(schoolId, `philosophy:${slug}`, "hierarchy");
      }
    }
  }

  // Hierarchy: school → thinker (from schools' key_figures — Chinese names)
  for (const s of schoolsData) {
    const schoolId = `philosophy:${s.slug}`;
    for (const ref of (s.frontmatter.key_figures as string[]) ?? []) {
      const slug = thinkerTitleToSlug.get(ref);
      if (slug) {
        addEdge(schoolId, `philosophy:${slug}`, "hierarchy");
      }
    }
  }

  // Hierarchy: thinker → school (from thinkers' school field)
  for (const t of thinkersData) {
    if (t.slug.endsWith("-extended")) continue;
    const thinkerId = `philosophy:${t.slug}`;
    const schoolField = t.frontmatter.school as string | undefined;
    if (!schoolField) continue;
    const parts = schoolField.split(/\s*\/\s*/);
    for (const part of parts) {
      const trimmed = part.trim();
      if (schoolTitleToSlug.has(trimmed)) {
        addEdge(thinkerId, `philosophy:${schoolTitleToSlug.get(trimmed)!}`, "hierarchy");
        continue;
      }
      for (const [title, slug] of schoolTitleToSlug) {
        if (title.includes(trimmed) || trimmed.includes(title)) {
          addEdge(thinkerId, `philosophy:${slug}`, "hierarchy");
          break;
        }
      }
    }
  }

  // Temporal: chain thinkers in the same era
  const eraGroups = new Map<string, string[]>();
  for (const t of thinkersData) {
    if (t.slug.endsWith("-extended")) continue;
    const era = t.frontmatter.era as string | undefined;
    if (!era) continue;
    if (!eraGroups.has(era)) eraGroups.set(era, []);
    eraGroups.get(era)!.push(t.slug);
  }
  for (const slugs of eraGroups.values()) {
    slugs.sort();
    for (let i = 0; i < slugs.length - 1; i++) {
      addEdge(`philosophy:${slugs[i]!}`, `philosophy:${slugs[i + 1]!}`, "temporal", "同时代");
    }
  }

  // Dialogue: connect participants to each other
  for (const d of dialoguesData) {
    const participants = (d.frontmatter.participants as string[]) ?? [];
    const resolved: string[] = [];
    for (const p of participants) {
      const slug = resolveToSlug(p, allSlugs, thinkerTitleToSlug);
      if (slug) resolved.push(`philosophy:${slug}`);
    }
    for (let i = 0; i < resolved.length; i++) {
      for (let j = i + 1; j < resolved.length; j++) {
        addEdge(resolved[i]!, resolved[j]!, "cross-reference", "对话参与者");
      }
    }
  }

  return { nodes, edges };
}

// ---- Export ----

const graph = buildPhilosophyGraph();
export const philosophyNodes: GraphNode[] = graph.nodes;
export const philosophyEdges: GraphEdge[] = graph.edges;
