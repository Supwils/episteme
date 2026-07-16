"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { KnowledgeGapPlan } from "./knowledge-gap-plan";
import {
  createKnowledgeGapJourney,
  keepPreviousKnowledgeGapJourney,
  migrateKnowledgeGapJourney,
  updateKnowledgeGapJourneyBudget,
  updateKnowledgeGapCheckpoint,
  type KnowledgeGapCheckpointKey,
  type KnowledgeGapJourney,
} from "./knowledge-gap-journey";
import {
  isKnowledgeGapJourney,
  MAX_KNOWLEDGE_GAP_JOURNEYS,
  mergeKnowledgeGapJourneyArchive,
  type KnowledgeGapJourneyArchive,
  type KnowledgeGapJourneyConflictResolution,
} from "./knowledge-gap-journey-archive";

export const KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY = "uk-knowledge-gap-journeys-v1";
interface KnowledgeGapJourneyStore {
  version: 1;
  journeys: Readonly<Record<string, KnowledgeGapJourney>>;
}

const EMPTY_STORE: KnowledgeGapJourneyStore = { version: 1, journeys: {} };
const listeners = new Set<() => void>();
let storageListenerAttached = false;

function normalizeStore(value: unknown): KnowledgeGapJourneyStore {
  if (!value || typeof value !== "object") return EMPTY_STORE;
  const journeys = (value as { journeys?: unknown }).journeys;
  if (!journeys || typeof journeys !== "object" || Array.isArray(journeys)) return EMPTY_STORE;
  const validJourneys = Object.values(journeys).filter(isKnowledgeGapJourney);
  return {
    version: 1,
    journeys: Object.fromEntries(validJourneys.map((journey) => [journey.target.id, journey])),
  };
}

function readStore(): KnowledgeGapJourneyStore {
  try {
    const raw = window.localStorage.getItem(KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY);
    return raw ? normalizeStore(JSON.parse(raw)) : EMPTY_STORE;
  } catch {
    return EMPTY_STORE;
  }
}

let storeSnapshot = typeof window === "undefined" ? EMPTY_STORE : readStore();

function notify(): void {
  for (const listener of listeners) listener();
}

function persist(next: KnowledgeGapJourneyStore): void {
  storeSnapshot = next;
  try {
    window.localStorage.setItem(KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // The current page keeps a usable in-memory journey when storage is unavailable.
  }
  notify();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY) return;
  storeSnapshot = readStore();
  notify();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (!storageListenerAttached) {
    window.addEventListener("storage", handleStorage);
    storageListenerAttached = true;
  }
  return () => listeners.delete(listener);
}

function saveJourney(journey: KnowledgeGapJourney): void {
  const journeys = { ...storeSnapshot.journeys, [journey.target.id]: journey };
  const retained = Object.values(journeys)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, MAX_KNOWLEDGE_GAP_JOURNEYS);
  persist({
    version: 1,
    journeys: Object.fromEntries(retained.map((item) => [item.target.id, item])),
  });
}

export function useKnowledgeGapJourney(targetId: string): KnowledgeGapJourney | null {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => storeSnapshot,
    () => EMPTY_STORE
  );
  return snapshot.journeys[targetId] ?? null;
}

export function useKnowledgeGapJourneys(): readonly KnowledgeGapJourney[] {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => storeSnapshot,
    () => EMPTY_STORE
  );
  return useMemo(
    () =>
      Object.values(snapshot.journeys).sort((left, right) =>
        right.updatedAt.localeCompare(left.updatedAt)
      ),
    [snapshot]
  );
}

export function saveKnowledgeGapJourney(plan: KnowledgeGapPlan): void {
  saveJourney(createKnowledgeGapJourney(plan));
}

export function migrateSavedKnowledgeGapJourney(
  journey: KnowledgeGapJourney,
  plan: KnowledgeGapPlan
): void {
  saveJourney(migrateKnowledgeGapJourney(journey, plan));
}

export function keepSavedKnowledgeGapJourney(
  journey: KnowledgeGapJourney,
  currentFingerprint: string
): void {
  saveJourney(keepPreviousKnowledgeGapJourney(journey, currentFingerprint));
}

export function updateSavedKnowledgeGapJourneyBudget(
  journey: KnowledgeGapJourney,
  plan: KnowledgeGapPlan
): void {
  if (journey.relationFingerprint !== plan.version.fingerprint) return;
  saveJourney(updateKnowledgeGapJourneyBudget(journey, plan.totalMinutes));
}

export function setKnowledgeGapCheckpoint(
  journey: KnowledgeGapJourney,
  stepId: string,
  key: KnowledgeGapCheckpointKey,
  checked: boolean
): void {
  saveJourney(updateKnowledgeGapCheckpoint(journey, stepId, { [key]: checked }));
}

export function setKnowledgeGapCheckpointNote(
  journey: KnowledgeGapJourney,
  stepId: string,
  note: string
): void {
  saveJourney(updateKnowledgeGapCheckpoint(journey, stepId, { note: note.slice(0, 500) }));
}

export function removeKnowledgeGapJourney(targetId: string): void {
  const { [targetId]: _removed, ...remaining } = storeSnapshot.journeys;
  persist({ version: 1, journeys: remaining });
}

export function resetKnowledgeGapJourneys(): void {
  persist(EMPTY_STORE);
}

export function importKnowledgeGapJourneyArchive(
  archive: KnowledgeGapJourneyArchive,
  resolution: KnowledgeGapJourneyConflictResolution
): void {
  const merged = mergeKnowledgeGapJourneyArchive(
    Object.values(storeSnapshot.journeys),
    archive.journeys,
    resolution
  );
  persist({
    version: 1,
    journeys: Object.fromEntries(merged.map((journey) => [journey.target.id, journey])),
  });
}
