"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import {
  clampOpenness,
  destinationCounts,
  formatSharePercent,
  MOBILITY_COHORT,
  MOBILITY_STRATA,
  mobilityReadout,
  sharesEqual,
  startShareMotion,
  stepOrigin,
  stratumLabel,
  type StratumId,
} from "@/lib/sociology/mobility";

const INITIAL_ORIGIN: StratumId = 0;
const INITIAL_OPENNESS = 40;
const ACCENT = "var(--color-accent-gold)";

function useShareBars(origin: StratumId, openness: number, reduced: boolean) {
  const [shown, setShown] = useState<readonly number[]>(() =>
    destinationCounts(INITIAL_ORIGIN, INITIAL_OPENNESS)
  );
  const shownRef = useRef(shown);
  shownRef.current = shown;

  useEffect(() => {
    return startShareMotion(
      reduced,
      shownRef.current,
      destinationCounts(origin, openness),
      (shares) => {
        if (sharesEqual(shownRef.current, shares)) return;
        shownRef.current = shares;
        setShown(shares);
      },
      (callback) => requestAnimationFrame((time) => callback(time)),
      (id) => cancelAnimationFrame(id),
      () => performance.now()
    );
  }, [origin, openness, reduced]);

  const snap = (next: readonly number[]) => {
    shownRef.current = next;
    setShown(next);
  };

  return { shown, snap };
}

export function MobilityLab() {
  const reduced = usePrefersReducedMotion();
  const [origin, setOrigin] = useState<StratumId>(INITIAL_ORIGIN);
  const [openness, setOpenness] = useState(INITIAL_OPENNESS);
  const { shown, snap } = useShareBars(origin, openness, reduced);
  const target = destinationCounts(origin, openness);
  const widths = reduced ? target : shown;
  const stay = MOBILITY_COHORT - 2 * openness;

  const publish = (nextOrigin: StratumId, nextOpenness: number, animate: boolean) => {
    setOrigin(nextOrigin);
    setOpenness(nextOpenness);
    if (animate && !reduced) return;
    snap(destinationCounts(nextOrigin, nextOpenness));
  };

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <OriginPicker origin={origin} onChange={(id) => publish(id, openness, true)} />
      <OpennessSlider openness={openness} onChange={(value) => publish(origin, value, false)} />
      <p className="text-fg-muted mt-4 text-[12px] tracking-wide">示意队列 · 非调查</p>
      <ShareRows counts={target} widths={widths} />
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">
        出身{stratumLabel(origin)}。留在本层 {stay} 人（300 − 2 × {openness}）。另外两层各{" "}
        {openness} 人。人数相加是 {MOBILITY_COHORT}。
      </p>
      <p className="sr-only" aria-live="polite">
        {mobilityReadout(origin, openness)}
      </p>
    </div>
  );
}

function OriginPicker({
  origin,
  onChange,
}: {
  origin: StratumId;
  onChange: (id: StratumId) => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = stepOrigin(origin, event.key);
    if (next === null) return;
    event.preventDefault();
    onChange(next);
    document.getElementById(`mobility-origin-${next}`)?.focus();
  };

  return (
    <div role="radiogroup" aria-label="出身层" className="mb-4 flex flex-wrap gap-2">
      {MOBILITY_STRATA.map((stratum) => {
        const selected = stratum.id === origin;
        return (
          <button
            key={stratum.id}
            id={`mobility-origin-${stratum.id}`}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(stratum.id)}
            onKeyDown={onKeyDown}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              selected
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {stratum.label}
          </button>
        );
      })}
    </div>
  );
}

function OpennessSlider({
  openness,
  onChange,
}: {
  openness: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label
        htmlFor="mobility-openness"
        className="mb-1 flex items-center justify-between text-[12.5px]"
      >
        <span className="text-fg-secondary">开放度</span>
        <span className="text-fg-primary font-mono" aria-hidden="true">
          {openness}
        </span>
      </label>
      <input
        id="mobility-openness"
        type="range"
        min={0}
        max={100}
        step={1}
        value={openness}
        aria-label="开放度"
        aria-valuetext={`开放度 ${openness}。示意刻度，不是调查百分比`}
        aria-describedby="mobility-openness-hint"
        onChange={(event) => onChange(clampOpenness(Number(event.target.value)))}
        className="w-full"
        style={{ accentColor: "#7a8f5a" }}
      />
      <p id="mobility-openness-hint" className="text-fg-muted mt-1 text-[10.5px] leading-snug">
        0 是子女全留在出身层，100 是三层各 100 人。拖动时数字立刻变。这不是某次调查的百分比。
      </p>
    </div>
  );
}

function ShareRows({ counts, widths }: { counts: readonly number[]; widths: readonly number[] }) {
  return (
    <ul className="mt-4 space-y-3" aria-label="去向人数">
      {MOBILITY_STRATA.map((stratum, index) => {
        const count = counts[index] ?? 0;
        const width = ((widths[index] ?? 0) / MOBILITY_COHORT) * 100;
        return (
          <li key={stratum.id}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-[13px]">
              <span className="text-fg-secondary">{stratum.label}</span>
              <span className="text-fg-primary font-mono">
                {count} 人<span className="text-fg-muted"> · {formatSharePercent(count)}</span>
              </span>
            </div>
            <div className="bg-bg-elevated h-2.5 overflow-hidden rounded" aria-hidden="true">
              <div className="h-full rounded" style={{ width: `${width}%`, background: ACCENT }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
