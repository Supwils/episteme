"use client";

import { useState } from "react";
import {
  CANON_LENSES,
  CANON_PAIRS,
  canonPairById,
  type CanonLensId,
  type CanonPairId,
} from "@/lib/religion/canon-openings";
import { LabChip } from "./LabChip";

export function CanonComparator() {
  const [id, setId] = useState<CanonPairId>("genesis");
  const [lens, setLens] = useState<CanonLensId>("speaker");
  const pair = canonPairById(id);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {CANON_PAIRS.map((item) => (
          <LabChip key={item.id} pressed={item.id === id} onClick={() => setId(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.18em] uppercase">
        {pair.source}
      </p>
      <p className="text-fg-primary text-[16px] leading-relaxed">{pair.text}</p>
      <div className="mt-5 mb-3 flex flex-wrap gap-2">
        {CANON_LENSES.map((item) => (
          <LabChip key={item.id} pressed={item.id === lens} onClick={() => setLens(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{pair.lenses[lens]}</p>
    </div>
  );
}
