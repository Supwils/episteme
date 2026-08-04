"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  ADOLESCENT_SERVICE_OPTIONS,
  type AdolescentServiceConstraints,
  type AdolescentServiceOptionId,
} from "./adolescent-service-portfolio";

export const ADOLESCENT_SERVICE_LAB_STORAGE_KEY = "uk-adolescent-service-lab-v1";
export const MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS = 8;

export interface AdolescentServiceLabSnapshot {
  id: string;
  savedAt: string;
  constraints: AdolescentServiceConstraints;
  sensitivityOptionId: AdolescentServiceOptionId;
  costMultiplier: number;
  effectMultiplier: number;
}

interface AdolescentServiceLabStore {
  version: 1;
  snapshots: readonly AdolescentServiceLabSnapshot[];
}

const EMPTY_STORE: AdolescentServiceLabStore = { version: 1, snapshots: [] };
const OPTION_IDS = new Set(ADOLESCENT_SERVICE_OPTIONS.map((option) => option.id));

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function inRange(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

export function isAdolescentServiceLabSnapshot(
  value: unknown
): value is AdolescentServiceLabSnapshot {
  if (!value || typeof value !== "object") return false;
  const snapshot = value as Partial<AdolescentServiceLabSnapshot>;
  const constraints = snapshot.constraints as Partial<AdolescentServiceConstraints> | undefined;
  return (
    typeof snapshot.id === "string" &&
    snapshot.id.length > 0 &&
    isTimestamp(snapshot.savedAt) &&
    !!constraints &&
    typeof constraints === "object" &&
    inRange(constraints.budgetUnits, 12, 36) &&
    Number.isInteger(constraints.budgetUnits) &&
    inRange(constraints.equityWeight, 1, 3) &&
    inRange(constraints.minimumUnderservedShare, 0.2, 0.65) &&
    typeof constraints.requireCompletePathway === "boolean" &&
    typeof snapshot.sensitivityOptionId === "string" &&
    OPTION_IDS.has(snapshot.sensitivityOptionId as AdolescentServiceOptionId) &&
    inRange(snapshot.costMultiplier, 0.5, 1.5) &&
    inRange(snapshot.effectMultiplier, 0.5, 1.5)
  );
}

function sortSnapshots(
  snapshots: readonly AdolescentServiceLabSnapshot[]
): readonly AdolescentServiceLabSnapshot[] {
  return snapshots
    .slice()
    .sort((left, right) => right.savedAt.localeCompare(left.savedAt))
    .slice(0, MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS);
}

function readStore(): AdolescentServiceLabStore {
  try {
    const raw = window.localStorage.getItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY);
    if (!raw) return EMPTY_STORE;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY_STORE;
    const snapshots = (parsed as { snapshots?: unknown }).snapshots;
    if (!Array.isArray(snapshots)) return EMPTY_STORE;
    return {
      version: 1,
      snapshots: sortSnapshots(snapshots.filter(isAdolescentServiceLabSnapshot)),
    };
  } catch {
    return EMPTY_STORE;
  }
}

const listeners = new Set<() => void>();
let storageListenerAttached = false;
let storeSnapshot: AdolescentServiceLabStore =
  typeof window === "undefined" ? EMPTY_STORE : readStore();

function notify(): void {
  for (const listener of listeners) listener();
}

function persist(next: AdolescentServiceLabStore): void {
  storeSnapshot = next;
  try {
    window.localStorage.setItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // The current page keeps usable in-memory snapshots when storage is unavailable.
  }
  notify();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== ADOLESCENT_SERVICE_LAB_STORAGE_KEY) return;
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

export function useAdolescentServiceLabSnapshots(): readonly AdolescentServiceLabSnapshot[] {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => storeSnapshot,
    () => EMPTY_STORE
  );
  return useMemo(() => snapshot.snapshots, [snapshot]);
}

export function saveAdolescentServiceLabSnapshot(
  input: Omit<AdolescentServiceLabSnapshot, "id" | "savedAt">
): AdolescentServiceLabSnapshot {
  const snapshot: AdolescentServiceLabSnapshot = {
    ...input,
    id: `lab-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
  };
  persist({ version: 1, snapshots: sortSnapshots([snapshot, ...storeSnapshot.snapshots]) });
  return snapshot;
}

export function removeAdolescentServiceLabSnapshot(id: string): void {
  persist({
    version: 1,
    snapshots: storeSnapshot.snapshots.filter((snapshot) => snapshot.id !== id),
  });
}

export function mergeAdolescentServiceLabSnapshots(
  existing: readonly AdolescentServiceLabSnapshot[],
  incoming: readonly AdolescentServiceLabSnapshot[]
): readonly AdolescentServiceLabSnapshot[] {
  const merged = new Map(existing.map((snapshot) => [snapshot.id, snapshot]));
  for (const snapshot of incoming) {
    if (!merged.has(snapshot.id)) merged.set(snapshot.id, snapshot);
  }
  return sortSnapshots([...merged.values()]);
}

export function importAdolescentServiceLabSnapshots(
  incoming: readonly AdolescentServiceLabSnapshot[]
): void {
  persist({
    version: 1,
    snapshots: mergeAdolescentServiceLabSnapshots(storeSnapshot.snapshots, incoming),
  });
}

export function resetAdolescentServiceLabSnapshots(): void {
  persist(EMPTY_STORE);
}
