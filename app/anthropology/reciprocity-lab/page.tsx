import type { Metadata } from "next";
import { ReciprocityLab } from "@/components/anthropology/ReciprocityLab";
import { AnthropologyDisclaimer, AnthropologyLinks } from "@/components/anthropology/lab-ui";

export const metadata: Metadata = {
  title: "交换与互惠实验室 — 人类学与考古 — Episteme · 格致",
  description: "用概括、均衡与消极互惠看公开交换，不是交易教程。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">交换与互惠实验室</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          萨林斯把互惠写成一段光谱。库拉圈里的臂饰与项圈被记在公开航程里，适合当练习材料。实验室不教你如何组织一次礼物交换。
        </p>
      </header>
      <ReciprocityLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          换类型时问：回赠有没有可观察的期限？记录写在谁的航海志或谁的民族志里？不要把分析范畴当成可以照做的流程。
        </p>
        <AnthropologyDisclaimer />
        <AnthropologyLinks
          items={[
            {
              href: "/anthropology/kinship-and-exchange/gift-and-reciprocity",
              label: "礼物与互惠",
            },
            { href: "/anthropology/kinship-and-exchange/property-and-persons", label: "财产与人" },
            { href: "/anthropology/kinship-diagram", label: "亲属称谓示意图" },
          ]}
        />
      </section>
    </main>
  );
}
