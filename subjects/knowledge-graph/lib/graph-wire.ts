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
 *
 * v3 moves node descriptions (over half the brotli payload) to a second file,
 * /knowledge-graph/graph-descriptions. The graph only needs them for tooltips,
 * the detail panel and description search, so it draws first and fills them in.
 * It also carries the full graph's force layout, computed once at build time:
 * running it in the browser cost ~2 s on a throttled phone before first draw.
 */

export const GRAPH_WIRE_VERSION = 3;

const EDGE_TYPES: GraphEdge["type"][] = ["cross-reference", "temporal", "hierarchy", "domain-link"];

export type PackedGraphEdge = [source: number, target: number, type: number, label?: string];

type WireNode = Omit<GraphNode, "description">;

export interface PackedGraphData {
  v: typeof GRAPH_WIRE_VERSION;
  nodes: WireNode[];
  edges: PackedGraphEdge[];
  /** Layout of the full graph in node order: [x0, y0, x1, y1, …] × POSITION_SCALE. */
  p?: number[];
}

type Positions = Map<string, { x: number; y: number }>;

// One decimal of layout units (the full graph spans ~±550) — invisible on screen.
const POSITION_SCALE = 10;

/** Descriptions in node order; `count` + `firstId`/`lastId` catch a mismatch. */
export interface PackedGraphDescriptions {
  v: typeof GRAPH_WIRE_VERSION;
  count: number;
  firstId: string;
  lastId: string;
  descriptions: string[];
}

export function packGraphData(
  nodes: GraphNode[],
  edges: GraphEdge[],
  positions?: Positions
): PackedGraphData {
  const nodeIndex = new Map(nodes.map((node, index) => [node.id, index]));
  const p = positions
    ? nodes.flatMap((node) => {
        const at = positions.get(node.id) ?? { x: 0, y: 0 };
        return [Math.round(at.x * POSITION_SCALE), Math.round(at.y * POSITION_SCALE)];
      })
    : undefined;
  return {
    ...(p ? { p } : {}),
    v: GRAPH_WIRE_VERSION,
    nodes: nodes.map(({ description: _omitted, ...node }) => node),
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
  initialPositions?: Positions;
} {
  const p = packed.p;
  return {
    ...(p
      ? {
          initialPositions: new Map(
            packed.nodes.map((node, i) => [
              node.id,
              { x: p[2 * i]! / POSITION_SCALE, y: p[2 * i + 1]! / POSITION_SCALE },
            ])
          ),
        }
      : {}),
    nodes: packed.nodes.map((node) => ({ ...node, description: "" })),
    edges: packed.edges.map(([source, target, type, label]) => ({
      source: packed.nodes[source]!.id,
      target: packed.nodes[target]!.id,
      type: EDGE_TYPES[type]!,
      ...(label ? { label } : {}),
    })),
  };
}

export function packGraphDescriptions(nodes: GraphNode[]): PackedGraphDescriptions {
  return {
    v: GRAPH_WIRE_VERSION,
    count: nodes.length,
    firstId: nodes[0]?.id ?? "",
    lastId: nodes.at(-1)?.id ?? "",
    descriptions: nodes.map((node) => node.description),
  };
}

/**
 * Writes descriptions onto the already-rendered node objects in place, so the
 * layout is not rebuilt; readers (tooltip, panel, search) read the field live.
 * Returns false and leaves nodes untouched if the two files do not match.
 */
export function applyGraphDescriptions(
  nodes: GraphNode[],
  packed: PackedGraphDescriptions
): boolean {
  const matches =
    packed.v === GRAPH_WIRE_VERSION &&
    packed.count === nodes.length &&
    packed.firstId === (nodes[0]?.id ?? "") &&
    packed.lastId === (nodes.at(-1)?.id ?? "");
  if (!matches) return false;
  nodes.forEach((node, index) => {
    node.description = packed.descriptions[index] ?? "";
  });
  return true;
}
