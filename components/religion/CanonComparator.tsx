"use client";

import { useState } from "react";
import { CANON_PAIRS, canonPairById, type CanonPairId } from "@/lib/religion/canon-openings";

export function CanonComparator() {
  const [id, setId] = useState<CanonPairId>("genesis");
  const pair = canonPairById(id);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {CANON_PAIRS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === id}
            onClick={() => setId(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === id
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.18em] uppercase">
        {pair.source}
      </p>
      <p className="text-fg-primary text-[16px] leading-relaxed">{pair.text}</p>
    </div>
  );
}
