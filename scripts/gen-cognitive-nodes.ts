/**
 * Emits generated/cognitive-nodes.json — the level-annotated node list the
 * runtime knowledge-frontier POST routes need, without the graph module.
 *
 * Importing subjects/knowledge-graph/data/graph-data at request time costs
 * ~650 ms and ~98 MB of heap (it rebuilds 3.5k nodes / 27k edges and pulls the
 * 2.8 MB backlinks index) on every cold Vercel instance. The four dynamic
 * routes only read a dozen scalar fields per node, so they load this ~1 MB
 * snapshot instead. Runs inside `pnpm gen-all` after `gen-links`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { ALL_NODES } from "../subjects/knowledge-graph/data/graph-data.ts";
import type { CognitiveGraphNode } from "../subjects/knowledge-graph/data/cognitive-metadata.ts";

const nodes = (ALL_NODES as CognitiveGraphNode[]).map((node) => ({
  id: node.id,
  label: node.label,
  domain: node.domain,
  type: node.type,
  slug: node.slug,
  tags: node.tags,
  description: node.description,
  ...(node.url ? { url: node.url } : {}),
  knowledgeLevel: node.knowledgeLevel,
  knowledgeLevelSource: node.knowledgeLevelSource,
  prerequisiteIds: node.prerequisiteIds,
  evidenceMode: node.evidenceMode,
}));

mkdirSync("generated", { recursive: true });
writeFileSync("generated/cognitive-nodes.json", JSON.stringify(nodes));
console.log(`✅ cognitive nodes → generated/cognitive-nodes.json (${nodes.length} nodes)`);
