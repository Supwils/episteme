import type { Metadata } from "next";
import { SecularizationChart } from "@/components/religion/SecularizationChart";
import { ReligionDisclaimer, ReligionLinks } from "@/components/religion/lab-ui";

export const metadata: Metadata = {
  title: "世俗化指标示意 — 宗教学 — Episteme · 格致",
  description: "切换参与、认同与信任，看“宗教消退”其实测的是哪一项。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">世俗化指标示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          切换参与、认同与信任，看“宗教消退”其实测的是哪一项。
        </p>
      </header>
      <SecularizationChart />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ReligionDisclaimer />
        <ReligionLinks
          items={[
            { href: "/religion", label: "宗教学首页" },
            { href: "/religion/religion-foundations/what-is-religion", label: "什么是宗教" },
          ]}
        />
      </section>
    </main>
  );
}
