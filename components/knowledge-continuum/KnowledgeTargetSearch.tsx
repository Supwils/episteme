"use client";

import { useEffect, useId, useState } from "react";
import type {
  KnowledgeBranchTarget,
  KnowledgeTargetFilter,
  KnowledgeTargetSearchResult,
} from "@/lib/knowledge-branch";
import { KNOWLEDGE_BRANCH_CONFIDENCE_META } from "@/lib/knowledge-branch";
import { COVERAGE_DOMAIN_META } from "@/lib/knowledge-continuum-coverage-meta";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";

export function KnowledgeTargetSearch({
  selectedTarget,
  filter,
  onClearFilter,
  onSelect,
}: {
  selectedTarget: KnowledgeBranchTarget | null;
  filter: KnowledgeTargetFilter | null;
  onClearFilter: () => void;
  onSelect: (targetId: string) => Promise<void>;
}) {
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly KnowledgeTargetSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const domainId = filter?.domainId;
  const level = filter?.level;
  const confidenceFilter = filter?.confidence;
  const filterParts = [
    domainId ? COVERAGE_DOMAIN_META[domainId].label : null,
    level ? `L${level} ${KNOWLEDGE_LEVELS[level - 1]!.label}` : null,
    confidenceFilter ? KNOWLEDGE_BRANCH_CONFIDENCE_META[confidenceFilter].label : null,
  ].filter(Boolean);

  const selectResult = async (result: KnowledgeTargetSearchResult) => {
    await onSelect(result.id);
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setSearchError(false);
      try {
        const params = new URLSearchParams({ q: query });
        if (domainId) params.set("domain", domainId);
        if (level) params.set("level", String(level));
        if (confidenceFilter) params.set("confidence", confidenceFilter);
        const response = await fetch(`/api/learning-targets?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Knowledge target search failed");
        const data = (await response.json()) as { results: KnowledgeTargetSearchResult[] };
        setResults(data.results);
        setActiveIndex(-1);
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setSearchError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 120);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [confidenceFilter, domainId, level, open, query]);

  return (
    <div className="relative">
      <div className="text-fg-muted mb-1.5 flex min-h-4 items-center justify-between gap-2 text-[10px]">
        <label htmlFor={`${listboxId}-input`}>
          搜索全部知识节点{filterParts.length > 0 ? ` · ${filterParts.join(" / ")}` : ""}
        </label>
        {filterParts.length > 0 && (
          <button
            type="button"
            onClick={onClearFilter}
            className="text-fg-disabled hover:text-fg-primary shrink-0 border-b border-current"
          >
            清除
          </button>
        )}
      </div>
      <input
        id={`${listboxId}-input`}
        type="search"
        role="combobox"
        aria-label="搜索全部知识节点"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-activedescendant={
          open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
        }
        value={open ? query : (selectedTarget?.label ?? "")}
        placeholder="输入概念、人物、事件或方法"
        onFocus={() => {
          setQuery("");
          setOpen(true);
          setActiveIndex(-1);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && results.length > 0) {
            event.preventDefault();
            setActiveIndex((current) => Math.min(current + 1, results.length - 1));
          } else if (event.key === "ArrowUp" && results.length > 0) {
            event.preventDefault();
            setActiveIndex((current) => Math.max(current - 1, 0));
          } else if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            const result = results[activeIndex];
            if (result) void selectResult(result);
          } else if (event.key === "Escape") {
            setOpen(false);
            setActiveIndex(-1);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false);
        }}
        className="border-border-faint bg-bg-base text-fg-primary placeholder:text-fg-disabled h-11 w-full border px-3 text-xs"
      />

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="知识节点搜索结果"
          aria-busy={loading}
          className="border-border-faint bg-bg-base absolute top-full right-0 left-0 z-20 mt-1 max-h-72 overflow-y-auto border shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
        >
          {loading ? (
            <p className="text-fg-muted px-3 py-4 text-xs">正在查找节点…</p>
          ) : searchError ? (
            <p role="status" className="text-fg-secondary px-3 py-4 text-xs">
              节点搜索暂时不可用，请稍后重试。
            </p>
          ) : results.length > 0 ? (
            results.map((result, index) => {
              const confidence = KNOWLEDGE_BRANCH_CONFIDENCE_META[result.confidence];
              return (
                <button
                  key={result.id}
                  id={`${listboxId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={selectedTarget?.id === result.id}
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => void selectResult(result)}
                  className={`border-border-faint flex min-h-14 w-full items-center gap-3 border-b px-3 py-2 text-left transition-colors ${
                    activeIndex === index ? "bg-bg-panel" : "hover:bg-bg-panel"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0"
                    style={{ backgroundColor: result.domainColor }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="text-fg-primary block truncate text-xs">{result.label}</span>
                    <span className="text-fg-muted mt-0.5 block truncate text-[10px]">
                      {result.domainLabel} · L{result.level} · 锚点 {result.anchorLabel}
                      {result.candidateCount > 1 ? ` · ${result.candidateCount}条等距来路` : ""}
                    </span>
                  </span>
                  <span className="text-fg-disabled shrink-0 font-mono text-[9px]">
                    {confidence.label}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="text-fg-muted px-3 py-4 text-xs">没有匹配的知识节点。</p>
          )}
        </div>
      )}
    </div>
  );
}
