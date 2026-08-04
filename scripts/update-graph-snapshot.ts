/**
 * Recomputes every graph aggregate the test suite pins and rewrites
 * subjects/knowledge-graph/data/aggregate-snapshot.json.
 *
 * Workflow: after any content or graph change (articles, cross-domain links,
 * curated learning paths), run
 *
 *   pnpm update-graph-snapshot
 *
 * and commit the JSON diff. Tests read their expected values from the
 * snapshot, so the diff *is* the update — no manual probing or editing of
 * test literals.
 *
 * Measured across content changes since 2026-07-27, ambiguousTargetCount and
 * the direct/contextual split drift on almost every link edit; nodeCount,
 * anchorCount, inferredBranchCount, curated and exploratory move only when
 * nodes or curated paths are added. A value outside the volatile set moving
 * deserves an explanation in the commit message, not just a regenerated file.
 *
 * Run: pnpm update-graph-snapshot
 */
import { writeFileSync } from "node:fs";
import prettier from "prettier";
import { buildKnowledgeBranchCatalog } from "../lib/knowledge-branch-catalog.ts";
import { buildKnowledgeTerrainSnapshot } from "../lib/knowledge-terrain.ts";
import { buildKnowledgeCoverageSnapshot } from "../lib/knowledge-continuum-coverage.ts";
import { buildLearningPlanCatalog } from "../lib/knowledge-learning-plan-catalog.ts";

const branch = buildKnowledgeBranchCatalog();
const terrain = buildKnowledgeTerrainSnapshot(branch);
const coverage = buildKnowledgeCoverageSnapshot();
const learning = buildLearningPlanCatalog();

const snapshot = {
  workflow:
    "After any content or graph change, run `pnpm update-graph-snapshot` and commit this " +
    "file's diff. Unit tests read expected aggregate values from this snapshot instead of " +
    "hardcoded literals, so regenerating it is the entire maintenance step.",
  branch: {
    nodeCount: branch.summary.nodeCount,
    anchorCount: branch.summary.anchorCount,
    inferredBranchCount: branch.summary.inferredBranchCount,
    maximumDistance: branch.summary.maximumDistance,
    ambiguousTargetCount: branch.summary.ambiguousTargetCount,
    maximumCandidateCount: branch.summary.maximumCandidateCount,
    confidenceCounts: branch.summary.confidenceCounts,
  },
  terrain: {
    diagnosticCount: terrain.summary.diagnosticCount,
    highPriorityDiagnosticCount: terrain.summary.highPriorityDiagnosticCount,
    domainCount: terrain.domains.length,
    domains: Object.fromEntries(
      terrain.domains.map((domain) => [
        domain.id,
        {
          total: domain.total,
          levels: domain.levels,
          curatedCount: domain.metrics.curatedCount,
          dominantLevel: domain.metrics.dominantLevel,
          dominantCount: Math.max(...domain.cells.map((cell) => cell.total)),
          advancedCount: domain.metrics.advancedCount,
          missingLevels: domain.metrics.missingLevels,
        },
      ])
    ),
  },
  coverage: {
    nodeCount: coverage.summary.nodeCount,
    pathCount: coverage.summary.pathCount,
    prerequisiteCount: coverage.summary.prerequisiteCount,
    establishedDomainCount: coverage.summary.establishedDomainCount,
    previewDomainCount: coverage.summary.previewDomainCount,
    goalCount: learning.goals.length,
    mainThreadGoalCount: learning.goals.filter((goal) => goal.kind === "main-thread").length,
  },
};

async function main(): Promise<void> {
  const snapshotUrl = new URL(
    "../subjects/knowledge-graph/data/aggregate-snapshot.json",
    import.meta.url
  );
  // Format with the repo's prettier config so re-running is idempotent and
  // commit-clean (same convention as gen-wiki-links-index).
  const prettierConfig = await prettier.resolveConfig(snapshotUrl.pathname);
  const formatted = await prettier.format(JSON.stringify(snapshot), {
    ...prettierConfig,
    parser: "json",
  });
  writeFileSync(snapshotUrl, formatted);
  console.log(`Wrote ${snapshotUrl.pathname}`);
}

void main();
