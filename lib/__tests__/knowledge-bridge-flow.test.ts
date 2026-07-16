import { describe, expect, it } from "vitest";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import { buildKnowledgeBridgeFlows, filterBridgeTransitions } from "@/lib/knowledge-bridge-flow";

const snapshot = buildKnowledgeCoverageSnapshot();

describe("knowledge bridge flows", () => {
  it("groups every directed cross-domain transition without losing counts", () => {
    const flows = buildKnowledgeBridgeFlows(snapshot.bridgeTransitions);
    expect(snapshot.bridgeTransitions).toHaveLength(73);
    expect(flows).toHaveLength(50);
    expect(flows.reduce((sum, flow) => sum + flow.count, 0)).toBe(73);
    expect(new Set(flows.map((flow) => flow.id)).size).toBe(flows.length);

    for (const flow of flows) {
      expect(flow.fromDomain).not.toBe(flow.toDomain);
      expect(flow.transitions).toHaveLength(flow.count);
      expect(flow.levels.reduce((sum, count) => sum + count, 0)).toBe(flow.count);
      expect(flow.evidence.reduce((sum, item) => sum + item.count, 0)).toBe(flow.count);
      expect(
        flow.transitions.every((transition) => transition.fromDomain === flow.fromDomain)
      ).toBe(true);
      expect(flow.transitions.every((transition) => transition.toDomain === flow.toDomain)).toBe(
        true
      );
    }
  });

  it("preserves adjacent levels and traceable path steps", () => {
    const pathIds = new Set(
      snapshot.domains.flatMap((row) => row.references.map((ref) => ref.pathId))
    );
    expect(new Set(snapshot.bridgeTransitions.map((transition) => transition.id)).size).toBe(73);

    for (const transition of snapshot.bridgeTransitions) {
      expect(transition.level).toBe(transition.fromLevel + 1);
      expect(pathIds.has(transition.pathId)).toBe(true);
      expect(transition.fromNodeId).not.toBe(transition.toNodeId);
      expect(transition.transition.trim().length).toBeGreaterThan(0);
    }
  });

  it("filters by target stage and evidence mode before grouping", () => {
    const levelFive = filterBridgeTransitions(snapshot.bridgeTransitions, {
      level: 5,
      evidenceMode: null,
    });
    expect(levelFive).toHaveLength(12);
    expect(
      buildKnowledgeBridgeFlows(snapshot.bridgeTransitions, { level: 5, evidenceMode: null })
    ).toHaveLength(10);

    const comparative = filterBridgeTransitions(snapshot.bridgeTransitions, {
      level: null,
      evidenceMode: "comparative",
    });
    expect(comparative).toHaveLength(21);
    expect(comparative.every((transition) => transition.evidenceMode === "comparative")).toBe(true);
  });
});
