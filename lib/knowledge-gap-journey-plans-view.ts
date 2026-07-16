import type { KnowledgeGapPlan } from "./knowledge-gap-plan";
import type { LearningPlanMinutes } from "./knowledge-learning-plan";

export interface KnowledgeGapJourneyPlanInput {
  targetId: string;
  minutes: LearningPlanMinutes;
}

export interface KnowledgeGapJourneyPlansView {
  plans: readonly KnowledgeGapPlan[];
  unavailableTargetIds: readonly string[];
}

export async function fetchKnowledgeGapJourneyPlans(
  journeys: readonly KnowledgeGapJourneyPlanInput[],
  knownIds: readonly string[],
  signal?: AbortSignal
): Promise<KnowledgeGapJourneyPlansView> {
  const response = await fetch("/api/knowledge-frontier/journeys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ journeys, knownIds }),
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Knowledge journey version request failed");
  return (await response.json()) as KnowledgeGapJourneyPlansView;
}
