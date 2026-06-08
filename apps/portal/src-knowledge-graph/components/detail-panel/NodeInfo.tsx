"use client";

import { clsx } from "clsx";
import type { GraphNode } from "../../data/types";
import { DOMAIN_META, NODE_TYPE_LABEL } from "./constants";
import { Reveal } from "./Reveal";

type NodeInfoProps = {
  node: GraphNode;
  connectedCount: number;
};

export function NodeInfo({ node, connectedCount }: NodeInfoProps) {
  const meta = DOMAIN_META[node.domain];

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
              "border",
            )}
          >
            {meta.label}
          </span>
          <h2 className="text-[1.5rem] font-bold leading-tight text-white/95 md:text-[1.75rem]">
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
        <p className="text-[13px] leading-relaxed text-white/60">
          {node.description}
        </p>
      </Reveal>
    </>
  );
}
