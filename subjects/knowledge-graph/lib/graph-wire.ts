import type { GraphEdge, GraphNode } from "@/lib/graph-engine";

/**
 * Wire format v2 for /knowledge-graph/graph-data.
 *
 * v1 serialised every edge as an object with full string ids — at ~20k edges
 * the repeated ids and key names dominated the payload (~1.8MB of ~4.5MB raw).
 * v2 keeps nodes as objects (their fields are read by name all over the detail
 * panel) but packs edges into tuples with node indices and an edge-type enum
 * table. Raw size drops ~35%, which matters for main-thread JSON.parse time
 * and the 5MB raw budget; brotli transfer shrinks too.
 */

export const GRAPH_WIRE_VERSION = 2;

const EDGE_TYPES: GraphEdge["type"][] = ["cross-reference", "temporal", "hierarchy", "domain-link"];

export type PackedGraphEdge = [source: number, target: number, type: number, label?: string];

export interface PackedGraphData {
  v: typeof GRAPH_WIRE_VERSION;
  nodes: GraphNode[];
  edges: PackedGraphEdge[];
}

export function packGraphData(nodes: GraphNode[], edges: GraphEdge[]): PackedGraphData {
  const nodeIndex = new Map(nodes.map((node, index) => [node.id, index]));
  return {
    v: GRAPH_WIRE_VERSION,
    nodes,
    edges: edges.map((edge) => {
      const packed: PackedGraphEdge = [
        nodeIndex.get(edge.source)!,
        nodeIndex.get(edge.target)!,
        EDGE_TYPES.indexOf(edge.type),
      ];
      if (edge.label) packed.push(edge.label);
      return packed;
    }),
  };
}

export function unpackGraphData(packed: PackedGraphData): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  return {
    nodes: packed.nodes,
    edges: packed.edges.map(([source, target, type, label]) => ({
      source: packed.nodes[source]!.id,
      target: packed.nodes[target]!.id,
      type: EDGE_TYPES[type]!,
      ...(label ? { label } : {}),
    })),
  };
}
