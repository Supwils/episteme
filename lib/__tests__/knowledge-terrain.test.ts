import { describe, expect, it } from "vitest";
import graphSnapshot from "@/subjects/knowledge-graph/data/aggregate-snapshot.json";
import { buildKnowledgeBranchCatalog } from "@/lib/knowledge-branch-catalog";
import { buildKnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";

const terrain = buildKnowledgeTerrainSnapshot(buildKnowledgeBranchCatalog());

// Every aggregate expectation is read from the snapshot — after content or
// graph changes run `pnpm update-graph-snapshot` instead of editing literals.
describe("full graph knowledge terrain", () => {
  it("conserves every node across domain, level and confidence aggregates", () => {
    expect(terrain.summary.nodeCount).toBe(graphSnapshot.branch.nodeCount);
    expect(terrain.summary.ambiguousTargetCount).toBe(graphSnapshot.branch.ambiguousTargetCount);
    expect(terrain.summary.maximumCandidateCount).toBe(graphSnapshot.branch.maximumCandidateCount);
    expect(terrain.summary.diagnosticCount).toBe(graphSnapshot.terrain.diagnosticCount);
    expect(terrain.summary.highPriorityDiagnosticCount).toBe(
      graphSnapshot.terrain.highPriorityDiagnosticCount
    );
    expect(terrain.domains).toHaveLength(graphSnapshot.terrain.domainCount);
    expect(terrain.domains.reduce((sum, domain) => sum + domain.total, 0)).toBe(
      graphSnapshot.branch.nodeCount
    );
    expect(terrain.summary.levelCounts.reduce((sum, count) => sum + count, 0)).toBe(
      graphSnapshot.branch.nodeCount
    );

    const confidenceTotals = terrain.domains
      .flatMap((domain) => domain.cells)
      .reduce(
        (totals, cell) => ({
          curated: totals.curated + cell.confidenceCounts.curated,
          direct: totals.direct + cell.confidenceCounts.direct,
          contextual: totals.contextual + cell.confidenceCounts.contextual,
          exploratory: totals.exploratory + cell.confidenceCounts.exploratory,
        }),
        { curated: 0, direct: 0, contextual: 0, exploratory: 0 }
      );
    expect(confidenceTotals).toEqual(terrain.summary.confidenceCounts);
    expect(terrain.summary.confidenceCounts).toEqual(graphSnapshot.branch.confidenceCounts);
  });

  it("derives transparent inventory signals without treating density as importance", () => {
    const historySnapshot = graphSnapshot.terrain.domains.history;
    const history = terrain.domains.find((domain) => domain.id === "history")!;
    expect(history.total).toBe(historySnapshot.total);
    expect(history.metrics.dominantLevel).toBe(historySnapshot.dominantLevel);
    expect(history.metrics.dominantShare).toBeCloseTo(
      historySnapshot.dominantCount / historySnapshot.total
    );
    expect(history.diagnostics.map((diagnosis) => diagnosis.kind)).toEqual(
      expect.arrayContaining(["stage-concentration", "advanced-thin", "thin-backbone"])
    );
    // The nested history knowledge base now contributes its real prose links,
    // so fewer than 15% of its nodes remain three or more hops from the curated
    // spine. Reintroducing this signal would mean those bridges regressed.
    expect(history.diagnostics.some((diagnosis) => diagnosis.kind === "distant-branches")).toBe(
      false
    );
    expect(
      history.diagnostics.find((diagnosis) => diagnosis.kind === "stage-concentration")?.description
    ).toContain("不能解读为学科重要性");

    const philosophySnapshot = graphSnapshot.terrain.domains.philosophy;
    const philosophy = terrain.domains.find((domain) => domain.id === "philosophy")!;
    expect(philosophy.metrics.curatedCount).toBe(philosophySnapshot.curatedCount);
    expect(philosophy.metrics.curatedShare).toBeCloseTo(
      philosophySnapshot.curatedCount / philosophySnapshot.total
    );

    const linguisticsSnapshot = graphSnapshot.terrain.domains.linguistics;
    const linguistics = terrain.domains.find((domain) => domain.id === "linguistics")!;
    expect(linguistics.levels).toEqual(linguisticsSnapshot.levels);
    expect(linguistics.metrics.advancedCount).toBe(linguisticsSnapshot.advancedCount);
    expect(linguistics.metrics.missingLevels).toEqual(linguisticsSnapshot.missingLevels);
    expect(linguistics.diagnostics.some((diagnosis) => diagnosis.kind === "missing-levels")).toBe(
      false
    );

    const diagnosisIds = terrain.domains.flatMap((domain) =>
      domain.diagnostics.map((diagnosis) => diagnosis.id)
    );
    expect(new Set(diagnosisIds).size).toBe(diagnosisIds.length);
  });

  it("keeps each matrix cell internally consistent", () => {
    for (const domain of terrain.domains) {
      expect(domain.cells).toHaveLength(5);
      expect(domain.cells.map((cell) => cell.total)).toEqual(domain.levels);
      for (const cell of domain.cells) {
        expect(Object.values(cell.confidenceCounts).reduce((sum, count) => sum + count, 0)).toBe(
          cell.total
        );
      }
    }
  });
});
