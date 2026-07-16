import type { KnowledgeGapPlan } from "./knowledge-gap-plan";
import type { LearningPlanMinutes } from "./knowledge-learning-plan";

export async function fetchKnowledgeGapPlan(
  targetId: string,
  knownIds: readonly string[],
  minutes: LearningPlanMinutes,
  signal?: AbortSignal
): Promise<KnowledgeGapPlan> {
  const response = await fetch("/api/knowledge-frontier/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetId, knownIds, minutes }),
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Knowledge gap plan request failed");
  return (await response.json()) as KnowledgeGapPlan;
}
