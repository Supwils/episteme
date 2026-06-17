import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheoristBySlug, getAllTheorists } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MaslowHierarchy } from "@/subjects/psychology/components/visualizations/MaslowHierarchy";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theorist = getTheoristBySlug(slug);
  if (!theorist) notFound();
  const description = `${theorist.school}。${theorist.tags.join("、")}`;
  return {
    title: `${theorist.title} — 心理学`,
    description,
    openGraph: { title: `${theorist.title} — 心理学`, description },
  };
}

export default async function TheoristDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theorist = getTheoristBySlug(slug);
  if (!theorist) notFound();

  const eraColor = ERA_COLORS[theorist.era] || "#9b7dc4";
  const allTheorists = getAllTheorists();
  const related = allTheorists
    .filter((t) => t.slug !== slug && (t.era === theorist.era || t.school === theorist.school))
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/theorists"
      backLabel="← 返回理论家"
      accent={eraColor}
      eyebrow={theorist.era}
      eyebrowMeta={[theorist.years]}
      title={theorist.title}
      titleEn={theorist.name_en}
      content={theorist.content}
      meta={
        <>
          <p className="text-sm">{theorist.school}</p>
          {theorist.key_contributions.length > 0 && (
            <div className="mt-4">
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                主要贡献
              </p>
              <ul className="text-fg-secondary list-inside list-disc space-y-1 text-sm">
                {theorist.key_contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      }
      tags={theorist.tags}
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              理论家信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{theorist.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  学派
                </dt>
                <dd className="text-fg-primary mt-0.5">{theorist.school}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  生卒年
                </dt>
                <dd className="text-fg-primary mt-0.5">{theorist.years}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关理论家
              </h3>
              <div className="space-y-2">
                {related.map((t) => {
                  const color = ERA_COLORS[t.era] || "#9b7dc4";
                  return (
                    <Link
                      key={t.slug}
                      href={`/psychology/theorists/${t.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {t.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      }
    >
      {slug === "abraham-maslow" && <MaslowHierarchy />}
      <MarkdownRenderer content={theorist.content} accentColor={eraColor} />
    </ArticleLayout>
  );
}
