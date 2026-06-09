"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

export type GraphNode = {
  id: string;
  label: string;
  domain: string;
  type: string;
};

export type SearchMatchField =
  | "label-exact"
  | "label-substring"
  | "tag"
  | "description"
  | "label-fuzzy";

export type GroupedSearchResult = {
  domain: string;
  items: {
    node: GraphNode;
    score: number;
    matchField: SearchMatchField;
  }[];
};

const NODE_TYPES = [
  { id: "thinker", label: "思想家" },
  { id: "event", label: "事件" },
  { id: "species", label: "物种" },
  { id: "concept", label: "概念" },
  { id: "experiment", label: "实验" },
] as const;

const DOMAINS = [
  { id: "physics", label: "物理", color: "#6366f1" },
  { id: "history", label: "历史", color: "#f59e0b" },
  { id: "philosophy", label: "哲学", color: "#10b981" },
  { id: "life-science", label: "生命科学", color: "#ec4899" },
] as const;

const TYPE_LABEL_MAP: Record<string, string> = Object.fromEntries(
  NODE_TYPES.map((t) => [t.id, t.label]),
);

const DOMAIN_LABEL_MAP: Record<string, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d.label]),
);

function getDomainColor(domainId: string): string {
  return DOMAINS.find((d) => d.id === domainId)?.color ?? "#9ca3af";
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const lower = text.toLowerCase();
  const qLower = query.toLowerCase().trim();
  const idx = lower.indexOf(qLower);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-indigo-400/30 text-indigo-200 rounded-sm px-0.5">
        {text.slice(idx, idx + qLower.length)}
      </mark>
      {text.slice(idx + qLower.length)}
    </>
  );
}

function flattenResults(grouped: GroupedSearchResult[]): {
  node: GraphNode;
  score: number;
  matchField: SearchMatchField;
}[] {
  const flat: { node: GraphNode; score: number; matchField: SearchMatchField }[] = [];
  for (const group of grouped) {
    for (const item of group.items) {
      flat.push(item);
    }
  }
  return flat;
}

type GraphSearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: GroupedSearchResult[];
  onSearchSelect: (nodeId: string) => void;
  isMobile?: boolean;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
};

export function GraphSearch({
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchSelect,
  isMobile = false,
  searchInputRef,
}: GraphSearchProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const flatResults = flattenResults(searchResults);
  const showAutocomplete =
    isSearchFocused && searchQuery.length > 0 && flatResults.length > 0;

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-result-item]");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) &&
        !e.defaultPrevented
      ) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSelect = useCallback(
    (nodeId: string) => {
      onSearchSelect(nodeId);
      setIsSearchFocused(false);
      setActiveIndex(-1);
    },
    [onSearchSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showAutocomplete) {
        if (e.key === "Escape") {
          onSearchChange("");
          inputRef.current?.blur();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < flatResults.length) {
            handleSearchSelect(flatResults[activeIndex]!.node.id);
          } else if (flatResults.length > 0) {
            handleSearchSelect(flatResults[0]!.node.id);
          }
          break;
        case "Escape":
          e.preventDefault();
          onSearchChange("");
          inputRef.current?.blur();
          break;
      }
    },
    [showAutocomplete, flatResults, activeIndex, handleSearchSelect, onSearchChange],
  );

  let flatIdx = 0;

  return (
    <div
      className="relative flex-1 min-w-[140px] max-w-[280px]"
      ref={searchRef}
    >
      <div
        className={clsx(
          "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-200",
          isSearchFocused
            ? "border-[#6366f1]/40 shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
            : "border-white/[0.04] hover:border-white/[0.08]",
        )}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5 shrink-0 text-white/30"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          ref={(el) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
            if (searchInputRef) (searchInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
          }}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          placeholder="搜索节点…… (按 / 聚焦)"
          className="w-full bg-transparent text-xs text-white/80 outline-none placeholder:text-white/25"
          aria-label="搜索知识图谱节点"
          role="combobox"
          aria-expanded={showAutocomplete}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="shrink-0 text-white/30 hover:text-white/60 transition-colors duration-150"
            aria-label="清除搜索"
          >
            <svg
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-2.5 w-2.5"
            >
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        )}
        {!isSearchFocused && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[0.6rem] text-white/20 border border-white/[0.06] bg-white/[0.02]">
            /
          </kbd>
        )}
      </div>

      <AnimatePresence>
        {showAutocomplete && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 z-50 max-h-[280px] overflow-y-auto overscroll-contain rounded-lg border border-white/[0.08] bg-[#111118]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            id="search-results"
            role="listbox"
            aria-label="搜索结果"
          >
            {searchResults.map((group) => {
              const domainColor = getDomainColor(group.domain);
              const domainLabel =
                DOMAIN_LABEL_MAP[group.domain] ?? group.domain;
              return (
                <div key={group.domain}>
                  <div
                    className="flex items-center gap-1.5 px-3 pt-2 pb-1"
                    role="presentation"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: domainColor }}
                    />
                    <span className="text-[0.6rem] font-medium text-white/30 uppercase tracking-wider">
                      {domainLabel}
                    </span>
                  </div>
                  {group.items.map((item) => {
                    const idx = flatIdx++;
                    const isActive = idx === activeIndex;
                    const typeLabel =
                      TYPE_LABEL_MAP[item.node.type] ?? item.node.type;
                    return (
                      <button
                        key={item.node.id}
                        id={`search-result-${idx}`}
                        data-result-item
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleSearchSelect(item.node.id)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={clsx(
                          "w-full flex items-center gap-2 px-3 py-2 text-left text-xs transition-colors duration-100",
                          isActive
                            ? "bg-white/[0.08]"
                            : "hover:bg-white/[0.05]",
                        )}
                      >
                        <span className="text-white/80 truncate flex-1">
                          {highlightMatch(item.node.label, searchQuery)}
                        </span>
                        <span className="text-white/20 shrink-0 text-[0.65rem]">
                          {typeLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
            <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/[0.04]">
              <span className="text-[0.6rem] text-white/20">
                {flatResults.length} 个结果
              </span>
              <span className="text-[0.6rem] text-white/15">
                ↑↓ 导航 · Enter 选择
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
