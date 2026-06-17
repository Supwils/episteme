import type { Metadata } from "next";
import { getDailySelected, formatDisplayDate, getWeekday } from "@/lib/daily-selector";
import { DailyShuffle } from "@/components/DailyShuffle";
import { OnThisDay } from "@/components/OnThisDay";

export const metadata: Metadata = {
  title: "每日知识 — Episteme · 格致",
  description: "今天的历史、科学与哲学，每天一点新知识，还可随时「换一批」探索更多",
  openGraph: {
    title: "每日知识 — Episteme · 格致",
    description: "今天的历史、科学与哲学",
    type: "website",
  },
};

// Without this the page is statically generated once at build time, freezing
// "today" at the deploy date. ISR re-renders it at most hourly so `new Date()`
// (and the day's selection) roll over with the calendar — same strategy as the
// /api/daily route. Date is server-side (UTC on Vercel); good enough for a
// once-a-day feature. The "换一批" button re-rolls client-side via /api/daily/shuffle.
export const revalidate = 3600;

export default function DailyPage() {
  const today = new Date();
  const daily = getDailySelected(today);
  const displayDate = formatDisplayDate(daily.date);
  const weekday = getWeekday(daily.date);

  return (
    <div className="min-h-screen w-full">
      <section className="w-full px-6 py-16 sm:px-10 lg:px-16">
        <p className="mb-4 font-mono text-xs tracking-widest text-white/30 uppercase">每日知识</p>
        <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">今天学点什么</h1>
        <p className="mb-2 text-lg text-white/50">
          每天一点新知识，从历史到科学，从哲学到生命——想看更多就「换一批」
        </p>
        <p className="font-mono text-sm text-white/30">
          {displayDate} · {weekday}
        </p>
      </section>

      <section className="w-full px-6 py-8 sm:px-10 lg:px-16">
        <DailyShuffle initial={daily} />
      </section>

      {daily.onThisDay.length > 0 && (
        <section className="w-full px-6 py-8 pb-20 sm:px-10 lg:px-16">
          <h2 className="mb-8 text-2xl font-bold text-white">历史上的今天</h2>
          <OnThisDay events={daily.onThisDay} />
        </section>
      )}
    </div>
  );
}
