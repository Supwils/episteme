"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function SupplyDemandSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [demandIntercept, setDemandIntercept] = useState(100);
  const [demandSlope, setDemandSlope] = useState(1);
  const [supplyIntercept, setSupplyIntercept] = useState(10);
  const [supplySlope, setSupplySlope] = useState(0.8);

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

    ctx.fillStyle = "rgba(200, 164, 90, 0.5)";
    ctx.font = "10px monospace";
    ctx.fillText("Q", pad + plotW - 10, pad + plotH + 20);
    ctx.fillText("P", pad - 15, pad + 10);

    const maxQ = 100;
    const maxP = 120;

    const toX = (q: number) => pad + (q / maxQ) * plotW;
    const toY = (p: number) => pad + plotH - (p / maxP) * plotH;

    ctx.strokeStyle = "#d47850";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let q = 0; q <= maxQ; q++) {
      const p = demandIntercept - demandSlope * q;
      if (p < 0) break;
      const x = toX(q);
      const y = toY(p);
      if (q === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "#6bae8a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let q = 0; q <= maxQ; q++) {
      const p = supplyIntercept + supplySlope * q;
      if (p > maxP) break;
      const x = toX(q);
      const y = toY(p);
      if (q === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const eqQ = (demandIntercept - supplyIntercept) / (demandSlope + supplySlope);
    const eqP = supplyIntercept + supplySlope * eqQ;
    if (eqQ > 0 && eqQ < maxQ && eqP > 0 && eqP < maxP) {
      const eqX = toX(eqQ);
      const eqY = toY(eqP);

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(200, 164, 90, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(eqX, eqY);
      ctx.lineTo(eqX, pad + plotH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(eqX, eqY);
      ctx.lineTo(pad, eqY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#c8a45a";
      ctx.beginPath();
      ctx.arc(eqX, eqY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(200, 164, 90, 0.8)";
      ctx.font = "11px monospace";
      ctx.fillText(`E (${eqQ.toFixed(1)}, ${eqP.toFixed(1)})`, eqX + 8, eqY - 8);
    }

    ctx.fillStyle = "#d47850";
    ctx.fillRect(pad + plotW - 100, pad + 10, 12, 3);
    ctx.fillStyle = "rgba(200, 164, 90, 0.6)";
    ctx.font = "10px monospace";
    ctx.fillText("需求", pad + plotW - 84, pad + 14);

    ctx.fillStyle = "#6bae8a";
    ctx.fillRect(pad + plotW - 100, pad + 28, 12, 3);
    ctx.fillStyle = "rgba(200, 164, 90, 0.6)";
    ctx.fillText("供给", pad + plotW - 84, pad + 32);
  }, [demandIntercept, demandSlope, supplyIntercept, supplySlope]);

  useEffect(() => {
    draw();
  }, [draw]);

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
        供需模拟器
      </h3>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ maxWidth: 500 }}
        role="img"
        aria-label={`供需曲线图，均衡点在产量${((demandIntercept - supplyIntercept) / (demandSlope + supplySlope)).toFixed(1)}，价格${(supplyIntercept + supplySlope * ((demandIntercept - supplyIntercept) / (demandSlope + supplySlope))).toFixed(1)}`}
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sd-demand-intercept" className="data-label">需求截距: {demandIntercept}</label>
          <input
            id="sd-demand-intercept"
            type="range"
            min="40"
            max="150"
            value={demandIntercept}
            onChange={(e) => setDemandIntercept(Number(e.target.value))}
            className="sim-slider"
          />
        </div>
        <div>
          <label htmlFor="sd-demand-slope" className="data-label">需求斜率: {demandSlope.toFixed(1)}</label>
          <input
            id="sd-demand-slope"
            type="range"
            min="0.3"
            max="2"
            step="0.1"
            value={demandSlope}
            onChange={(e) => setDemandSlope(Number(e.target.value))}
            className="sim-slider"
          />
        </div>
        <div>
          <label htmlFor="sd-supply-intercept" className="data-label">供给截距: {supplyIntercept}</label>
          <input
            id="sd-supply-intercept"
            type="range"
            min="0"
            max="50"
            value={supplyIntercept}
            onChange={(e) => setSupplyIntercept(Number(e.target.value))}
            className="sim-slider"
          />
        </div>
        <div>
          <label htmlFor="sd-supply-slope" className="data-label">供给斜率: {supplySlope.toFixed(1)}</label>
          <input
            id="sd-supply-slope"
            type="range"
            min="0.2"
            max="2"
            step="0.1"
            value={supplySlope}
            onChange={(e) => setSupplySlope(Number(e.target.value))}
            className="sim-slider"
          />
        </div>
      </div>
    </div>
  );
}
