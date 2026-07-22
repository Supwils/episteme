import { describe, expect, it } from "vitest";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import {
  orbitCoordinateKey,
  projectKnowledgeSpineOrbit,
  rotationForOrbitDomain,
  SPINE_ORBIT_VIEWBOX,
} from "@/lib/knowledge-spine-orbit";
import { buildKnowledgeSpineAtlas } from "@/lib/knowledge-spine-atlas";

const atlas = buildKnowledgeSpineAtlas(
  buildLearningPlanCatalog(),
  buildKnowledgeCoverageSnapshot()
);

describe("knowledge spine orbit", () => {
  it("projects every 15 by 5 spine node into the stable view box", () => {
    const projection = projectKnowledgeSpineOrbit(atlas, 0);

    expect(projection.points).toHaveLength(75);
    expect(projection.pointsByCoordinate.size).toBe(75);
    for (const point of projection.points) {
      expect(point.x).toBeGreaterThan(0);
      expect(point.x).toBeLessThan(SPINE_ORBIT_VIEWBOX.width);
      expect(point.y).toBeGreaterThan(0);
      expect(point.y).toBeLessThan(SPINE_ORBIT_VIEWBOX.height);
      expect(point.scale).toBeGreaterThan(0);
      expect(point.opacity).toBeGreaterThan(0);
      expect(point.opacity).toBeLessThanOrEqual(1);
    }
  });

  it("brings a requested domain to the front without changing its five levels", () => {
    const domainIndex = atlas.rows.findIndex((row) => row.domainId === "computer-science");
    const rotation = rotationForOrbitDomain(domainIndex, atlas.rows.length);
    const projection = projectKnowledgeSpineOrbit(atlas, rotation);
    const domainPoints = atlas.rows[domainIndex]!.steps.map(
      (step) =>
        projection.pointsByCoordinate.get(orbitCoordinateKey("computer-science", step.level))!
    );

    expect(domainPoints).toHaveLength(5);
    expect(domainPoints.every((point) => point.z > 0.99)).toBe(true);
    expect(new Set(domainPoints.map((point) => point.y)).size).toBe(5);
    expect(domainPoints.map((point) => point.level)).toEqual([1, 2, 3, 4, 5]);
  });

  it("changes projected depth when the cylinder rotates", () => {
    const initial = projectKnowledgeSpineOrbit(atlas, 0).pointsByCoordinate.get(
      orbitCoordinateKey("physics", 3)
    )!;
    const rotated = projectKnowledgeSpineOrbit(atlas, 90).pointsByCoordinate.get(
      orbitCoordinateKey("physics", 3)
    )!;

    expect(initial.z).not.toBe(rotated.z);
    expect(initial.x).not.toBe(rotated.x);
  });

  it("changes vertical perspective without changing semantic coordinates", () => {
    const shallow = projectKnowledgeSpineOrbit(atlas, 90, 0.5).pointsByCoordinate.get(
      orbitCoordinateKey("physics", 3)
    )!;
    const deep = projectKnowledgeSpineOrbit(atlas, 90, 1.6).pointsByCoordinate.get(
      orbitCoordinateKey("physics", 3)
    )!;

    expect(deep.x).toBe(shallow.x);
    expect(deep.z).toBe(shallow.z);
    expect(deep.y).not.toBe(shallow.y);
  });
});
