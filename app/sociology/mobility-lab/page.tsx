import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SociologyLabDisclaimer, SociologyLabLinks } from "@/components/sociology/lab-ui";

const MobilityLab = dynamic(
  () => import("@/components/sociology/MobilityLab").then((mod) => mod.MobilityLab),
  { loading: () => <p className="text-fg-muted text-sm">示意正在载入</p> }
);

export const metadata: Metadata = {
  title: "代际流动示意 — 社会学 — Episteme · 格致",
  description: "移动开放度，看示意队列里子女去向的份额。不是调查表，也不跟踪人。",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">代际流动示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          选一个出身层，再移动开放度。三格是同一出身的 300
          人会落到哪里。下层、中层、上层只是示意分格，不是职业分类方案，也不是一张社会网络。
        </p>
      </header>
      <MobilityLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          开放度记为 t。留在出身层的人数是 300 − 2 × t，另外两层各是 t。t 为 0 时 300
          人全留在出身层；t 为 100 时三层各 100
          人。百分比只是把人数换成便于扫读的写法，四舍五入后三格可能不是刚好 100。
        </p>
        <p>
          {[
            "《社会分层》比较的是子女与父母的位置，并提到埃里克森与戈德索普 1992 年的定性结论：绝对流动会随职业结构变化，相对机会比可以仍旧稳定。",
            "那篇文章没有可复核的转移概率，所以这里不补调查年份，也不补百分比。开放度不是他们的机会比，只是把“出身还管不管去向”画成能改的份额。",
          ].join("")}
        </p>
        <SociologyLabDisclaimer />
        <SociologyLabLinks
          items={[
            { href: "/sociology/concepts/social-stratification", label: "社会分层" },
            {
              href: "/sociology/institutions/education-and-credentialism",
              label: "教育与文凭制度",
            },
          ]}
        />
      </section>
    </div>
  );
}
