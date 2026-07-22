import { describe, expect, it } from "vitest";
import {
  buildMentalHealthAccessCascade,
  DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
  MENTAL_HEALTH_ACCESS_SCENARIOS,
} from "../mental-health-access";

describe("mental health effective coverage teaching model", () => {
  it("builds a monotonic five-stage cascade", () => {
    const cascade = buildMentalHealthAccessCascade(DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS);

    expect(cascade.stages).toHaveLength(5);
    expect(cascade.stages.map((stage) => stage.id)).toEqual([
      "need",
      "recognized",
      "first-contact",
      "continued-care",
      "effective-response",
    ]);
    for (let index = 1; index < cascade.stages.length; index++) {
      expect(cascade.stages[index]!.overallCount).toBeLessThanOrEqual(
        cascade.stages[index - 1]!.overallCount
      );
    }
  });

  it("treats stage rates as a multiplicative chain", () => {
    const assumptions = {
      ...DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
      population: 10_000,
      underservedShare: 0,
      underservedAccessGap: 0,
      recognitionRate: 0.7,
      firstContactRate: 0.7,
      continuityRate: 0.7,
      responseRate: 0.7,
    };
    const cascade = buildMentalHealthAccessCascade(assumptions);

    expect(cascade.effectiveCoverageRate).toBeCloseTo(0.7 ** 4, 8);
    expect(cascade.stages.at(-1)!.overallCount).toBeCloseTo(2_401, 8);
  });

  it("reports the access gap without changing the conditional response assumption", () => {
    const cascade = buildMentalHealthAccessCascade(DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS);

    expect(cascade.underservedEffectiveCoverageRate).toBeLessThan(
      cascade.generalEffectiveCoverageRate
    );
    expect(cascade.equityGapPercentagePoints).toBeGreaterThan(0);
  });

  it("keeps every preset bounded and improves coverage in the community network scenario", () => {
    const results = MENTAL_HEALTH_ACCESS_SCENARIOS.map((scenario) =>
      buildMentalHealthAccessCascade(scenario.assumptions)
    );

    for (const result of results) {
      expect(result.effectiveCoverageRate).toBeGreaterThanOrEqual(0);
      expect(result.effectiveCoverageRate).toBeLessThanOrEqual(1);
      expect(result.stages[0]!.overallCount).toBe(10_000);
    }
    expect(results.at(-1)!.effectiveCoverageRate).toBeGreaterThan(
      results[0]!.effectiveCoverageRate
    );
  });
});
