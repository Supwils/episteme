"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/src-physics/lib/cn";

type ComponentType = "battery" | "resistor" | "wire";

interface CircuitComponent {
  id: string;
  type: ComponentType;
  value: number;
  label: string;
}

const DEFAULT_CIRCUIT: CircuitComponent[] = [
  { id: "bat1", type: "battery", value: 12, label: "V₁" },
  { id: "r1", type: "resistor", value: 100, label: "R₁" },
  { id: "r2", type: "resistor", value: 200, label: "R₂" },
];

function computeCircuit(components: CircuitComponent[]): {
  totalResistance: number;
  current: number;
  voltageDrops: { id: string; label: string; voltage: number; percent: number }[];
  totalVoltage: number;
  totalPower: number;
} {
  const batteries = components.filter((c) => c.type === "battery");
  const resistors = components.filter((c) => c.type === "resistor");

  const totalVoltage = batteries.reduce((sum, b) => sum + b.value, 0);
  const totalResistance = resistors.reduce((sum, r) => sum + r.value, 0);

  const current = totalResistance > 0 ? totalVoltage / totalResistance : 0;

  const voltageDrops = resistors.map((r) => ({
    id: r.id,
    label: r.label,
    voltage: current * r.value,
    percent: totalVoltage > 0 ? (current * r.value / totalVoltage) * 100 : 0,
  }));

  const totalPower = totalVoltage * current;

  return { totalResistance, current, voltageDrops, totalVoltage, totalPower };
}

function BatterySymbol({ x, y, voltage }: { x: number; y: number; voltage: number }) {
  return (
    <g>
      <line x1={x - 8} y1={y - 12} x2={x - 8} y2={y + 12} stroke="#22c55e" strokeWidth={3} />
      <line x1={x + 8} y1={y - 6} x2={x + 8} y2={y + 6} stroke="#22c55e" strokeWidth={2} />
      <line x1={x - 8} y1={y} x2={x - 20} y2={y} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={x + 8} y1={y} x2={x + 20} y2={y} stroke="#22c55e" strokeWidth={1.5} />
      <text x={x} y={y - 18} textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="monospace">
        {voltage}V
      </text>
      <text x={x - 14} y={y + 4} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">
        −
      </text>
      <text x={x + 14} y={y + 4} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">
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
      <text x={x} y={y - 14} textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="monospace">
        {resistance}Ω
      </text>
    </g>
  );
}

function WirePath({ points }: { points: { x: number; y: number }[] }) {
  if (points.length < 2) return null;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return <path d={d} fill="none" stroke="#555" strokeWidth={1.5} />;
}

interface CircuitBuilderProps {
  className?: string;
}

export function CircuitBuilder({ className }: CircuitBuilderProps) {
  const [components, setComponents] = useState<CircuitComponent[]>(DEFAULT_CIRCUIT);
  const [newType, setNewType] = useState<ComponentType>("resistor");
  const [newValue, setNewValue] = useState(100);

  const result = useMemo(() => computeCircuit(components), [components]);

  const addComponent = useCallback(() => {
    const count = components.filter((c) => c.type === newType).length;
    const label = newType === "battery" ? `V${count + 1}` : `R${count + 1}`;
    setComponents((prev) => [
      ...prev,
      {
        id: `${newType}-${Date.now()}`,
        type: newType,
        value: newValue,
        label,
      },
    ]);
  }, [components, newType, newValue]);

  const removeComponent = useCallback((id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateValue = useCallback((id: string, value: number) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, value } : c)));
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
      <div className="rounded-xl border border-fg-disabled/30 bg-bg-deep overflow-hidden">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          <rect width={svgW} height={svgH} fill="#0a0a14" />

          <WirePath points={[
            { x: loopPad, y: loopPad },
            { x: loopPad + loopW, y: loopPad },
          ]} />
          <WirePath points={[
            { x: loopPad + loopW, y: loopPad },
            { x: loopPad + loopW, y: loopPad + loopH },
          ]} />
          <WirePath points={[
            { x: loopPad + loopW, y: loopPad + loopH },
            { x: loopPad, y: loopPad + loopH },
          ]} />
          <WirePath points={[
            { x: loopPad, y: loopPad + loopH },
            { x: loopPad, y: loopPad },
          ]} />

          {batteries.map((bat, i) => {
            const y = loopPad + ((i + 1) / (batteries.length + 1)) * loopH;
            return (
              <BatterySymbol
                key={bat.id}
                x={loopPad}
                y={y}
                voltage={bat.value}
              />
            );
          })}

          {resistors.length <= 2 ? (
            resistors.map((res, i) => {
              const x = loopPad + ((i + 1) / (resistors.length + 1)) * loopW;
              return (
                <ResistorSymbol
                  key={res.id}
                  x={x}
                  y={loopPad}
                  resistance={res.value}
                />
              );
            })
          ) : (
            <>
              <ResistorSymbol
                x={loopPad + loopW / 3}
                y={loopPad}
                resistance={resistors[0]!.value}
              />
              <ResistorSymbol
                x={loopPad + (2 * loopW) / 3}
                y={loopPad}
                resistance={resistors[1]!.value}
              />
              <text
                x={loopPad + loopW / 2}
                y={loopPad + 30}
                textAnchor="middle"
                fill="#555"
                fontSize="9"
                fontFamily="monospace"
              >
                + {resistors.length - 2} 更多电阻
              </text>
            </>
          )}

          <text x={loopPad + loopW / 2} y={svgH - 10} textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace">
            串联电路 · Series Circuit
          </text>

          {result.current > 0 && (
            <g>
              <text x={loopPad + loopW / 2} y={loopPad - 10} textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">
                I = {result.current.toFixed(4)} A
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 px-4 py-2">
        <p className="font-mono text-xs text-accent-cool">
          V = IR · {result.totalVoltage}V = {result.current.toFixed(4)}A × {result.totalResistance}Ω
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-fg-secondary">添加元件</h3>
          <div className="flex gap-2">
            {(["battery", "resistor"] as ComponentType[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setNewType(t);
                  setNewValue(t === "battery" ? 12 : 100);
                }}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  newType === t
                    ? "bg-accent-cool/20 text-accent-cool"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700",
                )}
              >
                {t === "battery" ? "电池" : "电阻"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="w-16 shrink-0 text-xs text-fg-muted">
              {newType === "battery" ? "电压 (V)" : "电阻 (Ω)"}
            </label>
            <input
              type="range"
              min={newType === "battery" ? 1 : 10}
              max={newType === "battery" ? 24 : 1000}
              step={newType === "battery" ? 1 : 10}
              value={newValue}
              onChange={(e) => setNewValue(Number(e.target.value))}
              className="flex-1 accent-accent-cool"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">
              {newValue} {newType === "battery" ? "V" : "Ω"}
            </span>
          </div>
          <button
            onClick={addComponent}
            className="w-full rounded-lg bg-accent-cool/20 px-4 py-2 text-sm text-accent-cool transition-colors hover:bg-accent-cool/30"
          >
            添加 {newType === "battery" ? "电池" : "电阻"}
          </button>

          <div className="space-y-2 pt-2 border-t border-fg-disabled/30">
            <p className="text-xs text-fg-muted">当前元件</p>
            {components.map((comp) => (
              <div key={comp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: comp.type === "battery" ? "#22c55e" : "#f97316" }}
                  />
                  <span className="font-mono text-xs text-fg-primary">
                    {comp.label}: {comp.value} {comp.type === "battery" ? "V" : "Ω"}
                  </span>
                </div>
                <button
                  onClick={() => removeComponent(comp.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-fg-secondary">电路计算 (欧姆定律)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-fg-muted">总电压 V</span>
              <span className="font-mono text-green-400">{result.totalVoltage.toFixed(2)} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">总电阻 R</span>
              <span className="font-mono text-orange-400">{result.totalResistance.toFixed(2)} Ω</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-fg-disabled/30">
              <span className="text-accent-cool font-medium">电流 I</span>
              <span className="font-mono text-accent-cool font-medium">{result.current.toFixed(4)} A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">总功率 P</span>
              <span className="font-mono text-fg-primary">{result.totalPower.toFixed(4)} W</span>
            </div>
          </div>

          {result.voltageDrops.length > 0 && (
            <div className="pt-2 border-t border-fg-disabled/30 space-y-2">
              <p className="text-xs text-fg-muted">各电阻电压降</p>
              {result.voltageDrops.map((vd) => (
                <div key={vd.id} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-fg-primary">{vd.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{ width: `${vd.percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-orange-400 w-16 text-right">
                      {vd.voltage.toFixed(2)} V
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
        <p className="text-xs text-fg-secondary leading-relaxed">
          <span className="font-medium text-accent-cool">欧姆定律：</span>
          V = IR。在串联电路中，电流处处相等，各电阻的电压降之和等于电源电压。
          电压降按电阻值成比例分配——电阻越大，分得的电压越多。
        </p>
      </div>
    </div>
  );
}
