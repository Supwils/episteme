// Layout engine (Barnes-Hut force-directed)
export { ForceLayout } from "./force-layout";
export { DEFAULT_CONFIG } from "./types";
export type { LayoutConfig, LayoutNode, LayoutEdge } from "./types";

// Graph data model
export type { GraphNode, GraphEdge, GraphNodeType } from "./graph-types";

// Canvas renderer
export {
  GraphRenderer,
  SpatialGrid,
  DEFAULT_HIGHLIGHT,
  MIN_SCALE,
  MAX_SCALE,
} from "./renderer";
export type {
  RenderNode,
  RenderEdge,
  RenderGuide,
  RenderConfig,
  InteractionCallbacks,
  ViewBounds,
  HighlightState,
  DrawContext,
} from "./renderer";

// Animation primitives
export {
  animateFocus,
  animateEntrance,
  animateNodePositions,
  animateAlpha,
} from "./animation";

// Path finding
export { findShortestPath, getNodesWithinHops, buildAdjacency } from "./path-finder";

// Search
export { searchNodes, levenshtein } from "./search";
export type { SearchResult } from "./search";
