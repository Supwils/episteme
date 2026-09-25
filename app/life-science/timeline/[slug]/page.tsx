import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { withCanonicalPath } from "@/lib/article-canonical";
import {
  getAllTimelineEvents,
  getTimelineEventById,
} from "@/subjects/life-science/lib/timeline-events";
import { DeepReading } from "@/subjects/life-science/components/DeepReading";
import { getEventDetailForTimeline } from "@/subjects/life-science/lib/event-detail";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { ArticleLayout } from "@/components/ArticleLayout";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABEL: Record<string, string> = {
  microorganisms: "微生物",
  animals: "动物",
  plants: "植物",
  earth: "地球",
};

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getTimelineEventById(slug);
  if (!event) notFound();
  const description = event.detail;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(event.event)}&section=life-science&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/life-science/timeline/${slug}`, {
    title: `${event.event}（${event.era}） — 进化时间线`,
    description,
    openGraph: {
      title: `${event.event}（${event.era}） — 进化时间线`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
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
    <ArticleLayout
      backHref="/life-science/timeline"
      url={`/life-science/timeline/${slug}`}
      backLabel="← 返回进化时间线"
      accent={event.accent}
      eyebrow={event.era}
      eyebrowMeta={[CATEGORY_LABEL[event.category] ?? event.category]}
      title={event.event}
      content={eventDetail?.body ?? ""}
      lede={event.detail}
      sidebar={
        <>
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
        </>
      }
      sidebarClassName="space-y-6"
      prev={prev && { href: `/life-science/timeline/${prev.id}`, title: prev.event }}
      next={next && { href: `/life-science/timeline/${next.id}`, title: next.event }}
      prevLabel="上一个节点"
      nextLabel="下一个节点"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <section className="mb-12">
        <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold" id="significance">
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
            <h3 className="font-display mb-3 text-sm font-semibold" style={{ color: event.accent }}>
              之后
            </h3>
            <p className="text-fg-secondary text-sm leading-relaxed">{event.context.after}</p>
          </div>
        </div>
      </section>

      {event.keyFigures.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold" id="key-figures">
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
          <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold" id="deep-dive">
            深入详解：{eventDetail.title}
          </h2>
          <MarkdownRenderer
            domain="life-science"
            content={eventDetail.body}
            accentColor={event.accent}
          />
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
    </ArticleLayout>
  );
}
