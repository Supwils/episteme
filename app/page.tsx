import type { Metadata } from "next";
import { HeroSection } from "../components/HeroSection";
import { FeatureGrid } from "../components/FeatureGrid";
import { DomainCard } from "../components/DomainCard";
import { LatestUpdates } from "../components/LatestUpdates";
import { FeaturedContent } from "../components/FeaturedContent";
import { DailyKnowledgeCard } from "../components/DailyKnowledgeCard";
import { getDailyKnowledge } from "../lib/daily-knowledge";
import { DOMAINS } from "../lib/data";
import { SITE_URL } from "../lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Universe Knowledge — 知识即服务平台",
  description:
    "以可视化、沉浸式的方式探索人类最重要的知识，涵盖物理学、宇宙学、人类历史、哲学思想、生命科学、经济学和心理学",
  openGraph: {
    title: "Universe Knowledge — 知识即服务平台",
    description:
      "以可视化、沉浸式的方式探索人类最重要的知识，涵盖物理学、宇宙学、人类历史、哲学思想、生命科学、经济学和心理学",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Universe Knowledge")}&description=${encodeURIComponent("知识即服务平台")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Universe Knowledge",
  url: SITE_URL,
  description:
    "A knowledge platform covering physics, cosmology, human history, philosophy, life science, economics, and psychology",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  const daily = getDailyKnowledge();

  return (
    <div className="bg-bg-base text-fg-primary relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="relative z-1">
        <HeroSection />

        <section className="grid grid-cols-1 gap-6 px-6 py-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </section>

        <section className="w-full px-6 py-16 sm:px-10 lg:px-16">
          <h2 className="font-display text-fg-primary mb-8 text-2xl font-semibold">每日知识</h2>
          <DailyKnowledgeCard items={daily.items} fact={daily.fact} date={daily.date} />
        </section>

        <LatestUpdates />

        <FeaturedContent />

        <FeatureGrid />
      </div>
    </div>
  );
}
