import { describe, expect, it } from "vitest";
import { buildCatalogKnowledgeGapPlan } from "../knowledge-gap-plan-catalog";
import { createKnowledgeGapJourney, updateKnowledgeGapCheckpoint } from "../knowledge-gap-journey";
import {
  createKnowledgeGapJourneyArchive,
  mergeKnowledgeGapJourneyArchive,
  parseKnowledgeGapJourneyArchive,
  previewKnowledgeGapJourneyImport,
} from "../knowledge-gap-journey-archive";

function journey(targetId: string, now: string) {
  return createKnowledgeGapJourney(buildCatalogKnowledgeGapPlan(targetId, [], 45), now);
}

const security = journey(
  "political-science:security-dilemma-war-peace",
  "2026-07-13T00:00:00.000Z"
);
const macro = journey("economics:us-macro-diagnosis-2026", "2026-07-13T01:00:00.000Z");

describe("knowledge gap journey archive", () => {
  it("round-trips a strictly versioned archive with checkpoint evidence", () => {
    const withEvidence = updateKnowledgeGapCheckpoint(
      security,
      security.steps[0]!.id,
      { reading: true, note: "已核对正文" },
      "2026-07-13T02:00:00.000Z"
    );
    const archive = createKnowledgeGapJourneyArchive(
      [withEvidence, macro],
      "2026-07-13T03:00:00.000Z"
    );
    const parsed = parseKnowledgeGapJourneyArchive(JSON.parse(JSON.stringify(archive)));

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.archive.format).toBe("episteme-knowledge-gap-journeys");
    expect(parsed.archive.version).toBe(1);
    expect(parsed.archive.journeys).toHaveLength(2);
    expect(parsed.archive.journeys[0]?.target.id).toBe(security.target.id);
    expect(parsed.archive.journeys[0]?.checkpoints[security.steps[0]!.id]?.reading).toBe(true);
    expect(parsed.archive.journeys[1]?.target.id).toBe(macro.target.id);
  });

  it("rejects incompatible, oversized and malformed archives", () => {
    const base = createKnowledgeGapJourneyArchive([security]);
    expect(parseKnowledgeGapJourneyArchive({ ...base, version: 2 })).toEqual({
      ok: false,
      error: "unsupported-version",
    });
    expect(
      parseKnowledgeGapJourneyArchive({
        ...base,
        journeys: Array.from({ length: 17 }, (_, index) => ({
          ...security,
          target: { ...security.target, id: `target-${index}` },
        })),
      })
    ).toEqual({ ok: false, error: "too-many-journeys" });
    expect(
      parseKnowledgeGapJourneyArchive({
        ...base,
        journeys: [{ ...security, checkpoints: { orphan: { reading: true } } }],
      })
    ).toEqual({ ok: false, error: "invalid-journeys" });
  });

  it("previews target conflicts and honors the explicit resolution", () => {
    const importedSecurity = { ...security, updatedAt: "2026-07-13T05:00:00.000Z" };
    const preview = previewKnowledgeGapJourneyImport([security], [importedSecurity, macro]);
    expect(preview).toMatchObject({ incomingCount: 2, newCount: 1, projectedCount: 2 });
    expect(preview.conflicts.map((item) => item.target.id)).toEqual([security.target.id]);

    const kept = mergeKnowledgeGapJourneyArchive(
      [security],
      [importedSecurity, macro],
      "keep-existing"
    );
    const replaced = mergeKnowledgeGapJourneyArchive(
      [security],
      [importedSecurity, macro],
      "replace-existing"
    );
    expect(kept.find((item) => item.target.id === security.target.id)?.updatedAt).toBe(
      security.updatedAt
    );
    expect(replaced.find((item) => item.target.id === security.target.id)?.updatedAt).toBe(
      importedSecurity.updatedAt
    );
  });
});
