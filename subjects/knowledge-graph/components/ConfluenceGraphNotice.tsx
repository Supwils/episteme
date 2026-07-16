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
      className="relative z-[80] flex shrink-0 flex-col gap-2 border-y border-white/8 bg-[#111118] px-4 py-2.5 text-white sm:flex-row sm:items-center sm:justify-between"
      data-testid="confluence-graph-notice"
    >
      <div className="min-w-0">
        <p className="truncate text-xs text-white/85">
          知识汇流 · <span className="font-medium text-white">{confluence.title}</span>
        </p>
        <p className="mt-0.5 text-[10px] leading-4 text-white/45">
          {confluence.strands.length} 条人工路线 · {highlightedNodeCount} 个高亮节点 ·
          非高亮节点保留为图谱语境
        </p>
      </div>
      <button
        type="button"
        onClick={onExit}
        className="min-h-8 shrink-0 text-left text-[10px] text-white/55 transition-colors hover:text-white sm:text-right"
      >
        退出汇流视图
      </button>
    </div>
  );
}
