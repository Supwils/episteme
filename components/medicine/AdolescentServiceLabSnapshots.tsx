"use client";

import {
  selectAdolescentServicePortfolio,
  type AdolescentServiceAssumptions,
} from "@/subjects/medicine/lib/adolescent-service-portfolio";
import {
  MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS,
  removeAdolescentServiceLabSnapshot,
  saveAdolescentServiceLabSnapshot,
  useAdolescentServiceLabSnapshots,
  type AdolescentServiceLabSnapshot,
} from "@/subjects/medicine/lib/adolescent-service-lab-store";

const ACCENT = "#d9a85a";

type SnapshotInput = Omit<AdolescentServiceLabSnapshot, "id" | "savedAt">;

function snapshotResult(snapshot: AdolescentServiceLabSnapshot) {
  const assumptions: AdolescentServiceAssumptions = {
    [snapshot.sensitivityOptionId]: {
      costMultiplier: snapshot.costMultiplier,
      effectMultiplier: snapshot.effectMultiplier,
    },
  };
  return selectAdolescentServicePortfolio(snapshot.constraints, assumptions);
}

function formatSavedAt(savedAt: string): string {
  const date = new Date(savedAt);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function AdolescentServiceLabSnapshots({
  current,
  onLoad,
}: {
  current: SnapshotInput;
  onLoad: (snapshot: AdolescentServiceLabSnapshot) => void;
}) {
  const snapshots = useAdolescentServiceLabSnapshots();

  return (
    <section
      className="border-border-faint border-t px-5 py-6 sm:px-7"
      aria-labelledby="adolescent-service-snapshots-title"
      data-testid="adolescent-service-lab-snapshots"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="mb-2 font-mono text-[10px] tracking-[0.24em] uppercase"
            style={{ color: ACCENT }}
          >
            local experiment snapshots
          </p>
          <h3
            id="adolescent-service-snapshots-title"
            className="font-display text-fg-primary text-xl font-semibold"
          >
            本机实验快照
          </h3>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-relaxed">
            快照只保存教学参数与敏感性假设，结果由模型在本机重新计算；可随路线档案统一导出导入，不会写入「已掌握」档案。
          </p>
        </div>
        <button
          type="button"
          onClick={() => saveAdolescentServiceLabSnapshot(current)}
          className="min-h-9 border px-3 text-xs transition-colors"
          style={{
            borderColor: "rgba(217, 168, 90, 0.7)",
            backgroundColor: "rgba(217, 168, 90, 0.15)",
            color: "#edc77e",
          }}
        >
          保存当前实验快照（{snapshots.length}/{MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS}）
        </button>
      </div>

      {snapshots.length > 0 ? (
        <ul className="divide-border-faint border-border-faint mt-5 divide-y border-y">
          {snapshots.map((snapshot) => {
            const result = snapshotResult(snapshot);
            return (
              <li
                key={snapshot.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3"
                data-testid={`adolescent-service-snapshot-${snapshot.id}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-fg-primary text-xs font-medium">
                    {formatSavedAt(snapshot.savedAt)} · 预算 {snapshot.constraints.budgetUnits} 单位
                    · 公平权重 {snapshot.constraints.equityWeight.toFixed(1)} · 最低占比{" "}
                    {Math.round(snapshot.constraints.minimumUnderservedShare * 100)}%
                    {snapshot.constraints.requireCompletePathway ? " · 要求完整路径" : ""}
                  </p>
                  <p className="text-fg-muted mt-1 text-[11px] leading-relaxed">
                    {result.isFeasible
                      ? `纳入 ${result.options.length}/6 层 · 实现后收益 ${Math.round(
                          result.realizedBenefitUnits
                        )} · 服务不足群体占比 ${Math.round(result.underservedBenefitShare * 100)}%`
                      : "当前约束下无可行组合"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onLoad(snapshot)}
                    className="border-border-faint text-fg-muted hover:text-fg-primary min-h-9 border px-3 text-[11px]"
                  >
                    载入
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAdolescentServiceLabSnapshot(snapshot.id)}
                    className="text-fg-muted hover:text-fg-primary min-h-9 px-2 text-[11px]"
                  >
                    删除
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-fg-muted mt-5 text-xs">尚未保存实验快照。</p>
      )}
    </section>
  );
}
