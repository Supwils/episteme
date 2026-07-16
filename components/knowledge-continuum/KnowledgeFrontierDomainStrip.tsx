"use client";

import type { CoverageDomainId } from "@/lib/knowledge-continuum-coverage-meta";
import type { KnowledgeFrontierDomainProgress } from "@/lib/knowledge-frontier-view";

export function KnowledgeFrontierDomainStrip({
  domains,
  selectedDomain,
  onSelect,
}: {
  domains: readonly KnowledgeFrontierDomainProgress[];
  selectedDomain: CoverageDomainId | undefined;
  onSelect: (domainId: CoverageDomainId | undefined) => void;
}) {
  const hasPreviewDomain = domains.some((domain) => domain.status === "preview");

  return (
    <div className="border-border-faint border-b px-4 py-5 sm:px-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-fg-muted font-mono text-[9px] tracking-[0.18em] uppercase">
          15 学科确认分布
        </p>
        {selectedDomain ? (
          <button
            type="button"
            onClick={() => onSelect(undefined)}
            className="text-fg-muted hover:text-fg-primary border-b border-current text-[10px]"
          >
            查看全部
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-3 border-t border-l border-[var(--color-border-faint)] sm:grid-cols-5 lg:grid-cols-[repeat(15,minmax(0,1fr))]">
        {domains.map((domain) => {
          const active = domain.id === selectedDomain;
          const percentage = domain.total > 0 ? (domain.mastered / domain.total) * 100 : 0;
          return (
            <button
              key={domain.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(active ? undefined : domain.id)}
              className={`min-w-0 border-r border-b border-[var(--color-border-faint)] px-2 py-3 text-left transition-colors ${
                active ? "bg-bg-panel" : "hover:bg-bg-panel"
              }`}
              title={`${domain.label}：已掌握 ${domain.mastered}/${domain.total}，可学习 ${domain.ready}`}
            >
              <span className="text-fg-secondary block truncate text-[10px]">
                {domain.shortLabel}
                {domain.status === "preview" ? "*" : ""}
              </span>
              <span className="text-fg-disabled mt-1 block font-mono text-[8px]">
                {domain.mastered}/{domain.total}
              </span>
              <span className="bg-bg-base mt-2 block h-1 overflow-hidden" aria-hidden="true">
                <span
                  className="block h-full"
                  style={{ width: `${percentage}%`, backgroundColor: domain.color }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-fg-disabled mt-2 text-[9px] leading-4">
        {hasPreviewDomain ? "* 标记建设中学科。" : ""}
        条带只表示你主动确认的节点，不代表能力或学科权重。
      </p>
    </div>
  );
}
