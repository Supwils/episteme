"use client";

import { getPhysicsContent } from "@/src-physics/content/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";
import { P2PageMaxwell, P2PageWave } from "./p2-components";

/**
 * P2 · Electromagnetism. Two pages:
 *   page 0 — Field portrait (E from a point charge + B around a wire +
 *            Maxwell equations cartouche)
 *   page 1 — Light as wave (sin/cos travelling EM wave + c = 1/√(μ₀ε₀))
 */
export function P2HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P2");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P2PageMaxwell /> : null}
      {page === 1 ? <P2PageWave /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        const ringR = 420;
        const variantByIndex: Array<
          "vector" | "wave" | "orbit" | "diamond" | "halo" | "starpoint"
        > = ["vector", "wave", "diamond", "halo", "orbit", "starpoint"];
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
        title="Electromagnetism"
        subtitle={page === 0 ? "电磁 · I · Maxwell 方程组" : "电磁 · II · 光与规范"}
      />
    </g>
  );
}
