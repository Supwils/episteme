"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { KnowledgeStageId } from "@/lib/knowledge-continuum";
import {
  projectKnowledgeSpineOrbit,
  rotationForOrbitDomain,
} from "@/lib/knowledge-spine-orbit";
import type {
  KnowledgeSpineAtlas,
  KnowledgeSpineAtlasRow,
} from "@/lib/knowledge-spine-atlas";
import { KnowledgeSpineOrbitDiagram } from "./KnowledgeSpineOrbitDiagram";

type SpineSelectionHandler = (
  domainId: KnowledgeSpineAtlasRow["domainId"],
  level: KnowledgeStageId
) => void;

type DragState = {
  pointerId: number;
  startX: number;
  startRotation: number;
};

const ROTATION_STEP = 18;

export function KnowledgeSpineOrbit({
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
  const selectedDomainIndex = atlas.rows.findIndex(
    (row) => row.domainId === selectedRow.domainId
  );
  const [rotation, setRotation] = useState(() =>
    rotationForOrbitDomain(selectedDomainIndex, atlas.rows.length)
  );
  const [depthScale, setDepthScale] = useState(1);
  const [showBridges, setShowBridges] = useState(true);
  const dragState = useRef<DragState | null>(null);
  const projection = useMemo(
    () => projectKnowledgeSpineOrbit(atlas, rotation, depthScale),
    [atlas, depthScale, rotation]
  );

  const focusDomain = (
    domainId: KnowledgeSpineAtlasRow["domainId"],
    level: KnowledgeStageId
  ) => {
    const domainIndex = atlas.rows.findIndex((row) => row.domainId === domainId);
    setRotation(rotationForOrbitDomain(domainIndex, atlas.rows.length));
    onSelect(domainId, level);
  };

  const rotateSelectedDomainToFront = () => {
    setRotation(rotationForOrbitDomain(selectedDomainIndex, atlas.rows.length));
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotation,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const updateDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setRotation(drag.startRotation + (event.clientX - drag.startX) * 0.35);
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId !== event.pointerId) return;
    dragState.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className="border-border-faint border-b"
      data-testid="spine-orbit"
      data-depth-scale={depthScale.toFixed(1)}
    >
      <div className="border-border-faint flex flex-wrap items-end justify-between gap-4 border-b px-4 py-4 sm:px-6">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            spatial knowledge spine
          </p>
          <h4 className="text-fg-primary mt-1 text-sm font-medium">五层知识主干与跨域转接</h4>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-fg-muted flex items-center gap-2 text-[10px]">
            <span>聚焦学科</span>
            <select
              aria-label="空间主干聚焦学科"
              value={selectedRow.domainId}
              onChange={(event) =>
                focusDomain(
                  event.target.value as KnowledgeSpineAtlasRow["domainId"],
                  selectedLevel
                )
              }
              className="border-border-faint bg-bg-deep text-fg-primary min-h-9 border px-2 text-xs"
            >
              {atlas.rows.map((row) => (
                <option key={row.domainId} value={row.domainId}>
                  {row.domainLabel}
                </option>
              ))}
            </select>
          </label>

          <label className="text-fg-muted flex min-h-9 items-center gap-2 text-[10px]">
            <input
              type="checkbox"
              checked={showBridges}
              onChange={(event) => setShowBridges(event.target.checked)}
              className="h-3.5 w-3.5"
              style={{ accentColor: "var(--color-fg-primary)" }}
            />
            跨域桥
          </label>

          <label className="text-fg-muted flex min-h-9 items-center gap-2 text-[10px]">
            <span>纵深</span>
            <input
              type="range"
              min="0.5"
              max="1.6"
              step="0.1"
              value={depthScale}
              onChange={(event) => setDepthScale(Number(event.target.value))}
              className="w-20 accent-[#8b9ad8]"
              aria-label="空间主干纵深"
            />
          </label>

          <div className="border-border-faint flex h-9 border" role="group" aria-label="旋转空间主干">
            <OrbitControl
              label="向左旋转"
              symbol="↶"
              onClick={() => setRotation((current) => current - ROTATION_STEP)}
            />
            <OrbitControl label="聚焦当前学科" symbol="◎" onClick={rotateSelectedDomainToFront} />
            <OrbitControl
              label="向右旋转"
              symbol="↷"
              onClick={() => setRotation((current) => current + ROTATION_STEP)}
              last
            />
          </div>
        </div>
      </div>

      <div
        className="cursor-grab overflow-x-auto active:cursor-grabbing"
        onPointerDown={startDrag}
        onPointerMove={updateDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        style={{ touchAction: "pan-y" }}
      >
        <KnowledgeSpineOrbitDiagram
          atlas={atlas}
          projection={projection}
          selectedRow={selectedRow}
          selectedLevel={selectedLevel}
          depthScale={depthScale}
          showBridges={showBridges}
          onSelect={focusDomain}
        />
      </div>

      <div className="border-border-faint border-t px-4 py-4 sm:px-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            当前纵向主干
          </p>
          <Link
            href={selectedRow.domainHref}
            className="text-fg-muted hover:text-fg-primary text-[10px] transition-colors"
          >
            {selectedRow.domainLabel}总览 →
          </Link>
        </div>
        <ol className="grid border-t border-l border-[var(--color-border-faint)] sm:grid-cols-5">
          {selectedRow.steps.map((step) => {
            const selected = step.level === selectedLevel;
            return (
              <li
                key={step.nodeId}
                className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] border-r border-b border-[var(--color-border-faint)]"
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => focusDomain(selectedRow.domainId, step.level)}
                  className={`min-h-16 min-w-0 px-3 py-2 text-left ${
                    selected ? "bg-bg-panel" : "hover:bg-bg-panel/60"
                  }`}
                >
                  <span className="text-fg-disabled block font-mono text-[9px]">
                    L{step.level}
                  </span>
                  <span
                    className="mt-1 block truncate text-xs font-medium"
                    style={{ color: selected ? selectedRow.domainColor : "var(--color-fg-secondary)" }}
                  >
                    {step.label}
                  </span>
                </button>
                {step.articleHref ? (
                  <Link
                    href={step.articleHref}
                    aria-label={`阅读${step.label}`}
                    title={`阅读${step.label}`}
                    className="border-border-faint text-fg-muted hover:bg-bg-panel hover:text-fg-primary flex min-h-11 w-10 items-center justify-center border-l text-xs transition-colors"
                  >
                    ↗
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function OrbitControl({
  label,
  symbol,
  onClick,
  last = false,
}: {
  label: string;
  symbol: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`text-fg-secondary hover:bg-bg-panel hover:text-fg-primary focus-visible:bg-bg-panel focus-visible:text-fg-primary min-w-9 px-2 text-base transition-colors motion-reduce:transition-none ${
        last ? "" : "border-border-faint border-r"
      }`}
    >
      {symbol}
    </button>
  );
}
