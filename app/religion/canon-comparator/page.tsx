import type { Metadata } from "next";
import { CanonComparator } from "@/components/religion/CanonComparator";
import { ReligionDisclaimer, ReligionLinks } from "@/components/religion/lab-ui";

export const metadata: Metadata = {
  title: "经典开篇比较器 — 宗教学 — Episteme · 格致",
  description: "并置公有领域开篇，看宇宙论怎样被写成句子。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">经典开篇比较器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          三段都是公有领域文本。先读句子，再切换「谁在说话 / 它声称什么 /
          体裁」。比较的是开篇如何工作，不是哪一部更真。
        </p>
      </header>
      <CanonComparator />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          《创世记》用「起初」把世界放进叙事；《老子》先限制命名；《心经》把洞察连在一位菩萨的观照上。三种宇宙论，三种句法。
        </p>
        <p>
          汉译本身已经是解释。和合本、通行本老子、玄奘译经各自带着译者的选择。若要看翻译如何改写，可以转到经文翻译那一篇。
        </p>
        <ReligionDisclaimer />
        <ReligionLinks
          items={[
            { href: "/religion/texts-and-canons/scripture-and-canon", label: "经典与正典" },
            {
              href: "/religion/texts-and-canons/translation-of-sacred-texts",
              label: "神圣文本的翻译",
            },
            { href: "/religion/religion-foundations/myth-and-cosmos", label: "神话与宇宙" },
          ]}
        />
      </section>
    </main>
  );
}
