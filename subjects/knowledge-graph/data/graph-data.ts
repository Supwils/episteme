import { PHYSICS_NODES, PHYSICS_EDGES } from "./physics-nodes";
import { LIFESCIENCE_NODES, LIFESCIENCE_EDGES } from "./lifescience-nodes";
import { philosophyNodes, philosophyEdges } from "./philosophy-nodes";
import { HISTORY_NODES, HISTORY_EDGES } from "./history-nodes";
import { economicsNodes, economicsEdges } from "./economics-nodes";
import { psychologyNodes, psychologyEdges } from "./psychology-nodes";
import { COMPUTER_SCIENCE_NODES, COMPUTER_SCIENCE_EDGES } from "./computer-science-nodes";
import { POLITICAL_SCIENCE_NODES, POLITICAL_SCIENCE_EDGES } from "./political-science-nodes";
import { COSMOLOGY_NODES, COSMOLOGY_EDGES } from "./cosmology-nodes";
import { MATHEMATICS_NODES, MATHEMATICS_EDGES } from "./mathematics-nodes";
import { EARTH_SCIENCE_NODES, EARTH_SCIENCE_EDGES } from "./earth-science-nodes";
import { EARTH_SCIENCE_RISK_EDGES, EARTH_SCIENCE_RISK_NODES } from "./earth-science-risk-coverage";
import { MEDICINE_NODES, MEDICINE_EDGES } from "./medicine-nodes";
import { PHYSICS_KB_NODES, PHYSICS_KB_EDGES } from "./physics-kb-nodes";
import { CHEMISTRY_NODES, CHEMISTRY_EDGES } from "./chemistry-nodes";
import { SOCIOLOGY_NODES, SOCIOLOGY_EDGES } from "./sociology-nodes";
import { LINGUISTICS_NODES, LINGUISTICS_EDGES } from "./linguistics-nodes";
import { LIFESCIENCE_COVERAGE_EDGES, LIFESCIENCE_COVERAGE_NODES } from "./lifescience-coverage";
import { DOMAIN_SPINE_COVERAGE_EDGES, DOMAIN_SPINE_COVERAGE_NODES } from "./domain-spine-coverage";
import {
  DOMAIN_SPINE_COMPLETION_EDGES,
  DOMAIN_SPINE_COMPLETION_NODES,
} from "./domain-spine-coverage-completion";
import { annotateCognitiveMetadata } from "./cognitive-metadata";
import { CURATED_PREREQUISITE_EDGES } from "./curated-learning-paths";
import { CONTINUUM_ANCHOR_EDGES, CONTINUUM_ANCHOR_NODES } from "./continuum-anchor-nodes";
import { FULL_GRAPH_ATTACHMENT_EDGES } from "./full-graph-attachments";
import {
  FRONTIER_FOUNDATION_NODES,
  REVIEWED_LEARNING_RELATION_EDGES,
} from "./frontier-prerequisite-relations";
import { CROSS_LINKS } from "@/lib/cross-links/api";
import { BACKLINKS_INDEX } from "@/lib/backlinks-index";
import type { GraphNode, GraphEdge } from "./types";

export type { GraphNodeType, GraphNode, GraphEdge } from "./types";

export type Domain = GraphNode["domain"];
export type NodeType = GraphNode["type"];

const EDGE_TYPE_MAP: Record<string, GraphEdge["type"]> = {
  "adjacent-tier": "hierarchy",
  "era-species": "hierarchy",
  "era-extinction": "hierarchy",
  "scientist-era": "hierarchy",
  "species-extinction": "hierarchy",
  "cross-reference": "cross-reference",
  temporal: "temporal",
  hierarchy: "hierarchy",
};

function mapEdge(edge: {
  source: string;
  target: string;
  relationship?: string;
  label?: string;
  type: string;
}): GraphEdge {
  return {
    source: edge.source,
    target: edge.target,
    label: edge.relationship ?? edge.label,
    type: EDGE_TYPE_MAP[edge.type] ?? "hierarchy",
  };
}

function computeSection(node: { domain: string; type: string; id: string }): string {
  switch (node.domain) {
    case "physics":
      return node.type === "cosmos-tier" ? "cosmos" : "physics";
    case "history":
      if (node.type === "era") return "eras";
      if (node.type === "figure") return "figures";
      return "events";
    case "philosophy":
      return `${node.type}s`;
    case "life-science":
      return `${node.type}s`;
    case "economics":
      return `${node.type}s`;
    case "psychology":
      return `${node.type}s`;
    default:
      return node.type;
  }
}

function computeUrl(node: {
  domain: string;
  type: string;
  slug: string;
  label: string;
}): string | undefined {
  switch (node.domain) {
    case "physics":
      return node.type === "cosmos-tier"
        ? `/universe-physics/universe/${node.slug}`
        : `/universe-physics/physics/${node.slug}`;
    case "history":
      if (node.type === "era") {
        const eraSlug = node.slug === "early-modern" ? "earlyModern" : node.slug;
        return `/human-history/eras/${eraSlug}`;
      }
      if (node.type === "figure") {
        return `/human-history/figures/${encodeURIComponent(node.label)}`;
      }
      return `/human-history/events/${encodeURIComponent(node.label)}`;
    case "philosophy":
      if (node.type === "thinker") return `/philosophy/thinkers/${node.slug}`;
      if (node.type === "school") return `/philosophy/schools/${node.slug}`;
      if (node.type === "concept") return `/philosophy/concepts/${node.slug}`;
      if (node.type === "experiment") return `/philosophy/experiments/${node.slug}`;
      return undefined;
    case "life-science":
      if (node.type === "species") return `/life-science/species`;
      if (node.type === "extinction") return `/life-science/extinctions`;
      if (node.type === "scientist") return `/life-science/scientists/${node.slug}`;
      return `/life-science`;
    case "economics":
      if (node.type === "economist") return `/economics/economists/${node.slug}`;
      if (node.type === "theory") return `/economics/theories/${node.slug}`;
      if (node.type === "concept") return `/economics/concepts/${node.slug}`;
      return "/economics";
    case "psychology":
      if (node.type === "theorist") return `/psychology/theorists/${node.slug}`;
      if (node.type === "experiment") return `/psychology/experiments/${node.slug}`;
      if (node.type === "phenomenon") return `/psychology/phenomena/${node.slug}`;
      return `/psychology`;
    default:
      return undefined;
  }
}

const physicsNodes: GraphNode[] = PHYSICS_NODES.map((n) => ({
  ...n,
  domain: "physics" as const,
  section: computeSection(n),
  url: computeUrl(n),
}));

const lifeScienceNodes: GraphNode[] = LIFESCIENCE_NODES.map((n) => ({
  ...n,
  domain: "life-science" as const,
  section: computeSection(n),
  url: computeUrl(n),
}));

const BASE_NODES: GraphNode[] = [
  ...FRONTIER_FOUNDATION_NODES,
  ...physicsNodes,
  ...philosophyNodes.map((n) => ({
    ...n,
    section: n.section ?? computeSection(n),
    url: n.url ?? computeUrl(n),
  })),
  ...HISTORY_NODES.map(
    (n) => ({ ...n, section: computeSection(n), url: computeUrl(n) }) as GraphNode
  ),
  ...lifeScienceNodes,
  ...economicsNodes.map((n) => ({
    ...n,
    section: n.section ?? computeSection(n),
    url: n.url ?? computeUrl(n),
  })),
  ...psychologyNodes.map((n) => ({
    ...n,
    section: n.section ?? computeSection(n),
    url: n.url ?? computeUrl(n),
  })),
  ...COMPUTER_SCIENCE_NODES,
  ...POLITICAL_SCIENCE_NODES,
  ...COSMOLOGY_NODES,
  ...MATHEMATICS_NODES,
  ...EARTH_SCIENCE_NODES,
  ...EARTH_SCIENCE_RISK_NODES,
  ...MEDICINE_NODES,
  ...PHYSICS_KB_NODES,
  ...CHEMISTRY_NODES,
  ...SOCIOLOGY_NODES,
  ...LINGUISTICS_NODES,
  ...LIFESCIENCE_COVERAGE_NODES,
  ...DOMAIN_SPINE_COVERAGE_NODES,
  ...DOMAIN_SPINE_COMPLETION_NODES,
  ...CONTINUUM_ANCHOR_NODES,
];

const physicsEdges: GraphEdge[] = PHYSICS_EDGES.map(mapEdge);
const historyEdges: GraphEdge[] = HISTORY_EDGES.map(mapEdge);
const lifeScienceEdges: GraphEdge[] = LIFESCIENCE_EDGES.map(mapEdge);
const pairKey = (left: string, right: string): string =>
  left < right ? `${left}|${right}` : `${right}|${left}`;

// cross-links use app names (human-history/universe-physics/life-science) but
// graph node ids are prefixed with the shorter domain key (history/physics/
// lifescience). Without this map every cross-domain edge silently dangles.
const APP_TO_DOMAIN: Record<string, string> = {
  "human-history": "history",
  "universe-physics": "physics",
  "life-science": "lifescience",
};
const dp = (app: string) => APP_TO_DOMAIN[app] ?? app;

const nodeIdSet = new Set(BASE_NODES.map((n) => n.id));
const domainLinkEdges: GraphEdge[] = CROSS_LINKS.map((link) => ({
  source: `${dp(link.sourceApp)}:${link.sourceId}`,
  target: `${dp(link.targetApp)}:${link.targetId}`,
  type: "domain-link" as const,
  label: link.relationship,
})).filter((e) => nodeIdSet.has(e.source) && nodeIdSet.has(e.target));

const baseEdges: GraphEdge[] = [
  ...physicsEdges,
  ...philosophyEdges,
  ...historyEdges,
  ...lifeScienceEdges,
  ...economicsEdges,
  ...psychologyEdges,
  ...COMPUTER_SCIENCE_EDGES,
  ...POLITICAL_SCIENCE_EDGES,
  ...COSMOLOGY_EDGES,
  ...MATHEMATICS_EDGES,
  ...EARTH_SCIENCE_EDGES,
  ...EARTH_SCIENCE_RISK_EDGES,
  ...MEDICINE_EDGES,
  ...PHYSICS_KB_EDGES,
  ...CHEMISTRY_EDGES,
  ...SOCIOLOGY_EDGES,
  ...LINGUISTICS_EDGES,
  ...LIFESCIENCE_COVERAGE_EDGES,
  ...DOMAIN_SPINE_COVERAGE_EDGES,
  ...DOMAIN_SPINE_COMPLETION_EDGES,
  ...domainLinkEdges,
  ...CONTINUUM_ANCHOR_EDGES,
  ...FULL_GRAPH_ATTACHMENT_EDGES,
  ...REVIEWED_LEARNING_RELATION_EDGES,
];

const baseEdgePairs = new Set(baseEdges.map((edge) => pairKey(edge.source, edge.target)));
for (const edge of CURATED_PREREQUISITE_EDGES) {
  const key = pairKey(edge.source, edge.target);
  if (!nodeIdSet.has(edge.source) || !nodeIdSet.has(edge.target) || baseEdgePairs.has(key)) {
    continue;
  }
  baseEdges.push(edge);
  baseEdgePairs.add(key);
}

// Real prose cross-references: the inline `[[wiki-links]]` authors wrote are
// inverted into graph edges (lib/backlinks-index). They map onto graph nodes by
// URL, are deduped against the curated edges above, and densify the graph with
// authentic connections rather than hand-picked ones. Same-domain references
// are `cross-reference`; cross-domain ones join the curated `domain-link`s.
const urlToNodeId = new Map<string, string>();
for (const n of BASE_NODES) if (n.url) urlToNodeId.set(n.url, n.id);

const existingPairs = new Set(baseEdges.map((e) => pairKey(e.source, e.target)));

const wikiReferenceEdges: GraphEdge[] = [];
for (const [targetUrl, sources] of Object.entries(BACKLINKS_INDEX)) {
  const targetId = urlToNodeId.get(targetUrl);
  if (!targetId) continue;
  for (const { url } of sources) {
    const sourceId = urlToNodeId.get(url);
    if (!sourceId || sourceId === targetId) continue;
    const key = pairKey(sourceId, targetId);
    if (existingPairs.has(key)) continue;
    existingPairs.add(key);
    const sameDomain = sourceId.split(":")[0] === targetId.split(":")[0];
    wikiReferenceEdges.push({
      source: sourceId,
      target: targetId,
      type: sameDomain ? "cross-reference" : "domain-link",
      label: "引用",
    });
  }
}

export const ALL_EDGES: GraphEdge[] = [...baseEdges, ...wikiReferenceEdges];
export const ALL_NODES: GraphNode[] = annotateCognitiveMetadata(BASE_NODES, ALL_EDGES);

export function getNodeById(id: string): GraphNode | undefined {
  return ALL_NODES.find((n) => n.id === id);
}

export function getNodesByDomain(domain: GraphNode["domain"]): GraphNode[] {
  return ALL_NODES.filter((n) => n.domain === domain);
}

export function getNodesByType(type: GraphNode["type"]): GraphNode[] {
  return ALL_NODES.filter((n) => n.type === type);
}

export function getEdgesForNode(nodeId: string): GraphEdge[] {
  return ALL_EDGES.filter((e) => e.source === nodeId || e.target === nodeId);
}

export function getConnectedNodes(nodeId: string): GraphNode[] {
  const edges = getEdgesForNode(nodeId);
  const connectedIds = new Set<string>();
  for (const edge of edges) {
    if (edge.source === nodeId) connectedIds.add(edge.target);
    if (edge.target === nodeId) connectedIds.add(edge.source);
  }
  return ALL_NODES.filter((n) => connectedIds.has(n.id));
}
