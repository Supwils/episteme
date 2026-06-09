import { useSyncExternalStore } from "react";

const STORAGE_KEY = "uk-reading-progress";

export interface ReadingProgress {
  slug: string;
  section: string;
  title: string;
  url: string;
  scrollPct: number;
  lastSection?: string;
  lastVisit: number;
}

type ProgressMap = Record<string, ReadingProgress>;

function readStorage(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

function writeStorage(data: ProgressMap): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

let progressMap: ProgressMap = readStorage();

const listeners = new Set<() => void>();

function notify() {
  for (const cb of listeners) {
    cb();
  }
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): ProgressMap {
  return progressMap;
}

const EMPTY_MAP: ProgressMap = {};

function getServerSnapshot(): ProgressMap {
  return EMPTY_MAP;
}

export function getReadingHistory(): ReadingProgress[] {
  return Object.values(progressMap).sort((a, b) => b.lastVisit - a.lastVisit);
}

export function updateReadingProgress(
  partial: Partial<ReadingProgress> & { slug: string }
): void {
  const existing = progressMap[partial.slug];
  const scrollPct = partial.scrollPct ?? existing?.scrollPct ?? 0;
  const clamped = Math.min(100, Math.max(0, Math.round(scrollPct)));

  progressMap = {
    ...progressMap,
    [partial.slug]: {
      slug: partial.slug,
      section: partial.section ?? existing?.section ?? "",
      title: partial.title ?? existing?.title ?? "",
      url: partial.url ?? existing?.url ?? "",
      scrollPct: existing ? Math.max(existing.scrollPct, clamped) : clamped,
      lastSection: partial.lastSection ?? existing?.lastSection,
      lastVisit: Date.now(),
    },
  };
  writeStorage(progressMap);
  notify();
}

export function getLastRead(): ReadingProgress | null {
  const entries = Object.values(progressMap);
  if (entries.length === 0) return null;
  return entries.reduce((a, b) => (a.lastVisit > b.lastVisit ? a : b));
}

export function clearReadingHistory(): void {
  progressMap = {};
  writeStorage(progressMap);
  notify();
}

export function useReadingHistory(): ReadingProgress[] {
  const map = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return Object.values(map).sort((a, b) => b.lastVisit - a.lastVisit);
}

export function useLastRead(): ReadingProgress | null {
  const map = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const entries = Object.values(map);
  if (entries.length === 0) return null;
  return entries.reduce((a, b) => (a.lastVisit > b.lastVisit ? a : b));
}
