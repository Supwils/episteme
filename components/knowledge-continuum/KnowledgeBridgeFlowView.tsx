"use client";

import { useMemo, useState } from "react";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type {
  CoverageEvidenceMode,
  KnowledgeCoverageSnapshot,
} from "@/lib/knowledge-continuum-coverage";
import { buildKnowledgeBridgeFlows, filterBridgeTransitions } from "@/lib/knowledge-bridge-flow";
import { KNOWLEDGE_STAGES } from "@/lib/knowledge-continuum";
import { KnowledgeBridgeFlowDetails } from "./KnowledgeBridgeFlowDetails";
import { KnowledgeBridgeFlowList, KnowledgeBridgeFlowMatrix } from "./KnowledgeBridgeFlowMatrix";

export function KnowledgeBridgeFlowView({ snapshot }: { snapshot: KnowledgeCoverageSnapshot }) {
  const [level, setLevel] = useState<KnowledgeLevel | null>(null);
  const [evidenceMode, setEvidenceMode] = useState<CoverageEvidenceMode | null>(null);
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const filter = useMemo(() => ({ level, evidenceMode }), [evidenceMode, level]);
  const filteredTransitions = useMemo(
    () => filterBridgeTransitions(snapshot.bridgeTransitions, filter),
    [filter, snapshot.bridgeTransitions]
  );
  const flows = useMemo(
    () => buildKnowledgeBridgeFlows(snapshot.bridgeTransitions, filter),
    [filter, snapshot.bridgeTransitions]
  );
  const selectedFlow = flows.find((flow) => flow.id === selectedFlowId) ?? flows[0] ?? null;

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="border-border-faint flex flex-col gap-4 border-b pb-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-fg-muted text-xs leading-5">
            {filteredTransitions.length} 次转接 · {flows.length} 个有向学科对
          </p>
          <p className="text-fg-disabled mt-1 text-[10px] leading-4">
            方向表示规范路径从前置节点走向下一阶段，不代表学科地位或单向因果。
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <span className="text-fg-disabled mb-1 block text-[9px]">发生阶段</span>
            <div className="border-border-faint flex border" role="group" aria-label="桥发生阶段">
              <BridgeLevelButton
                label="全部"
                selected={level === null}
                onClick={() => setLevel(null)}
              />
              {KNOWLEDGE_STAGES.slice(1).map((stage) => (
                <BridgeLevelButton
                  key={stage.id}
                  label={`L${stage.id}`}
                  selected={level === stage.id}
                  onClick={() => setLevel(stage.id)}
                />
              ))}
            </div>
          </div>
          <label className="text-fg-disabled text-[9px]">
            <span className="mb-1 block">证据方式</span>
            <select
              aria-label="桥证据方式"
              value={evidenceMode ?? ""}
              onChange={(event) =>
                setEvidenceMode((event.target.value || null) as CoverageEvidenceMode | null)
              }
              className="border-border-faint bg-bg-base text-fg-secondary h-9 border px-2 text-[10px]"
            >
              <option value="">全部证据</option>
              {snapshot.evidenceModes.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 pt-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)]">
        <div className="min-w-0">
          <KnowledgeBridgeFlowMatrix
            domains={snapshot.domains}
            flows={flows}
            selectedFlowId={selectedFlow?.id ?? null}
            onSelect={setSelectedFlowId}
          />
          <KnowledgeBridgeFlowList
            domains={snapshot.domains}
            flows={flows}
            selectedFlowId={selectedFlow?.id ?? null}
            onSelect={setSelectedFlowId}
          />
        </div>
        <KnowledgeBridgeFlowDetails
          flow={selectedFlow}
          domains={snapshot.domains}
          evidenceModes={snapshot.evidenceModes}
        />
      </div>
    </div>
  );
}

function BridgeLevelButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={selected ? { color: "var(--color-bg-base)" } : undefined}
      className={`h-9 min-w-10 px-2 font-mono text-[10px] transition-colors motion-reduce:transition-none ${
        selected ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
      }`}
    >
      {label}
    </button>
  );
}
