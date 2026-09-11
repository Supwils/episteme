import type { Metadata } from "next";
import { WorldReligionMap } from "@/components/religion/WorldReligionMap";
import { ReligionDisclaimer, ReligionLinks } from "@/components/religion/lab-ui";

export const metadata: Metadata = {
  title: "世界宗教示意地图 — 宗教学 — Episteme · 格致",
  description: "示意几条传统的历史分布，不是精确人口底图。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">世界宗教示意地图</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          点一条传统，看它被放在古代、中古还是现代这条带子上。色点只标相对位置，不表示信众百分比，也不能当成今日国境。
        </p>
      </header>
      <WorldReligionMap />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          「世界宗教」这个词本身是近代分类。吠陀祭祀、汉郊祀和安第斯朝圣地并排放在这里，是为了打破「只有一神教才算宗教史」的默认镜头，不是说它们属于同一个俱乐部。
        </p>
        <p>
          现代带子上的五旬节运动和无宗教身份，提醒你增长与退出都要带来源年份。示意图不会替皮尤或人口普查发言。
        </p>
        <ReligionDisclaimer />
        <ReligionLinks
          items={[
            {
              href: "/religion/religious-history/formation-of-world-religions",
              label: "世界宗教的形成",
            },
            { href: "/religion/frontier/nones-plateau-after-rls", label: "无宗教身份的走平" },
            { href: "/religion/secularization-chart", label: "世俗化指标示意" },
          ]}
        />
      </section>
    </main>
  );
}
