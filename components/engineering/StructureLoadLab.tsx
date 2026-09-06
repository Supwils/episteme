"use client";

import { useMemo, useState } from "react";
import { beamDiagram, TEACHING_ALLOWABLE_MOMENT_KNM } from "@/lib/engineering/simple-beam";
import { LabMetric, LabSlider } from "./lab-ui";

const W = 320;
const H = 168;
const PAD = { l: 28, r: 12, t: 18, b: 28 };

export function StructureLoadLab() {
  const [loadKn, setLoadKn] = useState(80);
  const [positionM, setPositionM] = useState(4);
  const spanM = 10;
  const result = useMemo(() => beamDiagram(loadKn, spanM, positionM), [loadKn, positionM]);
  const over = result.maxMomentKnm > TEACHING_ALLOWABLE_MOMENT_KNM;

  const xOf = (xm: number) => PAD.l + (xm / spanM) * (W - PAD.l - PAD.r);
  const yMoment = (m: number) => {
    const peak = Math.max(TEACHING_ALLOWABLE_MOMENT_KNM, result.maxMomentKnm, 1);
    return PAD.t + (1 - m / peak) * (H - PAD.t - PAD.b);
  };
  const momentPath = result.points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${xOf(point.x)} ${yMoment(point.moment)}`)
    .join(" ");

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="简支梁弯矩图">
        <line
          x1={PAD.l}
          y1={H - PAD.b}
          x2={W - PAD.r}
          y2={H - PAD.b}
          stroke="var(--color-fg-muted)"
          strokeWidth="2"
        />
        <polygon
          points={`${PAD.l},${H - PAD.b} ${PAD.l - 6},${H - PAD.b + 10} ${PAD.l + 6},${H - PAD.b + 10}`}
          fill="var(--color-fg-muted)"
        />
        <polygon
          points={`${W - PAD.r},${H - PAD.b} ${W - PAD.r - 6},${H - PAD.b + 10} ${W - PAD.r + 6},${H - PAD.b + 10}`}
          fill="var(--color-fg-muted)"
        />
        <path d={momentPath} fill="none" stroke={over ? "#c25b5b" : "#5b9da0"} strokeWidth="2" />
        <line
          x1={PAD.l}
          y1={yMoment(TEACHING_ALLOWABLE_MOMENT_KNM)}
          x2={W - PAD.r}
          y2={yMoment(TEACHING_ALLOWABLE_MOMENT_KNM)}
          stroke="#e08a3c"
          strokeDasharray="4 3"
        />
        <line
          x1={xOf(positionM)}
          y1={PAD.t}
          x2={xOf(positionM)}
          y2={H - PAD.b}
          stroke="var(--color-fg-secondary)"
          strokeDasharray="2 3"
        />
      </svg>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <LabSlider
          label="集中力"
          value={loadKn}
          min={20}
          max={200}
          step={1}
          onChange={setLoadKn}
          display={`${loadKn} kN`}
          hint="向下的教学荷载，不是施工吊重"
          accent="#c08a52"
        />
        <LabSlider
          label="作用位置"
          value={positionM}
          min={1}
          max={9}
          step={0.1}
          onChange={setPositionM}
          display={`${positionM.toFixed(1)} m`}
          hint={`跨度 ${spanM} m 简支梁，从左支座量起`}
          accent="#4f9cf0"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <LabMetric
          label="左支座反力"
          value={`${result.leftKn.toFixed(1)} kN`}
          sub="Ra = P (L−a) / L"
        />
        <LabMetric
          label="右支座反力"
          value={`${result.rightKn.toFixed(1)} kN`}
          sub="Rb = P a / L"
        />
        <LabMetric
          label="最大弯矩"
          value={`${result.maxMomentKnm.toFixed(0)} kN·m`}
          sub={`约在 ${result.maxMomentXm.toFixed(1)} m`}
        />
        <LabMetric
          label="教学容许弯矩"
          value={`${TEACHING_ALLOWABLE_MOMENT_KNM} kN·m`}
          sub={over ? "已越过虚线" : "弯矩图在虚线之下"}
        />
      </div>
    </div>
  );
}
