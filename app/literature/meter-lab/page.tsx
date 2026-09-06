import type { Metadata } from "next";
import { MeterLab } from "@/components/literature/MeterLab";
import { LiteratureDisclaimer, LiteratureLinks } from "@/components/literature/lab-ui";

export const metadata: Metadata = {
  title: "格律与音步实验室 — 文学与叙事 — Episteme · 格致",
  description: "数五言、七言与英语抑扬五音步的停顿，而不是给诗打分。",
};

export default function MeterLabPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          可数的诗行
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">格律与音步实验室</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          格律首先是一种计数：几个字、几拍、在哪里停。下面三行都来自公有领域文本。粗线标示教学上的重拍，不是录音，也不是韵书。
        </p>
      </header>
      <MeterLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          普通话四声带不回中古入声。英语音步在实际朗读里会滑步。实验室只让你看见“行是被切开的”，不要把它写成诗歌的本质。
        </p>
        <LiteratureDisclaimer />
        <LiteratureLinks
          items={[
            { href: "/literature/poetics-and-form/meter-and-the-line", label: "韵律与诗行" },
            { href: "/literature/poetics-and-form/metaphor-and-image", label: "隐喻与意象" },
          ]}
        />
      </section>
    </main>
  );
}
