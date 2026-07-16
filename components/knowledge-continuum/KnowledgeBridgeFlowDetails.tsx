import Link from "next/link";
import type { DomainCoverageRow, EvidenceCoverageRow } from "@/lib/knowledge-continuum-coverage";
import type { KnowledgeBridgeFlow } from "@/lib/knowledge-bridge-flow";
import { KNOWLEDGE_STAGES } from "@/lib/knowledge-continuum";

function transitionHref(flow: KnowledgeBridgeFlow, index: number): string {
  const transition = flow.transitions[index]!;
  const params = new URLSearchParams({
    path: transition.pathId,
    focus: transition.toNodeId,
    source: "bridge-flow",
  });
  return `/knowledge-graph?${params.toString()}`;
}

export function KnowledgeBridgeFlowDetails({
  flow,
  domains,
  evidenceModes,
}: {
  flow: KnowledgeBridgeFlow | null;
  domains: readonly DomainCoverageRow[];
  evidenceModes: readonly EvidenceCoverageRow[];
}) {
  if (!flow) {
    return (
      <div className="border-border-faint border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
        <p className="text-fg-muted text-sm">当前筛选组合没有跨学科转接。</p>
        <p className="text-fg-disabled mt-2 text-xs leading-5">
          这不表示学科之间没有联系，只表示41条人工策展主干尚未在此组合中建立相邻步骤。
        </p>
      </div>
    );
  }

  const domainMap = new Map(domains.map((domain) => [domain.id, domain]));
  const evidenceMap = new Map(evidenceModes.map((mode) => [mode.id, mode]));
  const source = domainMap.get(flow.fromDomain)!;
  const target = domainMap.get(flow.toDomain)!;

  return (
    <div
      className="border-border-faint border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="h-2.5 w-2.5"
          style={{ backgroundColor: source.color }}
          aria-hidden="true"
        />
        <h4 className="text-fg-primary text-base font-medium">
          {source.shortLabel} → {target.shortLabel}
        </h4>
        <span
          className="h-2.5 w-2.5"
          style={{ backgroundColor: target.color }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 flex items-end gap-3">
        <span className="font-mono text-4xl" style={{ color: target.color }}>
          {flow.count}
        </span>
        <span className="text-fg-secondary pb-1 text-xs">次有向知识转接</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
        {flow.levels.map((count, index) =>
          count > 0 ? (
            <span key={index} className="text-fg-muted">
              L{index + 1} {count}
            </span>
          ) : null
        )}
        {flow.evidence.map((item) => (
          <span key={item.id} className="text-fg-muted">
            {evidenceMap.get(item.id)?.shortLabel} {item.count}
          </span>
        ))}
      </div>

      <div className="border-border-faint mt-5 border-t pt-4">
        <p className="text-fg-muted font-mono text-[9px] tracking-[0.16em] uppercase">
          转接发生在哪里
        </p>
        <div className="mt-2 divide-y divide-[var(--color-border-faint)]">
          {flow.transitions.map((transition, index) => (
            <Link
              key={transition.id}
              href={transitionHref(flow, index)}
              className="group block py-3"
            >
              <span className="text-fg-primary group-hover:text-accent-gold block text-xs font-medium transition-colors">
                {transition.pathTitle}
              </span>
              <span className="text-fg-muted mt-1 block text-[11px] leading-5">
                L{transition.fromLevel} {transition.fromNodeLabel} → L{transition.level}{" "}
                {transition.toNodeLabel}
              </span>
              <span className="text-fg-disabled mt-1 block text-[10px] leading-4">
                {KNOWLEDGE_STAGES[transition.level - 1]!.shortLabel} ·{" "}
                {evidenceMap.get(transition.evidenceMode)?.label}：{transition.transition}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
