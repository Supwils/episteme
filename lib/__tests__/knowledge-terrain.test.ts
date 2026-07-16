import { describe, expect, it } from "vitest";
import { buildKnowledgeBranchCatalog } from "@/lib/knowledge-branch-catalog";
import { buildKnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";

const terrain = buildKnowledgeTerrainSnapshot(buildKnowledgeBranchCatalog());

describe("full graph knowledge terrain", () => {
  it("conserves every node across domain, level and confidence aggregates", () => {
    expect(terrain.summary.nodeCount).toBe(1362);
    expect(terrain.summary.ambiguousTargetCount).toBe(674);
    expect(terrain.summary.maximumCandidateCount).toBe(18);
    expect(terrain.summary.diagnosticCount).toBe(11);
    expect(terrain.summary.highPriorityDiagnosticCount).toBe(5);
    expect(terrain.domains).toHaveLength(15);
    expect(terrain.domains.reduce((sum, domain) => sum + domain.total, 0)).toBe(1362);
    expect(terrain.summary.levelCounts.reduce((sum, count) => sum + count, 0)).toBe(1362);

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
  });

  it("derives transparent inventory signals without treating density as importance", () => {
    const history = terrain.domains.find((domain) => domain.id === "history")!;
    expect(history.metrics.dominantLevel).toBe(1);
    expect(history.metrics.dominantShare).toBeCloseTo(303 / 313);
    expect(history.diagnostics.map((diagnosis) => diagnosis.kind)).toEqual(
      expect.arrayContaining([
        "stage-concentration",
        "advanced-thin",
        "thin-backbone",
        "distant-branches",
      ])
    );
    expect(history.diagnostics[0]?.description).toContain("不能解读为学科重要性");

    const philosophy = terrain.domains.find((domain) => domain.id === "philosophy")!;
    expect(philosophy.metrics.curatedCount).toBe(10);
    expect(philosophy.metrics.curatedShare).toBeCloseTo(10 / 288);

    const linguistics = terrain.domains.find((domain) => domain.id === "linguistics")!;
    expect(linguistics.levels).toEqual([6, 6, 12, 7, 5]);
    expect(linguistics.metrics.advancedCount).toBe(12);
    expect(linguistics.metrics.missingLevels).toEqual([]);
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
