import { TAXONOMY_COLORS } from "../lib/constants";
import type { Species } from "../lib/types";

export function SpeciesCard({ species }: { species: Species }) {
  const kingdomColor = TAXONOMY_COLORS[species.taxonomy.kingdom] ?? "#9ca3af";

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
        style={{ backgroundColor: kingdomColor }}
      />

      <div className="flex flex-1 flex-col gap-2.5 p-4 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.05rem] leading-snug font-semibold text-[#e8e8f0]">
              {species.name}
            </h3>
            <p
              className="mt-0.5 font-mono text-[10px] tracking-wider italic"
              style={{ color: `${kingdomColor}cc` }}
            >
              {species.nameEn}
            </p>
          </div>
          {species.extinct && (
            <span
              className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8px] tracking-widest text-[#ff6b6b]"
              style={{ borderColor: "rgba(255,107,107,0.2)", background: "rgba(255,107,107,0.06)" }}
            >
              已灭绝
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]"
            style={{
              borderColor: `${kingdomColor}30`,
              color: kingdomColor,
              backgroundColor: `${kingdomColor}0a`,
            }}
          >
            {species.era}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-[#888]"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {species.period}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {species.keyTraits.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wide text-[#9ca3af]"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {trait}
            </span>
          ))}
        </div>

        {species.story && (
          <p className="text-[12px] leading-relaxed text-[#a8a8b3]">{species.story}</p>
        )}

        <div className="mt-auto border-t pt-2" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <span className="font-mono text-[9px] tracking-wider text-[#666]">
            {species.taxonomy.kingdom} · {species.taxonomy.phylum}
            {species.taxonomy.class ? ` · ${species.taxonomy.class}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
