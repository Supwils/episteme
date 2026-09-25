import type { GraphNode } from "@/lib/graph-engine";
import COGNITIVE_NODES_JSON from "@/generated/cognitive-nodes.json";

/**
 * Every graph node with its cognitive metadata, loaded from the snapshot that
 * `pnpm gen-cognitive-nodes` writes. Runtime (per-request) code should read
 * this instead of `ALL_NODES`, which drags the whole graph build behind it.
 * The JSON is produced from the same typed objects, so the assertion only
 * restores the literal unions that JSON import widens to `string`.
 */
export const COGNITIVE_NODES = COGNITIVE_NODES_JSON as GraphNode[];
