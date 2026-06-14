"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/subjects/physics/lib/cn";

type AlphaParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  scattered: boolean;
  trail: { x: number; y: number }[];
};

export function RutherfordScattering({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState({ total: 0, passed: 0, scattered: 0, reflected: 0 });
  const particlesRef = useRef<AlphaParticle[]>([]);
  const statsRef = useRef({ total: 0, passed: 0, scattered: 0, reflected: 0 });
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const getLayout = useCallback((w: number, h: number) => {
    const foilX = w * 0.55;
    const foilW = w * 0.08;
    const foilY = h * 0.1;
    const foilH = h * 0.8;
    const nucleusX = foilX + foilW / 2;
    const nucleusY = h * 0.5;
    const nucleusRadius = 6;

    return {
      foilX,
      foilW,
      foilY,
      foilH,
      nucleusX,
      nucleusY,
      nucleusRadius,
      sourceX: w * 0.08,
    };
  }, []);

  const spawnParticle = useCallback(
    (w: number, h: number) => {
      const layout = getLayout(w, h);
      const y = h * 0.15 + Math.random() * h * 0.7;

      return {
        x: layout.sourceX,
        y,
        vx: 2.5 + Math.random() * 1,
        vy: (Math.random() - 0.5) * 0.3,
        active: true,
        scattered: false,
        trail: [{ x: layout.sourceX, y }],
      };
    },
    [getLayout]
  );

  const drawScene = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const layout = getLayout(w, h);

      // Alpha source
      ctx.fillStyle = "#6ad0ff";
      ctx.fillRect(layout.sourceX - 12, h * 0.35, 12, h * 0.3);

      ctx.fillStyle = "rgba(106, 208, 255, 0.3)";
      ctx.fillRect(layout.sourceX - 18, h * 0.35, 6, h * 0.3);

      ctx.fillStyle = "rgba(168, 173, 189, 0.6)";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.save();
      ctx.translate(layout.sourceX - 6, h * 0.3);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("α粒子源", 0, 0);
      ctx.restore();

      // Gold foil
      const foilGrad = ctx.createLinearGradient(layout.foilX, 0, layout.foilX + layout.foilW, 0);
      foilGrad.addColorStop(0, "rgba(255, 180, 90, 0.15)");
      foilGrad.addColorStop(0.5, "rgba(255, 180, 90, 0.25)");
      foilGrad.addColorStop(1, "rgba(255, 180, 90, 0.15)");
      ctx.fillStyle = foilGrad;
      ctx.fillRect(layout.foilX, layout.foilY, layout.foilW, layout.foilH);

      ctx.strokeStyle = "rgba(255, 180, 90, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(layout.foilX, layout.foilY, layout.foilW, layout.foilH);

      ctx.fillStyle = "rgba(255, 180, 90, 0.6)";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("金箔", layout.foilX + layout.foilW / 2, layout.foilY - 8);

      // Nucleus (greatly exaggerated size for visibility)
      const nucGrad = ctx.createRadialGradient(
        layout.nucleusX,
        layout.nucleusY,
        0,
        layout.nucleusX,
        layout.nucleusY,
        layout.nucleusRadius * 3
      );
      nucGrad.addColorStop(0, "rgba(255, 180, 90, 0.8)");
      nucGrad.addColorStop(0.3, "rgba(255, 180, 90, 0.3)");
      nucGrad.addColorStop(1, "rgba(255, 180, 90, 0)");
      ctx.fillStyle = nucGrad;
      ctx.beginPath();
      ctx.arc(layout.nucleusX, layout.nucleusY, layout.nucleusRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffb45a";
      ctx.beginPath();
      ctx.arc(layout.nucleusX, layout.nucleusY, layout.nucleusRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(168, 173, 189, 0.5)";
      ctx.font = "9px monospace";
      ctx.fillText("Au 核", layout.nucleusX, layout.nucleusY - 14);

      // Detection screen (right side)
      ctx.fillStyle = "rgba(15, 19, 32, 0.8)";
      ctx.fillRect(w * 0.88, h * 0.05, 6, h * 0.9);
      ctx.strokeStyle = "rgba(106, 208, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(w * 0.88, h * 0.05, 6, h * 0.9);

      // "Empty space" label
      ctx.fillStyle = "rgba(106, 208, 255, 0.3)";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("原子内部大部分是空的", w * 0.72, h * 0.12);
    },
    [getLayout]
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

    // Draw particle trails and particles
    for (const p of particlesRef.current) {
      if (p.trail.length > 1) {
        ctx.strokeStyle = p.scattered ? "rgba(255, 180, 90, 0.3)" : "rgba(106, 208, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.trail[0]!.x, p.trail[0]!.y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i]!.x, p.trail[i]!.y);
        }
        ctx.stroke();
      }

      if (p.active) {
        ctx.fillStyle = p.scattered ? "#ffb45a" : "#6ad0ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = p.scattered ? "#ffb45a" : "#6ad0ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }, [drawScene]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const layout = getLayout(w, h);

    // Spawn particles periodically
    if (Math.random() < 0.08) {
      particlesRef.current.push(spawnParticle(w, h));
      statsRef.current.total++;
    }

    // Update particles
    for (const p of particlesRef.current) {
      if (!p.active) continue;

      // Coulomb-like repulsion from nucleus
      const dx = p.x - layout.nucleusX;
      const dy = p.y - layout.nucleusY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = layout.nucleusRadius * 4;

      if (dist < minDist * 3 && dist > 0) {
        const force = 800 / (dist * dist);
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force;
        p.vy += Math.sin(angle) * force;

        if (dist < minDist) {
          p.scattered = true;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Record trail (sparse)
      if (p.trail.length === 0 || Math.abs(p.x - p.trail[p.trail.length - 1]!.x) > 5) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 100) p.trail.shift();
      }

      // Record pass-through or reflection
      if (p.x > layout.foilX + layout.foilW + 20 && !p.scattered) {
        if (statsRef.current.passed < statsRef.current.total) {
          statsRef.current.passed++;
        }
      }

      // Off screen
      if (p.x > w + 20 || p.x < -20 || p.y < -20 || p.y > h + 20) {
        p.active = false;
        if (p.scattered) {
          statsRef.current.scattered++;
          if (p.y < -10 || p.y > h + 10 || p.x < layout.foilX - 50) {
            statsRef.current.reflected++;
          }
        }
      }
    }

    // Clean up inactive particles in-place
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i]!.active) particles.splice(i, 1);
    }

    // Update stats periodically
    setStats({ ...statsRef.current });

    render();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, getLayout, spawnParticle, render]);

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

  const handleReset = () => {
    setIsPlaying(false);
    particlesRef.current = [];
    statsRef.current = { total: 0, passed: 0, scattered: 0, reflected: 0 };
    setStats({ total: 0, passed: 0, scattered: 0, reflected: 0 });
    render();
  };

  const scatterPercent =
    stats.total > 0 ? ((stats.scattered / stats.total) * 100).toFixed(1) : "0.0";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <canvas ref={canvasRef} role="img" aria-label="卢瑟福散射模拟" className="h-full w-full" />

        {/* Stats overlay */}
        <div className="bg-bg-panel/90 absolute top-3 left-3 rounded-lg p-3 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span className="text-fg-muted">发射总数</span>
            <span className="text-fg-primary font-mono">{stats.total}</span>
            <span className="text-fg-muted">穿过</span>
            <span className="text-accent-cool font-mono">{stats.passed}</span>
            <span className="text-fg-muted">偏转</span>
            <span className="text-accent-warm font-mono">{stats.scattered}</span>
            <span className="text-fg-muted">反弹</span>
            <span className="font-mono text-red-400">{stats.reflected}</span>
          </div>
        </div>

        {/* Scatter percentage */}
        <AnimatePresence>
          {stats.total > 20 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bg-panel/90 absolute right-3 bottom-3 rounded-lg p-3 backdrop-blur-sm"
            >
              <p className="text-fg-muted text-xs">偏转率</p>
              <p className="text-accent-warm font-mono text-lg">{scatterPercent}%</p>
              <p className="text-fg-muted text-[10px]">（实际约 0.01%）</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
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
          {isPlaying ? "暂停" : "发射α粒子"}
        </button>
        <button
          onClick={handleReset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        <div className="text-fg-secondary flex items-center gap-2 text-xs">
          <span className="bg-accent-cool h-2 w-2 rounded-full" />
          未偏转粒子
        </div>
        <div className="text-fg-secondary flex items-center gap-2 text-xs">
          <span className="bg-accent-warm h-2 w-2 rounded-full" />
          偏转粒子
        </div>
        <div className="text-fg-secondary flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          反弹粒子
        </div>
      </div>

      {/* Key finding */}
      <div className="border-accent-warm/20 bg-accent-warm/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs">
          <span className="text-accent-warm font-medium">卢瑟福的震惊：</span>
          绝大多数α粒子直接穿过金箔，但极少数被大角度反弹。 卢瑟福说：&ldquo;这就像你用 15
          英寸的炮弹射击一张薄纸，炮弹却反弹回来打中了你。&rdquo;
          这证明了原子内部大部分是空的，正电荷和质量集中在极小的原子核中。
        </p>
      </div>
    </div>
  );
}
