"use client";

import { useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type GraphMinimapProps = {
  nodes: { x: number; y: number; domain: string }[];
  viewport: { x: number; y: number; width: number; height: number };
  worldBounds: { minX: number; maxX: number; minY: number; maxY: number };
  onNavigate: (x: number, y: number) => void;
};

const DOMAIN_COLORS: Record<string, string> = {
  physics: "#6366f1",
  history: "#f59e0b",
  philosophy: "#10b981",
  "life-science": "#ec4899",
};

const MINIMAP_WIDTH = 150;
const MINIMAP_HEIGHT = 100;

export function GraphMinimap({ nodes, viewport, worldBounds, onNavigate }: GraphMinimapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const worldWidth = worldBounds.maxX - worldBounds.minX || 1;
  const worldHeight = worldBounds.maxY - worldBounds.minY || 1;

  const scaleX = MINIMAP_WIDTH / worldWidth;
  const scaleY = MINIMAP_HEIGHT / worldHeight;

  const toMinimapX = useCallback(
    (wx: number) => (wx - worldBounds.minX) * scaleX,
    [worldBounds.minX, scaleX],
  );

  const toMinimapY = useCallback(
    (wy: number) => (wy - worldBounds.minY) * scaleY,
    [worldBounds.minY, scaleY],
  );

  const vpLeft = toMinimapX(viewport.x);
  const vpTop = toMinimapY(viewport.y);
  const vpWidth = viewport.width * scaleX;
  const vpHeight = viewport.height * scaleY;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const worldX = clickX / scaleX + worldBounds.minX;
      const worldY = clickY / scaleY + worldBounds.minY;

      onNavigate(worldX, worldY);
    },
    [scaleX, scaleY, worldBounds.minX, worldBounds.minY, onNavigate],
  );

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      aria-label="图谱导航小地图，点击跳转到对应区域"
      className="relative cursor-pointer rounded-lg border border-white/[0.06] bg-[#0a0a0f]/90 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-hidden select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
      style={{ width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT }}
    >
      {/* Node dots */}
      {nodes.map((node, i) => {
        const nx = toMinimapX(node.x);
        const ny = toMinimapY(node.y);
        if (nx < 0 || nx > MINIMAP_WIDTH || ny < 0 || ny > MINIMAP_HEIGHT) return null;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: nx - 1,
              top: ny - 1,
              width: 2,
              height: 2,
              backgroundColor: DOMAIN_COLORS[node.domain] ?? "#9ca3af",
              opacity: 0.7,
            }}
          />
        );
      })}

      {/* Viewport rectangle */}
      <div
        className="absolute border border-white/40 bg-white/[0.04] pointer-events-none"
        style={{
          left: Math.max(0, vpLeft),
          top: Math.max(0, vpTop),
          width: Math.min(vpWidth, MINIMAP_WIDTH),
          height: Math.min(vpHeight, MINIMAP_HEIGHT),
        }}
      />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-lg border border-white/[0.04] pointer-events-none" />
    </motion.div>
  );
}
