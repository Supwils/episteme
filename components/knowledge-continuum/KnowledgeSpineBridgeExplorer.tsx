"use client";

import Link from "next/link";
import type { KnowledgeStageId } from "@/lib/knowledge-continuum";
import type {
  KnowledgeSpineAtlasRow,
  KnowledgeSpineBridgeTransition,
} from "@/lib/knowledge-spine-atlas";

function directionLabel(bridge: KnowledgeSpineBridgeTransition): string {
  return bridge.direction === "outgoing" ? "从本学科出发" : "进入本学科";
}

export function KnowledgeSpineBridgeExplorer({
  row,
  bridges,
  selectedLevel,
  activeBridge,
  onSelect,
  onSwitchDomain,
}: {
  row: KnowledgeSpineAtlasRow;
  bridges: readonly KnowledgeSpineBridgeTransition[];
  selectedLevel: KnowledgeStageId;
  activeBridge: KnowledgeSpineBridgeTransition | null;
  onSelect: (bridge: KnowledgeSpineBridgeTransition) => void;
  onSwitchDomain: (bridge: KnowledgeSpineBridgeTransition) => void;
}) {
  return (
    <section
      className="border-border-faint border-t px-4 py-5 sm:px-6"
      aria-labelledby="spine-bridge-title"
      data-testid="spine-bridge-explorer"
    >
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            focused cross-domain bridges
          </p>
          <h4 id="spine-bridge-title" className="text-fg-primary mt-1 text-base font-medium">
            {row.domainLabel}的跨域桥
          </h4>
          <p className="text-fg-muted mt-1 max-w-2xl text-[11px] leading-5">
            只显示与当前学科直接相邻的人工策展步骤；列表按所选阶段的距离排序。
          </p>
        </div>
        <p className="text-fg-disabled font-mono text-[10px]">
          {bridges.length} 条有向转接 · 当前 L{selectedLevel}
        </p>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]">
        <div
          className="border-border-faint max-h-96 overflow-y-auto border"
          data-testid="spine-bridge-list"
          aria-label={`${row.domainLabel}跨域桥列表`}
        >
          {bridges.map((bridge) => {
            const active = bridge.id === activeBridge?.id;
            const touchesSelectedLevel = bridge.selectedDomainLevel === selectedLevel;
            return (
              <button
                key={bridge.id}
                type="button"
                aria-pressed={active}
                aria-label={`${bridge.pathTitle}：${bridge.fromNodeLabel}到${bridge.toNodeLabel}`}
                onClick={() => onSelect(bridge)}
                className="border-border-faint hover:bg-bg-panel block min-h-20 w-full border-b px-3 py-3 text-left transition-colors last:border-b-0 motion-reduce:transition-none"
                style={
                  active
                    ? {
                        borderLeftColor: row.domainColor,
                        boxShadow: `inset 3px 0 ${row.domainColor}`,
                        backgroundColor: `${row.domainColor}0d`,
                      }
                    : undefined
                }
              >
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px]">
                  <span className="text-fg-muted font-mono">
                    L{bridge.fromLevel} → L{bridge.toLevel}
                  </span>
                  <span className="text-fg-disabled">{directionLabel(bridge)}</span>
                  {touchesSelectedLevel ? (
                    <span className="border-border-faint text-fg-secondary border px-1.5 py-0.5">
                      当前阶段
                    </span>
                  ) : null}
                </span>
                <span className="text-fg-primary mt-1.5 flex min-w-0 items-center gap-2 text-[11px]">
                  <span
                    className="h-2 w-2 shrink-0"
                    style={{ backgroundColor: bridge.fromDomainColor }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{bridge.fromDomainShortLabel}</span>
                  <span className="text-fg-disabled" aria-hidden="true">
                    →
                  </span>
                  <span
                    className="h-2 w-2 shrink-0"
                    style={{ backgroundColor: bridge.toDomainColor }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{bridge.toDomainShortLabel}</span>
                </span>
                <span className="text-fg-muted mt-1 line-clamp-1 block text-[10px]">
                  {bridge.fromNodeLabel} → {bridge.toNodeLabel}
                </span>
                <span className="text-fg-disabled mt-1 line-clamp-1 block text-[9px]">
                  {bridge.pathTitle}
                </span>
              </button>
            );
          })}
        </div>

        {activeBridge ? (
          <div
            className="border-border-faint border-t pt-5 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-6"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <span className="text-fg-muted font-mono">
                L{activeBridge.fromLevel} → L{activeBridge.toLevel}
              </span>
              <span className="text-fg-disabled">{directionLabel(activeBridge)}</span>
              <span className="border-border-faint text-fg-muted inline-flex items-center gap-1.5 border px-2 py-0.5">
                <span
                  className="h-1.5 w-1.5"
                  style={{ backgroundColor: activeBridge.evidenceColor }}
                  aria-hidden="true"
                />
                {activeBridge.evidenceLabel}
              </span>
            </div>
            <p className="text-fg-disabled mt-3 text-[10px]">{activeBridge.pathTitle}</p>
            <h5 className="text-fg-primary mt-1 text-base font-medium">
              {activeBridge.fromNodeLabel} → {activeBridge.toNodeLabel}
            </h5>
            <p className="text-fg-muted mt-3 text-xs leading-5">{activeBridge.transition}</p>

            <div className="border-border-faint mt-4 grid border-t sm:grid-cols-2">
              <BridgeEndpoint
                eyebrow={`来源 · ${activeBridge.fromDomainLabel} · L${activeBridge.fromLevel}`}
                label={activeBridge.fromNodeLabel}
                color={activeBridge.fromDomainColor}
                href={activeBridge.fromArticleHref}
              />
              <BridgeEndpoint
                eyebrow={`目标 · ${activeBridge.toDomainLabel} · L${activeBridge.toLevel}`}
                label={activeBridge.toNodeLabel}
                color={activeBridge.toDomainColor}
                href={activeBridge.toArticleHref}
                target
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={() => onSwitchDomain(activeBridge)}
                className="text-fg-secondary hover:text-fg-primary inline-flex min-h-9 items-center border-b border-current text-xs transition-colors motion-reduce:transition-none"
              >
                切换到{activeBridge.counterpartDomainLabel}主干 →
              </button>
              <Link
                href={activeBridge.graphHref}
                className="text-fg-primary inline-flex min-h-9 items-center border-b border-current text-xs"
              >
                在知识图谱核对转接 →
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-fg-muted text-xs">当前学科尚无人工策展的跨域相邻步骤。</p>
        )}
      </div>
    </section>
  );
}

function BridgeEndpoint({
  eyebrow,
  label,
  color,
  href,
  target = false,
}: {
  eyebrow: string;
  label: string;
  color: string;
  href?: string;
  target?: boolean;
}) {
  const content = (
    <>
      <span className="text-fg-disabled block text-[9px]">{eyebrow}</span>
      <span className="text-fg-secondary mt-1 flex items-center gap-2 text-[11px]">
        <span className="h-2 w-2 shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
        <span>{label}</span>
      </span>
    </>
  );

  if (!href) return <div className="px-3 py-3">{content}</div>;
  return (
    <Link
      href={href}
      className={`hover:bg-bg-panel block px-3 py-3 transition-colors ${target ? "border-border-faint border-t sm:border-t-0 sm:border-l" : ""}`}
    >
      {content}
    </Link>
  );
}
