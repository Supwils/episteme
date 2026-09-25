"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { DOMAIN_CLUSTERS, type DomainClusterId } from "@/lib/domain-clusters";

const loadAtlas = () => import("./AtlasGrid").then((m) => m.AtlasGrid);
const AtlasGrid = dynamic(loadAtlas, { ssr: false });

const PANEL_ID = "atlas-panel";

/**
 * 图册面板的触发器（T-DESIGN-03a/b）。`clusters` 是全站页头的六个簇按钮，
 * `single` 是领域页头右侧的「全部领域」。两者打开同一块全宽面板：
 * 点哪一簇，那一栏的刻线加粗；键盘打开时焦点落到那一栏的第一格。
 * 面板本体在指针或焦点第一次靠近时才加载。
 */
export function AtlasMenu({ triggers }: { triggers: "clusters" | "single" }) {
  const pathname = usePathname();
  const [active, setActive] = useState<DomainClusterId | "all" | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const open = active !== null;

  const close = useCallback((returnFocus: boolean) => {
    setActive(null);
    if (returnFocus) openerRef.current?.focus();
  }, []);

  useEffect(() => setActive(null), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !panelRef.current?.contains(target)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const focusColumn = (cluster: DomainClusterId | "all") => {
    const col = cluster === "all" ? 0 : DOMAIN_CLUSTERS.findIndex((c) => c.id === cluster);
    // The grid may still be loading; try for a few frames.
    let attempts = 30;
    const tick = () => {
      const cell = panelRef.current?.querySelector<HTMLElement>(
        `[data-col="${col}"][data-row="0"]`
      );
      if (cell) cell.focus();
      else if (attempts-- > 0) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const toggle = (cluster: DomainClusterId | "all", button: HTMLButtonElement, byKey: boolean) => {
    openerRef.current = button;
    if (active === cluster) {
      close(false);
      return;
    }
    setActive(cluster);
    if (byKey) focusColumn(cluster);
  };

  const triggerProps = (cluster: DomainClusterId | "all") => ({
    type: "button" as const,
    "aria-expanded": active === cluster,
    "aria-controls": PANEL_ID,
    onPointerEnter: () => {
      void loadAtlas();
      // Once the panel is open, pointing at another cluster just moves the highlight.
      if (open && cluster !== "all") setActive(cluster);
    },
    onFocus: () => void loadAtlas(),
    onClick: (event: React.MouseEvent<HTMLButtonElement>) =>
      toggle(cluster, event.currentTarget, event.detail === 0),
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();
      openerRef.current = event.currentTarget;
      setActive(cluster);
      focusColumn(cluster);
    },
  });

  return (
    <div ref={rootRef} className="flex items-center">
      {triggers === "clusters" ? (
        <ul className="m-0 hidden list-none items-center gap-0.5 p-0 lg:flex">
          {DOMAIN_CLUSTERS.map((cluster) => (
            <li key={cluster.id}>
              <button
                {...triggerProps(cluster.id)}
                className="text-fg-secondary hover:text-fg-primary aria-expanded:text-fg-primary rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors"
              >
                {cluster.label}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <button
          {...triggerProps("all")}
          className="border-border-subtle text-fg-secondary hover:text-fg-primary aria-expanded:text-fg-primary hidden rounded-md border px-2.5 py-1.5 text-[13px] whitespace-nowrap transition-colors lg:inline-flex"
        >
          全部领域
        </button>
      )}

      <div
        ref={panelRef}
        id={PANEL_ID}
        role="region"
        aria-label="全部领域"
        hidden={!open}
        onBlur={(event) => {
          const next = event.relatedTarget as Node | null;
          if (next && !panelRef.current?.contains(next) && !rootRef.current?.contains(next)) {
            close(false);
          }
        }}
        className="atlas-panel border-border-subtle bg-bg-panel fixed inset-x-0 top-14 z-[60] max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)]"
      >
        {open && (
          <div className="mx-auto max-w-[1400px] px-6 pt-5 pb-7">
            <AtlasGrid
              variant="panel"
              activeCluster={active === "all" ? null : active}
              onNavigate={() => close(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
