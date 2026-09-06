"use client";

import { useMemo, useState } from "react";
import {
  lineStroke,
  solveDcPowerFlow,
  TEACHING_BUSES,
  TEACHING_LINES,
} from "@/lib/engineering/dc-power-flow";
import { LabMetric, LabSlider } from "./lab-ui";

const VIEW = { w: 268, h: 196 };

export function GridFlowSimulator() {
  const [thermalMw, setThermalMw] = useState(70);
  const [windMw, setWindMw] = useState(25);
  const [cityMw, setCityMw] = useState(55);
  const [industryMw, setIndustryMw] = useState(40);

  const result = useMemo(
    () => solveDcPowerFlow({ thermalMw, windMw, cityMw, industryMw }),
    [thermalMw, windMw, cityMw, industryMw]
  );

  const busById = new Map(TEACHING_BUSES.map((bus) => [bus.id, bus]));
  const maxLoading = Math.max(...result.lineFlows.map((line) => line.loading));

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="h-auto w-full"
        role="img"
        aria-label="五节点直流潮流教学电网，线路颜色表示负载率"
      >
        {TEACHING_LINES.map((line) => {
          const flow = result.lineFlows.find((item) => item.id === line.id)!;
          const from = busById.get(line.from)!;
          const to = busById.get(line.to)!;
          return (
            <g key={line.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={lineStroke(flow.loading)}
                strokeWidth={flow.overloaded ? 4 : 2.5}
              />
            </g>
          );
        })}
        {TEACHING_BUSES.map((bus) => (
          <g key={bus.id}>
            <circle
              cx={bus.x}
              cy={bus.y}
              r={11}
              fill="var(--color-bg-elevated)"
              stroke="var(--color-fg-secondary)"
              strokeWidth="1.5"
            />
            <text
              x={bus.x}
              y={bus.y + 22}
              textAnchor="middle"
              fill="var(--color-fg-secondary)"
              fontSize="8"
            >
              {bus.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <LabSlider
          label="火电出力"
          value={thermalMw}
          min={10}
          max={120}
          step={1}
          onChange={setThermalMw}
          display={`${thermalMw} MW`}
          hint="靠近城市的可控电源"
          accent="#e08a3c"
        />
        <LabSlider
          label="风电出力"
          value={windMw}
          min={0}
          max={90}
          step={1}
          onChange={setWindMw}
          display={`${windMw} MW`}
          hint="远处、波动的注入"
          accent="#5b9da0"
        />
        <LabSlider
          label="城市负荷"
          value={cityMw}
          min={10}
          max={100}
          step={1}
          onChange={setCityMw}
          display={`${cityMw} MW`}
          hint="用电集中的一端"
          accent="#4f9cf0"
        />
        <LabSlider
          label="工业负荷"
          value={industryMw}
          min={10}
          max={90}
          step={1}
          onChange={setIndustryMw}
          display={`${industryMw} MW`}
          hint="把潮流推向南走廊"
          accent="#8a78bd"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <LabMetric
          label="平衡节点出力"
          value={`${result.slackMw.toFixed(0)} MW`}
          sub={result.slackMw >= 0 ? "正在补足差额" : "正在吸收多余功率"}
        />
        <LabMetric
          label="最重走廊负载率"
          value={`${Math.round(maxLoading * 100)}%`}
          sub={maxLoading > 1 ? "已超过教学热稳限额" : "仍在限额内"}
        />
        <LabMetric label="过载线路" value={`${result.overloadCount} 条`} sub="红色线段" />
        <LabMetric label="模型" value="直流潮流" sub="角度差 / 电抗 = 有功" />
      </div>

      <ul className="text-fg-muted mt-4 space-y-1 text-[11px]" aria-label="各线路潮流">
        {result.lineFlows.map((line) => (
          <li key={line.id}>
            {line.id}：{line.mw.toFixed(1)} MW，负载率 {(line.loading * 100).toFixed(0)}%
            {line.overloaded ? "（过载）" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
