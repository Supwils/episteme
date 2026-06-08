import { notFound } from "next/navigation";
import Link from "next/link";
import { getMathematicianBySlug, getMathematicianSlugs, getAllMathematicians } from "@/src-mathematics/lib/mathematicians";
import { MATH_ERA_ACCENT } from "@/src-mathematics/lib/constants";
import { MathMarkdownRenderer } from "@/src-mathematics/components/MathMarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { createPersonJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import CrossDomainLinks from "@/components/CrossDomainLinks";

export function generateStaticParams() {
  return getMathematicianSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mathematician = getMathematicianBySlug(slug);
  if (!mathematician) notFound();
  const description = `${mathematician.name}：${mathematician.field}。${mathematician.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(mathematician.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return {
    title: `${mathematician.title} — 数学家`,
    description,
    openGraph: { title: `${mathematician.title} — 数学家`, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
  };
}

export default async function MathematicianDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mathematician = getMathematicianBySlug(slug);
  if (!mathematician) notFound();

  const allMathematicians = getAllMathematicians();
  const currentIndex = allMathematicians.findIndex((m) => m.slug === slug);
  const prevMath = (currentIndex > 0 ? allMathematicians[currentIndex - 1] : null) ?? null;
  const nextMath =
    (currentIndex < allMathematicians.length - 1 ? allMathematicians[currentIndex + 1] : null) ?? null;

  const eraColor = MATH_ERA_ACCENT[mathematician.era] || "#6366f1";
  const wordCount = mathematician.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  const jsonLd = createPersonJsonLd({
    name: mathematician.name,
    description: `${mathematician.name}：${mathematician.field}。${mathematician.tags.join("、")}`,
    url: `${SITE_URL}/mathematics/mathematicians/${slug}`,
    birthDate: `${mathematician.birthYear}`,
    deathDate: mathematician.deathYear ? `${mathematician.deathYear}` : undefined,
    nationality: mathematician.nationality,
    jobTitle: 'Mathematician',
    knowsAbout: mathematician.tags,
    memberOf: mathematician.field,
  });

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/mathematics/mathematicians"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回数学家
      </Link>

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: eraColor }}
        />

        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${eraColor}50`, color: eraColor }}
            >
              {mathematician.era}
            </span>
            <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.16em]">
              {mathematician.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {mathematician.title}
          </h1>
          <p className="text-fg-muted font-mono text-sm italic tracking-wider">
            {mathematician.name}
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="text-fg-secondary">
              {mathematician.nationality}
            </span>
            <span className="text-fg-disabled">·</span>
            <span className="text-fg-secondary">
              {mathematician.birthYear}–{mathematician.deathYear ?? "至今"}
            </span>
          </div>

          {mathematician.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {mathematician.tags.map((tag) => (
                <span
                  key={tag}
                  className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] transition-colors hover:border-accent-indigo/30 hover:text-accent-indigo"
                  style={{
                    borderColor: `${eraColor}20`,
                    color: `${eraColor}cc`,
                    backgroundColor: `${eraColor}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[1200px]">
          {mathematician.content ? (
            <MathMarkdownRenderer content={mathematician.content} accentColor={eraColor} />
          ) : (
            <div className="border-border-faint bg-bg-panel border p-8 text-center">
              <p className="text-fg-muted text-sm">详细内容正在编写中。</p>
            </div>
          )}

          <SafeRender>
            <RelatedContent slug={slug} domain="mathematics" entityId={slug} />
          </SafeRender>

          <div className="mt-10">
            <SafeRender>
              <CrossDomainLinks currentApp="mathematics" entityId={slug} />
            </SafeRender>
          </div>
        </article>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              数学家信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">时代</dt>
                <dd className="text-fg-primary mt-0.5">{mathematician.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">领域</dt>
                <dd className="text-fg-primary mt-0.5">{mathematician.field}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">国籍</dt>
                <dd className="text-fg-primary mt-0.5">{mathematician.nationality}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">阅读时间</dt>
                <dd className="text-fg-primary mt-0.5">约 {readMinutes} 分钟</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prevMath ? (
          <Link
            href={`/mathematics/mathematicians/${prevMath.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              ← 上一位
            </span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-indigo">
              {prevMath.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextMath ? (
          <Link
            href={`/mathematics/mathematicians/${nextMath.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              下一位 →
            </span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-indigo">
              {nextMath.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
