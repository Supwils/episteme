import Link from "next/link";
import { getAllSchools } from "@/lib/schools";
import { ERA_ACCENT } from "@/lib/constants";

export function KeyFiguresSection({
  figures,
  accent,
}: {
  figures: string[];
  accent: string;
}) {
  return (
    <section className="mt-10">
      <h3 className="text-fg-primary mb-4 font-mono text-[11px] tracking-[0.32em] uppercase">
        核心人物 · Key Figures
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {figures.map((name) => (
          <div
            key={name}
            className="border-border-faint bg-bg-near relative overflow-hidden border px-4 py-3"
          >
            <span
              aria-hidden
              className="absolute top-0 left-0 h-full w-[2px]"
              style={{ backgroundColor: accent }}
            />
            <p className="text-fg-primary pl-2 font-display text-sm font-medium leading-snug">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RelatedSchoolsSection({
  currentSlug,
  era,
}: {
  currentSlug: string;
  era: string;
}) {
  const allSchools = getAllSchools();
  const related = allSchools
    .filter((s) => s.era === era && s.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  const accent = ERA_ACCENT[era] ?? "#c8a45a";

  return (
    <section className="mt-10">
      <h3 className="text-fg-primary mb-4 font-mono text-[11px] tracking-[0.32em] uppercase">
        同时代流派 · Related Schools
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {related.map((school) => (
          <Link
            key={school.slug}
            href={`/schools/${school.slug}`}
            className="border-border-faint bg-bg-near hover:bg-bg-elevated group relative flex items-center gap-3 overflow-hidden border px-4 py-3 transition-colors"
          >
            <span
              aria-hidden
              className="absolute top-0 left-0 h-full w-[2px] transition-all duration-300 group-hover:w-[3px]"
              style={{ backgroundColor: accent }}
            />
            <div className="pl-2">
              <p className="font-display text-fg-primary text-sm font-medium leading-snug">
                {school.title}
              </p>
              <p className="text-fg-disabled mt-0.5 font-mono text-[9px] tracking-[0.18em]">
                {school.period ?? school.era}
              </p>
            </div>
            <span
              aria-hidden
              className="text-fg-disabled group-hover:text-accent-gold ml-auto font-mono text-xs transition-all duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
