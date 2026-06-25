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

describe("thought tours", () => {
  it("has at least a few curated tours", () => {
    expect(THOUGHT_TOURS.length).toBeGreaterThanOrEqual(5);
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
