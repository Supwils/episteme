import type { Metadata } from "next";
import { TranslationComparator } from "@/components/literature/TranslationComparator";
import { LiteratureDisclaimer, LiteratureLinks } from "@/components/literature/lab-ui";

export const metadata: Metadata = {
  title: "译本比较器 — 文学与叙事 — Episteme · 格致",
  description: "并置两段公有领域译文，看节奏和关键词怎样被改写。",
};

export default function TranslationComparatorPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          翻译即改写
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">译本比较器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          同一段原文，两份已进入公有领域的英语译文。差别不在“谁更忠实”，而在节奏、疑问句和评价性形容词落在哪里。保护期内译本不放进本页。
        </p>
      </header>
      <TranslationComparator />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          Giles 一八九八年要把李白写成带韵的英诗；Bynner
          一九二九年把“疑是地上霜”收成问句。荷马起句的 πολύτροπον 在 Murray 与 Butler
          里分别偏向计谋与天才。译本自己另有版权——这里用的是发表于一九三〇年及更早的文本。
        </p>
        <LiteratureDisclaimer />
        <LiteratureLinks
          items={[
            {
              href: "/literature/reading-and-reception/translation-as-rewriting",
              label: "翻译即改写",
            },
            { href: "/literature/poetics-and-form/meter-and-the-line", label: "韵律与诗行" },
          ]}
        />
      </section>
    </main>
  );
}
