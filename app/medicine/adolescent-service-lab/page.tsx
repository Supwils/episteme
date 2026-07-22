import type { Metadata } from "next";
import Link from "next/link";
import { AdolescentServicePortfolioLab } from "@/components/medicine/AdolescentServicePortfolioLab";

export const metadata: Metadata = {
  title: "青少年学校与社区服务方案实验室 — 医学与公共卫生 — Episteme · 格致",
  description:
    "用虚构教学参数探索预算、效果、服务互补、公平最低占比与完整转介路径如何共同改变青少年心理健康服务包。",
};

const EVIDENCE_SOURCES = [
  {
    label: "WHO 青少年心理健康促进与预防指南（2020）",
    href: "https://www.who.int/publications/b/55043",
  },
  {
    label: "WHO 学校卫生服务指南（2021）",
    href: "https://www.who.int/publications/i/item/9789240029392",
  },
  {
    label: "WHO–UNICEF 儿童与青年心理健康服务指南（2024）",
    href: "https://iris.who.int/bitstream/handle/10665/379114/9789240100374-eng.pdf",
  },
] as const;

export default function AdolescentServiceLabPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <header className="mb-9 max-w-4xl">
        <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[#d9a85a] uppercase">
          medicine / adolescent service portfolio
        </p>
        <h1 className="font-display text-fg-primary text-3xl leading-tight font-semibold sm:text-4xl">
          青少年学校与社区服务方案实验室
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          一个地区可以开设很多心理健康项目，却仍没有形成一条可进入、能接收、会跟进的服务路径。本实验把学校环境、早期支持、校外触达、适龄入口、临床能力和连续导航放进同一张决策桌，观察预算与假设如何改变系统结构。
        </p>
      </header>

      <AdolescentServicePortfolioLab />

      <section className="border-border-faint text-fg-secondary mt-10 grid gap-6 border-t pt-8 text-sm leading-relaxed md:grid-cols-3">
        <div>
          <h2 className="text-fg-primary text-base font-semibold">触达不等于接收</h2>
          <p className="mt-2">
            学校课程、教师识别和社区外展能增加入口，但如果没有确认评估和接收服务，更多转介也可能只增加等待与失望。
          </p>
        </div>
        <div>
          <h2 className="text-fg-primary text-base font-semibold">容量不等于路径</h2>
          <p className="mt-2">
            临床团队如果缺少适龄入口、保密说明和连续导航，纸面容量可能无法被真正使用，失访也会削弱实际收益。
          </p>
        </div>
        <div>
          <h2 className="text-fg-primary text-base font-semibold">公平既是权重也是约束</h2>
          <p className="mt-2">
            平均收益最大化可能继续遗漏校外青年、偏远社区、少数语言或残障群体，因此模型同时公开公平权重和最低占比。
          </p>
        </div>
      </section>

      <section
        className="border-border-faint mt-10 border px-5 py-6 sm:px-7"
        aria-labelledby="adolescent-service-evidence-title"
      >
        <h2
          id="adolescent-service-evidence-title"
          className="font-display text-fg-primary text-xl font-semibold"
        >
          模型结构从哪里来
        </h2>
        <p className="text-fg-secondary mt-3 max-w-4xl text-sm leading-relaxed">
          六层结构依据权威指南对促进、预防、学校卫生服务、社区网络、发展适宜照护和跨部门连续性的区分。指南支持的是系统设计原则，不支持本实验中的任何具体成本、效果或最优组合；这些数字全部为虚构教学输入。
        </p>
        <ul className="mt-4 grid gap-2 text-sm">
          {EVIDENCE_SOURCES.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                className="text-[#d9a85a] underline underline-offset-4 hover:decoration-current"
              >
                {source.label} →
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link
          className="text-[#d9a85a] hover:underline"
          href="/medicine/public-health/adolescent-mental-health-school-community-services"
        >
          阅读学校、社区与连续服务 →
        </Link>
        <Link
          className="text-[#d9a85a] hover:underline"
          href="/knowledge-graph?layout=spatial&tourId=from-adolescent-development-to-continuous-support&step=7&focus=medicine%3Aadolescent-mental-health-school-community-services&source=adolescent-service-lab"
        >
          在知识图谱定位服务步骤 →
        </Link>
        <Link
          className="text-[#d9a85a] hover:underline"
          href="/medicine/mental-health-access"
        >
          转到有效覆盖级联 →
        </Link>
      </nav>
    </main>
  );
}
