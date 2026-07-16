"use client";

import Link from "next/link";
import {
  KNOWLEDGE_CONFLUENCE_ROLE_META,
  type KnowledgeConfluence,
  type KnowledgeConfluenceRole,
} from "@/lib/knowledge-confluence";
import { buildKnowledgeConfluenceGraphHref } from "@/lib/knowledge-confluence-plan";

export type KnowledgeConfluenceRoleFilter = KnowledgeConfluenceRole | "all";

export function KnowledgeConfluenceMap({
  confluence,
  roleFilter,
  selectedStrandId,
  onSelectStrand,
}: {
  confluence: KnowledgeConfluence;
  roleFilter: KnowledgeConfluenceRoleFilter;
  selectedStrandId: string;
  onSelectStrand: (strandId: string) => void;
}) {
  const visibleStrands = confluence.strands.filter(
    (strand) => roleFilter === "all" || strand.role === roleFilter
  );
  const selectedStrand =
    visibleStrands.find((strand) => strand.id === selectedStrandId) ?? visibleStrands[0]!;

  return (
    <div className="border-border-faint border-t" data-testid="knowledge-confluence-map">
      <div className="overflow-x-auto px-4 py-5 sm:px-6">
        <div className="min-w-[760px]">
          <div
            className="text-fg-disabled mb-2 grid gap-2 font-mono text-[9px]"
            style={{ gridTemplateColumns: "minmax(150px,1.4fr) repeat(4,minmax(112px,1fr))" }}
            aria-hidden="true"
          >
            <span>证据路线</span>
            <span>L1 直觉</span>
            <span>L2 概念</span>
            <span>L3 系统</span>
            <span>L4 方法</span>
          </div>
          <div className="divide-border-faint divide-y">
            {visibleStrands.map((strand) => {
              const active = selectedStrand.id === strand.id;
              const role = KNOWLEDGE_CONFLUENCE_ROLE_META[strand.role];
              return (
                <div
                  key={strand.id}
                  className="grid gap-2 py-2"
                  style={{ gridTemplateColumns: "minmax(150px,1.4fr) repeat(4,minmax(112px,1fr))" }}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelectStrand(strand.id)}
                    className={`min-h-16 border-l-2 px-3 py-2 text-left transition-colors motion-reduce:transition-none ${
                      active
                        ? "bg-bg-elevated text-fg-primary"
                        : "text-fg-secondary hover:bg-bg-elevated"
                    }`}
                    style={{ borderColor: role.color }}
                  >
                    <span className="block text-[9px]" style={{ color: role.color }}>
                      {role.label}
                    </span>
                    <span className="mt-1 block text-xs font-medium">{strand.title}</span>
                  </button>
                  {strand.steps.map((step) => (
                    <button
                      key={step.nodeId}
                      type="button"
                      onClick={() => onSelectStrand(strand.id)}
                      className={`border-border-faint min-h-16 border px-2 py-2 text-left transition-colors motion-reduce:transition-none ${
                        active ? "bg-bg-base" : "hover:bg-bg-elevated"
                      }`}
                      aria-label={`${strand.title}，L${step.level}，${step.label}`}
                    >
                      <span className="text-fg-disabled flex items-center gap-1.5 text-[9px]">
                        <span
                          className="h-1.5 w-1.5 shrink-0"
                          style={{ backgroundColor: step.domainColor }}
                          aria-hidden="true"
                        />
                        {step.domainLabel}
                      </span>
                      <span className="text-fg-secondary mt-1 block text-[11px] leading-4">
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-border-faint grid border-t lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="border-border-faint px-4 py-5 sm:px-6 lg:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="border px-2 py-1 text-[9px]"
              style={{
                borderColor: KNOWLEDGE_CONFLUENCE_ROLE_META[selectedStrand.role].color,
                color: KNOWLEDGE_CONFLUENCE_ROLE_META[selectedStrand.role].color,
              }}
            >
              {KNOWLEDGE_CONFLUENCE_ROLE_META[selectedStrand.role].label}
            </span>
            <h4 className="text-fg-primary text-sm font-medium">{selectedStrand.title}</h4>
          </div>
          <p className="text-fg-secondary mt-3 text-xs leading-5">{selectedStrand.contribution}</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-fg-disabled text-[9px]">不能独自回答</dt>
              <dd className="text-fg-muted mt-1 text-[11px] leading-5">
                {selectedStrand.boundary}
              </dd>
            </div>
            <div>
              <dt className="text-fg-disabled text-[9px]">进入汇流前要问</dt>
              <dd className="text-fg-muted mt-1 text-[11px] leading-5">
                {selectedStrand.reviewQuestion}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-bg-elevated px-4 py-5 sm:px-6">
          <p className="text-accent-gold font-mono text-[9px] tracking-[0.18em] uppercase">
            L5 convergence
          </p>
          <h4 className="text-fg-primary mt-2 text-sm font-medium">{confluence.target.label}</h4>
          <p className="text-fg-muted mt-2 text-[11px] leading-5">
            {confluence.strands.length} 条路线在此并列，而不是被压成一个答案。
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[10px]">
            {confluence.target.articleHref ? (
              <Link
                href={confluence.target.articleHref}
                className="text-fg-secondary hover:text-fg-primary border-b border-current"
              >
                打开研究节点
              </Link>
            ) : null}
            <Link
              href={buildKnowledgeConfluenceGraphHref(confluence.id, confluence.target.nodeId)}
              className="text-accent-gold hover:text-fg-primary border-b border-current"
            >
              在图谱中查看完整汇流
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
