"use client";

import { getPhysicsContent } from "@/content/physics";
import { Cartouche } from "@/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/scenes-handwritten/shared/PaperGrid";
import { P3PageGeneral, P3PageSpecial } from "./p3-components";

/**
 * P3 · Relativity. Two pages:
 *   page 0 — Special / Minkowski diagram + Lorentz boost
 *   page 1 — General / light cone curvature + Einstein field
 */
export function P3HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P3");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P3PageSpecial /> : null}
      {page === 1 ? <P3PageGeneral /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const ringR = 420;
        const variantByIndex: Array<
          "vector" | "orbit" | "diamond" | "halo" | "starpoint" | "wave"
        > = ["vector", "orbit", "wave", "diamond", "halo", "starpoint"];
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

      <Cartouche
        cx={0}
        cy={-460}
        title="Relativity"
        subtitle={page === 0 ? "相对论 · I · 狭义 / Minkowski" : "相对论 · II · 广义 / 时空曲率"}
      />
    </g>
  );
}
