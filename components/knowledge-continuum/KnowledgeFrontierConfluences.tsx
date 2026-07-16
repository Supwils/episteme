import Link from "next/link";
import { KNOWLEDGE_FRONTIER_STATUS_META } from "@/lib/knowledge-frontier";
import type { KnowledgeFrontierConfluenceProgress } from "@/lib/knowledge-frontier-view";

export function KnowledgeFrontierConfluences({
  confluences,
}: {
  confluences: readonly KnowledgeFrontierConfluenceProgress[];
}) {
  return (
    <div className="border-border-faint border-t px-4 py-6 sm:px-6">
      <div className="mb-4">
        <p className="text-fg-muted font-mono text-[9px] tracking-[0.18em] uppercase">
          L5 convergence goals
        </p>
        <h4 className="text-fg-primary mt-1 text-sm font-medium">把单点知识汇入研究问题</h4>
        <p className="text-fg-muted mt-1 max-w-3xl text-[10px] leading-5">
          汇流进度按四条学科路线的 L1–L4 节点计算；它比单一目标的直接前置更严格。
        </p>
      </div>
      <div className="divide-border-faint border-border-faint divide-y border-y">
        {confluences.map((confluence) => {
          const status = KNOWLEDGE_FRONTIER_STATUS_META[confluence.status];
          const percentage =
            confluence.prerequisiteCount > 0
              ? (confluence.knownPrerequisiteCount / confluence.prerequisiteCount) * 100
              : 0;
          return (
            <div
              key={confluence.id}
              className="grid gap-3 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(180px,0.35fr)_auto] lg:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-fg-primary text-xs font-medium">{confluence.title}</h5>
                  <span style={{ color: status.color }} className="text-[9px]">
                    {status.shortLabel}
                  </span>
                </div>
                <p className="text-fg-muted mt-1 text-[10px] leading-5">{confluence.question}</p>
                {confluence.missingPreview.length > 0 ? (
                  <p className="text-fg-disabled mt-1 text-[9px] leading-4">
                    待补：{confluence.missingPreview.map((item) => item.label).join("、")}
                    {confluence.missingCount > confluence.missingPreview.length
                      ? `，另 ${confluence.missingCount - confluence.missingPreview.length} 个`
                      : ""}
                  </p>
                ) : null}
              </div>
              <div>
                <div className="text-fg-disabled mb-1 flex justify-between font-mono text-[8px]">
                  <span>路线前置</span>
                  <span>
                    {confluence.knownPrerequisiteCount}/{confluence.prerequisiteCount}
                  </span>
                </div>
                <div className="bg-bg-base h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-fg-secondary)]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-4 text-[10px]">
                <Link
                  href={confluence.href}
                  className="text-fg-secondary hover:text-fg-primary border-b border-current"
                >
                  打开专题
                </Link>
                <Link
                  href={confluence.graphHref}
                  className="text-fg-muted hover:text-fg-primary border-b border-current"
                >
                  查看图谱
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
