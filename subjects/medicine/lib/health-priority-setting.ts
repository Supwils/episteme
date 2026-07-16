export type PriorityIntervention = {
  id: string;
  title: string;
  shortTitle: string;
  costMillions: number;
  expectedQalys: number;
  underservedShare: number;
  severity: "moderate" | "high" | "very-high";
  implementationConstraint: string;
};

export type PriorityPortfolio = {
  interventions: PriorityIntervention[];
  totalCostMillions: number;
  remainingBudgetMillions: number;
  totalQalys: number;
  equityAdjustedQalys: number;
};

export type InterventionAssumption = {
  costMultiplier: number;
  effectMultiplier: number;
};

export type PriorityAssumptions = Partial<Record<string, Partial<InterventionAssumption>>>;

// These values are deliberately fictional teaching inputs. They demonstrate
// transparent trade-offs without presenting a real coverage recommendation.
export const PRIORITY_INTERVENTIONS: PriorityIntervention[] = [
  {
    id: "hypertension-primary-care",
    title: "基层高血压筛查与持续治疗",
    shortTitle: "高血压连续照护",
    costMillions: 6,
    expectedQalys: 1100,
    underservedShare: 0.38,
    severity: "high",
    implementationConstraint: "稳定药品供应与基层随访",
  },
  {
    id: "immunization-outreach",
    title: "儿童常规免疫外展服务",
    shortTitle: "免疫外展",
    costMillions: 4.2,
    expectedQalys: 880,
    underservedShare: 0.62,
    severity: "moderate",
    implementationConstraint: "冷链、社区信任与到达偏远地区",
  },
  {
    id: "tuberculosis-care",
    title: "结核主动发现与治疗支持",
    shortTitle: "结核发现与支持",
    costMillions: 8.5,
    expectedQalys: 900,
    underservedShare: 0.7,
    severity: "very-high",
    implementationConstraint: "诊断能力、依从支持与抗污名服务",
  },
  {
    id: "cataract-access",
    title: "可及的白内障手术与转诊",
    shortTitle: "白内障转诊",
    costMillions: 5.5,
    expectedQalys: 470,
    underservedShare: 0.61,
    severity: "high",
    implementationConstraint: "手术队伍、转诊和术后随访",
  },
  {
    id: "advanced-cancer-access",
    title: "高严重度癌症治疗可及性保障",
    shortTitle: "癌症治疗保障",
    costMillions: 13.5,
    expectedQalys: 420,
    underservedShare: 0.26,
    severity: "very-high",
    implementationConstraint: "诊断分层、专科能力与长期筹资",
  },
];

export function equityAdjustedQalys(
  intervention: PriorityIntervention,
  equityWeight: number,
  assumptions: PriorityAssumptions = {}
): number {
  return (
    assumedQalys(intervention, assumptions) *
    (1 + (equityWeight - 1) * intervention.underservedShare)
  );
}

export function assumedCostMillions(
  intervention: PriorityIntervention,
  assumptions: PriorityAssumptions = {}
): number {
  return intervention.costMillions * (assumptions[intervention.id]?.costMultiplier ?? 1);
}

export function assumedQalys(
  intervention: PriorityIntervention,
  assumptions: PriorityAssumptions = {}
): number {
  return intervention.expectedQalys * (assumptions[intervention.id]?.effectMultiplier ?? 1);
}

function portfolioFrom(
  interventions: PriorityIntervention[],
  budgetMillions: number,
  equityWeight: number,
  assumptions: PriorityAssumptions
): PriorityPortfolio {
  const totalCostMillions = interventions.reduce(
    (total, intervention) => total + assumedCostMillions(intervention, assumptions),
    0
  );
  const totalQalys = interventions.reduce(
    (total, intervention) => total + assumedQalys(intervention, assumptions),
    0
  );
  const adjustedQalys = interventions.reduce(
    (total, intervention) => total + equityAdjustedQalys(intervention, equityWeight, assumptions),
    0
  );

  return {
    interventions,
    totalCostMillions,
    remainingBudgetMillions: budgetMillions - totalCostMillions,
    totalQalys,
    equityAdjustedQalys: adjustedQalys,
  };
}

export function selectPriorityPortfolio(
  budgetMillions: number,
  equityWeight: number,
  protectVerySevereConditions: boolean,
  assumptions: PriorityAssumptions = {}
): PriorityPortfolio {
  let bestPortfolio = portfolioFrom([], budgetMillions, equityWeight, assumptions);

  for (let mask = 1; mask < 1 << PRIORITY_INTERVENTIONS.length; mask++) {
    const candidates = PRIORITY_INTERVENTIONS.filter((_, index) => (mask & (1 << index)) !== 0);
    const portfolio = portfolioFrom(candidates, budgetMillions, equityWeight, assumptions);
    const includesVerySevereCondition = candidates.some(
      (intervention) => intervention.severity === "very-high"
    );

    if (
      portfolio.totalCostMillions > budgetMillions ||
      (protectVerySevereConditions && !includesVerySevereCondition)
    ) {
      continue;
    }

    if (
      portfolio.equityAdjustedQalys > bestPortfolio.equityAdjustedQalys ||
      (portfolio.equityAdjustedQalys === bestPortfolio.equityAdjustedQalys &&
        portfolio.totalCostMillions < bestPortfolio.totalCostMillions)
    ) {
      bestPortfolio = portfolio;
    }
  }

  return bestPortfolio;
}
