import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/jsonld";
import { HeroSection } from "../components/HeroSection";
import { HeroBackdrop } from "../components/HeroBackdrop";
import { FeatureGrid } from "../components/FeatureGrid";
import { DomainCard } from "../components/DomainCard";
import { LatestUpdates } from "../components/LatestUpdates";
import { FeaturedContent } from "../components/FeaturedContent";
import { DailyKnowledgeCard } from "../components/DailyKnowledgeCard";
import { DeferredHomeKnowledgeContinuum } from "../components/DeferredHomeKnowledgeContinuum";
import { HomeMotionController } from "../components/HomeMotionController";
import { getDailyKnowledge } from "../lib/daily-knowledge";
import { DOMAINS } from "../lib/data";
import { getClustersWithDomains } from "../lib/domain-clusters";
import { SITE_URL } from "../lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Episteme · 格致 — 从问题出发",
  description: "整理十八个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。",
  openGraph: {
    title: "Episteme · 格致 — 从问题出发",
    description: "整理十八个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Episteme · 格致")}&description=${encodeURIComponent("从问题出发，顺着知识的线索继续读下去")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Episteme · 格致 — 从问题出发",
    description: "整理十八个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。",
    images: [
      `/api/og?title=${encodeURIComponent("Episteme · 格致")}&description=${encodeURIComponent("从问题出发，顺着知识的线索继续读下去")}`,
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Episteme · 格致",
  url: SITE_URL,
  description:
    "整理自然科学、形式科学、社会科学与人文学科的文章、知识图谱与阅读路线，帮助读者顺着概念之间的联系继续阅读。",
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
    <div
      className="bg-bg-base text-fg-primary relative min-h-screen overflow-hidden"
      data-home-motion-root
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />

      <HeroBackdrop />
      <HomeMotionController />

      <div className="relative z-1">
        <HeroSection />

        {getClustersWithDomains(DOMAINS).map((cluster) => (
          <section key={cluster.id} className="px-6 pt-10 pb-6 sm:px-10 lg:px-16">
            <header className="mb-6 flex items-baseline gap-3" data-home-reveal>
              <h2 className="font-display text-fg-primary text-2xl font-semibold tracking-tight">
                {cluster.label}
              </h2>
              <span className="text-fg-muted font-mono text-[11px] tracking-[0.28em] uppercase">
                {cluster.en}
              </span>
              <span className="bg-border-faint h-px flex-1" />
              <span className="text-fg-disabled font-mono text-[11px] tracking-[0.22em]">
                {cluster.domains.length} 个领域
              </span>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cluster.domains.map((domain) => (
                <DomainCard key={domain.id} domain={domain} index={DOMAINS.indexOf(domain)} />
              ))}
            </div>
          </section>
        ))}

        <DeferredHomeKnowledgeContinuum />

        <section className="w-full px-6 py-16 sm:px-10 lg:px-16">
          <h2 className="font-display text-fg-primary mb-8 text-2xl font-semibold" data-home-reveal>
            每日知识
          </h2>
          <DailyKnowledgeCard items={daily.items} fact={daily.fact} date={daily.date} />
        </section>

        <LatestUpdates />

        <FeaturedContent />

        <FeatureGrid />
      </div>
    </div>
  );
}
