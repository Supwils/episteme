import { PHYSICS_NODES, PHYSICS_EDGES } from './physics-nodes';
import { LIFESCIENCE_NODES, LIFESCIENCE_EDGES } from './lifescience-nodes';
import { philosophyNodes, philosophyEdges } from './philosophy-nodes';
import { HISTORY_NODES, HISTORY_EDGES } from './history-nodes';
import { economicsNodes, economicsEdges } from './economics-nodes';
import { psychologyNodes, psychologyEdges } from './psychology-nodes';
import { CROSS_LINKS } from '@/lib/cross-links/api';
import type { GraphNode, GraphEdge } from './types';

export type { GraphNodeType, GraphNode, GraphEdge } from './types';

export type Domain = GraphNode['domain'];
export type NodeType = GraphNode['type'];

const EDGE_TYPE_MAP: Record<string, GraphEdge['type']> = {
  'adjacent-tier': 'hierarchy',
  'era-species': 'hierarchy',
  'era-extinction': 'hierarchy',
  'scientist-era': 'hierarchy',
  'species-extinction': 'hierarchy',
  'cross-reference': 'cross-reference',
  'temporal': 'temporal',
  'hierarchy': 'hierarchy',
};

function mapEdge(edge: { source: string; target: string; relationship?: string; label?: string; type: string }): GraphEdge {
  return {
    source: edge.source,
    target: edge.target,
    label: edge.relationship ?? edge.label,
    type: EDGE_TYPE_MAP[edge.type] ?? 'hierarchy',
  };
}

function computeSection(node: { domain: string; type: string; id: string }): string {
  switch (node.domain) {
    case 'physics':
      return node.type === 'cosmos-tier' ? 'cosmos' : 'physics';
    case 'history':
      if (node.type === 'era') return 'eras';
      if (node.type === 'figure') return 'figures';
      return 'events';
    case 'philosophy':
      return `${node.type}s`;
    case 'life-science':
      return `${node.type}s`;
    case 'economics':
      return `${node.type}s`;
    case 'psychology':
      return `${node.type}s`;
    default:
      return node.type;
  }
}

function computeUrl(node: { domain: string; type: string; slug: string }): string | undefined {
  switch (node.domain) {
    case 'physics':
      return node.type === 'cosmos-tier'
        ? `/universe-physics/universe/${node.slug}`
        : `/universe-physics/physics/${node.slug}`;
    case 'history':
      if (node.type === 'era') return `/human-history/timeline`;
      if (node.type === 'figure') return `/human-history/figures`;
      return `/human-history/timeline`;
    case 'philosophy':
      if (node.type === 'thinker') return `/philosophy/thinkers/${node.slug}`;
      if (node.type === 'school') return `/philosophy/schools/${node.slug}`;
      if (node.type === 'concept') return `/philosophy/concepts/${node.slug}`;
      return undefined;
    case 'life-science':
      if (node.type === 'species') return `/life-science/species`;
      if (node.type === 'extinction') return `/life-science/extinctions`;
      if (node.type === 'scientist') return `/life-science/scientists/${node.slug}`;
      return `/life-science`;
    case 'economics':
      if (node.type === 'economist') return `/economics/economists/${node.slug}`;
      if (node.type === 'theory') return `/economics/theories/${node.slug}`;
      return `/economics`;
    case 'psychology':
      if (node.type === 'theorist') return `/psychology/theorists/${node.slug}`;
      if (node.type === 'experiment') return `/psychology/experiments/${node.slug}`;
      if (node.type === 'phenomenon') return `/psychology/phenomena/${node.slug}`;
      return `/psychology`;
    default:
      return undefined;
  }
}

const physicsNodes: GraphNode[] = PHYSICS_NODES.map((n) => ({
  ...n,
  domain: 'physics' as const,
  section: computeSection(n),
  url: computeUrl(n),
}));

const lifeScienceNodes: GraphNode[] = LIFESCIENCE_NODES.map((n) => ({
  ...n,
  domain: 'life-science' as const,
  section: computeSection(n),
  url: computeUrl(n),
}));

export const ALL_NODES: GraphNode[] = [
  ...physicsNodes,
  ...philosophyNodes.map((n) => ({ ...n, section: n.section ?? computeSection(n), url: n.url ?? computeUrl(n) })),
  ...HISTORY_NODES.map((n) => ({ ...n, section: computeSection(n), url: computeUrl(n) } as GraphNode)),
  ...lifeScienceNodes,
  ...economicsNodes.map((n) => ({ ...n, section: computeSection(n), url: computeUrl(n) })),
  ...psychologyNodes.map((n) => ({ ...n, section: computeSection(n), url: computeUrl(n) })),
];

const physicsEdges: GraphEdge[] = PHYSICS_EDGES.map(mapEdge);
const historyEdges: GraphEdge[] = HISTORY_EDGES.map(mapEdge);
const lifeScienceEdges: GraphEdge[] = LIFESCIENCE_EDGES.map(mapEdge);

const domainLinkEdges: GraphEdge[] = CROSS_LINKS.map((link) => ({
  source: `${link.sourceApp}:${link.sourceId}`,
  target: `${link.targetApp}:${link.targetId}`,
  type: 'domain-link' as const,
  label: link.relationship,
}));

export const ALL_EDGES: GraphEdge[] = [
  ...physicsEdges,
  ...philosophyEdges,
  ...historyEdges,
  ...lifeScienceEdges,
  ...economicsEdges,
  ...psychologyEdges,
  ...domainLinkEdges,
];

export function getNodeById(id: string): GraphNode | undefined {
  return ALL_NODES.find((n) => n.id === id);
}

export function getNodesByDomain(domain: GraphNode['domain']): GraphNode[] {
  return ALL_NODES.filter((n) => n.domain === domain);
}

export function getNodesByType(type: GraphNode['type']): GraphNode[] {
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
