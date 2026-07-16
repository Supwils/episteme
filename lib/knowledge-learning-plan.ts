import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type {
  CoverageDomainId,
  CoverageEvidenceMode,
} from "@/lib/knowledge-continuum-coverage-meta";

export type LearningGoalKind = "main-thread" | "cross-domain" | "domain-spine";
export type LearningPlanMinutes = 20 | 45 | 90;

export interface LearningGoalStep {
  nodeId: string;
  label: string;
  level: KnowledgeLevel;
  domainId: CoverageDomainId;
  domainLabel: string;
  domainColor: string;
  evidenceMode: CoverageEvidenceMode;
  evidenceLabel: string;
  evidenceColor: string;
  transition: string;
  articleHref?: string;
  graphHref: string;
}

export interface LearningGoal {
  id: string;
  kind: LearningGoalKind;
  title: string;
  question: string;
  steps: readonly LearningGoalStep[];
}

export interface LearningPlanCatalog {
  goals: readonly LearningGoal[];
}

export interface LearningPlanSelection {
  goalId: string;
  startLevel: KnowledgeLevel;
  minutes: LearningPlanMinutes;
}

export interface LearningPlanStep extends LearningGoalStep {
  minutes: number;
  activity: string;
  reason: string;
}

export interface PersonalLearningPlan {
  id: string;
  goalId: string;
  title: string;
  question: string;
  startLevel: KnowledgeLevel;
  totalMinutes: LearningPlanMinutes;
  assumedMasteredCount: number;
  domainCount: number;
  steps: readonly LearningPlanStep[];
}

export const LEARNING_PLAN_DURATIONS: readonly {
  minutes: LearningPlanMinutes;
  label: string;
  description: string;
}[] = [
  { minutes: 20, label: "20 分钟", description: "快速建立问题地图" },
  { minutes: 45, label: "45 分钟", description: "理解完整知识结构" },
  { minutes: 90, label: "90 分钟", description: "研读证据与争议" },
];

const EVIDENCE_ACTIVITIES: Record<CoverageEvidenceMode, string> = {
  observation: "记录一个现象，并把好奇转成可继续追问的问题",
  interpretation: "比较至少两种解释，指出各自依赖的材料",
  formal: "重建定义、推演或算法，检查每一步为何成立",
  experimental: "识别操纵、对照、测量误差与可重复性",
  comparative: "比较案例的共同点与差异，并检查替代解释",
  simulation: "画出关键变量、反馈关系与情景变化",
  synthesis: "列出主要争议、证据缺口与仍然开放的判断",
};

export function allocateLearningMinutes(
  totalMinutes: LearningPlanMinutes,
  steps: readonly Pick<LearningGoalStep, "level">[]
): number[] {
  if (steps.length === 1) return [totalMinutes];
  const preferredMinimum = totalMinutes === 20 ? 3 : totalMinutes === 45 ? 6 : 12;
  const minimum = Math.min(preferredMinimum, Math.floor(totalMinutes / steps.length));
  const remaining = totalMinutes - minimum * steps.length;
  const weights = steps.map((step) => 1 + step.level * 0.2);
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  const exactShares = weights.map((weight) => (remaining * weight) / weightTotal);
  const allocations = exactShares.map((share) => minimum + Math.floor(share));
  let undistributed = totalMinutes - allocations.reduce((sum, value) => sum + value, 0);
  const remainderOrder = exactShares
    .map((share, index) => ({ index, remainder: share - Math.floor(share) }))
    .sort((left, right) => right.remainder - left.remainder || right.index - left.index);

  for (const item of remainderOrder) {
    if (undistributed === 0) break;
    allocations[item.index] = allocations[item.index]! + 1;
    undistributed -= 1;
  }
  return allocations;
}

export function learningActivityFor(
  step: Pick<LearningGoalStep, "evidenceMode">,
  minutes: LearningPlanMinutes
): string {
  const activity = EVIDENCE_ACTIVITIES[step.evidenceMode];
  if (minutes === 20) return `抓住核心：${activity}。`;
  if (minutes === 45) return `结构练习：${activity}，再用一句话连接前后步骤。`;
  return `深度任务：${activity}，再阅读节点中的来源、限制与反例。`;
}

export function buildPersonalLearningPlan(
  catalog: LearningPlanCatalog,
  selection: LearningPlanSelection
): PersonalLearningPlan {
  const goal = catalog.goals.find((candidate) => candidate.id === selection.goalId);
  if (!goal) throw new Error(`Unknown learning goal: ${selection.goalId}`);
  const selectedSteps = goal.steps.filter((step) => step.level >= selection.startLevel);
  if (selectedSteps.length === 0) {
    throw new Error(`Learning goal ${goal.id} has no step at L${selection.startLevel}`);
  }
  const allocations = allocateLearningMinutes(selection.minutes, selectedSteps);
  const steps = selectedSteps.map((step, index) => ({
    ...step,
    minutes: allocations[index]!,
    activity: learningActivityFor(step, selection.minutes),
    reason:
      index === 0
        ? `这是你选择的 L${selection.startLevel} 起点。${step.transition}`
        : step.transition,
  }));

  return {
    id: `${goal.id}:L${selection.startLevel}:${selection.minutes}`,
    goalId: goal.id,
    title: goal.title,
    question: goal.question,
    startLevel: selection.startLevel,
    totalMinutes: selection.minutes,
    assumedMasteredCount: goal.steps.filter((step) => step.level < selection.startLevel).length,
    domainCount: new Set(steps.map((step) => step.domainId)).size,
    steps,
  };
}
