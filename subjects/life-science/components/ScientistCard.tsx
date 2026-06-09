import { ERA_ACCENT, ERA_BG } from "../lib/constants";
import type { Scientist } from "../lib/types";

export function ScientistCard({ scientist }: { scientist: Scientist }) {
  const accent = ERA_ACCENT[scientist.era] ?? "#2a9d8f";

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.08)]"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <div
        className="h-[2px] w-full transition-all duration-500 group-hover:h-[3px]"
        style={{ backgroundColor: accent }}
      />

      <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-display text-lg font-bold italic"
            style={{
              borderColor: `${accent}30`,
              color: accent,
              backgroundColor: ERA_BG[scientist.era],
            }}
          >
            {scientist.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.1rem] font-semibold leading-snug text-[#e8e8f0] transition-colors duration-300 group-hover:text-[#fff]">
              {scientist.name}
            </h3>
            <p
              className="mt-0.5 font-mono text-[10px] italic tracking-wider"
              style={{ color: `${accent}cc` }}
            >
              {scientist.nameEn}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{
              borderColor: `${accent}30`,
              color: accent,
              backgroundColor: `${accent}0a`,
            }}
          >
            {scientist.era}
          </span>
          <span
            className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-[#9ca3af]"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {scientist.field}
          </span>
        </div>

        <p className="text-[0.82rem] leading-relaxed text-[#b0b0c0]">
          {scientist.keyContribution}
        </p>

        <div className="mt-auto border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-wider text-[#666]">
                代表作
              </span>
              <p className="mt-0.5 text-[0.8rem] font-medium text-[#d0d0e0]">
                {scientist.famousWork}
              </p>
            </div>
            <span className="font-mono text-[10px] text-[#666]">
              {scientist.birthYear}–{scientist.deathYear ?? "至今"}
            </span>
          </div>
        </div>
      </div>

      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
    </div>
  );
}
