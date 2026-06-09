import { describe, expect, it } from "vitest";
import {
  HW_VIEWBOX,
  HW_VIEWBOX_STRING,
  depthToOpacity,
  hash01,
  projectForTier,
  projectToSvg,
  wrapAngle,
} from "./handwritten-coords";

describe("HW_VIEWBOX", () => {
  it("is square and origin-centred", () => {
    expect(HW_VIEWBOX.w).toBe(HW_VIEWBOX.h);
    expect(HW_VIEWBOX.x).toBe(-HW_VIEWBOX.w / 2);
    expect(HW_VIEWBOX_STRING).toBe(
      `${HW_VIEWBOX.x} ${HW_VIEWBOX.y} ${HW_VIEWBOX.w} ${HW_VIEWBOX.h}`,
    );
  });
});

describe("projectToSvg", () => {
  it("orthographic uses x, z and keeps y as depth", () => {
    const p = projectToSvg([0.5, 0.2, -0.3], { projection: "orthographic", scale: 100 });
    expect(p.x).toBeCloseTo(50);
    expect(p.y).toBeCloseTo(-30);
    expect(p.depth).toBeCloseTo(0.2);
  });

  it("polar maps unit vectors to circle of radius=scale", () => {
    const p = projectToSvg([1, 0, 0], { projection: "polar", scale: 200 });
    expect(p.x).toBeCloseTo(200);
    expect(p.y).toBeCloseTo(0);
  });

  it("polar handles points on z-axis", () => {
    const p = projectToSvg([0, 0, 1], { projection: "polar", scale: 200 });
    expect(p.x).toBeCloseTo(0, 5);
    expect(p.y).toBeCloseTo(200);
  });

  it("ecliptic discards y", () => {
    const p = projectToSvg([0.4, 99, 0.6], { projection: "ecliptic", scale: 100 });
    expect(p.x).toBeCloseTo(40);
    expect(p.y).toBeCloseTo(60);
    expect(p.depth).toBeCloseTo(99);
  });

  it("default scale of 380 applies when scale omitted", () => {
    const p = projectToSvg([1, 0, 0]);
    expect(p.x).toBeCloseTo(380);
  });

  it("origin always maps to origin", () => {
    for (const proj of ["orthographic", "polar", "ecliptic"] as const) {
      const p = projectToSvg([0, 0, 0], { projection: proj });
      expect(p.x).toBeCloseTo(0);
      expect(p.y).toBeCloseTo(0);
    }
  });
});

describe("projectForTier", () => {
  it("uses polar for T0", () => {
    const p = projectForTier("T0", [1, 0, 0]);
    expect(p.x).toBeCloseTo(360);
  });
  it("uses ecliptic for T6", () => {
    const p = projectForTier("T6", [0.5, 99, -0.5]);
    expect(p.x).toBeCloseTo(180);
    expect(p.y).toBeCloseTo(-180);
    expect(p.depth).toBeCloseTo(99);
  });
});

describe("depthToOpacity", () => {
  it("returns mid value at depth 0", () => {
    expect(depthToOpacity(0)).toBeCloseTo(0.55, 2);
  });
  it("approaches 1 for large positive depth", () => {
    expect(depthToOpacity(10)).toBeGreaterThan(0.95);
  });
  it("approaches floor for large negative depth", () => {
    expect(depthToOpacity(-10)).toBeLessThan(0.15);
  });
});

describe("hash01", () => {
  it("is deterministic and within [0, 1)", () => {
    for (let i = 0; i < 50; i++) {
      const h = hash01(i);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThan(1);
      expect(hash01(i)).toBe(h);
    }
  });
});

describe("wrapAngle", () => {
  it("wraps 3π → π", () => {
    expect(wrapAngle(3 * Math.PI)).toBeCloseTo(Math.PI);
  });
  it("wraps -3π → -π", () => {
    expect(wrapAngle(-3 * Math.PI)).toBeCloseTo(-Math.PI);
  });
  it("leaves in-range angles untouched", () => {
    expect(wrapAngle(0.5)).toBeCloseTo(0.5);
  });
});
