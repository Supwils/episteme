"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COVERAGE_DOMAIN_META,
  type CoverageDomainId,
} from "@/lib/knowledge-continuum-coverage-meta";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import { fetchKnowledgeGapJourneyPlans } from "@/lib/knowledge-gap-journey-plans-view";
import {
  getKnowledgeGapJourneyLifecycle,
  summarizeKnowledgeGapJourneyEvidence,
  type KnowledgeGapJourneyEvidenceState,
  type KnowledgeGapJourneyLifecycle,
} from "@/lib/knowledge-gap-journey-library";
import { useKnowledgeGapJourneys } from "@/lib/knowledge-gap-journey-store";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import { KnowledgeJourneyArchiveActions } from "./KnowledgeJourneyArchiveActions";
import { KnowledgeJourneyLibraryCard } from "./KnowledgeJourneyLibraryCard";

type LifecycleFilter = KnowledgeGapJourneyLifecycle | "all";
type EvidenceFilter = KnowledgeGapJourneyEvidenceState | "all";

export function KnowledgeJourneyLibrary({
  knownIds,
  masteredIds,
  onOpenJourney,
}: {
  knownIds: readonly string[];
  masteredIds: ReadonlySet<string>;
  onOpenJourney: (targetId: string, minutes: LearningPlanMinutes) => void;
}) {
  const journeys = useKnowledgeGapJourneys();
  const [opened, setOpened] = useState(false);
  const [plans, setPlans] = useState<Readonly<Record<string, KnowledgeGapPlan>>>({});
  const [versionState, setVersionState] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [lifecycleFilter, setLifecycleFilter] = useState<LifecycleFilter>("all");
  const [domainFilter, setDomainFilter] = useState<CoverageDomainId | "all">("all");
  const [levelFilter, setLevelFilter] = useState<KnowledgeLevel | "all">("all");
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceFilter>("all");

  useEffect(() => {
    if (!opened || journeys.length === 0) {
      setVersionState("idle");
      setPlans({});
      return;
    }
    const controller = new AbortController();
    setVersionState("loading");
    void fetchKnowledgeGapJourneyPlans(
      journeys.map((journey) => ({
        targetId: journey.target.id,
        minutes: journey.totalMinutes,
      })),
      knownIds,
      controller.signal
    )
      .then((view) => {
        setPlans(Object.fromEntries(view.plans.map((plan) => [plan.target.id, plan])));
        setVersionState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setVersionState("failed");
      });
    return () => controller.abort();
  }, [journeys, knownIds, opened]);

  const domains = useMemo(
    () =>
      [...new Set(journeys.map((journey) => journey.target.domainId))].sort((left, right) =>
        COVERAGE_DOMAIN_META[left].label.localeCompare(COVERAGE_DOMAIN_META[right].label, "zh-CN")
      ),
    [journeys]
  );
  const items = useMemo(
    () =>
      journeys.map((journey) => ({
        journey,
        plan: plans[journey.target.id],
        lifecycle: getKnowledgeGapJourneyLifecycle(journey, plans[journey.target.id]),
        evidence: summarizeKnowledgeGapJourneyEvidence(journey, masteredIds),
      })),
    [journeys, masteredIds, plans]
  );
  const filteredItems = items.filter(
    (item) =>
      (lifecycleFilter === "all" || item.lifecycle === lifecycleFilter) &&
      (domainFilter === "all" || item.journey.target.domainId === domainFilter) &&
      (levelFilter === "all" || item.journey.target.level === levelFilter) &&
      (evidenceFilter === "all" || item.evidence.state === evidenceFilter)
  );
  const pendingCount = items.filter((item) => item.lifecycle === "pending").length;
  const keptCount = items.filter((item) => item.lifecycle === "keep-previous").length;

  return (
    <section
      className="border-border-faint border-b"
      aria-labelledby="journey-library-title"
      data-testid="knowledge-journey-library"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div>
          <p className="text-fg-muted font-mono text-[9px] tracking-[0.18em] uppercase">
            local journey archive
          </p>
          <h4 id="journey-library-title" className="text-fg-primary mt-1 text-sm font-medium">
            路线档案库
          </h4>
          <p className="text-fg-disabled mt-1 text-[9px] leading-5">
            本机保存 {journeys.length}/16 条路线；集中核对版本、证据清单与下一待办，不生成能力分数。
          </p>
        </div>
        <button
          type="button"
          aria-expanded={opened}
          onClick={() => setOpened((current) => !current)}
          className="border-border-faint text-fg-muted hover:text-fg-primary min-h-10 border px-4 text-[10px]"
        >
          {opened ? "收起档案库" : "打开档案库"}
        </button>
      </div>

      {opened ? (
        <div className="border-border-faint border-t">
          <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            <label className="text-fg-disabled text-[8px]">
              版本状态
              <select
                aria-label="路线版本状态筛选"
                value={lifecycleFilter}
                onChange={(event) => setLifecycleFilter(event.target.value as LifecycleFilter)}
                className="border-border-faint bg-bg-base text-fg-muted mt-1 block h-9 w-full border px-2 text-[9px]"
              >
                <option value="all">全部版本</option>
                <option value="current">当前版本</option>
                <option value="pending">待迁移</option>
                <option value="keep-previous">继续旧版</option>
                <option value="unknown">不可核对</option>
              </select>
            </label>
            <label className="text-fg-disabled text-[8px]">
              学科
              <select
                aria-label="路线学科筛选"
                value={domainFilter}
                onChange={(event) =>
                  setDomainFilter(event.target.value as CoverageDomainId | "all")
                }
                className="border-border-faint bg-bg-base text-fg-muted mt-1 block h-9 w-full border px-2 text-[9px]"
              >
                <option value="all">全部学科</option>
                {domains.map((domainId) => (
                  <option key={domainId} value={domainId}>
                    {COVERAGE_DOMAIN_META[domainId].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-fg-disabled text-[8px]">
              阶段
              <select
                aria-label="路线阶段筛选"
                value={levelFilter}
                onChange={(event) =>
                  setLevelFilter(
                    event.target.value === "all"
                      ? "all"
                      : (Number(event.target.value) as KnowledgeLevel)
                  )
                }
                className="border-border-faint bg-bg-base text-fg-muted mt-1 block h-9 w-full border px-2 text-[9px]"
              >
                <option value="all">全部阶段</option>
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    L{level}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-fg-disabled text-[8px]">
              证据完整度
              <select
                aria-label="路线证据完整度筛选"
                value={evidenceFilter}
                onChange={(event) => setEvidenceFilter(event.target.value as EvidenceFilter)}
                className="border-border-faint bg-bg-base text-fg-muted mt-1 block h-9 w-full border px-2 text-[9px]"
              >
                <option value="all">全部记录</option>
                <option value="none">尚未记录</option>
                <option value="in-progress">已有记录</option>
                <option value="complete">清单已齐</option>
              </select>
            </label>
          </div>

          <div className="border-border-faint flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 sm:px-6">
            <p className="text-fg-disabled text-[9px]">
              显示 {filteredItems.length}/{journeys.length} 条
              {versionState === "ready" ? ` · 待迁移 ${pendingCount} · 继续旧版 ${keptCount}` : ""}
            </p>
            {versionState === "loading" ? (
              <p role="status" className="text-fg-muted text-[9px]">
                正在批量核对当前版本…
              </p>
            ) : versionState === "failed" ? (
              <p role="alert" className="text-fg-secondary text-[9px]">
                当前版本暂时无法核对，档案仍可导出或删除。
              </p>
            ) : null}
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2">
              {filteredItems.map((item) => (
                <KnowledgeJourneyLibraryCard
                  key={item.journey.target.id}
                  journey={item.journey}
                  plan={item.plan}
                  masteredIds={masteredIds}
                  onOpen={onOpenJourney}
                />
              ))}
            </div>
          ) : (
            <p className="text-fg-muted px-4 py-8 text-[10px] sm:px-6">
              {journeys.length === 0 ? "尚未保存学习路线。" : "没有符合当前筛选的路线。"}
            </p>
          )}
          <KnowledgeJourneyArchiveActions journeys={journeys} />
        </div>
      ) : null}
    </section>
  );
}
