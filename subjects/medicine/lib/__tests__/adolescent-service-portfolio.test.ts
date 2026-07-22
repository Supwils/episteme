import { describe, expect, it } from "vitest";
import {
  ADOLESCENT_SERVICE_SCENARIOS,
  DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS,
  evaluateAdolescentServicePortfolio,
  selectAdolescentServicePortfolio,
} from "../adolescent-service-portfolio";

describe("adolescent school-community service portfolio teaching model", () => {
  it("respects budget, equity floor and pathway requirements in every feasible scenario", () => {
    for (const scenario of ADOLESCENT_SERVICE_SCENARIOS) {
      const portfolio = selectAdolescentServicePortfolio(scenario.constraints);

      expect(portfolio.isFeasible).toBe(true);
      expect(portfolio.totalCostUnits).toBeLessThanOrEqual(
        scenario.constraints.budgetUnits
      );
      expect(portfolio.underservedBenefitShare).toBeGreaterThanOrEqual(
        scenario.constraints.minimumUnderservedShare
      );
      if (scenario.constraints.requireCompletePathway) {
        expect(portfolio.hasCompletePathway).toBe(true);
      }
    }
  });

  it("requires entry, matched care and continuity when a complete pathway is requested", () => {
    const portfolio = selectAdolescentServicePortfolio(
      DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS
    );
    const selectedIds = portfolio.options.map((option) => option.id);

    expect(selectedIds).toContain("youth-friendly-entry");
    expect(selectedIds).toContain("matched-clinical-care");
    expect(selectedIds).toContain("continuity-navigation");
    expect(portfolio.hasCompletePathway).toBe(true);
  });

  it("makes downstream capacity less productive when entry and continuity are absent", () => {
    const unconstrained = {
      budgetUnits: 40,
      equityWeight: 1,
      minimumUnderservedShare: 0,
      requireCompletePathway: false,
    };
    const isolated = evaluateAdolescentServicePortfolio(
      ["matched-clinical-care"],
      unconstrained
    );
    const connected = evaluateAdolescentServicePortfolio(
      [
        "whole-school-climate",
        "youth-friendly-entry",
        "matched-clinical-care",
        "continuity-navigation",
      ],
      unconstrained
    );

    expect(isolated.options[0]!.pathwayModifier).toBe(0.7);
    expect(
      connected.options.find((option) => option.id === "matched-clinical-care")!
        .pathwayModifier
    ).toBeGreaterThan(1);
  });

  it("can make a complete package infeasible when a pivotal cost assumption rises", () => {
    const stressed = selectAdolescentServicePortfolio(
      DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS,
      {
        "matched-clinical-care": { costMultiplier: 1.5 },
      }
    );

    expect(stressed.isFeasible).toBe(false);
    expect(stressed.options).toHaveLength(0);
  });

  it("selects community outreach when the underserved-benefit floor is high", () => {
    const equityScenario = ADOLESCENT_SERVICE_SCENARIOS.find(
      (scenario) => scenario.id === "equity-network"
    )!;
    const portfolio = selectAdolescentServicePortfolio(equityScenario.constraints);

    expect(portfolio.options.map((option) => option.id)).toContain(
      "community-youth-outreach"
    );
  });
});
