"use client";

import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import type { GraphNode, GraphNodeType } from "../data/types";

export type GraphTooltipProps = {
  node: GraphNode | null;
  position: { x: number; y: number };
  connectedCount: number;
};

const DOMAIN_META: Record<
  GraphNode["domain"],
  { label: string; color: string; bg: string; border: string; borderColor: string }
> = {
  physics: {
    label: "宇宙物理",
    color: "text-indigo-300",
    bg: "bg-indigo-500/20",
    border: "border-indigo-500/30",
    borderColor: "#6366f1",
  },
  history: {
    label: "人类历史",
    color: "text-red-300",
    bg: "bg-red-500/20",
    border: "border-red-400/30",
    borderColor: "#ef4444",
  },
  philosophy: {
    label: "哲学思想",
    color: "text-amber-300",
    bg: "bg-amber-500/20",
    border: "border-amber-400/30",
    borderColor: "#f59e0b",
  },
  "life-science": {
    label: "生命科学",
    color: "text-emerald-300",
    bg: "bg-emerald-500/20",
    border: "border-emerald-400/30",
    borderColor: "#10b981",
  },
  economics: {
    label: "经济学",
    color: "text-yellow-300",
    bg: "bg-yellow-500/20",
    border: "border-yellow-400/30",
    borderColor: "#e8b84a",
  },
  psychology: {
    label: "心理学",
    color: "text-pink-300",
    bg: "bg-pink-500/20",
    border: "border-pink-400/30",
    borderColor: "#d4789c",
  },
  "computer-science": {
    label: "计算机科学",
    color: "text-blue-300",
    bg: "bg-blue-500/20",
    border: "border-blue-400/30",
    borderColor: "#4f9cf0",
  },
  "political-science": {
    label: "政治学",
    color: "text-rose-300",
    bg: "bg-rose-500/20",
    border: "border-rose-400/30",
    borderColor: "#c25b5b",
  },
  cosmology: {
    label: "宇宙学",
    color: "text-sky-300",
    bg: "bg-sky-500/20",
    border: "border-sky-400/30",
    borderColor: "#3b82f6",
  },
  mathematics: {
    label: "数学",
    color: "text-violet-300",
    bg: "bg-violet-500/20",
    border: "border-violet-400/30",
    borderColor: "#8b5cf6",
  },
  "earth-science": {
    label: "地球科学",
    color: "text-green-300",
    bg: "bg-green-500/20",
    border: "border-green-400/30",
    borderColor: "#4f9d76",
  },
  medicine: {
    label: "医学与公共卫生",
    color: "text-rose-300",
    bg: "bg-rose-500/20",
    border: "border-rose-400/30",
    borderColor: "#d9544d",
  },
  chemistry: {
    label: "化学",
    color: "text-orange-300",
    bg: "bg-orange-500/20",
    border: "border-orange-400/30",
    borderColor: "#e08a3c",
  },
};

const NODE_TYPE_LABEL: Record<GraphNodeType, string> = {
  "cosmos-tier": "宇宙层级",
  "physics-tier": "物理层级",
  event: "历史事件",
  figure: "历史人物",
  school: "哲学流派",
  thinker: "哲学家",
  concept: "哲学概念",
  experiment: "实验",
  question: "哲学问题",
  ism: "主义",
  era: "时代",
  species: "物种",
  scientist: "科学家",
  extinction: "大灭绝",
  economist: "经济学家",
  theory: "经济理论",
  theorist: "心理学家",
  phenomenon: "心理现象",
  pioneer: "计算机先驱",
  algorithm: "算法",
  institution: "制度与政体",
  mathematician: "数学家",
  theorem: "数学定理",
  process: "地质过程",
  disease: "疾病",
  technology: "医学技术",
  substance: "物质与材料",
  reaction: "化学反应",
  cosmic: "宇宙学",
};

const OFFSET_X = 16;
const OFFSET_Y = 16;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export const GraphTooltip = memo(function GraphTooltip({
  node,
  position,
  connectedCount,
}: GraphTooltipProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (!node) return null;

  const meta = DOMAIN_META[node.domain];
  const typeLabel = NODE_TYPE_LABEL[node.type] ?? node.type;
  const truncatedDesc =
    node.description.length > 80 ? node.description.slice(0, 80) + "…" : node.description;

  return (
    <AnimatePresence>
      {node ? (
        <motion.div
          key={node.id}
          role="tooltip"
          aria-label={`${node.label} 信息`}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 4 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={clsx(
            "pointer-events-none z-[100] max-w-[280px] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
            isMobile ? "fixed top-3 left-1/2 -translate-x-1/2" : "fixed"
          )}
          style={
            isMobile
              ? {
                  background: "rgba(15, 15, 25, 0.88)",
                  backdropFilter: "blur(20px) saturate(1.2)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.2)",
                }
              : {
                  left: position.x + OFFSET_X,
                  top: position.y + OFFSET_Y,
                  background: "rgba(15, 15, 25, 0.88)",
                  backdropFilter: "blur(20px) saturate(1.2)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.2)",
                }
          }
        >
          <div
            className="flex flex-col gap-2 p-3"
            style={{ borderLeft: `3px solid ${meta.borderColor}` }}
          >
            {/* Domain badge */}
            <span
              className={clsx(
                "inline-flex w-fit items-center rounded-full px-2 py-0.5 font-mono text-[9px] font-medium tracking-[0.15em] uppercase",
                meta.bg,
                meta.color,
                meta.border,
                "border"
              )}
            >
              {meta.label}
            </span>

            {/* Title */}
            <h4 className="text-[14px] leading-tight font-semibold text-white/95">{node.label}</h4>

            {/* Type + era */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/40">
              <span>{typeLabel}</span>
              {node.era ? (
                <>
                  <span aria-hidden className="text-white/20">
                    ·
                  </span>
                  <span>{node.era}</span>
                </>
              ) : null}
              {connectedCount > 0 ? (
                <>
                  <span aria-hidden className="text-white/20">
                    ·
                  </span>
                  <span>{connectedCount} 个关联</span>
                </>
              ) : null}
            </div>

            {/* Description preview */}
            {truncatedDesc ? (
              <p className="text-[11px] leading-relaxed text-white/50">{truncatedDesc}</p>
            ) : null}

            {/* Click hint */}
            <span className="mt-0.5 text-[10px] text-white/40">点击查看详情</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});
