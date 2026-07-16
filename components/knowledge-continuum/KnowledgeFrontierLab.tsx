"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { KnowledgeFrontierStatus } from "@/lib/knowledge-frontier";
import { fetchKnowledgeFrontier, type KnowledgeFrontierView } from "@/lib/knowledge-frontier-view";
import {
  replaceKnowledgeProfile,
  resetKnowledgeProfile,
  setKnowledgeNodeMastered,
  useKnowledgeProfile,
} from "@/lib/knowledge-profile";
import type { CoverageDomainId } from "@/lib/knowledge-continuum-coverage-meta";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { KnowledgeProfileSearch } from "./KnowledgeProfileSearch";
import { KnowledgeFrontierResults } from "./KnowledgeFrontierResults";
import { KnowledgeFrontierDomainStrip } from "./KnowledgeFrontierDomainStrip";
import { KnowledgeFrontierConfluences } from "./KnowledgeFrontierConfluences";
import { KnowledgeProfileActions } from "./KnowledgeProfileActions";
import { KnowledgeFrontierControls } from "./KnowledgeFrontierControls";
import { KnowledgeGapPlanPanel } from "./KnowledgeGapPlanPanel";
import { fetchKnowledgeGapPlan } from "@/lib/knowledge-gap-plan-view";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import { KnowledgeRelationReviewWorkbench } from "./KnowledgeRelationReviewWorkbench";
import { KnowledgeJourneyLibrary } from "./KnowledgeJourneyLibrary";

const PAGE_SIZE = 12;

export function KnowledgeFrontierLab({ embedded = false }: { embedded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planPanelRef = useRef<HTMLDivElement>(null);
  const scrollToPlanRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const profile = useKnowledgeProfile();
  const knownIds = useMemo(() => profile.entries.map((entry) => entry.nodeId), [profile.entries]);
  const masteredIdSet = useMemo(() => new Set(knownIds), [knownIds]);
  const [status, setStatus] = useState<KnowledgeFrontierStatus>("ready");
  const [domainId, setDomainId] = useState<CoverageDomainId | undefined>();
  const [level, setLevel] = useState<KnowledgeLevel | undefined>();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [offset, setOffset] = useState(0);
  const [view, setView] = useState<KnowledgeFrontierView | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [planTargetId, setPlanTargetId] = useState<string | null>(null);
  const [planMinutes, setPlanMinutes] = useState<LearningPlanMinutes>(45);
  const [gapPlan, setGapPlan] = useState<KnowledgeGapPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [planFailed, setPlanFailed] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setEnabled(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setEnabled(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    void fetchKnowledgeFrontier(
      knownIds,
      { status, domainId, level, query: deferredQuery, offset, limit: PAGE_SIZE },
      controller.signal
    )
      .then((next) => setView(next))
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [deferredQuery, domainId, enabled, knownIds, level, offset, status]);

  useEffect(() => {
    if (!enabled || !planTargetId) return;
    const controller = new AbortController();
    setPlanLoading(true);
    setPlanFailed(false);
    void fetchKnowledgeGapPlan(planTargetId, knownIds, planMinutes, controller.signal)
      .then((next) => setGapPlan(next))
      .catch(() => {
        if (!controller.signal.aborted) setPlanFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setPlanLoading(false);
      });
    return () => controller.abort();
  }, [enabled, knownIds, planMinutes, planTargetId]);

  useEffect(() => {
    if (!gapPlan || !scrollToPlanRef.current) return;
    scrollToPlanRef.current = false;
    planPanelRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [gapPlan]);

  const changeStatus = (next: KnowledgeFrontierStatus) => {
    setStatus(next);
    setOffset(0);
  };
  const pageStart = view && view.resultCount > 0 ? view.offset + 1 : 0;
  const pageEnd = view ? Math.min(view.offset + view.limit, view.resultCount) : 0;

  return (
    <div
      ref={containerRef}
      className="border-border-faint bg-bg-near mt-8 border"
      data-testid={embedded ? undefined : "knowledge-frontier-lab"}
      aria-labelledby="knowledge-frontier-title"
    >
      <div className="border-border-faint grid gap-5 border-b px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            reachable knowledge frontier
          </p>
          <h3
            id="knowledge-frontier-title"
            className="font-display text-fg-primary mt-1 text-xl font-semibold"
          >
            用你真正掌握的知识，计算下一步
          </h3>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            你只需主动确认已知节点。系统公开检查每条前置关系，把全图分为已掌握、现在可学和仍被阻塞；不读取浏览时长，也不生成能力分数。
          </p>
        </div>
        <KnowledgeProfileSearch
          masteredIds={masteredIdSet}
          onConfirm={(nodeId) => setKnowledgeNodeMastered(nodeId, true)}
        />
      </div>

      {view ? (
        <>
          <div className="border-border-faint grid border-b sm:grid-cols-4">
            <div className="border-border-faint border-b px-4 py-4 sm:border-r sm:border-b-0 sm:px-6">
              <p className="text-fg-disabled text-[9px]">全图状态</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">{view.summary.nodeCount}</p>
              <p className="text-fg-muted mt-1 text-[9px]">每个节点恰属一种状态</p>
            </div>
            <div className="border-border-faint border-b px-4 py-4 sm:border-r sm:border-b-0 sm:px-6">
              <p className="text-fg-disabled text-[9px]">儿童式自然入口</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">
                {knownIds.length === 0 ? view.summary.readyCount : view.recommendations.length}
              </p>
              <p className="text-fg-muted mt-1 text-[9px]">
                {knownIds.length === 0 ? "L1 无需平台前置" : "跨学科候选下一步"}
              </p>
            </div>
            <div className="border-border-faint border-b px-4 py-4 sm:border-r sm:border-b-0 sm:px-6">
              <p className="text-fg-disabled text-[9px]">已确认跨度</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">
                {view.summary.domainCount} 科 · L{view.summary.highestMasteredLevel || 0}
              </p>
              <p className="text-fg-muted mt-1 text-[9px]">仅统计主动确认</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <p className="text-fg-disabled text-[9px]">前置数据缺口</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">
                {view.summary.metadataGapCount}
              </p>
              <p className="text-fg-muted mt-1 text-[9px]">高阶无锚点，不伪装成可学</p>
            </div>
          </div>

          <KnowledgeJourneyLibrary
            knownIds={knownIds}
            masteredIds={masteredIdSet}
            onOpenJourney={(targetId, minutes) => {
              scrollToPlanRef.current = true;
              setGapPlan(null);
              setPlanMinutes(minutes);
              setPlanTargetId(targetId);
            }}
          />

          <KnowledgeFrontierDomainStrip
            domains={view.domains}
            selectedDomain={domainId}
            onSelect={(next) => {
              setDomainId(next);
              setOffset(0);
            }}
          />

          <div className="border-border-faint border-b px-4 py-5 sm:px-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-fg-muted font-mono text-[9px] tracking-[0.18em] uppercase">
                  diverse next steps
                </p>
                <p className="text-fg-secondary mt-1 text-[10px]">
                  每门当前可达学科只取一个候选，优先紧接已掌握前置和人工策展节点。
                </p>
              </div>
              <KnowledgeProfileActions
                profile={profile}
                knownNodes={view.knownNodes}
                onImport={replaceKnowledgeProfile}
                onReset={resetKnowledgeProfile}
              />
            </div>
            <div className="grid border-t border-l border-[var(--color-border-faint)] sm:grid-cols-3 lg:grid-cols-5">
              {view.recommendations.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => setKnowledgeNodeMastered(result.id, true)}
                  className="hover:bg-bg-panel min-h-20 border-r border-b border-[var(--color-border-faint)] px-3 py-3 text-left"
                >
                  <span className="text-fg-primary block text-[10px] leading-4">
                    {result.label}
                  </span>
                  <span className="text-fg-muted mt-1 block text-[9px]">
                    {result.domainLabel} · L{result.level}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <KnowledgeFrontierControls
            summary={view.summary}
            status={status}
            domainId={domainId}
            level={level}
            query={query}
            onStatusChange={changeStatus}
            onDomainChange={(next) => {
              setDomainId(next);
              setOffset(0);
            }}
            onLevelChange={(next) => {
              setLevel(next);
              setOffset(0);
            }}
            onQueryChange={(next) => {
              setQuery(next);
              setOffset(0);
            }}
          />

          {failed ? (
            <p role="alert" className="text-fg-secondary px-4 py-10 text-sm sm:px-6">
              学习前沿暂时无法计算，请稍后重试。
            </p>
          ) : loading && !view ? (
            <p role="status" className="text-fg-muted px-4 py-10 text-sm sm:px-6">
              正在核对全图前置关系…
            </p>
          ) : (
            <div className={loading ? "opacity-60" : undefined} aria-busy={loading}>
              <KnowledgeFrontierResults
                results={view.results}
                onSetMastered={setKnowledgeNodeMastered}
                onBuildPlan={(nodeId) => {
                  setGapPlan(null);
                  setPlanTargetId(nodeId);
                }}
                selectedTargetId={planTargetId}
              />
              <div className="border-border-faint flex items-center justify-between gap-4 border-t px-4 py-3 sm:px-6">
                <p className="text-fg-disabled text-[9px]">
                  {pageStart}–{pageEnd} / {view.resultCount}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={offset === 0}
                    onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                    className="border-border-faint text-fg-muted h-9 border px-3 text-[10px] disabled:opacity-35"
                  >
                    上一页
                  </button>
                  <button
                    type="button"
                    disabled={offset + PAGE_SIZE >= view.resultCount}
                    onClick={() => setOffset(offset + PAGE_SIZE)}
                    className="border-border-faint text-fg-muted h-9 border px-3 text-[10px] disabled:opacity-35"
                  >
                    下一页
                  </button>
                </div>
              </div>
              {planTargetId ? (
                <div ref={planPanelRef}>
                  <KnowledgeGapPlanPanel
                    plan={gapPlan}
                    loading={planLoading}
                    failed={planFailed}
                    minutes={planMinutes}
                    onMinutesChange={setPlanMinutes}
                    masteredIds={masteredIdSet}
                    onConfirmMastered={(nodeId) => setKnowledgeNodeMastered(nodeId, true)}
                    onClose={() => {
                      setPlanTargetId(null);
                      setGapPlan(null);
                      setPlanFailed(false);
                    }}
                  />
                </div>
              ) : null}
            </div>
          )}

          <KnowledgeFrontierConfluences confluences={view.confluences} />
          <KnowledgeRelationReviewWorkbench knownIds={knownIds} />
        </>
      ) : loading ? (
        <p role="status" className="text-fg-muted px-4 py-12 text-sm sm:px-6">
          正在核对全图前置关系…
        </p>
      ) : null}
    </div>
  );
}
