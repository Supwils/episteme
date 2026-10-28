import { describe, expect, it } from "vitest";
import { sociologyLabInvite } from "../article-lab-invites";
import {
  destinationCounts,
  formatSharePercent,
  mixShares,
  MOBILITY_COHORT,
  MOBILITY_MOTION_MS,
  mobilityReadout,
  startShareMotion,
  stepOrigin,
} from "../mobility";

describe("intergenerational mobility shares", () => {
  it("turns openness into exact schematic destination counts", () => {
    expect(destinationCounts(0, 0)).toEqual([300, 0, 0]);
    expect(destinationCounts(1, 0)).toEqual([0, 300, 0]);
    expect(destinationCounts(2, 40)).toEqual([40, 40, 220]);
    expect(destinationCounts(0, 100)).toEqual([100, 100, 100]);
    expect(destinationCounts(1, 1.6)).toEqual([2, 296, 2]);
    expect(destinationCounts(0, Number.NaN)).toEqual([300, 0, 0]);
    expect(destinationCounts(2, 140)).toEqual([100, 100, 100]);

    for (const origin of [0, 1, 2] as const) {
      for (const openness of [0, 1, 40, 75, 99, 100]) {
        const shares = destinationCounts(origin, openness);
        expect(shares.reduce((sum, count) => sum + count, 0)).toBe(MOBILITY_COHORT);
      }
    }
  });

  it("formats counts as illustrative percents without inventing a survey", () => {
    expect(formatSharePercent(300)).toBe("100%");
    expect(formatSharePercent(220)).toBe("73.3%");
    expect(formatSharePercent(40)).toBe("13.3%");
    expect(formatSharePercent(100)).toBe("33.3%");
    expect(mobilityReadout(0, 40)).toBe(
      "出身下层，开放度 40。下层 220 人，中层 40 人，上层 40 人。示意队列，不是调查。"
    );
  });

  it("moves origin with arrow, home, and end keys", () => {
    expect(stepOrigin(2, "ArrowRight")).toBe(0);
    expect(stepOrigin(0, "ArrowLeft")).toBe(2);
    expect(stepOrigin(1, "Home")).toBe(0);
    expect(stepOrigin(0, "End")).toBe(2);
    expect(stepOrigin(1, "Enter")).toBeNull();
  });

  it("settles reduced motion on the target without a frame or a clock", () => {
    const applied: number[][] = [];
    const stop = startShareMotion(
      true,
      [300, 0, 0],
      [100, 100, 100],
      (shares) => applied.push([...shares]),
      () => {
        throw new Error("reduced motion requested a frame");
      },
      () => {
        throw new Error("reduced motion cancelled a frame");
      },
      () => {
        throw new Error("reduced motion read the clock");
      }
    );

    expect(applied).toEqual([[100, 100, 100]]);
    expect(stop()).toBeUndefined();
  });

  it("waits for a frame before applying shares when motion is allowed", () => {
    const frames: Array<(time: number) => void> = [];
    const applied: number[][] = [];
    let cancelled = 0;
    startShareMotion(
      false,
      [300, 0, 0],
      [220, 40, 40],
      (shares) => applied.push([...shares]),
      (callback) => {
        frames.push(callback);
        return frames.length;
      },
      () => {
        cancelled += 1;
      },
      () => 1000
    );

    expect(applied).toEqual([]);
    expect(frames).toHaveLength(1);
    frames[0]!(1000 + MOBILITY_MOTION_MS / 2);
    expect(applied).toEqual([mixShares([300, 0, 0], [220, 40, 40], 0.5)]);
    frames[1]!(1000 + MOBILITY_MOTION_MS);
    expect(applied[1]).toEqual([220, 40, 40]);
    expect(frames).toHaveLength(2);
    expect(cancelled).toBe(0);
  });
});

describe("sociology lab invite", () => {
  it("points stratification and credential articles at the schematic lab", () => {
    expect(sociologyLabInvite("concepts", "social-stratification")?.href).toBe(
      "/sociology/mobility-lab"
    );
    expect(sociologyLabInvite("institutions", "education-and-credentialism")?.href).toBe(
      "/sociology/mobility-lab"
    );
    expect(sociologyLabInvite("methods", "survey-research")).toBeNull();
  });
});
