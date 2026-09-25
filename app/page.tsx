import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/jsonld";
import { Astrolabe } from "@/components/portal/Astrolabe";
import { ClusterAtlas } from "@/components/portal/ClusterAtlas";
import { TodaySection } from "@/components/portal/TodaySection";
import { ReadingShelf } from "@/components/portal/ReadingShelf";
import { ClimbInvite } from "@/components/portal/ClimbInvite";
import { DeferredHomeKnowledgeContinuum } from "@/components/DeferredHomeKnowledgeContinuum";
import { astrolabeDomainOfDay } from "@/lib/astrolabe";
import { SITE_URL } from "../lib/constants";
import "@/components/portal/portal.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Episteme · 格致 — 从问题出发",
  description: "整理二十二个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。",
  openGraph: {
    title: "Episteme · 格致 — 从问题出发",
    description: "整理二十二个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。",
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
    description: "整理二十二个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。",
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

/**
 * 首页（E4）：① 格致仪 → ② 六簇二十二域 → ③ 今天 → ④ 读完一个主题 →
 * ⑤ 知识连续体 → ⑥ 登上格致山。全部服务端渲染；客户端只有格致仪的选择
 * 控制器、书架的抽书预览与延后载入的连续体。
 */
export default function HomePage() {
  return (
    <div className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />
      <Astrolabe selected={astrolabeDomainOfDay()} />
      <ClusterAtlas />
      <TodaySection />
      <ReadingShelf />
      <DeferredHomeKnowledgeContinuum />
      <ClimbInvite />
    </div>
  );
}
