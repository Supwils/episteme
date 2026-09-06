import {
  KNOWLEDGE_FRONTIER_STATUS_META,
  type KnowledgeFrontierNodeState,
} from "@/lib/knowledge-frontier";
import type { GraphNode } from "../../data/types";

export function LearningFrontierStatus({
  state,
  gapNodes,
  onSetMastered,
}: {
  state: KnowledgeFrontierNodeState;
  gapNodes: readonly GraphNode[];
  onSetMastered: (mastered: boolean) => void;
}) {
  const meta = KNOWLEDGE_FRONTIER_STATUS_META[state.status];
  return (
    <section className="border-border-faint border-y py-4" aria-labelledby="node-frontier-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            id="node-frontier-title"
            className="text-fg-muted text-[10px] tracking-[0.18em] uppercase"
          >
            我的学习前沿
          </p>
          <p className="mt-1 text-sm font-medium" style={{ color: meta.color }}>
            {meta.label}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSetMastered(state.status !== "mastered")}
          className="border-border-faint text-fg-secondary hover:border-border-strong hover:text-fg-primary h-9 border px-3 text-[10px] transition-colors"
        >
          {state.status === "mastered" ? "撤销确认" : "确认我已掌握"}
        </button>
      </div>
      <p className="text-fg-muted mt-2 text-[11px] leading-5">{state.reason}</p>
      {state.status === "blocked" && gapNodes.length > 0 ? (
        <p className="text-fg-disabled mt-2 text-[10px] leading-5">
          最小缺口：{gapNodes.map((node) => node.label).join(" → ")}
          {state.gapIds.length > gapNodes.length
            ? `，另 ${state.gapIds.length - gapNodes.length} 个`
            : ""}
        </p>
      ) : null}
      {state.metadataGap ? (
        <p className="text-fg-muted mt-2 text-[10px] leading-5">
          平台尚未建立低阶锚点；直接确认只记录这个节点，不会自动补记隐含前置。
        </p>
      ) : null}
    </section>
  );
}
