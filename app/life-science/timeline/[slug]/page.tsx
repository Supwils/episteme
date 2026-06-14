import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllTimelineEvents,
  getTimelineEventById,
} from "@/subjects/life-science/lib/timeline-events";
import { DeepReading } from "@/subjects/life-science/components/DeepReading";
import { getEventDetailForTimeline } from "@/subjects/life-science/lib/event-detail";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABEL: Record<string, string> = {
  microorganisms: "微生物",
  animals: "动物",
  plants: "植物",
  earth: "地球",
};

export function generateStaticParams() {
  return getAllTimelineEvents().map((e) => ({ slug: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getTimelineEventById(slug);
  if (!event) notFound();
  const description = event.detail;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(event.event)}&section=life-science&description=${encodeURIComponent(description)}`;
  return {
    title: `${event.event}（${event.era}） — 进化时间线`,
    description,
    openGraph: {
      title: `${event.event}（${event.era}） — 进化时间线`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function TimelineEventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getTimelineEventById(slug);
  if (!event) notFound();

  const eventDetail = getEventDetailForTimeline(slug);
  const allEvents = getAllTimelineEvents();
  const currentIndex = allEvents.findIndex((e) => e.id === slug);
  const prev = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const next = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  const related = allEvents
    .filter((e) => e.id !== event.id && event.connections.includes(e.event))
    .slice(0, 4);

  const jsonLd = createArticleJsonLd({
    title: `${event.event}（${event.era}）`,
    description: event.detail,
    url: `${SITE_URL}/life-science/timeline/${slug}`,
    keywords: [
      event.event,
      event.era,
      CATEGORY_LABEL[event.category] ?? event.category,
      ...event.keyFigures,
    ],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[1200px] min-w-0 flex-1">
          <header className="mb-12">
            <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
              life-science / timeline
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{
                  borderColor: `${event.accent}30`,
                  color: event.accent,
                  backgroundColor: `${event.accent}10`,
                }}
              >
                {event.era}
              </span>
              <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em]">
                {CATEGORY_LABEL[event.category] ?? event.category}
              </span>
            </div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              {event.event}
            </h1>
            <p className="text-fg-secondary mt-4 max-w-2xl text-base leading-relaxed">
              {event.detail}
            </p>
          </header>

          <section className="mb-12">
            <h2
              className="font-display text-fg-primary mb-4 text-xl font-semibold"
              id="significance"
            >
              科学意义
            </h2>
            <p className="text-fg-secondary leading-relaxed">{event.significance}</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold" id="context">
              历史脉络
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div
                className="border-border-faint bg-bg-near border p-6"
                style={{ borderLeftColor: "var(--color-fg-muted)", borderLeftWidth: "3px" }}
              >
                <h3
                  className="font-display mb-3 text-sm font-semibold"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  之前
                </h3>
                <p className="text-fg-secondary text-sm leading-relaxed">{event.context.before}</p>
              </div>
              <div
                className="border-border-faint bg-bg-near border p-6"
                style={{ borderLeftColor: event.accent, borderLeftWidth: "3px" }}
              >
                <h3
                  className="font-display mb-3 text-sm font-semibold"
                  style={{ color: event.accent }}
                >
                  之后
                </h3>
                <p className="text-fg-secondary text-sm leading-relaxed">{event.context.after}</p>
              </div>
            </div>
          </section>

          {event.keyFigures.length > 0 && (
            <section className="mb-12">
              <h2
                className="font-display text-fg-primary mb-4 text-xl font-semibold"
                id="key-figures"
              >
                关键人物
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.keyFigures.map((figure) => (
                  <span
                    key={figure}
                    className="rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.08em]"
                    style={{
                      borderColor: `${event.accent}25`,
                      color: `${event.accent}cc`,
                      backgroundColor: `${event.accent}08`,
                    }}
                  >
                    {figure}
                  </span>
                ))}
              </div>
            </section>
          )}

          {event.openQuestions.length > 0 && (
            <section className="mb-12">
              <h2
                className="font-display text-fg-primary mb-4 text-xl font-semibold"
                id="open-questions"
              >
                未解之谜
              </h2>
              <ul className="space-y-3">
                {event.openQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: event.accent }}
                    />
                    <span className="text-fg-secondary text-sm leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {eventDetail && (
            <section className="mb-12">
              <h2
                className="font-display text-fg-primary mb-4 text-xl font-semibold"
                id="deep-dive"
              >
                深入详解：{eventDetail.title}
              </h2>
              <MarkdownRenderer content={eventDetail.body} accentColor={event.accent} />
            </section>
          )}

          <DeepReading {...event.deepReading} />

          <SafeRender>
            <RelatedContent slug={slug} domain="life-science" entityId={slug} />
          </SafeRender>

          <div className="border-border-faint mt-16 flex items-center justify-between gap-4 border-t pt-8">
            {prev ? (
              <Link
                href={`/life-science/timeline/${prev.id}`}
                className="group flex items-center gap-2 text-sm transition-colors"
              >
                <span className="text-fg-muted group-hover:text-fg-secondary">←</span>
                <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                  {prev.event}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/life-science/timeline/${next.id}`}
                className="group flex items-center gap-2 text-sm transition-colors"
              >
                <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                  {next.event}
                </span>
                <span className="text-fg-muted group-hover:text-fg-secondary">→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>

        <ArticleSidebar contentClassName="space-y-6">
          <TableOfContents accentColor="#4a9e6f" />
          {related.length > 0 && (
            <div className="border-border-faint bg-bg-near border p-5">
              <h3 className="font-display text-fg-primary mb-4 text-sm font-semibold tracking-wide">
                关联事件
              </h3>
              <ul className="space-y-3" role="list">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/life-science/timeline/${r.id}`}
                      className="group flex items-start gap-3 text-sm transition-colors"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: r.accent }}
                      />
                      <span>
                        <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                          {r.event}
                        </span>
                        <span className="text-fg-muted ml-1.5 font-mono text-[10px]">{r.era}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-border-faint bg-bg-near border p-5">
            <h3 className="font-display text-fg-primary mb-4 text-sm font-semibold tracking-wide">
              全部事件
            </h3>
            <ul className="space-y-3" role="list">
              {allEvents.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/life-science/timeline/${e.id}`}
                    className={`group flex items-start gap-3 text-sm transition-colors ${e.id === slug ? "pointer-events-none" : ""}`}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: e.accent }}
                    />
                    <span>
                      <span
                        className={`transition-colors ${e.id === slug ? "text-accent-green" : "text-fg-secondary group-hover:text-accent-green"}`}
                      >
                        {e.event}
                      </span>
                      <span className="text-fg-muted ml-1.5 font-mono text-[10px]">{e.era}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ArticleSidebar>
      </div>
    </div>
  );
}
