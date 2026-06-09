"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/src-physics/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface PlanetData {
  name: string;
  nameZh: string;
  color: string;
  radius: number;
  orbitRadius: number;
  orbitPeriod: number;
  eccentricity: number;
  diameter: string;
  mass: string;
  distance: string;
  orbitalPeriod: string;
  funFact: string;
}

const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    nameZh: "水星",
    color: "#b5b5b5",
    radius: 4,
    orbitRadius: 60,
    orbitPeriod: 0.24,
    eccentricity: 0.2056,
    diameter: "4,879 km",
    mass: "3.30 × 10²³ kg",
    distance: "5,790 万 km",
    orbitalPeriod: "88 天",
    funFact: "太阳系最小的行星，昼夜温差超过 600°C",
  },
  {
    name: "Venus",
    nameZh: "金星",
    color: "#e8cda0",
    radius: 7,
    orbitRadius: 90,
    orbitPeriod: 0.62,
    eccentricity: 0.0068,
    diameter: "12,104 km",
    mass: "4.87 × 10²⁴ kg",
    distance: "1.082 亿 km",
    orbitalPeriod: "225 天",
    funFact: "自转方向与其他行星相反，太阳从西边升起",
  },
  {
    name: "Earth",
    nameZh: "地球",
    color: "#4da6ff",
    radius: 8,
    orbitRadius: 125,
    orbitPeriod: 1.0,
    eccentricity: 0.0167,
    diameter: "12,742 km",
    mass: "5.97 × 10²⁴ kg",
    distance: "1.496 亿 km",
    orbitalPeriod: "365.25 天",
    funFact: "太阳系中唯一已知存在生命的行星",
  },
  {
    name: "Mars",
    nameZh: "火星",
    color: "#e07040",
    radius: 6,
    orbitRadius: 165,
    orbitPeriod: 1.88,
    eccentricity: 0.0934,
    diameter: "6,779 km",
    mass: "6.42 × 10²³ kg",
    distance: "2.279 亿 km",
    orbitalPeriod: "687 天",
    funFact: "拥有太阳系最高的山——奥林帕斯山（21.9 km）",
  },
  {
    name: "Jupiter",
    nameZh: "木星",
    color: "#c8a060",
    radius: 18,
    orbitRadius: 220,
    orbitPeriod: 11.86,
    eccentricity: 0.0489,
    diameter: "139,820 km",
    mass: "1.90 × 10²⁷ kg",
    distance: "7.786 亿 km",
    orbitalPeriod: "11.86 年",
    funFact: "质量是其他七大行星总和的 2.5 倍",
  },
  {
    name: "Saturn",
    nameZh: "土星",
    color: "#e8d088",
    radius: 15,
    orbitRadius: 285,
    orbitPeriod: 29.46,
    eccentricity: 0.0565,
    diameter: "116,460 km",
    mass: "5.68 × 10²⁶ kg",
    distance: "14.335 亿 km",
    orbitalPeriod: "29.46 年",
    funFact: "密度低于水，理论上能浮在水面上",
  },
  {
    name: "Uranus",
    nameZh: "天王星",
    color: "#80d0e0",
    radius: 11,
    orbitRadius: 345,
    orbitPeriod: 84.01,
    eccentricity: 0.0457,
    diameter: "50,724 km",
    mass: "8.68 × 10²⁵ kg",
    distance: "28.725 亿 km",
    orbitalPeriod: "84.01 年",
    funFact: "自转轴倾斜 98°，几乎是躺着绕太阳转",
  },
  {
    name: "Neptune",
    nameZh: "海王星",
    color: "#4060e0",
    radius: 10,
    orbitRadius: 400,
    orbitPeriod: 164.8,
    eccentricity: 0.0113,
    diameter: "49,244 km",
    mass: "1.02 × 10²⁶ kg",
    distance: "45.044 亿 km",
    orbitalPeriod: "164.8 年",
    funFact: "风速可达 2,100 km/h，太阳系最快",
  },
];

const TRUE_SCALE_RADII = [2, 3, 3.5, 2.5, 12, 10, 7, 6.5];
const TRUE_SCALE_ORBITS = [50, 75, 105, 140, 210, 280, 360, 420];

function getOrbitPosition(
  angle: number,
  rx: number,
  ry: number,
): { x: number; y: number } {
  return {
    x: Math.cos(angle) * rx,
    y: Math.sin(angle) * ry,
  };
}

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [speed, setSpeed] = useState(1);
  const [trueScale, setTrueScale] = useState(false);
  const [angles, setAngles] = useState<number[]>(() =>
    PLANETS.map((_, i) => (i * Math.PI * 2) / PLANETS.length),
  );
  const [paused, setPaused] = useState(false);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!paused) {
        setAngles((prev) =>
          prev.map((a, i) => {
            const planet = PLANETS[i]!;
            const angularSpeed = (2 * Math.PI) / (planet.orbitPeriod * 8);
            return a + angularSpeed * speed * dt;
          }),
        );
      }
      animRef.current = requestAnimationFrame(animate);
    },
    [speed, paused],
  );

  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate, reduce]);

  const cx = 480;
  const cy = 300;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="speed-slider"
            className="text-fg-secondary text-sm"
          >
            速度
          </label>
          <input
            id="speed-slider"
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32 accent-fg-primary"
          />
          <span className="text-fg-disabled w-10 text-xs">
            {speed.toFixed(1)}×
          </span>
        </div>

        <button
          onClick={() => setPaused((p) => !p)}
          className={cn(
            "rounded-md px-3 py-1 text-sm transition-colors",
            paused
              ? "bg-fg-primary text-bg-deep"
              : "border border-fg-disabled/60 text-fg-secondary hover:text-fg-primary",
          )}
        >
          {paused ? "继续" : "暂停"}
        </button>

        <button
          onClick={() => setTrueScale((s) => !s)}
          className={cn(
            "rounded-md px-3 py-1 text-sm transition-colors",
            trueScale
              ? "bg-fg-primary text-bg-deep"
              : "border border-fg-disabled/60 text-fg-secondary hover:text-fg-primary",
          )}
        >
          {trueScale ? "真实比例" : "艺术比例"}
        </button>
      </div>

      <div className="relative w-full max-w-[960px] overflow-hidden rounded-xl border border-fg-disabled/20 bg-bg-deep">
        <svg
          viewBox="0 0 960 600"
          className="h-auto w-full"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPlanet(null);
          }}
        >
          <defs>
            <radialGradient id="sun-glow">
              <stop offset="0%" stopColor="#fff8e0" />
              <stop offset="30%" stopColor="#ffcc00" />
              <stop offset="70%" stopColor="#ff8800" />
              <stop offset="100%" stopColor="#ff440040" />
            </radialGradient>
            <radialGradient id="sun-corona">
              <stop offset="0%" stopColor="#ffcc0020" />
              <stop offset="100%" stopColor="#ffcc0000" />
            </radialGradient>
          </defs>

          <rect width="960" height="600" fill="transparent" />

          <circle cx={cx} cy={cy} r="80" fill="url(#sun-corona)" />
          <circle cx={cx} cy={cy} r="24" fill="url(#sun-glow)" />
          <circle
            cx={cx}
            cy={cy}
            r="20"
            fill="#ffcc00"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlanet(null);
            }}
          />

          {PLANETS.map((planet, i) => {
            const orbitRx = trueScale
              ? TRUE_SCALE_ORBITS[i]!
              : planet.orbitRadius;
            const orbitRy = orbitRx * 0.45;
            const r = trueScale ? TRUE_SCALE_RADII[i]! : planet.radius;
            const pos = getOrbitPosition(angles[i]!, orbitRx, orbitRy);

            return (
              <g key={planet.name}>
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={orbitRx}
                  ry={orbitRy}
                  fill="none"
                  stroke="currentColor"
                  className="text-fg-disabled/15"
                  strokeWidth="0.5"
                />
                <circle
                  cx={cx + pos.x}
                  cy={cy + pos.y}
                  r={r}
                  fill={planet.color}
                  className="cursor-pointer transition-transform hover:brightness-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanet(planet);
                  }}
                />
                <text
                  x={cx + pos.x}
                  y={cy + pos.y - r - 4}
                  textAnchor="middle"
                  className="fill-fg-secondary text-[9px] select-none"
                >
                  {planet.nameZh}
                </text>
              </g>
            );
          })}

          {selectedPlanet && (() => {
            const idx = PLANETS.findIndex((p) => p.name === selectedPlanet.name);
            const orbitRx = trueScale
              ? TRUE_SCALE_ORBITS[idx]!
              : selectedPlanet.orbitRadius;
            const orbitRy = orbitRx * 0.45;
            const pos = getOrbitPosition(angles[idx]!, orbitRx, orbitRy);
            const px = cx + pos.x;
            const py = cy + pos.y;
            const boxW = 200;
            const boxH = 160;
            const bx = Math.min(Math.max(px - boxW / 2, 8), 960 - boxW - 8);
            const by = py > cy ? py - boxH - 20 : py + 20;

            return (
              <g>
                <line
                  x1={px}
                  y1={py}
                  x2={bx + boxW / 2}
                  y2={by < py ? by + boxH : by}
                  stroke="currentColor"
                  className="text-fg-disabled/40"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <rect
                  x={bx}
                  y={by}
                  width={boxW}
                  height={boxH}
                  rx="8"
                  className="fill-bg-panel stroke-fg-disabled/30"
                  strokeWidth="1"
                />
                <text
                  x={bx + 12}
                  y={by + 20}
                  className="fill-fg-primary text-sm font-semibold"
                >
                  {selectedPlanet.nameZh}（{selectedPlanet.name}）
                </text>
                <text x={bx + 12} y={by + 40} className="fill-fg-secondary text-[11px]">
                  直径：{selectedPlanet.diameter}
                </text>
                <text x={bx + 12} y={by + 56} className="fill-fg-secondary text-[11px]">
                  质量：{selectedPlanet.mass}
                </text>
                <text x={bx + 12} y={by + 72} className="fill-fg-secondary text-[11px]">
                  日距：{selectedPlanet.distance}
                </text>
                <text x={bx + 12} y={by + 88} className="fill-fg-secondary text-[11px]">
                  公转：{selectedPlanet.orbitalPeriod}
                </text>
                <text x={bx + 12} y={by + 108} className="fill-fg-disabled text-[10px]">
                  {selectedPlanet.funFact}
                </text>
                <text
                  x={bx + boxW - 12}
                  y={by + 16}
                  textAnchor="end"
                  className="fill-fg-disabled cursor-pointer text-sm hover:fill-fg-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanet(null);
                  }}
                >
                  ✕
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {selectedPlanet && (
        <div className="w-full max-w-[960px] rounded-xl border border-fg-disabled/20 bg-bg-panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-fg-primary text-lg font-semibold">
              <span
                className="mr-2 inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: selectedPlanet.color }}
              />
              {selectedPlanet.nameZh}（{selectedPlanet.name}）
            </h3>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-fg-disabled hover:text-fg-primary text-sm"
            >
              ✕ 关闭
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoCell label="直径" value={selectedPlanet.diameter} />
            <InfoCell label="质量" value={selectedPlanet.mass} />
            <InfoCell label="与太阳距离" value={selectedPlanet.distance} />
            <InfoCell label="公转周期" value={selectedPlanet.orbitalPeriod} />
          </div>
          <p className="text-fg-disabled mt-3 text-sm">
            {selectedPlanet.funFact}
          </p>
        </div>
      )}
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-fg-disabled/10 bg-bg-deep/50 p-3">
      <div className="text-fg-disabled text-xs">{label}</div>
      <div className="text-fg-primary mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
