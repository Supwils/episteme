import { ADOLESCENT_SERVICE_OPTIONS } from "./adolescent-service-options";

export type AdolescentServiceOptionId =
  | "whole-school-climate"
  | "targeted-early-support"
  | "community-youth-outreach"
  | "youth-friendly-entry"
  | "matched-clinical-care"
  | "continuity-navigation";

export type AdolescentServiceLayer =
  | "promotion"
  | "early-support"
  | "outreach"
  | "entry"
  | "care"
  | "continuity";

export type AdolescentServiceOption = {
  id: AdolescentServiceOptionId;
  title: string;
  shortTitle: string;
  layer: AdolescentServiceLayer;
  costUnits: number;
  benefitUnits: number;
  underservedShare: number;
  mechanism: string;
  implementationConstraint: string;
};

export type AdolescentServiceAssumption = {
  costMultiplier: number;
  effectMultiplier: number;
};

export type AdolescentServiceAssumptions = Partial<
  Record<AdolescentServiceOptionId, Partial<AdolescentServiceAssumption>>
>;

export type AdolescentServiceConstraints = {
  budgetUnits: number;
  equityWeight: number;
  minimumUnderservedShare: number;
  requireCompletePathway: boolean;
};

export type RealizedAdolescentServiceOption = AdolescentServiceOption & {
  assumedCostUnits: number;
  assumedBenefitUnits: number;
  pathwayModifier: number;
  realizedBenefitUnits: number;
  equityAdjustedBenefitUnits: number;
};

export type AdolescentServicePortfolio = {
  options: readonly RealizedAdolescentServiceOption[];
  totalCostUnits: number;
  remainingBudgetUnits: number;
  realizedBenefitUnits: number;
  equityAdjustedBenefitUnits: number;
  underservedBenefitShare: number;
  hasCompletePathway: boolean;
  isFeasible: boolean;
};

export type AdolescentServiceScenario = {
  id: string;
  label: string;
  description: string;
  constraints: AdolescentServiceConstraints;
};

export {
  ADOLESCENT_SERVICE_OPTIONS,
  ADOLESCENT_SERVICE_SCENARIOS,
  DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS,
} from "./adolescent-service-options";

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function hasOption(
  selectedIds: ReadonlySet<AdolescentServiceOptionId>,
  id: AdolescentServiceOptionId
): boolean {
  return selectedIds.has(id);
}

function pathwayModifier(
  optionId: AdolescentServiceOptionId,
  selectedIds: ReadonlySet<AdolescentServiceOptionId>
): number {
  switch (optionId) {
    case "whole-school-climate":
      return 1;
    case "targeted-early-support":
      return (
        (hasOption(selectedIds, "whole-school-climate") ? 1.08 : 1) *
        (hasOption(selectedIds, "youth-friendly-entry") ? 1 : 0.82)
      );
    case "community-youth-outreach":
      return hasOption(selectedIds, "youth-friendly-entry") ? 1.12 : 0.76;
    case "youth-friendly-entry":
      return hasOption(selectedIds, "matched-clinical-care") ? 1.1 : 0.8;
    case "matched-clinical-care":
      return (
        (hasOption(selectedIds, "youth-friendly-entry") ? 1.12 : 0.7) *
        (hasOption(selectedIds, "continuity-navigation") ? 1.08 : 1)
      );
    case "continuity-navigation":
      return hasOption(selectedIds, "matched-clinical-care") ? 1.15 : 0.7;
  }
}

export function isCompleteAdolescentServicePathway(
  selectedIds: ReadonlySet<AdolescentServiceOptionId>
): boolean {
  const hasReachLayer = [
    "whole-school-climate",
    "targeted-early-support",
    "community-youth-outreach",
  ].some((id) => selectedIds.has(id as AdolescentServiceOptionId));

  return (
    hasReachLayer &&
    selectedIds.has("youth-friendly-entry") &&
    selectedIds.has("matched-clinical-care") &&
    selectedIds.has("continuity-navigation")
  );
}

function portfolioFrom(
  options: readonly AdolescentServiceOption[],
  constraints: AdolescentServiceConstraints,
  assumptions: AdolescentServiceAssumptions
): AdolescentServicePortfolio {
  const selectedIds = new Set(options.map((option) => option.id));
  const equityWeight = clamp(constraints.equityWeight, 1, 3);
  const realizedOptions = options.map((option): RealizedAdolescentServiceOption => {
    const assumedCostUnits =
      option.costUnits * (assumptions[option.id]?.costMultiplier ?? 1);
    const assumedBenefitUnits =
      option.benefitUnits * (assumptions[option.id]?.effectMultiplier ?? 1);
    const modifier = pathwayModifier(option.id, selectedIds);
    const realizedBenefitUnits = assumedBenefitUnits * modifier;

    return {
      ...option,
      assumedCostUnits,
      assumedBenefitUnits,
      pathwayModifier: modifier,
      realizedBenefitUnits,
      equityAdjustedBenefitUnits:
        realizedBenefitUnits * (1 + (equityWeight - 1) * option.underservedShare),
    };
  });
  const totalCostUnits = realizedOptions.reduce(
    (total, option) => total + option.assumedCostUnits,
    0
  );
  const realizedBenefitUnits = realizedOptions.reduce(
    (total, option) => total + option.realizedBenefitUnits,
    0
  );
  const underservedBenefitUnits = realizedOptions.reduce(
    (total, option) => total + option.realizedBenefitUnits * option.underservedShare,
    0
  );
  const hasCompletePathway = isCompleteAdolescentServicePathway(selectedIds);
  const underservedBenefitShare =
    realizedBenefitUnits === 0 ? 0 : underservedBenefitUnits / realizedBenefitUnits;
  const minimumShare = clamp(constraints.minimumUnderservedShare, 0, 0.8);
  const isFeasible =
    realizedOptions.length > 0 &&
    totalCostUnits <= constraints.budgetUnits + Number.EPSILON &&
    underservedBenefitShare >= minimumShare &&
    (!constraints.requireCompletePathway || hasCompletePathway);

  return {
    options: realizedOptions,
    totalCostUnits,
    remainingBudgetUnits: constraints.budgetUnits - totalCostUnits,
    realizedBenefitUnits,
    equityAdjustedBenefitUnits: realizedOptions.reduce(
      (total, option) => total + option.equityAdjustedBenefitUnits,
      0
    ),
    underservedBenefitShare,
    hasCompletePathway,
    isFeasible,
  };
}

export function evaluateAdolescentServicePortfolio(
  optionIds: readonly AdolescentServiceOptionId[],
  constraints: AdolescentServiceConstraints,
  assumptions: AdolescentServiceAssumptions = {}
): AdolescentServicePortfolio {
  const selectedIds = new Set(optionIds);
  const options = ADOLESCENT_SERVICE_OPTIONS.filter((option) => selectedIds.has(option.id));
  return portfolioFrom(options, constraints, assumptions);
}

function emptyPortfolio(constraints: AdolescentServiceConstraints): AdolescentServicePortfolio {
  return {
    options: [],
    totalCostUnits: 0,
    remainingBudgetUnits: constraints.budgetUnits,
    realizedBenefitUnits: 0,
    equityAdjustedBenefitUnits: 0,
    underservedBenefitShare: 0,
    hasCompletePathway: false,
    isFeasible: false,
  };
}

export function selectAdolescentServicePortfolio(
  constraints: AdolescentServiceConstraints,
  assumptions: AdolescentServiceAssumptions = {}
): AdolescentServicePortfolio {
  let best = emptyPortfolio(constraints);

  for (let mask = 1; mask < 1 << ADOLESCENT_SERVICE_OPTIONS.length; mask++) {
    const options = ADOLESCENT_SERVICE_OPTIONS.filter(
      (_, index) => (mask & (1 << index)) !== 0
    );
    const candidate = portfolioFrom(options, constraints, assumptions);
    if (!candidate.isFeasible) continue;

    const improvesObjective =
      candidate.equityAdjustedBenefitUnits > best.equityAdjustedBenefitUnits;
    const tiesObjective =
      Math.abs(candidate.equityAdjustedBenefitUnits - best.equityAdjustedBenefitUnits) < 1e-8;
    if (
      improvesObjective ||
      (tiesObjective && candidate.realizedBenefitUnits > best.realizedBenefitUnits) ||
      (tiesObjective &&
        candidate.realizedBenefitUnits === best.realizedBenefitUnits &&
        candidate.totalCostUnits < best.totalCostUnits)
    ) {
      best = candidate;
    }
  }

  return best;
}
