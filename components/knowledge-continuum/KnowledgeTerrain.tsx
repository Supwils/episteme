"use client";

import { useEffect, useMemo, useState } from "react";
import {
  KNOWLEDGE_BRANCH_CONFIDENCE_META,
  type KnowledgeBranchConfidence,
  type KnowledgeTargetFilter,
} from "@/lib/knowledge-branch";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";
import type { KnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";
import { KnowledgeTerrainDiagnostics } from "./KnowledgeTerrainDiagnostics";

type ConfidenceView = KnowledgeBranchConfidence | "all";
type TerrainScaleMode = "absolute" | "within-domain";

const CONFIDENCE_VIEWS: readonly { id: ConfidenceView; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "curated", label: "人工" },
  { id: "direct", label: "一跳" },
  { id: "contextual", label: "两跳" },
  { id: "exploratory", label: "探索" },
];

function cellCount(
  cell: KnowledgeTerrainSnapshot["domains"][number]["cells"][number],
  view: ConfidenceView
): number {
  return view === "all" ? cell.total : cell.confidenceCounts[view];
}

function densityColor(color: string, count: number, maximum: number): string {
  if (count === 0) return "transparent";
  const alpha = Math.round(28 + (count / Math.max(maximum, 1)) * 130);
  return `${color}${alpha.toString(16).padStart(2, "0")}`;
}

export function KnowledgeTerrain({
  snapshot,
  selectedFilter,
  onSelect,
  onClear,
}: {
  snapshot: KnowledgeTerrainSnapshot;
  selectedFilter: KnowledgeTargetFilter | null;
  onSelect: (filter: KnowledgeTargetFilter) => void;
  onClear: () => void;
}) {
  const [confidenceView, setConfidenceView] = useState<ConfidenceView>("all");
  const [scaleMode, setScaleMode] = useState<TerrainScaleMode>("absolute");

  useEffect(() => {
    if (selectedFilter?.confidence) setConfidenceView(selectedFilter.confidence);
  }, [selectedFilter?.confidence]);
  const maximum = useMemo(
    () =>
      Math.max(
        1,
        ...snapshot.domains.flatMap((domain) =>
          domain.cells.map((cell) => cellCount(cell, confidenceView))
        )
      ),
    [confidenceView, snapshot.domains]
  );
  const selectedDomain = selectedFilter
    ? snapshot.domains.find((domain) => domain.id === selectedFilter.domainId)
    : undefined;
  const selectedCell = selectedDomain?.cells.find((cell) => cell.level === selectedFilter?.level);

  return (
    <div
      className="border-border-faint bg-bg-near mt-8 border"
      data-testid="knowledge-terrain"
      aria-labelledby="knowledge-terrain-title"
    >
      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            full graph terrain
          </p>
          <h3
            id="knowledge-terrain-title"
            className="font-display text-fg-primary mt-1 text-xl font-semibold"
          >
            全图知识地形
          </h3>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            每格汇总一个学科与认知阶段。颜色越深，节点越密；切换接入层可区分人工骨架与不同距离的相关旁支。
          </p>
        </div>
        <div className="text-fg-disabled text-[10px] leading-5 lg:text-right">
          {snapshot.summary.nodeCount} 个节点 · {snapshot.summary.anchorCount} 个骨架
          <br />
          {snapshot.summary.ambiguousTargetCount} 个节点存在多条等距来路
        </div>
      </div>

      <div className="border-border-faint flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
        <div
          className="border-border-faint flex max-w-full overflow-x-auto border"
          role="group"
          aria-label="地形接入层"
        >
          {CONFIDENCE_VIEWS.map((view) => {
            const active = confidenceView === view.id;
            return (
              <button
                key={view.id}
                type="button"
                aria-pressed={active}
                onClick={() => setConfidenceView(view.id)}
                style={active ? { color: "var(--color-bg-base)" } : undefined}
                className={`h-9 min-w-15 px-3 text-[10px] transition-colors motion-reduce:transition-none ${
                  active ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {view.label}
              </button>
            );
          })}
        </div>
        <div className="border-border-faint flex border" role="group" aria-label="地形刻度">
          {(["absolute", "within-domain"] as const).map((scale) => {
            const active = scaleMode === scale;
            return (
              <button
                key={scale}
                type="button"
                aria-pressed={active}
                onClick={() => setScaleMode(scale)}
                style={active ? { color: "var(--color-bg-base)" } : undefined}
                className={`h-9 min-w-24 px-3 text-[10px] transition-colors motion-reduce:transition-none ${
                  active ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {scale === "absolute" ? "全图数量" : "学科内结构"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-border-faint border-b px-4 py-2.5 sm:px-6">
        <p className="text-fg-disabled text-[10px] leading-4">
          {scaleMode === "absolute"
            ? "颜色按全图统一刻度，数字是节点数；适合比较库存规模，不代表学科重要性。"
            : "每个学科独立归一化，数字是当前接入层在该学科各阶段的占比；不能跨学科比较总量。"}
          {confidenceView === "all"
            ? " 当前显示全部接入层。"
            : ` ${KNOWLEDGE_BRANCH_CONFIDENCE_META[confidenceView].description}`}
        </p>
      </div>

      <div className="overflow-x-auto px-4 py-5 sm:px-6">
        <div className="min-w-[420px]" data-testid="knowledge-terrain-grid">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: "minmax(76px,1.25fr) repeat(5,minmax(48px,1fr))" }}
          >
            <span className="text-fg-disabled px-1 pb-1 font-mono text-[9px]">学科</span>
            {KNOWLEDGE_LEVELS.map((level) => (
              <span
                key={level.id}
                className="text-fg-muted px-1 pb-1 text-center text-[9px]"
                title={level.label}
              >
                L{level.id}
              </span>
            ))}
            {snapshot.domains.flatMap((domain) => {
              const domainCounts = domain.cells.map((cell) => cellCount(cell, confidenceView));
              const domainTotal = domainCounts.reduce((sum, count) => sum + count, 0);
              const domainMaximum = Math.max(1, ...domainCounts);
              return [
                <div key={`${domain.id}-label`} className="flex min-h-9 items-center gap-2 px-1">
                  <span
                    className="h-2 w-2 shrink-0"
                    style={{ backgroundColor: domain.color }}
                    aria-hidden="true"
                  />
                  <span className="text-fg-secondary truncate text-[10px] sm:hidden">
                    {domain.shortLabel}
                  </span>
                  <span className="text-fg-secondary hidden truncate text-[10px] sm:inline">
                    {domain.label}
                  </span>
                </div>,
                ...domain.cells.map((cell) => {
                  const count = cellCount(cell, confidenceView);
                  const withinDomainShare = domainTotal > 0 ? count / domainTotal : 0;
                  const active =
                    selectedFilter?.domainId === domain.id &&
                    selectedFilter.level === cell.level &&
                    selectedFilter.confidence ===
                      (confidenceView === "all" ? undefined : confidenceView);
                  const stage = KNOWLEDGE_LEVELS[cell.level - 1]!;
                  return (
                    <button
                      key={`${domain.id}-${cell.level}`}
                      type="button"
                      disabled={count === 0}
                      aria-pressed={active}
                      aria-label={`${domain.label}，${stage.label}，${count}个${
                        confidenceView === "all"
                          ? "知识"
                          : KNOWLEDGE_BRANCH_CONFIDENCE_META[confidenceView].label
                      }节点${
                        scaleMode === "within-domain"
                          ? `，占该学科当前接入层${Math.round(withinDomainShare * 100)}%`
                          : ""
                      }`}
                      onClick={() =>
                        onSelect({
                          domainId: domain.id,
                          level: cell.level,
                          confidence: confidenceView === "all" ? undefined : confidenceView,
                        })
                      }
                      style={{
                        backgroundColor: densityColor(
                          domain.color,
                          count,
                          scaleMode === "absolute" ? maximum : domainMaximum
                        ),
                        outlineColor: active ? domain.color : undefined,
                      }}
                      className={`text-fg-primary min-h-9 border text-center font-mono text-[10px] transition-colors motion-reduce:transition-none ${
                        active
                          ? "border-transparent outline-2 outline-offset-1"
                          : "border-border-faint hover:border-fg-muted"
                      } disabled:cursor-not-allowed disabled:opacity-30`}
                    >
                      {scaleMode === "absolute" ? count : `${Math.round(withinDomainShare * 100)}%`}
                    </button>
                  );
                }),
              ];
            })}
          </div>
        </div>
      </div>

      {selectedDomain && selectedCell && (
        <div className="border-border-faint flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 sm:px-6">
          <div>
            <p className="text-fg-primary text-xs font-medium">
              {selectedDomain.label} · L{selectedCell.level} · {selectedCell.total} 个节点
            </p>
            <p className="text-fg-muted mt-1 text-[10px] leading-4">
              人工 {selectedCell.confidenceCounts.curated} · 一跳{" "}
              {selectedCell.confidenceCounts.direct}
              {" · "}两跳 {selectedCell.confidenceCounts.contextual} · 探索{" "}
              {selectedCell.confidenceCounts.exploratory}
            </p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-fg-muted hover:text-fg-primary min-h-9 border-b border-current text-[10px] transition-colors"
          >
            清除区域筛选
          </button>
        </div>
      )}

      <KnowledgeTerrainDiagnostics
        snapshot={snapshot}
        selectedDomainId={selectedFilter?.domainId}
        onExplore={onSelect}
      />
    </div>
  );
}
