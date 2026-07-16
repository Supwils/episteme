"use client";

import { KNOWLEDGE_STAGES } from "@/lib/knowledge-continuum";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import {
  LEARNING_PLAN_DURATIONS,
  type LearningGoalKind,
  type LearningPlanCatalog,
  type LearningPlanMinutes,
  type LearningPlanSelection,
} from "@/lib/knowledge-learning-plan";
import type { KnowledgeBranchTarget, KnowledgeTargetFilter } from "@/lib/knowledge-branch";
import type { LearningTargetSelection } from "@/lib/learning-plan-progress";
import { KnowledgeTargetSearch } from "./KnowledgeTargetSearch";

const GOAL_GROUPS: readonly { kind: LearningGoalKind; label: string }[] = [
  { kind: "main-thread", label: "六条全景主线" },
  { kind: "cross-domain", label: "跨学科专题" },
  { kind: "domain-spine", label: "学科纵深" },
];

export function LearningPlannerControls({
  catalog,
  selection,
  mode,
  selectedTarget,
  terrainFilter,
  onModeChange,
  onSelectionChange,
  onClearFilter,
  onSelectTarget,
}: {
  catalog: LearningPlanCatalog;
  selection: LearningPlanSelection;
  mode: LearningTargetSelection["mode"];
  selectedTarget: KnowledgeBranchTarget | null;
  terrainFilter: KnowledgeTargetFilter | null;
  onModeChange: (mode: LearningTargetSelection["mode"]) => void;
  onSelectionChange: (partial: Partial<LearningPlanSelection>) => void;
  onClearFilter: () => void;
  onSelectTarget: (targetId: string) => Promise<void>;
}) {
  return (
    <>
      <div className="border-border-faint flex border-b px-4 py-3 sm:px-6">
        <div className="border-border-faint flex border" role="group" aria-label="目标范围">
          {(["curated", "all-nodes"] as const).map((item) => {
            const active = mode === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => onModeChange(item)}
                style={active ? { color: "var(--color-bg-base)" } : undefined}
                className={`h-10 min-w-28 px-3 text-[11px] transition-colors motion-reduce:transition-none ${
                  active ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {item === "curated" ? "策展问题" : "全部节点"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(180px,0.7fr)_minmax(260px,1.3fr)_auto] lg:items-end">
        <label className="text-fg-muted text-[10px]">
          <span className="mb-1.5 block">从哪里开始</span>
          <select
            aria-label="学习起点"
            value={selection.startLevel}
            onChange={(event) =>
              onSelectionChange({ startLevel: Number(event.target.value) as KnowledgeLevel })
            }
            className="border-border-faint bg-bg-base text-fg-primary h-11 w-full border px-3 text-xs"
          >
            {KNOWLEDGE_STAGES.map((stage) => (
              <option key={stage.id} value={stage.id}>
                L{stage.id} · {stage.label} · {stage.shortLabel}
              </option>
            ))}
          </select>
        </label>

        {mode === "curated" ? (
          <label className="text-fg-muted text-[10px]">
            <span className="mb-1.5 block">想回答什么问题</span>
            <select
              aria-label="目标问题"
              value={selection.goalId}
              onChange={(event) => onSelectionChange({ goalId: event.target.value })}
              className="border-border-faint bg-bg-base text-fg-primary h-11 w-full border px-3 text-xs"
            >
              {GOAL_GROUPS.map((group) => (
                <optgroup key={group.kind} label={group.label}>
                  {catalog.goals
                    .filter((goal) => goal.kind === group.kind)
                    .map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.title}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
        ) : (
          <KnowledgeTargetSearch
            selectedTarget={selectedTarget}
            filter={terrainFilter}
            onClearFilter={onClearFilter}
            onSelect={onSelectTarget}
          />
        )}

        <div>
          <span className="text-fg-muted mb-1.5 block text-[10px]">本次可用时间</span>
          <div className="border-border-faint flex border" role="group" aria-label="学习时间">
            {LEARNING_PLAN_DURATIONS.map((duration) => {
              const active = duration.minutes === selection.minutes;
              return (
                <button
                  key={duration.minutes}
                  type="button"
                  aria-pressed={active}
                  title={duration.description}
                  onClick={() =>
                    onSelectionChange({ minutes: duration.minutes as LearningPlanMinutes })
                  }
                  style={active ? { color: "var(--color-bg-base)" } : undefined}
                  className={`h-11 min-w-20 px-3 font-mono text-[10px] transition-colors motion-reduce:transition-none ${
                    active ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
                  }`}
                >
                  {duration.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
