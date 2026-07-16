import { notFound } from "next/navigation";
import Link from "next/link";
import { getDebateBySlug, getAllDebates } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();
  return { title: `${debate.title} — 经济学辩论`, description: `${debate.sides.join(" vs ")}` };
}

export default async function DebateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();

  const accent = ERA_COLORS[debate.era] ?? "#c8a45a";
  const allDebates = getAllDebates();
  const currentIndex = allDebates.findIndex((d) => d.slug === slug);
  const prev = currentIndex > 0 ? allDebates[currentIndex - 1] : null;
  const next = currentIndex < allDebates.length - 1 ? allDebates[currentIndex + 1] : null;
  const related = allDebates
    .filter((d) => d.slug !== slug && (d.era === debate.era || debate.related.includes(d.slug)))
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/economics/debates"
      backLabel="← 返回辩论列表"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "辩论", href: "/economics/debates" },
            { label: debate.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={debate.era}
      title={debate.title}
      titleEn={debate.title_en}
      content={debate.content}
      meta={
        <>
          {debate.sides.length >= 2 && (
            <div className="flex items-center gap-4">
              <span className="text-accent-copper font-display text-base font-semibold">
                {debate.sides[0]}
              </span>
              <span className="text-fg-disabled font-mono text-sm">vs</span>
              <span className="text-accent-green font-display text-base font-semibold">
                {debate.sides[1]}
              </span>
            </div>
          )}
          {debate.key_figures.length > 0 && (
            <p className="mt-3">关键人物：{debate.key_figures.join("、")}</p>
          )}
        </>
      }
      prevLabel="上一场"
      nextLabel="下一场"
      prev={prev ? { href: `/economics/debates/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/debates/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor="#e8b84a" />
          {related.length > 0 && (
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关辩论
              </h3>
              <div className="space-y-2">
                {related.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/economics/debates/${d.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: ERA_COLORS[d.era] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {d.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <MarkdownRenderer domain="economics" content={debate.content} accentColor="#c8a45a" />
    </ArticleLayout>
  );
}
