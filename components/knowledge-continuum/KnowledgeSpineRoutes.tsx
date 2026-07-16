"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { KNOWLEDGE_STAGES, type KnowledgeStageId } from "@/lib/knowledge-continuum";
import type {
  KnowledgeSpineAtlas,
  KnowledgeSpineAtlasRow,
  KnowledgeSpineBridgeTransition,
} from "@/lib/knowledge-spine-atlas";

type SpineSelectionHandler = (
  domainId: KnowledgeSpineAtlasRow["domainId"],
  level: KnowledgeStageId
) => void;

type BridgeCoordinates = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

function bridgeCoordinateKey(domainId: string, level: number): string {
  return `${domainId}:${level}`;
}

function DesktopBridgeLine({
  container,
  bridge,
}: {
  container: HTMLDivElement | null;
  bridge: KnowledgeSpineBridgeTransition | null;
}) {
  const [coordinates, setCoordinates] = useState<BridgeCoordinates | null>(null);

  useLayoutEffect(() => {
    if (!container || !bridge) {
      setCoordinates(null);
      return;
    }

    const updateCoordinates = () => {
      const from = container.querySelector<HTMLElement>(
        `[data-spine-coordinate="${bridgeCoordinateKey(bridge.fromDomainId, bridge.fromLevel)}"]`
      );
      const to = container.querySelector<HTMLElement>(
        `[data-spine-coordinate="${bridgeCoordinateKey(bridge.toDomainId, bridge.toLevel)}"]`
      );
      if (!from || !to) {
        setCoordinates(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      setCoordinates({
        fromX: fromRect.left - containerRect.left + fromRect.width / 2,
        fromY: fromRect.top - containerRect.top + fromRect.height / 2,
        toX: toRect.left - containerRect.left + toRect.width / 2,
        toY: toRect.top - containerRect.top + toRect.height / 2,
      });
    };

    const frame = requestAnimationFrame(updateCoordinates);
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateCoordinates);
    observer?.observe(container);
    window.addEventListener("resize", updateCoordinates);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", updateCoordinates);
    };
  }, [bridge, container]);

  if (!bridge || !coordinates) return null;
  const middleX = (coordinates.fromX + coordinates.toX) / 2;
  const path = `M ${coordinates.fromX} ${coordinates.fromY} C ${middleX} ${coordinates.fromY}, ${middleX} ${coordinates.toY}, ${coordinates.toX} ${coordinates.toY}`;

  return (
    <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true">
      <defs>
        <marker
          id="spine-bridge-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill={bridge.toDomainColor} />
        </marker>
      </defs>
      <g data-testid="spine-bridge-line">
        <path
          d={path}
          fill="none"
          stroke="var(--color-bg-base)"
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={path}
          fill="none"
          stroke={bridge.toDomainColor}
          strokeWidth="2"
          strokeDasharray="5 4"
          markerEnd="url(#spine-bridge-arrow)"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={coordinates.fromX}
          cy={coordinates.fromY}
          r="5"
          fill={bridge.fromDomainColor}
          stroke="var(--color-bg-base)"
          strokeWidth="2"
        />
        <circle
          cx={coordinates.toX}
          cy={coordinates.toY}
          r="5"
          fill={bridge.toDomainColor}
          stroke="var(--color-bg-base)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export function DesktopSpineGrid({
  atlas,
  selectedDomainId,
  selectedLevel,
  activeBridge,
  onSelect,
}: {
  atlas: KnowledgeSpineAtlas;
  selectedDomainId: KnowledgeSpineAtlasRow["domainId"];
  selectedLevel: KnowledgeStageId;
  activeBridge: KnowledgeSpineBridgeTransition | null;
  onSelect: SpineSelectionHandler;
}) {
  const [gridElement, setGridElement] = useState<HTMLDivElement | null>(null);

  return (
    <div className="hidden overflow-x-auto px-4 py-5 lg:block lg:px-6">
      <div ref={setGridElement} className="relative min-w-[1080px]">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "minmax(118px,0.7fr) repeat(5,minmax(150px,1fr))" }}
          data-testid="spine-atlas-grid"
        >
          <span className="text-fg-disabled px-2 pb-1 font-mono text-[9px]">学科主干</span>
          {KNOWLEDGE_STAGES.map((stage) => (
            <span key={stage.id} className="text-fg-muted px-2 pb-1 text-[9px]">
              L{stage.id} · {stage.shortLabel}
            </span>
          ))}
          {atlas.rows.flatMap((row) => [
            <button
              key={`${row.domainId}-label`}
              type="button"
              onClick={() => onSelect(row.domainId, selectedLevel)}
              className="border-border-faint min-h-16 border px-3 text-left transition-colors motion-reduce:transition-none"
              style={
                row.domainId === selectedDomainId
                  ? { borderColor: row.domainColor, boxShadow: `inset 3px 0 ${row.domainColor}` }
                  : undefined
              }
            >
              <span className="text-fg-primary block text-xs font-medium">{row.domainLabel}</span>
              <span className="text-fg-disabled mt-1 block truncate text-[9px]">{row.title}</span>
            </button>,
            ...row.steps.map((step) => {
              const active = row.domainId === selectedDomainId && step.level === selectedLevel;
              return (
                <div key={step.nodeId} className="relative min-w-0">
                  {step.level > 1 ? (
                    <span
                      className="absolute top-1/2 -left-1 h-px w-1"
                      style={{ backgroundColor: row.domainColor }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <button
                    type="button"
                    data-testid={`spine-step-${row.domainId}-${step.level}`}
                    data-spine-coordinate={bridgeCoordinateKey(row.domainId, step.level)}
                    aria-pressed={active}
                    aria-label={`${row.domainLabel}，L${step.level}：${step.label}`}
                    onClick={() => onSelect(row.domainId, step.level)}
                    className="border-border-faint bg-bg-deep hover:bg-bg-panel min-h-16 w-full border px-3 py-2 text-left transition-colors motion-reduce:transition-none"
                    style={
                      active
                        ? {
                            borderColor: row.domainColor,
                            boxShadow: `inset 0 0 0 1px ${row.domainColor}`,
                          }
                        : step.level === selectedLevel
                          ? { backgroundColor: `${row.domainColor}12` }
                          : undefined
                    }
                  >
                    <span className="text-fg-muted flex items-center gap-1.5 font-mono text-[8px]">
                      <span
                        className="h-1.5 w-1.5 shrink-0"
                        style={{ backgroundColor: step.evidenceColor }}
                        aria-hidden="true"
                      />
                      L{step.level} · {step.evidenceLabel}
                    </span>
                    <span className="text-fg-secondary mt-1 line-clamp-2 block text-[10px] leading-4">
                      {step.label}
                    </span>
                  </button>
                </div>
              );
            }),
          ])}
        </div>
        <DesktopBridgeLine container={gridElement} bridge={activeBridge} />
      </div>
    </div>
  );
}

export function MobileSpineRoute({
  atlas,
  selectedRow,
  selectedLevel,
  onSelect,
}: {
  atlas: KnowledgeSpineAtlas;
  selectedRow: KnowledgeSpineAtlasRow;
  selectedLevel: KnowledgeStageId;
  onSelect: SpineSelectionHandler;
}) {
  return (
    <div className="px-4 py-5 sm:px-6 lg:hidden">
      <label className="text-fg-muted block text-[10px]" htmlFor="spine-atlas-domain">
        选择学科主干
      </label>
      <select
        id="spine-atlas-domain"
        value={selectedRow.domainId}
        onChange={(event) =>
          onSelect(event.target.value as KnowledgeSpineAtlasRow["domainId"], selectedLevel)
        }
        className="border-border-faint bg-bg-deep text-fg-primary mt-2 min-h-11 w-full border px-3 text-xs"
      >
        {atlas.rows.map((row) => (
          <option key={row.domainId} value={row.domainId}>
            {row.domainLabel} · {row.title}
          </option>
        ))}
      </select>

      <ol className="mt-4" aria-label={`${selectedRow.domainLabel}五级主干`}>
        {selectedRow.steps.map((step, index) => {
          const active = step.level === selectedLevel;
          return (
            <li key={step.nodeId} className="relative pb-2 pl-7 last:pb-0">
              {index < selectedRow.steps.length - 1 ? (
                <span
                  className="absolute top-4 bottom-0 left-2.5 w-px"
                  style={{ backgroundColor: selectedRow.domainColor }}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className="bg-bg-base absolute top-4 left-1.5 h-2.5 w-2.5 border"
                style={{ borderColor: selectedRow.domainColor }}
                aria-hidden="true"
              />
              <button
                type="button"
                aria-pressed={active}
                aria-label={`L${step.level} ${step.evidenceLabel}：${step.label}`}
                onClick={() => onSelect(selectedRow.domainId, step.level)}
                className="border-border-faint bg-bg-deep min-h-14 w-full border px-3 py-2 text-left transition-colors motion-reduce:transition-none"
                style={active ? { borderColor: selectedRow.domainColor } : undefined}
              >
                <span className="text-fg-muted flex items-center gap-1.5 font-mono text-[8px]">
                  <span
                    className="h-1.5 w-1.5 shrink-0"
                    style={{ backgroundColor: step.evidenceColor }}
                    aria-hidden="true"
                  />
                  L{step.level} · {step.evidenceLabel}
                </span>
                <span className="text-fg-secondary mt-1 block text-[11px]">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
