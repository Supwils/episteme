// @ts-nocheck
const STORAGE_KEY = 'history-continue-reading';

export function saveReadingProgress({ title, page = 0, type = 'timeline' }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, page, type, ts: Date.now() }));
  } catch (e) {}
}

export function getReadingProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.title) return null;
    return data;
  } catch (e) {
    return null;
  }
}

export function clearReadingProgress(title) {
  try {
    if (!title) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    const current = getReadingProgress();
    if (current?.title === title) localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

export function estimateReadMinutes(pageCount) {
  return Math.max(1, Math.round((pageCount || 1) * 2));
}
