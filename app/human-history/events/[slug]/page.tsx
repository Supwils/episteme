import { notFound } from "next/navigation";
import { getEventBySlug } from "@/subjects/history/lib/events";
import { getEventRouteRecord } from "@/subjects/history/lib/event-route-data";
import { ERAS } from "@/subjects/history/lib/eras";
import { EVENT_DETAIL_STYLES } from "./EventDetailStyles";
import {
  EventHero,
  EventQuote,
  EventDetailPages,
  EventLongDesc,
  EventFacts,
  EventFigures,
  EventRelatedEvents,
  EventReferences,
  EventNav,
} from "./EventDetailSections";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return []; // On-demand SSG: build on first request, then cache until the next deployment
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();
  const description = event.desc;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app";
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(event.title)}&section=human-history&description=${encodeURIComponent(description)}`;
  return {
    title: `${event.title} — 人类历史事件`,
    description,
    openGraph: {
      title: `${event.title} — 人类历史事件`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventRouteRecord(slug);
  if (!event) notFound();

  const eraForBg = ERAS.find((e) => e.id === event.era);

  return (
    <>
      <style>{EVENT_DETAIL_STYLES}</style>

      <div className="ev-detail-page">
        <EventHero event={event} />
        <EventQuote event={event} />
        <EventDetailPages event={event} />
        <EventLongDesc event={event} />
        <EventFacts event={event} />
        <EventFigures event={event} />
        <EventRelatedEvents event={event} />
        <EventReferences event={event} />
        <EventNav event={event} />
      </div>
    </>
  );
}
