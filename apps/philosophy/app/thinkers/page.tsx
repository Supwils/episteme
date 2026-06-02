import { getAllThinkers } from "@/lib/mdx";
import { ThinkersList } from "@/components/ThinkersList";

export default function ThinkersPage() {
  const thinkers = getAllThinkers();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / thinkers
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          哲学<em className="text-accent-gold italic"> 家</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {thinkers.length} 位东西方哲学家的生平、思想与遗产
        </p>
      </header>

      <ThinkersList
        thinkers={thinkers.map((t) => ({
          title: t.title,
          philosopher: t.philosopher,
          era: t.era,
          school: t.school,
          tags: t.tags,
          slug: t.slug,
        }))}
      />
    </div>
  );
}
