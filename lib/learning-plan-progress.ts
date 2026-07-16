"use client";

import { useSyncExternalStore } from "react";
import type { LearningPlanSelection } from "@/lib/knowledge-learning-plan";

const PROGRESS_KEY = "uk-learning-plan-progress";
const SELECTION_KEY = "uk-learning-plan-selection";
const TARGET_SELECTION_KEY = "uk-learning-target-selection";

export type LearningTargetSelection = {
  mode: "curated" | "all-nodes";
  targetId: string | null;
  anchorNodeId?: string | null;
};

type PlanProgressMap = Record<string, readonly string[]>;

function readProgress(): PlanProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "{}") as PlanProgressMap;
  } catch {
    return {};
  }
}

let progressMap = readProgress();
const listeners = new Set<() => void>();
const EMPTY_PROGRESS: PlanProgressMap = {};

function notify(): void {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeProgress(): void {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
  } catch {
    // Progress remains usable for the current page when storage is unavailable.
  }
}

export function toggleLearningPlanStep(planId: string, nodeId: string): void {
  const current = new Set(progressMap[planId] ?? []);
  if (current.has(nodeId)) current.delete(nodeId);
  else current.add(nodeId);
  progressMap = { ...progressMap, [planId]: [...current] };
  writeProgress();
  notify();
}

export function resetLearningPlanProgress(planId: string): void {
  const { [planId]: _removed, ...remaining } = progressMap;
  progressMap = remaining;
  writeProgress();
  notify();
}

export function useLearningPlanProgress(planId: string): readonly string[] {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => progressMap,
    () => EMPTY_PROGRESS
  );
  return snapshot[planId] ?? [];
}

export function loadLearningPlanSelection(): LearningPlanSelection | null {
  try {
    const raw = window.localStorage.getItem(SELECTION_KEY);
    return raw ? (JSON.parse(raw) as LearningPlanSelection) : null;
  } catch {
    return null;
  }
}

export function saveLearningPlanSelection(selection: LearningPlanSelection): void {
  try {
    window.localStorage.setItem(SELECTION_KEY, JSON.stringify(selection));
  } catch {
    // Selection persistence is optional when storage is unavailable.
  }
}

export function loadLearningTargetSelection(): LearningTargetSelection | null {
  try {
    const raw = window.localStorage.getItem(TARGET_SELECTION_KEY);
    return raw ? (JSON.parse(raw) as LearningTargetSelection) : null;
  } catch {
    return null;
  }
}

export function saveLearningTargetSelection(selection: LearningTargetSelection): void {
  try {
    window.localStorage.setItem(TARGET_SELECTION_KEY, JSON.stringify(selection));
  } catch {
    // Target selection persistence is optional when storage is unavailable.
  }
}
