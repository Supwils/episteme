"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { TORSION, torsionResponse } from "./classic-experiment-models";
import { useExperimentCanvas } from "./use-experiment-canvas";

type Point = { x: number; y: number };
function drawMass(ctx: CanvasRenderingContext2D, point: Point, radius: number, large: boolean) {
  const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
  gradient.addColorStop(0, large ? "#ffb45a" : "#6ad0ff");
  gradient.addColorStop(1, large ? "#a8651c" : "#1f5fa8");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "#ecf0ff";
  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(large ? "M" : "m", point.x, point.y + 4);
}
function drawForce(ctx: CanvasRenderingContext2D, from: Point, toward: Point) {
  const angle = Math.atan2(toward.y - from.y, toward.x - from.x);
  const end = { x: from.x + (toward.x - from.x) * 0.75, y: from.y + (toward.y - from.y) * 0.75 };
  ctx.strokeStyle = "rgba(255,180,90,.65)";
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(end.x - 5 * Math.cos(angle - 0.5), end.y - 5 * Math.sin(angle - 0.5));
  ctx.lineTo(end.x - 5 * Math.cos(angle + 0.5), end.y - 5 * Math.sin(angle + 0.5));
  ctx.fill();
}
function drawBalance(ctx: CanvasRenderingContext2D, w: number, h: number, seconds: number) {
  const { angle } = torsionResponse(seconds);
  const visualAngle = angle * TORSION.visualGain;
  const center = { x: w * 0.5, y: h * 0.48 };
  const arm = w * 0.22;
  const approach = Math.min(1, seconds / TORSION.approachSeconds);
  const offset = h * 0.35 * (1 - approach) + arm * 0.5 * approach;
  ctx.fillStyle = "#060814";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(168,173,189,.4)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(center.x - arm, center.y);
  ctx.lineTo(center.x + arm, center.y);
  ctx.stroke();
  ctx.setLineDash([]);
  const small = [-1, 1].map((sign) => ({
    x: center.x + sign * arm * Math.cos(visualAngle),
    y: center.y + sign * arm * Math.sin(visualAngle),
  }));
  const large = [-1, 1].map((sign) => ({ x: center.x + sign * arm, y: center.y + sign * offset }));
  ctx.strokeStyle = "#a8adbd";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(small[0]!.x, small[0]!.y);
  ctx.lineTo(small[1]!.x, small[1]!.y);
  ctx.stroke();
  for (let i = 0; i < 2; i++) {
    if (seconds >= TORSION.approachSeconds) drawForce(ctx, small[i]!, large[i]!);
    drawMass(ctx, large[i]!, Math.min(18, w * 0.05), true);
    drawMass(ctx, small[i]!, Math.min(10, w * 0.026), false);
  }
  ctx.fillStyle = "#ecf0ff";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 3, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "#b4bdcc";
  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("俯视 · 悬丝垂直于图面", center.x, h * 0.08);
  ctx.fillText("引力矩与悬丝回复力矩平衡", center.x, h * 0.94);
  ctx.fillStyle = "#ffb45a";
  ctx.fillText(`图示偏角 ${((visualAngle * 180) / Math.PI).toFixed(2)}°`, center.x, h * 0.8);
}

export function CavendishExperiment({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const clock = useRef(0);
  const uiClock = useRef(0);
  const reduceMotion = useExperimentReducedMotion();
  const pause = useCallback(() => setIsPlaying(false), []);
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => drawBalance(ctx, w, h, clock.current),
    []
  );
  const step = useCallback((seconds: number) => {
    clock.current = Math.min(TORSION.endSeconds, clock.current + seconds);
    uiClock.current += seconds;
    const finished = clock.current >= TORSION.endSeconds;
    if (uiClock.current >= 0.1 || finished) {
      setElapsed(clock.current);
      uiClock.current = 0;
    }
    return !finished;
  }, []);
  const { canvasRef, render, stop } = useExperimentCanvas(draw, step, isPlaying, pause);
  useEffect(() => {
    if (reduceMotion) {
      stop();
      pause();
      setElapsed(clock.current);
    }
  }, [reduceMotion, pause, stop]);
  const reset = () => {
    stop();
    pause();
    clock.current = 0;
    uiClock.current = 0;
    setElapsed(0);
    render();
  };
  const start = () => {
    if (reduceMotion) {
      clock.current = TORSION.endSeconds;
      setElapsed(clock.current);
      render();
      return;
    }
    if (clock.current >= TORSION.endSeconds) {
      clock.current = 0;
      setElapsed(0);
    }
    setIsPlaying(true);
  };
  const phase =
    elapsed < TORSION.approachSeconds
      ? "放置大球"
      : elapsed < TORSION.endSeconds
        ? "引力矩驱动扭转"
        : "接近示意平衡";
  const degrees = (torsionResponse(elapsed).angle * 180) / Math.PI;
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-bg-panel rounded-lg p-2">
          <p className="text-fg-secondary">{phase}</p>
          <p className="text-fg-muted mt-1">演示时间 {elapsed.toFixed(1)}s</p>
        </div>
        <div className="bg-bg-panel rounded-lg p-2">
          <p className="text-fg-muted">模型实际偏角</p>
          <p className="text-accent-warm mt-1 font-mono">{degrees.toFixed(5)}°</p>
        </div>
      </div>
      <div className="border-fg-disabled/30 bg-bg-deep aspect-[4/3] w-full overflow-hidden rounded-xl border">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="扭秤俯视示意，两侧大球产生同向引力矩；偏角放大1000倍"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={
            isPlaying
              ? () => {
                  stop();
                  pause();
                  setElapsed(clock.current);
                }
              : start
          }
          aria-pressed={isPlaying}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying
            ? "暂停"
            : reduceMotion
              ? "显示平衡示意"
              : elapsed >= TORSION.endSeconds
                ? "重新演示"
                : elapsed > 0
                  ? "继续"
                  : "放置大铅球"}
        </button>
        <button
          onClick={reset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>
      <p className="text-fg-muted text-xs">
        蓝球m、金球M；偏角在图中放大1000倍，动力过程按20倍速播放。球大小和放置过程为示意。
      </p>
      <div className="border-accent-warm/20 bg-accent-warm/5 text-fg-secondary rounded-lg border p-3 text-xs">
        <p className="font-mono">Iθ¨ + cθ˙ + κθ = τ_g；平衡时 κθ = τ_g</p>
        <p className="mt-2">
          示例取m=20g、M=1.5kg、半臂长L=0.10m、近邻球心距r=0.05m、κ=1.1×10⁻⁶N·m/rad。小角度下用近乎垂直的配对力给τ_g≈2LGMm/r²，忽略远端交叉吸引和杆的惯量；放置阶段固定扭杆，随后释放并近似取恒定引力矩；采用c=2√(Iκ)的临界阻尼响应。它用于说明测量原理，未复刻1798装置的完整修正。
        </p>
        <p className="mt-2">
          G输入参考值为6.67430×10⁻¹¹N·m²/kg²（CODATA2022），并非从本动画的数据独立测得。真实实验还须校准扭转刚度、距离和质量，并控制空气流动、温度及其他系统误差。
        </p>
        <p className="mt-2">
          Cavendish1798年报告的是地球平均密度。用现代记号，扭秤方法也能确定G；不应把今天的G参考数值写成他当年的直接报告。
        </p>
        <div className="text-accent-cool mt-2 flex flex-wrap gap-3 underline">
          <a href="https://makingscience.royalsociety.org/items/l-and-p_11_68/paper-experiments-to-determine-the-density-of-the-earth-by-henry-cavendish">
            1798原稿与出版记录
          </a>
          <a href="https://physics.nist.gov/cuu/Constants/">NIST · CODATA常数</a>
        </div>
      </div>
    </div>
  );
}
