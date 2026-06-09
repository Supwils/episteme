"use client";

import { getTierContent } from "@/subjects/physics/lib/tier-content";
import { hash01, projectToSvg } from "@/subjects/physics/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";

const EARTH_R = 220;

function continentBlob(seed: number, cx: number, cy: number, radius: number, points = 14): string {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r = radius * (0.7 + hash01(seed + i) * 0.5);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  // close
  const first = pts[0]!;
  let d = `M${first[0]} ${first[1]}`;
  for (let i = 0; i < pts.length; i++) {
    const p1 = pts[i]!;
    const p2 = pts[(i + 1) % pts.length]!;
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2;
    d += ` Q${p1[0]} ${p1[1]} ${mx} ${my}`;
  }
  d += " Z";
  return d;
}

const CONTINENTS = [
  { seed: 31, cx: -80, cy: -40, radius: 70, label: "Eurasia" },
  { seed: 47, cx: -120, cy: 60, radius: 50, label: "Africa" },
  { seed: 67, cx: 60, cy: 20, radius: 60, label: "Americas" },
  { seed: 89, cx: 100, cy: 110, radius: 32, label: "Oceania" },
];

export function Tier7HwScene() {
  const content = getTierContent("T7");
  const markers = content?.markers ?? [];

  // Lat/long grid lines
  const latitudes: { d: string; key: string }[] = [];
  for (let lat = -75; lat <= 75; lat += 15) {
    const t = lat / 90;
    const r = EARTH_R * Math.sqrt(1 - t * t);
    const cy = EARTH_R * t;
    latitudes.push({ d: `M${-r} ${cy} A${r} ${r * 0.35} 0 0 1 ${r} ${cy}`, key: `lat${lat}` });
  }
  const longitudes: { d: string; key: string }[] = [];
  for (let lon = -75; lon <= 90; lon += 15) {
    const rx = EARTH_R * Math.sin((Math.abs(lon) * Math.PI) / 180);
    longitudes.push({
      d: `M0 ${-EARTH_R} A${rx} ${EARTH_R} 0 0 ${lon > 0 ? 0 : 1} 0 ${EARTH_R}`,
      key: `lon${lon}`,
    });
  }

  // Markers use a custom radial scaling: keep them inside the moon orbit but
  // outside the GEO ring. Positions in content/T7 span ~0 to 6.6 in scene units.
  const projectMarker = (pos: readonly [number, number, number]) => {
    const p = projectToSvg(pos, { projection: "orthographic", scale: 28 });
    const r = Math.hypot(p.x, p.y);
    // clamp inside (EARTH_R+70, EARTH_R+80) ring band for markers far from origin
    const maxR = EARTH_R + 75;
    if (r > maxR) {
      const k = maxR / r;
      return { x: p.x * k, y: p.y * k };
    }
    return p;
  };

  return (
    <g>
      <StarSpeck
        seed={701}
        count={140}
        bounds={{ x: -460, y: -460, w: 920, h: 920 }}
        maxRadius={0.4}
        excludeInnerRadius={EARTH_R + 30}
      />

      {/* Atmosphere halo */}
      <circle cx={0} cy={0} r={EARTH_R + 30} fill="var(--hw-blue)" fillOpacity={0.06} />
      <circle cx={0} cy={0} r={EARTH_R + 14} fill="var(--hw-blue)" fillOpacity={0.12} />

      {/* Ocean disc */}
      <circle
        cx={0}
        cy={0}
        r={EARTH_R}
        fill="var(--hw-blue)"
        fillOpacity={0.16}
        stroke="var(--hw-ink)"
        strokeWidth={1.2}
        filter="url(#hw-wobble-tiny)"
      />

      {/* Lat/long graticule */}
      <g opacity={0.5}>
        {latitudes.map((l) => (
          <path
            key={l.key}
            d={l.d}
            fill="none"
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.4}
            strokeDasharray="1 4"
          />
        ))}
        {longitudes.map((l) => (
          <path
            key={l.key}
            d={l.d}
            fill="none"
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.4}
            strokeDasharray="1 4"
          />
        ))}
      </g>

      {/* Continents */}
      {CONTINENTS.map((c, i) => (
        <g key={c.label}>
          <InkPath
            d={continentBlob(c.seed, c.cx, c.cy, c.radius)}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-ink)"
            strokeWidth={0.9}
            opacity={0.85}
            delay={0.4 + i * 0.12}
            filterLevel="wobble"
            duration={1.1}
          />
          <HandwrittenLabel
            x={c.cx}
            y={c.cy}
            text={c.label}
            variant="label-minor"
            italic
            color="var(--hw-ink-soft)"
            delay={1.4 + i * 0.1}
          />
        </g>
      ))}

      {/* Ice caps */}
      <circle cx={0} cy={-EARTH_R + 8} r={36} fill="var(--hw-ink)" fillOpacity={0.05} />
      <circle cx={0} cy={EARTH_R - 8} r={36} fill="var(--hw-ink)" fillOpacity={0.05} />

      {/* Equator marker */}
      <line
        x1={-EARTH_R}
        y1={0}
        x2={EARTH_R}
        y2={0}
        stroke="var(--hw-ink-soft)"
        strokeWidth={0.5}
        strokeDasharray="2 4"
        opacity={0.6}
      />
      <HandwrittenLabel
        x={EARTH_R + 6}
        y={4}
        text="Equator"
        variant="hairline"
        anchor="start"
        color="var(--hw-ink-soft)"
        delay={1.2}
      />

      {/* Geostationary orbit */}
      <circle
        cx={0}
        cy={0}
        r={EARTH_R + 65}
        fill="none"
        stroke="var(--hw-blue)"
        strokeWidth={0.6}
        strokeDasharray="3 5"
        opacity={0.6}
      />
      <HandwrittenLabel
        x={EARTH_R + 70}
        y={-EARTH_R - 50}
        text="GEO · 35,786 km"
        variant="hairline"
        anchor="start"
        color="var(--hw-blue)"
        delay={1.4}
      />

      {/* Moon orbit + Moon — tightened so it sits between GEO and markers area */}
      {(() => {
        const moonOrbitX = EARTH_R + 90;
        const moonR = 16;
        return (
          <>
            <ellipse
              cx={0}
              cy={0}
              rx={moonOrbitX}
              ry={moonOrbitX * 0.34}
              fill="none"
              stroke="var(--hw-ink-soft)"
              strokeWidth={0.6}
              strokeDasharray="2 6"
              opacity={0.7}
            />
            <g>
              <circle
                cx={moonOrbitX}
                cy={0}
                r={moonR}
                fill="var(--hw-bg-edge)"
                stroke="var(--hw-ink)"
                strokeWidth={0.7}
                filter="url(#hw-wobble-tiny)"
              />
              <circle
                cx={moonOrbitX - 3}
                cy={-3}
                r={2.2}
                fill="var(--hw-ink-faint-solid)"
                opacity={0.7}
              />
              <circle
                cx={moonOrbitX + 4}
                cy={4}
                r={1.6}
                fill="var(--hw-ink-faint-solid)"
                opacity={0.6}
              />
              <HandwrittenLabel
                x={moonOrbitX}
                y={moonR + 14}
                text="☽ Moon · 月球"
                variant="label-minor"
                italic
                delay={1.6}
              />
            </g>
          </>
        );
      })()}

      {/* North / South pole markers */}
      <HandwrittenLabel
        x={0}
        y={-EARTH_R - 14}
        text="N"
        variant="label-major"
        italic
        color="var(--hw-gold)"
        delay={1.4}
      />
      <HandwrittenLabel
        x={0}
        y={EARTH_R + 22}
        text="S"
        variant="label-major"
        italic
        color="var(--hw-gold)"
        delay={1.4}
      />

      {/* Markers */}
      {markers.map((m, i) => {
        const p = projectMarker(m.position);
        const px = Math.max(-440, Math.min(440, p.x));
        const py = Math.max(-440, Math.min(440, p.y));
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={px}
            y={py}
            radius={4 + (m.size ?? 0.1) * 60}
            variant="pin"
            delay={1.8 + i * 0.1}
          />
        );
      })}

      <Cartouche cx={0} cy={-460} title="Earth" subtitle="地球 · 12,742 km" />
    </g>
  );
}
