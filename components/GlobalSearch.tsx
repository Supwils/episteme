"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getSearchHistory, addToSearchHistory } from "@/lib/search-history";
import { trackEvent } from "@/lib/analytics";
import { SearchInput } from "./search/SearchInput";
import { SearchHistory } from "./search/SearchHistory";
import { SearchResults } from "./search/SearchResults";
import { useKnowledgeSearch } from "./search/useKnowledgeSearch";

const INPUT_DEBOUNCE_MS = 100;

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { query, setQuery, titleResults, bodyResults, searching } = useKnowledgeSearch();

  const flatResults = useMemo(() => [...titleResults, ...bodyResults], [titleResults, bodyResults]);

  const loadHistory = useCallback(() => setHistory(getSearchHistory()), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        loadHistory();
      }
    }
    function handleOpen() {
      setOpen(true);
      loadHistory();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-global-search", handleOpen);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-global-search", handleOpen);
    };
  }, [loadHistory]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

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
      const target = flatResults[activeIndex];
      if (e.key === "Enter" && target) {
        e.preventDefault();
        addToSearchHistory(query.trim());
        trackEvent({ type: "search", query: query.trim(), resultCount: flatResults.length });
        window.location.href = target.url;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, flatResults, activeIndex, query]);

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

  const handleHistoryClick = useCallback(
    (term: string) => {
      setQuery(term);
      if (inputRef.current) inputRef.current.value = term;
    },
    [setQuery]
  );

  const handleItemClick = useCallback(
    (url: string) => {
      addToSearchHistory(query.trim());
      trackEvent({ type: "search", query: query.trim(), resultCount: flatResults.length });
      setOpen(false);
      window.location.href = url;
    },
    [query, flatResults.length]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!open) return null;

  const trimmed = query.trim();
  const showHistory = !trimmed && history.length > 0;
  const hasResults = flatResults.length > 0;
  const activeId = flatResults[activeIndex] ? `gs-item-${flatResults[activeIndex].url}` : undefined;

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
              onHistoryClick={handleHistoryClick}
              onHistoryChange={loadHistory}
            />
          )}

          {!trimmed && !showHistory && (
            <div className="gs-empty">
              输入关键词开始搜索
              <span className="gs-empty-hint">
                标题即时匹配，正文全文检索覆盖 15 个学科的全部文章
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
