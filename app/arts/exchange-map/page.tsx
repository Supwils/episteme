import type { Metadata } from "next";
import { ArtExchangeMap } from "@/components/arts/ArtExchangeMap";
import { ArtsDisclaimer, ArtsLinks } from "@/components/arts/lab-ui";

export const metadata: Metadata = {
  title: "全球艺术交流地图 — 艺术、建筑与美学 — Episteme · 格致",
  description: "示意颜料、瓷器、纹样与现代主义取材的长距离移动，不是精确底图。",
};

export default function ExchangeMapPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">交流</p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">全球艺术交流地图</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          颜料、器皿和图像会走路。椭圆只是一张示意桌面，用来点几条被教科书反复提到的路径。它不是世界地图，也不把“影响”写成单向文明等级。
        </p>
      </header>
      <ArtExchangeMap />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ArtsDisclaimer />
        <ArtsLinks
          items={[
            { href: "/arts/traditions/chinese-painting", label: "中国绘画" },
            { href: "/arts/traditions/islamic-visual-culture", label: "伊斯兰视觉文化" },
            { href: "/arts/traditions/african-art-modernity", label: "非洲艺术与现代性" },
          ]}
        />
      </section>
    </main>
  );
}
