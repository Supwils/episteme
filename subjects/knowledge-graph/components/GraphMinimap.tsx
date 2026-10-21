"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DOMAIN_COLORS } from "../lib/constants";

export type GraphMinimapProps = {
  nodes: { x: number; y: number; domain: string }[];
  viewport: { x: number; y: number; width: number; height: number };
  worldBounds: { minX: number; maxX: number; minY: number; maxY: number };
  onNavigate: (x: number, y: number) => void;
};

const MINIMAP_WIDTH = 150;
const MINIMAP_HEIGHT = 100;

export function GraphMinimap({ nodes, viewport, worldBounds, onNavigate }: GraphMinimapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  const worldWidth = worldBounds.maxX - worldBounds.minX || 1;
  const worldHeight = worldBounds.maxY - worldBounds.minY || 1;

  const scaleX = MINIMAP_WIDTH / worldWidth;
  const scaleY = MINIMAP_HEIGHT / worldHeight;

  const toMinimapX = useCallback(
    (wx: number) => (wx - worldBounds.minX) * scaleX,
    [worldBounds.minX, scaleX]
  );

  const toMinimapY = useCallback(
    (wy: number) => (wy - worldBounds.minY) * scaleY,
    [worldBounds.minY, scaleY]
  );

  // One canvas draw per layout change. The dots used to be one <div> each —
  // 3.5k elements rebuilt on every pan and zoom, the biggest single block of
  // main-thread work when the graph mounted.
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = MINIMAP_WIDTH * ratio;
    canvas.height = MINIMAP_HEIGHT * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, MINIMAP_WIDTH, MINIMAP_HEIGHT);
    context.globalAlpha = 0.7;
    for (const node of nodes) {
      const nx = toMinimapX(node.x);
      const ny = toMinimapY(node.y);
      if (nx < 0 || nx > MINIMAP_WIDTH || ny < 0 || ny > MINIMAP_HEIGHT) continue;
      context.fillStyle = DOMAIN_COLORS[node.domain] ?? "#9ca3af";
      context.fillRect(nx - 1, ny - 1, 2, 2);
    }
  }, [nodes, toMinimapX, toMinimapY]);

  const vpLeft = toMinimapX(viewport.x);
  const vpTop = toMinimapY(viewport.y);
  const vpWidth = viewport.width * scaleX;
  const vpHeight = viewport.height * scaleY;

  const navigateToMinimapPoint = useCallback(
    (minimapX: number, minimapY: number) => {
      const worldX = minimapX / scaleX + worldBounds.minX;
      const worldY = minimapY / scaleY + worldBounds.minY;
      if (!Number.isFinite(worldX) || !Number.isFinite(worldY)) return;
      onNavigate(worldX, worldY);
    },
    [scaleX, scaleY, worldBounds.minX, worldBounds.minY, onNavigate]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      navigateToMinimapPoint(e.clientX - rect.left, e.clientY - rect.top);
    },
    [navigateToMinimapPoint]
  );

  // A key press has no pointer position; it recentres on the whole map, the
  // keyboard equivalent of clicking the middle of the minimap.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      navigateToMinimapPoint(MINIMAP_WIDTH / 2, MINIMAP_HEIGHT / 2);
    },
    [navigateToMinimapPoint]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="图谱导航小地图，点击跳转到对应区域，按回车回到全图中心"
      className="border-border-faint bg-bg-floating/90 relative cursor-pointer overflow-hidden rounded-lg border shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-xl select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
      style={{ width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT }}
      />

      {/* Viewport rectangle */}
      <div
        className="border-border-strong pointer-events-none absolute border bg-[var(--input-bg)]"
        style={{
          left: Math.max(0, vpLeft),
          top: Math.max(0, vpTop),
          width: Math.min(vpWidth, MINIMAP_WIDTH),
          height: Math.min(vpHeight, MINIMAP_HEIGHT),
        }}
      />

      {/* Border glow */}
      <div className="border-border-faint pointer-events-none absolute inset-0 rounded-lg border" />
    </motion.div>
  );
}
