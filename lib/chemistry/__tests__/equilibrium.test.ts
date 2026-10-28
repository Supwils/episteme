import { describe, expect, it } from "vitest";
import { chemistryLabInvite } from "../article-lab-invites";
import { clampQuotient, direction, drivingForce } from "../equilibrium";

describe("reaction quotient against the equilibrium constant", () => {
  it("treats Q = K as equilibrium", () => {
    expect(direction(1, 1)).toBe("equilibrium");
    expect(drivingForce(1, 1)).toBe(0);
  });

  it("points a quotient above K back toward reactants", () => {
    expect(direction(2, 1)).toBe("reactants");
    expect(drivingForce(2, 1)).toBeLessThan(0);
    expect(drivingForce(2, 1)).toBeCloseTo(Math.log(0.5), 12);
  });

  it("points a quotient below K toward products", () => {
    expect(direction(0.5, 1)).toBe("products");
    expect(drivingForce(0.5, 1)).toBeGreaterThan(0);
    expect(drivingForce(0.5, 1)).toBeCloseTo(Math.log(2), 12);
  });

  it("clamps non-finite and out-of-range dials before the logarithm", () => {
    expect(clampQuotient(Number.NaN)).toBe(0.1);
    expect(clampQuotient(Number.POSITIVE_INFINITY)).toBe(10);
    expect(clampQuotient(Number.NEGATIVE_INFINITY)).toBe(0.1);
    expect(clampQuotient(0)).toBe(0.1);
    expect(clampQuotient(40)).toBe(10);
    expect(direction(Number.POSITIVE_INFINITY, 1)).toBe("reactants");
    expect(drivingForce(Number.POSITIVE_INFINITY, 1)).toBeLessThan(0);
    expect(direction(Number.NEGATIVE_INFINITY, 1)).toBe("products");
    expect(drivingForce(Number.NaN, Number.NaN)).toBe(0);
    expect(Number.isFinite(drivingForce(0, Number.NEGATIVE_INFINITY))).toBe(true);
  });

  it("treats a negligible log ratio as equilibrium even when Q is slightly larger", () => {
    const q = Math.exp(1e-12);
    expect(q).toBeGreaterThan(1);
    expect(Math.abs(Math.log(q / 1))).toBeLessThan(1e-9);
    expect(direction(q, 1)).toBe("equilibrium");
  });
});

describe("chemistry lab invite", () => {
  it("points the equilibrium and thermodynamics articles at the schematic", () => {
    expect(chemistryLabInvite("concepts", "chemical-equilibrium")).toEqual({
      href: "/chemistry/equilibrium-lab",
      label: "平衡方向示意",
      tease: "改反应商和平衡常数，看净变化朝哪一侧。不是测定，也不是操作步骤。",
    });
    expect(chemistryLabInvite("concepts", "chemical-thermodynamics")?.href).toBe(
      "/chemistry/equilibrium-lab"
    );
    expect(chemistryLabInvite("concepts", "acids-and-bases")).toBeNull();
  });
});
