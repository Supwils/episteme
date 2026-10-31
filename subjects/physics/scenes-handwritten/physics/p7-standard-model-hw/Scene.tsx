"use client";

import { getPhysicsContent } from "@/subjects/physics/lib/tier-content";
import { Cartouche } from "@/subjects/physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/subjects/physics/scenes-handwritten/shared/PaperGrid";
import { P7PageZoo } from "./ParticleTable";
import { P7PageGauge } from "./GaugePage";

/**
 * P7 · Standard Model. Two pages:
 *   page 0 — Particle zoo (3 fermion generations × 4 rows + bosons + H)
 *   page 1 — Gauge structure: Higgs Mexican-hat potential + Feynman
 *            vertices + SU(3) × SU(2) × U(1) cartouche
 */
export function P7HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P7");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={350} />

      {page === 0 ? <P7PageZoo /> : null}
      {page === 1 ? <P7PageGauge /> : null}

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
        title="Standard Model"
        subtitle={page === 0 ? "标准模型 · I · 粒子表" : "标准模型 · II · 规范 / Higgs"}
      />
    </g>
  );
}
