"use client";

import { useState } from "react";
import type { DomainCoverageRow } from "@/lib/knowledge-continuum-coverage";
import type { KnowledgeBridgeFlow } from "@/lib/knowledge-bridge-flow";

type BridgeFlowSelectionProps = {
  domains: readonly DomainCoverageRow[];
  flows: readonly KnowledgeBridgeFlow[];
  selectedFlowId: string | null;
  onSelect: (flowId: string) => void;
};

export function KnowledgeBridgeFlowMatrix(props: BridgeFlowSelectionProps) {
  const { domains, flows, selectedFlowId, onSelect } = props;
  const flowMap = new Map(flows.map((flow) => [flow.id, flow]));
  const domainMap = new Map(domains.map((domain) => [domain.id, domain]));
  const maximum = Math.max(...flows.map((flow) => flow.count), 1);

  return (
    <div className="hidden min-w-0 md:block" data-testid="bridge-flow-matrix">
      <p className="text-fg-disabled mb-2 text-[10px] leading-4">
        行是前置学科，列是下一学科。数字表示筛选条件下的转接次数。
      </p>
      <div className="max-w-full overflow-x-auto pb-2">
        <div
          className="grid min-w-[720px] gap-1"
          style={{
            gridTemplateColumns: `minmax(78px, 96px) repeat(${domains.length}, minmax(34px, 1fr))`,
          }}
        >
          <div className="text-fg-disabled self-end pb-1 text-[9px]">前置 ↓ / 下一 →</div>
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="text-fg-disabled flex h-16 items-end justify-center pb-1 font-mono text-[8px]"
            >
              <span style={{ writingMode: "vertical-rl" }}>{domain.shortLabel}</span>
            </div>
          ))}

          {domains.flatMap((source) => [
            <div
              key={`${source.id}-label`}
              className="text-fg-muted flex min-h-8 items-center gap-2 pr-1 text-[10px]"
            >
              <span className="h-2 w-2 shrink-0" style={{ backgroundColor: source.color }} />
              <span className="truncate">{source.shortLabel}</span>
            </div>,
            ...domains.map((target) => {
              const flow = flowMap.get(`${source.id}->${target.id}`);
              if (!flow) {
                return (
                  <div
                    key={`${source.id}-${target.id}`}
                    className="border-border-faint min-h-8 border"
                    aria-hidden="true"
                  />
                );
              }
              const selected = flow.id === selectedFlowId;
              const intensity = 16 + Math.round((flow.count / maximum) * 44);
              return (
                <button
                  key={flow.id}
                  type="button"
                  onClick={() => onSelect(flow.id)}
                  aria-pressed={selected}
                  aria-label={`${source.label}到${target.label}，${flow.count}次转接`}
                  className="min-h-8 border font-mono text-[10px] transition-colors motion-reduce:transition-none"
                  style={{
                    borderColor: selected ? source.color : "var(--color-border-faint)",
                    backgroundColor: `color-mix(in srgb, ${domainMap.get(flow.toDomain)!.color} ${intensity}%, transparent)`,
                    boxShadow: selected ? `inset 0 0 0 1px ${source.color}` : undefined,
                    color: "var(--color-fg-primary)",
                  }}
                >
                  {flow.count}
                </button>
              );
            }),
          ])}
        </div>
      </div>
    </div>
  );
}

export function KnowledgeBridgeFlowList(props: BridgeFlowSelectionProps) {
  const { domains, flows, selectedFlowId, onSelect } = props;
  const [showAll, setShowAll] = useState(false);
  const domainMap = new Map(domains.map((domain) => [domain.id, domain]));
  const visibleFlows = showAll ? flows : flows.slice(0, 12);

  return (
    <div className="md:hidden">
      <div className="divide-border-faint divide-y">
        {visibleFlows.map((flow) => {
          const source = domainMap.get(flow.fromDomain)!;
          const target = domainMap.get(flow.toDomain)!;
          return (
            <button
              key={flow.id}
              type="button"
              onClick={() => onSelect(flow.id)}
              aria-pressed={flow.id === selectedFlowId}
              aria-label={`${source.label}到${target.label}，${flow.count}次转接`}
              className="flex min-h-11 w-full items-center gap-2 py-2 text-left text-xs"
            >
              <span className="h-2 w-2 shrink-0" style={{ backgroundColor: source.color }} />
              <span className="text-fg-secondary min-w-0 truncate">{source.shortLabel}</span>
              <span className="text-fg-disabled" aria-hidden="true">
                →
              </span>
              <span className="h-2 w-2 shrink-0" style={{ backgroundColor: target.color }} />
              <span className="text-fg-secondary min-w-0 flex-1 truncate">{target.shortLabel}</span>
              <span className="text-fg-primary font-mono">{flow.count}</span>
            </button>
          );
        })}
      </div>
      {flows.length > 12 && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="border-border-faint text-fg-muted hover:text-fg-primary mt-3 min-h-9 border px-3 text-[10px]"
        >
          {showAll ? "收起流向" : `查看全部 ${flows.length} 个流向`}
        </button>
      )}
    </div>
  );
}
