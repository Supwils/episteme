import { describe, expect, it } from "vitest";
import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeGapPlan } from "../knowledge-gap-plan";
import {
  compareKnowledgeGapJourney,
  createKnowledgeGapJourney,
  keepPreviousKnowledgeGapJourney,
  migrateKnowledgeGapJourney,
  updateKnowledgeGapJourneyBudget,
  updateKnowledgeGapCheckpoint,
} from "../knowledge-gap-journey";

function node(id: string, level: 1 | 2 | 3, prerequisiteIds: string[] = []): GraphNode {
  return {
    id,
    label: id,
    domain: "economics",
    type: "concept",
    slug: id,
    tags: [],
    description: id,
    knowledgeLevel: level,
    knowledgeLevelSource: "curated",
    prerequisiteIds,
    evidenceMode: "comparative",
  };
}

const firstNodes = [
  node("root", 1),
  node("concept-a", 2, ["root"]),
  node("concept-b", 2, ["root"]),
  node("target", 3, ["concept-a"]),
];

const nextNodes = firstNodes.map((item) =>
  item.id === "target" ? node("target", 3, ["concept-b"]) : item
);

describe("knowledge gap journey", () => {
  it("saves a deterministic route snapshot and updates evidence without mastering nodes", () => {
    const plan = buildKnowledgeGapPlan(firstNodes, [], "target", [], 45);
    const journey = createKnowledgeGapJourney(plan, "2026-07-13T00:00:00.000Z");
    const withReading = updateKnowledgeGapCheckpoint(
      journey,
      "target",
      { reading: true, note: "能解释核心机制" },
      "2026-07-13T00:10:00.000Z"
    );

    expect(journey.relationFingerprint).toBe(plan.version.fingerprint);
    expect(withReading.checkpoints.target).toEqual(
      expect.objectContaining({ reading: true, practice: false, note: "能解释核心机制" })
    );
    expect(withReading).not.toHaveProperty("masteredIds");
  });

  it("reports route changes and migrates only retained checkpoint evidence", () => {
    const firstPlan = buildKnowledgeGapPlan(firstNodes, [], "target", [], 45);
    const nextPlan = buildKnowledgeGapPlan(nextNodes, [], "target", [], 45);
    let journey = createKnowledgeGapJourney(firstPlan, "2026-07-13T00:00:00.000Z");
    journey = updateKnowledgeGapCheckpoint(journey, "concept-a", { practice: true });
    journey = updateKnowledgeGapCheckpoint(journey, "target", { explanation: true });

    const diff = compareKnowledgeGapJourney(journey, nextPlan);
    expect(diff.current).toBe(false);
    expect(diff.addedSteps.map((step) => step.id)).toEqual(["concept-b"]);
    expect(diff.removedSteps.map((step) => step.id)).toEqual(["concept-a"]);
    expect(diff.addedEdges).toEqual([
      { sourceId: "root", targetId: "concept-b" },
      { sourceId: "concept-b", targetId: "target" },
    ]);
    expect(diff.preservedCheckpointCount).toBe(1);

    const migrated = migrateKnowledgeGapJourney(journey, nextPlan, "2026-07-13T01:00:00.000Z");
    expect(migrated.capturedAt).toBe("2026-07-13T00:00:00.000Z");
    expect(migrated.checkpoints.target?.explanation).toBe(true);
    expect(migrated.checkpoints["concept-a"]).toBeUndefined();
    expect(compareKnowledgeGapJourney(migrated, nextPlan).current).toBe(true);
  });

  it("records an explicit keep-previous decision without rewriting the snapshot", () => {
    const firstPlan = buildKnowledgeGapPlan(firstNodes, [], "target", [], 20);
    const nextPlan = buildKnowledgeGapPlan(nextNodes, [], "target", [], 20);
    const journey = createKnowledgeGapJourney(firstPlan, "2026-07-13T00:00:00.000Z");
    const kept = keepPreviousKnowledgeGapJourney(
      journey,
      nextPlan.version.fingerprint,
      "2026-07-13T02:00:00.000Z"
    );

    expect(kept.relationFingerprint).toBe(firstPlan.version.fingerprint);
    expect(kept.steps.map((step) => step.id)).toEqual(["root", "concept-a", "target"]);
    expect(compareKnowledgeGapJourney(kept, nextPlan).decision).toBe("keep-previous");
  });

  it("updates a saved time budget without changing the relationship fingerprint", () => {
    const plan = buildKnowledgeGapPlan(firstNodes, [], "target", [], 20);
    const journey = createKnowledgeGapJourney(plan, "2026-07-13T00:00:00.000Z");
    const updated = updateKnowledgeGapJourneyBudget(journey, 90, "2026-07-13T03:00:00.000Z");
    expect(updated.totalMinutes).toBe(90);
    expect(updated.relationFingerprint).toBe(journey.relationFingerprint);
    expect(updated.capturedAt).toBe(journey.capturedAt);
  });
});
