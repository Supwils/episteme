import type { Metadata } from "next";
import { MaterialCultureMap } from "@/components/anthropology/MaterialCultureMap";
import { AnthropologyDisclaimer, AnthropologyLinks } from "@/components/anthropology/lab-ui";

export const metadata: Metadata = {
  title: "物质文化分布示意 — 人类学与考古 — Episteme · 格致",
  description: "点选文化区看馆藏与风格传统。椭圆不是遗址坐标。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          示意，不是底图
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">物质文化分布示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          椭圆上的点只为了同时看见几条物质传统，不是经纬度，更不是盗掘可用的地点精度。能核对的是馆藏、发掘报告与贸易记录。
        </p>
      </header>
      <MaterialCultureMap />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          把贝宁铜饰板放进西非，说的是铸造传统与殖民掠夺进入欧洲博物馆的路径。不要把圆点当成可以找到的遗址。
        </p>
        <AnthropologyDisclaimer />
        <AnthropologyLinks
          items={[
            {
              href: "/anthropology/material-culture/museums-and-collections",
              label: "博物馆与收藏",
            },
            { href: "/anthropology/material-culture/things-and-persons", label: "物与人" },
            {
              href: "/anthropology/urban-and-heritage/nagpra-and-repatriation",
              label: "NAGPRA 与归还",
            },
          ]}
        />
      </section>
    </main>
  );
}
