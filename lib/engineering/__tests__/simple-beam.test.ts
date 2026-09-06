import { describe, expect, it } from "vitest";
import { beamDiagram, beamReactions } from "../simple-beam";

describe("simple beam", () => {
  it("splits a midspan load equally", () => {
    const { leftKn, rightKn } = beamReactions(80, 10, 5);
    expect(leftKn).toBeCloseTo(40);
    expect(rightKn).toBeCloseTo(40);
  });

  it("puts peak moment under the point load", () => {
    const result = beamDiagram(90, 10, 3);
    expect(result.leftKn + result.rightKn).toBeCloseTo(90);
    expect(result.maxMomentXm).toBeCloseTo(3, 5);
    expect(result.maxMomentKnm).toBeCloseTo(result.leftKn * 3);
  });
});
