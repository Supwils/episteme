import type { KnowledgeConfluence } from "@/lib/knowledge-confluence";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";

const confluenceCache = new Map<string, KnowledgeConfluence>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isConfluencePayload(value: unknown): value is { confluence: KnowledgeConfluence } {
  if (!isRecord(value) || !isRecord(value.confluence)) return false;
  const confluence = value.confluence;
  return (
    typeof confluence.id === "string" &&
    typeof confluence.question === "string" &&
    Array.isArray(confluence.strands) &&
    confluence.strands.length === 4 &&
    isRecord(confluence.target)
  );
}

export function cacheKnowledgeConfluence(confluence: KnowledgeConfluence): void {
  confluenceCache.set(confluence.id, confluence);
}

export function hasCachedKnowledgeConfluence(id: string): boolean {
  return confluenceCache.has(id);
}

export async function requestKnowledgeConfluence(
  id: string,
  signal?: AbortSignal
): Promise<KnowledgeConfluence> {
  const cached = confluenceCache.get(id);
  if (cached) return cached;
  const response = await fetch(`/api/knowledge-confluences/${encodeURIComponent(id)}`, {
    signal,
    cache: "force-cache",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Unable to load confluence: ${response.status}`);
  const payload: unknown = await response.json();
  if (!isConfluencePayload(payload) || payload.confluence.id !== id) {
    throw new Error("Invalid confluence response");
  }
  cacheKnowledgeConfluence(payload.confluence);
  return payload.confluence;
}

export function parseConfluenceMinutes(value: string | null): LearningPlanMinutes {
  return value === "20" || value === "90" ? (Number(value) as LearningPlanMinutes) : 45;
}

export function updateKnowledgeConfluenceUrl(
  confluenceId: string | null,
  minutes: LearningPlanMinutes,
  mode: "push" | "replace"
): void {
  const url = new URL(window.location.href);
  if (confluenceId) {
    url.searchParams.set("confluence", confluenceId);
    url.searchParams.set("confluenceMinutes", String(minutes));
    url.searchParams.set("source", "home-confluence");
    url.hash = "knowledge-confluence";
  } else {
    url.searchParams.delete("confluence");
    url.searchParams.delete("confluenceMinutes");
    if (url.searchParams.get("source") === "home-confluence") url.searchParams.delete("source");
  }
  const method = mode === "push" ? "pushState" : "replaceState";
  window.history[method](null, "", url);
}
