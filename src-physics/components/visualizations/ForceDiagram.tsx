'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/src-physics/lib/cn';

type Force = {
  id: string;
  label: string;
  x: number;
  y: number;
  magnitude: number;
  angle: number;
  color: string;
  adjustable: boolean;
  min?: number;
  max?: number;
};

type Scenario = {
  id: string;
  name: string;
  description: string;
  objectLabel: string;
  objectShape: 'rect' | 'circle' | 'triangle';
  objectX: number;
  objectY: number;
  inclineAngle?: number;
  forces: Force[];
};

const G = 9.8;

const SCENARIOS: Scenario[] = [
  {
    id: 'incline',
    name: '斜面上的木块',
    description: '物体在倾斜平面上受重力、法向力和摩擦力作用',
    objectLabel: 'm',
    objectShape: 'rect',
    objectX: 400,
    objectY: 280,
    inclineAngle: 30,
    forces: [
      { id: 'gravity', label: 'Fg', x: 400, y: 280, magnitude: 98, angle: 90, color: '#ef4444', adjustable: true, min: 10, max: 200 },
      { id: 'normal', label: 'Fn', x: 400, y: 280, magnitude: 84.87, angle: -60, color: '#3b82f6', adjustable: false },
      { id: 'friction', label: 'Ff', x: 400, y: 280, magnitude: 24.5, angle: -150, color: '#f97316', adjustable: true, min: 0, max: 60 },
    ],
  },
  {
    id: 'pulley',
    name: '滑轮系统',
    description: '通过轻质滑轮连接的两个物体，绳中张力相等',
    objectLabel: 'm₁',
    objectShape: 'rect',
    objectX: 300,
    objectY: 250,
    forces: [
      { id: 'gravity', label: 'Fg', x: 300, y: 250, magnitude: 98, angle: 90, color: '#ef4444', adjustable: true, min: 10, max: 200 },
      { id: 'tension', label: 'T', x: 300, y: 250, magnitude: 68.6, angle: -90, color: '#22c55e', adjustable: true, min: 0, max: 200 },
    ],
  },
  {
    id: 'freefall',
    name: '自由落体',
    description: '物体仅在重力作用下自由下落（忽略空气阻力）',
    objectLabel: 'm',
    objectShape: 'circle',
    objectX: 400,
    objectY: 250,
    forces: [
      { id: 'gravity', label: 'Fg', x: 400, y: 250, magnitude: 98, angle: 90, color: '#ef4444', adjustable: true, min: 10, max: 200 },
    ],
  },
  {
    id: 'spring',
    name: '弹簧系统',
    description: '物体连接在弹簧上，受弹力和重力作用',
    objectLabel: 'm',
    objectShape: 'rect',
    objectX: 400,
    objectY: 300,
    forces: [
      { id: 'gravity', label: 'Fg', x: 400, y: 300, magnitude: 49, angle: 90, color: '#ef4444', adjustable: true, min: 10, max: 200 },
      { id: 'spring', label: 'Fs', x: 400, y: 300, magnitude: 49, angle: -90, color: '#8b5cf6', adjustable: true, min: 0, max: 200 },
    ],
  },
];

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function arrowEndpoints(
  cx: number,
  cy: number,
  magnitude: number,
  angleDeg: number,
  scale: number,
): { x1: number; y1: number; x2: number; y2: number } {
  const len = magnitude * scale;
  const rad = degToRad(angleDeg);
  return {
    x1: cx,
    y1: cy,
    x2: cx + Math.cos(rad) * len,
    y2: cy + Math.sin(rad) * len,
  };
}

function computeNetForce(forces: Force[]): { fx: number; fy: number; magnitude: number; angle: number } {
  let fx = 0;
  let fy = 0;
  for (const f of forces) {
    const rad = degToRad(f.angle);
    fx += Math.cos(rad) * f.magnitude;
    fy += Math.sin(rad) * f.magnitude;
  }
  const magnitude = Math.sqrt(fx * fx + fy * fy);
  const angle = (Math.atan2(fy, fx) * 180) / Math.PI;
  return { fx, fy, magnitude, angle };
}

function ForceArrow({
  cx,
  cy,
  magnitude,
  angle,
  color,
  label,
  scale,
}: {
  cx: number;
  cy: number;
  magnitude: number;
  angle: number;
  color: string;
  label: string;
  scale: number;
}) {
  const { x1, y1, x2, y2 } = arrowEndpoints(cx, cy, magnitude, angle, scale);
  const headLen = 10;
  const rad = degToRad(angle);
  const ha1x = x2 - headLen * Math.cos(rad - 0.4);
  const ha1y = y2 - headLen * Math.sin(rad - 0.4);
  const ha2x = x2 - headLen * Math.cos(rad + 0.4);
  const ha2y = y2 - headLen * Math.sin(rad + 0.4);

  const labelOffset = 18;
  const lx = x2 + labelOffset * Math.cos(rad);
  const ly = y2 + labelOffset * Math.sin(rad);

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <polygon
        points={`${x2},${y2} ${ha1x},${ha1y} ${ha2x},${ha2y}`}
        fill={color}
      />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={14}
        fontWeight="bold"
      >
        {label}
      </text>
      <text
        x={lx}
        y={ly + 14}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={11}
        opacity={0.8}
      >
        {magnitude.toFixed(1)} N
      </text>
    </g>
  );
}

function ObjectShape({
  cx,
  cy,
  shape,
  label,
  inclineAngle,
}: {
  cx: number;
  cy: number;
  shape: 'rect' | 'circle' | 'triangle';
  label: string;
  inclineAngle?: number;
}) {
  const size = 40;
  if (shape === 'circle') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={size / 2} fill="#6b7280" stroke="#9ca3af" strokeWidth={2} />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={14} fontWeight="bold">
          {label}
        </text>
      </g>
    );
  }
  if (shape === 'triangle') {
    const s = size;
    const points = `${cx},${cy - s * 0.6} ${cx - s * 0.6},${cy + s * 0.4} ${cx + s * 0.6},${cy + s * 0.4}`;
    return (
      <g>
        <polygon points={points} fill="#6b7280" stroke="#9ca3af" strokeWidth={2} />
        <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={14} fontWeight="bold">
          {label}
        </text>
      </g>
    );
  }
  return (
    <g transform={inclineAngle ? `rotate(${inclineAngle}, ${cx}, ${cy})` : undefined}>
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        rx={4}
        fill="#6b7280"
        stroke="#9ca3af"
        strokeWidth={2}
      />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={14} fontWeight="bold">
        {label}
      </text>
    </g>
  );
}

function InclinePlane({ cx, cy, angle }: { cx: number; cy: number; angle: number }) {
  const len = 320;
  const rad = degToRad(angle);
  const x1 = cx - len / 2;
  const y1 = cy + (len / 2) * Math.tan(rad);
  const x2 = cx + len / 2;
  const y2 = cy - (len / 2) * Math.tan(rad);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4b5563" strokeWidth={3} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x1} y2={y1 + 80} stroke="#374151" strokeWidth={2} />
      <line x1={x1} y1={y1 + 80} x2={x2} y2={y2 + 80} stroke="#374151" strokeWidth={2} />
      <line x1={x2} y1={y2} x2={x2} y2={y2 + 80} stroke="#374151" strokeWidth={2} />
    </g>
  );
}

function SpringCoil({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const coils = 6;
  const coilWidth = 16;
  const totalH = y2 - y1;
  const step = totalH / coils;
  let d = `M ${x} ${y1}`;
  for (let i = 0; i < coils; i++) {
    const cy = y1 + step * (i + 0.5);
    d += ` Q ${x + coilWidth} ${cy} ${x} ${cy + step / 2}`;
    d += ` Q ${x - coilWidth} ${cy + step} ${x} ${cy + step}`;
  }
  return <path d={d} fill="none" stroke="#8b5cf6" strokeWidth={2.5} />;
}

function Slider({
  label,
  value,
  min,
  max,
  color,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  color: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-right text-sm font-medium" style={{ color }}>
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          accentColor: color,
          background: `linear-gradient(to right, ${color} ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <span className="w-16 text-right text-xs text-gray-400 tabular-nums">
        {value.toFixed(1)} N
      </span>
    </div>
  );
}

const DEFAULT_SCENARIO = SCENARIOS[0]!;

export function ForceDiagram({ className }: { className?: string }) {
  const [scenarioId, setScenarioId] = useState<string>(DEFAULT_SCENARIO.id);
  const [forces, setForces] = useState<Force[]>(DEFAULT_SCENARIO.forces);
  const [mass, setMass] = useState(10);
  const [animating, setAnimating] = useState(false);
  const [objectOffset, setObjectOffset] = useState({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const offsetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  const scenario = SCENARIOS.find(s => s.id === scenarioId) ?? DEFAULT_SCENARIO;

  const selectScenario = useCallback(
    (id: string) => {
      const s = SCENARIOS.find(sc => sc.id === id) ?? DEFAULT_SCENARIO;
      setScenarioId(id);
      setForces(s.forces);
      setAnimating(false);
      setObjectOffset({ x: 0, y: 0 });
      offsetRef.current = { x: 0, y: 0 };
      velocityRef.current = { x: 0, y: 0 };
      if (animRef.current) cancelAnimationFrame(animRef.current);
    },
    [],
  );

  const updateForceMagnitude = useCallback((forceId: string, value: number) => {
    setForces(prev =>
      prev.map(f => {
        if (f.id !== forceId) return f;
        const updated = { ...f, magnitude: value };
        if (scenarioId === 'incline' && f.id === 'gravity') {
          const rad = degToRad(30);
          const fgParallel = value * Math.sin(rad);
          const normalForce = value * Math.cos(rad);
          return updated;
        }
        return updated;
      }),
    );
  }, [scenarioId]);

  const netForce = computeNetForce(forces);
  const acceleration = mass > 0 ? netForce.magnitude / mass : 0;

  const scale = 1.8;
  const svgW = 800;
  const svgH = 500;
  const cx = scenario.objectX + objectOffset.x;
  const cy = scenario.objectY + objectOffset.y;

  const handleAnimate = useCallback(() => {
    if (animating) {
      setAnimating(false);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    setAnimating(true);
    setObjectOffset({ x: 0, y: 0 });
    offsetRef.current = { x: 0, y: 0 };
    velocityRef.current = { x: 0, y: 0 };

    const nf = computeNetForce(forces);
    const ax = mass > 0 ? (nf.fx / mass) * 15 : 0;
    const ay = mass > 0 ? (nf.fy / mass) * 15 : 0;
    const damping = 0.995;

    let lastTime = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      velocityRef.current.x += ax * dt;
      velocityRef.current.y += ay * dt;
      velocityRef.current.x *= damping;
      velocityRef.current.y *= damping;
      offsetRef.current.x += velocityRef.current.x * dt;
      offsetRef.current.y += velocityRef.current.y * dt;

      const maxDrift = 120;
      offsetRef.current.x = Math.max(-maxDrift, Math.min(maxDrift, offsetRef.current.x));
      offsetRef.current.y = Math.max(-maxDrift, Math.min(maxDrift, offsetRef.current.y));

      setObjectOffset({ ...offsetRef.current });
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, [animating, forces, mass]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const netArrow = netForce.magnitude > 0.5 ? (
    <ForceArrow
      cx={cx}
      cy={cy}
      magnitude={netForce.magnitude}
      angle={netForce.angle}
      color="#a855f7"
      label="Fnet"
      scale={scale}
    />
  ) : null;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => selectScenario(s.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              s.id === scenarioId
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400">{scenario.description}</p>

      <div className="rounded-xl border border-gray-700 bg-gray-900/60 overflow-hidden">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto"
          style={{ minHeight: 300 }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" strokeWidth={0.5} />
            </pattern>
          </defs>
          <rect width={svgW} height={svgH} fill="#111827" />
          <rect width={svgW} height={svgH} fill="url(#grid)" />

          {scenarioId === 'incline' && scenario.inclineAngle !== undefined && (
            <InclinePlane cx={scenario.objectX} cy={scenario.objectY + 30} angle={scenario.inclineAngle} />
          )}

          {scenarioId === 'spring' && (
            <SpringCoil x={cx} y1={cy - 140} y2={cy - 20} />
          )}

          {forces.map(f => (
            <ForceArrow
              key={f.id}
              cx={cx}
              cy={cy}
              magnitude={f.magnitude}
              angle={f.angle}
              color={f.color}
              label={f.label}
              scale={scale}
            />
          ))}

          {netArrow}

          <ObjectShape
            cx={cx}
            cy={cy}
            shape={scenario.objectShape}
            label={scenario.objectLabel}
            inclineAngle={scenarioId === 'incline' ? scenario.inclineAngle : undefined}
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-200">力的调节</h3>
          {forces.map(f =>
            f.adjustable ? (
              <Slider
                key={f.id}
                label={f.label}
                value={f.magnitude}
                min={f.min ?? 0}
                max={f.max ?? 200}
                color={f.color}
                onChange={v => updateForceMagnitude(f.id, v)}
              />
            ) : null,
          )}
          <div className="pt-2 border-t border-gray-700">
            <Slider
              label="m"
              value={mass}
              min={1}
              max={50}
              color="#9ca3af"
              onChange={setMass}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-200">计算结果</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">合力 Fx</span>
              <span className="text-gray-200 tabular-nums">{netForce.fx.toFixed(2)} N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">合力 Fy</span>
              <span className="text-gray-200 tabular-nums">{netForce.fy.toFixed(2)} N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-400 font-medium">合力 |F|</span>
              <span className="text-purple-300 font-medium tabular-nums">{netForce.magnitude.toFixed(2)} N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">质量 m</span>
              <span className="text-gray-200 tabular-nums">{mass.toFixed(1)} kg</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700">
              <span className="text-purple-400 font-medium">加速度 a</span>
              <span className="text-purple-300 font-medium tabular-nums">{acceleration.toFixed(2)} m/s²</span>
            </div>
          </div>

          <button
            onClick={handleAnimate}
            className={cn(
              'w-full mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              animating
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white',
            )}
          >
            {animating ? '停止动画' : '运行动画'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 bg-red-500 rounded" /> 重力
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 bg-blue-500 rounded" /> 法向力
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 bg-orange-500 rounded" /> 摩擦力
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 bg-green-500 rounded" /> 张力
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 bg-purple-500 rounded" /> 合力
        </span>
      </div>
    </div>
  );
}
