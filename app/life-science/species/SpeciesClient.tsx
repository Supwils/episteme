"use client";

import { useState } from "react";


import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getAllSpecies } from "@/src-life-science/lib/species";
import type { Species } from "@/src-life-science/lib/types";
import { STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/animations";

const ALL_SPECIES = getAllSpecies();

const ERA_ACCENTS: Record<string, string> = {
  "太古宙": "#e8a840",
  "元古宙": "#c678dd",
  "古生代": "#5a9ad8",
  "中生代": "#98c379",
  "新生代": "#c8a45a",
  "第四纪": "#a88adf",
  "全新世": "#d19a66",
};

const FILTERS = [
  { key: "all", label: "全部" },
  { key: "extinct", label: "已灭绝" },
  { key: "extant", label: "现存" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function getAccent(species: Species): string {
  return ERA_ACCENTS[species.era] ?? "#4a9e6f";
}

function getTraitsDisplay(species: Species): string {
  return species.keyTraits.join(" · ");
}

export default function SpeciesClient() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const reduce = useReducedMotion();

  const filtered = ALL_SPECIES.filter((s) => {
    if (filter === "extinct") return s.extinct;
    if (filter === "extant") return !s.extinct;
    return true;
  });

  const extinctCount = ALL_SPECIES.filter((s) => s.extinct).length;
  const extantCount = ALL_SPECIES.filter((s) => !s.extinct).length;

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / species catalog
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          物种<em className="text-accent-green italic"> 图鉴</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {ALL_SPECIES.length} 个改变生命演化进程的关键物种 · {extinctCount} 已灭绝 · {extantCount} 现存
        </p>
      </header>

      <div className="mb-8 flex gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors ${
              filter === f.key
                ? "border-accent-green/40 bg-accent-green/10 text-accent-green"
                : "border-border-faint bg-bg-near text-fg-muted hover:text-fg-secondary"
            }`}
          >
            {f.label}
            {f.key === "all" && ` (${ALL_SPECIES.length})`}
            {f.key === "extinct" && ` (${extinctCount})`}
            {f.key === "extant" && ` (${extantCount})`}
          </button>
        ))}
      </div>

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
      >
        {filtered.map((species) => {
          const accent = getAccent(species);
          return (
            <motion.div key={species.id} variants={STAGGER_ITEM}>
              <Link
                href={`/life-science/species/${species.id}`}
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex flex-col gap-4 border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(74,158,111,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="badge"
                    style={{ backgroundColor: `${accent}15`, color: accent, borderColor: `${accent}30` }}
                  >
                    {species.taxonomy.phylum ?? species.taxonomy.kingdom}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.22em] uppercase"
                    style={{ color: species.extinct ? "var(--color-fg-disabled)" : "var(--color-success)" }}
                  >
                    {species.extinct ? "已灭绝" : "现存"}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-fg-primary text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-green">
                    {species.name}
                  </h3>
                  <p className="text-fg-muted font-mono text-[10px] italic tracking-wider">{species.nameEn}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em]">{species.era}</span>
                  <span className="text-fg-disabled font-mono text-[9px]">·</span>
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em]">{species.period}</span>
                </div>
                <p className="text-fg-secondary flex-1 text-sm leading-relaxed">{getTraitsDisplay(species)}</p>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
