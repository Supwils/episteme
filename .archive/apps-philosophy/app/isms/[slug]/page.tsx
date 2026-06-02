import { notFound } from "next/navigation";
import Link from "next/link";
import { getIsmBySlug, getIsmSlugs, buildSlugByTitleMap, getAllIsms } from "@/lib/isms";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { CATEGORY_ACCENTS } from "@/lib/constants";

export function generateStaticParams() {
  return getIsmSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ism = getIsmBySlug(slug);
  if (!ism) return {};
  return {
    title: `${ism.title}（${ism.title_en}）— 哲学主义`,
    description: `${ism.category} · ${ism.title}`,
  };
}

export default async function IsmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ism = getIsmBySlug(slug);
  if (!ism) notFound();

  const slugMap = buildSlugByTitleMap();
  const accent = CATEGORY_ACCENTS[ism.category] || "#c8a45a";

  const allIsms = getAllIsms();
  const relatedThinkers = allIsms
    .filter(
      (other) =>
        other.slug !== ism.slug &&
        other.key_figures.some((fig) => ism.key_figures.includes(fig)),
    )
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/isms"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        返回主义列表
      </Link>

      <Breadcrumb category="isms" currentTitle={ism.title} />

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-5 blur-2xl"
          style={{ backgroundColor: accent }}
        />

        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${accent}50`, color: accent }}
            >
              {ism.category}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {ism.era}
            </span>
          </div>

          <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[3rem]">
            {ism.title}
          </h1>
          <p className="text-fg-muted mt-2 font-display text-lg italic tracking-wide opacity-70">
            {ism.title_en}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {ism.key_figures.map((fig) => (
              <span
                key={fig}
                className="border-fg-disabled/30 text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors hover:border-accent-gold/30 hover:text-accent-gold"
              >
                {fig}
              </span>
            ))}
          </div>
        </div>
      </header>

      <MarkdownRenderer content={ism.content} accentColor={accent} />

      {ism.opposing.length > 0 && (
        <section className="border-border-faint mt-12 border-t pt-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
              对立立场 · opposing
            </span>
            <span className="bg-border-faint h-px flex-1" />
          </div>
          <div className="flex flex-wrap gap-3">
            {ism.opposing.map((name) => {
              const oppSlug = slugMap.get(name);
              return oppSlug ? (
                <Link
                  key={name}
                  href={`/isms/${oppSlug}`}
                  className="group/opp border-border-faint bg-bg-panel hover:border-accent-gold/30 hover:bg-accent-gold/5 border px-4 py-2 backdrop-blur-sm transition-all duration-300"
                >
                  <span className="text-fg-secondary group-hover/opp:text-accent-gold font-mono text-[11px] tracking-[0.18em] transition-colors">
                    {name}
                  </span>
                </Link>
              ) : (
                <span
                  key={name}
                  className="border-border-faint text-fg-disabled border px-4 py-2 font-mono text-[11px] tracking-[0.18em]"
                >
                  {name}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {relatedThinkers.length > 0 && (
        <section className="border-border-faint mt-10 border-t pt-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
              相关主义 · related isms
            </span>
            <span className="bg-border-faint h-px flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedThinkers.map((other) => {
              const otherAccent = CATEGORY_ACCENTS[other.category] || "#c8a45a";
              return (
                <Link
                  key={other.slug}
                  href={`/isms/${other.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 flex items-center gap-3 border p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="h-8 w-1 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-70"
                    style={{ backgroundColor: otherAccent }}
                  />
                  <div className="flex-1">
                    <h4 className="font-display text-fg-primary text-sm font-semibold transition-colors group-hover:text-accent-gold">
                      {other.title}
                    </h4>
                    <p className="text-fg-muted font-mono text-[9px] tracking-wider">
                      {other.title_en} · {other.category}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <RelatedContent slug={slug} />
    </article>
  );
}


