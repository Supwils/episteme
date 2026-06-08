const HISTORY_KEY = "uk-search-history";
const MAX_HISTORY = 10;

export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function addToSearchHistory(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;

  const history = getSearchHistory().filter((h) => h !== trimmed);
  history.unshift(trimmed);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // storage quota exceeded — ignore
  }
}

export function removeFromSearchHistory(query: string): void {
  if (typeof window === "undefined") return;
  const history = getSearchHistory().filter((h) => h !== query);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function clearSearchHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}
