import { ERA_ACCENT, ERA_BG } from "../lib/constants";
import type { GeologicalEra } from "../lib/types";

export function EraTimeline({ eras }: { eras: GeologicalEra[] }) {
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-12">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .era-timeline-line {
            background: linear-gradient(to bottom,
              rgba(255,255,255,0.02),
              rgba(255,255,255,0.08) 10%,
              rgba(255,255,255,0.08) 90%,
              rgba(255,255,255,0.02)
            );
            box-shadow: 0 0 12px rgba(255,255,255,0.04),
                        0 0 24px rgba(255,255,255,0.02);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .era-timeline-line {
            background: rgba(255,255,255,0.06);
          }
        }
      `}</style>

      <div
        className="era-timeline-line absolute left-1/2 top-0 bottom-0 hidden w-[2px] -translate-x-1/2 sm:block"
      />
      <div
        className="era-timeline-line absolute left-6 top-0 bottom-0 w-[2px] sm:hidden"
      />

      <div className="relative flex flex-col gap-10">
        {eras.map((era, i) => {
          const isLeft = i % 2 === 0;
          const accent = ERA_ACCENT[era.name] ?? "#2a9d8f";

          return (
            <div
              key={era.id}
              className="relative flex items-start gap-6 sm:gap-0"
            >
              <div
                className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2"
                style={{
                  borderColor: accent,
                  backgroundColor: ERA_BG[era.name],
                  boxShadow: `0 0 10px ${accent}40`,
                }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </div>

              <div
                className={`flex-1 rounded-xl border p-4 backdrop-blur-sm sm:w-[calc(50%-2rem)] ${
                  isLeft
                    ? "sm:mr-auto sm:pr-8 sm:text-right"
                    : "sm:ml-auto sm:pl-8 sm:text-left"
                }`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className={`flex items-center gap-2 ${
                    isLeft ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <span className="text-lg">{era.icon}</span>
                  <h3 className="text-[0.95rem] font-semibold text-[#e8e8f0]">
                    {era.name}
                  </h3>
                  <span
                    className="font-mono text-[10px] tracking-wider"
                    style={{ color: accent }}
                  >
                    {era.nameEn}
                  </span>
                </div>

                <p className="mt-1 font-mono text-[11px] text-[#888]">
                  {era.timeRange}
                </p>

                <p className="mt-2 text-[0.82rem] leading-relaxed text-[#b0b0c0]">
                  {era.keyFact}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
