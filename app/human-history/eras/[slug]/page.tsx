import { notFound } from "next/navigation";
import Link from "next/link";
import { getEraBySlug, getAdjacentEras } from "@/subjects/history/lib/eras";
import {
  HISTORY_EVENT_CATALOG,
  HISTORY_FIGURE_CATALOG,
  type HistoryEventSummary,
  type HistoryFigureSummary,
} from "@/subjects/history/lib/history-catalog";
import { ERA_DETAIL_STYLES } from "./EraDetailStyles";
import {
  formatYear,
  EraOverview,
  EraTimeline,
  EraFigures,
  EraAchievements,
  EraDeepReading,
  EraLegacy,
  EraNav,
} from "./EraDetailSections";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const era = getEraBySlug(slug);
  if (!era) notFound();
  const description = era.desc;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app";
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(era.name)}&section=human-history&description=${encodeURIComponent(description)}`;
  return {
    title: `${era.name} — 人类历史`,
    description,
    openGraph: {
      title: `${era.name} — 人类历史`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

function getEraEvents(eraId: string): HistoryEventSummary[] {
  return HISTORY_EVENT_CATALOG.filter((event) => event.era === eraId).sort(
    (left, right) => left.year - right.year,
  );
}

function getEraFigures(eraId: string): HistoryFigureSummary[] {
  return HISTORY_FIGURE_CATALOG.filter((figure) => figure.era === eraId);
}

export default async function EraDetailPage({ params }: Props) {
  const { slug } = await params;
  const era = getEraBySlug(slug);
  if (!era) notFound();

  const events = getEraEvents(slug);
  const figures = getEraFigures(slug);
  const { prev, next } = getAdjacentEras(slug);

  return (
    <>
      <style>{ERA_DETAIL_STYLES}</style>

      <div className="era-detail-page">
        <div className="era-detail-hero">
          <div className="era-detail-breadcrumb">
            <Link href="/human-history">人类历史</Link>
            <span>/</span>
            <Link href="/human-history/timeline">时间线</Link>
            <span>/</span>
            <span>{era.name}</span>
          </div>
          <span className="era-detail-icon">{/* icon placeholder */}</span>
          <h1 className="era-detail-name" style={{ color: era.color }}>
            {era.name}
          </h1>
          <p className="era-detail-range">
            {formatYear(era.startYear)} — {formatYear(era.endYear)}
          </p>
          <p className="era-detail-desc">{era.desc}</p>
          <div className="era-detail-highlights">
            {era.highlights.map((h) => (
              <span key={h} className="era-highlight-tag">
                {h}
              </span>
            ))}
          </div>
        </div>

        <EraOverview era={era} />
        <EraTimeline events={events} eraColor={era.color} />
        <EraFigures figures={figures} eraColor={era.color} />
        <EraAchievements achievements={era.achievements} />
        <EraLegacy legacy={era.legacy} />
        <EraDeepReading era={era} />
        <EraNav prev={prev} next={next} />
      </div>
    </>
  );
}
