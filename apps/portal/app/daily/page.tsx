import type { Metadata } from 'next';
import { getDailySelected, formatDisplayDate, getWeekday } from '@/lib/daily-selector';
import { DailyKnowledgeCard } from '@/components/DailyKnowledgeCard';
import { DailyShareCard } from '@/components/DailyShareCard';
import { OnThisDay } from '@/components/OnThisDay';
import { DailyQuestionCard } from '@/components/DailyQuestionCard';
import { DailyDomainGrid } from '@/components/DailyDomainGrid';

export const metadata: Metadata = {
  title: '每日知识 — Universe Knowledge',
  description: '今天的历史、科学与哲学，每天一点新知识',
  openGraph: {
    title: '每日知识 — Universe Knowledge',
    description: '今天的历史、科学与哲学',
    type: 'website',
  },
};

export default function DailyPage() {
  const today = new Date();
  const daily = getDailySelected(today);
  const displayDate = formatDisplayDate(daily.date);
  const weekday = getWeekday(daily.date);

  const legacyItems = [
    {
      id: `physics-${daily.date}`,
      title: daily.physics.title,
      description: daily.physics.description,
      domain: 'physics' as const,
      url: daily.physics.url,
      year: daily.physics.year,
      icon: '🔬',
    },
    {
      id: `history-${daily.date}`,
      title: daily.history.title,
      description: daily.history.description,
      domain: 'history' as const,
      url: daily.history.url,
      year: daily.history.year,
      icon: '📜',
    },
    {
      id: `philosophy-${daily.date}`,
      title: daily.philosophy.title,
      description: daily.philosophy.description,
      domain: 'philosophy' as const,
      url: daily.philosophy.url,
      year: daily.philosophy.year,
      icon: '💭',
    },
    {
      id: `economics-${daily.date}`,
      title: daily.economics.title,
      description: daily.economics.description,
      domain: 'economics' as const,
      url: daily.economics.url,
      year: daily.economics.year,
      icon: '📊',
    },
    {
      id: `psychology-${daily.date}`,
      title: daily.psychology.title,
      description: daily.psychology.description,
      domain: 'psychology' as const,
      url: daily.psychology.url,
      year: daily.psychology.year,
      icon: '🧠',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <p className="text-white/30 font-mono text-xs tracking-widest uppercase mb-4">
          每日知识
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          今天学点什么
        </h1>
        <p className="text-white/50 text-lg mb-2">
          每天一点新知识，从历史到科学，从哲学到生命
        </p>
        <p className="text-white/30 text-sm font-mono">
          {displayDate} · {weekday}
        </p>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-16 py-8">
        <DailyDomainGrid daily={daily} />
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-16 py-8">
        <DailyKnowledgeCard
          items={legacyItems}
          fact={daily.fact}
          date={daily.date}
        />
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-16 py-8">
        <DailyQuestionCard question={daily.question} />
      </section>

      {daily.onThisDay.length > 0 && (
        <section className="w-full px-6 sm:px-10 lg:px-16 py-8">
          <h2 className="text-2xl font-bold text-white mb-8">历史上的今天</h2>
          <OnThisDay events={daily.onThisDay} />
        </section>
      )}

      <section className="w-full px-6 sm:px-10 lg:px-16 py-8 pb-20">
        <DailyShareCard daily={daily} />
      </section>
    </div>
  );
}
