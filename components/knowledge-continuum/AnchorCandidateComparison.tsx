"use client";

import type { KnowledgeBranchTarget } from "@/lib/knowledge-branch";

export function AnchorCandidateComparison({
  target,
  activeAnchorId,
  onSelect,
}: {
  target: KnowledgeBranchTarget;
  activeAnchorId: string;
  onSelect: (anchorNodeId: string) => void;
}) {
  if (target.candidateCount <= 1) return null;

  return (
    <div
      className="border-border-faint border-b px-4 py-5 sm:px-6"
      aria-labelledby="anchor-candidates-title"
      data-testid="anchor-candidate-comparison"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h4 id="anchor-candidates-title" className="text-fg-primary text-xs font-medium">
            同距锚点比较
          </h4>
          <p className="text-fg-muted mt-1 text-[10px] leading-4">
            共有 {target.candidateCount}{" "}
            条同样短的接入来路；展示按同学科、层级接近度与方向排序最高的
            {target.anchorCandidates.length} 条。
          </p>
        </div>
        <span className="text-fg-disabled font-mono text-[9px]">{target.distance} 跳等距</span>
      </div>

      <div
        className="border-border-faint mt-4 grid border sm:grid-cols-3"
        role="group"
        aria-label="候选知识锚点"
      >
        {target.anchorCandidates.map((candidate, index) => {
          const active = candidate.anchorNodeId === activeAnchorId;
          return (
            <button
              key={candidate.anchorNodeId}
              type="button"
              aria-pressed={active}
              aria-label={`选择锚点“${candidate.anchorLabel}”`}
              onClick={() => onSelect(candidate.anchorNodeId)}
              className={`border-border-faint min-h-32 border-r border-b p-3 text-left transition-colors motion-reduce:transition-none sm:border-b-0 ${
                active ? "bg-bg-panel" : "hover:bg-bg-panel"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-fg-disabled font-mono text-[9px]">候选 {index + 1}</span>
                {active && <span className="text-fg-primary text-[9px]">当前路线</span>}
              </span>
              <span className="text-fg-primary mt-2 block text-xs font-medium">
                {candidate.anchorLabel}
              </span>
              <span className="text-fg-muted mt-1 block text-[10px]">
                {candidate.anchorDomainLabel} · L{candidate.anchorLevel} ·{" "}
                {candidate.anchorPathTitle}
              </span>
              <span className="text-fg-disabled mt-2 block text-[9px] leading-4">
                {candidate.selectionReason}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
