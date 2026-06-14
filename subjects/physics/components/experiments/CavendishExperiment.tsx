"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/subjects/physics/lib/cn";

export function CavendishExperiment({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wireTwist, setWireTwist] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState<"approaching" | "attracting" | "measured">("approaching");
  const startTimeRef = useRef(0);
  const twistRef = useRef(0);
  const largeAngleRef = useRef(0);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const getLayout = useCallback((w: number, h: number) => {
    const centerX = w * 0.5;
    const centerY = h * 0.35;
    const armLength = w * 0.18;
    const smallMassR = 12;
    const largeMassR = 20;
    const largeMassDist = w * 0.28;

    return {
      centerX,
      centerY,
      armLength,
      smallMassR,
      largeMassR,
      largeMassDist,
      wireTop: h * 0.05,
    };
  }, []);

  const drawWire = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, twist: number) => {
      const layout = getLayout(w, h);

      // Wire from ceiling
      ctx.strokeStyle = "rgba(168, 173, 189, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(layout.centerX, layout.wireTop);
      ctx.lineTo(layout.centerX, layout.centerY);
      ctx.stroke();

      // Wire label
      ctx.fillStyle = "rgba(168, 173, 189, 0.5)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.fillText("细金属丝", layout.centerX + 8, layout.wireTop + 20);
    },
    [getLayout]
  );

  const drawArm = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, twist: number) => {
      const layout = getLayout(w, h);
      const twistRad = (twist * Math.PI) / 180;

      // Arm
      ctx.save();
      ctx.translate(layout.centerX, layout.centerY);
      ctx.rotate(twistRad);

      ctx.strokeStyle = "rgba(168, 173, 189, 0.7)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-layout.armLength, 0);
      ctx.lineTo(layout.armLength, 0);
      ctx.stroke();

      // Small masses (on arm ends)
      const smallGrad1 = ctx.createRadialGradient(
        -layout.armLength,
        0,
        0,
        -layout.armLength,
        0,
        layout.smallMassR
      );
      smallGrad1.addColorStop(0, "#6ad0ff");
      smallGrad1.addColorStop(1, "#1f5fa8");
      ctx.fillStyle = smallGrad1;
      ctx.beginPath();
      ctx.arc(-layout.armLength, 0, layout.smallMassR, 0, Math.PI * 2);
      ctx.fill();

      const smallGrad2 = ctx.createRadialGradient(
        layout.armLength,
        0,
        0,
        layout.armLength,
        0,
        layout.smallMassR
      );
      smallGrad2.addColorStop(0, "#6ad0ff");
      smallGrad2.addColorStop(1, "#1f5fa8");
      ctx.fillStyle = smallGrad2;
      ctx.beginPath();
      ctx.arc(layout.armLength, 0, layout.smallMassR, 0, Math.PI * 2);
      ctx.fill();

      // Small mass labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.fillText("m", -layout.armLength, layout.smallMassR + 12);
      ctx.fillText("m", layout.armLength, layout.smallMassR + 12);

      ctx.restore();
    },
    [getLayout]
  );

  const drawLargeMasses = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, angle: number) => {
      const layout = getLayout(w, h);
      const angleRad = (angle * Math.PI) / 180;

      // Large masses (positioned to attract small masses)
      const lm1X = layout.centerX - layout.largeMassDist * Math.cos(angleRad);
      const lm1Y = layout.centerY + layout.largeMassDist * Math.sin(angleRad) * 0.3;
      const lm2X = layout.centerX + layout.largeMassDist * Math.cos(angleRad);
      const lm2Y = layout.centerY + layout.largeMassDist * Math.sin(angleRad) * 0.3;

      const drawMass = (x: number, y: number) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, layout.largeMassR);
        grad.addColorStop(0, "#ffb45a");
        grad.addColorStop(1, "#a8651c");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, layout.largeMassR, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("M", x, y + 4);
      };

      drawMass(lm1X, lm1Y);
      drawMass(lm2X, lm2Y);

      // Gravitational attraction arrows
      if (isPlaying && phase === "attracting") {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 180, 90, 0.3)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        // Arrow from large mass toward small mass
        const smallLeft =
          layout.centerX - layout.armLength * Math.cos((twistRef.current * Math.PI) / 180);
        const smallTop =
          layout.centerY + layout.armLength * Math.sin((twistRef.current * Math.PI) / 180) * 0.3;

        ctx.beginPath();
        ctx.moveTo(lm1X, lm1Y);
        ctx.lineTo(smallLeft, smallTop);
        ctx.stroke();

        const smallRight =
          layout.centerX + layout.armLength * Math.cos((twistRef.current * Math.PI) / 180);
        const smallBottom =
          layout.centerY - layout.armLength * Math.sin((twistRef.current * Math.PI) / 180) * 0.3;

        ctx.beginPath();
        ctx.moveTo(lm2X, lm2Y);
        ctx.lineTo(smallRight, smallBottom);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();
      }

      // Labels
      ctx.fillStyle = "rgba(168, 173, 189, 0.5)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("大铅球", lm1X, lm1Y + layout.largeMassR + 14);
      ctx.fillText("大铅球", lm2X, lm2Y + layout.largeMassR + 14);
    },
    [getLayout, isPlaying, phase]
  );

  const drawAngleScale = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, twist: number) => {
      const layout = getLayout(w, h);

      // Angle scale around the wire attachment point
      const scaleR = 30;
      ctx.strokeStyle = "rgba(168, 173, 189, 0.2)";
      ctx.lineWidth = 1;

      // Arc
      ctx.beginPath();
      ctx.arc(layout.centerX, layout.centerY, scaleR, -Math.PI * 0.8, Math.PI * 0.8);
      ctx.stroke();

      // Tick marks
      for (let deg = -30; deg <= 30; deg += 10) {
        const rad = (deg * Math.PI) / 180;
        const inner = scaleR - 4;
        const outer = scaleR + 4;
        ctx.beginPath();
        ctx.moveTo(
          layout.centerX + Math.cos(rad - Math.PI / 2) * inner,
          layout.centerY + Math.sin(rad - Math.PI / 2) * inner
        );
        ctx.lineTo(
          layout.centerX + Math.cos(rad - Math.PI / 2) * outer,
          layout.centerY + Math.sin(rad - Math.PI / 2) * outer
        );
        ctx.stroke();
      }

      // Current angle indicator
      const twistRad = (twist * Math.PI) / 180;
      ctx.fillStyle = "#ffb45a";
      ctx.beginPath();
      ctx.arc(
        layout.centerX + Math.cos(twistRad - Math.PI / 2) * scaleR,
        layout.centerY + Math.sin(twistRad - Math.PI / 2) * scaleR,
        3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Angle readout
      ctx.fillStyle = "#ffb45a";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`θ = ${twist.toFixed(4)}°`, layout.centerX, layout.centerY + 50);
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

    drawWire(ctx, w, h, twistRef.current);
    drawArm(ctx, w, h, twistRef.current);
    drawLargeMasses(ctx, w, h, largeAngleRef.current);
    drawAngleScale(ctx, w, h, twistRef.current);
  }, [drawWire, drawArm, drawLargeMasses, drawAngleScale]);

  const animate = useCallback(() => {
    const now = Date.now();
    const dt = (now - startTimeRef.current) / 1000;
    setElapsed(dt);

    // Very slow, delicate motion
    // Phase 1: Large masses approach (0-3s)
    // Phase 2: Gravitational attraction causes twist (3-15s)
    // Phase 3: Equilibrium / measurement (15s+)

    if (dt < 3) {
      // Approaching phase
      largeAngleRef.current = 45 * (1 - dt / 3);
      setPhase("approaching");
    } else if (dt < 15) {
      // Attraction phase - slow exponential approach
      largeAngleRef.current = 0;
      const t = dt - 3;
      const maxTwist = 0.15; // Very small angle (realistic)
      const tau = 4; // Time constant
      twistRef.current = maxTwist * (1 - Math.exp(-t / tau));
      setPhase("attracting");
    } else {
      // Measured
      largeAngleRef.current = 0;
      twistRef.current = 0.15 * (1 - Math.exp(-12 / 4));
      setPhase("measured");
    }

    setWireTwist(twistRef.current);

    render();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, render]);

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
      startTimeRef.current = Date.now();
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handleStart = () => {
    if (prefersReducedMotion.current) {
      largeAngleRef.current = 0;
      twistRef.current = 0.15 * (1 - Math.exp(-12 / 4));
      setWireTwist(twistRef.current);
      setPhase("measured");
      render();
      return;
    }
    twistRef.current = 0;
    largeAngleRef.current = 45;
    setWireTwist(0);
    setElapsed(0);
    setPhase("approaching");
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    twistRef.current = 0;
    largeAngleRef.current = 0;
    setWireTwist(0);
    setElapsed(0);
    setPhase("approaching");
    render();
  };

  const phaseLabels = {
    approaching: "大铅球正在靠近...",
    attracting: "引力使细丝扭转...",
    measured: "测量完成！",
  };

  const phaseColors = {
    approaching: "text-fg-secondary",
    attracting: "text-accent-cool",
    measured: "text-accent-warm",
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep relative aspect-[4/3] w-full overflow-hidden rounded-xl border">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="卡文迪许扭秤实验模拟"
          className="h-full w-full"
        />

        {/* Phase indicator */}
        <div className="bg-bg-panel/90 absolute top-3 left-3 rounded-lg px-3 py-2 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <p className={cn("text-xs font-medium", phaseColors[phase])}>{phaseLabels[phase]}</p>
              <p className="text-fg-muted mt-1 text-[10px]">时间: {elapsed.toFixed(1)}s</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Measurement readout */}
        <div className="bg-bg-panel/90 absolute top-3 right-3 rounded-lg p-3 backdrop-blur-sm">
          <div className="space-y-1">
            <div>
              <span className="text-fg-muted text-[10px]">细丝扭转角</span>
              <p className="text-accent-warm font-mono text-sm">
                {(wireTwist * 1000).toFixed(2)} × 10⁻³ °
              </p>
            </div>
            <div>
              <span className="text-fg-muted text-[10px]">引力常数 G</span>
              <p className="text-accent-cool font-mono text-sm">6.674 × 10⁻¹¹</p>
              <p className="text-fg-muted text-[10px]">N·m²/kg²</p>
            </div>
          </div>
        </div>

        {/* Scale note */}
        <div className="bg-bg-panel/90 absolute bottom-3 left-3 rounded-lg px-3 py-2 backdrop-blur-sm">
          <p className="text-fg-muted text-[10px]">扭转角度已放大 1000 倍以便观察</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handleStart}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying ? "暂停" : "放置大铅球"}
        </button>
        <button
          onClick={handleReset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>

      {/* Experiment diagram legend */}
      <div className="flex flex-wrap gap-4">
        <div className="text-fg-secondary flex items-center gap-2 text-xs">
          <span className="bg-accent-cool h-3 w-3 rounded-full" />
          小铅球 (m)
        </div>
        <div className="text-fg-secondary flex items-center gap-2 text-xs">
          <span className="bg-accent-warm h-3 w-3 rounded-full" />
          大铅球 (M)
        </div>
        <div className="text-fg-secondary flex items-center gap-2 text-xs">
          <span className="bg-fg-muted inline-block h-px w-4" />
          细金属丝
        </div>
      </div>

      {/* Key finding */}
      <div className="border-accent-warm/20 bg-accent-warm/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs">
          <span className="text-accent-warm font-medium">卡文迪什的贡献：</span>
          1798年，卡文迪什通过极其精密的扭秤实验，首次测量了两个已知质量之间的引力，
          从而计算出万有引力常数 G。这使得地球质量、太阳质量等都可以被精确计算。
          卡文迪什称这个实验为&apos;称量地球&apos;。整个过程极其缓慢和精密，细丝的扭转角只有零点几度。
        </p>
      </div>
    </div>
  );
}
