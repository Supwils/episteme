"use client";

import { getTierContent } from "@/content/cosmos";
import { hash01, projectForTier } from "@/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";

const NODE_COUNT = 22;
const RADIUS = 380;

type Node = { x: number; y: number; weight: number };

function buildNodes(): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const a = hash01(i * 3.1 + 0.5) * Math.PI * 2;
    const r = (0.25 + hash01(i * 7.3 + 1.7) * 0.75) * RADIUS;
    nodes.push({
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      weight: 0.5 + hash01(i * 11.7 + 2.3) * 1.5,
    });
  }
  return nodes;
}

function buildEdges(nodes: Node[]): Array<[number, number, number]> {
  // For each node, connect to its 2 nearest neighbours. Edge tuple: [i, j, midOffset]
  const edges: Array<[number, number, number]> = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    if (!a) continue;
    const di = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - a.x, n.y - a.y) }))
      .filter((p) => p.j !== i)
      .sort((x, y) => x.d - y.d);
    for (let k = 0; k < 2; k++) {
      const entry = di[k];
      if (!entry) continue;
      const j = entry.j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j, (hash01(i * 31 + j) - 0.5) * 60]);
    }
  }
  return edges;
}

function quadraticPath(n1: Node, n2: Node, offset: number): string {
  const mx = (n1.x + n2.x) / 2;
  const my = (n1.y + n2.y) / 2;
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular offset
  const px = (-dy / len) * offset;
  const py = (dx / len) * offset;
  return `M${n1.x} ${n1.y} Q${mx + px} ${my + py} ${n2.x} ${n2.y}`;
}

const VOID_REGIONS = [
  { cx: -240, cy: -120, r: 110, label: "牧夫座空洞 · Boötes" },
  { cx: 180, cy: 230, r: 85, label: "本地空洞 · Local" },
  { cx: 60, cy: -260, r: 70, label: "Eridanus" },
];

export function Tier1HwScene() {
  const content = getTierContent("T1");
  const markers = content?.markers ?? [];

  const nodes = buildNodes();
  const edges = buildEdges(nodes);

  return (
    <g>
      {/* Sparse intra-void texture */}
      <StarSpeck
        seed={211}
        count={220}
        bounds={{ x: -460, y: -460, w: 920, h: 920 }}
        hue="var(--hw-ink-faint-solid)"
        maxRadius={0.6}
      />

      {/* Voids — large dashed circles */}
      {VOID_REGIONS.map((v, i) => (
        <g key={v.label}>
          <circle
            cx={v.cx}
            cy={v.cy}
            r={v.r}
            fill="var(--hw-bg)"
            opacity={0.4}
            stroke="var(--hw-ink-faint-solid)"
            strokeWidth={0.6}
            strokeDasharray="1 6"
          />
          <HandwrittenLabel
            x={v.cx}
            y={v.cy + v.r + 14}
            text={v.label}
            variant="hairline"
            color="var(--hw-ink-faint-solid)"
            delay={0.3 + i * 0.1}
          />
        </g>
      ))}

      {/* Filament edges — pathLength cascade from centre */}
      {edges.map(([i, j, off], k) => {
        const n1 = nodes[i];
        const n2 = nodes[j];
        if (!n1 || !n2) return null;
        const d = quadraticPath(n1, n2, off);
        return (
          <InkPath
            key={k}
            d={d}
            stroke="var(--hw-gold)"
            strokeWidth={0.9}
            opacity={0.55}
            delay={0.2 + k * 0.04}
            duration={0.9}
            filterLevel="wobble-tiny"
          />
        );
      })}

      {/* Gas wash along edges — extra glow */}
      {edges.map(([i, j, off], k) => {
        const n1 = nodes[i];
        const n2 = nodes[j];
        if (!n1 || !n2) return null;
        const d = quadraticPath(n1, n2, off);
        return (
          <path
            key={`${k}-glow`}
            d={d}
            fill="none"
            stroke="var(--hw-wash-warm)"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.25}
          />
        );
      })}

      {/* Nodes — three-layer watercolor halo around each filament junction */}
      {nodes.map((n, i) => {
        const r0 = 2 + n.weight;
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={r0 * 4.5} fill="var(--hw-gold)" fillOpacity={0.05} />
            <circle
              cx={n.x - 1}
              cy={n.y + 1}
              r={r0 * 3.0}
              fill="var(--hw-gold)"
              fillOpacity={0.1}
            />
            <circle cx={n.x} cy={n.y} r={r0 * 2.0} fill="var(--hw-gold)" fillOpacity={0.22} />
            <circle
              cx={n.x}
              cy={n.y}
              r={r0}
              fill="var(--hw-gold)"
              stroke="var(--hw-ink)"
              strokeWidth={0.5}
              filter="url(#hw-wobble-tiny)"
            />
          </g>
        );
      })}

      {/* Markers */}
      {markers.map((m, i) => {
        const p = projectForTier("T1", m.position);
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={p.x}
            y={p.y}
            radius={5 + (m.size ?? 0.03) * 150}
            variant="halo"
            delay={1.2 + i * 0.1}
          />
        );
      })}
      {markers.map((m, i) => {
        const p = projectForTier("T1", m.position);
        const dx = p.x === 0 ? 1 : Math.sign(p.x);
        const lx = p.x + dx * 50;
        const ly = p.y - 14;
        return (
          <HandwrittenLabel
            key={`${m.id}-label`}
            x={lx}
            y={ly}
            text={m.name.primary}
            variant="label-minor"
            anchor={dx > 0 ? "start" : "end"}
            leader={{ fromX: p.x, fromY: p.y }}
            delay={1.6 + i * 0.1}
          />
        );
      })}

      {/* "Voids" key annotation */}
      <HandwrittenLabel
        x={-460}
        y={460}
        text="filaments · 纤维结构"
        variant="hairline"
        anchor="start"
        color="var(--hw-gold)"
        delay={1.5}
      />

      <Cartouche cx={0} cy={-460} title="Cosmic Web" subtitle="宇宙纤维 · 节点·空洞·墙" />
    </g>
  );
}
