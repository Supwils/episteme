"use client";

import { memo, useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import type { GraphNode, GraphEdge } from "../data/types";
import type { CuratedLearningPath } from "../data/curated-learning-paths";
import { PRODUCT_EASE, DOMAIN_META, DOMAIN_ACCENT_GRADIENT } from "./detail-panel/constants";
import { NodeInfo } from "./detail-panel/NodeInfo";
import { ConnectedNodes } from "./detail-panel/ConnectedNodes";
import { NodeActions } from "./detail-panel/NodeActions";
import { LearningPathTrace } from "./detail-panel/LearningPathTrace";
import type { KnowledgeFrontierNodeState } from "@/lib/knowledge-frontier";
import { LearningFrontierStatus } from "./detail-panel/LearningFrontierStatus";

type GraphDetailPanelProps = {
  node: GraphNode | null;
  connectedNodes: GraphNode[];
  connectedEdges: GraphEdge[];
  prerequisitePathNodes: GraphNode[];
  frontierState?: KnowledgeFrontierNodeState;
  frontierGapNodes?: readonly GraphNode[];
  onSetMastered?: (mastered: boolean) => void;
  curatedPath?: CuratedLearningPath;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
  isMobile?: boolean;
};

export const GraphDetailPanel = memo(function GraphDetailPanel({
  node,
  connectedNodes,
  connectedEdges,
  prerequisitePathNodes,
  frontierState,
  frontierGapNodes = [],
  onSetMastered,
  curatedPath,
  onClose,
  onNodeClick,
  isMobile = false,
}: GraphDetailPanelProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [dragY, setDragY] = useState(0);
  const dragStartYRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!node) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => closeButtonRef.current?.focus(), reducedMotion ? 0 : 360);
    return () => {
      window.clearTimeout(id);
      previousFocusRef.current?.focus?.();
    };
  }, [node, reducedMotion]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!node) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [node, handleKeyDown]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;
      dragStartYRef.current = e.touches[0]!.clientY;
      isDraggingRef.current = true;
    },
    [isMobile]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !isDraggingRef.current) return;
      const dy = e.touches[0]!.clientY - dragStartYRef.current;
      setDragY(Math.max(0, dy));
    },
    [isMobile]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    isDraggingRef.current = false;
    if (dragY > 120) {
      onClose();
    }
    setDragY(0);
  }, [isMobile, dragY, onClose]);

  useEffect(() => {
    if (!node) setDragY(0);
  }, [node]);

  const meta = node ? DOMAIN_META[node.domain] : null;
  const accentGradient = node ? DOMAIN_ACCENT_GRADIENT[node.domain] : null;

  return (
    <AnimatePresence>
      {node && meta && accentGradient ? (
        <>
          <motion.div
            key="panel-backdrop"
            aria-hidden
            className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm md:z-40 md:bg-transparent md:backdrop-blur-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="detail-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${node.label} 详情`}
            className={clsx(
              "fixed z-[70] flex flex-col overflow-hidden md:z-50",
              isMobile
                ? "inset-x-0 top-12 bottom-0 rounded-t-2xl"
                : "inset-0 md:inset-auto md:top-[110px] md:right-0 md:h-[calc(100%-110px)] md:max-w-[420px] md:border-l",
              "border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.45)]"
            )}
            style={{
              background: "rgba(15, 15, 25, 0.85)",
              backdropFilter: "blur(24px) saturate(1.2)",
              WebkitBackdropFilter: "blur(24px) saturate(1.2)",
              transform: isMobile && dragY > 0 ? `translateY(${dragY}px)` : undefined,
            }}
            initial={reducedMotion ? { opacity: 0 } : isMobile ? { y: "100%" } : { x: "102%" }}
            animate={reducedMotion ? { opacity: 1 } : isMobile ? { y: 0 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : isMobile ? { y: "100%" } : { x: "102%" }}
            transition={{ duration: 0.36, ease: PRODUCT_EASE }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isMobile && (
              <div className="flex shrink-0 justify-center py-2" aria-hidden>
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
            )}

            <div
              aria-hidden
              className="h-[3px] w-full shrink-0"
              style={{ background: accentGradient }}
            />

            <div className="flex items-center justify-end px-5 pt-4 pb-2 md:px-6">
              <button
                type="button"
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="关闭详情面板"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-colors duration-200 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white/80 md:h-8 md:w-8"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-10 md:px-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-5"
              >
                <NodeInfo node={node} connectedCount={connectedNodes.length} />
                {frontierState && onSetMastered ? (
                  <LearningFrontierStatus
                    state={frontierState}
                    gapNodes={frontierGapNodes}
                    onSetMastered={onSetMastered}
                  />
                ) : null}
                <LearningPathTrace
                  selectedNodeId={node.id}
                  nodes={prerequisitePathNodes}
                  curatedPath={curatedPath}
                  onNodeClick={onNodeClick}
                />
                <NodeActions node={node} />
                <ConnectedNodes
                  nodeId={node.id}
                  nodes={connectedNodes}
                  edges={connectedEdges}
                  prerequisiteIds={node.prerequisiteIds ?? []}
                  onNodeClick={onNodeClick}
                />
              </motion.div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
});
