"use client";

import { useEffect, useRef, useState } from "react";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { MillerDiagram } from "./MillerDiagram";

const STEPS = [
  {
    label: "准备气体",
    description: "用甲烷、氨、氢气和水蒸气构成一种还原性大气模型。",
    duration: 2000,
  },
  {
    label: "放电供能",
    description: "水被加热，气体经过放电区；原实验连续运行一周。",
    duration: 2500,
  },
  {
    label: "反应与循环",
    description: "放电引发复杂反应；图中粒子不代表计算出的具体反应路径。",
    duration: 2000,
  },
  {
    label: "冷凝回流",
    description: "水蒸气冷凝回流，不易挥发的产物在水相中累积。",
    duration: 2000,
  },
  {
    label: "分析产物",
    description: "1953年论文用纸色谱鉴定甘氨酸、α-丙氨酸和β-丙氨酸。",
    duration: 3000,
  },
];
const TOTAL_DURATION = STEPS.reduce((sum, step) => sum + step.duration, 0);

function stageAt(elapsed: number) {
  let start = 0;
  for (let i = 0; i < STEPS.length; i++) {
    const duration = STEPS[i]!.duration;
    if (elapsed < start + duration || i === STEPS.length - 1)
      return { index: i, progress: Math.min((elapsed - start) / duration, 1) };
    start += duration;
  }
  return { index: 0, progress: 0 };
}

export function MillersUrey({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const clock = useRef(0);
  const reduce = useExperimentReducedMotion();
  const stage = stageAt(elapsed);
  const finished = elapsed >= TOTAL_DURATION;

  useEffect(() => {
    if (reduce) {
      setPlaying(false);
      return;
    }
    if (!playing) return;
    let frame = 0;
    let previous: number | undefined;
    const tick = (now: number) => {
      if (previous !== undefined) clock.current += now - previous;
      previous = now;
      clock.current = Math.min(clock.current, TOTAL_DURATION);
      setElapsed(clock.current);
      if (clock.current < TOTAL_DURATION) frame = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reduce]);

  const play = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (finished) {
      clock.current = 0;
      setElapsed(0);
      if (reduce) return;
    }
    if (reduce) {
      const index = stageAt(clock.current).index;
      clock.current = Math.min(
        STEPS.slice(0, index + 1).reduce((sum, step) => sum + step.duration, 0),
        TOTAL_DURATION
      );
      setElapsed(clock.current);
    } else setPlaying(true);
  };
  const reset = () => {
    setPlaying(false);
    clock.current = 0;
    setElapsed(0);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <MillerDiagram step={stage.index} progress={stage.progress} />
      <ol className="text-fg-muted grid grid-cols-5 gap-1 text-center text-[10px]">
        {STEPS.map((step, i) => (
          <li key={step.label} aria-current={i === stage.index ? "step" : undefined}>
            <div
              className={cn(
                "mb-1 h-1.5 rounded-full",
                i < stage.index || finished
                  ? "bg-accent-cool"
                  : i === stage.index
                    ? "bg-accent-cool/40"
                    : "bg-fg-disabled/30"
              )}
            />
            {step.label}
          </li>
        ))}
      </ol>
      <div className="border-fg-disabled/30 rounded-lg border p-3" aria-live="polite">
        <p className="text-sm font-medium">
          {stage.index + 1}. {STEPS[stage.index]!.label}
        </p>
        <p className="text-fg-secondary mt-1 text-xs leading-relaxed">
          {STEPS[stage.index]!.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={play}
          className="bg-accent-cool/20 text-accent-cool rounded-lg px-4 py-2 text-sm"
        >
          {playing
            ? "暂停"
            : finished
              ? "重新播放"
              : reduce
                ? "下一阶段"
                : elapsed > 0
                  ? "继续"
                  : "播放"}
        </button>
        <button
          onClick={reset}
          className="bg-fg-disabled/20 text-fg-secondary rounded-lg px-4 py-2 text-sm"
        >
          重置
        </button>
      </div>
      <p className="border-accent-warm/20 bg-accent-warm/5 text-fg-secondary rounded-lg border p-3 text-xs leading-relaxed">
        1953年，米勒在尤里指导下报告：特定气体配方加上加热和电放电，可以非生物合成氨基酸。甲烷本身已是有机物，不能笼统说“全由无机物自发生成”；装置也没有制造生命。这支持前生命化学合成的可能性，不证明原始地球大气必然就是这套配方。
      </p>
      <a
        href="https://doi.org/10.1126/science.117.3046.528"
        target="_blank"
        rel="noreferrer"
        className="text-accent-cool text-xs"
      >
        Miller1953 · 原始论文与产物鉴定
      </a>
    </div>
  );
}
