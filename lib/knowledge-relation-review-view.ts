import type { KnowledgeRelationReviewView } from "./knowledge-relation-review";

export type { KnowledgeRelationReviewView } from "./knowledge-relation-review";

export async function fetchKnowledgeRelationReview(
  knownIds: readonly string[],
  signal?: AbortSignal
): Promise<KnowledgeRelationReviewView> {
  const response = await fetch("/api/knowledge-frontier/relation-review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ knownIds }),
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Knowledge relation review request failed");
  return (await response.json()) as KnowledgeRelationReviewView;
}
