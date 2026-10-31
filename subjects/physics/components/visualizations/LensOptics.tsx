"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "@/subjects/physics/lib/cn";
import { ZoomableExperimentDiagram } from "./ZoomableExperimentDiagram";
import { computeLensImage, lensRaySlopes, type LensType } from "./experiment-models";

const SVG_W = 800;
const SVG_H = 400;
const LENS_X = SVG_W / 2;
const AXIS_Y = SVG_H / 2;
const RIGHT_EDGE = SVG_W - 40;

function LensShape({ type }: { type: LensType }) {
  const h = 150;
  const edge = type === "convex" ? 3 : 14;
  const middle = type === "convex" ? 18 : 2;
  return (
    <g stroke={type === "convex" ? "#60a5fa" : "#f97316"} fill="none" strokeWidth={2}>
      <path
        d={`M ${LENS_X - edge} ${AXIS_Y - h} Q ${LENS_X - middle} ${AXIS_Y} ${LENS_X - edge} ${AXIS_Y + h}`}
      />
      <path
        d={`M ${LENS_X + edge} ${AXIS_Y - h} Q ${LENS_X + middle} ${AXIS_Y} ${LENS_X + edge} ${AXIS_Y + h}`}
      />
    </g>
  );
}

function ObjectArrow({
  x,
  tipY,
  color,
  label,
  virtual = false,
}: {
  x: number;
  tipY: number;
  color: string;
  label: string;
  virtual?: boolean;
}) {
  const direction = tipY > AXIS_Y ? 1 : -1;
  const base = tipY - direction * 9;
  return (
    <g stroke={color} fill={color} opacity={virtual ? 0.7 : 1}>
      <line
        x1={x}
        y1={AXIS_Y}
        x2={x}
        y2={tipY}
        strokeWidth={3}
        strokeDasharray={virtual ? "4 3" : undefined}
      />
      <polygon points={`${x},${tipY} ${x - 5},${base} ${x + 5},${base}`} />
      <text x={x} y={AXIS_Y + 28} textAnchor="middle" stroke="none" fontSize={11}>
        {label}
      </text>
    </g>
  );
}

export function LensOptics({ className }: { className?: string }) {
  const [lensType, setLensType] = useState<LensType>("convex");
  const [objectDist, setObjectDist] = useState(200);
  const [focalLength, setFocalLength] = useState(80);
  const [objectHeight, setObjectHeight] = useState(60);
  const controlId = useId();
  const result = useMemo(
    () => computeLensImage(objectDist, focalLength, lensType),
    [objectDist, focalLength, lensType]
  );
  const scale = Math.min(
    1,
    330 / Math.max(objectDist, Math.abs(result.imageDist ?? 0), focalLength),
    140 / (objectHeight * Math.max(1, Math.abs(result.magnification ?? 0)))
  );
  const objectX = LENS_X - objectDist * scale;
  const objectTopY = AXIS_Y - objectHeight * scale;
  const imageX = LENS_X + (result.imageDist ?? 0) * scale;
  const imageTopY = AXIS_Y - objectHeight * (result.magnification ?? 0) * scale;
  const slopes = lensRaySlopes(objectDist, objectHeight, result.focalLength);
  const rightParallelY = objectTopY + slopes.parallel * (RIGHT_EDGE - LENS_X);
  const rightCentreY = AXIS_Y + slopes.centre * (RIGHT_EDGE - LENS_X);
  const controls = [
    {
      key: "distance",
      label: "物距 d_o",
      value: objectDist,
      min: 20,
      max: 400,
      set: setObjectDist,
    },
    {
      key: "focus",
      label: "焦距大小 |f|",
      value: focalLength,
      min: 30,
      max: 150,
      set: setFocalLength,
    },
    {
      key: "height",
      label: "物高 h_o",
      value: objectHeight,
      min: 20,
      max: 120,
      set: setObjectHeight,
    },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {(["convex", "concave"] as const).map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={lensType === type}
            onClick={() => setLensType(type)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              lensType === type
                ? "bg-accent-cool/20 text-accent-cool"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            )}
          >
            {type === "convex" ? "凸透镜" : "凹透镜"}
          </button>
        ))}
      </div>
      <ZoomableExperimentDiagram
        title="薄透镜光路图"
        viewBoxWidth={SVG_W}
        viewBoxHeight={SVG_H}
        minimumFontSize={10}
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="近轴薄透镜光路；实线为向右传播的光，虚线为反向延长线"
        >
          <rect width={SVG_W} height={SVG_H} fill="#0a0a14" />
          <line
            x1={40}
            y1={AXIS_Y}
            x2={RIGHT_EDGE}
            y2={AXIS_Y}
            stroke="#777"
            strokeDasharray="4 4"
          />
          <LensShape type={lensType} />
          <ObjectArrow x={objectX} tipY={objectTopY} color="#22c55e" label="物体" />
          {result.imageDist !== null ? (
            <ObjectArrow
              x={imageX}
              tipY={imageTopY}
              color="#ef4444"
              label={result.isVirtual ? "虚像" : "实像"}
              virtual={result.isVirtual}
            />
          ) : (
            <text x={LENS_X} y={30} textAnchor="middle" fill="#f5f6fa" fontSize={13}>
              物体在焦平面：出射光平行，无有限像距
            </text>
          )}
          <g fill="none" strokeWidth={1.5}>
            <path
              d={`M ${objectX} ${objectTopY} L ${LENS_X} ${objectTopY} L ${RIGHT_EDGE} ${rightParallelY}`}
              stroke="#fbbf24"
            />
            <path
              d={`M ${objectX} ${objectTopY} L ${LENS_X} ${AXIS_Y} L ${RIGHT_EDGE} ${rightCentreY}`}
              stroke="#a855f7"
            />
            {result.isVirtual ? (
              <g strokeDasharray="5 4" opacity={0.65}>
                <path d={`M ${LENS_X} ${objectTopY} L ${imageX} ${imageTopY}`} stroke="#fbbf24" />
                <path d={`M ${LENS_X} ${AXIS_Y} L ${imageX} ${imageTopY}`} stroke="#a855f7" />
              </g>
            ) : null}
          </g>
          {[-1, 1].map((side) => {
            const x = LENS_X + side * focalLength * scale;
            const label = side * result.focalLength > 0 ? "F′" : "F";
            return (
              <g key={side} fill="#60a5fa">
                <circle cx={x} cy={AXIS_Y} r={4} fill="none" stroke="#60a5fa" />
                <text x={x} y={AXIS_Y + 16} textAnchor="middle" fontSize={10}>
                  {label}
                </text>
              </g>
            );
          })}
          <text x={RIGHT_EDGE} y={AXIS_Y - 10} textAnchor="end" fill="#aaa" fontSize={11}>
            光轴 · 光向右传播
          </text>
          <text x={40} y={SVG_H - 12} fill="#aaa" fontSize={10}>
            自动缩放：{scale.toFixed(3)} 图单位/mm；透镜外形为符号
          </text>
        </svg>
      </ZoomableExperimentDiagram>
      <div className="text-fg-muted flex flex-wrap items-center gap-4 text-xs">
        <span>黄：平行入射光</span>
        <span>紫：过光心直线</span>
        <span>虚线：反向延长线，非光传播</span>
      </div>
      <div className="border-accent-cool/20 bg-accent-cool/5 text-accent-cool rounded-lg border px-4 py-2 font-mono text-xs">
        1/f = 1/d_o + 1/d_i；m = −d_i/d_o；f = {result.focalLength} mm
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-fg-disabled/30 bg-bg-panel/50 space-y-3 rounded-xl border p-4">
          <h3 className="text-fg-secondary text-sm font-semibold">参数调节</h3>
          {controls.map((control) => (
            <div key={control.key} className="flex items-center gap-3">
              <label
                htmlFor={`${controlId}-${control.key}`}
                className="text-fg-muted w-20 shrink-0 text-xs"
              >
                {control.label}
              </label>
              <input
                id={`${controlId}-${control.key}`}
                type="range"
                min={control.min}
                max={control.max}
                step={5}
                value={control.value}
                onChange={(event) => control.set(Number(event.target.value))}
                className="accent-accent-cool min-w-0 flex-1"
              />
              <span className="text-fg-muted w-16 text-right font-mono text-xs">
                {control.value} mm
              </span>
            </div>
          ))}
        </div>
        <div className="border-fg-disabled/30 bg-bg-panel/50 space-y-2 rounded-xl border p-4 text-sm">
          <h3 className="text-fg-secondary font-semibold">成像计算</h3>
          <p className="text-fg-muted">
            像距 d_i：
            <span className="text-fg-primary font-mono">
              {result.imageDist === null ? "无有限值" : `${result.imageDist.toFixed(1)} mm`}
            </span>
          </p>
          <p className="text-fg-muted">
            放大率 m：
            <span className="text-accent-cool font-mono">
              {result.magnification === null ? "无有限值" : `${result.magnification.toFixed(2)}×`}
            </span>
          </p>
          <p className="text-fg-muted">
            像高（带符号）：
            <span className="text-fg-primary font-mono">
              {result.magnification === null
                ? "无有限值"
                : `${(objectHeight * result.magnification).toFixed(1)} mm`}
            </span>
          </p>
          <p className="text-accent-cool">
            {result.imageDist === null
              ? "出射光平行"
              : result.isVirtual
                ? "虚像 · 正立 · 同侧"
                : "实像 · 倒立 · 异侧"}
          </p>
        </div>
      </div>
      <p className="text-fg-muted text-xs leading-relaxed">
        采用同一介质两侧的理想薄透镜、近轴模型，忽略厚度、孔径与像差。物距为正；虚像像距为负。凸透镜可把物体放在焦内形成虚像；焦平面上的物点给出平行出射光，不能把无限像距画成有限箭头。
      </p>
    </div>
  );
}
