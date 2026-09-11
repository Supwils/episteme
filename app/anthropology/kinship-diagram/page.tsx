import type { Metadata } from "next";
import { KinshipDiagram } from "@/components/anthropology/KinshipDiagram";
import { AnthropologyDisclaimer, AnthropologyLinks } from "@/components/anthropology/lab-ui";

export const metadata: Metadata = {
  title: "亲属称谓示意图 — 人类学与考古 — Episteme · 格致",
  description: "切换爱斯基摩型与易洛魁型称谓，看同一套亲属词切出不同的人。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">亲属称谓示意图</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          摩尔根把世界各地的称谓收成几型。这里只让两型互相切换：同一位置在英语里可能叫
          cousin，在另一种系统里却并入兄弟姊妹。示意图不是某族谱的真实名单。
        </p>
      </header>
      <KinshipDiagram />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          先问：这个词覆盖哪些人？再问：分类来自哪一份民族志或哪一本教科书？不要把示意圆点当成某座村庄的可走访地址。
        </p>
        <AnthropologyDisclaimer />
        <AnthropologyLinks
          items={[
            { href: "/anthropology/kinship-and-exchange/kinship-terminology", label: "亲属称谓" },
            {
              href: "/anthropology/kinship-and-exchange/descent-and-alliance",
              label: "继嗣与联姻",
            },
            { href: "/anthropology/reciprocity-lab", label: "交换与互惠实验室" },
          ]}
        />
      </section>
    </main>
  );
}
