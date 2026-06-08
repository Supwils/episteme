'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/src-physics/lib/cn';

const NUM_PENDULUMS = 15;
const BASE_PERIOD = 1.0;
const PERIOD_STEP = 0.04;

export function PendulumWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef(0);
  const timeRef = useRef(0);

  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const getLayout = useCallback((w: number, h: number) => {
    const pivotY = h * 0.08;
    const spacing = w / (NUM_PENDULUMS + 1);
    const maxLen = h * 0.7;
    const minLen = h * 0.25;

    return { pivotY, spacing, maxLen, minLen };
  }, []);

  const getLength = useCallback((index: number, h: number) => {
    const layout = getLayout(0, h);
    return layout.minLen + (layout.maxLen - layout.minLen) * (index / (NUM_PENDULUMS - 1));
  }, [getLayout]);

  const getPeriod = useCallback((index: number) => {
    return BASE_PERIOD + index * PERIOD_STEP;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const layout = getLayout(w, h);
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#060814');
    grad.addColorStop(1, '#0f1320');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Support bar
    ctx.fillStyle = '#3a3e4a';
    ctx.fillRect(w * 0.05, layout.pivotY - 3, w * 0.9, 6);

    for (let i = 0; i < NUM_PENDULUMS; i++) {
      const pivotX = layout.spacing * (i + 1);
      const len = getLength(i, h);
      const period = getPeriod(i);
      const omega = (2 * Math.PI) / period;
      const amplitude = 0.4;
      const angle = amplitude * Math.sin(omega * t);

      const bobX = pivotX + len * Math.sin(angle);
      const bobY = layout.pivotY + len * Math.cos(angle);

      const hue = 190 + (i / NUM_PENDULUMS) * 50;
      const bobColor = `hsl(${hue}, 80%, 65%)`;
      const stringColor = `hsla(${hue}, 60%, 70%, 0.5)`;

      // String
      ctx.strokeStyle = stringColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pivotX, layout.pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Pivot
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.arc(pivotX, layout.pivotY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Bob
      const bobGrad = ctx.createRadialGradient(bobX - 2, bobY - 2, 0, bobX, bobY, 10);
      bobGrad.addColorStop(0, bobColor);
      bobGrad.addColorStop(1, `hsl(${hue}, 70%, 35%)`);
      ctx.fillStyle = bobGrad;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Ghost trail dots
      if (isPlaying) {
        for (let g = 1; g <= 3; g++) {
          const gt = t - g * 0.03;
          const gAngle = amplitude * Math.sin(omega * gt);
          const gX = pivotX + len * Math.sin(gAngle);
          const gY = layout.pivotY + len * Math.cos(gAngle);
          ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${0.15 - g * 0.04})`;
          ctx.beginPath();
          ctx.arc(gX, gY, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Period labels at bottom
    ctx.fillStyle = 'rgba(168, 173, 189, 0.4)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i < NUM_PENDULUMS; i += 4) {
      const pivotX = layout.spacing * (i + 1);
      const period = getPeriod(i);
      ctx.fillText(`T=${period.toFixed(2)}s`, pivotX, h - 10);
    }
  }, [getLayout, getLength, getPeriod, isPlaying]);

  const animate = useCallback(() => {
    const now = Date.now();
    const dt = (now - startTimeRef.current) / 1000;
    timeRef.current = dt;
    setElapsed(dt);

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
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    render();
  }, [render]);

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - timeRef.current * 1000;
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handleStart = () => {
    if (prefersReducedMotion.current) {
      timeRef.current = 0;
      render();
      return;
    }
    timeRef.current = 0;
    startTimeRef.current = Date.now();
    setElapsed(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    timeRef.current = 0;
    setElapsed(0);
    render();
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-fg-disabled/30 bg-bg-deep">
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="absolute right-3 top-3 rounded-lg bg-bg-panel/90 px-3 py-2 backdrop-blur-sm">
          <p className="text-xs font-mono text-accent-cool">
            时间: {elapsed.toFixed(1)}s
          </p>
          <p className="mt-1 text-[10px] text-fg-muted">
            {NUM_PENDULUMS} 个摆 · 周期递增
          </p>
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg bg-bg-panel/90 px-3 py-2 backdrop-blur-sm">
          <p className="text-[10px] text-fg-muted">
            T = 2π√(L/g) — 摆长越长，周期越大
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handleStart}
          className="rounded-lg bg-accent-cool/20 px-4 py-2 text-sm text-accent-cool transition-colors hover:bg-accent-cool/30"
        >
          {isPlaying ? '暂停' : '释放摆球'}
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg bg-fg-disabled/20 px-4 py-2 text-sm text-fg-secondary transition-colors hover:bg-fg-disabled/30"
        >
          重置
        </button>
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
        <p className="text-xs text-fg-secondary">
          <span className="font-medium text-accent-cool">摆波之美：</span>
          15 个摆的长度依次递增，因此周期各不相同。同时释放后，它们起初步调一致，
          随后因周期差异逐渐错开，形成优美的波动图案。当某些摆完成整数倍振荡后
          又会重新同步——这就是摆波(Pendulum Wave)的迷人之处。
        </p>
      </div>
    </div>
  );
}
