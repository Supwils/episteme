import {
  compareKnowledgeGapJourney,
  KNOWLEDGE_GAP_CHECKPOINT_KEYS,
  type KnowledgeGapCheckpointKey,
  type KnowledgeGapJourney,
} from "./knowledge-gap-journey";
import type { KnowledgeGapPlan } from "./knowledge-gap-plan";

export type KnowledgeGapJourneyLifecycle = "current" | "pending" | "keep-previous" | "unknown";

export type KnowledgeGapJourneyEvidenceState = "none" | "in-progress" | "complete";

export interface KnowledgeGapJourneyEvidenceSummary {
  state: KnowledgeGapJourneyEvidenceState;
  recordedCount: number;
  possibleCount: number;
  nextTodo: string;
}

const CHECKPOINT_LABELS: Record<KnowledgeGapCheckpointKey, string> = {
  reading: "阅读正文",
  practice: "完成练习",
  explanation: "尝试复述",
  sourceCheck: "核验来源",
};

export function getKnowledgeGapJourneyLifecycle(
  journey: KnowledgeGapJourney,
  plan: KnowledgeGapPlan | undefined
): KnowledgeGapJourneyLifecycle {
  if (!plan) return "unknown";
  return compareKnowledgeGapJourney(journey, plan).decision;
}

export function summarizeKnowledgeGapJourneyEvidence(
  journey: KnowledgeGapJourney,
  masteredIds: ReadonlySet<string>
): KnowledgeGapJourneyEvidenceSummary {
  const possibleCount = journey.steps.length * KNOWLEDGE_GAP_CHECKPOINT_KEYS.length;
  const recordedCount = journey.steps.reduce((count, step) => {
    const checkpoint = journey.checkpoints[step.id];
    return count + KNOWLEDGE_GAP_CHECKPOINT_KEYS.filter((key) => checkpoint?.[key] === true).length;
  }, 0);
  const activeStep = journey.steps.find((step) => !masteredIds.has(step.id));
  let nextTodo = "没有待补步骤";
  if (activeStep) {
    const checkpoint = journey.checkpoints[activeStep.id];
    const missing = KNOWLEDGE_GAP_CHECKPOINT_KEYS.find((key) => !checkpoint?.[key]);
    nextTodo = missing
      ? `${activeStep.label} · ${CHECKPOINT_LABELS[missing]}`
      : `${activeStep.label} · 等待明确确认`;
  }
  return {
    state:
      possibleCount === 0 || recordedCount === possibleCount
        ? "complete"
        : recordedCount === 0
          ? "none"
          : "in-progress",
    recordedCount,
    possibleCount,
    nextTodo,
  };
}
