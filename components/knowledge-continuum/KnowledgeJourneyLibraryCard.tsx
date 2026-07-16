"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { compareKnowledgeGapJourney, type KnowledgeGapJourney } from "@/lib/knowledge-gap-journey";
import {
  getKnowledgeGapJourneyLifecycle,
  summarizeKnowledgeGapJourneyEvidence,
} from "@/lib/knowledge-gap-journey-library";
import {
  keepSavedKnowledgeGapJourney,
  migrateSavedKnowledgeGapJourney,
  removeKnowledgeGapJourney,
} from "@/lib/knowledge-gap-journey-store";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";

const LIFECYCLE_LABELS = {
  current: "当前版本",
  pending: "待迁移",
  "keep-previous": "继续旧版",
  unknown: "版本不可核对",
} as const;

const EVIDENCE_LABELS = {
  none: "尚未记录",
  "in-progress": "已有记录",
  complete: "清单已齐",
} as const;

export function KnowledgeJourneyLibraryCard({
  journey,
  plan,
  masteredIds,
  onOpen,
}: {
  journey: KnowledgeGapJourney;
  plan: KnowledgeGapPlan | undefined;
  masteredIds: ReadonlySet<string>;
  onOpen: (targetId: string, minutes: KnowledgeGapJourney["totalMinutes"]) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const lifecycle = getKnowledgeGapJourneyLifecycle(journey, plan);
  const evidence = summarizeKnowledgeGapJourneyEvidence(journey, masteredIds);
  const diff = useMemo(
    () => (plan ? compareKnowledgeGapJourney(journey, plan) : null),
    [journey, plan]
  );

  return (
    <article
      className="border-border-faint bg-bg-base border p-4"
      aria-label={`${journey.target.label}路线档案`}
      data-testid={`journey-library-${journey.target.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-fg-disabled text-[8px]">
            {journey.target.domainLabel} · L{journey.target.level} · {journey.totalMinutes}m
          </p>
          <h4 className="text-fg-primary mt-1 text-[11px] leading-5">{journey.target.label}</h4>
        </div>
        <span className="border-border-faint text-fg-muted shrink-0 border px-2 py-1 text-[8px]">
          {LIFECYCLE_LABELS[lifecycle]}
        </span>
      </div>

      <dl className="border-border-faint mt-3 grid grid-cols-2 border-t border-l">
        <div className="border-border-faint border-r border-b p-3">
          <dt className="text-fg-disabled text-[8px]">核验清单</dt>
          <dd className="text-fg-secondary mt-1 text-[9px]">
            {EVIDENCE_LABELS[evidence.state]} · {evidence.recordedCount}/{evidence.possibleCount}
          </dd>
        </div>
        <div className="border-border-faint border-r border-b p-3">
          <dt className="text-fg-disabled text-[8px]">最近更新</dt>
          <dd className="text-fg-secondary mt-1 text-[9px]">{journey.updatedAt.slice(0, 10)}</dd>
        </div>
      </dl>
      <p className="text-fg-muted mt-3 text-[9px] leading-5">
        <span className="text-fg-disabled">下一待办：</span>
        {evidence.nextTodo}
      </p>

      {diff && plan && !diff.current ? (
        <div className="border-border-faint mt-3 border-l pl-3">
          <p className="text-fg-secondary text-[9px]">
            版本差异：+{diff.addedSteps.length} / -{diff.removedSteps.length} 步，硬依赖 +
            {diff.addedEdges.length} / -{diff.removedEdges.length}
          </p>
          <p className="text-fg-disabled mt-1 text-[8px] leading-4">
            迁移可保留 {diff.preservedCheckpointCount} 个仍在当前路线中的节点记录。
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => migrateSavedKnowledgeGapJourney(journey, plan)}
              className="bg-fg-primary text-bg-base min-h-9 px-3 text-[9px]"
            >
              迁移当前路线
            </button>
            {lifecycle === "pending" ? (
              <button
                type="button"
                onClick={() => keepSavedKnowledgeGapJourney(journey, plan.version.fingerprint)}
                className="border-border-faint text-fg-muted min-h-9 border px-3 text-[9px]"
              >
                继续旧版
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="border-border-faint mt-4 flex flex-wrap items-center gap-3 border-t pt-3">
        <button
          type="button"
          disabled={!plan}
          onClick={() => onOpen(journey.target.id, journey.totalMinutes)}
          className="text-fg-primary hover:text-fg-secondary min-h-9 text-[9px] disabled:opacity-40"
        >
          打开路线详情
        </button>
        <Link
          href={`/knowledge-graph?focus=${encodeURIComponent(journey.target.id)}&source=journey-library`}
          className="text-fg-muted hover:text-fg-primary py-2 text-[9px]"
        >
          在图谱中核对
        </Link>
        {confirmDelete ? (
          <span className="flex items-center gap-2 sm:ml-auto">
            <span className="text-fg-muted text-[9px]">删除这条路线？</span>
            <button
              type="button"
              onClick={() => removeKnowledgeGapJourney(journey.target.id)}
              className="text-fg-secondary min-h-9 border-b border-current text-[9px]"
            >
              确认删除
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-fg-muted min-h-9 text-[9px]"
            >
              取消
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="text-fg-disabled hover:text-fg-secondary min-h-9 text-[9px] sm:ml-auto"
          >
            删除
          </button>
        )}
      </div>
    </article>
  );
}
