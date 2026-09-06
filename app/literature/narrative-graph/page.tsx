import type { Metadata } from "next";
import { NarrativeGraph } from "@/components/literature/NarrativeGraph";
import { LiteratureDisclaimer, LiteratureLinks } from "@/components/literature/lab-ui";

export const metadata: Metadata = {
  title: "叙事结构图谱 — 文学与叙事 — Episteme · 格致",
  description: "用守株待兔四件情节事件，对照故事次序与讲述次序。",
};

export default function NarrativeGraphPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          故事与话语
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">叙事结构图谱</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          情节事件可以按时间排列，讲述却不必。下面四件来自《韩非子·五蠹》的文本事件不变；变的是箭头——你听到它们的次序。
        </p>
      </header>
      <NarrativeGraph />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          圆圈里的数字是情节先后，箭头是话语。从中段起或先给结局，并不增加新事件，只改变读者何时知道原因。韩非后文把这段映射到“用先王之政治当世”，那已经是解释，不画进这张图。
        </p>
        <LiteratureDisclaimer />
        <LiteratureLinks
          items={[
            { href: "/literature/narrative-basics/what-is-a-story", label: "故事是什么" },
            { href: "/literature/theory-and-method/narratology", label: "叙事学" },
            {
              href: "/literature/narrative-basics/time-and-narrative-order",
              label: "时间与叙述次序",
            },
          ]}
        />
      </section>
    </main>
  );
}
