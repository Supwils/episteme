"use client";

import { useMemo, useSyncExternalStore } from "react";
import { MENTAL_HEALTH_COMPARISON_CHECKPOINTS } from "./mental-health-tour-comparison";

export const MENTAL_HEALTH_COMPARISON_STORAGE_KEY = "uk-mental-health-tour-comparison-v1";

export interface MentalHealthComparisonRecord {
  schemaVersion: 1;
  checkedIds: readonly string[];
  updatedAt: string;
}

const VALID_CHECKPOINT_IDS = new Set(
  MENTAL_HEALTH_COMPARISON_CHECKPOINTS.map((checkpoint) => checkpoint.id)
);

export function isMentalHealthComparisonRecord(
  value: unknown
): value is MentalHealthComparisonRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<MentalHealthComparisonRecord>;
  return (
    record.schemaVersion === 1 &&
    Array.isArray(record.checkedIds) &&
    record.checkedIds.every((id) => typeof id === "string" && VALID_CHECKPOINT_IDS.has(id)) &&
    new Set(record.checkedIds).size === record.checkedIds.length &&
    typeof record.updatedAt === "string" &&
    !Number.isNaN(Date.parse(record.updatedAt))
  );
}

function readRecord(): MentalHealthComparisonRecord | null {
  try {
    const raw = window.localStorage.getItem(MENTAL_HEALTH_COMPARISON_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isMentalHealthComparisonRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const listeners = new Set<() => void>();
let storageListenerAttached = false;
let recordSnapshot: MentalHealthComparisonRecord | null =
  typeof window === "undefined" ? null : readRecord();

function notify(): void {
  for (const listener of listeners) listener();
}

function persist(next: MentalHealthComparisonRecord | null): void {
  recordSnapshot = next;
  try {
    if (next) {
      window.localStorage.setItem(MENTAL_HEALTH_COMPARISON_STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(MENTAL_HEALTH_COMPARISON_STORAGE_KEY);
    }
  } catch {
    // The in-memory record remains usable when browser storage is unavailable.
  }
  notify();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== MENTAL_HEALTH_COMPARISON_STORAGE_KEY) return;
  recordSnapshot = readRecord();
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

export function readMentalHealthComparisonRecord(): MentalHealthComparisonRecord | null {
  return recordSnapshot;
}

export function useMentalHealthComparisonRecord(): MentalHealthComparisonRecord | null {
  return useSyncExternalStore(
    subscribe,
    () => recordSnapshot,
    () => null
  );
}

export function useMentalHealthComparisonCheckedIds(): ReadonlySet<string> {
  const record = useSyncExternalStore(
    subscribe,
    () => recordSnapshot,
    () => null
  );
  return useMemo(() => new Set(record?.checkedIds ?? []), [record]);
}

export function toggleMentalHealthComparisonCheckpoint(checkpointId: string): void {
  if (!VALID_CHECKPOINT_IDS.has(checkpointId)) return;
  const checked = new Set(recordSnapshot?.checkedIds ?? []);
  if (checked.has(checkpointId)) checked.delete(checkpointId);
  else checked.add(checkpointId);
  persist({
    schemaVersion: 1,
    checkedIds: [...checked],
    updatedAt: new Date().toISOString(),
  });
}

export function replaceMentalHealthComparisonRecord(record: MentalHealthComparisonRecord): void {
  persist(record.checkedIds.length > 0 ? record : null);
}

export function resetMentalHealthComparisonRecord(): void {
  persist(null);
}
