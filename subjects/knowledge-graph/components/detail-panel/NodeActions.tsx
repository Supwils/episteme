"use client";

import { clsx } from "clsx";
import type { GraphNode } from "../../data/types";
import { DOMAIN_META, resolveNodeUrl } from "./constants";
import { Reveal } from "./Reveal";

type NodeActionsProps = {
  node: GraphNode;
};

export function NodeActions({ node }: NodeActionsProps) {
  const detailUrl = node.url ?? resolveNodeUrl(node);
  if (!detailUrl) return null;

  const meta = DOMAIN_META[node.domain];

  return (
    <Reveal>
      <a
        href={detailUrl}
        className={clsx(
          "inline-flex w-fit items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-medium transition-all duration-200",
          meta.border,
          meta.bg,
          meta.color,
          "hover:bg-white/[0.06]",
        )}
      >
        查看详情
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
    </Reveal>
  );
}
