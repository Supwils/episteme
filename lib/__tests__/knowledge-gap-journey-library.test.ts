import { describe, expect, it } from "vitest";
import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeGapPlan } from "../knowledge-gap-plan";
import {
  createKnowledgeGapJourney,
  keepPreviousKnowledgeGapJourney,
  updateKnowledgeGapCheckpoint,
} from "../knowledge-gap-journey";
import {
  getKnowledgeGapJourneyLifecycle,
  summarizeKnowledgeGapJourneyEvidence,
} from "../knowledge-gap-journey-library";

function node(id: string, level: 1 | 2, prerequisiteIds: string[] = []): GraphNode {
  return {
    id,
    label: id,
    domain: "sociology",
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

const firstPlan = buildKnowledgeGapPlan(
  [node("root", 1), node("target", 2, ["root"])],
  [],
  "target",
  [],
  45
);
const nextPlan = buildKnowledgeGapPlan(
  [node("new-root", 1), node("target", 2, ["new-root"])],
  [],
  "target",
  [],
  45
);

describe("knowledge gap journey library", () => {
  it("classifies route lifecycle against the current plan", () => {
    const journey = createKnowledgeGapJourney(firstPlan, "2026-07-13T00:00:00.000Z");
    expect(getKnowledgeGapJourneyLifecycle(journey, firstPlan)).toBe("current");
    expect(getKnowledgeGapJourneyLifecycle(journey, nextPlan)).toBe("pending");
    expect(getKnowledgeGapJourneyLifecycle(journey, undefined)).toBe("unknown");
    expect(
      getKnowledgeGapJourneyLifecycle(
        keepPreviousKnowledgeGapJourney(journey, nextPlan.version.fingerprint),
        nextPlan
      )
    ).toBe("keep-previous");
  });

  it("reports checklist evidence and the next explicit action without a score", () => {
    let journey = createKnowledgeGapJourney(firstPlan, "2026-07-13T00:00:00.000Z");
    journey = updateKnowledgeGapCheckpoint(journey, "root", { reading: true });
    const summary = summarizeKnowledgeGapJourneyEvidence(journey, new Set());
    expect(summary).toEqual({
      state: "in-progress",
      recordedCount: 1,
      possibleCount: 8,
      nextTodo: "root · 完成练习",
    });
    expect(summarizeKnowledgeGapJourneyEvidence(journey, new Set(["root"])).nextTodo).toBe(
      "target · 阅读正文"
    );
  });
});
