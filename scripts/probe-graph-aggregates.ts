/**
 * Prints every graph aggregate that used to be asserted as a literal.
 *
 * Tests now read expected aggregates from
 * subjects/knowledge-graph/data/aggregate-snapshot.json, so the maintenance
 * workflow is `pnpm update-graph-snapshot` + commit the JSON diff. This probe
 * remains as a quick way to inspect the live values without writing the file.
 *
 * Measured across four content changes on 2026-07-27, only ambiguousTargetCount
 * and the direct/contextual split actually drift; nodeCount, anchorCount,
 * inferredBranchCount, curated and exploratory stayed put. A number here moving
 * that is *not* in that volatile set deserves an explanation, not an edit.
 *
 * Run: pnpm probe-graph
 */
import { buildKnowledgeBranchCatalog } from "../lib/knowledge-branch-catalog.ts";
import { buildKnowledgeTerrainSnapshot } from "../lib/knowledge-terrain.ts";

const branch = buildKnowledgeBranchCatalog();
const terrain = buildKnowledgeTerrainSnapshot(branch);

const VOLATILE = new Set(["ambiguousTargetCount", "direct", "contextual", "maximumCandidateCount"]);

function show(label: string, value: number | string, key = label): void {
  const mark = VOLATILE.has(key) ? " ← 易漂移" : "";
  console.log(`  ${label.padEnd(26)} ${String(value).padStart(6)}${mark}`);
}

console.log("\nlib/__tests__/knowledge-branch.test.ts — branchCatalog.summary");
for (const [key, value] of Object.entries(branch.summary)) {
  if (typeof value === "number") show(key, value);
}
for (const [key, value] of Object.entries(branch.summary.confidenceCounts)) {
  show(`confidenceCounts.${key}`, value, key);
}

console.log("\nlib/__tests__/knowledge-terrain.test.ts");
show("summary.nodeCount", terrain.summary.nodeCount, "nodeCount");
show("summary.ambiguousTargetCount", terrain.summary.ambiguousTargetCount, "ambiguousTargetCount");
show(
  "summary.maximumCandidateCount",
  terrain.summary.maximumCandidateCount,
  "maximumCandidateCount"
);
show(
  "domains total sum",
  terrain.domains.reduce((sum, domain) => sum + domain.total, 0)
);
show(
  "levelCounts sum",
  terrain.summary.levelCounts.reduce((sum: number, count: number) => sum + count, 0)
);
show("summary.diagnosticCount", terrain.summary.diagnosticCount, "diagnosticCount");

const history = terrain.domains.find((domain) => domain.domainId === "history");
if (history) {
  console.log("\ncomponents/knowledge-continuum/__tests__/KnowledgeLearningPlanner.test.tsx");
  show("history domain total", history.total);
  show("history dominant count", Math.round(history.metrics.dominantShare * history.total));
  show("history dominantShare %", `${Math.round(history.metrics.dominantShare * 100)}%`);
}

console.log("");
