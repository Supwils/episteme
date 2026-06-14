"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/subjects/physics/lib/cn";

type Mode = "wave" | "observe";

const MODE_INFO: Record<Mode, { label: string; description: string; result: string }> = {
  wave: {
    label: "不观测",
    description: "不检测粒子通过哪个缝",
    result: "产生干涉条纹 — 粒子表现如波",
  },
  observe: {
    label: "观测",
    description: "检测粒子通过哪个缝",
    result: "只产生两条带 — 粒子表现如粒子",
  },
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  passedSlit: "left" | "right" | null;
  phase: number;
};

export function DoubleSlit({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [mode, setMode] = useState<Mode>("wave");
  const [isPlaying, setIsPlaying] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const particlesRef = useRef<Particle[]>([]);
  const hitsRef = useRef<{ x: number; y: number; intensity: number }[]>([]);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const getLayout = useCallback((w: number, h: number) => {
    const sourceX = w * 0.08;
    const barrierX = w * 0.4;
    const screenX = w * 0.85;
    const slitGap = h * 0.12;
    const centerY = h * 0.5;
    const slitWidth = h * 0.04;

    return {
      sourceX,
      barrierX,
      screenX,
      centerY,
      slitGap,
      slitWidth,
      slitTop: centerY - slitGap / 2,
      slitBottom: centerY + slitGap / 2,
    };
  }, []);

  const spawnParticle = useCallback(
    (w: number, h: number) => {
      const layout = getLayout(w, h);
      return {
        x: layout.sourceX,
        y: layout.centerY + (Math.random() - 0.5) * 4,
        vx: 2 + Math.random() * 1.5,
        vy: 0,
        active: true,
        passedSlit: null as "left" | "right" | null,
        phase: Math.random() * Math.PI * 2,
      };
    },
    [getLayout]
  );

  const drawScene = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const layout = getLayout(w, h);

      // Source
      ctx.fillStyle = "#6ad0ff";
      ctx.beginPath();
      ctx.arc(layout.sourceX, layout.centerY, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(106, 208, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(layout.sourceX, layout.centerY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Barrier
      ctx.fillStyle = "#3a3e4a";
      ctx.fillRect(layout.barrierX, 0, 6, layout.slitTop - layout.slitWidth);
      ctx.fillRect(
        layout.barrierX,
        layout.slitTop + layout.slitWidth,
        6,
        layout.slitGap - layout.slitWidth * 2
      );
      ctx.fillRect(
        layout.barrierX,
        layout.slitBottom + layout.slitWidth,
        6,
        h - layout.slitBottom - layout.slitWidth
      );

      // Slit labels
      ctx.fillStyle = "rgba(168, 173, 189, 0.5)";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("缝A", layout.barrierX + 3, layout.slitTop - layout.slitWidth - 6);
      ctx.fillText("缝B", layout.barrierX + 3, layout.slitBottom + layout.slitWidth + 14);

      // Detection screen
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(layout.screenX, h * 0.05, 8, h * 0.9);
      ctx.strokeStyle = "rgba(106, 208, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(layout.screenX, h * 0.05, 8, h * 0.9);

      // Observer detector (when in observe mode)
      if (mode === "observe") {
        ctx.fillStyle = "rgba(255, 180, 90, 0.3)";
        ctx.fillRect(
          layout.barrierX - 15,
          layout.slitTop - layout.slitWidth - 5,
          12,
          layout.slitWidth * 2 + 10
        );
        ctx.fillRect(
          layout.barrierX - 15,
          layout.slitBottom - layout.slitWidth - 5,
          12,
          layout.slitWidth * 2 + 10
        );

        ctx.fillStyle = "#ffb45a";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("探测器", layout.barrierX - 9, layout.slitTop - layout.slitWidth - 10);
        ctx.fillText("探测器", layout.barrierX - 9, layout.slitBottom + layout.slitWidth + 18);
      }
    },
    [getLayout, mode]
  );

  const drawHits = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const layout = getLayout(w, h);

      for (const hit of hitsRef.current) {
        const x = layout.screenX + 4;
        const y = hit.y;

        if (mode === "wave") {
          // Interference pattern - bands of intensity
          ctx.fillStyle = `rgba(106, 208, 255, ${hit.intensity * 0.6})`;
          ctx.fillRect(x - 2, y - 1, 12, 2);
        } else {
          // Two bands
          ctx.fillStyle = `rgba(255, 180, 90, ${hit.intensity * 0.6})`;
          ctx.fillRect(x - 2, y - 1, 12, 2);
        }
      }
    },
    [getLayout, mode]
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#060814");
    grad.addColorStop(1, "#0f1320");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    drawScene(ctx, w, h);
    drawHits(ctx, w, h);

    // Draw active particles
    for (const p of particlesRef.current) {
      if (!p.active) continue;

      ctx.save();

      if (mode === "observe") {
        // Show which slit
        ctx.fillStyle = "#ffb45a";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.passedSlit) {
          ctx.fillStyle = "rgba(255, 180, 90, 0.5)";
          ctx.font = "8px monospace";
          ctx.textAlign = "center";
          ctx.fillText(p.passedSlit === "left" ? "A" : "B", p.x, p.y - 8);
        }
      } else {
        // Wave-like particle
        ctx.fillStyle = "#6ad0ff";
        ctx.globalAlpha = 0.7 + Math.sin(p.phase + Date.now() / 200) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Wave ripple
        ctx.strokeStyle = "rgba(106, 208, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 + Math.sin(Date.now() / 150) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    }
  }, [mode, drawScene, drawHits]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const layout = getLayout(w, h);

    // Spawn particles periodically
    if (Math.random() < 0.15) {
      particlesRef.current.push(spawnParticle(w, h));
    }

    // Update particles
    for (const p of particlesRef.current) {
      if (!p.active) continue;

      p.x += p.vx;
      p.y += p.vy;
      p.phase += 0.1;

      // At slit
      if (p.x >= layout.barrierX - 2 && p.x <= layout.barrierX + 8 && p.passedSlit === null) {
        const nearTop = Math.abs(p.y - layout.slitTop) < layout.slitWidth;
        const nearBottom = Math.abs(p.y - layout.slitBottom) < layout.slitWidth;

        if (!nearTop && !nearBottom) {
          p.active = false;
          continue;
        }

        if (nearTop) p.passedSlit = "left";
        else p.passedSlit = "right";

        if (mode === "wave") {
          // Diffraction + interference
          p.vy = (Math.random() - 0.5) * 2.5 + (p.passedSlit === "left" ? 0.3 : -0.3);
        } else {
          // Straight through with small spread
          p.vy = (Math.random() - 0.5) * 0.8;
        }
      }

      // Record hit on screen
      if (p.x >= layout.screenX) {
        p.active = false;
        hitsRef.current.push({
          x: layout.screenX,
          y: p.y,
          intensity: 0.15 + Math.random() * 0.15,
        });
        setParticleCount((c) => c + 1);

        // Limit hit count
        if (hitsRef.current.length > 600) {
          hitsRef.current = hitsRef.current.slice(-400);
        }
      }

      // Out of bounds
      if (p.y < 0 || p.y > h) p.active = false;
    }

    // Clean up inactive particles in-place
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i]!.active) particles.splice(i, 1);
    }

    render();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, mode, getLayout, spawnParticle, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    render();
  }, [render]);

  useEffect(() => {
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    hitsRef.current = [];
    setParticleCount(0);
    particlesRef.current = [];
  };

  const handleReset = () => {
    setIsPlaying(false);
    hitsRef.current = [];
    setParticleCount(0);
    particlesRef.current = [];
    render();
  };

  const modeInfo = MODE_INFO[mode];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <canvas ref={canvasRef} role="img" aria-label="双缝干涉模拟" className="h-full w-full" />

        {/* Mode indicator */}
        <div className="bg-bg-panel/90 absolute top-3 right-3 rounded-lg px-3 py-2 backdrop-blur-sm">
          <span
            className={cn(
              "font-mono text-xs",
              mode === "wave" ? "text-accent-cool" : "text-accent-warm"
            )}
          >
            {modeInfo?.label}模式
          </span>
        </div>

        {/* Result overlay */}
        <AnimatePresence>
          {particleCount > 50 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-bg-panel/90 absolute right-3 bottom-3 left-3 rounded-lg p-3 backdrop-blur-sm"
            >
              <p className="text-fg-secondary text-xs">
                <span
                  className={cn(
                    "font-medium",
                    mode === "wave" ? "text-accent-cool" : "text-accent-warm"
                  )}
                >
                  {modeInfo?.result}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => handleModeChange("wave")}
          className={cn(
            "flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors",
            mode === "wave"
              ? "bg-accent-cool/20 text-accent-cool"
              : "bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30"
          )}
        >
          不观测（波动）
        </button>
        <button
          onClick={() => handleModeChange("observe")}
          className={cn(
            "flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors",
            mode === "observe"
              ? "bg-accent-warm/20 text-accent-warm"
              : "bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30"
          )}
        >
          观测（粒子）
        </button>
      </div>

      {/* Playback controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={
            isPlaying
              ? () => setIsPlaying(false)
              : () => {
                  if (prefersReducedMotion.current) {
                    render();
                    return;
                  }
                  setIsPlaying(true);
                }
          }
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying ? "暂停" : "发射粒子"}
        </button>
        <button
          onClick={handleReset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
        <span className="text-fg-muted ml-auto text-xs">已检测 {particleCount} 个粒子</span>
      </div>

      {/* Explanation */}
      <div className="border-accent-cool/20 bg-accent-cool/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs">
          <span className="text-accent-cool font-medium">量子之谜：</span>
          当不观测时，单个粒子同时穿过两个缝并产生干涉 pattern —— 表现为波。
          一旦你试图观测粒子走了哪条路，干涉 pattern 消失，粒子只表现为两条带。
          观测行为本身改变了实验结果！
        </p>
      </div>
    </div>
  );
}
