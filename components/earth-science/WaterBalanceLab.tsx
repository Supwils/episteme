"use client";

import { useState } from "react";
import {
  accountSentence,
  clampFlux,
  DEFAULT_EVAPOTRANSPIRATION,
  DEFAULT_PRECIPITATION,
  DEFAULT_RUNOFF,
  FLUX_MAX,
  FLUX_MIN,
  FLUX_STEP,
  fluxValueText,
  formatStorageChange,
  WATER_BALANCE_UNIT,
  waterBalance,
} from "@/lib/earth-science/water-balance";

export function WaterBalanceLab() {
  const [precipitation, setPrecipitation] = useState(DEFAULT_PRECIPITATION);
  const [evapotranspiration, setEvapotranspiration] = useState(DEFAULT_EVAPOTRANSPIRATION);
  const [runoff, setRunoff] = useState(DEFAULT_RUNOFF);
  const account = waterBalance(precipitation, evapotranspiration, runoff);
  const sentence = accountSentence(account.regime);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="space-y-4">
        <FluxRange
          id="water-balance-p"
          label="降水 P"
          value={precipitation}
          onChange={setPrecipitation}
        />
        <FluxRange
          id="water-balance-et"
          label="蒸散发 ET"
          value={evapotranspiration}
          onChange={setEvapotranspiration}
        />
        <FluxRange id="water-balance-r" label="径流 R" value={runoff} onChange={setRunoff} />
      </div>
      <p id="water-balance-unit" className="text-fg-muted mt-4 text-[12px] tracking-wide">
        {WATER_BALANCE_UNIT}
      </p>
      <p className="text-fg-primary mt-4 font-mono text-[15px]">
        ΔS = {formatStorageChange(account.storageChange)}
      </p>
      <p className="text-fg-secondary mt-2 text-[14.5px] leading-relaxed">{sentence}</p>
      <p className="sr-only" aria-live="polite">
        ΔS {formatStorageChange(account.storageChange)}。{sentence}
      </p>
    </div>
  );
}

function FluxRange({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const shown = clampFlux(value);
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex items-center justify-between text-[12.5px]">
        <span className="text-fg-secondary">{label}</span>
        <span className="text-fg-primary font-mono" aria-hidden="true">
          {shown}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={FLUX_MIN}
        max={FLUX_MAX}
        step={FLUX_STEP}
        value={shown}
        aria-label={label}
        aria-valuetext={fluxValueText(shown)}
        aria-describedby="water-balance-unit"
        onChange={(event) => onChange(clampFlux(Number(event.target.value)))}
        className="w-full"
      />
    </div>
  );
}
