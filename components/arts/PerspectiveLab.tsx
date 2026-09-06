"use client";

import { useMemo, useState } from "react";
import { perspectiveBox } from "@/lib/arts/perspective";

export function PerspectiveLab() {
  const [vpX, setVpX] = useState(168);
  const [vpY, setVpY] = useState(48);
  const box = useMemo(() => perspectiveBox({ x: vpX, y: vpY }), [vpX, vpY]);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg viewBox="0 0 260 180" className="h-auto w-full" role="img" aria-label="一点透视箱体">
        {box.front.map((point, index) => (
          <line
            key={`ray-${index}`}
            x1={point.x}
            y1={point.y}
            x2={vpX}
            y2={vpY}
            stroke="var(--color-border-faint)"
          />
        ))}
        <polygon
          points={box.front.map((point) => `${point.x},${point.y}`).join(" ")}
          fill="none"
          stroke="#b0785a"
          strokeWidth="2"
        />
        <polygon
          points={box.back.map((point) => `${point.x},${point.y}`).join(" ")}
          fill="none"
          stroke="#845a46"
          strokeWidth="1.5"
        />
        {box.front.map((point, index) => (
          <line
            key={`edge-${index}`}
            x1={point.x}
            y1={point.y}
            x2={box.back[index]!.x}
            y2={box.back[index]!.y}
            stroke="#b0785a"
            strokeWidth="1.2"
          />
        ))}
        <circle cx={vpX} cy={vpY} r="4" fill="#c25b5b" />
      </svg>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-fg-secondary mb-1 flex justify-between text-[12.5px]">
            <span>灭点左右</span>
            <span className="font-mono">{vpX}</span>
          </span>
          <input
            type="range"
            min={40}
            max={220}
            value={vpX}
            onChange={(event) => setVpX(Number.parseInt(event.target.value, 10))}
            aria-label="灭点左右"
            className="w-full"
            style={{ accentColor: "#b0785a" }}
          />
        </label>
        <label>
          <span className="text-fg-secondary mb-1 flex justify-between text-[12.5px]">
            <span>灭点高低</span>
            <span className="font-mono">{vpY}</span>
          </span>
          <input
            type="range"
            min={20}
            max={90}
            value={vpY}
            onChange={(event) => setVpY(Number.parseInt(event.target.value, 10))}
            aria-label="灭点高低"
            className="w-full"
            style={{ accentColor: "#b0785a" }}
          />
        </label>
      </div>
    </div>
  );
}
