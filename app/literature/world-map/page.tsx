import type { Metadata } from "next";
import { WorldTraditionsMap } from "@/components/literature/WorldTraditionsMap";
import { LiteratureDisclaimer, LiteratureLinks } from "@/components/literature/lab-ui";

export const metadata: Metadata = {
  title: "世界文学时空地图 — 文学与叙事 — Episteme · 格致",
  description: "在教学分期里点选几条叙事传统。椭圆不是地球。",
};

export default function WorldMapPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          示意，不是底图
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">世界文学时空地图</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          椭圆上的点只为了同时看见几条传统，不是经纬度。上古、中古、近世、现代是课堂分期：口头传统的记录年代，往往比故事里的时代晚很多。
        </p>
      </header>
      <WorldTraditionsMap />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          把松迪亚塔放进中古，说的是建国传说的时间位置；能核对的文本多是二十世纪录音。荷马、一千零一夜、红楼梦同理：先问写本、刊本、译本，再谈“世界文学”。
        </p>
        <LiteratureDisclaimer />
        <LiteratureLinks
          items={[
            {
              href: "/literature/world-traditions/epic-as-public-memory",
              label: "史诗作为公共记忆",
            },
            { href: "/literature/world-traditions/african-oral-literature", label: "非洲口头文学" },
            {
              href: "/literature/world-traditions/chinese-narrative-tradition",
              label: "汉语叙事传统",
            },
          ]}
        />
      </section>
    </main>
  );
}
