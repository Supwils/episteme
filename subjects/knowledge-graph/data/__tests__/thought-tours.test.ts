import { describe, it, expect } from "vitest";
import { buildAdjacency, findShortestPath } from "@/lib/graph-engine";
import { ALL_NODES, ALL_EDGES } from "../graph-data";
import { THOUGHT_TOURS } from "../thought-tours";

// The "连接引擎" thought tours stitch shortest paths between curated waypoints.
// If content edits remove a waypoint node or sever a connecting edge, a tour
// would silently render nothing. These tests guard that invariant so the
// flagship Connection Engine cannot regress unnoticed.

const nodeIds = new Set(ALL_NODES.map((n) => n.id));
const adjacency = buildAdjacency(ALL_EDGES);
const toursRequiringExplanationSteps = new Set([
  "global-south-political-economy",
  "modern-macro-diagnosis",
  "country-macro-map",
  "macro-politics-psychology",
  "how-to-study-politics",
  "population-health-systems",
  "proof-to-trustworthy-software",
  "equations-to-interpretable-ai",
  "molecule-to-clinical-evidence",
  "how-psychology-builds-evidence",
  "from-climate-signal-to-fair-adaptation",
  "from-molecular-evidence-to-safe-process",
]);

describe("thought tours", () => {
  it("has at least a few curated tours", () => {
    expect(THOUGHT_TOURS.length).toBeGreaterThanOrEqual(5);
  });

  it("keeps high-value learning routes explained as readable step cards", () => {
    const missing = THOUGHT_TOURS.filter(
      (tour) => toursRequiringExplanationSteps.has(tour.id) && !tour.steps
    ).map((tour) => tour.id);
    expect(missing, `missing route explanation steps: ${missing.join(", ")}`).toEqual([]);
  });

  for (const tour of THOUGHT_TOURS) {
    describe(`${tour.title} (${tour.id})`, () => {
      it("references at least two waypoints", () => {
        expect(tour.waypoints.length).toBeGreaterThanOrEqual(2);
      });

      it("every waypoint resolves to a real graph node", () => {
        const missing = tour.waypoints.filter((id) => !nodeIds.has(id));
        expect(missing, `missing waypoints: ${missing.join(", ")}`).toEqual([]);
      });

      it("keeps route explanation cards aligned with real waypoints", () => {
        if (!tour.steps) return;
        const waypointIds = new Set(tour.waypoints);
        expect(tour.steps.length).toBeGreaterThanOrEqual(2);
        for (const step of tour.steps) {
          expect(nodeIds.has(step.nodeId), `missing step node: ${step.nodeId}`).toBe(true);
          expect(waypointIds.has(step.nodeId), `step is not a waypoint: ${step.nodeId}`).toBe(true);
          expect(step.title.trim().length).toBeGreaterThan(0);
          expect(step.summary.trim().length).toBeGreaterThan(20);
          expect(step.focus.trim().length).toBeGreaterThan(0);
        }
      });

      it("consecutive waypoints are connected, so the tour stitches a real path", () => {
        for (let i = 0; i < tour.waypoints.length - 1; i++) {
          const a = tour.waypoints[i]!;
          const b = tour.waypoints[i + 1]!;
          const path = findShortestPath(a, b, adjacency);
          expect(path, `no path between ${a} and ${b}`).not.toBeNull();
          expect(path!.length).toBeGreaterThanOrEqual(2);
        }
      });
    });
  }
});
