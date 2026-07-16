"use client";

import Link from "next/link";
import { KNOWLEDGE_FRONTIER_STATUS_META } from "@/lib/knowledge-frontier";
import type { KnowledgeFrontierResult } from "@/lib/knowledge-frontier-view";

function ReferenceList({
  label,
  references,
  total,
}: {
  label: string;
  references: KnowledgeFrontierResult["gapPreview"];
  total: number;
}) {
  if (references.length === 0) return null;
  return (
    <p className="text-fg-muted mt-2 text-[10px] leading-5">
      <span className="text-fg-secondary">{label}：</span>
      {references.map((reference) => reference.label).join(" → ")}
      {total > references.length ? `，另有 ${total - references.length} 个` : ""}
    </p>
  );
}

export function KnowledgeFrontierResults({
  results,
  onSetMastered,
  onBuildPlan,
  selectedTargetId,
}: {
  results: readonly KnowledgeFrontierResult[];
  onSetMastered: (nodeId: string, mastered: boolean) => void;
  onBuildPlan: (nodeId: string) => void;
  selectedTargetId: string | null;
}) {
  if (results.length === 0) {
    return (
      <p className="text-fg-muted px-4 py-10 text-sm sm:px-6">
        当前筛选没有节点。可以切换状态、学科或阶段。
      </p>
    );
  }

  return (
    <div className="divide-border-faint divide-y" aria-live="polite">
      {results.map((result) => {
        const status = KNOWLEDGE_FRONTIER_STATUS_META[result.status];
        return (
          <article
            key={result.id}
            className="grid gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]"
            data-testid={`frontier-result-${result.id}`}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0"
                  style={{ backgroundColor: result.domainColor }}
                  aria-hidden="true"
                />
                <h5 className="text-fg-primary text-sm font-medium">{result.label}</h5>
                <span
                  className="border px-2 py-0.5 text-[9px]"
                  style={{ borderColor: status.color, color: status.color }}
                >
                  {status.shortLabel}
                </span>
              </div>
              <p className="text-fg-disabled mt-1 text-[10px]">
                {result.domainLabel} · L{result.level} · {result.evidenceLabel} ·
                {result.source === "curated" ? " 人工策展前置" : " 图谱推断前置"}
              </p>
              <p className="text-fg-secondary mt-2 max-w-3xl text-xs leading-5">{result.reason}</p>
              {result.status === "ready" ? (
                <ReferenceList
                  label="满足依据"
                  references={result.satisfiedPrerequisites}
                  total={result.satisfiedPrerequisites.length}
                />
              ) : result.status === "blocked" && !result.metadataGap ? (
                <ReferenceList
                  label="最小缺口"
                  references={result.gapPreview}
                  total={result.gapCount}
                />
              ) : null}
              {result.metadataGap ? (
                <p className="text-fg-muted mt-2 text-[10px] leading-5">
                  数据边界：当前无法计算最小缺口，需先由编辑者建立低阶锚点。
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
                {result.articleHref ? (
                  <Link
                    href={result.articleHref}
                    className="text-fg-secondary hover:text-fg-primary border-b border-current"
                  >
                    阅读正文
                  </Link>
                ) : null}
                <Link
                  href={result.graphHref}
                  className="text-fg-secondary hover:text-fg-primary border-b border-current"
                >
                  在图谱中核对
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:w-32 lg:flex-col">
              {result.status !== "mastered" && !result.metadataGap ? (
                <button
                  type="button"
                  aria-pressed={selectedTargetId === result.id}
                  onClick={() => onBuildPlan(result.id)}
                  className="border-border-faint text-fg-primary hover:border-fg-muted h-10 border px-3 text-[10px] transition-colors"
                >
                  {result.status === "blocked" ? "生成补缺路线" : "查看学习路线"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => onSetMastered(result.id, result.status !== "mastered")}
                className="border-border-faint text-fg-secondary hover:border-fg-muted hover:text-fg-primary h-10 border px-3 text-[10px] transition-colors"
              >
                {result.status === "mastered" ? "撤销确认" : "确认我已掌握"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
