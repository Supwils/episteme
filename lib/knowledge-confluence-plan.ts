import {
  allocateLearningMinutes,
  learningActivityFor,
  type LearningPlanMinutes,
} from "@/lib/knowledge-learning-plan";
import {
  KNOWLEDGE_CONFLUENCE_PLAN_LEVELS,
  KNOWLEDGE_CONFLUENCE_ROLE_META,
  type KnowledgeConfluence,
  type KnowledgeConfluencePlan,
  type KnowledgeConfluencePlanStep,
} from "@/lib/knowledge-confluence";

function selectedLevels(minutes: LearningPlanMinutes): ReadonlySet<number> {
  return new Set(KNOWLEDGE_CONFLUENCE_PLAN_LEVELS[minutes]);
}

export function buildKnowledgeConfluencePlan(
  confluence: KnowledgeConfluence,
  minutes: LearningPlanMinutes
): KnowledgeConfluencePlan {
  const levels = selectedLevels(minutes);
  const selectedByStrand = confluence.strands.map((strand) => ({
    strand,
    steps: strand.steps.filter((step) => levels.has(step.level)),
  }));
  const flatSteps = selectedByStrand.flatMap(({ steps }) => steps);
  const allocations = allocateLearningMinutes(minutes, [...flatSteps, confluence.target]);
  let allocationIndex = 0;

  const strands = selectedByStrand.map(({ strand, steps }) => {
    const plannedSteps: KnowledgeConfluencePlanStep[] = steps.map((step) => ({
      ...step,
      minutes: allocations[allocationIndex++]!,
      activity: learningActivityFor(step, minutes),
      reason: step.transition,
      strandId: strand.id,
      strandTitle: strand.title,
      role: strand.role,
    }));
    return {
      id: strand.id,
      title: strand.title,
      role: strand.role,
      minutes: plannedSteps.reduce((sum, step) => sum + step.minutes, 0),
      steps: plannedSteps,
    };
  });
  const synthesis: KnowledgeConfluencePlanStep = {
    ...confluence.target,
    minutes: allocations[allocationIndex]!,
    activity: confluence.synthesisTask,
    reason: "把各线结论并列，明确一致之处、冲突之处和不能由现有证据决定的价值判断。",
    strandId: null,
    strandTitle: "汇流综合",
    role: "synthesis",
  };

  return {
    id: `${confluence.id}:${minutes}`,
    confluenceId: confluence.id,
    totalMinutes: minutes,
    checkpointCount: flatSteps.length + 1,
    strands,
    synthesis,
  };
}

export function describeConfluencePlan(minutes: LearningPlanMinutes): string {
  const levels = KNOWLEDGE_CONFLUENCE_PLAN_LEVELS[minutes].map((level) => `L${level}`).join("、");
  return `${levels} 路线检查点 + L5 汇流综合`;
}

export function confluenceRoleLabel(role: keyof typeof KNOWLEDGE_CONFLUENCE_ROLE_META): string {
  return KNOWLEDGE_CONFLUENCE_ROLE_META[role].label;
}

export function buildKnowledgeConfluenceGraphHref(
  confluenceId: string,
  focusNodeId?: string
): string {
  const params = new URLSearchParams({
    confluence: confluenceId,
    level: "5",
    source: "knowledge-confluence",
  });
  if (focusNodeId) params.set("focus", focusNodeId);
  return `/knowledge-graph?${params.toString()}`;
}
