import { describe, expect, it } from "vitest";
import {
  MENTAL_HEALTH_COMPARISON_CHECKPOINTS,
  MENTAL_HEALTH_COMPARISON_ROUTES,
} from "@/lib/mental-health-tour-comparison";
import { ADOLESCENT_MENTAL_HEALTH_TOUR } from "@/subjects/knowledge-graph/data/adolescent-mental-health-tour";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { MENTAL_HEALTH_CARE_TOUR } from "@/subjects/knowledge-graph/data/mental-health-care-tour";

const tours = new Map(
  [MENTAL_HEALTH_CARE_TOUR, ADOLESCENT_MENTAL_HEALTH_TOUR].map((tour) => [tour.id, tour])
);
const nodes = new Map(ALL_NODES.map((node) => [node.id, node]));

describe("mental health tour comparison", () => {
  it("defines seven checkpoints with three real shared anchors", () => {
    expect(MENTAL_HEALTH_COMPARISON_CHECKPOINTS).toHaveLength(7);
    expect(
      MENTAL_HEALTH_COMPARISON_CHECKPOINTS.filter((checkpoint) => checkpoint.kind === "shared")
    ).toHaveLength(3);
    expect(
      MENTAL_HEALTH_COMPARISON_CHECKPOINTS.filter((checkpoint) => checkpoint.kind === "shared").map(
        (checkpoint) => checkpoint.left.nodeId
      )
    ).toEqual([
      "sociology:social-support-mental-health",
      "medicine:community-mental-health-access-continuity",
      "medicine:informed-consent",
    ]);
    expect(
      MENTAL_HEALTH_COMPARISON_CHECKPOINTS.filter((checkpoint) => checkpoint.kind === "shared").every(
        (checkpoint) => checkpoint.left.nodeId === checkpoint.right.nodeId
      )
    ).toBe(true);
  });

  it("keeps each comparison side aligned with the real tour step and graph article", () => {
    for (const checkpoint of MENTAL_HEALTH_COMPARISON_CHECKPOINTS) {
      for (const side of [checkpoint.left, checkpoint.right]) {
        const tour = tours.get(side.routeId);
        const node = nodes.get(side.nodeId);

        expect(tour, side.routeId).toBeDefined();
        expect(tour?.waypoints[side.step - 1], `${checkpoint.id}:${side.routeId}`).toBe(side.nodeId);
        expect(node, side.nodeId).toBeDefined();
        expect(node?.url, side.nodeId).toBe(side.articleHref);
        expect(side.tourHref).toContain(`tourId=${side.routeId}`);
        expect(side.tourHref).toContain(`step=${side.step}`);
        expect(side.tourHref).toContain(`focus=${encodeURIComponent(side.nodeId)}`);
      }
    }
  });

  it("keeps route summaries aligned with the source tours", () => {
    expect(MENTAL_HEALTH_COMPARISON_ROUTES).toHaveLength(2);
    for (const route of MENTAL_HEALTH_COMPARISON_ROUTES) {
      const tour = tours.get(route.id);
      expect(tour).toBeDefined();
      expect(route.stepCount).toBe(tour?.waypoints.length);
      expect(route.href).toContain("layout=spatial");
      expect(route.href).toContain("source=route-comparison");
    }
  });
});
