"use client";

import { useState, useMemo, useCallback, useRef, useId } from "react";
import { cn } from "@/subjects/physics/lib/cn";
import { ZoomableExperimentDiagram } from "./ZoomableExperimentDiagram";

import { computeSeriesCircuit, type CircuitComponent } from "./experiment-models";

type ComponentType = CircuitComponent["type"];

const DEFAULT_CIRCUIT: CircuitComponent[] = [
  { id: "bat1", type: "battery", value: 12, label: "V₁" },
  { id: "r1", type: "resistor", value: 100, label: "R₁" },
  { id: "r2", type: "resistor", value: 200, label: "R₂" },
];

function BatterySymbol({ x, y, voltage }: { x: number; y: number; voltage: number }) {
  return (
    <g>
      <line x1={x + 8} y1={y - 12} x2={x + 8} y2={y + 12} stroke="#22c55e" strokeWidth={3} />
      <line x1={x - 8} y1={y - 6} x2={x - 8} y2={y + 6} stroke="#22c55e" strokeWidth={2} />
      <line x1={x - 8} y1={y} x2={x - 20} y2={y} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={x + 8} y1={y} x2={x + 20} y2={y} stroke="#22c55e" strokeWidth={1.5} />
      <text
        x={x}
        y={y - 18}
        textAnchor="middle"
        fill="#22c55e"
        fontSize="10"
        fontFamily="monospace"
      >
        {voltage}V
      </text>
      <text
        x={x - 14}
        y={y + 4}
        textAnchor="middle"
        fill="#22c55e"
        fontSize="8"
        fontFamily="monospace"
      >
        −
      </text>
      <text
        x={x + 14}
        y={y + 4}
        textAnchor="middle"
        fill="#22c55e"
        fontSize="8"
        fontFamily="monospace"
      >
        +
      </text>
    </g>
  );
}

function ResistorSymbol({ x, y, resistance }: { x: number; y: number; resistance: number }) {
  const w = 40;
  const h = 16;
  const zigzags = 5;
  let d = `M ${x - w / 2} ${y}`;
  for (let i = 0; i < zigzags; i++) {
    const px = x - w / 2 + ((i + 0.25) / zigzags) * w;
    const py = y - h / 2;
    const px2 = x - w / 2 + ((i + 0.75) / zigzags) * w;
    const py2 = y + h / 2;
    d += ` L ${px} ${py} L ${px2} ${py2}`;
  }
  d += ` L ${x + w / 2} ${y}`;

  return (
    <g>
      <path d={d} fill="none" stroke="#f97316" strokeWidth={1.5} />
      <line x1={x - w / 2 - 20} y1={y} x2={x - w / 2} y2={y} stroke="#f97316" strokeWidth={1.5} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2 + 20} y2={y} stroke="#f97316" strokeWidth={1.5} />
      <text
        x={x}
        y={y - 14}
        textAnchor="middle"
        fill="#f97316"
        fontSize="10"
        fontFamily="monospace"
      >
        {resistance}Ω
      </text>
    </g>
  );
}

function WirePath({ points }: { points: { x: number; y: number }[] }) {
  if (points.length < 2) return null;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return <path d={d} fill="none" stroke="#94a3b8" strokeWidth={1.5} />;
}

interface CircuitBuilderProps {
  className?: string;
}

export function CircuitBuilder({ className }: CircuitBuilderProps) {
  const [components, setComponents] = useState<CircuitComponent[]>(DEFAULT_CIRCUIT);
  const [newType, setNewType] = useState<ComponentType>("resistor");
  const [newValue, setNewValue] = useState(100);

  const result = useMemo(() => computeSeriesCircuit(components), [components]);
  const nextId = useRef(DEFAULT_CIRCUIT.length + 1);
  const valueId = useId();

  const addComponent = useCallback(() => {
    const serial = nextId.current++;
    setComponents((previous) => [
      ...previous,
      {
        id: `${newType}-${serial}`,
        type: newType,
        value: newValue,
        label: `${newType === "battery" ? "V" : "R"}${serial}`,
      },
    ]);
  }, [newType, newValue]);

  const removeComponent = useCallback((id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const svgW = 700;
  const svgH = 300;
  const loopPad = 60;
  const loopW = svgW - loopPad * 2;
  const loopH = svgH - loopPad * 2;

  const batteries = components.filter((c) => c.type === "battery");
  const resistors = components.filter((c) => c.type === "resistor");

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ZoomableExperimentDiagram
        title="串联电路图"
        viewBoxWidth={svgW}
        viewBoxHeight={svgH}
        minimumFontSize={8}
      >
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full"
          role="img"
          aria-label="同向理想电源与电阻的等效串联回路，元件之间导线相连，元件内部没有旁路"
        >
          <rect width={svgW} height={svgH} fill="#0a0a14" />

          {/* Wires stop at component terminals; no line shorts across a symbol. */}
          <WirePath
            points={[
              { x: loopPad, y: loopPad },
              { x: 180, y: loopPad },
            ]}
          />
          <WirePath
            points={[
              { x: 220, y: loopPad },
              { x: 390, y: loopPad },
            ]}
          />
          <WirePath
            points={[
              { x: 470, y: loopPad },
              { x: loopPad + loopW, y: loopPad },
              { x: loopPad + loopW, y: loopPad + loopH },
              { x: loopPad, y: loopPad + loopH },
              { x: loopPad, y: loopPad },
            ]}
          />
          {batteries.length > 0 ? (
            <BatterySymbol x={200} y={loopPad} voltage={result.totalVoltage} />
          ) : (
            <WirePath
              points={[
                { x: 180, y: loopPad },
                { x: 220, y: loopPad },
              ]}
            />
          )}
          {resistors.length > 0 ? (
            <ResistorSymbol x={430} y={loopPad} resistance={result.totalResistance} />
          ) : (
            <WirePath
              points={[
                { x: 390, y: loopPad },
                { x: 470, y: loopPad },
              ]}
            />
          )}
          <text x={200} y={loopPad + 35} textAnchor="middle" fill="#86efac" fontSize={10}>
            {batteries.length}个同向电源的等效值
          </text>
          <text x={430} y={loopPad + 35} textAnchor="middle" fill="#fdba74" fontSize={10}>
            {resistors.length}个电阻的串联等效值
          </text>
          {result.current !== null && result.current > 0 ? (
            <g fill="#60a5fa">
              <path d={`M ${loopPad + loopW / 2 + 20} ${loopPad + loopH} l 12 -5 v 10 Z`} />
              <text
                x={loopPad + loopW / 2}
                y={loopPad + loopH - 15}
                textAnchor="middle"
                fontSize={12}
              >
                I = {result.current.toFixed(4)} A（约定电流方向）
              </text>
            </g>
          ) : null}
          <text
            x={loopPad + loopW / 2}
            y={svgH - 10}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="9"
            fontFamily="monospace"
          >
            等效串联回路 · 理想电源同向叠加
          </text>
        </svg>
      </ZoomableExperimentDiagram>

      <div className="border-accent-cool/20 bg-accent-cool/5 rounded-lg border px-4 py-2">
        <p className="text-accent-cool font-mono text-xs">
          {result.shortCircuit
            ? "短路：理想非零电源与零电阻回路没有有限直流解；真实电流还需内阻等模型。"
            : `V = IR · ${result.totalVoltage} V = ${(result.current ?? 0).toFixed(4)} A × ${result.totalResistance} Ω`}
          {batteries.length === 0 ? "（无电源，忽略初始储能）" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-fg-disabled/30 bg-bg-panel/50 space-y-3 rounded-xl border p-4">
          <h3 className="text-fg-secondary text-sm font-semibold">添加元件</h3>
          <div className="flex gap-2">
            {(["battery", "resistor"] as ComponentType[]).map((t) => (
              <button
                type="button"
                aria-pressed={newType === t}
                key={t}
                onClick={() => {
                  setNewType(t);
                  setNewValue(t === "battery" ? 12 : 100);
                }}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  newType === t
                    ? "bg-accent-cool/20 text-accent-cool"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {t === "battery" ? "电池" : "电阻"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor={valueId} className="text-fg-muted w-16 shrink-0 text-xs">
              {newType === "battery" ? "电压 (V)" : "电阻 (Ω)"}
            </label>
            <input
              id={valueId}
              type="range"
              min={newType === "battery" ? 1 : 10}
              max={newType === "battery" ? 24 : 1000}
              step={newType === "battery" ? 1 : 10}
              value={newValue}
              onChange={(e) => setNewValue(Number(e.target.value))}
              className="accent-accent-cool min-w-0 flex-1"
            />
            <span className="text-fg-muted w-16 text-right font-mono text-xs">
              {newValue} {newType === "battery" ? "V" : "Ω"}
            </span>
          </div>
          <button
            type="button"
            onClick={addComponent}
            className="bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30 w-full rounded-lg px-4 py-2 text-sm transition-colors"
          >
            添加 {newType === "battery" ? "电池" : "电阻"}
          </button>

          <div className="border-fg-disabled/30 space-y-2 border-t pt-2">
            <p className="text-fg-muted text-xs">当前元件（全部串联，电源同向）</p>
            {components.map((comp) => (
              <div key={comp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: comp.type === "battery" ? "#22c55e" : "#f97316" }}
                  />
                  <span className="text-fg-primary font-mono text-xs">
                    {comp.label}: {comp.value} {comp.type === "battery" ? "V" : "Ω"}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={`删除${comp.label}`}
                  onClick={() => removeComponent(comp.id)}
                  className="text-xs text-red-400 transition-colors hover:text-red-300"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-fg-disabled/30 bg-bg-panel/50 space-y-3 rounded-xl border p-4">
          <h3 className="text-fg-secondary text-sm font-semibold">电路计算 (欧姆定律)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-fg-muted">总电压 V</span>
              <span className="font-mono text-green-400">{result.totalVoltage.toFixed(2)} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">总电阻 R</span>
              <span className="font-mono text-orange-400">
                {result.totalResistance.toFixed(2)} Ω
              </span>
            </div>
            <div className="border-fg-disabled/30 flex justify-between border-t pt-2">
              <span className="text-accent-cool font-medium">电流 I</span>
              <span className="text-accent-cool font-mono font-medium">
                {result.current === null ? "无有限解" : `${result.current.toFixed(4)} A`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">总功率 P</span>
              <span className="text-fg-primary font-mono">
                {result.totalPower === null
                  ? "不可由此模型求得"
                  : `${result.totalPower.toFixed(4)} W`}
              </span>
            </div>
          </div>

          {result.voltageDrops.length > 0 && (
            <div className="border-fg-disabled/30 space-y-2 border-t pt-2">
              <p className="text-fg-muted text-xs">各电阻电压降</p>
              {result.voltageDrops.map((vd) => (
                <div key={vd.id} className="flex items-center justify-between">
                  <span className="text-fg-primary font-mono text-xs">{vd.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{ width: `${vd.percent}%` }}
                      />
                    </div>
                    <span className="w-16 text-right font-mono text-xs text-orange-400">
                      {vd.voltage.toFixed(2)} V
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-accent-cool/20 bg-accent-cool/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs leading-relaxed">
          <span className="text-accent-cool font-medium">欧姆定律：</span>
          本模型采用线性电阻与同向理想电源，忽略内阻、导线电阻和初始储能。V =
          IR。在串联电路中，电流处处相等，各电阻的电压降之和等于电源电压。
          电压降按电阻值成比例分配——电阻越大，分得的电压越多。
        </p>
      </div>
    </div>
  );
}
