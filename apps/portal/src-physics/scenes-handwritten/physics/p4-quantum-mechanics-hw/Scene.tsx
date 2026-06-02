"use client";

import { getPhysicsContent } from "@/src-physics/content/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";
import { P4PageState, P4PageWaveParticle } from "./p4-components";

/**
 * P4 · Quantum Mechanics. Two pages:
 *   page 0 — Wave-particle (double-slit + potential well + ψ²)
 *   page 1 — Schrödinger + Bloch (state vector, qubit, uncertainty)
 */
export function P4HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P4");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P4PageWaveParticle /> : null}
      {page === 1 ? <P4PageState /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        const ringR = 420;
        const variantByIndex: Array<
          "wave" | "orbit" | "vector" | "diamond" | "halo" | "starpoint"
        > = ["wave", "halo", "orbit", "diamond", "wave", "starpoint"];
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
        title="Quantum Mechanics"
        subtitle={page === 0 ? "量子 · I · 波粒二象性" : "量子 · II · 状态 / 不确定"}
      />
    </g>
  );
}
