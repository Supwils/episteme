import type { ReactNode } from "react";
import { Seal } from "@/components/design/Seal";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/jsonld";
import { SpecimenPlate } from "@/components/design/SpecimenPlate";
import { DOMAINS } from "@/lib/data";
import { getCluster } from "@/lib/domain-clusters";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain } from "@/lib/design/seals";
import { domainSpine } from "@/lib/domain-spine";
import { domainCluster } from "@/lib/knowledge-geometry";
import { createFrontier } from "@/lib/frontier";
import { formatCollection, getDomainStats } from "@/lib/site-stats";
import { DomainBridges } from "./DomainBridges";
import { LandingDigest, type DigestItem } from "./LandingDigest";
import { MiniAstrolabe } from "./MiniAstrolabe";
import { SectionIndex, type LandingSection } from "./SectionIndex";
import { SpineAscent } from "./SpineAscent";
import "./landing.css";

const FRONTIER_ITEMS = 4;

export type DomainLandingProps = {
  /** Route id, e.g. `law`. */
  domain: string;
  /** One or two sentences under the guiding question. */
  lede: string;
  /** Counts for the hero line, already formatted. Defaults to site-stats. */
  stats?: string[];
  sections: LandingSection[];
  recent?: DigestItem[];
  /** Defaults to the domain's first four frontier articles. */
  frontier?: DigestItem[];
  /** Overrides the learning spine's question as the headline. */
  question?: string;
  /** The domain's own module (timeline, tree, 3D, map…), between sections and digest. */
  children?: ReactNode;
};

/**
 * 统一的学科首页骨架（T-DESIGN-05）：引导问题做标题、标本图版与小星盘、学习主线、
 * 板块、学科专属模块、最近更新与前沿、与其他领域的桥。全部服务端渲染，没有滚动
 * 揭示——内容不等动画。
 */
export function DomainLanding({
  domain,
  lede,
  stats,
  sections,
  recent = [],
  frontier,
  question,
  children,
}: DomainLandingProps) {
  const entry = DOMAINS.find((item) => item.id === domain);
  const cluster = domainCluster(domain);
  if (!entry || !cluster || !isSealDomain(domain)) {
    throw new Error(`DomainLanding: unknown domain "${domain}"`);
  }
  const spine = domainSpine(domain);
  const frontierArticles = createFrontier(domain).getAllArticles();
  const domainStats = getDomainStats(domain);
  const heroStats =
    stats ??
    [
      `${domainStats.articles} 篇文章`,
      ...domainStats.collections.map(formatCollection),
      frontierArticles.length > 0 ? `${frontierArticles.length} 篇前沿` : "",
    ].filter(Boolean);
  const frontierDigest =
    frontier ??
    frontierArticles.slice(0, FRONTIER_ITEMS).map((article) => ({
      href: `/${domain}/frontier/${article.slug}`,
      title: article.title,
      meta: article.horizon,
    }));
  const headline = question ?? spine?.question ?? entry.description;
  const pigment = pigmentVar(cluster);

  return (
    <div className="landing" style={{ ["--landing-pigment" as string]: pigment }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: entry.title,
            alternateName: entry.titleEn,
            url: `${SITE_URL}/${domain}`,
            description: headline,
            isPartOf: { "@type": "WebSite", name: "Episteme · 格致", url: SITE_URL },
          }),
        }}
      />
      <header className="landing-hero">
        <div className="landing-hero__text">
          <h1 className="landing-hero__title">
            <Seal domain={domain} size={40} label={false} />
            <span>{entry.title}</span>
            <span className="landing-hero__en" lang="en">
              {entry.titleEn}
            </span>
          </h1>
          <p className="landing-hero__question">{headline}</p>
          <p className="landing-hero__lede">{lede}</p>
          {heroStats.length > 0 ? (
            <p className="landing-hero__stats">{heroStats.join(" · ")}</p>
          ) : null}
        </div>
        <div className="landing-hero__figure" data-landing-plate={domain}>
          <SpecimenPlate domain={domain} accent={pigment} className="landing-hero__plate" />
          <MiniAstrolabe domain={domain} clusterLabel={getCluster(cluster).label} />
        </div>
      </header>

      {spine ? <SpineAscent steps={spine.steps} /> : null}
      <SectionIndex sections={sections} />
      {children}
      <LandingDigest domain={domain} recent={recent} frontier={frontierDigest} />
      <DomainBridges bridges={domainStats.bridges} />
    </div>
  );
}
