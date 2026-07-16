"use client";

import { useEffect, useId, useState } from "react";
import type { KnowledgeTargetSearchResult } from "@/lib/knowledge-branch";

export function KnowledgeProfileSearch({
  masteredIds,
  onConfirm,
}: {
  masteredIds: ReadonlySet<string>;
  onConfirm: (nodeId: string) => void;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly KnowledgeTargetSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setFailed(false);
      try {
        const response = await fetch(
          `/api/learning-targets?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Knowledge profile search failed");
        const data = (await response.json()) as { results: KnowledgeTargetSearchResult[] };
        setResults(data.results);
        setActiveIndex(-1);
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 120);
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [open, query]);

  const confirm = (result: KnowledgeTargetSearchResult) => {
    onConfirm(result.id);
    setQuery("");
    setOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div className="relative">
      <label htmlFor={`${id}-input`} className="text-fg-muted mb-1.5 block text-[10px]">
        搜索并确认你已经理解的节点
      </label>
      <input
        id={`${id}-input`}
        type="search"
        role="combobox"
        aria-label="搜索已掌握知识节点"
        aria-expanded={open}
        aria-controls={`${id}-results`}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        value={query}
        placeholder="例如：水循环、概率、因果关系、社会结构"
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && results.length > 0) {
            event.preventDefault();
            setActiveIndex((current) => Math.min(results.length - 1, current + 1));
          } else if (event.key === "ArrowUp" && results.length > 0) {
            event.preventDefault();
            setActiveIndex((current) => Math.max(0, current - 1));
          } else if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            const result = results[activeIndex];
            if (result && !masteredIds.has(result.id)) confirm(result);
          } else if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false);
        }}
        className="border-border-faint bg-bg-base text-fg-primary placeholder:text-fg-disabled h-11 w-full border px-3 text-xs"
      />

      {open ? (
        <div
          id={`${id}-results`}
          role="listbox"
          aria-label="可确认的知识节点"
          aria-busy={loading}
          className="border-border-faint bg-bg-base absolute top-full right-0 left-0 z-30 mt-1 max-h-72 overflow-y-auto border shadow-[0_14px_30px_rgba(0,0,0,0.38)]"
        >
          {loading ? (
            <p className="text-fg-muted px-3 py-4 text-xs">正在查找节点…</p>
          ) : failed ? (
            <p role="status" className="text-fg-secondary px-3 py-4 text-xs">
              搜索暂时不可用，请稍后重试。
            </p>
          ) : results.length === 0 ? (
            <p className="text-fg-muted px-3 py-4 text-xs">没有匹配节点。</p>
          ) : (
            results.map((result, index) => {
              const mastered = masteredIds.has(result.id);
              return (
                <button
                  key={result.id}
                  id={`${id}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={mastered}
                  disabled={mastered}
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => confirm(result)}
                  className={`border-border-faint flex min-h-14 w-full items-center gap-3 border-b px-3 py-2 text-left ${
                    activeIndex === index ? "bg-bg-panel" : "hover:bg-bg-panel"
                  } disabled:cursor-default disabled:opacity-50`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0"
                    style={{ backgroundColor: result.domainColor }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="text-fg-primary block truncate text-xs">{result.label}</span>
                    <span className="text-fg-muted mt-0.5 block truncate text-[10px]">
                      {result.domainLabel} · L{result.level} · {result.anchorLabel}
                    </span>
                  </span>
                  <span className="text-fg-disabled text-[9px]">
                    {mastered ? "已确认" : "确认"}
                  </span>
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
