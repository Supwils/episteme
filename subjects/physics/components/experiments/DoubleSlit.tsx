"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { cssCanvasSize, fitCanvasToDisplay } from "./canvas-size";
import { drawDoubleSlit, type SlitHit } from "./double-slit-canvas";
import { sampleScreenPosition, type SlitMode } from "./double-slit-model";

const MODE_INFO = {
  wave: { label: "保持相干", result: "单次落点逐渐累积成干涉条纹" },
  observe: { label: "标记路径", result: "交叉项消失，保留单缝衍射包络" },
};

export function DoubleSlit({ className }: { className?: string }) {
  const reduce = useExperimentReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const lastHitRef = useRef(0);
  const hitsRef = useRef<SlitHit[]>([]);
  const [mode, setMode] = useState<SlitMode>("wave");
  const [isPlaying, setIsPlaying] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const { w, h } = cssCanvasSize(canvas);
    drawDoubleSlit(context, w, h, mode, hitsRef.current);
  }, [mode]);

  const addHit = useCallback(() => {
    hitsRef.current.push({ position: sampleScreenPosition(mode), spread: Math.random() });
    if (hitsRef.current.length > 3000) hitsRef.current.shift();
    setParticleCount((count) => count + 1);
    render();
  }, [mode, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      fitCanvasToDisplay(canvas);
      render();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [render]);

  useEffect(() => {
    if (reduce) {
      setIsPlaying(false);
      return;
    }
    if (!isPlaying) return;
    const animate = (time: number) => {
      if (time - lastHitRef.current >= 80) {
        lastHitRef.current = time;
        addHit();
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying, addHit, reduce]);

  const clearHits = () => {
    setIsPlaying(false);
    hitsRef.current = [];
    setParticleCount(0);
    lastHitRef.current = 0;
  };

  const handleModeChange = (nextMode: SlitMode) => {
    clearHits();
    setMode(nextMode);
    if (nextMode === mode) render();
  };

  const handlePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else if (reduce) {
      addHit();
    } else {
      lastHitRef.current = 0;
      setIsPlaying(true);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep overflow-hidden rounded-xl border">
        <div className="border-fg-disabled/30 flex flex-wrap justify-between gap-2 border-b px-3 py-2 text-xs">
          <span className={mode === "wave" ? "text-accent-cool" : "text-accent-warm"}>
            {MODE_INFO[mode].label}模式
          </span>
          <span className="text-fg-muted">理想远场分布 · 分别归一化</span>
        </div>
        <div className="aspect-[16/9] w-full">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="双缝屏幕落点与理论概率密度"
            className="h-full w-full"
          />
        </div>
        <p className="text-fg-secondary px-3 py-2 text-xs">{MODE_INFO[mode].result}</p>
      </div>
      <div className="flex gap-2">
        {(["wave", "observe"] as const).map((value) => (
          <button
            key={value}
            onClick={() => handleModeChange(value)}
            aria-pressed={mode === value}
            className={cn(
              "flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors",
              mode === value
                ? "bg-accent-cool/20 text-accent-cool"
                : "bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30"
            )}
          >
            {MODE_INFO[value].label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handlePlayback}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying ? "暂停" : "发射粒子"}
        </button>
        <button
          onClick={() => {
            clearHits();
            render();
          }}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
        <span className="text-fg-muted ml-auto text-xs" aria-live="off">
          已检测 {particleCount} 个粒子
        </span>
      </div>
      <div className="border-accent-cool/20 bg-accent-cool/5 space-y-2 rounded-lg border p-3 text-xs">
        <p className="text-fg-secondary">
          <span className="text-accent-cool font-medium">两路相干：</span>
          保持相干时叠加两路振幅；路径与完全可区分的记录关联后，叠加两路概率，干涉项消失。是否有人查看记录不决定结果。
        </p>
        <p className="text-fg-muted">
          每次只增加一个屏幕落点，右侧细线是相对概率密度。两种分布采用相同的单缝包络，分别归一化；装置尺寸仅为示意，画面不表示粒子在两缝间的确定轨迹。减少动态效果时，每次点击增加一个落点。画面保留最近
          3000 个落点，计数为本轮总数。
          <a
            href="https://www.feynmanlectures.caltech.edu/III_01.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cool ml-1 underline underline-offset-2"
          >
            Feynman 讲义：量子行为
          </a>
        </p>
      </div>
    </div>
  );
}
