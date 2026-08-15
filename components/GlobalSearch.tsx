"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSearchHistory, addToSearchHistory } from "@/lib/search-history";
import { trackEvent } from "@/lib/analytics";
import { COVERAGE_DOMAIN_COUNT } from "@/lib/knowledge-continuum-coverage-meta";
import { SearchInput } from "./search/SearchInput";
import { SearchHistory } from "./search/SearchHistory";
import { SearchResults } from "./search/SearchResults";
import { orderResultsForDisplay } from "./search/types";
import { useKnowledgeSearch } from "./search/useKnowledgeSearch";

const INPUT_DEBOUNCE_MS = 100;

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { query, setQuery, titleResults, bodyResults, searching, warmup } = useKnowledgeSearch();

  // Keyboard navigation walks this list top to bottom, so it must match the
  // visual grouping exactly (score order here would jump across sections).
  const flatResults = useMemo(
    () => orderResultsForDisplay(titleResults, bodyResults),
    [titleResults, bodyResults]
  );

  const loadHistory = useCallback(() => setHistory(getSearchHistory()), []);

  useEffect(() => {
    function openSearch() {
      // The input unmounts on close, so reopening must reset the query too —
      // otherwise the box is empty but last session's results still show.
      setQuery("");
      if (inputRef.current) inputRef.current.value = "";
      setActiveIndex(0);
      setOpen(true);
      loadHistory();
      // Start the one-time index parse now so the first keystroke never waits.
      warmup();
    }
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else openSearch();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-global-search", openSearch);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-global-search", openSearch);
    };
  }, [loadHistory, open, setQuery, warmup]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const trimmed = query.trim();
  const showHistory = !trimmed && history.length > 0;
  // With no query the walkable list is the search history.
  const walkLength = trimmed ? flatResults.length : showHistory ? history.length : 0;

  const handleHistoryClick = useCallback(
    (term: string) => {
      setQuery(term);
      setActiveIndex(0);
      if (inputRef.current) inputRef.current.value = term;
      inputRef.current?.focus();
    },
    [setQuery]
  );

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
        setActiveIndex((prev) => Math.min(prev + 1, Math.max(walkLength - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key !== "Enter") return;
      if (trimmed) {
        const target = flatResults[activeIndex];
        if (target) {
          e.preventDefault();
          addToSearchHistory(trimmed);
          trackEvent({ type: "search", query: trimmed, resultCount: flatResults.length });
          setOpen(false);
          router.push(target.url);
        }
      } else {
        const term = history[activeIndex];
        if (term) {
          e.preventDefault();
          handleHistoryClick(term);
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, flatResults, activeIndex, trimmed, walkLength, history, router, handleHistoryClick]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleQueryChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setQuery(value), INPUT_DEBOUNCE_MS);
    },
    [setQuery]
  );

  const handleItemClick = useCallback(
    (url: string) => {
      addToSearchHistory(query.trim());
      trackEvent({ type: "search", query: query.trim(), resultCount: flatResults.length });
      setOpen(false);
      router.push(url);
    },
    [query, flatResults.length, router]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!open) return null;

  const hasResults = flatResults.length > 0;
  const activeId = trimmed
    ? flatResults[activeIndex]
      ? `gs-item-${flatResults[activeIndex].url}`
      : undefined
    : showHistory && history[activeIndex]
      ? `gs-history-${activeIndex}`
      : undefined;

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
        <SearchInput inputRef={inputRef} activeId={activeId} onChange={handleQueryChange} />

        <div className="gs-results" ref={listRef} id="gs-result-list" role="listbox">
          {showHistory && (
            <SearchHistory
              history={history}
              activeIndex={activeIndex}
              onHistoryClick={handleHistoryClick}
              onHistoryChange={loadHistory}
              onActivate={setActiveIndex}
            />
          )}

          {!trimmed && !showHistory && (
            <div className="gs-empty">
              输入关键词开始搜索
              <span className="gs-empty-hint">
                标题即时匹配，正文全文检索覆盖 {COVERAGE_DOMAIN_COUNT} 个学科的全部文章
              </span>
            </div>
          )}

          {trimmed && (
            <SearchResults
              query={trimmed}
              titleResults={titleResults}
              bodyResults={bodyResults}
              flatResults={flatResults}
              activeIndex={activeIndex}
              onActivate={setActiveIndex}
              onSelect={handleItemClick}
            />
          )}

          {trimmed && searching && !hasResults && (
            <div className="gs-empty">正在检索「{trimmed}」…</div>
          )}

          {trimmed && !searching && !hasResults && (
            <div className="gs-empty">
              未找到「{trimmed.length > 40 ? `${trimmed.slice(0, 40)}…` : trimmed}」相关结果
              <span className="gs-empty-hint">试试更短的关键词，或直接输入记得的一句话</span>
            </div>
          )}
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
          {trimmed && (
            <a className="gs-footer-link" href={`/search?q=${encodeURIComponent(trimmed)}`}>
              查看全部结果
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
