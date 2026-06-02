import type { NarrativeSection as NarrativeSectionType } from "@/src-physics/lib/content";

type Props = {
  section: NarrativeSectionType;
  index: number;
  /** DOM id used by AtlasToc for anchor scrolling. */
  id?: string;
};

export function NarrativeSection({ section, index, id }: Props) {
  return (
    <section
      id={id}
      data-toc-idx={index}
      className="border-fg-disabled/25 flex scroll-mt-16 flex-col gap-3 border-t pt-6"
    >
      <header className="flex items-baseline gap-3">
        <span
          data-num
          className="text-accent-warm/80 font-mono text-[11px] tracking-[0.32em] uppercase"
        >
          §{String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-fg-primary text-2xl leading-tight md:text-3xl">
          {section.heading}
        </h3>
      </header>
      <div className="flex flex-col gap-3">
        {section.body.map((paragraph, i) => (
          <p key={i} className="text-fg-secondary text-[16px] leading-[1.78] tracking-[0.01em]">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
