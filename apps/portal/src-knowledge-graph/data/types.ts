// Graph node/edge types now live in the shared @universe/graph-engine package.
// Re-exported here so this domain's data modules and components keep their
// existing `./types` / `../data/types` imports.
export type { GraphNode, GraphEdge, GraphNodeType } from "@universe/graph-engine";
