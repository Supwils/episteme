import { ALL_EDGES, ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { CURATED_LEARNING_PATHS } from "@/subjects/knowledge-graph/data/curated-learning-paths";
import type { CognitiveGraphNode } from "@/subjects/knowledge-graph/data/cognitive-metadata";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

export type OrbitNode = {
  label: string;
  level: KnowledgeLevel;
  url: string;
  /** On the curated L1→L5 learning spine — drawn as the lit path. */
  spine: boolean;
};

export type OrbitPayload = {
  nodes: OrbitNode[];
  /** Index pairs into `nodes`. */
  edges: [number, number][];
};

const MAX_NODES = 72;
const MAX_EDGES = 170;
const MIN_PER_LEVEL = 6;
const LEVELS: KnowledgeLevel[] = [1, 2, 3, 4, 5];

const cache = new Map<string, OrbitPayload | null>();

/** Spine node id → the level the curated path places it at (may differ from
 *  the node's own inferred level; the path's reading wins so the orbit and
 *  the spine preview agree). */
function spineLevels(domain: string): Map<string, KnowledgeLevel> {
  const spine = CURATED_LEARNING_PATHS.find(
    (path) => path.scope === "domain-spine" && path.steps[0]?.nodeId.startsWith(`${domain}:`)
  );
  return new Map(spine?.steps.map((step) => [step.nodeId, step.level]) ?? []);
}

/**
 * A compact, level-annotated slice of a domain's knowledge graph for the
 * hero orbit: every spine node, then the best-connected nodes per level so
 * each ring is populated. Server-only — the full graph never ships.
 */
export function buildDomainOrbit(domain: string): OrbitPayload | null {
  const cached = cache.get(domain);
  if (cached !== undefined) return cached;

  // ALL_NODES is produced by annotateCognitiveMetadata, so every node carries
  // knowledgeLevel; the exported type just does not say so.
  const domainNodes = (ALL_NODES as CognitiveGraphNode[]).filter(
    (node) => node.domain === domain && node.url
  );
  if (domainNodes.length < MIN_PER_LEVEL) {
    cache.set(domain, null);
    return null;
  }

  const inDomain = new Set(domainNodes.map((node) => node.id));
  const degree = new Map<string, number>();
  const domainEdges = ALL_EDGES.filter(
    (edge) => inDomain.has(edge.source) && inDomain.has(edge.target)
  );
  for (const edge of domainEdges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }

  const spine = spineLevels(domain);
  const byDegree = (a: CognitiveGraphNode, b: CognitiveGraphNode) =>
    (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0);

  const chosen = new Map<string, CognitiveGraphNode>();
  const byId = new Map(domainNodes.map((node) => [node.id, node]));
  // Path order first, so spine nodes render in L1→L5 sequence.
  for (const id of spine.keys()) {
    const node = byId.get(id);
    if (node) chosen.set(id, node);
  }

  const perLevel = LEVELS.map((level) =>
    domainNodes
      .filter((node) => node.knowledgeLevel === level && !chosen.has(node.id))
      .sort(byDegree)
  );
  for (const pool of perLevel)
    for (const node of pool.slice(0, MIN_PER_LEVEL)) chosen.set(node.id, node);
  const remainder = perLevel
    .flatMap((pool) => pool.slice(MIN_PER_LEVEL))
    .sort(byDegree)
    .slice(0, Math.max(0, MAX_NODES - chosen.size));
  for (const node of remainder) chosen.set(node.id, node);

  const ordered = Array.from(chosen.values());
  const indexOf = new Map(ordered.map((node, index) => [node.id, index]));
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  const candidates = domainEdges
    .filter((edge) => indexOf.has(edge.source) && indexOf.has(edge.target))
    .sort((a, b) => {
      const spineA = Number(spine.has(a.source) || spine.has(a.target));
      const spineB = Number(spine.has(b.source) || spine.has(b.target));
      if (spineA !== spineB) return spineB - spineA;
      const weightA = (degree.get(a.source) ?? 0) + (degree.get(a.target) ?? 0);
      const weightB = (degree.get(b.source) ?? 0) + (degree.get(b.target) ?? 0);
      return weightB - weightA;
    });
  for (const edge of candidates) {
    const a = indexOf.get(edge.source)!;
    const b = indexOf.get(edge.target)!;
    if (a === b) continue;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push([a, b]);
    if (edges.length >= MAX_EDGES) break;
  }

  const payload: OrbitPayload = {
    nodes: ordered.map((node) => ({
      label: node.label,
      level: spine.get(node.id) ?? node.knowledgeLevel,
      url: node.url!,
      spine: spine.has(node.id),
    })),
    edges,
  };
  cache.set(domain, payload);
  return payload;
}
