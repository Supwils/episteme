import { getAllSchools } from "@/lib/schools";
import { SchoolsList } from "@/components/SchoolsList";

export default function SchoolsPage() {
  const schools = getAllSchools();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / schools
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          哲学<em className="text-accent-gold italic"> 流派</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {schools.length} 个跨越东西方的哲学流派，从古希腊的柏拉图学院到当代的分析哲学与后现代思潮。
        </p>
      </header>

      <SchoolsList
        schools={schools.map((s) => ({
          title: s.title,
          era: s.era,
          period: s.period,
          founder: s.founder,
          philosopher: s.philosopher,
          key_figures: s.key_figures,
          tags: s.tags,
          slug: s.slug,
        }))}
      />
    </div>
  );
}
