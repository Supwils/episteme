"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/subjects/physics/lib/cn";

const CANVAS_RES = 256;

export function WaveInterference({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavelength, setWavelength] = useState(30);
  const [sourceDist, setSourceDist] = useState(80);
  const timeRef = useRef(0);
  const imageDataRef = useRef<ImageData | null>(null);
  const tmpCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const t = timeRef.current;

    const resW = CANVAS_RES;
    const resH = Math.round(CANVAS_RES * (h / w));
    const scaleX = w / resW;
    const scaleY = h / resH;

    if (
      !imageDataRef.current ||
      imageDataRef.current.width !== resW ||
      imageDataRef.current.height !== resH
    ) {
      imageDataRef.current = ctx.createImageData(resW, resH);
    }

    const data = imageDataRef.current.data;
    const s1x = resW / 2 - sourceDist / 2 / scaleX;
    const s2x = resW / 2 + sourceDist / 2 / scaleX;
    const sy = resH / 2;
    const k = (2 * Math.PI) / (wavelength / scaleX);
    const omega = 0.15;

    for (let py = 0; py < resH; py++) {
      for (let px = 0; px < resW; px++) {
        const dx1 = px - s1x;
        const dy1 = py - sy;
        const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        const dx2 = px - s2x;
        const dy2 = py - sy;
        const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const wave1 = Math.sin(k * d1 - omega * t) / Math.max(1, d1 * 0.03);
        const wave2 = Math.sin(k * d2 - omega * t) / Math.max(1, d2 * 0.03);
        const combined = wave1 + wave2;

        const norm = (combined + 2) / 4;
        const clamped = Math.max(0, Math.min(1, norm));

        const idx = (py * resW + px) * 4;

        // Cool blue-white color scheme
        if (clamped > 0.5) {
          const bright = (clamped - 0.5) * 2;
          data[idx] = Math.round(100 + bright * 155);
          data[idx + 1] = Math.round(180 + bright * 75);
          data[idx + 2] = Math.round(255);
        } else {
          const dark = clamped * 2;
          data[idx] = Math.round(10 + dark * 90);
          data[idx + 1] = Math.round(15 + dark * 165);
          data[idx + 2] = Math.round(30 + dark * 225);
        }
        data[idx + 3] = 255;
      }
    }

    if (!tmpCanvasRef.current) {
      tmpCanvasRef.current = document.createElement("canvas");
    }
    const tmpCanvas = tmpCanvasRef.current;
    if (tmpCanvas.width !== resW || tmpCanvas.height !== resH) {
      tmpCanvas.width = resW;
      tmpCanvas.height = resH;
    }
    const tmpCtx = tmpCanvas.getContext("2d");
    if (!tmpCtx) return;
    tmpCtx.putImageData(imageDataRef.current, 0, 0);

    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(tmpCanvas, 0, 0, w, h);

    // Source points
    const src1ScreenX = w / 2 - sourceDist / 2;
    const src2ScreenX = w / 2 + sourceDist / 2;
    const srcY = h / 2;

    // Source 1
    ctx.fillStyle = "#6ad0ff";
    ctx.beginPath();
    ctx.arc(src1ScreenX, srcY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(106, 208, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(src1ScreenX, srcY, 10 + Math.sin(t * 0.15) * 3, 0, Math.PI * 2);
    ctx.fill();

    // Source 2
    ctx.fillStyle = "#6ad0ff";
    ctx.beginPath();
    ctx.arc(src2ScreenX, srcY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(106, 208, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(src2ScreenX, srcY, 10 + Math.sin(t * 0.15 + Math.PI) * 3, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("S₁", src1ScreenX, srcY - 16);
    ctx.fillText("S₂", src2ScreenX, srcY - 16);

    // Source distance line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(src1ScreenX, srcY + 20);
    ctx.lineTo(src2ScreenX, srcY + 20);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "9px monospace";
    ctx.fillText(`d = ${sourceDist}`, (src1ScreenX + src2ScreenX) / 2, srcY + 34);

    // Wavelength indicator
    ctx.fillStyle = "rgba(168, 173, 189, 0.5)";
    ctx.font = "9px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`λ = ${wavelength}`, w - 10, h - 10);
  }, [wavelength, sourceDist]);

  const animate = useCallback(() => {
    timeRef.current += 1;
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

    imageDataRef.current = null;
    render();
  }, [render]);

  useEffect(() => {
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handleStart = () => {
    if (prefersReducedMotion.current) {
      render();
      return;
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    timeRef.current = 0;
    imageDataRef.current = null;
    render();
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-fg-disabled/30 bg-bg-deep relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <canvas ref={canvasRef} role="img" aria-label="波的干涉模拟" className="h-full w-full" />

        <div className="bg-bg-panel/90 absolute top-3 right-3 rounded-lg px-3 py-2 backdrop-blur-sm">
          <p className="text-accent-cool font-mono text-xs">波干涉图样</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-fg-secondary w-16 text-xs">波长 λ</label>
          <input
            type="range"
            min={15}
            max={60}
            value={wavelength}
            onChange={(e) => {
              setWavelength(Number(e.target.value));
              imageDataRef.current = null;
            }}
            className="accent-accent-cool flex-1"
          />
          <span className="text-fg-muted w-10 text-right font-mono text-xs">{wavelength}</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-fg-secondary w-16 text-xs">源距 d</label>
          <input
            type="range"
            min={30}
            max={200}
            value={sourceDist}
            onChange={(e) => {
              setSourceDist(Number(e.target.value));
              imageDataRef.current = null;
            }}
            className="accent-accent-cool flex-1"
          />
          <span className="text-fg-muted w-10 text-right font-mono text-xs">{sourceDist}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handleStart}
          className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {isPlaying ? "暂停" : "开始干涉"}
        </button>
        <button
          onClick={handleReset}
          className="bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          重置
        </button>
      </div>

      <div className="border-accent-cool/20 bg-accent-cool/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs">
          <span className="text-accent-cool font-medium">波的干涉：</span>
          两个同频波源发出的波在空间中叠加。在某些区域，两列波峰相遇，
          振幅相加形成明亮的加强干涉（相长干涉）；在另一些区域，波峰与波谷相遇，
          振幅相互抵消形成暗纹（相消干涉）。调整波长和源距可以观察不同密度的干涉条纹。
        </p>
      </div>
    </div>
  );
}
