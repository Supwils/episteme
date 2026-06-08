import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, getCaseStudySlugs, getAllCaseStudies } from "@/src-economics/lib/mdx";
import { CATEGORY_COLORS } from "@/src-economics/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();
  return { title: `${cs.title} — 经济案例`, description: `${cs.title}（${cs.title_en}）· ${cs.year} · ${cs.region}` };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const accent = CATEGORY_COLORS[cs.category] ?? "#c8a45a";
  const allCases = getAllCaseStudies();
  const currentIndex = allCases.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? allCases[currentIndex - 1] : null;
  const next = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : null;
  const readMinutes = Math.max(1, Math.ceil(cs.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/economics/case-studies" className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">← 返回案例列表</Link>
      <Breadcrumb
        items={[
          { label: "经济学", href: "/economics" },
          { label: "案例研究", href: "/economics/case-studies" },
          { label: cs.title },
        ]}
      />
      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: accent }} />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.22em]" style={{ color: accent }}>{cs.year} 年</span>
            <span className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] uppercase" style={{ borderColor: `${accent}40`, color: accent }}>{cs.category}</span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">{cs.region}</span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">{cs.title}</h1>
          {cs.title_en && <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">{cs.title_en}</p>}
          {cs.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.tags.map((tag) => <span key={tag} className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]" style={{ borderColor: `${accent}20`, color: `${accent}cc`, backgroundColor: `${accent}08` }}>{tag}</span>)}
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[900px]">
          <MarkdownRenderer content={cs.content} accentColor="#e8b84a" />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#e8b84a" />
        </aside>
      </div>
      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? <Link href={`/economics/case-studies/${prev.slug}`} className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"><span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一篇</span><span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">{prev.title}</span></Link> : <div className="flex-1" />}
        {next ? <Link href={`/economics/case-studies/${next.slug}`} className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"><span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一篇 →</span><span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">{next.title}</span></Link> : <div className="flex-1" />}
      </nav>
    </div>
  );
}
