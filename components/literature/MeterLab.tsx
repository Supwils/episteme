"use client";

import { useMemo, useState } from "react";
import {
  METER_SAMPLES,
  groupedSlots,
  meterById,
  type MeterKind,
} from "@/lib/literature/meter-scan";

const ACCENT = "var(--color-accent-gold)";

export function MeterLab() {
  const [kind, setKind] = useState<MeterKind>("wuyan");
  const sample = useMemo(() => meterById(kind), [kind]);
  const groups = useMemo(() => groupedSlots(sample), [sample]);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {METER_SAMPLES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === kind}
            onClick={() => setKind(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === kind
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="text-fg-muted mb-3 text-[12px]">{sample.source}</p>
      <div
        className="flex flex-wrap items-end gap-3"
        role="img"
        aria-label={`${sample.label}音步示意`}
      >
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex gap-1.5">
            {group.map((slot, slotIndex) => (
              <span
                key={`${groupIndex}-${slotIndex}`}
                className="flex min-w-[2.2rem] flex-col items-center"
              >
                <span
                  className="text-fg-primary text-xl leading-none"
                  style={{ fontWeight: slot.strong ? 650 : 400 }}
                >
                  {slot.text}
                </span>
                <span
                  className="mt-2 h-1.5 w-6 rounded-full"
                  style={{ background: slot.strong ? ACCENT : "var(--color-border-faint)" }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">{sample.note}</p>
    </div>
  );
}
