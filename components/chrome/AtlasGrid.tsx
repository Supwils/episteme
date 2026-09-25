"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Seal } from "@/components/design/Seal";
import { ATLAS, type AtlasCluster, type AtlasDomain } from "@/lib/atlas";
import { pigmentVar } from "@/lib/design/palette";
import type { DomainClusterId } from "@/lib/domain-clusters";
import "./atlas.css";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * 图册（T-DESIGN-03b）：六簇六栏，每行一方学科印、名称、篇数、一句话。
 * 桌面是全宽面板，方向键在格子间移动（左右换栏、上下换行），Esc 由外壳处理；
 * 手机是可折叠的簇列表。本组件按需懒加载，学科印字形不进全站共享包。
 */
export function AtlasGrid({
  variant,
  activeCluster,
  onNavigate,
}: {
  variant: "panel" | "sheet";
  activeCluster?: DomainClusterId | null;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return variant === "panel" ? (
    <PanelGrid pathname={pathname} activeCluster={activeCluster} onNavigate={onNavigate} />
  ) : (
    <SheetList pathname={pathname} onNavigate={onNavigate} />
  );
}

function AtlasCell({
  domain,
  cluster,
  current,
  onNavigate,
  position,
}: {
  domain: AtlasDomain;
  cluster: DomainClusterId;
  current: boolean;
  onNavigate?: () => void;
  position?: { col: number; row: number };
}) {
  return (
    <Link
      href={domain.href}
      data-col={position?.col}
      data-row={position?.row}
      aria-current={current ? "page" : undefined}
      className="atlas-cell"
      onClick={onNavigate}
    >
      <Seal domain={domain.id} size={26} color={pigmentVar(cluster)} label={false} />
      <span className="atlas-cell__text">
        <span className="atlas-cell__name">
          {domain.title}
          <span className="atlas-cell__count">{domain.articles} 篇</span>
        </span>
        <span className="atlas-cell__line">{domain.line}</span>
      </span>
    </Link>
  );
}

function moveFocus(event: React.KeyboardEvent<HTMLElement>) {
  const target = event.target as HTMLElement;
  const col = Number(target.dataset.col);
  const row = Number(target.dataset.row);
  if (Number.isNaN(col)) return;
  const step: Record<string, [number, number]> = {
    ArrowRight: [1, 0],
    ArrowLeft: [-1, 0],
    ArrowDown: [0, 1],
    ArrowUp: [0, -1],
  };
  let next: [number, number] | null = step[event.key]
    ? [col + step[event.key]![0], row + step[event.key]![1]]
    : null;
  if (event.key === "Home") next = [col, 0];
  if (event.key === "End") next = [col, ATLAS[col]!.domains.length - 1];
  if (!next) return;
  event.preventDefault();
  const columns = ATLAS.length;
  const nextCol = (next[0] + columns) % columns;
  const length = ATLAS[nextCol]!.domains.length;
  // Up/down wrap inside a column; left/right keep the row, clamped to the
  // shorter column, so the grid reads like a table.
  const nextRow =
    next[0] === col ? (next[1] + length) % length : Math.min(Math.max(next[1], 0), length - 1);
  event.currentTarget
    .querySelector<HTMLElement>(`[data-col="${nextCol}"][data-row="${nextRow}"]`)
    ?.focus();
}

function PanelGrid({
  pathname,
  activeCluster,
  onNavigate,
}: {
  pathname: string;
  activeCluster?: DomainClusterId | null;
  onNavigate?: () => void;
}) {
  return (
    <div className="atlas-grid" onKeyDown={moveFocus}>
      {ATLAS.map((cluster, col) => (
        <section
          key={cluster.id}
          aria-labelledby={`atlas-${cluster.id}`}
          className="atlas-column"
          data-active={cluster.id === activeCluster || undefined}
          style={{ ["--pigment" as string]: pigmentVar(cluster.id) }}
        >
          <h2 id={`atlas-${cluster.id}`} className="atlas-column__title">
            {cluster.label}
          </h2>
          <ul className="atlas-column__list">
            {cluster.domains.map((domain, row) => (
              <li key={domain.id}>
                <AtlasCell
                  domain={domain}
                  cluster={cluster.id}
                  current={isCurrent(pathname, domain.href)}
                  onNavigate={onNavigate}
                  position={{ col, row }}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function SheetList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const here = ATLAS.find((cluster) => cluster.domains.some((d) => isCurrent(pathname, d.href)));
  const [open, setOpen] = useState<DomainClusterId | null>(here?.id ?? null);
  return (
    <ul className="atlas-sheet">
      {ATLAS.map((cluster: AtlasCluster) => {
        const expanded = open === cluster.id;
        return (
          <li key={cluster.id} style={{ ["--pigment" as string]: pigmentVar(cluster.id) }}>
            <button
              type="button"
              className="atlas-sheet__toggle"
              aria-expanded={expanded}
              aria-controls={`atlas-sheet-${cluster.id}`}
              onClick={() => setOpen(expanded ? null : cluster.id)}
            >
              <span className="atlas-sheet__rule" aria-hidden />
              {cluster.label}
              <span className="atlas-sheet__count">{cluster.domains.length} 个领域</span>
            </button>
            <ul id={`atlas-sheet-${cluster.id}`} hidden={!expanded} className="atlas-sheet__list">
              {cluster.domains.map((domain) => (
                <li key={domain.id}>
                  <AtlasCell
                    domain={domain}
                    cluster={cluster.id}
                    current={isCurrent(pathname, domain.href)}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
