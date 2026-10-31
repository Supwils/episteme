"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { cssCanvasSize, fitCanvasToDisplay } from "./canvas-size";

const NUM_PARTICLES = 300;
const JET_PARTICLES = 40;

type Particle = {
  r: number;
  theta: number;
  dr: number;
  dtheta: number;
  size: number;
  brightness: number;
  hue: number;
};

type JetParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

export function BlackHoleAccretion({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showJet, setShowJet] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const jetRef = useRef<JetParticle[]>([]);
  const timeRef = useRef(0);

  const prefersReducedMotion = useExperimentReducedMotion();

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const r = 30 + Math.random() * Math.min(w, h) * 0.35;
      particles.push({
        r,
        theta: Math.random() * Math.PI * 2,
        dr: -0.05 - Math.random() * 0.15,
        dtheta: (0.3 + Math.random() * 0.5) / Math.max(r, 30),
        size: 1 + Math.random() * 2.5,
        brightness: 0.4 + Math.random() * 0.6,
        hue: 15 + Math.random() * 30,
      });
    }
    particlesRef.current = particles;

    const jets: JetParticle[] = [];
    for (let i = 0; i < JET_PARTICLES; i++) {
      jets.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -3 - Math.random() * 4,
        life: Math.random(),
        maxLife: 1,
        size: 1 + Math.random() * 2,
      });
    }
    jetRef.current = jets;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = cssCanvasSize(canvas);
    const cx = w * 0.5;
    const cy = h * 0.5;
    const bhRadius = Math.min(w, h) * 0.06;

    ctx.clearRect(0, 0, w, h);

    // Background
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
    bgGrad.addColorStop(0, "#0a0612");
    bgGrad.addColorStop(1, "#060814");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Background stars
    if (timeRef.current === 0) {
      for (let i = 0; i < 80; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        const sa = 0.2 + Math.random() * 0.4;
        ctx.fillStyle = `rgba(200, 210, 240, ${sa})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.5 + Math.random(), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Accretion disk glow
    const glowR = bhRadius * 4;
    const diskGlow = ctx.createRadialGradient(cx, cy, bhRadius, cx, cy, glowR);
    diskGlow.addColorStop(0, "rgba(255, 140, 50, 0.3)");
    diskGlow.addColorStop(0.5, "rgba(255, 80, 30, 0.1)");
    diskGlow.addColorStop(1, "transparent");
    ctx.fillStyle = diskGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Draw accretion disk particles
    for (const p of particlesRef.current) {
      if (p.r < bhRadius * 0.9) continue;

      const x = cx + p.r * Math.cos(p.theta);
      const y = cy + p.r * Math.sin(p.theta) * 0.4; // Perspective tilt

      // False color emphasizes the inner flow; it does not encode temperature.
      const tempFactor = Math.max(0, 1 - (p.r - bhRadius) / (Math.min(w, h) * 0.3));
      const hue = p.hue - tempFactor * 30;
      const lightness = 50 + tempFactor * 25;

      const alpha = p.brightness * Math.min(1, (p.r - bhRadius * 0.5) / (bhRadius * 2));

      ctx.fillStyle = `hsla(${Math.max(0, hue)}, 90%, ${lightness}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Hot inner edge glow
      if (tempFactor > 0.7) {
        ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Relativistic jets
    if (showJet) {
      for (const j of jetRef.current) {
        const progress = j.life / j.maxLife;
        const jetLen = Math.min(w, h) * 0.35;
        const px = cx + j.x;
        const py = cy + j.y - progress * jetLen;
        const alpha = (1 - progress) * 0.6;

        ctx.fillStyle = `hsla(210, 80%, 75%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, j.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Mirror jet (bottom)
        const py2 = cy - j.y + progress * jetLen;
        ctx.fillStyle = `hsla(210, 80%, 75%, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py2, j.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // The central mask locates the black hole, rather than predicting its image.
    const bhGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, bhRadius);
    bhGrad.addColorStop(0, "#000000");
    bhGrad.addColorStop(0.8, "#000000");
    bhGrad.addColorStop(1, "rgba(0, 0, 0, 0.9)");
    ctx.fillStyle = bhGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, bhRadius, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = "rgba(168, 173, 189, 0.9)";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("黑洞位置（示意）", cx + bhRadius * 2 + 5, cy + bhRadius * 3 + 8);
    ctx.strokeStyle = "rgba(168, 173, 189, 0.6)";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(cx + bhRadius, cy);
    ctx.lineTo(cx + bhRadius * 2, cy + bhRadius * 3);
    ctx.stroke();
    ctx.fillText("吸积盘", cx - h * 0.35, cy - h * 0.2);

    if (showJet) {
      ctx.textAlign = "center";
      ctx.fillText("相对论性喷流", cx, cy - Math.min(w, h) * 0.35 - 8);
      ctx.fillText("相对论性喷流", cx, cy + Math.min(w, h) * 0.35 + 16);
    }
  }, [showJet]);

  const animate = useCallback(() => {
    timeRef.current += 1;

    // Update disk particles
    for (const p of particlesRef.current) {
      p.theta += p.dtheta;
      p.r += p.dr;

      // Re-spawn when absorbed
      if (p.r < 20) {
        const canvas = canvasRef.current;
        const { w, h } = canvas ? cssCanvasSize(canvas) : { w: 800, h: 600 };
        const maxR = Math.min(w, h) * 0.4;
        p.r = 30 + Math.random() * maxR;
        p.theta = Math.random() * Math.PI * 2;
        p.dr = -0.05 - Math.random() * 0.15;
        p.dtheta = (0.3 + Math.random() * 0.5) / Math.max(p.r, 30);
      }

      if (p.r < 80) {
        p.dtheta *= 1.002;
        p.brightness = Math.min(1, p.brightness + 0.005);
      }
    }

    // Update jet particles
    if (showJet) {
      for (const j of jetRef.current) {
        j.life += 0.008;
        j.x += j.vx;
        j.y += j.vy;

        if (j.life >= j.maxLife) {
          j.x = (Math.random() - 0.5) * 8;
          j.y = 0;
          j.vx = (Math.random() - 0.5) * 1.5;
          j.vy = -3 - Math.random() * 4;
          j.life = 0;
          j.maxLife = 0.6 + Math.random() * 0.4;
        }
      }
    }

    render();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, render, showJet]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    fitCanvasToDisplay(canvas);

    const { w, h } = cssCanvasSize(canvas);
    initParticles(w, h);
    render();
  }, [render, initParticles]);

  useEffect(() => {
    if (prefersReducedMotion) setIsPlaying(false);
    else if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate, prefersReducedMotion]);

  const handleStart = () => {
    if (prefersReducedMotion) {
      render();
      return;
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const { w, h } = cssCanvasSize(canvas);
      initParticles(w, h);
    }
    timeRef.current = 0;
    render();
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep w-full overflow-hidden rounded-xl border">
        <div className="border-fg-disabled/30 flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
          <p className="text-accent-warm font-mono text-xs">黑洞吸积盘</p>
          <p className="text-fg-muted text-[10px]">{NUM_PARTICLES} 粒子形态示意</p>
        </div>
        <div className="aspect-[16/9] w-full">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="吸积盘与可选喷流的形态示意"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handleStart}
          className="bg-accent-warm/20 text-accent-warm hover:bg-accent-warm/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying ? "暂停" : "开始演示"}
        </button>
        <button
          onClick={() => setShowJet(!showJet)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm transition-colors",
            showJet
              ? "bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30"
              : "bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30"
          )}
        >
          {showJet ? "隐藏喷流" : "显示喷流"}
        </button>
        <button
          onClick={handleReset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>

      <div className="border-accent-warm/20 bg-accent-warm/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs">
          <span className="text-accent-warm font-medium">黑洞与吸积盘：</span>
          带有足够角动量的气体可以形成吸积盘；盘内应力或盘风把角动量向外传递后，气体才能持续向内流动。
          不同系统的辐射可覆盖多个波段。部分系统在视界外形成接近光速的喷流，磁场在其中起重要作用；
          喷流中的物质没有从事件视界内部逃出。
        </p>
        <p className="text-fg-muted mt-2 text-xs">
          本图仅演示形态与流动方向。颜色、速度和尺度均为示意，未计算相对论光线传播，不能用来读取视界、阴影或光子环的大小。
          <a
            href="https://science.nasa.gov/universe/black-holes/anatomy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cool ml-1 underline underline-offset-2"
          >
            NASA：黑洞结构
          </a>
          {" · "}
          <a
            href="https://doi.org/10.1038/nature04912"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cool underline underline-offset-2"
          >
            角动量输运研究
          </a>
        </p>
      </div>
    </div>
  );
}
