"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/subjects/physics/lib/cn";
import { useExperimentCanvas } from "./use-experiment-canvas";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";

const MODEL_WIDTH = 256;
const WAVE_SPEED = 40; // Model length units per second; fixed when wavelength changes.
const SOURCE_RADIUS = 8;
const CREST_COLOR = [106, 208, 255] as const;
const TROUGH_COLOR = [255, 180, 90] as const;

export function WaveInterference({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavelength, setWavelength] = useState(30);
  const [sourceDist, setSourceDist] = useState(80);
  const [elapsed, setElapsed] = useState(0);
  const timeRef = useRef(0);
  const uiClock = useRef(0);
  const imageDataRef = useRef<ImageData | null>(null);
  const tmpCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useExperimentReducedMotion();
  const inputId = useId();
  const pause = useCallback(() => setIsPlaying(false), []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const t = timeRef.current;
      const resW = MODEL_WIDTH;
      const resH = Math.max(1, Math.round((MODEL_WIDTH * h) / w));
      if (!imageDataRef.current || imageDataRef.current.height !== resH) {
        imageDataRef.current = ctx.createImageData(resW, resH);
      }
      const data = imageDataRef.current.data;
      const s1x = resW / 2 - sourceDist / 2;
      const s2x = resW / 2 + sourceDist / 2;
      const sy = resH / 2;
      const k = (2 * Math.PI) / wavelength;
      const omega = k * WAVE_SPEED;

      for (let py = 0; py < resH; py++) {
        for (let px = 0; px < resW; px++) {
          const d1 = Math.hypot(px + 0.5 - s1x, py + 0.5 - sy);
          const d2 = Math.hypot(px + 0.5 - s2x, py + 0.5 - sy);
          // Far-field cylindrical spreading, capped near each source. The
          // circular-wave phase is illustrative, not a fluid/near-field solver.
          const a1 = 1 / Math.sqrt(Math.max(1, d1 / SOURCE_RADIUS));
          const a2 = 1 / Math.sqrt(Math.max(1, d2 / SOURCE_RADIUS));
          const displacement =
            a1 * Math.cos(k * d1 - omega * t) + a2 * Math.cos(k * d2 - omega * t);
          const signed = Math.max(-1, Math.min(1, displacement / 2));
          const strength = Math.abs(signed);
          // Diverging colors represent signed instantaneous displacement,
          // not time-averaged light intensity: blue crest, gold trough, dark zero.
          const color = signed >= 0 ? CREST_COLOR : TROUGH_COLOR;
          const idx = (py * resW + px) * 4;
          data[idx] = Math.round(6 + strength * (color[0] - 6));
          data[idx + 1] = Math.round(8 + strength * (color[1] - 8));
          data[idx + 2] = Math.round(20 + strength * (color[2] - 20));
          data[idx + 3] = 255;
        }
      }
      if (!tmpCanvasRef.current) tmpCanvasRef.current = document.createElement("canvas");
      const tmp = tmpCanvasRef.current;
      if (tmp.width !== resW || tmp.height !== resH) {
        tmp.width = resW;
        tmp.height = resH;
      }
      const tmpCtx = tmp.getContext("2d");
      if (!tmpCtx) return;
      tmpCtx.putImageData(imageDataRef.current, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(tmp, 0, 0, w, h);

      const scale = w / resW;
      const srcY = h / 2;
      const sourceXs = [s1x * scale, s2x * scale];
      for (let i = 0; i < sourceXs.length; i++) {
        const x = sourceXs[i]!;
        ctx.fillStyle = "rgba(106,208,255,0.3)";
        ctx.beginPath();
        // Both driven sources have the same phase.
        ctx.arc(x, srcY, 9 + 2 * Math.cos(omega * t), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6ad0ff";
        ctx.beginPath();
        ctx.arc(x, srcY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(i === 0 ? "S₁" : "S₂", x, srcY - 16);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(sourceXs[0]!, srcY + 18);
      ctx.lineTo(sourceXs[1]!, srcY + 18);
      ctx.stroke();
      ctx.setLineDash([]);
    },
    [wavelength, sourceDist]
  );

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
      step(0.1);
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
          aria-label="两个同相相干圆波源的瞬时位移叠加，蓝色为正、金色为负、深色接近零"
          className="h-full w-full"
        />
      </div>
      <p className="text-fg-muted text-xs">
        瞬时位移：蓝色波峰 · 金色波谷 · 深色近零（非时间平均光强）
      </p>
      <p className="text-accent-cool font-mono text-xs" aria-live={isPlaying ? "off" : "polite"}>
        时间：{elapsed.toFixed(1)} s
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label
            htmlFor={`${inputId}-wavelength`}
            className="text-fg-secondary w-16 shrink-0 text-xs"
          >
            波长 λ
          </label>
          <input
            id={`${inputId}-wavelength`}
            type="range"
            min={15}
            max={60}
            value={wavelength}
            onChange={(e) => setWavelength(Number(e.target.value))}
            className="accent-accent-cool min-w-0 flex-1"
          />
          <span className="text-fg-muted w-8 text-right font-mono text-xs">{wavelength}</span>
        </div>
        <div className="flex items-center gap-3">
          <label
            htmlFor={`${inputId}-source-distance`}
            className="text-fg-secondary w-16 shrink-0 text-xs"
          >
            源距 d
          </label>
          <input
            id={`${inputId}-source-distance`}
            type="range"
            min={30}
            max={200}
            value={sourceDist}
            onChange={(e) => setSourceDist(Number(e.target.value))}
            className="accent-accent-cool min-w-0 flex-1"
          />
          <span className="text-fg-muted w-8 text-right font-mono text-xs">{sourceDist}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={toggle}
          aria-pressed={isPlaying}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying ? "暂停" : reducedMotion ? "推进0.1秒" : elapsed > 0 ? "继续干涉" : "开始干涉"}
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
          同频同相的连续圆波模型：u=A₁cos(kr₁−ωt)+A₂cos(kr₂−ωt)，k=2π/λ，ω=kv。波长、源距使用同一示意长度单位，波速固定为40单位/秒。振幅按远处圆波的1/√r趋势减小，在源附近作有限截断；忽略边界反射与色散。
        </p>
        <p className="mt-2">
          同相波源的路程差为整数倍波长时相长，为半整数倍波长时相消；只有等振幅时才能完全抵消。颜色显示已有稳态波场在某一时刻的位移，深色既可能来自干涉减弱，也可能是波正经过零位移。
        </p>
        <a
          href="https://www.feynmanlectures.caltech.edu/I_29.html#Ch29-S5"
          target="_blank"
          rel="noreferrer"
          className="text-accent-cool mt-2 inline-block underline"
        >
          Feynman讲义 · 两源叠加、振幅与强度
        </a>
      </div>
    </div>
  );
}
