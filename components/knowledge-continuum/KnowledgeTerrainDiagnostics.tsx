"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { KnowledgeTargetFilter } from "@/lib/knowledge-branch";
import type {
  KnowledgeTerrainDiagnosisKind,
  KnowledgeTerrainDomain,
  KnowledgeTerrainSnapshot,
} from "@/lib/knowledge-terrain";

const DIAGNOSIS_LABELS: Record<KnowledgeTerrainDiagnosisKind, string> = {
  "missing-levels": "阶段空白",
  "stage-concentration": "阶段集中",
  "advanced-thin": "高阶偏薄",
  "thin-backbone": "骨架稀疏",
  "distant-branches": "远距旁支",
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function priorityScore(domain: KnowledgeTerrainDomain): number {
  return domain.diagnostics.reduce(
    (score, diagnosis) => score + (diagnosis.severity === "high" ? 3 : 1),
    0
  );
}

function graphHref(domain: KnowledgeTerrainDomain, level?: number): string {
  const params = new URLSearchParams({ domain: domain.id, source: "terrain-diagnostic" });
  if (level) params.set("level", String(level));
  return `/knowledge-graph?${params.toString()}`;
}

export function KnowledgeTerrainDiagnostics({
  snapshot,
  selectedDomainId,
  onExplore,
}: {
  snapshot: KnowledgeTerrainSnapshot;
  selectedDomainId?: KnowledgeTerrainDomain["id"];
  onExplore: (filter: KnowledgeTargetFilter) => void;
}) {
  const priorityDomains = useMemo(
    () =>
      snapshot.domains
        .filter((domain) => domain.diagnostics.length > 0)
        .sort(
          (left, right) =>
            priorityScore(right) - priorityScore(left) ||
            left.label.localeCompare(right.label, "zh-CN")
        )
        .slice(0, 6),
    [snapshot.domains]
  );
  const [activeDomainId, setActiveDomainId] = useState(
    selectedDomainId ?? priorityDomains[0]?.id ?? snapshot.domains[0]!.id
  );

  useEffect(() => {
    if (selectedDomainId) setActiveDomainId(selectedDomainId);
  }, [selectedDomainId]);

  const domain =
    snapshot.domains.find((candidate) => candidate.id === activeDomainId) ??
    priorityDomains[0] ??
    snapshot.domains[0]!;

  return (
    <section
      className="border-border-faint border-t"
      aria-labelledby="terrain-diagnostics-title"
      data-testid="knowledge-terrain-diagnostics"
    >
      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h4 id="terrain-diagnostics-title" className="text-fg-primary text-sm font-medium">
            知识库存诊断
          </h4>
          <p className="text-fg-muted mt-1 max-w-3xl text-[10px] leading-4">
            诊断只描述平台现有节点和策展关系，不评价学科价值、成熟度或现实研究规模。
          </p>
        </div>
        <p className="text-fg-disabled text-[10px] lg:text-right">
          {snapshot.summary.diagnosticCount} 条可复核信号 ·{" "}
          {snapshot.summary.highPriorityDiagnosticCount}
          条高优先
        </p>
      </div>

      <div
        className="border-border-faint flex flex-wrap gap-1 border-b px-4 py-3 sm:px-6"
        role="group"
        aria-label="优先检查学科"
      >
        {priorityDomains.map((candidate) => {
          const active = candidate.id === domain.id;
          return (
            <button
              key={candidate.id}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveDomainId(candidate.id)}
              style={active ? { borderColor: candidate.color, color: candidate.color } : undefined}
              className="border-border-faint text-fg-muted hover:text-fg-primary min-h-9 border px-3 text-[10px] transition-colors motion-reduce:transition-none"
            >
              {candidate.shortLabel} · {candidate.diagnostics.length}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[minmax(220px,0.55fr)_minmax(0,1.45fr)]">
        <div className="border-border-faint border-b px-4 py-5 sm:px-6 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5"
              style={{ backgroundColor: domain.color }}
              aria-hidden="true"
            />
            <h5 className="text-fg-primary text-sm font-medium">{domain.label}</h5>
            {domain.status === "preview" && (
              <span className="border-border-faint text-fg-disabled border px-1.5 py-0.5 text-[9px]">
                建设中
              </span>
            )}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[10px]">
            <div>
              <dt className="text-fg-disabled">当前节点</dt>
              <dd className="text-fg-primary mt-0.5 font-mono">{domain.total}</dd>
            </div>
            <div>
              <dt className="text-fg-disabled">人工骨架</dt>
              <dd className="text-fg-primary mt-0.5 font-mono">
                {formatPercent(domain.metrics.curatedShare)}
              </dd>
            </div>
            <div>
              <dt className="text-fg-disabled">L4–L5</dt>
              <dd className="text-fg-primary mt-0.5 font-mono">
                {formatPercent(domain.metrics.advancedShare)}
              </dd>
            </div>
            <div>
              <dt className="text-fg-disabled">探索旁支</dt>
              <dd className="text-fg-primary mt-0.5 font-mono">
                {formatPercent(domain.metrics.exploratoryShare)}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href={domain.href}
              className="text-fg-secondary hover:text-fg-primary min-h-8 border-b border-current text-[10px] leading-8 transition-colors"
            >
              进入学科内容
            </Link>
            <Link
              href={graphHref(domain)}
              className="text-fg-secondary hover:text-fg-primary min-h-8 border-b border-current text-[10px] leading-8 transition-colors"
            >
              查看学科图谱
            </Link>
          </div>
        </div>

        <div aria-live="polite">
          {domain.diagnostics.length > 0 ? (
            domain.diagnostics.map((diagnosis) => (
              <article
                key={diagnosis.id}
                className="border-border-faint border-b px-4 py-4 last:border-b-0 sm:px-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-fg-disabled font-mono text-[9px]">
                    {diagnosis.severity === "high" ? "高优先" : "需复核"}
                  </span>
                  <span className="border-border-faint text-fg-muted border px-1.5 py-0.5 text-[9px]">
                    {DIAGNOSIS_LABELS[diagnosis.kind]}
                  </span>
                  <h6 className="text-fg-primary text-xs font-medium">{diagnosis.title}</h6>
                </div>
                <p className="text-fg-muted mt-2 text-[10px] leading-4">{diagnosis.description}</p>
                <p className="text-fg-secondary mt-1 text-[10px] leading-4">
                  补强方向：{diagnosis.recommendation}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      onExplore({
                        domainId: domain.id,
                        level:
                          diagnosis.kind === "missing-levels" ? undefined : diagnosis.focusLevel,
                        confidence: diagnosis.focusConfidence,
                      })
                    }
                    className="text-fg-secondary hover:text-fg-primary min-h-8 border-b border-current text-[10px] transition-colors"
                  >
                    {diagnosis.kind === "missing-levels" ? "查看现有节点" : "在编排器筛选"}
                  </button>
                  <Link
                    href={graphHref(domain, diagnosis.focusLevel)}
                    className="text-fg-secondary hover:text-fg-primary min-h-8 border-b border-current text-[10px] leading-8 transition-colors"
                  >
                    在图谱中检查
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="text-fg-muted px-4 py-8 text-xs leading-5 sm:px-6">
              当前阈值下没有突出结构信号；这不代表内容已经完整，仍需结合引用、正文质量和专家审校判断。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
