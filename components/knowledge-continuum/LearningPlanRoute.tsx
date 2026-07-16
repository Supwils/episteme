"use client";

import Link from "next/link";
import type { LearningPlanStep } from "@/lib/knowledge-learning-plan";
import type { KnowledgePlanStepSource } from "@/lib/knowledge-branch";
import {
  resetLearningPlanProgress,
  toggleLearningPlanStep,
  useLearningPlanProgress,
} from "@/lib/learning-plan-progress";

type RouteStep = LearningPlanStep & { source?: KnowledgePlanStepSource };

export function LearningPlanRoute({
  planId,
  question,
  summary,
  steps,
}: {
  planId: string;
  question: string;
  summary: string;
  steps: readonly RouteStep[];
}) {
  const completedNodeIds = useLearningPlanProgress(planId);
  const completed = new Set(completedNodeIds);
  const completedCount = steps.filter((step) => completed.has(step.nodeId)).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <>
      <div className="border-border-faint grid gap-4 border-b px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div aria-live="polite">
          <p className="text-fg-primary text-sm font-medium">{question}</p>
          <p className="text-fg-muted mt-1 text-[11px] leading-5">{summary}</p>
        </div>
        <div className="min-w-44">
          <div className="flex items-center justify-between gap-4 text-[10px]">
            <span className="text-fg-muted">本地学习进度</span>
            <span className="text-fg-primary font-mono">
              {completedCount}/{steps.length}
            </span>
          </div>
          <div className="bg-bg-base mt-2 h-1.5 overflow-hidden" aria-hidden="true">
            <div
              className="bg-accent-gold h-full transition-[width] motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-[var(--color-border-faint)] px-4 sm:px-6">
        {steps.map((step, index) => {
          const checked = completed.has(step.nodeId);
          const inferred = step.source === "inferred-branch";
          const startsBranch = inferred && steps[index - 1]?.source !== "inferred-branch";
          return (
            <div key={step.nodeId}>
              {startsBranch && (
                <div className="border-accent-gold/40 text-accent-gold border-l-2 px-3 py-3 text-[10px] leading-5">
                  以下步骤沿图谱关系进入推断旁支。它们说明“与什么相关”，不声称“必须先学什么”。
                </div>
              )}
              <div className="grid gap-3 py-5 sm:grid-cols-[28px_minmax(0,1fr)_auto] sm:items-start">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleLearningPlanStep(planId, step.nodeId)}
                  aria-label={`标记“${step.label}”为已完成`}
                  className="accent-accent-gold mt-1 h-4 w-4"
                />
                <div className={checked ? "opacity-60" : undefined}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-fg-disabled font-mono text-[9px]">
                      {String(index + 1).padStart(2, "0")} · L{step.level}
                    </span>
                    <span
                      className="h-2 w-2"
                      style={{ backgroundColor: step.domainColor }}
                      aria-hidden="true"
                    />
                    <span className="text-fg-muted text-[10px]">{step.domainLabel}</span>
                    <span
                      className="h-2 w-2"
                      style={{ backgroundColor: step.evidenceColor }}
                      aria-hidden="true"
                    />
                    <span className="text-fg-muted text-[10px]">{step.evidenceLabel}</span>
                    <span
                      className={
                        inferred
                          ? "border-accent-gold/40 text-accent-gold border px-1.5 py-0.5 text-[9px]"
                          : "text-fg-disabled text-[9px]"
                      }
                    >
                      {inferred ? "推断旁支" : "人工前置"}
                    </span>
                  </div>
                  <h4 className="text-fg-primary mt-2 text-sm font-medium">{step.label}</h4>
                  <p className="text-fg-secondary mt-1 text-xs leading-5">{step.reason}</p>
                  <p className="text-fg-muted mt-2 text-[11px] leading-5">{step.activity}</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className="text-fg-primary font-mono text-xs">{step.minutes} 分钟</span>
                  <div className="flex gap-3 text-[10px]">
                    {step.articleHref && (
                      <Link
                        href={step.articleHref}
                        className="text-fg-muted hover:text-fg-primary transition-colors"
                      >
                        读正文
                      </Link>
                    )}
                    <Link
                      href={step.graphHref}
                      className="text-fg-muted hover:text-fg-primary transition-colors"
                    >
                      看图谱
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-border-faint text-fg-disabled flex flex-col gap-2 border-t px-4 py-3 text-[10px] leading-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <span>完成状态仅保存在当前浏览器；它表示阅读进度，不是能力评价。</span>
        <button
          type="button"
          disabled={completedCount === 0}
          onClick={() => resetLearningPlanProgress(planId)}
          className="text-fg-muted hover:text-fg-primary disabled:text-fg-disabled min-h-8 text-left transition-colors disabled:cursor-not-allowed"
        >
          重置当前路线进度
        </button>
      </div>
    </>
  );
}
