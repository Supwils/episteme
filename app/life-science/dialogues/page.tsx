import type { Metadata } from "next";
import Link from "next/link";
import { getAllDialogues } from "@/subjects/life-science/lib/dialogues";
import { getScientistById } from "@/subjects/life-science/lib/scientists";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "生命科学对话 — Episteme · 格致",
  description:
    "达尔文与莱尔、孟德尔与达尔文……跨越时代的生物学思想交锋，用对话照亮进化、遗传与生命起源的关键问题。",
  openGraph: {
    title: "生命科学对话 — Episteme · 格致",
    description: "跨越时代的生物学思想交锋，用对话照亮进化、遗传与生命起源的关键问题。",
    type: "website",
  },
};

const ACCENT = "#4a9e6f";

export default function LifeScienceDialoguesPage() {
  const dialogues = getAllDialogues();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / dialogues
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          生命科学<em className="text-accent-green italic"> 对话</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          达尔文与莱尔、孟德尔与达尔文——伟大的生物学家用思辨交锋探索进化、遗传与生命起源的核心问题。
        </p>
      </header>

      <p className="text-fg-disabled mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
        {dialogues.length} 篇对话 · dialogues
      </p>

      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dialogues.map((d) => {
          const names = d.participants.map((p) => getScientistById(p)?.name ?? p);
          return (
            <StaggerItem key={d.slug}>
              <Link
                href={`/life-science/dialogues/${d.slug}`}
                className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(74,158,111,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: ACCENT }}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.28em] uppercase"
                    style={{ borderColor: `${ACCENT}50`, color: ACCENT }}
                  >
                    {d.field}
                  </span>
                </div>
                <div className="relative flex flex-col gap-1.5">
                  <h2 className="font-display text-fg-primary group-hover:text-accent-green text-lg leading-tight font-semibold transition-colors duration-300">
                    {d.title}
                  </h2>
                  {d.question && (
                    <p className="text-fg-secondary text-[13px] leading-relaxed">{d.question}</p>
                  )}
                </div>
                {names.length > 0 && (
                  <p className="text-fg-disabled relative mt-auto font-mono text-[10px] tracking-[0.12em]">
                    {names.join(" · ")}
                  </p>
                )}
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
