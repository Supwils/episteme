"use client";

import { getPhysicsContent } from "@/src-physics/content/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";
import { P0PageKepler, P0PageLagrange, P0PageNewton, SUBTITLE_BY_PAGE } from "./p0-components";

/**
 * P0 · Classical Mechanics. Three pages:
 *   page 0 — Newton  (F = ma, pendulum, spring, projectile, free body)
 *   page 1 — Lagrange / Hamilton (action principle + phase space)
 *   page 2 — Kepler / Noether    (orbits + conservation laws)
 */
export function P0HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P0");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P0PageNewton /> : null}
      {page === 1 ? <P0PageLagrange /> : null}
      {page === 2 ? <P0PageKepler /> : null}

      {/* Markers around outer ring — same on every page so the section's
         identity is consistent. */}
      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const ringR = 420;
        const variantByIndex: Array<"vector" | "orbit" | "diamond" | "halo" | "starpoint"> = [
          "vector",
          "orbit",
          "diamond",
          "halo",
          "starpoint",
          "diamond",
        ];
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={Math.cos(angle) * ringR}
            y={Math.sin(angle) * ringR}
            radius={9 + (m.size ?? 0.03) * 100}
            variant={variantByIndex[i] ?? "halo"}
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche cx={0} cy={-460} title="Classical Mechanics" subtitle={SUBTITLE_BY_PAGE[page]} />
    </g>
  );
}
