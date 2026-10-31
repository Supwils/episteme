"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/subjects/physics/lib/cn";
import { useExperimentCanvas } from "./use-experiment-canvas";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";

const NUM_PENDULUMS = 15;
const REPEAT_SECONDS = 30;
const FASTEST_CYCLES = 30;
const AMPLITUDE = 0.16; // Small-angle model, about nine degrees.
const GRAVITY = 9.81;
const PENDULUMS = Array.from({ length: NUM_PENDULUMS }, (_, index) => {
  const cycles = FASTEST_CYCLES - index;
  const period = REPEAT_SECONDS / cycles;
  return { period, length: GRAVITY * (period / (2 * Math.PI)) ** 2 };
});
const MAX_LENGTH = PENDULUMS[NUM_PENDULUMS - 1]!.length;

export function PendulumWave({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timeRef = useRef(0);
  const uiClock = useRef(0);
  const reducedMotion = useExperimentReducedMotion();
  const pause = useCallback(() => setIsPlaying(false), []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    if (w <= 0 || h <= 0) return;
    const t = timeRef.current;
    const pivotY = h * 0.1;
    const maxLen = h * 0.7;
    const bobRadius = Math.max(3, Math.min(9, w / 48));
    const margin = maxLen * Math.sin(AMPLITUDE) + bobRadius + 5;
    const spacing = Math.max(0, w - 2 * margin) / (NUM_PENDULUMS - 1);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#060814");
    grad.addColorStop(1, "#0f1320");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#3a3e4a";
    ctx.fillRect(5, pivotY - 2, w - 10, 4);

    for (let i = 0; i < NUM_PENDULUMS; i++) {
      const { period, length } = PENDULUMS[i]!;
      const pivotX = margin + spacing * i;
      const len = maxLen * (length / MAX_LENGTH);
      // Same displaced angle and zero initial angular velocity: release from rest.
      const angle = AMPLITUDE * Math.cos((2 * Math.PI * t) / period);
      const bobX = pivotX + len * Math.sin(angle);
      const bobY = pivotY + len * Math.cos(angle);
      const hue = 190 + (i / (NUM_PENDULUMS - 1)) * 50;

      ctx.strokeStyle = `hsla(${hue}, 60%, 70%, 0.6)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();
      ctx.fillStyle = "#777";
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 2, 0, Math.PI * 2);
      ctx.fill();
      const bobGrad = ctx.createRadialGradient(
        bobX - bobRadius * 0.2,
        bobY - bobRadius * 0.2,
        0,
        bobX,
        bobY,
        bobRadius
      );
      bobGrad.addColorStop(0, `hsl(${hue}, 80%, 65%)`);
      bobGrad.addColorStop(1, `hsl(${hue}, 70%, 35%)`);
      ctx.fillStyle = bobGrad;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(168, 173, 189, 0.8)";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    for (const i of [0, 7, 14]) {
      ctx.fillText(`T=${PENDULUMS[i]!.period.toFixed(2)}s`, margin + spacing * i, h - 8);
    }
  }, []);

  const step = useCallback((seconds: number) => {
    timeRef.current += seconds;
    uiClock.current += seconds;
    if (uiClock.current >= 0.1) {
      setElapsed(timeRef.current);
      uiClock.current = 0;
    }
    return true;
  }, []);
  const { canvasRef, render, stop } = useExperimentCanvas(draw, step, isPlaying, pause);
  useEffect(() => {
    if (reducedMotion) {
      stop();
      pause();
    }
  }, [reducedMotion, stop, pause]);

  const toggle = () => {
    if (isPlaying) {
      stop();
      pause();
      setElapsed(timeRef.current);
      return;
    }
    if (reducedMotion) {
      step(0.25);
      setElapsed(timeRef.current);
      render();
    } else setIsPlaying(true);
  };
  const reset = () => {
    stop();
    pause();
    timeRef.current = 0;
    uiClock.current = 0;
    setElapsed(0);
    render();
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="十五个独立小角度单摆，摆长与周期平方成正比，30秒重现初始队形"
          className="h-full w-full"
        />
      </div>
      <p className="text-accent-cool font-mono text-xs" aria-live={isPlaying ? "off" : "polite"}>
        时间：{elapsed.toFixed(1)} s · 队形重现周期：{REPEAT_SECONDS} s
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={toggle}
          aria-pressed={isPlaying}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying
            ? "暂停"
            : reducedMotion
              ? "推进0.25秒"
              : elapsed > 0
                ? "继续摆动"
                : "释放摆球"}
        </button>
        <button
          onClick={reset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>
      <div className="border-accent-cool/20 bg-accent-cool/5 text-fg-secondary rounded-lg border p-3 text-xs leading-relaxed">
        <p>
          小角度、无阻尼单摆：T=2π√(L/g)，g=9.81
          m/s²。摆长按L=g(T/2π)²设置，统一缩放到画面；从同一小角度静止释放。
        </p>
        <p className="mt-2">
          十五个摆在30秒内分别完成30、29……16次振荡，因此30秒后全部重现初始相位。它们互不耦合，波状队形来自相位差；这是预设周期的重现，不是能量沿摆列传播或摆之间自动同步。
        </p>
        <a
          href="https://sciencedemonstrations.fas.harvard.edu/presentations/pendulum-waves"
          target="_blank"
          rel="noreferrer"
          className="text-accent-cool mt-2 inline-block underline"
        >
          Harvard摆波装置与整数周期设计
        </a>
      </div>
    </div>
  );
}
