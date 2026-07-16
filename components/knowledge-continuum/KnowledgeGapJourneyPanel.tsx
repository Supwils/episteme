"use client";

import { useMemo } from "react";
import {
  compareKnowledgeGapJourney,
  KNOWLEDGE_GAP_CHECKPOINT_KEYS,
} from "@/lib/knowledge-gap-journey";
import {
  keepSavedKnowledgeGapJourney,
  migrateSavedKnowledgeGapJourney,
  saveKnowledgeGapJourney,
  setKnowledgeGapCheckpoint,
  setKnowledgeGapCheckpointNote,
  updateSavedKnowledgeGapJourneyBudget,
  useKnowledgeGapJourney,
} from "@/lib/knowledge-gap-journey-store";
import type { KnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import { KnowledgeGapCheckpointRow } from "./KnowledgeGapCheckpointRow";

const STATUS_LABELS: Record<KnowledgeGapPlan["status"], string> = {
  mastered: "已掌握",
  ready: "现在可学",
  blocked: "仍有前置缺口",
};

function releaseLabel(releases: KnowledgeGapPlan["version"]["relationReleases"]): string {
  if (releases.length === 0) return "无独立关系发布";
  return releases.map((release) => `${release.releaseId} v${release.version}`).join(" · ");
}

export function KnowledgeGapJourneyPanel({
  plan,
  masteredIds,
  onConfirmMastered,
}: {
  plan: KnowledgeGapPlan;
  masteredIds: ReadonlySet<string>;
  onConfirmMastered: (nodeId: string) => void;
}) {
  const journey = useKnowledgeGapJourney(plan.target.id);
  const diff = useMemo(
    () => (journey ? compareKnowledgeGapJourney(journey, plan) : null),
    [journey, plan]
  );
  const recordedEvidenceCount = journey
    ? Object.values(journey.checkpoints).reduce(
        (count, checkpoint) =>
          count + KNOWLEDGE_GAP_CHECKPOINT_KEYS.filter((key) => checkpoint[key]).length,
        0
      )
    : 0;

  if (!journey) {
    return (
      <section
        className="border-border-faint border-b px-4 py-5 sm:px-6"
        aria-labelledby="journey-title"
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-fg-muted text-[10px]" id="journey-title">
              路线档案与学习证据
            </p>
            <p className="text-fg-disabled mt-1 max-w-3xl text-[9px] leading-5">
              保存后会在本机记录当前关系版本、步骤和硬依赖。阅读、练习、复述与来源核验仅作为证据，不会自动写入“已掌握”。
            </p>
          </div>
          <button
            type="button"
            onClick={() => saveKnowledgeGapJourney(plan)}
            className="bg-fg-primary text-bg-base min-h-10 px-4 text-[10px]"
          >
            保存为学习路线
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-border-faint border-b px-4 py-5 sm:px-6"
      aria-labelledby="journey-title"
      data-testid="knowledge-gap-journey"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-fg-muted text-[10px]" id="journey-title">
              路线档案与学习证据
            </p>
            <span className="border-border-faint text-fg-disabled border px-2 py-1 font-mono text-[8px]">
              {diff?.current ? "当前版本" : "历史快照"}
            </span>
          </div>
          <p className="text-fg-disabled mt-1 text-[9px] leading-5">
            保存于 {journey.capturedAt.slice(0, 10)} · {journey.steps.length} 步 ·{" "}
            {journey.totalMinutes}m · 已记录 {recordedEvidenceCount} 项证据
          </p>
        </div>
        <div className="max-w-xl text-right">
          <p
            className="text-fg-disabled font-mono text-[8px] leading-4"
            title={releaseLabel(journey.relationReleases)}
          >
            {releaseLabel(journey.relationReleases)}
            <br />
            {journey.relationFingerprint}
          </p>
          {diff?.current && journey.totalMinutes !== plan.totalMinutes ? (
            <button
              type="button"
              onClick={() => updateSavedKnowledgeGapJourneyBudget(journey, plan)}
              className="border-border-faint text-fg-muted hover:text-fg-primary mt-2 min-h-9 border px-3 text-[9px]"
            >
              同步为 {plan.totalMinutes} 分钟
            </button>
          ) : null}
        </div>
      </div>

      {diff && !diff.current ? (
        <div className="border-border-faint bg-bg-base mt-4 border p-4" role="status">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <p className="text-fg-primary text-[10px]">
                {diff.decision === "keep-previous"
                  ? "你已选择继续旧版路线"
                  : "检测到新的路线版本，旧快照尚未改写"}
              </p>
              <p className="text-fg-muted mt-1 text-[9px] leading-5">
                新增 {diff.addedSteps.length} 步，移除 {diff.removedSteps.length} 步；硬依赖新增{" "}
                {diff.addedEdges.length} 条、移除 {diff.removedEdges.length} 条。
                {diff.statusChanged
                  ? ` 目标状态由“${STATUS_LABELS[journey.status]}”变为“${STATUS_LABELS[plan.status]}”。`
                  : " 目标状态未变。"}
                {diff.releasesChanged ? " 关系发布版本也已变化。" : ""}
              </p>
              {diff.addedSteps.length > 0 ? (
                <p className="text-fg-muted mt-2 text-[9px] leading-5">
                  <span className="text-fg-secondary">新增：</span>
                  {diff.addedSteps.map((step) => step.label).join("、")}
                </p>
              ) : null}
              {diff.removedSteps.length > 0 ? (
                <p className="text-fg-muted mt-1 text-[9px] leading-5">
                  <span className="text-fg-secondary">移除：</span>
                  {diff.removedSteps.map((step) => step.label).join("、")}
                </p>
              ) : null}
              <p className="text-fg-disabled mt-2 text-[9px]">
                迁移会保留 {diff.preservedCheckpointCount}{" "}
                个仍在路线中的节点证据；被移除节点的证据只保留在旧快照中。
              </p>
              {diff.releasesChanged ? (
                <p className="text-fg-disabled mt-1 font-mono text-[8px] leading-4">
                  快照 {releaseLabel(journey.relationReleases)}
                  <br />
                  当前 {releaseLabel(plan.version.relationReleases)}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-48">
              <button
                type="button"
                onClick={() => migrateSavedKnowledgeGapJourney(journey, plan)}
                className="bg-fg-primary text-bg-base min-h-10 px-3 text-[9px]"
              >
                迁移到当前路线
              </button>
              {diff.decision === "pending" ? (
                <button
                  type="button"
                  onClick={() => keepSavedKnowledgeGapJourney(journey, plan.version.fingerprint)}
                  className="border-border-faint text-fg-muted hover:text-fg-primary min-h-10 border px-3 text-[9px]"
                >
                  继续旧版路线
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {journey.steps.length > 0 ? (
        <ol className="border-border-faint mt-4 border-t">
          {journey.steps.map((step) => (
            <KnowledgeGapCheckpointRow
              key={step.id}
              step={step}
              checkpoint={journey.checkpoints[step.id]}
              mastered={masteredIds.has(step.id)}
              onCheckpointChange={(key, checked) =>
                setKnowledgeGapCheckpoint(journey, step.id, key, checked)
              }
              onNoteChange={(note) => setKnowledgeGapCheckpointNote(journey, step.id, note)}
              onConfirmMastered={() => onConfirmMastered(step.id)}
            />
          ))}
        </ol>
      ) : (
        <p className="text-fg-muted mt-4 text-[10px]">这个快照没有待补步骤。</p>
      )}
    </section>
  );
}
