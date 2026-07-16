"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { KnowledgeStageId } from "@/lib/knowledge-continuum";
import type { KnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import { KnowledgeCoverageDetails } from "./KnowledgeCoverageDetails";
import { KnowledgeCoverageMatrix } from "./KnowledgeCoverageMatrix";
import { KnowledgeBridgeFlowView } from "./KnowledgeBridgeFlowView";
import type { CoverageRow } from "./coverage-types";

type CoverageView = "domains" | "evidence" | "bridges";

export function KnowledgeCoveragePanel({
  snapshot,
  embedded = false,
}: {
  snapshot: KnowledgeCoverageSnapshot;
  embedded?: boolean;
}) {
  const [view, setView] = useState<CoverageView>("domains");
  const [selectedRowId, setSelectedRowId] = useState<string>(snapshot.domains[0]!.id);
  const [selectedLevel, setSelectedLevel] = useState<KnowledgeStageId>(1);
  const rows: readonly CoverageRow[] =
    view === "domains" ? snapshot.domains : snapshot.evidenceModes;
  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selectedRowId) ?? rows[0]!,
    [rows, selectedRowId]
  );
  const selectedStageTotal = useMemo(
    () => rows.reduce((total, row) => total + row.levels[selectedLevel - 1]!, 0),
    [rows, selectedLevel]
  );

  const changeView = (nextView: CoverageView) => {
    setView(nextView);
    if (nextView === "bridges") return;
    setSelectedRowId(
      nextView === "domains" ? snapshot.domains[0]!.id : snapshot.evidenceModes[0]!.id
    );
  };

  const selectCell = (rowId: string, level: KnowledgeStageId) => {
    setSelectedRowId(rowId);
    setSelectedLevel(level);
  };

  return (
    <div
      className="border-border-faint bg-bg-near mt-8 border"
      aria-labelledby="coverage-title"
      data-testid={embedded ? undefined : "knowledge-coverage-panel"}
    >
      <div className="border-border-faint grid gap-5 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            curated landscape
          </p>
          <h3
            id="coverage-title"
            className="font-display text-fg-primary mt-1 text-xl font-semibold"
          >
            {snapshot.summary.nodeCount} 个核心节点如何覆盖全学科
          </h3>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            {view === "bridges"
              ? "追踪规范路径在相邻阶段跨越学科边界的位置。按阶段和证据筛选流向，再进入发生转接的具体节点。"
              : "每一格表示人工策展主干中某个学科或证据方式在某一认知阶段的节点数。选择格子可查看真实路径；空格直接暴露需要继续补强的知识入口。"}
          </p>
        </div>
        <CoverageViewControl view={view} onChange={changeView} />
      </div>

      <CoverageSummary snapshot={snapshot} />

      {view === "bridges" ? (
        <KnowledgeBridgeFlowView snapshot={snapshot} />
      ) : (
        <div className="grid gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)]">
          <KnowledgeCoverageMatrix
            rows={rows}
            selectedRowId={selectedRow.id}
            selectedLevel={selectedLevel}
            onSelect={selectCell}
          />
          <KnowledgeCoverageDetails
            row={selectedRow}
            level={selectedLevel}
            stageTotal={selectedStageTotal}
            onSelectDomain={(id) => selectCell(id, selectedLevel)}
          />
        </div>
      )}

      <div className="border-border-faint text-fg-disabled flex flex-col gap-2 border-t px-4 py-3 text-[10px] leading-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <span>
          {snapshot.summary.establishedDomainCount} 个正式学科 +{" "}
          {snapshot.summary.previewDomainCount} 个建设中学科；矩阵表示策展密度，不是学科价值排名。
        </span>
        <Link
          href="/knowledge-graph?layout=cognitive&source=coverage"
          className="text-fg-secondary hover:text-fg-primary transition-colors"
        >
          打开完整认知图谱 →
        </Link>
      </div>
    </div>
  );
}

function CoverageViewControl({
  view,
  onChange,
}: {
  view: CoverageView;
  onChange: (view: CoverageView) => void;
}) {
  return (
    <div
      className="flex w-fit border"
      style={{ borderColor: "var(--color-border-subtle)" }}
      role="group"
      aria-label="覆盖视图"
    >
      {(["domains", "evidence", "bridges"] as const).map((item) => {
        const selected = view === item;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item)}
            style={selected ? { color: "var(--color-bg-base)" } : undefined}
            className={`min-h-10 min-w-20 px-3 font-mono text-[11px] transition-colors motion-reduce:transition-none ${
              selected ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
            }`}
          >
            {item === "domains" ? "学科覆盖" : item === "evidence" ? "证据方式" : "跨学科桥"}
          </button>
        );
      })}
    </div>
  );
}

function CoverageSummary({ snapshot }: { snapshot: KnowledgeCoverageSnapshot }) {
  const items: readonly [number, string][] = [
    [snapshot.summary.nodeCount, "核心节点"],
    [snapshot.summary.pathCount, "五级路径"],
    [snapshot.summary.prerequisiteCount, "直接前置关系"],
    [snapshot.summary.crossDomainTransitionCount, "跨学科转接"],
  ];
  return (
    <div className="border-border-faint grid grid-cols-2 border-b sm:grid-cols-4">
      {items.map(([value, label]) => (
        <div
          key={label}
          className="border-border-faint border-r border-b px-4 py-3 last:border-r-0 sm:border-b-0"
        >
          <div className="text-fg-primary font-mono text-lg">{value}</div>
          <div className="text-fg-disabled mt-0.5 text-[10px]">{label}</div>
        </div>
      ))}
    </div>
  );
}
