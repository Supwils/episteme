"use client";

import { useState, useMemo } from "react";
import { cn } from "@/src-physics/lib/cn";

const SVG_W = 800;
const SVG_H = 400;
const PAD = { left: 40, right: 40, top: 30, bottom: 30 };

type LensType = "convex" | "concave";

interface RayPoint {
  x: number;
  y: number;
}

function computeImagePosition(
  objectDist: number,
  focalLength: number,
  lensType: LensType,
): { imageDist: number; magnification: number; isVirtual: boolean } {
  const f = lensType === "convex" ? focalLength : -focalLength;
  const do_ = objectDist;
  const di = (do_ * f) / (do_ - f);
  const m = -di / do_;
  return {
    imageDist: di,
    magnification: m,
    isVirtual: di < 0,
  };
}

function LensShape({ cx, cy, type }: { cx: number; cy: number; type: LensType }) {
  const h = 100;
  if (type === "convex") {
    return (
      <g>
        <path
          d={`M ${cx - 3} ${cy - h} Q ${cx - 15} ${cy} ${cx - 3} ${cy + h}`}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2}
        />
        <path
          d={`M ${cx + 3} ${cy - h} Q ${cx + 15} ${cy} ${cx + 3} ${cy + h}`}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2}
        />
      </g>
    );
  }
  return (
    <g>
      <path
        d={`M ${cx - 3} ${cy - h} Q ${cx + 10} ${cy} ${cx - 3} ${cy + h}`}
        fill="none"
        stroke="#f97316"
        strokeWidth={2}
      />
      <path
        d={`M ${cx + 3} ${cy - h} Q ${cx - 10} ${cy} ${cx + 3} ${cy + h}`}
        fill="none"
        stroke="#f97316"
        strokeWidth={2}
      />
    </g>
  );
}

interface LensOpticsProps {
  className?: string;
}

export function LensOptics({ className }: LensOpticsProps) {
  const [lensType, setLensType] = useState<LensType>("convex");
  const [objectDist, setObjectDist] = useState(200);
  const [focalLength, setFocalLength] = useState(80);
  const [objectHeight, setObjectHeight] = useState(60);

  const lensX = SVG_W / 2;
  const axisY = SVG_H / 2;
  const scale = 1;

  const objectX = lensX - objectDist;
  const objectTopY = axisY - objectHeight;
  const objectBotY = axisY;

  const result = useMemo(
    () => computeImagePosition(objectDist, focalLength, lensType),
    [objectDist, focalLength, lensType],
  );

  const imageX = lensX + result.imageDist * scale;
  const imageHeight = objectHeight * Math.abs(result.magnification);
  const imageTopY = result.magnification > 0 ? axisY - imageHeight : axisY + imageHeight;
  const imageBotY = axisY;

  const f1X = lensX - focalLength;
  const f2X = lensX + focalLength;
  const f1Label = lensType === "convex" ? "F" : "F'";
  const f2Label = lensType === "convex" ? "F'" : "F";

  const objectAbove = objectTopY < axisY;

  const parallelRay: RayPoint[] = [
    { x: objectX, y: objectTopY },
    { x: lensX, y: objectTopY },
  ];

  const throughCenter: RayPoint[] = [
    { x: objectX, y: objectTopY },
    { x: lensX, y: axisY + (objectTopY - axisY) * (lensX - objectX) / (lensX - objectX) },
  ];

  const principalRay: RayPoint[] = [
    { x: objectX, y: objectTopY },
    { x: lensX, y: objectTopY },
  ];

  let parallelAfterLens: RayPoint;
  let principalAfterLens: RayPoint;

  if (lensType === "convex") {
    parallelAfterLens = { x: imageX, y: imageTopY };
    principalAfterLens = { x: imageX, y: imageTopY };
  } else {
    const slope = (objectTopY - axisY) / focalLength;
    parallelAfterLens = {
      x: lensX + 200,
      y: objectTopY + slope * 200,
    };
    principalAfterLens = {
      x: lensX + 200,
      y: objectTopY + slope * 200,
    };
  }

  const equationStr = lensType === "convex"
    ? "1/f = 1/do + 1/di"
    : "1/f = 1/do + 1/di (f < 0)";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-2">
        {(["convex", "concave"] as LensType[]).map((t) => (
          <button
            key={t}
            onClick={() => setLensType(t)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              lensType === t
                ? "bg-accent-cool/20 text-accent-cool"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700",
            )}
          >
            {t === "convex" ? "凸透镜" : "凹透镜"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-fg-disabled/30 bg-bg-deep overflow-hidden">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full">
          <rect width={SVG_W} height={SVG_H} fill="#0a0a14" />

          <line
            x1={PAD.left}
            y1={axisY}
            x2={SVG_W - PAD.right}
            y2={axisY}
            stroke="#333"
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          <line
            x1={lensX}
            y1={PAD.top}
            x2={lensX}
            y2={SVG_H - PAD.bottom}
            stroke="#333"
            strokeWidth={0.5}
            strokeDasharray="4 4"
          />

          <LensShape cx={lensX} cy={axisY} type={lensType} />

          <line
            x1={objectX}
            y1={axisY}
            x2={objectX}
            y2={objectTopY}
            stroke="#22c55e"
            strokeWidth={3}
          />
          <polygon
            points={`${objectX},${objectTopY} ${objectX - 5},${objectTopY + 10} ${objectX + 5},${objectTopY + 10}`}
            fill="#22c55e"
          />
          <text
            x={objectX}
            y={axisY + 18}
            textAnchor="middle"
            fill="#22c55e"
            fontSize="10"
            fontFamily="monospace"
          >
            物体
          </text>

          {result.isVirtual ? (
            <g opacity={0.5}>
              <line
                x1={imageX}
                y1={axisY}
                x2={imageX}
                y2={imageTopY}
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <polygon
                points={`${imageX},${imageTopY} ${imageX - 4},${imageTopY + 8} ${imageX + 4},${imageTopY + 8}`}
                fill="#ef4444"
              />
              <text
                x={imageX}
                y={axisY + 18}
                textAnchor="middle"
                fill="#ef4444"
                fontSize="10"
                fontFamily="monospace"
              >
                虚像
              </text>
            </g>
          ) : (
            <g>
              <line
                x1={imageX}
                y1={axisY}
                x2={imageX}
                y2={imageTopY}
                stroke="#ef4444"
                strokeWidth={3}
              />
              <polygon
                points={`${imageX},${imageTopY} ${imageX - 5},${imageTopY + 10} ${imageX + 5},${imageTopY + 10}`}
                fill="#ef4444"
              />
              <text
                x={imageX}
                y={axisY + 18}
                textAnchor="middle"
                fill="#ef4444"
                fontSize="10"
                fontFamily="monospace"
              >
                实像
              </text>
            </g>
          )}

          <line
            x1={parallelRay[0]!.x}
            y1={parallelRay[0]!.y}
            x2={parallelRay[1]!.x}
            y2={parallelRay[1]!.y}
            stroke="#fbbf24"
            strokeWidth={1.5}
            opacity={0.7}
          />
          <line
            x1={parallelRay[1]!.x}
            y1={parallelRay[1]!.y}
            x2={parallelAfterLens.x}
            y2={parallelAfterLens.y}
            stroke="#fbbf24"
            strokeWidth={1.5}
            opacity={0.7}
            strokeDasharray={result.isVirtual ? "4 3" : "none"}
          />

          <line
            x1={objectX}
            y1={objectTopY}
            x2={lensX}
            y2={axisY}
            stroke="#a855f7"
            strokeWidth={1.5}
            opacity={0.7}
          />
          {lensType === "concave" ? (
            <line
              x1={lensX}
              y1={axisY}
              x2={lensX + 200}
              y2={axisY + (objectTopY - axisY) * (200 / focalLength)}
              stroke="#a855f7"
              strokeWidth={1.5}
              opacity={0.7}
              strokeDasharray="4 3"
            />
          ) : (
            <line
              x1={lensX}
              y1={axisY}
              x2={imageX}
              y2={imageTopY}
              stroke="#a855f7"
              strokeWidth={1.5}
              opacity={0.7}
            />
          )}

          <circle cx={f1X} cy={axisY} r={4} fill="none" stroke="#60a5fa" strokeWidth={1.5} />
          <text x={f1X} y={axisY + 18} textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">
            {f1Label}
          </text>

          <circle cx={f2X} cy={axisY} r={4} fill="none" stroke="#f97316" strokeWidth={1.5} />
          <text x={f2X} y={axisY + 18} textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="monospace">
            {f2Label}
          </text>

          <text x={lensX + 10} y={PAD.top + 14} fill="#555" fontSize="9" fontFamily="monospace">
            光轴
          </text>
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-yellow-400" />
          <span className="text-xs text-fg-muted">平行光</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-purple-400" />
          <span className="text-xs text-fg-muted">过光心</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full border border-blue-400" />
          <span className="text-xs text-fg-muted">焦点</span>
        </div>
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 px-4 py-2">
        <p className="font-mono text-xs text-accent-cool">{equationStr}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-fg-secondary">参数调节</h3>
          <div className="flex items-center gap-3">
            <label className="w-20 shrink-0 text-xs text-fg-muted">物距 d_o</label>
            <input
              type="range"
              min={focalLength + 20}
              max={400}
              step={5}
              value={objectDist}
              onChange={(e) => setObjectDist(Number(e.target.value))}
              className="flex-1 accent-green-500"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">{objectDist} mm</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-20 shrink-0 text-xs text-fg-muted">焦距 f</label>
            <input
              type="range"
              min={30}
              max={150}
              step={5}
              value={focalLength}
              onChange={(e) => setFocalLength(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">{focalLength} mm</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-20 shrink-0 text-xs text-fg-muted">物高 h_o</label>
            <input
              type="range"
              min={20}
              max={120}
              step={5}
              value={objectHeight}
              onChange={(e) => setObjectHeight(Number(e.target.value))}
              className="flex-1 accent-yellow-500"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">{objectHeight} mm</span>
          </div>
        </div>

        <div className="rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-fg-secondary">成像计算</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-fg-muted">物距 d_o</span>
              <span className="font-mono text-fg-primary">{objectDist} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">像距 d_i</span>
              <span className="font-mono text-fg-primary">
                {result.isVirtual ? "-" : ""}{Math.abs(result.imageDist).toFixed(1)} mm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">放大率 M</span>
              <span className="font-mono text-accent-cool">
                {result.magnification > 0 ? "+" : ""}{result.magnification.toFixed(2)}×
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">像高 h_i</span>
              <span className="font-mono text-fg-primary">{imageHeight.toFixed(1)} mm</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-fg-disabled/30">
              <span className="text-fg-muted">像的性质</span>
              <span className={cn("font-mono text-xs", result.isVirtual ? "text-red-400" : "text-green-400")}>
                {result.isVirtual ? "虚像 · 正立 · 同侧" : "实像 · 倒立 · 异侧"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
