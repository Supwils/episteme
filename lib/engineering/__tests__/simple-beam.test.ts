import { describe, expect, it } from "vitest";
import { beamDiagram, beamReactions } from "../simple-beam";
import { engineeringLabInvite } from "../article-lab-invites";

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

describe("article lab invites", () => {
  it("sends grid articles to the flow lab and chips to the process lab", () => {
    expect(engineeringLabInvite("energy", "power-grid").href).toBe("/engineering/grid-flow");
    expect(engineeringLabInvite("materials", "semiconductor-manufacturing").href).toBe(
      "/engineering/chip-process"
    );
    expect(engineeringLabInvite("frontier", "low-carbon-cement-circularity").href).toBe(
      "/engineering/materials-profile"
    );
    expect(engineeringLabInvite("frontier", "solid-state-battery-manufacturing").href).toBe(
      "/engineering/grid-flow"
    );
    expect(engineeringLabInvite("frontier", "embodied-ai-robot-reliability").href).toBe(
      "/engineering/chip-process"
    );
  });
});
