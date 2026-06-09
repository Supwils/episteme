import { notFound } from "next/navigation";
import Link from "next/link";
import { getDebateBySlug, getDebateSlugs, getAllDebates } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getDebateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();
  const description = `${debate.topic}。关键人物：${debate.key_figures.join("、")}`;
  return {
    title: `${debate.title} — 经典论辩`,
    description,
    openGraph: { title: `${debate.title} — 经典论辩`, description },
  };
}

export default async function DebateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();

  const eraColor = ERA_COLORS[debate.era] || "#6b8fd6";
  const allDebates = getAllDebates();
  const related = allDebates
    .filter((d) => d.slug !== slug && d.era === debate.era)
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(debate.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/psychology/debates" className="text-fg-muted hover:text-accent-purple mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
        ← 返回经典论辩
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: eraColor }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]" style={{ borderColor: `${eraColor}50`, color: eraColor }}>
              {debate.era}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] font-semibold leading-tight tracking-tight md:text-[2.8rem]">
            {debate.title}
          </h1>
          <p className="text-fg-secondary mt-3 text-sm">{debate.topic}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {debate.key_figures.map((fig) => (
              <span key={fig} className="border-fg-disabled/30 text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.18em]">{fig}</span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {debate.tags.map((tag) => (
              <span key={tag} className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={debate.content} accentColor={eraColor} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">论辩信息</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">时代</dt>
                <dd className="text-fg-primary mt-0.5">{debate.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">核心论题</dt>
                <dd className="text-fg-primary mt-0.5">{debate.topic}</dd>
              </div>
              {debate.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">关键人物</dt>
                  <dd className="text-fg-primary mt-0.5">{debate.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关论辩</h3>
              <div className="space-y-2">
                {related.map((d) => {
                  const color = ERA_COLORS[d.era] || "#6b8fd6";
                  return (
                    <Link key={d.slug} href={`/psychology/debates/${d.slug}`} className="group flex items-center gap-2 transition-colors">
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">{d.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
