import { COVERAGE_DOMAIN_META } from "./knowledge-continuum-coverage-meta";
import type { KnowledgeGapCheckpoint, KnowledgeGapJourney } from "./knowledge-gap-journey";

export const KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT = "episteme-knowledge-gap-journeys";
export const KNOWLEDGE_GAP_JOURNEY_ARCHIVE_VERSION = 1;
export const MAX_KNOWLEDGE_GAP_JOURNEYS = 16;

export interface KnowledgeGapJourneyArchive {
  format: typeof KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT;
  version: typeof KNOWLEDGE_GAP_JOURNEY_ARCHIVE_VERSION;
  exportedAt: string;
  journeys: readonly KnowledgeGapJourney[];
}

export type KnowledgeGapJourneyArchiveError =
  | "invalid-format"
  | "unsupported-version"
  | "invalid-export-date"
  | "invalid-journeys"
  | "too-many-journeys"
  | "duplicate-targets";

export type KnowledgeGapJourneyArchiveParseResult =
  | { ok: true; archive: KnowledgeGapJourneyArchive }
  | { ok: false; error: KnowledgeGapJourneyArchiveError };

export type KnowledgeGapJourneyConflictResolution = "keep-existing" | "replace-existing";

export interface KnowledgeGapJourneyImportPreview {
  incomingCount: number;
  newCount: number;
  conflicts: readonly KnowledgeGapJourney[];
  projectedCount: number;
  droppedCount: number;
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isReference(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const reference = value as Record<string, unknown>;
  return (
    typeof reference.id === "string" &&
    reference.id.length > 0 &&
    typeof reference.label === "string" &&
    reference.label.length > 0 &&
    typeof reference.domainId === "string" &&
    Object.hasOwn(COVERAGE_DOMAIN_META, reference.domainId) &&
    typeof reference.domainLabel === "string" &&
    typeof reference.level === "number" &&
    Number.isInteger(reference.level) &&
    reference.level >= 1 &&
    reference.level <= 5
  );
}

function isCheckpoint(value: unknown): value is KnowledgeGapCheckpoint {
  if (!value || typeof value !== "object") return false;
  const checkpoint = value as Partial<KnowledgeGapCheckpoint>;
  return (
    typeof checkpoint.reading === "boolean" &&
    typeof checkpoint.practice === "boolean" &&
    typeof checkpoint.explanation === "boolean" &&
    typeof checkpoint.sourceCheck === "boolean" &&
    typeof checkpoint.note === "string" &&
    checkpoint.note.length <= 500 &&
    isTimestamp(checkpoint.updatedAt)
  );
}

export function isKnowledgeGapJourney(value: unknown): value is KnowledgeGapJourney {
  if (!value || typeof value !== "object") return false;
  const journey = value as Partial<KnowledgeGapJourney>;
  if (
    journey.schemaVersion !== 1 ||
    !isReference(journey.target) ||
    (journey.status !== "mastered" && journey.status !== "ready" && journey.status !== "blocked") ||
    typeof journey.relationFingerprint !== "string" ||
    !isTimestamp(journey.capturedAt) ||
    !isTimestamp(journey.updatedAt) ||
    (journey.totalMinutes !== 20 && journey.totalMinutes !== 45 && journey.totalMinutes !== 90) ||
    !Array.isArray(journey.steps) ||
    !Array.isArray(journey.edges) ||
    !Array.isArray(journey.knownBoundary) ||
    !Array.isArray(journey.relationReleases) ||
    !Array.isArray(journey.relationIds) ||
    !journey.checkpoints ||
    typeof journey.checkpoints !== "object"
  ) {
    return false;
  }
  if (
    !journey.steps.every(
      (step) =>
        isReference(step) &&
        Number.isInteger(step.order) &&
        step.order > 0 &&
        typeof step.evidenceLabel === "string"
    ) ||
    new Set(journey.steps.map((step) => step.id)).size !== journey.steps.length
  ) {
    return false;
  }
  const stepIds = new Set(journey.steps.map((step) => step.id));
  return (
    journey.edges.every(
      (edge) =>
        typeof edge.sourceId === "string" &&
        typeof edge.targetId === "string" &&
        stepIds.has(edge.sourceId) &&
        stepIds.has(edge.targetId)
    ) &&
    journey.knownBoundary.every(isReference) &&
    journey.relationReleases.every(
      (release) => typeof release.releaseId === "string" && typeof release.version === "string"
    ) &&
    journey.relationIds.every((relationId) => typeof relationId === "string") &&
    Object.entries(journey.checkpoints).every(
      ([stepId, checkpoint]) => stepIds.has(stepId) && isCheckpoint(checkpoint)
    ) &&
    (!journey.migrationDecision ||
      (journey.migrationDecision.decision === "keep-previous" &&
        typeof journey.migrationDecision.currentFingerprint === "string" &&
        isTimestamp(journey.migrationDecision.decidedAt)))
  );
}

export function createKnowledgeGapJourneyArchive(
  journeys: readonly KnowledgeGapJourney[],
  exportedAt = new Date().toISOString()
): KnowledgeGapJourneyArchive {
  return {
    format: KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT,
    version: KNOWLEDGE_GAP_JOURNEY_ARCHIVE_VERSION,
    exportedAt,
    journeys: journeys
      .slice()
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .slice(0, MAX_KNOWLEDGE_GAP_JOURNEYS),
  };
}

export function parseKnowledgeGapJourneyArchive(
  value: unknown
): KnowledgeGapJourneyArchiveParseResult {
  if (!value || typeof value !== "object") return { ok: false, error: "invalid-format" };
  const archive = value as Partial<KnowledgeGapJourneyArchive>;
  if (archive.format !== KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT) {
    return { ok: false, error: "invalid-format" };
  }
  if (archive.version !== KNOWLEDGE_GAP_JOURNEY_ARCHIVE_VERSION) {
    return { ok: false, error: "unsupported-version" };
  }
  if (!isTimestamp(archive.exportedAt)) return { ok: false, error: "invalid-export-date" };
  if (!Array.isArray(archive.journeys) || !archive.journeys.every(isKnowledgeGapJourney)) {
    return { ok: false, error: "invalid-journeys" };
  }
  if (archive.journeys.length > MAX_KNOWLEDGE_GAP_JOURNEYS) {
    return { ok: false, error: "too-many-journeys" };
  }
  const targetIds = archive.journeys.map((journey) => journey.target.id);
  if (new Set(targetIds).size !== targetIds.length) {
    return { ok: false, error: "duplicate-targets" };
  }
  return { ok: true, archive: archive as KnowledgeGapJourneyArchive };
}

export function previewKnowledgeGapJourneyImport(
  existing: readonly KnowledgeGapJourney[],
  incoming: readonly KnowledgeGapJourney[]
): KnowledgeGapJourneyImportPreview {
  const existingIds = new Set(existing.map((journey) => journey.target.id));
  const conflicts = incoming.filter((journey) => existingIds.has(journey.target.id));
  const newCount = incoming.length - conflicts.length;
  const mergedCount = existing.length + newCount;
  return {
    incomingCount: incoming.length,
    newCount,
    conflicts,
    projectedCount: Math.min(MAX_KNOWLEDGE_GAP_JOURNEYS, mergedCount),
    droppedCount: Math.max(0, mergedCount - MAX_KNOWLEDGE_GAP_JOURNEYS),
  };
}

export function mergeKnowledgeGapJourneyArchive(
  existing: readonly KnowledgeGapJourney[],
  incoming: readonly KnowledgeGapJourney[],
  resolution: KnowledgeGapJourneyConflictResolution
): readonly KnowledgeGapJourney[] {
  const merged = new Map(existing.map((journey) => [journey.target.id, journey]));
  for (const journey of incoming) {
    if (!merged.has(journey.target.id) || resolution === "replace-existing") {
      merged.set(journey.target.id, journey);
    }
  }
  return [...merged.values()]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, MAX_KNOWLEDGE_GAP_JOURNEYS);
}
