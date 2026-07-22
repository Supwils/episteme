export type MentalHealthAccessStageId =
  | "need"
  | "recognized"
  | "first-contact"
  | "continued-care"
  | "effective-response";

export type MentalHealthAccessAssumptions = {
  population: number;
  recognitionRate: number;
  firstContactRate: number;
  continuityRate: number;
  responseRate: number;
  underservedShare: number;
  underservedAccessGap: number;
};

export type MentalHealthAccessStage = {
  id: MentalHealthAccessStageId;
  label: string;
  overallCount: number;
  generalCount: number;
  underservedCount: number;
  overallRate: number;
  lossFromPrevious: number;
};

export type MentalHealthAccessCascade = {
  stages: readonly MentalHealthAccessStage[];
  effectiveCoverageRate: number;
  generalEffectiveCoverageRate: number;
  underservedEffectiveCoverageRate: number;
  equityGapPercentagePoints: number;
  largestLossStage: MentalHealthAccessStage;
};

export type MentalHealthAccessScenario = {
  id: string;
  label: string;
  assumptions: MentalHealthAccessAssumptions;
};

export const DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS: MentalHealthAccessAssumptions = {
  population: 10_000,
  recognitionRate: 0.68,
  firstContactRate: 0.58,
  continuityRate: 0.62,
  responseRate: 0.55,
  underservedShare: 0.35,
  underservedAccessGap: 0.22,
};

export const MENTAL_HEALTH_ACCESS_SCENARIOS: readonly MentalHealthAccessScenario[] = [
  {
    id: "fragmented",
    label: "服务分散",
    assumptions: DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
  },
  {
    id: "primary-care",
    label: "基层整合",
    assumptions: {
      ...DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
      recognitionRate: 0.8,
      firstContactRate: 0.72,
      continuityRate: 0.7,
      responseRate: 0.58,
      underservedAccessGap: 0.14,
    },
  },
  {
    id: "continuity",
    label: "连续照护",
    assumptions: {
      ...DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
      recognitionRate: 0.72,
      firstContactRate: 0.64,
      continuityRate: 0.82,
      responseRate: 0.6,
      underservedAccessGap: 0.12,
    },
  },
  {
    id: "community-network",
    label: "社区网络",
    assumptions: {
      ...DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
      recognitionRate: 0.84,
      firstContactRate: 0.78,
      continuityRate: 0.82,
      responseRate: 0.64,
      underservedAccessGap: 0.08,
    },
  },
];

const STAGE_META: readonly {
  id: MentalHealthAccessStageId;
  label: string;
}[] = [
  { id: "need", label: "存在支持需要" },
  { id: "recognized", label: "被识别与表达" },
  { id: "first-contact", label: "完成首次接触" },
  { id: "continued-care", label: "进入持续照护" },
  { id: "effective-response", label: "获得有效反应" },
];

function clampRate(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function laneCounts(
  population: number,
  assumptions: MentalHealthAccessAssumptions,
  applyAccessGap: boolean
): number[] {
  const accessMultiplier = applyAccessGap ? 1 - clampRate(assumptions.underservedAccessGap) : 1;
  const recognition = clampRate(assumptions.recognitionRate * accessMultiplier);
  const firstContact = clampRate(assumptions.firstContactRate * accessMultiplier);
  const continuity = clampRate(assumptions.continuityRate * accessMultiplier);
  const response = clampRate(assumptions.responseRate);

  const recognized = population * recognition;
  const contacted = recognized * firstContact;
  const continued = contacted * continuity;

  return [population, recognized, contacted, continued, continued * response];
}

export function buildMentalHealthAccessCascade(
  assumptions: MentalHealthAccessAssumptions
): MentalHealthAccessCascade {
  const population = Math.max(1, assumptions.population);
  const underservedPopulation = population * clampRate(assumptions.underservedShare);
  const generalPopulation = population - underservedPopulation;
  const generalCounts = laneCounts(generalPopulation, assumptions, false);
  const underservedCounts = laneCounts(underservedPopulation, assumptions, true);

  const stages = STAGE_META.map((meta, index): MentalHealthAccessStage => {
    const generalCount = generalCounts[index]!;
    const underservedCount = underservedCounts[index]!;
    const overallCount = generalCount + underservedCount;
    const previousOverallCount =
      index === 0 ? overallCount : generalCounts[index - 1]! + underservedCounts[index - 1]!;

    return {
      ...meta,
      overallCount,
      generalCount,
      underservedCount,
      overallRate: overallCount / population,
      lossFromPrevious: previousOverallCount - overallCount,
    };
  });

  const finalStage = stages.at(-1)!;
  const generalEffectiveCoverageRate =
    generalPopulation === 0 ? 0 : generalCounts.at(-1)! / generalPopulation;
  const underservedEffectiveCoverageRate =
    underservedPopulation === 0
      ? generalEffectiveCoverageRate
      : underservedCounts.at(-1)! / underservedPopulation;
  const largestLossStage = stages.slice(1).reduce((largest, stage) =>
    stage.lossFromPrevious > largest.lossFromPrevious ? stage : largest
  );

  return {
    stages,
    effectiveCoverageRate: finalStage.overallRate,
    generalEffectiveCoverageRate,
    underservedEffectiveCoverageRate,
    equityGapPercentagePoints:
      generalPopulation === 0
        ? 0
        : (generalEffectiveCoverageRate - underservedEffectiveCoverageRate) * 100,
    largestLossStage,
  };
}
