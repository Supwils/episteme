'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src-physics/lib/cn';

type Measurement = {
  distance: number;
  time: number;
};

export function GalileosRamp({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [angle, setAngle] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ballPos, setBallPos] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const startTimeRef = useRef(0);
  const ballPosRef = useRef(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const chartDataRef = useRef<{ times: number[]; distances: number[] }>({ times: [], distances: [] });
  useEffect(() => {
    chartDataRef.current = {
      times: measurements.map(m => m.time),
      distances: measurements.map(m => m.distance),
    };
  }, [measurements]);

  const getLayout = useCallback((w: number, h: number) => {
    const rampLength = w * 0.7;
    const rampStartX = w * 0.1;
    const rampStartY = h * 0.15;
    const angleRad = (angle * Math.PI) / 180;
    const rampEndX = rampStartX + Math.cos(angleRad) * rampLength;
    const rampEndY = rampStartY + Math.sin(angleRad) * rampLength;

    return {
      rampStartX,
      rampStartY,
      rampEndX,
      rampEndY,
      rampLength,
      angleRad,
    };
  }, [angle]);

  const drawRamp = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const layout = getLayout(w, h);

    ctx.save();

    // Ramp surface
    ctx.strokeStyle = '#a8adbd';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(layout.rampStartX, layout.rampStartY);
    ctx.lineTo(layout.rampEndX, layout.rampEndY);
    ctx.stroke();

    // Ramp support
    ctx.strokeStyle = '#3a3e4a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(layout.rampEndX, layout.rampEndY);
    ctx.lineTo(layout.rampEndX, h * 0.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(layout.rampStartX, layout.rampStartY);
    ctx.lineTo(layout.rampStartX, h * 0.85);
    ctx.stroke();

    // Base
    ctx.strokeStyle = '#a8adbd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(layout.rampStartX, h * 0.85);
    ctx.lineTo(layout.rampEndX + 50, h * 0.85);
    ctx.stroke();

    // Angle arc
    const arcRadius = 40;
    ctx.strokeStyle = 'rgba(255, 180, 90, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(layout.rampStartX, layout.rampStartY, arcRadius, 0, layout.angleRad);
    ctx.stroke();

    // Angle label
    ctx.fillStyle = '#ffb45a';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      `${angle}°`,
      layout.rampStartX + arcRadius * Math.cos(layout.angleRad / 2) + 8,
      layout.rampStartY + arcRadius * Math.sin(layout.angleRad / 2),
    );

    // Distance markers
    const markerCount = 5;
    for (let i = 1; i <= markerCount; i++) {
      const t = i / markerCount;
      const mx = layout.rampStartX + (layout.rampEndX - layout.rampStartX) * t;
      const my = layout.rampStartY + (layout.rampEndY - layout.rampStartY) * t;

      ctx.fillStyle = 'rgba(106, 208, 255, 0.4)';
      ctx.fillRect(mx - 1, my + 5, 2, 10);

      ctx.fillStyle = 'rgba(168, 173, 189, 0.5)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${(t * 100).toFixed(0)}%`, mx, my + 24);
    }

    ctx.restore();
  }, [angle, getLayout]);

  const drawBall = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, pos: number) => {
    const layout = getLayout(w, h);
    const x = layout.rampStartX + (layout.rampEndX - layout.rampStartX) * pos;
    const y = layout.rampStartY + (layout.rampEndY - layout.rampStartY) * pos;
    const ballRadius = 10;

    ctx.save();

    // Ball shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x + 2, y + 2, ballRadius, ballRadius, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    const grad = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, ballRadius);
    grad.addColorStop(0, '#ffb45a');
    grad.addColorStop(1, '#a8651c');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawTimer = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
    ctx.save();

    ctx.fillStyle = 'rgba(8, 10, 18, 0.8)';
    ctx.fillRect(w * 0.75, h * 0.05, w * 0.22, h * 0.18);

    ctx.strokeStyle = 'rgba(106, 208, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(w * 0.75, h * 0.05, w * 0.22, h * 0.18);

    ctx.fillStyle = '#6ad0ff';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('时间', w * 0.86, h * 0.1);

    ctx.fillStyle = '#f5f6fa';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`${time.toFixed(2)}s`, w * 0.86, h * 0.17);

    ctx.restore();
  }, []);

  const drawChart = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    if (measurements.length < 2) return;

    const chartX = w * 0.05;
    const chartY = h * 0.6;
    const chartW = w * 0.9;
    const chartH = h * 0.35;

    ctx.save();

    // Chart background
    ctx.fillStyle = 'rgba(8, 10, 18, 0.6)';
    ctx.fillRect(chartX, chartY, chartW, chartH);

    // Axes
    ctx.strokeStyle = 'rgba(168, 173, 189, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartX + 30, chartY + 5);
    ctx.lineTo(chartX + 30, chartY + chartH - 20);
    ctx.lineTo(chartX + chartW - 5, chartY + chartH - 20);
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(168, 173, 189, 0.6)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('时间² (s²)', chartX + chartW / 2, chartY + chartH - 4);

    ctx.save();
    ctx.translate(chartX + 10, chartY + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('距离 (%)', 0, 0);
    ctx.restore();

    // Data points
    const { times, distances } = chartDataRef.current;
    let maxT2 = 0;
    let maxD = 0;
    for (let i = 0; i < times.length; i++) {
      const t = times[i]!;
      const d = distances[i]!;
      const t2 = t * t;
      if (t2 > maxT2) maxT2 = t2;
      if (d > maxD) maxD = d;
    }

    ctx.fillStyle = '#6ad0ff';
    for (let i = 0; i < times.length; i++) {
      const t = times[i]!;
      const d = distances[i]!;
      const t2 = t * t;
      const px = chartX + 30 + (t2 / maxT2) * (chartW - 40);
      const py = chartY + chartH - 20 - (d / maxD) * (chartH - 30);

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // d ∝ t² reference line
    if (measurements.length > 0) {
      ctx.strokeStyle = 'rgba(255, 180, 90, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();

      const refT2 = maxT2;
      const refD = maxD;

      for (let t2 = 0; t2 <= refT2; t2 += refT2 / 50) {
        const px = chartX + 30 + (t2 / refT2) * (chartW - 40);
        const py = chartY + chartH - 20 - (t2 / refT2) * (chartH - 30);

        if (t2 === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }, [measurements]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#060814');
    grad.addColorStop(1, '#0f1320');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    drawRamp(ctx, w, h);
    drawBall(ctx, w, h, ballPosRef.current);
    drawTimer(ctx, w, h, elapsed);
    drawChart(ctx, w, h);
  }, [elapsed, drawRamp, drawBall, drawTimer, drawChart]);

  const animate = useCallback(() => {
    const now = Date.now();
    const dt = (now - startTimeRef.current) / 1000;

    // Galileo's law: d ∝ t²
    // Use acceleration based on angle: a = g * sin(θ)
    const g = 9.8;
    const angleRad = (angle * Math.PI) / 180;
    const acceleration = g * Math.sin(angleRad);
    const maxDist = 1; // normalized

    // d = 0.5 * a * t²
    const dist = Math.min(0.5 * acceleration * dt * dt * 0.05, maxDist);

    ballPosRef.current = dist;
    setBallPos(dist);
    setElapsed(dt);

    if (dist >= maxDist) {
      setIsPlaying(false);
      setMeasurements((prev) => [...prev, { distance: 100, time: dt }]);
      return;
    }

    render();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, angle, render]);

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
      startTimeRef.current = Date.now();
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handleStart = () => {
    if (prefersReducedMotion.current) {
      ballPosRef.current = 1;
      setBallPos(1);
      render();
      return;
    }
    ballPosRef.current = 0;
    setBallPos(0);
    setElapsed(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    ballPosRef.current = 0;
    setBallPos(0);
    setElapsed(0);
    render();
  };

  const handleRecord = () => {
    if (elapsed > 0) {
      setMeasurements((prev) => [...prev, { distance: ballPos * 100, time: elapsed }]);
    }
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-fg-disabled/30 bg-bg-deep">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
        />

        {/* Angle control */}
        <div className="absolute left-3 top-3 rounded-lg bg-bg-panel/90 p-3 backdrop-blur-sm">
          <label className="mb-1 block text-xs text-fg-muted">斜面角度</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={10}
              max={60}
              value={angle}
              onChange={(e) => {
                setAngle(Number(e.target.value));
                handleReset();
              }}
              className="w-24 accent-accent-warm"
              disabled={isPlaying}
            />
            <span className="w-10 text-right text-sm font-mono text-accent-warm">{angle}°</span>
          </div>
        </div>

        {/* Ball position indicator */}
        <div className="absolute right-3 top-3 rounded-lg bg-bg-panel/90 px-3 py-2 backdrop-blur-sm">
          <span className="text-xs text-fg-muted">距离: </span>
          <span className="text-sm font-mono text-accent-cool">{(ballPos * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handleStart}
          className="rounded-lg bg-accent-cool/20 px-4 py-2 text-sm text-accent-cool transition-colors hover:bg-accent-cool/30"
        >
          {isPlaying ? '暂停' : '释放小球'}
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg bg-fg-disabled/20 px-4 py-2 text-sm text-fg-secondary transition-colors hover:bg-fg-disabled/30"
        >
          重置
        </button>
        <button
          onClick={handleRecord}
          disabled={isPlaying || elapsed === 0}
          className="rounded-lg bg-accent-warm/20 px-4 py-2 text-sm text-accent-warm transition-colors hover:bg-accent-warm/30 disabled:opacity-40"
        >
          记录数据
        </button>
        <span className="ml-auto text-xs text-fg-muted">
          已记录 {measurements.length} 组数据
        </span>
      </div>

      {/* Measurements table */}
      {measurements.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-fg-disabled/30">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-fg-disabled/30 bg-bg-panel/50">
                <th className="px-3 py-2 text-left text-fg-muted">#</th>
                <th className="px-3 py-2 text-left text-fg-muted">角度</th>
                <th className="px-3 py-2 text-left text-fg-muted">时间 (s)</th>
                <th className="px-3 py-2 text-left text-fg-muted">时间² (s²)</th>
                <th className="px-3 py-2 text-left text-fg-muted">距离 (%)</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, i) => (
                <tr key={i} className="border-b border-fg-disabled/20">
                  <td className="px-3 py-1.5 text-fg-muted">{i + 1}</td>
                  <td className="px-3 py-1.5 text-fg-secondary">{angle}°</td>
                  <td className="px-3 py-1.5 font-mono text-accent-cool">{m.time.toFixed(3)}</td>
                  <td className="px-3 py-1.5 font-mono text-accent-cool">{(m.time * m.time).toFixed(3)}</td>
                  <td className="px-3 py-1.5 font-mono text-accent-warm">{m.distance.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Key finding */}
      <div className="rounded-lg border border-accent-warm/20 bg-accent-warm/5 p-3">
        <p className="text-xs text-fg-secondary">
          <span className="font-medium text-accent-warm">伽利略发现：</span>
          在斜面上，球滚过的距离与时间的平方成正比（d ∝ t²）。
          这证明了匀加速运动的存在，推翻了亚里士多德&apos;力是维持运动原因&apos;的观点，
          为牛顿运动定律奠定了基础。
        </p>
      </div>
    </div>
  );
}
