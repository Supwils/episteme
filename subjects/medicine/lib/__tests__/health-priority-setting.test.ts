import { describe, expect, it } from "vitest";
import {
  PRIORITY_INTERVENTIONS,
  assumedCostMillions,
  assumedQalys,
  equityAdjustedQalys,
  selectPriorityPortfolio,
} from "../health-priority-setting";

describe("health priority setting teaching model", () => {
  it("never spends beyond the selected budget", () => {
    const portfolio = selectPriorityPortfolio(24, 1.5, false);
    expect(portfolio.totalCostMillions).toBeLessThanOrEqual(24);
    expect(portfolio.remainingBudgetMillions).toBeGreaterThanOrEqual(0);
  });

  it("makes the equity adjustment explicit and monotonic", () => {
    const outreach = PRIORITY_INTERVENTIONS.find(
      (intervention) => intervention.id === "immunization-outreach"
    );
    expect(outreach).toBeDefined();
    expect(equityAdjustedQalys(outreach!, 2)).toBeGreaterThan(equityAdjustedQalys(outreach!, 1));
  });

  it("reserves a portfolio place for very severe conditions when requested", () => {
    const portfolio = selectPriorityPortfolio(24, 1, true);
    expect(
      portfolio.interventions.some((intervention) => intervention.severity === "very-high")
    ).toBe(true);
  });

  it("applies explicit cost and effect assumptions without mutating baseline inputs", () => {
    const intervention = PRIORITY_INTERVENTIONS[0]!;
    const assumptions = {
      [intervention.id]: { costMultiplier: 1.25, effectMultiplier: 0.8 },
    };

    expect(assumedCostMillions(intervention, assumptions)).toBe(intervention.costMillions * 1.25);
    expect(assumedQalys(intervention, assumptions)).toBe(intervention.expectedQalys * 0.8);
    expect(intervention.costMillions).toBe(6);
    expect(intervention.expectedQalys).toBe(1100);
  });

  it("can change the selected portfolio when assumptions cross a decision threshold", () => {
    const baseline = selectPriorityPortfolio(24, 1, false);
    const stressed = selectPriorityPortfolio(24, 1, false, {
      "advanced-cancer-access": { costMultiplier: 0.5, effectMultiplier: 1.5 },
    });

    expect(stressed.interventions.map((item) => item.id)).not.toEqual(
      baseline.interventions.map((item) => item.id)
    );
  });
});
