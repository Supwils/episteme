"use client";

import { useEffect, useState } from "react";
import {
  fetchKnowledgeRelationReview,
  type KnowledgeRelationReviewView,
} from "@/lib/knowledge-relation-review-view";
import { KnowledgeRelationReviewDetail } from "./KnowledgeRelationReviewDetail";

export function KnowledgeRelationReviewWorkbench({ knownIds }: { knownIds: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<KnowledgeRelationReviewView | null>(null);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    void fetchKnowledgeRelationReview(knownIds, controller.signal)
      .then((next) => {
        setView(next);
        setSelectedTargetId((current) =>
          current && next.targets.some((target) => target.target.id === current)
            ? current
            : (next.targets[0]?.target.id ?? null)
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [knownIds, open]);

  const selected =
    view?.targets.find((target) => target.target.id === selectedTargetId) ??
    view?.targets[0] ??
    null;

  return (
    <section
      className="border-border-faint border-t"
      aria-labelledby="relation-review-title"
      data-testid="knowledge-relation-review"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            prerequisite governance
          </p>
          <h4 id="relation-review-title" className="text-fg-primary mt-1 text-sm font-medium">
            多前置关系审校台
          </h4>
          <p className="text-fg-muted mt-1 max-w-3xl text-[10px] leading-5">
            回放关系版本如何改变路线与可达前沿。平台不采集访问量，因此只按汇流影响、依赖扇出、路线增量和你的本地档案排序。
          </p>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="knowledge-relation-review-body"
          onClick={() => setOpen((value) => !value)}
          className="border-border-faint text-fg-secondary hover:text-fg-primary min-h-10 border px-3 text-[10px]"
        >
          {open ? "收起审校台" : "打开审校台"}
        </button>
      </div>

      {open ? (
        <div id="knowledge-relation-review-body">
          {failed ? (
            <p
              role="alert"
              className="text-fg-secondary border-border-faint border-t px-4 py-8 text-xs sm:px-6"
            >
              关系影响暂时无法计算，请稍后重试。
            </p>
          ) : !view ? (
            <p
              role="status"
              className="text-fg-muted border-border-faint border-t px-4 py-8 text-xs sm:px-6"
            >
              正在回放前置关系版本…
            </p>
          ) : (
            <div className={loading ? "opacity-60" : undefined} aria-busy={loading}>
              <div className="border-border-faint grid border-t sm:grid-cols-3 lg:grid-cols-6">
                {[
                  [view.release.version, "发布版本"],
                  [String(view.summary.targetCount), "L3–L5 审校目标"],
                  [String(view.summary.relationCount), "审校关系"],
                  [String(view.summary.netNewRequiredCount), "新增硬前置"],
                  [`+${view.summary.routeNodeDelta}`, "路线节点增量"],
                  [String(view.summary.cycleCount), "循环风险"],
                ].map(([value, label]) => (
                  <div key={label} className="border-border-faint border-r border-b px-4 py-3">
                    <p className="text-fg-primary font-mono text-sm">{value}</p>
                    <p className="text-fg-disabled mt-1 text-[9px]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="border-border-faint grid gap-4 border-t px-4 py-4 sm:px-6 lg:grid-cols-2">
                <div>
                  <p className="text-fg-disabled text-[9px]">标准审校档案影响</p>
                  <p className="text-fg-primary mt-1 text-xs">
                    v1 可学 {view.summary.referenceReadyBefore} → v2 可学{" "}
                    {view.summary.referenceReadyAfter}
                    ，新增阻塞 {view.summary.referenceBlockedAfter}
                  </p>
                  <p className="text-fg-muted mt-1 text-[9px] leading-4">
                    使用“刚好掌握全部 v1 前置”的合成档案，不代表真实用户人数。
                  </p>
                </div>
                <div>
                  <p className="text-fg-disabled text-[9px]">你的本地档案影响</p>
                  <p className="text-fg-primary mt-1 text-xs">
                    {view.summary.personalChangedTargetCount > 0
                      ? `${view.summary.personalChangedTargetCount} 个汇流目标改变状态；可学 ${view.summary.personalReadyDelta >= 0 ? "+" : ""}${view.summary.personalReadyDelta}，阻塞 ${view.summary.personalBlockedDelta >= 0 ? "+" : ""}${view.summary.personalBlockedDelta}`
                      : "当前 5 个汇流目标在两个版本中的状态相同"}
                  </p>
                  <p className="text-fg-muted mt-1 text-[9px] leading-4">
                    仅在浏览器内计算，不上传学习档案，也不推断掌握程度。
                  </p>
                </div>
              </div>

              <div className="border-border-faint border-t px-4 py-4 sm:px-6">
                <div
                  className="grid border-t border-l border-[var(--color-border-faint)] sm:grid-cols-2 lg:grid-cols-5"
                  role="tablist"
                  aria-label="汇流目标审校"
                >
                  {view.targets.map((target) => {
                    const active = target.target.id === selected?.target.id;
                    return (
                      <button
                        key={target.target.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedTargetId(target.target.id)}
                        className={`min-h-20 border-r border-b border-[var(--color-border-faint)] px-3 py-3 text-left ${
                          active ? "bg-bg-panel" : "hover:bg-bg-panel/60"
                        }`}
                      >
                        <span className="text-fg-primary block text-[10px] leading-4">
                          {target.target.label}
                        </span>
                        <span className="text-fg-muted mt-1 block text-[9px]">
                          前置 {target.baselineRequiredCount}→{target.currentRequiredCount} · 路线 +
                          {target.routeNodeDelta}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selected ? <KnowledgeRelationReviewDetail impact={selected} /> : null}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
