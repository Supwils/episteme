"use client";

import { getPhysicsContent } from "@/content/physics";
import { Cartouche } from "@/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/scenes-handwritten/shared/PaperGrid";
import { P6PageNucleus, P6PageParticle } from "./p6-components";

/**
 * P6 · Nuclear & Particle. Two pages:
 *   page 0 — Nucleus (binding curve + α/β/γ decay + fusion/fission)
 *   page 1 — Particle (proton quark portrait + color confinement +
 *            collider energy ladder)
 */
export function P6HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P6");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P6PageNucleus /> : null}
      {page === 1 ? <P6PageParticle /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const ringR = 420;
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={Math.cos(angle) * ringR}
            y={Math.sin(angle) * ringR}
            radius={9 + (m.size ?? 0.03) * 100}
            variant="diamond"
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche
        cx={0}
        cy={-460}
        title="Nuclear & Particle"
        subtitle={page === 0 ? "核与粒子 · I · 核结构 / 衰变" : "核与粒子 · II · 夸克 / 色禁闭"}
      />
    </g>
  );
}
