"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  KNOWLEDGE_CONFLUENCE_REVIEW_META,
  type KnowledgeConfluence,
  type KnowledgeConfluenceSummaryCatalog,
} from "@/lib/knowledge-confluence";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import {
  cacheKnowledgeConfluence,
  hasCachedKnowledgeConfluence,
  parseConfluenceMinutes,
  requestKnowledgeConfluence,
  updateKnowledgeConfluenceUrl,
} from "@/lib/knowledge-confluence-client";
import { KnowledgeConfluenceDetail } from "./KnowledgeConfluenceDetail";

function shouldHandleLink(event: MouseEvent<HTMLAnchorElement>): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function KnowledgeConfluenceExplorer({
  catalog,
  initialConfluence,
  initialMinutes,
  embedded = false,
}: {
  catalog: KnowledgeConfluenceSummaryCatalog;
  initialConfluence: KnowledgeConfluence | null;
  initialMinutes: LearningPlanMinutes;
  embedded?: boolean;
}) {
  const initialId = initialConfluence?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [confluence, setConfluence] = useState<KnowledgeConfluence | null>(initialConfluence);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [minutes, setMinutes] = useState<LearningPlanMinutes>(initialMinutes);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialConfluence) cacheKnowledgeConfluence(initialConfluence);
  }, [initialConfluence]);

  const loadConfluence = useCallback(
    async (id: string) => {
      if (!catalog.confluences.some((item) => item.id === id)) return;
      activeRequest.current?.abort();
      const controller = new AbortController();
      activeRequest.current = controller;
      setSelectedId(id);
      setLoadError(null);

      setConfluence(null);
      setLoadingId(id);
      try {
        const nextConfluence = await requestKnowledgeConfluence(id, controller.signal);
        if (!controller.signal.aborted) setConfluence(nextConfluence);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : "Unable to load confluence");
        }
      } finally {
        if (!controller.signal.aborted) setLoadingId(null);
      }
    },
    [catalog.confluences]
  );

  useEffect(() => {
    function restoreFromHistory() {
      const params = new URLSearchParams(window.location.search);
      const requestedId = params.get("confluence");
      setMinutes(parseConfluenceMinutes(params.get("confluenceMinutes")));
      if (requestedId && catalog.confluences.some((item) => item.id === requestedId)) {
        void loadConfluence(requestedId);
      } else {
        activeRequest.current?.abort();
        setSelectedId(null);
        setConfluence(null);
        setLoadingId(null);
        setLoadError(null);
      }
    }
    window.addEventListener("popstate", restoreFromHistory);
    return () => window.removeEventListener("popstate", restoreFromHistory);
  }, [catalog.confluences, loadConfluence]);

  useEffect(() => {
    if (initialConfluence) return;
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("confluence");
    if (!requestedId || !catalog.confluences.some((item) => item.id === requestedId)) return;
    setMinutes(parseConfluenceMinutes(params.get("confluenceMinutes")));
    void loadConfluence(requestedId);
  }, [catalog.confluences, initialConfluence, loadConfluence]);

  useEffect(() => () => activeRequest.current?.abort(), []);

  useEffect(() => {
    if (!confluence) return;
    const activeIndex = catalog.confluences.findIndex((item) => item.id === confluence.id);
    const adjacentIds = [
      catalog.confluences[activeIndex - 1]?.id,
      catalog.confluences[activeIndex + 1]?.id,
    ].filter((id): id is string => Boolean(id && !hasCachedKnowledgeConfluence(id)));
    if (adjacentIds.length === 0) return;
    const prefetch = () => {
      for (const id of adjacentIds) void requestKnowledgeConfluence(id).catch(() => undefined);
    };
    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(prefetch, { timeout: 1800 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }
    const timeoutId = globalThis.setTimeout(prefetch, 600);
    return () => globalThis.clearTimeout(timeoutId);
  }, [catalog.confluences, confluence]);

  function selectConfluence(event: MouseEvent<HTMLAnchorElement>, confluenceId: string) {
    if (!shouldHandleLink(event)) return;
    event.preventDefault();
    updateKnowledgeConfluenceUrl(confluenceId, minutes, "push");
    void loadConfluence(confluenceId);
  }

  function changeMinutes(nextMinutes: LearningPlanMinutes) {
    setMinutes(nextMinutes);
    if (selectedId) updateKnowledgeConfluenceUrl(selectedId, nextMinutes, "replace");
  }

  const activeSummary = catalog.confluences.find((item) => item.id === selectedId) ?? null;

  return (
    <section
      id="knowledge-confluence"
      className="border-border-faint bg-bg-near mt-8 scroll-mt-20 border"
      aria-labelledby="knowledge-confluence-title"
      data-testid={embedded ? undefined : "knowledge-confluence-explorer"}
    >
      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            interdisciplinary confluence
          </p>
          <h3
            id="knowledge-confluence-title"
            className="font-display text-fg-primary mt-1 text-xl font-semibold"
          >
            多学科知识汇流
          </h3>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            同一个研究问题需要多条前置路线并行抵达。这里明确区分必要解释、互补尺度和争议检验，不把相关性冒充共同结论。
          </p>
        </div>
        <div className="text-fg-disabled text-[10px] leading-5 lg:text-right" aria-live="polite">
          {catalog.confluences.length} 个研究问题
          {activeSummary ? ` · ${activeSummary.strandCount} 条并行路线` : " · 轻量主题目录"}
          <br />
          {activeSummary
            ? `${activeSummary.domainCount} 门学科 · ${activeSummary.nodeCount} 个策展节点`
            : "完整路线按研究问题载入"}
        </div>
      </div>

      <nav
        className="border-border-faint grid border-b sm:grid-cols-2 xl:grid-cols-5"
        aria-label="研究问题"
      >
        {catalog.confluences.map((item) => {
          const active = item.id === selectedId;
          const review = KNOWLEDGE_CONFLUENCE_REVIEW_META[item.reviewStatus];
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={active ? "true" : undefined}
              onClick={(event) => selectConfluence(event, item.id)}
              className={`border-border-faint min-h-36 border-b px-4 py-4 transition-colors motion-reduce:transition-none sm:border-r xl:border-b-0 ${
                active ? "bg-bg-elevated" : "hover:bg-bg-elevated"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-fg-primary text-xs font-medium">{item.title}</span>
                <span className="text-[9px]" style={{ color: review.color }}>
                  {review.label}
                </span>
              </span>
              <span className="text-fg-muted mt-2 block text-[10px] leading-4">
                {item.question}
              </span>
              <span className="text-fg-disabled mt-3 block font-mono text-[9px]">
                {item.domainCount} 学科 · {item.evidenceSourceCount} 来源 · L5 {item.targetLabel}
              </span>
            </a>
          );
        })}
      </nav>

      {loadingId ? (
        <div
          className="text-fg-muted flex min-h-44 items-center justify-center px-6 text-xs"
          role="status"
          data-testid="knowledge-confluence-loading"
        >
          正在整理“{activeSummary?.title}”的路线与证据台账…
        </div>
      ) : loadError ? (
        <div className="min-h-44 px-4 py-8 text-center sm:px-6" role="alert">
          <p className="text-fg-secondary text-xs">路线详情暂时无法载入。</p>
          <button
            type="button"
            onClick={() => selectedId && void loadConfluence(selectedId)}
            className="text-fg-primary border-border-faint mt-4 min-h-10 border px-4 text-xs"
          >
            重新载入
          </button>
        </div>
      ) : confluence ? (
        <KnowledgeConfluenceDetail
          key={confluence.id}
          confluence={confluence}
          minutes={minutes}
          onMinutesChange={changeMinutes}
        />
      ) : (
        <div
          className="grid min-h-44 gap-3 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          data-testid="knowledge-confluence-summary-state"
        >
          <div>
            <p className="text-fg-primary text-sm font-medium">五种开放问题，五种汇流结构</p>
            <p className="text-fg-muted mt-2 max-w-3xl text-[11px] leading-5">
              技术、制度、历史、行为与价值判断在这里保持各自证据边界；研究综合发生在路线之间，而不是用单一答案抹平分歧。
            </p>
          </div>
          <p className="text-fg-disabled font-mono text-[9px] lg:text-right">
            摘要 5 题 · 完整详情 0 题
          </p>
        </div>
      )}
    </section>
  );
}
