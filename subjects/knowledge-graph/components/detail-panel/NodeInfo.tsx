"use client";

import { clsx } from "clsx";
import type { GraphNode } from "../../data/types";
import { DOMAIN_META, NODE_TYPE_LABEL } from "./constants";
import { Reveal } from "./Reveal";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";

const EVIDENCE_MODE_LABELS: Record<NonNullable<GraphNode["evidenceMode"]>, string> = {
  observation: "观察",
  interpretation: "解释",
  formal: "形式推理",
  experimental: "实验",
  comparative: "比较",
  simulation: "模拟",
  synthesis: "综合证据",
};

type NodeInfoProps = {
  node: GraphNode;
  connectedCount: number;
};

export function NodeInfo({ node, connectedCount }: NodeInfoProps) {
  const meta = DOMAIN_META[node.domain];
  const knowledgeLevel = KNOWLEDGE_LEVELS.find((level) => level.id === node.knowledgeLevel);

  return (
    <>
      <Reveal>
        <div className="flex flex-col gap-2.5">
          <span
            className={clsx(
              "inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.15em] uppercase",
              meta.bg,
              meta.color,
              meta.border,
              "border"
            )}
          >
            {meta.label}
          </span>
          <h2 className="text-[1.5rem] leading-tight font-bold text-white/95 md:text-[1.75rem]">
            {node.label}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-white/40">
            <span>类型：{NODE_TYPE_LABEL[node.type]}</span>
            {node.era ? (
              <>
                <span aria-hidden className="text-white/20">
                  ·
                </span>
                <span>时代：{node.era}</span>
              </>
            ) : null}
            {node.section ? (
              <>
                <span aria-hidden className="text-white/20">
                  ·
                </span>
                <span>分类：{node.section}</span>
              </>
            ) : null}
            {knowledgeLevel ? (
              <>
                <span aria-hidden className="text-white/20">
                  ·
                </span>
                <span>
                  阶段 L{knowledgeLevel.id} · {knowledgeLevel.label}
                </span>
              </>
            ) : null}
            {node.evidenceMode ? (
              <>
                <span aria-hidden className="text-white/20">
                  ·
                </span>
                <span>证据：{EVIDENCE_MODE_LABELS[node.evidenceMode]}</span>
              </>
            ) : null}
            {node.prerequisiteIds && node.prerequisiteIds.length > 0 ? (
              <>
                <span aria-hidden className="text-white/20">
                  ·
                </span>
                <span>{node.prerequisiteIds.length} 个前置节点</span>
              </>
            ) : null}
            {connectedCount > 0 ? (
              <>
                <span aria-hidden className="text-white/20">
                  ·
                </span>
                <span>{connectedCount} 个关联节点</span>
              </>
            ) : null}
          </div>
        </div>
      </Reveal>

      {node.tags.length > 0 ? (
        <Reveal>
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-wide text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      ) : null}

      <Reveal>
        <p className="text-[13px] leading-relaxed text-white/60">{node.description}</p>
      </Reveal>
    </>
  );
}
