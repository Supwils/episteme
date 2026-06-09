const STORAGE_KEY = 'philosophy-reading-progress';

export type ReadingProgress = {
  [slug: string]: {
    visited: boolean;
    lastVisited: string;
    scrollPercent: number;
    completed: boolean;
  };
};

function readStorage(): ReadingProgress {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return {};
  }
}

function writeStorage(data: ReadingProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

export function getProgress(): ReadingProgress {
  return readStorage();
}

export function markVisited(slug: string): void {
  const data = readStorage();
  const existing = data[slug];
  data[slug] = {
    visited: true,
    lastVisited: new Date().toISOString(),
    scrollPercent: existing?.scrollPercent ?? 0,
    completed: existing?.completed ?? false,
  };
  writeStorage(data);
}

export function updateScroll(slug: string, percent: number): void {
  const data = readStorage();
  const existing = data[slug];
  if (!existing) return;
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  data[slug] = {
    ...existing,
    scrollPercent: Math.max(existing.scrollPercent, clamped),
    lastVisited: new Date().toISOString(),
  };
  if (clamped >= 95) {
    data[slug].completed = true;
  }
  writeStorage(data);
}

export function markCompleted(slug: string): void {
  const data = readStorage();
  const existing = data[slug];
  data[slug] = {
    visited: true,
    lastVisited: new Date().toISOString(),
    scrollPercent: existing?.scrollPercent ?? 100,
    completed: true,
  };
  writeStorage(data);
}

export function getCompletionStats(): {
  total: number;
  visited: number;
  completed: number;
} {
  const data = readStorage();
  const entries = Object.values(data);
  return {
    total: entries.length,
    visited: entries.filter((e) => e.visited).length,
    completed: entries.filter((e) => e.completed).length,
  };
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently ignore
  }
}
