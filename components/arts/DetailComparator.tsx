"use client";

import { useState } from "react";

export function DetailComparator() {
  const [zoomX, setZoomX] = useState(42);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel title="轮廓优先" zoomX={zoomX} mode="line" />
        <Panel title="色块优先" zoomX={zoomX} mode="mass" />
      </div>
      <label className="mt-5 block">
        <span className="text-fg-secondary mb-1 flex justify-between text-[12.5px]">
          <span>放大窗位置</span>
          <span className="font-mono">{zoomX}%</span>
        </span>
        <input
          type="range"
          min={8}
          max={78}
          value={zoomX}
          onChange={(event) => setZoomX(Number.parseInt(event.target.value, 10))}
          aria-label="放大窗位置"
          className="w-full"
          style={{ accentColor: "var(--color-accent-gold)" }}
        />
      </label>
    </div>
  );
}

function Panel({ title, zoomX, mode }: { title: string; zoomX: number; mode: "line" | "mass" }) {
  const x = 20 + (zoomX / 100) * 140;
  return (
    <figure>
      <figcaption className="text-fg-muted mb-2 text-[12px]">{title}</figcaption>
      <svg viewBox="0 0 200 140" className="h-auto w-full" role="img" aria-label={`${title}示意图`}>
        {mode === "line" ? (
          <>
            <rect x="18" y="18" width="164" height="104" fill="var(--color-bg-elevated)" />
            <ellipse
              cx="78"
              cy="78"
              rx="28"
              ry="36"
              fill="none"
              stroke="#b0785a"
              strokeWidth="1.6"
            />
            <rect
              x="112"
              y="48"
              width="46"
              height="58"
              fill="none"
              stroke="#845a46"
              strokeWidth="1.6"
            />
            <line x1="28" y1="118" x2="172" y2="118" stroke="var(--color-fg-muted)" />
          </>
        ) : (
          <>
            <rect x="18" y="18" width="164" height="104" fill="#c4a484" />
            <ellipse cx="78" cy="78" rx="30" ry="38" fill="#7a4a32" opacity="0.85" />
            <rect x="108" y="46" width="52" height="62" fill="#d8c4a8" />
            <rect x="18" y="108" width="164" height="14" fill="#5a4030" />
          </>
        )}
        <rect
          x={x}
          y="36"
          width="44"
          height="44"
          fill="none"
          stroke="var(--color-fg-primary)"
          strokeWidth="1.4"
        />
      </svg>
    </figure>
  );
}
