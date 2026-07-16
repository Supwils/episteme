"use client";

import { useSyncExternalStore } from "react";

export const KNOWLEDGE_PROFILE_STORAGE_KEY = "uk-knowledge-profile-v1";

export interface KnowledgeProfileEntry {
  nodeId: string;
  confirmedAt: string;
}

export interface KnowledgeProfileSnapshot {
  version: 1;
  entries: readonly KnowledgeProfileEntry[];
}

const EMPTY_PROFILE: KnowledgeProfileSnapshot = { version: 1, entries: [] };
const listeners = new Set<() => void>();
let storageListenerAttached = false;
let profileSnapshot = typeof window === "undefined" ? EMPTY_PROFILE : readProfile();

function normalizeProfile(value: unknown): KnowledgeProfileSnapshot {
  if (!value || typeof value !== "object") return EMPTY_PROFILE;
  const entries = (value as { entries?: unknown }).entries;
  if (!Array.isArray(entries)) return EMPTY_PROFILE;
  const unique = new Map<string, KnowledgeProfileEntry>();
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const nodeId = (entry as { nodeId?: unknown }).nodeId;
    const confirmedAt = (entry as { confirmedAt?: unknown }).confirmedAt;
    if (typeof nodeId !== "string" || !nodeId || typeof confirmedAt !== "string") continue;
    unique.set(nodeId, { nodeId, confirmedAt });
  }
  return { version: 1, entries: [...unique.values()] };
}

function readProfile(): KnowledgeProfileSnapshot {
  try {
    const raw = window.localStorage.getItem(KNOWLEDGE_PROFILE_STORAGE_KEY);
    return raw ? normalizeProfile(JSON.parse(raw)) : EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

function notify(): void {
  for (const listener of listeners) listener();
}

function persist(next: KnowledgeProfileSnapshot): void {
  profileSnapshot = next;
  try {
    window.localStorage.setItem(KNOWLEDGE_PROFILE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // The in-memory profile remains usable when browser storage is unavailable.
  }
  notify();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== KNOWLEDGE_PROFILE_STORAGE_KEY) return;
  profileSnapshot = readProfile();
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

export function useKnowledgeProfile(): KnowledgeProfileSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => profileSnapshot,
    () => EMPTY_PROFILE
  );
}

export function setKnowledgeNodeMastered(nodeId: string, mastered: boolean): void {
  const entries = new Map(profileSnapshot.entries.map((entry) => [entry.nodeId, entry]));
  if (mastered) entries.set(nodeId, { nodeId, confirmedAt: new Date().toISOString() });
  else entries.delete(nodeId);
  persist({ version: 1, entries: [...entries.values()] });
}

export function replaceKnowledgeProfile(value: unknown): KnowledgeProfileSnapshot {
  const normalized = normalizeProfile(value);
  persist(normalized);
  return normalized;
}

export function resetKnowledgeProfile(): void {
  persist(EMPTY_PROFILE);
}
