"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function LorenzGiniVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gini, setGini] = useState(0.4);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;
    const plotW = w - pad * 2;
    const plotH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(200, 164, 90, 0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = pad + (plotW / 10) * i;
      const y = pad + (plotH / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, pad + plotH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(pad + plotW, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(200, 164, 90, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, pad + plotH);
    ctx.lineTo(pad + plotW, pad + plotH);
    ctx.stroke();

    const toX = (v: number) => pad + v * plotW;
    const toY = (v: number) => pad + plotH - v * plotH;

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(200, 164, 90, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    ctx.lineTo(toX(1), toY(1));
    ctx.stroke();
    ctx.setLineDash([]);

    const alpha = 1 / (1 - gini * 0.8);
    ctx.strokeStyle = "#c8a45a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = i / 100;
      const y = Math.pow(x, alpha);
      if (i === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    ctx.fillStyle = "rgba(200, 164, 90, 0.08)";
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    for (let i = 0; i <= 100; i++) {
      const x = i / 100;
      const y = Math.pow(x, alpha);
      ctx.lineTo(toX(x), toY(y));
    }
    ctx.lineTo(toX(1), toY(1));
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(200, 164, 90, 0.5)";
    ctx.font = "10px monospace";
    ctx.fillText("人口累计%", pad + plotW - 20, pad + plotH + 20);
    ctx.save();
    ctx.translate(pad - 20, pad + 10);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("收入累计%", 0, 0);
    ctx.restore();

    ctx.fillStyle = "rgba(200, 164, 90, 0.6)";
    ctx.font = "11px monospace";
    ctx.fillText("完全平等线", toX(0.7) + 5, toY(0.68) - 5);
    ctx.fillStyle = "#c8a45a";
    ctx.fillText("洛伦兹曲线", toX(0.6) + 5, toY(0.3));
  }, [gini]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 500;
    canvas.height = 360;
    draw();
  }, [draw]);

  return (
    <div className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        洛伦兹曲线与基尼系数
      </h3>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ maxWidth: 500 }}
        role="img"
        aria-label={`洛伦兹曲线图，基尼系数${gini.toFixed(2)}，${
          gini < 0.3 ? "较平等" : gini < 0.5 ? "中等不平等" : "高度不平等"
        }`}
      />
      <div className="mt-4">
        <label htmlFor="lorenz-gini" className="data-label">
          基尼系数: {gini.toFixed(2)}
          <span className="text-fg-muted ml-2">
            {gini < 0.3 ? "（较平等）" : gini < 0.5 ? "（中等）" : "（不平等）"}
          </span>
        </label>
        <input
          id="lorenz-gini"
          type="range"
          min="0.05"
          max="0.85"
          step="0.01"
          value={gini}
          onChange={(e) => setGini(Number(e.target.value))}
          className="sim-slider"
        />
        <div className="flex justify-between text-fg-disabled font-mono text-[9px] mt-1">
          <span>0 (完全平等)</span>
          <span>1 (完全不平等)</span>
        </div>
      </div>
    </div>
  );
}
