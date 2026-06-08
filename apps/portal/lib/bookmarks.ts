import { useSyncExternalStore } from "react";

const STORAGE_KEY = "uk-bookmarks";

export interface Bookmark {
  slug: string;
  section: string;
  title: string;
  url: string;
  createdAt: number;
}

type BookmarkMap = Record<string, Bookmark>;

function readStorage(): BookmarkMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as BookmarkMap;
  } catch {
    return {};
  }
}

function writeStorage(data: BookmarkMap): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

let bookmarks: BookmarkMap = readStorage();

function notify() {
  for (const cb of listeners) {
    cb();
  }
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): BookmarkMap {
  return bookmarks;
}

const EMPTY_MAP: BookmarkMap = {};

function getServerSnapshot(): BookmarkMap {
  return EMPTY_MAP;
}

export function getBookmarks(): Bookmark[] {
  return Object.values(bookmarks).sort((a, b) => b.createdAt - a.createdAt);
}

export function addBookmark(bookmark: Omit<Bookmark, "createdAt">): void {
  bookmarks = {
    ...bookmarks,
    [bookmark.slug]: {
      ...bookmark,
      createdAt: Date.now(),
    },
  };
  writeStorage(bookmarks);
  notify();
}

export function removeBookmark(slug: string): void {
  const next = { ...bookmarks };
  delete next[slug];
  bookmarks = next;
  writeStorage(bookmarks);
  notify();
}

export function toggleBookmark(bookmark: Omit<Bookmark, "createdAt">): void {
  if (bookmarks[bookmark.slug]) {
    removeBookmark(bookmark.slug);
  } else {
    addBookmark(bookmark);
  }
}

export function isBookmarked(slug: string): boolean {
  return slug in bookmarks;
}

export function useBookmarks(): Bookmark[] {
  const map = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return Object.values(map).sort((a, b) => b.createdAt - a.createdAt);
}

export function useIsBookmarked(slug: string): boolean {
  const map = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return slug in map;
}
