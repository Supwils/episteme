"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";
import { cn } from "@/subjects/physics/lib/cn";
import {
  RUTHERFORD,
  rutherfordPath,
  scatteringClass,
  type ScatteringPath,
} from "./classic-experiment-models";
import { useExperimentCanvas } from "./use-experiment-canvas";

type Counts = { total: number; passed: number; scattered: number; reflected: number };
type Particle = { path: ScatteringPath; impact: number; age: number; counted: boolean };
const emptyCounts = (): Counts => ({ total: 0, passed: 0, scattered: 0, reflected: 0 });
const colors = { passed: "#6ad0ff", scattered: "#ffb45a", reflected: "#ff7b7b" };

function drawApparatus(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#060814";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,180,90,.12)";
  ctx.fillRect(w * 0.575, h * 0.08, w * 0.03, h * 0.84);
  ctx.fillStyle = "#6ad0ff";
  ctx.fillRect(w * 0.035, h * 0.15, w * 0.025, h * 0.7);
  ctx.fillStyle = "#ffb45a";
  ctx.beginPath();
  ctx.arc(w * 0.59, h * 0.5, 3, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#b4bdcc";
  ctx.fillText("平行入射α粒子", w * 0.26, h * 0.08);
  ctx.fillText("Au核（放大）", w * 0.59, h * 0.95);
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, w: number, h: number) {
  const points = p.path.points;
  const first = points[0];
  if (!first) return;
  ctx.strokeStyle = colors[scatteringClass(p.impact)];
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(first.x * w, first.y * h);
  let last = first;
  for (let i = 1; i < points.length; i++) {
    const next = points[i]!;
    if (next.time > p.age) {
      const fraction = Math.max(0, (p.age - last.time) / (next.time - last.time));
      last = {
        x: last.x + fraction * (next.x - last.x),
        y: last.y + fraction * (next.y - last.y),
        time: p.age,
      };
      ctx.lineTo(last.x * w, last.y * h);
      break;
    }
    last = next;
    ctx.lineTo(last.x * w, last.y * h);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(last.x * w, last.y * h, 2.5, 0, 2 * Math.PI);
  ctx.fill();
}

export function RutherfordScattering({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState<Counts>(emptyCounts);
  const reduceMotion = useExperimentReducedMotion();
  const particles = useRef<Particle[]>([]);
  const counts = useRef(emptyCounts());
  const aspect = useRef(16 / 9);
  const spawnClock = useRef(0);
  const uiClock = useRef(0);
  const pause = useCallback(() => setIsPlaying(false), []);
  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    aspect.current = w / h;
    drawApparatus(ctx, w, h);
    for (const particle of particles.current) drawParticle(ctx, particle, w, h);
  }, []);
  const step = useCallback((seconds: number) => {
    spawnClock.current += seconds;
    while (spawnClock.current >= 0.25) {
      spawnClock.current -= 0.25;
      const impact = ((Math.random() - 0.5) * RUTHERFORD.widthFm * 0.68) / aspect.current;
      particles.current.push({
        path: rutherfordPath(impact, aspect.current),
        impact,
        age: 0,
        counted: false,
      });
      counts.current.total++;
    }
    for (const particle of particles.current) {
      particle.age += seconds;
      if (!particle.counted && particle.age >= particle.path.duration) {
        counts.current[scatteringClass(particle.impact)]++;
        particle.counted = true;
      }
    }
    particles.current = particles.current.filter((p) => p.age <= p.path.duration + 1);
    uiClock.current += seconds;
    if (uiClock.current >= 0.1) {
      setStats({ ...counts.current });
      uiClock.current = 0;
    }
    return true;
  }, []);
  const { canvasRef, render, stop } = useExperimentCanvas(draw, step, isPlaying, pause);
  useEffect(() => {
    if (reduceMotion) {
      stop();
      pause();
      setStats({ ...counts.current });
    }
  }, [reduceMotion, pause, stop]);

  const reset = () => {
    stop();
    pause();
    particles.current = [];
    counts.current = emptyCounts();
    spawnClock.current = 0;
    uiClock.current = 0;
    setStats(emptyCounts());
    render();
  };
  const start = () => {
    if (!reduceMotion) {
      setIsPlaying(true);
      return;
    }
    const impacts = [-1000, -300, -10, 0, 10, 300, 1000, 1500];
    counts.current = emptyCounts();
    particles.current = impacts.map((impact) => {
      const path = rutherfordPath(impact, aspect.current);
      counts.current.total++;
      counts.current[scatteringClass(impact)]++;
      return { path, impact, age: path.duration, counted: true };
    });
    setStats({ ...counts.current });
    render();
  };
  const completed = stats.passed + stats.scattered + stats.reflected;
  const fraction = completed
    ? ((100 * (stats.scattered + stats.reflected)) / completed).toFixed(1)
    : "0.0";
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4" aria-label="示意粒子计数">
        {[
          ["已发射", stats.total],
          ["小角度＜5°", stats.passed],
          ["偏转5°–90°", stats.scattered],
          ["后向＞90°", stats.reflected],
        ].map(([label, value]) => (
          <div key={label} className="bg-bg-panel rounded-lg p-2">
            <span className="text-fg-muted">{label}</span>
            <p className="text-fg-primary font-mono">{value}</p>
          </div>
        ))}
      </div>
      <div className="border-fg-disabled/30 bg-bg-deep aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="固定金核的单次库仑散射示意，轨迹颜色按渐近出射角分类"
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
                  setStats({ ...counts.current });
                }
              : start
          }
          aria-pressed={isPlaying}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying
            ? "暂停"
            : reduceMotion
              ? "显示示意轨迹"
              : stats.total
                ? "继续发射"
                : "发射α粒子"}
        </button>
        <button
          onClick={reset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>
      <p className="text-fg-muted text-xs">
        已完成 {completed} 条；其中≥5°占 {fraction}
        %（本页示意样本，非原实验散射率）。蓝：小角度；金：偏转；红：后向。
      </p>
      <div className="border-accent-warm/20 bg-accent-warm/5 text-fg-secondary rounded-lg border p-3 text-xs">
        <p>
          单核模型：5MeV
          α粒子、固定Au核（Z=79）、非相对论库仑单次散射；忽略核反冲、电子屏蔽、能损与多重散射。瞄准距离b在可见高度内均匀取样，图宽映射6000fm，未模拟真实箔厚与探测器接受度；核大小和播放时间为示意。
        </p>
        <p className="mt-2 font-mono">tan(θ/2)=a/|b|；a=Zz e²/(8πε₀E)≈22.75fm</p>
        <p className="mt-2">
          1909年Geiger与Marsden的散射实验及Rutherford1911年的分析支持电荷和质量集中于很小的核区。大角度比例依入射能量、箔厚和角度选择而变，不能给所有实验一个固定百分数。
        </p>
        <a
          href="https://www.lnl.infn.it/wp-content/uploads/Articolo_Rutherford_1911.pdf"
          className="text-accent-cool mt-2 inline-block underline"
        >
          Rutherford1911原文 · §2–3单次散射
        </a>
      </div>
    </div>
  );
}
