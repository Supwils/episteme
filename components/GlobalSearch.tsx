"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { SearchResult as MiniSearchResult } from "minisearch";
import type { SearchDocument } from "@/lib/search-index";
import {
  getSearchHistory,
  addToSearchHistory,
} from "@/lib/search-history";
import { trackEvent } from "@/lib/analytics";
import type { Section, SearchResult, SearchEngine } from "./search/types";
import { SECTION_META } from "./search/types";
import { SearchInput } from "./search/SearchInput";
import { SearchHistory } from "./search/SearchHistory";
import { SearchResultItem } from "./search/SearchResultItem";

let enginePromise: Promise<SearchEngine> | null = null;

function ensureEngine(): Promise<SearchEngine> {
  if (!enginePromise) {
    enginePromise = import("@/lib/search-index").then((mod) => mod.getSearchIndex());
  }
  return enginePromise;
}

function collectMatchTerms(result: MiniSearchResult): string[] {
  const terms = new Set<string>();
  const matchInfo = result.match as Record<string, string[]>;
  for (const matchedTerms of Object.values(matchInfo)) {
    for (const term of matchedTerms) {
      terms.add(term);
    }
  }
  return Array.from(terms);
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const engineRef = useRef<SearchEngine | null>(null);

  const loadHistory = useCallback(() => {
    setHistory(getSearchHistory());
  }, []);

  const ensureIndex = useCallback(() => {
    if (engineRef.current) return;
    setLoading(true);
    ensureEngine()
      .then((engine) => {
        engineRef.current = engine;
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            ensureIndex();
            loadHistory();
          }
          return !prev;
        });
      }
    }
    function handleOpen() {
      ensureIndex();
      loadHistory();
      setOpen(true);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-global-search", handleOpen);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-global-search", handleOpen);
    };
  }, [ensureIndex, loadHistory]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo((): SearchResult[] => {
    const trimmed = query.trim();
    if (!trimmed || !engineRef.current) return [];

    const searchResults = engineRef.current.index.search(trimmed).slice(0, 30);
    const docMap = new Map(engineRef.current.documents.map((d) => [d.id, d]));

    return searchResults
      .map((r) => {
        const doc = docMap.get(r.id);
        if (!doc) return null;
        const terms = collectMatchTerms(r);
        const titleLower = doc.title.toLowerCase();
        const subtitleLower = doc.subtitle.toLowerCase();
        const contentLower = doc.content.toLowerCase();

        return {
          doc,
          score: r.score,
          titleMatches: terms.filter((t) => titleLower.includes(t.toLowerCase())),
          subtitleMatches: terms.filter((t) => subtitleLower.includes(t.toLowerCase())),
          contentMatches: terms.filter((t) => contentLower.includes(t.toLowerCase())),
        };
      })
      .filter((r): r is SearchResult => r !== null);
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<Section, SearchResult[]> = {
      physics: [],
      history: [],
      philosophy: [],
      "life-science": [],
      economics: [],
      psychology: [],
      cosmology: [],
    };
    for (const result of results) {
      const section = result.doc.section as Section;
      if (section in groups) {
        groups[section].push(result);
      }
    }
    return groups;
  }, [results]);

  const flatResults = useMemo(() => {
    const result: SearchResult[] = [];
    for (const section of ["physics", "history", "philosophy", "life-science", "economics", "psychology"] as Section[]) {
      result.push(...grouped[section]);
    }
    return result;
  }, [grouped]);

  const flatIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    flatResults.forEach((item, index) => map.set(item.doc.id, index));
    return map;
  }, [flatResults]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && flatResults[activeIndex]) {
        e.preventDefault();
        addToSearchHistory(query.trim());
        trackEvent({ type: "search", query: query.trim(), resultCount: flatResults.length });
        window.location.href = flatResults[activeIndex].doc.url;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, flatResults, activeIndex, query]);

  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleQueryChange = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setQuery(value);
    }, 100);
  }, []);

  const handleHistoryClick = useCallback((term: string) => {
    setQuery(term);
    if (inputRef.current) {
      inputRef.current.value = term;
    }
  }, []);

  const handleHistoryChange = useCallback(() => {
    setHistory(getSearchHistory());
  }, []);

  const handleItemClick = useCallback(
    (url: string) => {
      addToSearchHistory(query.trim());
      trackEvent({ type: "search", query: query.trim(), resultCount: flatResults.length });
      setOpen(false);
      window.location.href = url;
    },
    [query, flatResults.length],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const showHistory = !query.trim() && history.length > 0;
  const showSuggestions = query.trim().length >= 2 && query.trim().length < 4;
  const hasResults = flatResults.length > 0;

  if (!open) return null;

  const activeId = flatResults[activeIndex] ? `gs-item-${flatResults[activeIndex].doc.id}` : undefined;

  return (
    <div
      className="gs-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="全站搜索"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="gs-panel">
        <SearchInput
          inputRef={inputRef}
          activeId={activeId}
          onChange={handleQueryChange}
        />

        <div className="gs-results" ref={listRef} id="gs-result-list" role="listbox">
          {loading && <div className="gs-empty">正在加载搜索索引…</div>}

          {!loading && showHistory && (
            <SearchHistory
              history={history}
              onHistoryClick={handleHistoryClick}
              onHistoryChange={handleHistoryChange}
            />
          )}

          {!loading && !query.trim() && !showHistory && (
            <div className="gs-empty">
              输入关键词开始搜索
              <span className="gs-empty-hint">支持宇宙物理、人类历史、哲学思想、生命科学、经济学、心理学</span>
            </div>
          )}

          {!loading && showSuggestions && !hasResults && (
            <div className="gs-empty">
              正在搜索「{query.trim()}」…
              <span className="gs-empty-hint">输入更多字符以获取更精确的结果</span>
            </div>
          )}

          {!loading && query.trim() && !showSuggestions && !hasResults && (
            <div className="gs-empty">
              未找到「{query.length > 100 ? `${query.slice(0, 100)}…` : query}」相关结果
              <span className="gs-empty-hint">试试其他关键词</span>
            </div>
          )}

          {(["physics", "history", "philosophy", "life-science", "economics", "psychology"] as Section[]).map((section) => {
            const sectionResults = grouped[section];
            if (sectionResults.length === 0) return null;
            const meta = SECTION_META[section];
            return (
              <div key={section} className="gs-group">
                <div className="gs-group-label" style={{ color: meta.color }}>
                  {meta.label}
                </div>
                {sectionResults.map((result) => {
                  const currentIndex = flatIndexMap.get(result.doc.id) ?? 0;
                  return (
                    <SearchResultItem
                      key={result.doc.id}
                      result={result}
                      isActive={currentIndex === activeIndex}
                      onClick={handleItemClick}
                      onMouseEnter={() => setActiveIndex(currentIndex)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="gs-footer">
          <span>
            <kbd className="gs-kbd-sm">↑↓</kbd> 导航
          </span>
          <span>
            <kbd className="gs-kbd-sm">↵</kbd> 打开
          </span>
          <span>
            <kbd className="gs-kbd-sm">esc</kbd> 关闭
          </span>
        </div>
      </div>
    </div>
  );
}
