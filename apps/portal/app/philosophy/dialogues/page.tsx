import type { Metadata } from "next";
import Link from "next/link";
import { getAllDialogues } from "@/lib/dialogues";
import { FIELD_COLORS, ERA_ACCENT } from "@/lib/constants";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "哲学对话 — Universe Knowledge",
  description: "从柏拉图到休谟，哲学家们用对话来探索真理——这些跨越千年的思辨交锋",
};

export default function DialoguesPage() {
  const dialogues = getAllDialogues();

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / dialogues
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          哲学<em className="text-accent-gold italic"> 对话</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          从柏拉图到休谟，哲学家们用对话来探索真理。这些跨越千年的思辨交锋，至今仍在回响。
        </p>
      </header>

      <p className="text-fg-disabled mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
        {dialogues.length} 篇对话 · dialogues
      </p>

      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {dialogues.map((d) => {
          const fieldColor = FIELD_COLORS[d.field] || "#c8a45a";
          const eraColor = ERA_ACCENT[d.era] || "#c8a45a";
          return (
            <StaggerItem key={d.slug}>
              <Link
                href={`/philosophy/dialogues/${d.slug}`}
                className="group border-border-faint bg-bg-panel relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-fg-disabled/30 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: fieldColor }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase transition-colors duration-300"
                    style={{
                      borderColor: `${fieldColor}50`,
                      color: fieldColor,
                    }}
                  >
                    {d.field}
                  </span>
                  <span
                    className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                    style={{
                      borderColor: `${eraColor}30`,
                      color: eraColor,
                    }}
                  >
                    {d.era}
                  </span>
                </div>

                <div className="relative flex flex-col gap-1.5">
                  <h2 className="font-display text-fg-primary text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-accent-gold">
                    {d.title}
                  </h2>
                  <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                    {d.title_en}
                  </p>
                </div>

                <p className="text-fg-secondary relative text-sm">
                  {d.participants.join(" · ")}
                </p>

                <div className="relative mt-auto flex flex-wrap gap-1.5">
                  {d.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  aria-hidden
                  className="text-fg-disabled group-hover:text-accent-gold absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: fieldColor }}
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
