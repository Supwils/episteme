"use client";

import { getPhysicsContent } from "@/content/physics";
import { Cartouche } from "@/scenes-handwritten/shared/Cartouche";
import { HandwrittenMarker } from "@/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/scenes-handwritten/shared/PaperGrid";
import { P5PageAtom } from "./P5PageAtom";
import { P5PageMolecule } from "./P5PageMolecule";

/**
 * P5 · Atomic & Molecular. Two pages:
 *   page 0 — Single atom (Bohr levels, transitions, s/p/d orbitals)
 *   page 1 — Bond + periodicity (LCAO σ_g/σ_u, sp/sp²/sp³, periodic strip)
 */
export function P5HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P5");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P5PageAtom /> : null}
      {page === 1 ? <P5PageMolecule /> : null}

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
            variant="halo"
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche
        cx={0}
        cy={-460}
        title="Atomic & Molecular"
        subtitle={page === 0 ? "原子分子 · I · 单原子 / 能级" : "原子分子 · II · 化学键 / 周期律"}
      />
    </g>
  );
}
