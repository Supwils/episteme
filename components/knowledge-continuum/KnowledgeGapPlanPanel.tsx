"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import { LEARNING_PLAN_DURATIONS, type LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import { KnowledgeGapJourneyPanel } from "./KnowledgeGapJourneyPanel";

export function KnowledgeGapPlanPanel({
  plan,
  loading,
  failed,
  minutes,
  onMinutesChange,
  masteredIds,
  onConfirmMastered,
  onClose,
}: {
  plan: KnowledgeGapPlan | null;
  loading: boolean;
  failed: boolean;
  minutes: LearningPlanMinutes;
  onMinutesChange: (minutes: LearningPlanMinutes) => void;
  masteredIds: ReadonlySet<string>;
  onConfirmMastered: (nodeId: string) => void;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const layers = useMemo(() => {
    const grouped = new Map<number, KnowledgeGapPlan["steps"]>();
    for (const step of plan?.steps ?? []) {
      grouped.set(step.layer, [...(grouped.get(step.layer) ?? []), step]);
    }
    return [...grouped.entries()].sort(([left], [right]) => left - right);
  }, [plan]);

  useEffect(() => {
    if (plan || failed) titleRef.current?.focus();
  }, [failed, plan]);

  return (
    <section
      className="border-border-faint bg-bg-elevated border-t"
      aria-labelledby="knowledge-gap-plan-title"
      data-testid="knowledge-gap-plan"
    >
      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.2em] uppercase">
            prerequisite gap dag
          </p>
          <h4
            ref={titleRef}
            id="knowledge-gap-plan-title"
            tabIndex={-1}
            className="text-fg-primary mt-1 text-sm font-medium outline-none"
          >
            {plan ? `通往“${plan.target.label}”的精确补缺路线` : "正在生成补缺路线"}
          </h4>
          <p className="text-fg-muted mt-1 text-[10px] leading-5">
            只计算经过复核的必要前置；推荐背景和相关语境不会阻塞你。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="border-border-faint flex max-w-full overflow-x-auto border"
            role="group"
            aria-label="补缺路线学习时长"
          >
            {LEARNING_PLAN_DURATIONS.map((duration) => {
              const active = minutes === duration.minutes;
              return (
                <button
                  key={duration.minutes}
                  type="button"
                  aria-pressed={active}
                  title={duration.description}
                  onClick={() => onMinutesChange(duration.minutes)}
                  className={`h-10 min-w-20 px-3 text-[10px] transition-colors motion-reduce:transition-none ${
                    active ? "bg-fg-primary text-bg-base" : "text-fg-muted hover:text-fg-primary"
                  }`}
                >
                  {duration.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border-border-faint text-fg-muted hover:text-fg-primary h-10 border px-3 text-[10px]"
          >
            关闭路线
          </button>
        </div>
      </div>

      {failed ? (
        <p role="alert" className="text-fg-secondary px-4 py-8 text-xs sm:px-6">
          补缺路线暂时无法生成，请稍后重试。
        </p>
      ) : loading && !plan ? (
        <p role="status" className="text-fg-muted px-4 py-8 text-xs sm:px-6">
          正在遍历必要前置并计算拓扑顺序…
        </p>
      ) : plan && !plan.available ? (
        <p className="text-fg-secondary px-4 py-8 text-xs leading-5 sm:px-6">
          {plan.boundaryMessage}
        </p>
      ) : plan ? (
        <div className={loading ? "opacity-60" : undefined} aria-busy={loading}>
          <div className="border-border-faint grid border-b sm:grid-cols-4">
            <div className="border-border-faint border-b px-4 py-4 sm:border-r sm:border-b-0 sm:px-6">
              <p className="text-fg-disabled text-[9px]">未掌握前置</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">{plan.gapCount}</p>
            </div>
            <div className="border-border-faint border-b px-4 py-4 sm:border-r sm:border-b-0 sm:px-6">
              <p className="text-fg-disabled text-[9px]">拓扑步骤</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">{plan.steps.length}</p>
            </div>
            <div className="border-border-faint border-b px-4 py-4 sm:border-r sm:border-b-0 sm:px-6">
              <p className="text-fg-disabled text-[9px]">依赖层数</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">{layers.length}</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <p className="text-fg-disabled text-[9px]">时间预算</p>
              <p className="text-fg-primary mt-1 font-mono text-lg">{plan.totalMinutes}m</p>
            </div>
          </div>

          {plan.knownBoundary.length > 0 ? (
            <p className="border-border-faint text-fg-muted border-b px-4 py-3 text-[10px] leading-5 sm:px-6">
              <span className="text-fg-secondary">已掌握边界：</span>
              {plan.knownBoundary.map((node) => node.label).join("、")}
            </p>
          ) : null}

          {layers.length > 0 ? (
            <div className="border-border-faint border-b px-4 py-5 sm:px-6">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-fg-muted text-[10px]">缺口依赖图</p>
                  <p className="text-fg-disabled mt-1 text-[9px]">
                    从左向右推进；同列节点可以并行，箭头关系以“解锁”说明公开。
                  </p>
                </div>
                <span className="text-fg-disabled font-mono text-[9px]">
                  {plan.edges.length} 条硬依赖
                </span>
              </div>
              <div className="max-w-full overflow-x-auto pb-2">
                <div
                  className="grid min-w-max gap-3"
                  style={{ gridTemplateColumns: `repeat(${layers.length}, minmax(190px, 1fr))` }}
                >
                  {layers.map(([layer, steps]) => (
                    <div key={layer} className="min-w-48">
                      <p className="text-fg-disabled mb-2 font-mono text-[9px]">
                        {layer === layers.length ? "目标层" : `前置层 ${layer}`}
                      </p>
                      <div className="space-y-2">
                        {steps.map((step) => (
                          <div
                            key={step.id}
                            className="border-border-faint bg-bg-base min-h-28 border p-3"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="h-2 w-2 shrink-0"
                                style={{ backgroundColor: step.domainColor }}
                                aria-hidden="true"
                              />
                              <span className="text-fg-primary text-[10px] leading-4">
                                {step.label}
                              </span>
                            </div>
                            <p className="text-fg-disabled mt-2 text-[9px]">
                              {step.domainLabel} · L{step.level} · {step.minutes}m
                            </p>
                            <p className="text-fg-muted mt-2 text-[9px] leading-4">{step.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="border-border-faint text-fg-muted border-b px-4 py-6 text-xs sm:px-6">
              该目标已经由你确认掌握，不再需要补缺步骤。
            </p>
          )}

          {plan.steps.length > 0 ? (
            <div className="border-border-faint border-b px-4 py-5 sm:px-6">
              <p className="text-fg-muted mb-3 text-[10px]">拓扑学习顺序</p>
              <ol className="divide-border-faint border-border-faint divide-y border-t border-b">
                {plan.steps.map((step) => (
                  <li
                    key={step.id}
                    className="grid gap-3 py-3 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:items-start"
                  >
                    <span className="text-fg-disabled font-mono text-[10px]">
                      {String(step.order).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-fg-primary text-[11px]">
                        {step.label}{" "}
                        <span className="text-fg-disabled">· {step.evidenceLabel}</span>
                      </p>
                      <p className="text-fg-muted mt-1 text-[10px] leading-5">{step.activity}</p>
                    </div>
                    <div className="flex items-center gap-3 text-[9px]">
                      <span className="text-fg-secondary font-mono">{step.minutes}m</span>
                      {step.articleHref ? (
                        <Link
                          href={step.articleHref}
                          className="text-fg-muted hover:text-fg-primary"
                        >
                          正文
                        </Link>
                      ) : null}
                      <Link href={step.graphHref} className="text-fg-muted hover:text-fg-primary">
                        图谱
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <KnowledgeGapJourneyPanel
            plan={plan}
            masteredIds={masteredIds}
            onConfirmMastered={onConfirmMastered}
          />

          {plan.contexts.length > 0 ? (
            <div className="px-4 py-5 sm:px-6">
              <p className="text-fg-muted mb-3 text-[10px]">非阻塞背景</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {plan.contexts.map((context) => (
                  <div
                    key={`${context.role}:${context.node.id}`}
                    className="border-border-faint border p-3"
                  >
                    <p className="text-fg-primary text-[10px]">
                      {context.roleLabel} · {context.node.label}
                    </p>
                    <p className="text-fg-muted mt-1 text-[9px] leading-4">{context.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
