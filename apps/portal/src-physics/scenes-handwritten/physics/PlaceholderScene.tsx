"use client";

import { getPhysicsContent } from "@/src-physics/content/physics";
import type { PhysicsTierId } from "@/src-physics/lib/physics-tier";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";

/**
 * Minimal scene used by physics tiers that haven't received a bespoke
 * composition yet. Renders the tier title cartouche + tagline + a soft
 * star speck background so the route is never blank. Bespoke scenes
 * replace this with their own composition.
 */
export function PlaceholderScene({ tier, seed: _seed }: { tier: PhysicsTierId; seed: number }) {
  const content = getPhysicsContent(tier);
  return (
    <g>
      <PaperGrid excludeInnerRadius={120} />

      {/* Centre placeholder mark */}
      <circle cx={0} cy={0} r={80} fill="var(--hw-wash-warm)" opacity={0.4} />
      <circle cx={0} cy={0} r={6} fill="var(--hw-gold)" stroke="var(--hw-ink)" strokeWidth={0.6} />

      <HandwrittenLabel
        x={0}
        y={-50}
        text={content?.name.primary ?? tier}
        variant="label-major"
        italic
        delay={0.4}
      />
      <HandwrittenLabel
        x={0}
        y={28}
        text={content?.tagline ?? ""}
        variant="caption"
        color="var(--hw-ink-soft)"
        delay={0.6}
      />
      <HandwrittenLabel
        x={0}
        y={48}
        text="coming soon · 详见知识面板"
        variant="hairline"
        color="var(--hw-ink-faint-solid)"
        delay={0.8}
      />

      <Cartouche
        cx={0}
        cy={-460}
        title={content?.name.latin ?? "Physics tier"}
        subtitle={content?.name.primary}
      />
    </g>
  );
}
