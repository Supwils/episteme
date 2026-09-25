/**
 * Emits generated/article-exits.json for the 三向出口 at the end of every
 * article (T-DESIGN-06f): for each article URL whose graph node is a
 * prerequisite of a higher-level node, the one article to read next "upward".
 *
 * Reads the cognitive-node snapshot, so it runs in gen-all right after
 * `gen-cognitive-nodes`. Only the compact url → exit table ships with article
 * routes; the 2 MB snapshot stays out of them.
 */
import { readFileSync, writeFileSync } from "node:fs";

type Node = {
  id: string;
  label: string;
  domain: string;
  url?: string;
  knowledgeLevel: number;
  prerequisiteIds?: string[];
};

const nodes = JSON.parse(readFileSync("generated/cognitive-nodes.json", "utf8")) as Node[];
const byId = new Map(nodes.map((node) => [node.id, node]));
const successors = new Map<string, Node[]>();
for (const node of nodes) {
  for (const prerequisite of node.prerequisiteIds ?? []) {
    const list = successors.get(prerequisite) ?? [];
    list.push(node);
    successors.set(prerequisite, list);
  }
}

/** Lowest higher level first; same domain before cross-domain; then by label for stability. */
function pickUp(node: Node): Node | null {
  const candidates = (successors.get(node.id) ?? []).filter(
    (next) => next.url && next.url !== node.url && next.knowledgeLevel > node.knowledgeLevel
  );
  candidates.sort(
    (a, b) =>
      a.knowledgeLevel - b.knowledgeLevel ||
      Number(b.domain === node.domain) - Number(a.domain === node.domain) ||
      a.label.localeCompare(b.label, "zh-Hans")
  );
  return candidates[0] ?? null;
}

const exits: Record<string, { level: number; up: [string, string, number] }> = {};
for (const node of [...byId.values()].sort((a, b) => a.id.localeCompare(b.id))) {
  if (!node.url || exits[node.url]) continue;
  const up = pickUp(node);
  if (up)
    exits[node.url] = { level: node.knowledgeLevel, up: [up.url!, up.label, up.knowledgeLevel] };
}

writeFileSync("generated/article-exits.json", `${JSON.stringify(exits)}\n`);
console.log(`article-exits: ${Object.keys(exits).length} articles with an upward exit`);
