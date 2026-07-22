"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { KNOWLEDGE_STAGES, type KnowledgeStageId } from "@/lib/knowledge-continuum";
import type {
  KnowledgeSpineAtlas as KnowledgeSpineAtlasData,
  KnowledgeSpineAtlasRow,
  KnowledgeSpineBridgeTransition,
} from "@/lib/knowledge-spine-atlas";
import { rankKnowledgeSpineBridges } from "@/lib/knowledge-spine-atlas";
import { KnowledgeSpineBridgeExplorer } from "./KnowledgeSpineBridgeExplorer";
import { KnowledgeSpineOrbit } from "./KnowledgeSpineOrbit";
import { DesktopSpineGrid, MobileSpineRoute } from "./KnowledgeSpineRoutes";
import { FeaturedKnowledgeTours } from "./FeaturedKnowledgeTours";
import { MentalHealthTourComparison } from "./MentalHealthTourComparison";

type SpineViewMode = "orbit" | "matrix";

function graphHref(row: KnowledgeSpineAtlasRow, nodeId: string): string {
  const params = new URLSearchParams({ path: row.pathId, focus: nodeId, source: "spine-atlas" });
  return `/knowledge-graph?${params.toString()}`;
}

export function KnowledgeSpineAtlas({
  atlas,
  embedded = false,
}: {
  atlas: KnowledgeSpineAtlasData;
  embedded?: boolean;
}) {
  const [selectedDomainId, setSelectedDomainId] = useState(atlas.rows[0]!.domainId);
  const [selectedLevel, setSelectedLevel] = useState<KnowledgeStageId>(1);
  const [viewMode, setViewMode] = useState<SpineViewMode>("orbit");
  const [bridgeSelection, setBridgeSelection] = useState<{
    domainId: KnowledgeSpineAtlasRow["domainId"];
    level: KnowledgeStageId;
    bridgeId: string;
  } | null>(null);
  const selectedRow = useMemo(
    () => atlas.rows.find((row) => row.domainId === selectedDomainId) ?? atlas.rows[0]!,
    [atlas.rows, selectedDomainId]
  );
  const selectedStep = selectedRow.steps[selectedLevel - 1]!;
  const selectedStage = KNOWLEDGE_STAGES[selectedLevel - 1]!;
  const rankedBridges = useMemo(
    () => rankKnowledgeSpineBridges(selectedRow.bridgeTransitions, selectedLevel),
    [selectedLevel, selectedRow.bridgeTransitions]
  );
  const activeBridge =
    (bridgeSelection?.domainId === selectedRow.domainId && bridgeSelection.level === selectedLevel
      ? rankedBridges.find((bridge) => bridge.id === bridgeSelection.bridgeId)
      : null) ??
    rankedBridges[0] ??
    null;

  const selectStep = (domainId: KnowledgeSpineAtlasRow["domainId"], level: KnowledgeStageId) => {
    setBridgeSelection(null);
    setSelectedDomainId(domainId);
    setSelectedLevel(level);
  };

  const selectBridge = (bridge: KnowledgeSpineBridgeTransition) => {
    setSelectedLevel(bridge.selectedDomainLevel);
    setBridgeSelection({
      domainId: selectedRow.domainId,
      level: bridge.selectedDomainLevel,
      bridgeId: bridge.id,
    });
  };

  const switchBridgeDomain = (bridge: KnowledgeSpineBridgeTransition) => {
    setSelectedDomainId(bridge.counterpartDomainId);
    setSelectedLevel(bridge.counterpartLevel);
    setBridgeSelection({
      domainId: bridge.counterpartDomainId,
      level: bridge.counterpartLevel,
      bridgeId: `${bridge.counterpartDomainId}:${bridge.transitionId}`,
    });
  };

  return (
    <div
      className="border-border-faint bg-bg-near mt-8 border"
      data-testid={embedded ? undefined : "knowledge-spine-atlas"}
      aria-labelledby="spine-atlas-title"
    >
      <header className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            all-subject spine atlas
          </p>
          <h3
            id="spine-atlas-title"
            className="font-display text-fg-primary mt-1 text-xl font-semibold"
          >
            15 门学科，从第一问走到研究边界
          </h3>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            五层空间视图展示学科主干如何向研究边界收束；矩阵视图用于逐行核对同一学科的五级前置关系。
          </p>
        </div>
        <div className="text-fg-disabled text-[10px] leading-5 lg:text-right">
          {atlas.summary.domainCount} 门学科 · {atlas.summary.nodeCount} 个主干节点
          <br />
          {atlas.summary.crossDomainTransitionCount} 次跨学科转接
        </div>
      </header>

      <div className="border-border-faint border-b px-4 py-3 sm:px-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            atlas view
          </p>
          <div
            className="border-border-faint flex min-h-9 border"
            role="group"
            aria-label="主干地图视图"
          >
            {(
              [
                ["orbit", "空间主干"],
                ["matrix", "矩阵对照"],
              ] as const
            ).map(([mode, label]) => {
              const active = viewMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setViewMode(mode)}
                  className={`border-border-faint min-w-20 border-r px-3 text-[10px] transition-colors last:border-r-0 motion-reduce:transition-none ${
                    active
                      ? "bg-fg-primary"
                      : "text-fg-muted hover:bg-bg-panel hover:text-fg-primary"
                  }`}
                  style={active ? { color: "var(--color-bg-base)" } : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="grid grid-cols-2 border-t border-l border-[var(--color-border-faint)] sm:grid-cols-5"
          role="group"
          aria-label="主干地图阶段"
        >
          {KNOWLEDGE_STAGES.map((stage) => {
            const active = stage.id === selectedLevel;
            return (
              <button
                key={stage.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectStep(selectedRow.domainId, stage.id)}
                className={`min-h-12 border-r border-b border-[var(--color-border-faint)] px-3 py-2 text-left transition-colors motion-reduce:transition-none ${
                  active ? "bg-fg-primary" : "text-fg-muted hover:bg-bg-panel hover:text-fg-primary"
                }`}
                style={active ? { color: "var(--color-bg-base)" } : undefined}
              >
                <span className="block font-mono text-[9px]">L{stage.id}</span>
                <span className="mt-0.5 block text-[10px] font-medium sm:text-xs">
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "orbit" ? (
        <KnowledgeSpineOrbit
          atlas={atlas}
          selectedRow={selectedRow}
          selectedLevel={selectedLevel}
          onSelect={selectStep}
        />
      ) : (
        <>
          <DesktopSpineGrid
            atlas={atlas}
            selectedDomainId={selectedRow.domainId}
            selectedLevel={selectedLevel}
            activeBridge={activeBridge}
            onSelect={selectStep}
          />
          <MobileSpineRoute
            atlas={atlas}
            selectedRow={selectedRow}
            selectedLevel={selectedLevel}
            onSelect={selectStep}
          />
        </>
      )}

      <KnowledgeSpineBridgeExplorer
        row={selectedRow}
        bridges={rankedBridges}
        selectedLevel={selectedLevel}
        activeBridge={activeBridge}
        onSelect={selectBridge}
        onSwitchDomain={switchBridgeDomain}
      />

      <FeaturedKnowledgeTours />
      <MentalHealthTourComparison />

      <div className="border-border-faint border-t px-4 py-5 sm:px-6">
        <div aria-live="polite">
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span
              className="h-2.5 w-2.5"
              style={{ backgroundColor: selectedRow.domainColor }}
              aria-hidden="true"
            />
            <span className="text-fg-secondary">{selectedRow.domainLabel}</span>
            <span className="text-fg-disabled">/</span>
            <span className="text-fg-muted">
              L{selectedLevel} · {selectedStage.label}
            </span>
            <span className="border-border-faint text-fg-muted inline-flex items-center gap-1.5 border px-2 py-0.5">
              <span
                className="h-1.5 w-1.5"
                style={{ backgroundColor: selectedStep.evidenceColor }}
                aria-hidden="true"
              />
              {selectedStep.evidenceLabel}
            </span>
          </div>
          <p className="text-fg-disabled mt-3 text-[10px]">{selectedRow.title}</p>
          <h4 className="text-fg-primary mt-1 text-lg font-medium">{selectedStep.label}</h4>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            {selectedStep.transition}
          </p>
          <p className="text-fg-secondary mt-3 max-w-3xl text-xs leading-5">
            {selectedRow.question}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {selectedStep.articleHref ? (
              <Link
                href={selectedStep.articleHref}
                className="text-fg-primary inline-flex min-h-9 items-center border-b border-current text-xs"
              >
                进入正文 →
              </Link>
            ) : null}
            <Link
              href={graphHref(selectedRow, selectedStep.nodeId)}
              className="text-fg-secondary hover:text-fg-primary inline-flex min-h-9 items-center border-b border-current text-xs transition-colors"
            >
              查看完整前置链 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
