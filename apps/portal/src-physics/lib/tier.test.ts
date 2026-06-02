import { describe, expect, it } from "vitest";
import {
  nextTier,
  prevTier,
  TIER_ORDER,
  TIERS,
  tierIndex,
  transitionKind,
  type TierId,
} from "./tier";

describe("tier ordering", () => {
  it("has 8 tiers in order T0..T7", () => {
    expect(TIER_ORDER).toEqual(["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"]);
  });

  it("tierIndex matches array position", () => {
    for (const [i, id] of TIER_ORDER.entries()) {
      expect(tierIndex(id)).toBe(i);
    }
  });

  it("nextTier wraps to null at T7", () => {
    expect(nextTier("T0")).toBe("T1");
    expect(nextTier("T6")).toBe("T7");
    expect(nextTier("T7")).toBeNull();
  });

  it("prevTier wraps to null at T0", () => {
    expect(prevTier("T0")).toBeNull();
    expect(prevTier("T1")).toBe("T0");
    expect(prevTier("T7")).toBe("T6");
  });

  it("scale decreases monotonically T0..T7", () => {
    let last = Infinity;
    for (const id of TIER_ORDER) {
      const scale = TIERS[id as TierId].scaleMeters;
      expect(scale).toBeLessThan(last);
      last = scale;
    }
  });
});

describe("transitionKind", () => {
  it("respects the design table for adjacent forward jumps", () => {
    expect(transitionKind("T0", "T1")).toBe("tunnel");
    expect(transitionKind("T1", "T2")).toBe("dissolve");
    expect(transitionKind("T2", "T3")).toBe("dissolve");
    expect(transitionKind("T3", "T4")).toBe("zoom");
    expect(transitionKind("T4", "T5")).toBe("dissolve");
    expect(transitionKind("T5", "T6")).toBe("tunnel");
    expect(transitionKind("T6", "T7")).toBe("zoom");
  });

  it("is symmetric for adjacent reverse jumps", () => {
    expect(transitionKind("T4", "T3")).toBe("zoom");
    expect(transitionKind("T7", "T6")).toBe("zoom");
    expect(transitionKind("T1", "T0")).toBe("tunnel");
  });

  it("uses tunnel for non-adjacent jumps", () => {
    expect(transitionKind("T0", "T5")).toBe("tunnel");
    expect(transitionKind("T2", "T6")).toBe("tunnel");
  });
});
