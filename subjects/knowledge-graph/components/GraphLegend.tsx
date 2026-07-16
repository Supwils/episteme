"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

export type GraphLegendProps = {
  nodeCounts: Record<string, number>;
  edgeCounts: Record<string, number>;
  knowledgeLevel?: KnowledgeLevel | null;
  targetNodeCount?: number;
};

const DOMAIN_ITEMS = [
  { id: "physics", label: "物理", color: "#6366f1" },
  { id: "history", label: "历史", color: "#f59e0b" },
  { id: "philosophy", label: "哲学", color: "#10b981" },
  { id: "life-science", label: "生命科学", color: "#ec4899" },
  { id: "economics", label: "经济学", color: "#e8b84a" },
  { id: "psychology", label: "心理学", color: "#d4789c" },
  { id: "computer-science", label: "计算机", color: "#4f9cf0" },
  { id: "political-science", label: "政治学", color: "#c25b5b" },
  { id: "cosmology", label: "宇宙学", color: "#3b82f6" },
  { id: "mathematics", label: "数学", color: "#8b5cf6" },
  { id: "earth-science", label: "地球科学", color: "#4f9d76" },
  { id: "medicine", label: "医学", color: "#d9544d" },
  { id: "chemistry", label: "化学", color: "#e08a3c" },
  { id: "sociology", label: "社会学", color: "#7a8f5a" },
  { id: "linguistics", label: "语言学", color: "#3f8f8a" },
] as const;

const NODE_TYPE_ITEMS = [
  { id: "thinker", label: "思想家", color: "#818cf8" },
  { id: "event", label: "事件", color: "#fbbf24" },
  { id: "species", label: "物种", color: "#34d399" },
  { id: "concept", label: "概念", color: "#f472b6" },
  { id: "experiment", label: "实验", color: "#60a5fa" },
  { id: "economist", label: "经济学家", color: "#e8b84a" },
  { id: "theorist", label: "心理学家", color: "#d4789c" },
  { id: "phenomenon", label: "心理现象", color: "#e8a0bf" },
] as const;

export function GraphLegend({
  nodeCounts,
  edgeCounts,
  knowledgeLevel,
  targetNodeCount = 0,
}: GraphLegendProps) {
  const reducedMotion = useReducedMotion();
  const totalNodes = DOMAIN_ITEMS.reduce((sum, domain) => sum + (nodeCounts[domain.id] ?? 0), 0);
  const totalEdges = Object.values(edgeCounts).reduce((sum, n) => sum + n, 0);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
      className="inline-flex flex-col gap-2.5 rounded-xl border border-white/[0.06] bg-[#111118]/80 px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl"
      role="region"
      aria-label="图谱图例"
    >
      {/* Domain row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {DOMAIN_ITEMS.map((domain) => (
          <div
            key={domain.id}
            className="flex items-center gap-1.5"
            title={`${domain.label}: ${nodeCounts[domain.id] ?? 0} 个节点`}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: domain.color }}
            />
            <span className="text-[0.7rem] text-white/60">{domain.label}</span>
            {(nodeCounts[domain.id] ?? 0) > 0 && (
              <span className="text-[0.6rem] text-white/40 tabular-nums">
                {nodeCounts[domain.id]}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" aria-hidden="true" />

      {/* Node type row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {NODE_TYPE_ITEMS.map((nodeType) => (
          <div
            key={nodeType.id}
            className="flex items-center gap-1.5"
            title={`${nodeType.label}: ${nodeCounts[nodeType.id] ?? 0} 个节点`}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full border"
              style={{
                borderColor: nodeType.color,
                backgroundColor: "transparent",
              }}
            />
            <span className="text-[0.7rem] text-white/50">{nodeType.label}</span>
            {(nodeCounts[nodeType.id] ?? 0) > 0 && (
              <span className="text-[0.6rem] text-white/40 tabular-nums">
                {nodeCounts[nodeType.id]}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Stats summary */}
      {(totalNodes > 0 || totalEdges > 0) && (
        <>
          <div className="h-px bg-white/[0.06]" aria-hidden="true" />
          <div className="flex items-center gap-3 text-[0.6rem] text-white/40">
            {totalNodes > 0 && <span>{totalNodes} 个节点</span>}
            {totalEdges > 0 && <span>{totalEdges} 条关系</span>}
            {knowledgeLevel ? (
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full border border-amber-400" aria-hidden="true" />
                L{knowledgeLevel} 目标 {targetNodeCount} · 前置 {totalNodes - targetNodeCount}
              </span>
            ) : null}
          </div>
        </>
      )}
    </motion.div>
  );
}
