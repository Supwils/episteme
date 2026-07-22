"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  MENTAL_HEALTH_COMPARISON_CHECKPOINTS,
  MENTAL_HEALTH_COMPARISON_ROUTES,
  type MentalHealthComparisonKind,
} from "@/lib/mental-health-tour-comparison";
import { MentalHealthTourComparisonDiagram } from "./MentalHealthTourComparisonDiagram";

const STORAGE_KEY = "uk-mental-health-tour-comparison-v1";
type ComparisonMode = "all" | MentalHealthComparisonKind;

function readCheckedIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("schemaVersion" in parsed) ||
      parsed.schemaVersion !== 1 ||
      !("checkedIds" in parsed) ||
      !Array.isArray(parsed.checkedIds)
    ) {
      return [];
    }
    const validIds = new Set(
      MENTAL_HEALTH_COMPARISON_CHECKPOINTS.map((checkpoint) => checkpoint.id)
    );
    return parsed.checkedIds.filter(
      (id): id is string => typeof id === "string" && validIds.has(id)
    );
  } catch {
    return [];
  }
}

function writeCheckedIds(checkedIds: ReadonlySet<string>) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      schemaVersion: 1,
      checkedIds: [...checkedIds],
      updatedAt: new Date().toISOString(),
    })
  );
}

export function MentalHealthTourComparison() {
  const [mode, setMode] = useState<ComparisonMode>("all");
  const [selectedId, setSelectedId] = useState(MENTAL_HEALTH_COMPARISON_CHECKPOINTS[0]!.id);
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    setCheckedIds(new Set(readCheckedIds()));
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setCheckedIds(new Set(readCheckedIds()));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const visibleCheckpoints = useMemo(
    () =>
      mode === "all"
        ? MENTAL_HEALTH_COMPARISON_CHECKPOINTS
        : MENTAL_HEALTH_COMPARISON_CHECKPOINTS.filter(
            (checkpoint) => checkpoint.kind === mode
          ),
    [mode]
  );
  const selected =
    visibleCheckpoints.find((checkpoint) => checkpoint.id === selectedId) ??
    visibleCheckpoints[0]!;

  const toggleCheckpoint = () => {
    setCheckedIds((previous) => {
      const next = new Set(previous);
      if (next.has(selected.id)) next.delete(selected.id);
      else next.add(selected.id);
      writeCheckedIds(next);
      return next;
    });
  };

  const selectMode = (nextMode: ComparisonMode) => {
    setMode(nextMode);
    const first = MENTAL_HEALTH_COMPARISON_CHECKPOINTS.find(
      (checkpoint) => nextMode === "all" || checkpoint.kind === nextMode
    );
    if (first) setSelectedId(first.id);
  };

  return (
    <section
      id="mental-health-tour-comparison"
      className="border-border-faint border-t px-4 py-6 sm:px-6"
      aria-labelledby="mental-health-comparison-title"
      data-testid="mental-health-tour-comparison"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            route comparison
          </p>
          <h4
            id="mental-health-comparison-title"
            className="text-fg-primary mt-1 text-base font-semibold"
          >
            个体照护与青少年支持系统，双路线核对
          </h4>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            七个检查点中，三处共享同一图谱节点，四处保留不同分析单位、因果标准与干预责任。
          </p>
        </div>
        <div className="border-border-faint flex min-h-9 border" role="group" aria-label="路线比较范围">
          {(
            [
              ["all", "全部"],
              ["shared", "共同锚点"],
              ["contrast", "分歧检查"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => selectMode(value)}
              className={`border-border-faint border-r px-3 text-[10px] last:border-r-0 ${
                mode === value
                  ? "bg-fg-primary text-bg-base"
                  : "text-fg-muted hover:text-fg-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <MentalHealthTourComparisonDiagram
          checkpoints={visibleCheckpoints}
          selectedId={selected.id}
          checkedIds={checkedIds}
          onSelect={setSelectedId}
        />
        <div className="border-border-faint border-l pl-4 sm:pl-5" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-fg-disabled font-mono text-[9px]">
              {selected.kind === "shared" ? "SHARED NODE" : "CONTRAST"}
            </span>
            <span className="text-fg-disabled">·</span>
            <span className="text-fg-muted text-[10px]">
              已核对 {checkedIds.size}/{MENTAL_HEALTH_COMPARISON_CHECKPOINTS.length}
            </span>
          </div>
          <h5 className="text-fg-primary mt-2 text-lg font-medium">{selected.label}</h5>
          <p className="text-fg-secondary mt-2 text-xs leading-5">{selected.question}</p>

          <div className="border-border-faint mt-4 grid border-t sm:grid-cols-2">
            {[selected.left, selected.right].map((side, index) => {
              const route = MENTAL_HEALTH_COMPARISON_ROUTES[index]!;
              return (
                <div
                  key={`${selected.id}:${route.id}`}
                  className="border-border-faint border-b py-4 sm:border-r sm:pr-4 sm:odd:mr-4 sm:even:border-r-0 sm:even:pr-0"
                >
                  <p className="text-[9px]" style={{ color: route.color }}>
                    {route.shortLabel} · 第 {side.step}/{route.stepCount} 步
                  </p>
                  <h6 className="text-fg-primary mt-1 text-sm font-medium">{side.label}</h6>
                  <p className="text-fg-muted mt-2 text-[11px] leading-5">{side.perspective}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    <Link
                      href={side.articleHref}
                      className="text-fg-primary inline-flex min-h-9 items-center border-b border-current text-[10px]"
                    >
                      阅读正文 →
                    </Link>
                    <Link
                      href={side.tourHref}
                      className="text-fg-secondary inline-flex min-h-9 items-center border-b border-current text-[10px]"
                    >
                      定位路线步骤 →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <label className="text-fg-muted mt-4 flex min-h-10 cursor-pointer items-center gap-3 text-[10px]">
            <input
              type="checkbox"
              checked={checkedIds.has(selected.id)}
              onChange={toggleCheckpoint}
              className="h-4 w-4 accent-current"
            />
            已核对这个{selected.kind === "shared" ? "共同锚点" : "分歧检查点"}
          </label>
          <p className="text-fg-disabled mt-1 text-[9px] leading-4">
            核对记录只保存在本机，用于跨路线复核，不会自动写入“已掌握”。
          </p>
        </div>
      </div>
    </section>
  );
}
