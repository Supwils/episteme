// Graph node/edge types now live in the shared @/lib/graph-engine package.
// Re-exported here so this domain's data modules and components keep their
// existing `./types` / `../data/types` imports.
export type { GraphNode, GraphEdge, GraphNodeType } from "@/lib/graph-engine";
