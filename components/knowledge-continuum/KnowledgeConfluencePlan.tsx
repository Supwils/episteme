"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { KnowledgeConfluence } from "@/lib/knowledge-confluence";
import { KNOWLEDGE_CONFLUENCE_ROLE_META } from "@/lib/knowledge-confluence";
import {
  buildKnowledgeConfluenceGraphHref,
  buildKnowledgeConfluencePlan,
  describeConfluencePlan,
} from "@/lib/knowledge-confluence-plan";
import { LEARNING_PLAN_DURATIONS, type LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import {
  resetLearningPlanProgress,
  toggleLearningPlanStep,
  useLearningPlanProgress,
} from "@/lib/learning-plan-progress";

export function KnowledgeConfluencePlan({
  confluence,
  minutes,
  onMinutesChange,
}: {
  confluence: KnowledgeConfluence;
  minutes: LearningPlanMinutes;
  onMinutesChange: (minutes: LearningPlanMinutes) => void;
}) {
  const plan = useMemo(
    () => buildKnowledgeConfluencePlan(confluence, minutes),
    [confluence, minutes]
  );
  const completedNodeIds = useLearningPlanProgress(plan.id);
  const completed = new Set(completedNodeIds);
  const allSteps = [...plan.strands.flatMap((strand) => strand.steps), plan.synthesis];
  const completedCount = allSteps.filter((step) => completed.has(step.nodeId)).length;

  return (
    <div className="border-border-faint border-t" data-testid="knowledge-confluence-plan">
      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.2em] uppercase">
            parallel study plan
          </p>
          <h4 className="text-fg-primary mt-1 text-sm font-medium">多线时间预算</h4>
          <p className="text-fg-muted mt-1 text-[11px] leading-5">
            {describeConfluencePlan(minutes)} · {plan.checkpointCount} 个检查点 · 共 {minutes} 分钟
          </p>
        </div>
        <div
          className="border-border-faint flex max-w-full overflow-x-auto border"
          role="group"
          aria-label="汇流学习时长"
        >
          {LEARNING_PLAN_DURATIONS.map((duration) => {
            const active = minutes === duration.minutes;
            return (
              <button
                key={duration.minutes}
                type="button"
                aria-pressed={active}
                onClick={() => onMinutesChange(duration.minutes)}
                className={`h-10 min-w-24 px-3 text-[10px] transition-colors motion-reduce:transition-none ${
                  active ? "bg-fg-primary text-bg-base" : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {duration.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {plan.strands.map((strand, index) => {
          const role = KNOWLEDGE_CONFLUENCE_ROLE_META[strand.role];
          return (
            <section
              key={strand.id}
              className={`border-border-faint px-4 py-5 sm:px-6 ${
                index % 2 === 0 ? "lg:border-r" : ""
              } ${index < plan.strands.length - 2 ? "border-b" : ""}`}
              aria-labelledby={`${plan.id}-${strand.id}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h5 id={`${plan.id}-${strand.id}`} className="text-fg-primary text-xs font-medium">
                  {strand.title}
                </h5>
                <span className="text-[9px]" style={{ color: role.color }}>
                  {role.shortLabel} · {strand.minutes} 分钟
                </span>
              </div>
              <div className="mt-3 space-y-3">
                {strand.steps.map((step) => {
                  const checked = completed.has(step.nodeId);
                  return (
                    <div
                      key={step.nodeId}
                      className="grid grid-cols-[18px_minmax(0,1fr)_auto] gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleLearningPlanStep(plan.id, step.nodeId)}
                        aria-label={`标记“${step.label}”为已完成`}
                        className="accent-accent-gold mt-0.5 h-3.5 w-3.5"
                      />
                      <div className={checked ? "opacity-55" : undefined}>
                        <p className="text-fg-secondary text-[11px] leading-4">
                          <span className="text-fg-disabled mr-1 font-mono">L{step.level}</span>
                          {step.label}
                        </p>
                        <p className="text-fg-disabled mt-1 text-[9px] leading-4">
                          {step.activity}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-fg-muted block font-mono text-[9px]">
                          {step.minutes}m
                        </span>
                        <Link
                          href={buildKnowledgeConfluenceGraphHref(confluence.id, step.nodeId)}
                          className="text-fg-disabled hover:text-fg-primary mt-1 block text-[9px]"
                        >
                          图谱
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="border-border-faint bg-bg-elevated grid gap-4 border-t px-4 py-5 sm:px-6 lg:grid-cols-[18px_minmax(0,1fr)_auto]">
        <input
          type="checkbox"
          checked={completed.has(plan.synthesis.nodeId)}
          onChange={() => toggleLearningPlanStep(plan.id, plan.synthesis.nodeId)}
          aria-label={`标记“${plan.synthesis.label}”为已完成`}
          className="accent-accent-gold mt-0.5 h-3.5 w-3.5"
        />
        <div>
          <p className="text-accent-gold text-[9px]">L5 汇流综合</p>
          <h5 className="text-fg-primary mt-1 text-xs font-medium">{plan.synthesis.label}</h5>
          <p className="text-fg-secondary mt-2 text-[11px] leading-5">{plan.synthesis.activity}</p>
        </div>
        <span className="text-fg-primary font-mono text-[10px]">{plan.synthesis.minutes} 分钟</span>
      </div>

      <div className="border-border-faint text-fg-disabled flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-[10px] sm:px-6">
        <span aria-live="polite">
          已完成 {completedCount}/{allSteps.length}，进度仅保存在当前浏览器。
        </span>
        <button
          type="button"
          disabled={completedCount === 0}
          onClick={() => resetLearningPlanProgress(plan.id)}
          className="text-fg-muted hover:text-fg-primary disabled:text-fg-disabled min-h-8 disabled:cursor-not-allowed"
        >
          重置这份计划
        </button>
      </div>
    </div>
  );
}
