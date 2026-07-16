import Link from "next/link";
import { KNOWLEDGE_STAGES, type KnowledgeStageId } from "@/lib/knowledge-continuum";
import type { CoverageReference, DomainCoverageRow } from "@/lib/knowledge-continuum-coverage";
import { isDomainCoverageRow, type CoverageRow } from "./coverage-types";

function pathHref(reference: CoverageReference): string {
  const params = new URLSearchParams({
    path: reference.pathId,
    focus: reference.nodeId,
    source: "coverage",
  });
  return `/knowledge-graph?${params.toString()}`;
}

export function KnowledgeCoverageDetails({
  row,
  level,
  stageTotal,
  onSelectDomain,
}: {
  row: CoverageRow;
  level: KnowledgeStageId;
  stageTotal: number;
  onSelectDomain: (id: string) => void;
}) {
  const stage = KNOWLEDGE_STAGES[level - 1]!;
  const references = row.references.filter((reference) => reference.level === level);
  const count = row.levels[level - 1];

  return (
    <div
      className="border-border-faint border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="h-2.5 w-2.5" style={{ backgroundColor: row.color }} aria-hidden="true" />
        <h4 className="text-fg-primary text-base font-medium">{row.label}</h4>
        {isDomainCoverageRow(row) && row.status === "preview" && (
          <span className="border-border-faint text-fg-muted border px-2 py-0.5 font-mono text-[9px]">
            建设中
          </span>
        )}
      </div>

      <div className="mt-4 flex items-end gap-3">
        <span className="font-mono text-4xl" style={{ color: row.color }}>
          {count}
        </span>
        <div className="pb-1">
          <div className="text-fg-secondary text-xs">个 {stage.label} 核心节点</div>
          <div className="text-fg-disabled mt-0.5 text-[10px]">
            本阶段全景共 {stageTotal} 个节点
          </div>
        </div>
      </div>
      <p className="text-fg-muted mt-3 text-xs leading-5">{stage.description}</p>

      {isDomainCoverageRow(row) ? (
        <DomainConnections row={row} onSelectDomain={onSelectDomain} />
      ) : (
        <p className="text-fg-secondary border-border-faint mt-5 border-t pt-4 text-xs leading-5">
          {row.description}
        </p>
      )}

      <div className="border-border-faint mt-5 border-t pt-4">
        <p className="text-fg-muted font-mono text-[9px] tracking-[0.16em] uppercase">
          此格中的规范路径
        </p>
        {references.length > 0 ? (
          <div className="mt-2 divide-y divide-[var(--color-border-faint)]">
            {references.slice(0, 4).map((reference) => (
              <Link
                key={`${reference.pathId}-${reference.nodeId}`}
                href={pathHref(reference)}
                className="group block py-3"
              >
                <span className="text-fg-primary group-hover:text-accent-gold block text-xs font-medium transition-colors">
                  {reference.pathTitle}
                </span>
                <span className="text-fg-muted mt-1 block text-[11px] leading-5">
                  {reference.nodeLabel}：{reference.transition}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-fg-disabled mt-3 text-xs leading-5">
            当前策展主干在这一格仍为空白。空格不是“没有知识”，而是下一轮应补的入口或前置关系。
          </p>
        )}
      </div>
    </div>
  );
}

function DomainConnections({
  row,
  onSelectDomain,
}: {
  row: DomainCoverageRow;
  onSelectDomain: (id: string) => void;
}) {
  return (
    <>
      <div className="border-border-faint mt-5 border-t pt-4">
        <p className="text-fg-muted font-mono text-[9px] tracking-[0.16em] uppercase">
          高频跨学科转接
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {row.bridges.slice(0, 5).map((bridge) => (
            <button
              key={bridge.id}
              type="button"
              onClick={() => onSelectDomain(bridge.id)}
              className="border-border-faint text-fg-secondary hover:border-fg-muted hover:text-fg-primary min-h-8 border px-2 text-[10px] transition-colors"
            >
              {bridge.label} · {bridge.count}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
        {row.evidence.slice(0, 4).map((item) => (
          <span key={item.id} className="text-fg-muted">
            {item.label} {item.count}
          </span>
        ))}
      </div>
    </>
  );
}
