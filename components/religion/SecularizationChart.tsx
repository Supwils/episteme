"use client";

import Link from "next/link";
import { useState } from "react";
import {
  INDICATOR_LABELS,
  SAMPLES,
  indicatorSeries,
  type IndicatorId,
  type SampleId,
} from "@/lib/religion/secularization-indicators";
import { LabChip } from "./LabChip";

export function SecularizationChart() {
  const [sample, setSample] = useState<SampleId>("us-rls");
  const [id, setId] = useState<IndicatorId>("practice");
  const active = indicatorSeries(sample, id);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {SAMPLES.map((item) => (
          <LabChip key={item.id} pressed={item.id === sample} onClick={() => setSample(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {INDICATOR_LABELS.map((item) => (
          <LabChip key={item.id} pressed={item.id === id} onClick={() => setId(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      {active.bars.length > 0 ? (
        <div className="space-y-3">
          {active.bars.map((bar) => (
            <div key={bar.label}>
              <div className="text-fg-muted mb-1 flex justify-between gap-3 text-[12px]">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="bg-bg-elevated h-2 overflow-hidden rounded-full">
                <div className="bg-accent-gold h-full" style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="text-fg-secondary list-disc space-y-2 pl-5 text-[14.5px] leading-relaxed">
          {(active.facts ?? []).map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      )}
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">{active.note}</p>
      <p className="text-fg-muted mt-2 text-[12.5px]">{active.source}</p>
      <p className="mt-3 text-[13.5px]">
        <Link
          href="/religion/frontier/nones-plateau-after-rls"
          className="text-accent-gold hover:underline"
        >
          无宗教身份为何走平 →
        </Link>
      </p>
    </div>
  );
}
