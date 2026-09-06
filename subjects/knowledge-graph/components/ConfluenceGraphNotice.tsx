"use client";

import type { KnowledgeConfluenceDefinition } from "@/lib/knowledge-confluence";

export function ConfluenceGraphNotice({
  confluence,
  highlightedNodeCount,
  onExit,
}: {
  confluence: KnowledgeConfluenceDefinition;
  highlightedNodeCount: number;
  onExit: () => void;
}) {
  return (
    <div
      className="border-border-faint bg-bg-floating text-fg-primary relative z-[80] flex shrink-0 flex-col gap-2 border-y px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between"
      data-testid="confluence-graph-notice"
    >
      <div className="min-w-0">
        <p className="text-fg-primary truncate text-xs">
          知识汇流 · <span className="text-fg-primary font-medium">{confluence.title}</span>
        </p>
        <p className="text-fg-muted mt-0.5 text-[10px] leading-4">
          {confluence.strands.length} 条人工路线 · {highlightedNodeCount} 个高亮节点 ·
          非高亮节点保留为图谱语境
        </p>
      </div>
      <button
        type="button"
        onClick={onExit}
        className="text-fg-muted hover:text-fg-primary min-h-8 shrink-0 text-left text-[10px] transition-colors sm:text-right"
      >
        退出汇流视图
      </button>
    </div>
  );
}
