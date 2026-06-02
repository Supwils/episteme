import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, getSchoolSlugs } from "@/lib/schools";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { CornerMarks, OrnamentalDivider } from "@/components/school-detail/Decorations";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { KeyFiguresSection, RelatedSchoolsSection } from "@/components/school-detail/Sections";
import { ERA_ACCENT } from "@/lib/constants";

export function generateStaticParams() {
  return getSchoolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) return {};
  return {
    title: `${school.title} — 哲学流派`,
    description: school.founder ?? school.school,
  };
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const founder = school.founder ?? school.philosopher ?? "";
  const period = school.period ?? "";
  const keyFigures = school.key_figures ?? [];
  const accent = ERA_ACCENT[school.era] ?? "#c8a45a";

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/philosophy/schools"
        className="text-fg-muted hover:text-fg-secondary mb-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回流派列表
      </Link>

      <Breadcrumb category="schools" currentTitle={school.title} />

      <header className="relative mb-10 py-8">
        <CornerMarks />

        <div className="mb-3 flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ color: accent }}
          >
            {school.era}
          </span>
          {period && (
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {period}
            </span>
          )}
        </div>

        <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[2.8rem]">
          {school.title}
        </h1>

        {founder && (
          <p className="text-fg-secondary mt-3 text-base">
            创始人：<span className="text-fg-primary font-medium">{founder}</span>
          </p>
        )}

        {keyFigures.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {keyFigures.map((name) => (
              <span
                key={name}
                className="border-fg-disabled/30 text-fg-muted rounded-none border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {school.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {school.tags.map((tag) => (
              <span
                key={tag}
                className="border-fg-disabled/20 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <MarkdownRenderer content={school.content} />

      {keyFigures.length > 0 && (
        <>
          <OrnamentalDivider color={accent} />
          <KeyFiguresSection figures={keyFigures} accent={accent} />
        </>
      )}

      <OrnamentalDivider color={accent} />

      <RelatedSchoolsSection currentSlug={slug} era={school.era} />

      <RelatedContent slug={slug} />
    </article>
  );
}
