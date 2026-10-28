"use client";

import { useState } from "react";
import {
  CACHE_STRIDES,
  LINE_COUNT,
  LINE_WORDS,
  simulateCacheStride,
  type CacheStep,
  type CacheStride,
  type CacheStrideResult,
} from "@/lib/computer-science/cache-locality";

function percentLabel(part: number, whole: number): string {
  if (whole === 0) return "0%";
  const value = (part / whole) * 100;
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
}

export function CacheLocalityLab() {
  const [stride, setStride] = useState<CacheStride>(1);
  const result = simulateCacheStride(stride);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <StridePicker stride={stride} onChange={setStride} />
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">
        步长 {result.stride}。访问 {result.accesses} 次，命中 {result.hits}，未命中 {result.misses}
        。行号 = ⌊地址 / {LINE_WORDS}⌋。
      </p>
      <OutcomeBars result={result} />
      <WordRows steps={result.steps} />
      <p className="sr-only" aria-live="polite">
        示意步长 {result.stride}，不是实测延迟。访问 {result.accesses} 次，命中 {result.hits}
        ，未命中 {result.misses}。
      </p>
    </div>
  );
}

function StridePicker({
  stride,
  onChange,
}: {
  stride: CacheStride;
  onChange: (stride: CacheStride) => void;
}) {
  return (
    <fieldset aria-label="示意步长，不是实测延迟">
      <legend className="text-fg-secondary mb-2 text-[12.5px]">步长</legend>
      <div className="flex flex-wrap gap-4">
        {CACHE_STRIDES.map((value) => (
          <label key={value} className="text-fg-primary text-[13px]">
            <input
              className="mr-1"
              type="radio"
              name="cache-stride"
              value={value}
              checked={value === stride}
              onChange={() => onChange(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <p className="text-fg-muted mt-2 text-[12px]">示意步长，不是实测延迟。</p>
    </fieldset>
  );
}

function OutcomeBars({ result }: { result: CacheStrideResult }) {
  const rows = [
    { label: "命中", count: result.hits },
    { label: "未命中", count: result.misses },
  ];

  return (
    <ul className="mt-4 space-y-3" aria-label="命中与未命中">
      {rows.map((row) => {
        const width = percentLabel(row.count, result.accesses);
        return (
          <li key={row.label}>
            <div className="mb-1 flex items-baseline justify-between text-[13px]">
              <span className="text-fg-secondary">{row.label}</span>
              <span className="text-fg-primary">
                {row.count}
                <span className="text-fg-muted"> · {width}</span>
              </span>
            </div>
            <div className="border-border-faint bg-bg-near h-2.5 border" aria-hidden="true">
              <div
                className="text-accent-gold h-full"
                style={{ width, background: "currentColor" }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function WordRows({ steps }: { steps: readonly CacheStep[] }) {
  const byAddress = new Map(steps.map((step) => [step.address, step]));

  return (
    <ol className="mt-4 space-y-2" aria-label="四行示意">
      {Array.from({ length: LINE_COUNT }, (_, line) => (
        <li
          key={line}
          className="border-border-faint flex flex-wrap items-baseline gap-3 border px-3 py-2"
        >
          <span className="text-fg-secondary text-[13px]">行 {line}</span>
          {Array.from({ length: LINE_WORDS }, (_, offset) => {
            const address = line * LINE_WORDS + offset;
            const step = byAddress.get(address);
            const tone = step?.hit ? "text-accent-gold" : "text-fg-muted";
            const state = step === undefined ? "未访问" : step.hit ? "命中" : "未命中";
            return (
              <span key={address} className={`${tone} text-[13px]`}>
                {address} {state}
              </span>
            );
          })}
        </li>
      ))}
    </ol>
  );
}
