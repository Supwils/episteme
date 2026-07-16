import type { KnowledgeFrontierStatus } from "./knowledge-frontier";
import type {
  KnowledgeGapPlan,
  KnowledgeGapPlanEdge,
  KnowledgeGapPlanReference,
  KnowledgeGapPlanRelease,
} from "./knowledge-gap-plan";
import type { LearningPlanMinutes } from "./knowledge-learning-plan";

export const KNOWLEDGE_GAP_CHECKPOINT_KEYS = [
  "reading",
  "practice",
  "explanation",
  "sourceCheck",
] as const;

export type KnowledgeGapCheckpointKey = (typeof KNOWLEDGE_GAP_CHECKPOINT_KEYS)[number];

export interface KnowledgeGapCheckpoint {
  reading: boolean;
  practice: boolean;
  explanation: boolean;
  sourceCheck: boolean;
  note: string;
  updatedAt: string;
}

export interface KnowledgeGapJourneyStep extends KnowledgeGapPlanReference {
  order: number;
  evidenceLabel: string;
}

export interface KnowledgeGapMigrationDecision {
  currentFingerprint: string;
  decision: "keep-previous";
  decidedAt: string;
}

export interface KnowledgeGapJourney {
  schemaVersion: 1;
  target: KnowledgeGapPlanReference;
  status: KnowledgeFrontierStatus;
  relationFingerprint: string;
  relationReleases: readonly KnowledgeGapPlanRelease[];
  relationIds: readonly string[];
  capturedAt: string;
  updatedAt: string;
  totalMinutes: LearningPlanMinutes;
  steps: readonly KnowledgeGapJourneyStep[];
  edges: readonly KnowledgeGapPlanEdge[];
  knownBoundary: readonly KnowledgeGapPlanReference[];
  checkpoints: Readonly<Record<string, KnowledgeGapCheckpoint>>;
  migrationDecision?: KnowledgeGapMigrationDecision;
}

export interface KnowledgeGapJourneyDiff {
  current: boolean;
  decision: "pending" | "keep-previous" | "current";
  addedSteps: readonly KnowledgeGapJourneyStep[];
  removedSteps: readonly KnowledgeGapJourneyStep[];
  retainedStepCount: number;
  addedEdges: readonly KnowledgeGapPlanEdge[];
  removedEdges: readonly KnowledgeGapPlanEdge[];
  statusChanged: boolean;
  releasesChanged: boolean;
  preservedCheckpointCount: number;
}

function timestamp(now?: string): string {
  return now ?? new Date().toISOString();
}

function snapshotSteps(plan: KnowledgeGapPlan): KnowledgeGapJourneyStep[] {
  return plan.steps.map((step) => ({
    id: step.id,
    label: step.label,
    domainId: step.domainId,
    domainLabel: step.domainLabel,
    level: step.level,
    order: step.order,
    evidenceLabel: step.evidenceLabel,
  }));
}

export function createKnowledgeGapJourney(
  plan: KnowledgeGapPlan,
  now?: string
): KnowledgeGapJourney {
  const capturedAt = timestamp(now);
  return {
    schemaVersion: 1,
    target: plan.target,
    status: plan.status,
    relationFingerprint: plan.version.fingerprint,
    relationReleases: plan.version.relationReleases,
    relationIds: plan.version.relationIds,
    capturedAt,
    updatedAt: capturedAt,
    totalMinutes: plan.totalMinutes,
    steps: snapshotSteps(plan),
    edges: plan.edges,
    knownBoundary: plan.knownBoundary,
    checkpoints: {},
  };
}

function edgeKey(edge: KnowledgeGapPlanEdge): string {
  return `${edge.sourceId}->${edge.targetId}`;
}

function releaseKey(release: KnowledgeGapPlanRelease): string {
  return `${release.releaseId}@${release.version}`;
}

function hasRecordedEvidence(checkpoint: KnowledgeGapCheckpoint | undefined): boolean {
  return Boolean(
    checkpoint &&
    (checkpoint.note.trim() || KNOWLEDGE_GAP_CHECKPOINT_KEYS.some((key) => checkpoint[key]))
  );
}

export function compareKnowledgeGapJourney(
  journey: KnowledgeGapJourney,
  plan: KnowledgeGapPlan
): KnowledgeGapJourneyDiff {
  const current = journey.relationFingerprint === plan.version.fingerprint;
  const previousSteps = new Map(journey.steps.map((step) => [step.id, step]));
  const nextSteps = new Map(snapshotSteps(plan).map((step) => [step.id, step]));
  const previousEdges = new Map(journey.edges.map((edge) => [edgeKey(edge), edge]));
  const nextEdges = new Map(plan.edges.map((edge) => [edgeKey(edge), edge]));
  const previousReleases = journey.relationReleases.map(releaseKey).sort();
  const nextReleases = plan.version.relationReleases.map(releaseKey).sort();
  return {
    current,
    decision: current
      ? "current"
      : journey.migrationDecision?.currentFingerprint === plan.version.fingerprint
        ? "keep-previous"
        : "pending",
    addedSteps: [...nextSteps.values()].filter((step) => !previousSteps.has(step.id)),
    removedSteps: [...previousSteps.values()].filter((step) => !nextSteps.has(step.id)),
    retainedStepCount: [...nextSteps.keys()].filter((id) => previousSteps.has(id)).length,
    addedEdges: [...nextEdges.entries()]
      .filter(([key]) => !previousEdges.has(key))
      .map(([, edge]) => edge),
    removedEdges: [...previousEdges.entries()]
      .filter(([key]) => !nextEdges.has(key))
      .map(([, edge]) => edge),
    statusChanged: journey.status !== plan.status,
    releasesChanged: previousReleases.join("|") !== nextReleases.join("|"),
    preservedCheckpointCount: [...nextSteps.keys()].filter((id) =>
      hasRecordedEvidence(journey.checkpoints[id])
    ).length,
  };
}

export function migrateKnowledgeGapJourney(
  journey: KnowledgeGapJourney,
  plan: KnowledgeGapPlan,
  now?: string
): KnowledgeGapJourney {
  const next = createKnowledgeGapJourney(plan, now);
  const retainedIds = new Set(next.steps.map((step) => step.id));
  return {
    ...next,
    capturedAt: journey.capturedAt,
    checkpoints: Object.fromEntries(
      Object.entries(journey.checkpoints).filter(([stepId]) => retainedIds.has(stepId))
    ),
  };
}

export function keepPreviousKnowledgeGapJourney(
  journey: KnowledgeGapJourney,
  currentFingerprint: string,
  now?: string
): KnowledgeGapJourney {
  const decidedAt = timestamp(now);
  return {
    ...journey,
    updatedAt: decidedAt,
    migrationDecision: {
      currentFingerprint,
      decision: "keep-previous",
      decidedAt,
    },
  };
}

export function updateKnowledgeGapJourneyBudget(
  journey: KnowledgeGapJourney,
  totalMinutes: LearningPlanMinutes,
  now?: string
): KnowledgeGapJourney {
  return {
    ...journey,
    totalMinutes,
    updatedAt: timestamp(now),
  };
}

export function updateKnowledgeGapCheckpoint(
  journey: KnowledgeGapJourney,
  stepId: string,
  update: Partial<Pick<KnowledgeGapCheckpoint, KnowledgeGapCheckpointKey | "note">>,
  now?: string
): KnowledgeGapJourney {
  if (!journey.steps.some((step) => step.id === stepId)) return journey;
  const updatedAt = timestamp(now);
  const previous = journey.checkpoints[stepId];
  const checkpoint: KnowledgeGapCheckpoint = {
    reading: previous?.reading ?? false,
    practice: previous?.practice ?? false,
    explanation: previous?.explanation ?? false,
    sourceCheck: previous?.sourceCheck ?? false,
    note: previous?.note ?? "",
    updatedAt,
    ...update,
  };
  return {
    ...journey,
    updatedAt,
    checkpoints: { ...journey.checkpoints, [stepId]: checkpoint },
  };
}
