import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import {
  getMathematicianBySlug,
  getAllMathematicians,
} from "@/subjects/mathematics/lib/mathematicians";
import { MATH_ERA_ACCENT } from "@/subjects/mathematics/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createPersonJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mathematician = getMathematicianBySlug(slug);
  if (!mathematician) notFound();
  const description = `${mathematician.name}：${mathematician.field}。${mathematician.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(mathematician.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/mathematics/mathematicians/${slug}`, {
    title: `${mathematician.title} — 数学家`,
    description,
    openGraph: {
      title: `${mathematician.title} — 数学家`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
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
    (currentIndex < allMathematicians.length - 1 ? allMathematicians[currentIndex + 1] : null) ??
    null;

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
    jobTitle: "Mathematician",
    knowsAbout: mathematician.tags,
    memberOf: mathematician.field,
  });

  return (
    <ArticleLayout
      backHref="/mathematics/mathematicians"
      url={`/mathematics/mathematicians/${slug}`}
      backLabel="← 返回数学家"
      accent={eraColor}
      eyebrow={mathematician.era}
      eyebrowMeta={[mathematician.field]}
      title={mathematician.title}
      titleEn={mathematician.name}
      content={mathematician.content}
      meta={
        <>
          {mathematician.nationality} · {mathematician.birthYear}–
          {mathematician.deathYear ?? "至今"}
        </>
      }
      tags={mathematician.tags}
      sidebar={
        <>
          <TableOfContents accentColor={eraColor} />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              数学家信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{mathematician.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  领域
                </dt>
                <dd className="text-fg-primary mt-0.5">{mathematician.field}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  国籍
                </dt>
                <dd className="text-fg-primary mt-0.5">{mathematician.nationality}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  阅读时间
                </dt>
                <dd className="text-fg-primary mt-0.5">约 {readMinutes} 分钟</dd>
              </div>
            </dl>
          </div>
        </>
      }
      prev={
        prevMath && { href: `/mathematics/mathematicians/${prevMath.slug}`, title: prevMath.title }
      }
      next={
        nextMath && { href: `/mathematics/mathematicians/${nextMath.slug}`, title: nextMath.title }
      }
      prevLabel="上一位"
      nextLabel="下一位"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {mathematician.content ? (
        <MarkdownRenderer
          content={mathematician.content}
          accentColor={eraColor}
          domain="mathematics"
        />
      ) : (
        <div className="border-border-faint bg-bg-panel border p-8 text-center">
          <p className="text-fg-muted text-sm">详细内容正在编写中。</p>
        </div>
      )}

      <SafeRender>
        <RelatedContent slug={slug} domain="mathematics" entityId={slug} />
      </SafeRender>
    </ArticleLayout>
  );
}
