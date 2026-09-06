import { describe, expect, it } from "vitest";
import { solveDcPowerFlow } from "../dc-power-flow";
import { solveLinear } from "../linear-solve";

describe("solveLinear", () => {
  it("solves a small identity system", () => {
    expect(
      solveLinear(
        [
          [2, 0],
          [0, 4],
        ],
        [2, 8]
      )
    ).toEqual([1, 2]);
  });
});

describe("solveDcPowerFlow", () => {
  it("keeps generation equal to load via the slack bus", () => {
    const result = solveDcPowerFlow({
      thermalMw: 70,
      windMw: 25,
      cityMw: 55,
      industryMw: 40,
    });
    const specified = 70 + 25 - 55 - 40;
    expect(result.slackMw + specified).toBeCloseTo(0, 8);
    expect(result.lineFlows).toHaveLength(6);
  });

  it("overloads a corridor when remote wind and industry rise together", () => {
    const calm = solveDcPowerFlow({
      thermalMw: 80,
      windMw: 10,
      cityMw: 50,
      industryMw: 30,
    });
    const stressed = solveDcPowerFlow({
      thermalMw: 20,
      windMw: 90,
      cityMw: 40,
      industryMw: 80,
    });
    expect(calm.overloadCount).toBe(0);
    expect(stressed.overloadCount).toBeGreaterThan(0);
  });
});
