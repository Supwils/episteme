"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchHistory, addToSearchHistory } from "@/lib/search-history";
import { trackEvent } from "@/lib/analytics";
import { useModalDialog } from "./interaction/useModalDialog";
import { normalizeSearchQuery } from "@/lib/search/query";
import { COVERAGE_DOMAIN_COUNT } from "@/lib/knowledge-continuum-coverage-meta";
import { SearchInput } from "./search/SearchInput";
import { SearchHistory, SearchHistoryHeader } from "./search/SearchHistory";
import { SearchPreview } from "./search/SearchPreview";
import { SearchResults } from "./search/SearchResults";
import { searchResultDomId } from "./search/SearchResultItem";
import { orderResultsForDisplay, SEARCH_NO_RESULTS_EXITS } from "./search/types";
import { useKnowledgeSearch } from "./search/useKnowledgeSearch";
import "./search/search.css";

const INPUT_DEBOUNCE_MS = 100;

/**
 * The ⌘K dialog. Mounted lazily by SearchLauncher; `openOnMount` opens it for
 * the request that caused the load, after which it handles ⌘K itself.
 */
export function GlobalSearch({ openOnMount = false }: { openOnMount?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const location = `${pathname}?${searchParams.toString()}`;
  const previousLocationRef = useRef(location);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedOnMountRef = useRef(false);

  const { query, setQuery, titleResults, bodyResults, searching, warmup } = useKnowledgeSearch();

  // Keyboard navigation walks this list top to bottom, so it must match the
  // visual grouping exactly (score order here would jump across sections).
  const flatResults = useMemo(
    () => orderResultsForDisplay(titleResults, bodyResults),
    [titleResults, bodyResults]
  );

  const loadHistory = useCallback(() => setHistory(getSearchHistory()), []);
  const cancelPendingQuery = useCallback(() => {
    if (debounceRef.current !== null) clearTimeout(debounceRef.current);
    debounceRef.current = null;
  }, []);
  const closeSearch = useCallback(() => {
    cancelPendingQuery();
    setQuery("");
    setOpen(false);
  }, [cancelPendingQuery, setQuery]);

  // ClientShell keeps this overlay mounted across App Router navigations.
  // History and programmatic navigation must release the same work as the
  // close button. An unchanged URL (including StrictMode replay) is no exit.
  useEffect(() => {
    if (previousLocationRef.current === location) return;
    previousLocationRef.current = location;
    closeSearch();
  }, [location, closeSearch]);

  useEffect(() => {
    function openSearch() {
      cancelPendingQuery();
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
      if (e.isComposing || e.keyCode === 229) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) closeSearch();
        else openSearch();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-global-search", openSearch);
    if (openOnMount && !openedOnMountRef.current) {
      openedOnMountRef.current = true;
      openSearch();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-global-search", openSearch);
    };
  }, [loadHistory, open, setQuery, warmup, cancelPendingQuery, closeSearch, openOnMount]);

  useModalDialog(open, dialogRef, { initialFocusRef: inputRef });

  useEffect(() => setActiveIndex(0), [query]);

  // Title and body results arrive separately; a late title batch is inserted
  // ahead of the body rows, so the selection follows the result, not the index.
  const previousResultsRef = useRef(flatResults);
  useEffect(() => {
    const previous = previousResultsRef.current;
    previousResultsRef.current = flatResults;
    if (previous === flatResults) return;
    setActiveIndex((index) => {
      const selected = previous[index];
      const moved = selected ? flatResults.indexOf(selected) : -1;
      return moved === -1 ? 0 : moved;
    });
  }, [flatResults]);

  const trimmed = normalizeSearchQuery(query);
  const showHistory = !trimmed && history.length > 0;
  // With no query the walkable list is the search history.
  const walkLength = trimmed ? flatResults.length : showHistory ? history.length : 0;

  const handleHistoryClick = useCallback(
    (term: string) => {
      const normalized = normalizeSearchQuery(term);
      cancelPendingQuery();
      setQuery(normalized);
      setActiveIndex(0);
      if (inputRef.current) inputRef.current.value = normalized;
      inputRef.current?.focus();
    },
    [setQuery, cancelPendingQuery]
  );

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.isComposing || e.keyCode === 229) return;
      // Links and history controls keep their native keyboard activation.
      if (e.target !== inputRef.current) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, Math.max(walkLength - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key !== "Enter") return;
      // The visible input can be ahead of the debounced query and its results,
      // and results may still be loading. Rather than swallow the keypress, hand
      // the typed text to the full results page.
      const typed = normalizeSearchQuery(inputRef.current?.value ?? trimmed);
      const target = typed === trimmed ? flatResults[activeIndex] : undefined;
      if (typed && target) {
        e.preventDefault();
        addToSearchHistory(typed);
        trackEvent({ type: "search", query: typed, resultCount: flatResults.length });
        closeSearch();
        router.push(target.url);
      } else if (typed) {
        e.preventDefault();
        addToSearchHistory(typed);
        trackEvent({ type: "search", query: typed, resultCount: flatResults.length });
        closeSearch();
        router.push(`/search?q=${encodeURIComponent(typed)}`);
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
  }, [
    open,
    flatResults,
    activeIndex,
    trimmed,
    walkLength,
    history,
    router,
    handleHistoryClick,
    closeSearch,
  ]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleQueryChange = useCallback(
    (value: string) => {
      cancelPendingQuery();
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        setQuery(value);
      }, INPUT_DEBOUNCE_MS);
    },
    [setQuery, cancelPendingQuery]
  );

  const handleItemClick = useCallback(
    (url: string) => {
      addToSearchHistory(trimmed);
      trackEvent({ type: "search", query: trimmed, resultCount: flatResults.length });
      closeSearch();
      router.push(url);
    },
    [trimmed, flatResults.length, router, closeSearch]
  );

  useEffect(() => cancelPendingQuery, [cancelPendingQuery]);

  if (!open) return null;

  const hasResults = flatResults.length > 0;
  const activeId = trimmed
    ? flatResults[activeIndex]
      ? searchResultDomId(activeIndex)
      : undefined
    : showHistory && history[activeIndex]
      ? `gs-history-${activeIndex}`
      : undefined;

  return (
    <dialog
      ref={dialogRef}
      className="gs-overlay"
      aria-modal="true"
      aria-label="全站搜索"
      onCancel={(event) => {
        event.preventDefault();
        closeSearch();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearch();
      }}
    >
      <div className="gs-panel">
        <SearchInput
          inputRef={inputRef}
          activeId={activeId}
          hasList={Boolean(trimmed) || showHistory}
          onChange={handleQueryChange}
          onClose={closeSearch}
        />

        <div className="gs-body">
          <div className="gs-results" ref={listRef}>
            {/* Exactly one listbox (#gs-result-list) is mounted at a time and it
              only contains options/groups; empty states and exits below are
              plain content so AT never announces them as selectable items. */}
            {showHistory && (
              <>
                <SearchHistoryHeader onHistoryChange={loadHistory} />
                <SearchHistory
                  history={history}
                  activeIndex={activeIndex}
                  onHistoryClick={handleHistoryClick}
                  onHistoryChange={loadHistory}
                  onActivate={setActiveIndex}
                />
              </>
            )}
            {trimmed && (
              <div id="gs-result-list" role="listbox" aria-label="搜索结果">
                <SearchResults
                  query={trimmed}
                  titleResults={titleResults}
                  bodyResults={bodyResults}
                  flatResults={flatResults}
                  activeIndex={activeIndex}
                  onActivate={setActiveIndex}
                  onSelect={handleItemClick}
                />
              </div>
            )}

            {!trimmed && !showHistory && (
              <div className="gs-empty">
                输入关键词开始搜索
                <span className="gs-empty-hint">
                  标题即时匹配，正文全文检索覆盖 {COVERAGE_DOMAIN_COUNT} 个学科的全部文章
                </span>
                <span className="gs-empty-exits">
                  {SEARCH_NO_RESULTS_EXITS.map((exit) => (
                    <a
                      key={exit.href}
                      className="gs-empty-exit"
                      href={exit.href}
                      onClick={closeSearch}
                    >
                      {exit.label}
                    </a>
                  ))}
                </span>
              </div>
            )}

            {trimmed && searching && !hasResults && (
              <div className="gs-empty">正在检索「{trimmed}」…</div>
            )}

            {trimmed && !searching && !hasResults && (
              <div className="gs-empty">
                未找到「{trimmed.length > 40 ? `${trimmed.slice(0, 40)}…` : trimmed}」相关结果
                <span className="gs-empty-hint">试试更短的关键词，或直接输入记得的一句话</span>
                <span className="gs-empty-exits">
                  {SEARCH_NO_RESULTS_EXITS.map((exit) => (
                    <a
                      key={exit.href}
                      className="gs-empty-exit"
                      href={exit.href}
                      onClick={closeSearch}
                    >
                      {exit.label}
                    </a>
                  ))}
                </span>
              </div>
            )}
          </div>
          {trimmed && hasResults && (
            <SearchPreview result={flatResults[activeIndex]} onNavigate={handleItemClick} />
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
            <a
              className="gs-footer-link"
              href={`/search?q=${encodeURIComponent(trimmed)}`}
              onClick={closeSearch}
            >
              查看全部结果
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
