import type { Metadata } from "next";
import { FoodWeb } from "@/subjects/life-science/components/visualizations/FoodWeb";

export const metadata: Metadata = {
  title: "食物网 — Universe Knowledge",
  description: "探索生态系统中物种间的捕食关系与能量流动，理解营养级联效应",
  openGraph: {
    title: "食物网 — Universe Knowledge",
    description: "探索生态系统中物种间的捕食关系与能量流动，理解营养级联效应",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "食物网 — Universe Knowledge",
    description: "探索生态系统中物种间的捕食关系与能量流动，理解营养级联效应",
  },
};

export default function FoodWebPage() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / food web
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          生态<em className="text-accent-green italic"> 食物网</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          探索生态系统中物种间的捕食关系与能量流动。点击物种查看其食物网连接，
          移除物种观察灭绝级联效应。
        </p>
      </header>

      <section className="mb-16">
        <p className="text-fg-muted mb-6 font-mono text-[10px] tracking-[0.38em] uppercase">
          交互式食物网 · interactive food web
        </p>
        <div className="border-border-faint bg-bg-near border p-6">
          <FoodWeb />
        </div>
      </section>

      <section className="mb-16 max-w-2xl">
        <p className="text-fg-muted mb-6 font-mono text-[10px] tracking-[0.38em] uppercase">
          营养级 · trophic levels
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { level: "生产者", color: "#4a9e6f", desc: "通过光合作用将太阳能转化为化学能，是食物链的基础" },
            { level: "初级消费者", color: "#4a8fe0", desc: "植食性动物，直接以生产者为食" },
            { level: "次级消费者", color: "#e08a3a", desc: "以初级消费者为食的捕食者" },
            { level: "顶级捕食者", color: "#e04a4a", desc: "食物链顶端，没有天敌" },
            { level: "分解者", color: "#9b6db7", desc: "分解死亡有机物，将营养归还土壤" },
          ].map((item) => (
            <div
              key={item.level}
              className="group border-border-faint bg-bg-near hover:bg-bg-elevated border p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <h3 className="font-display text-fg-primary text-base font-semibold">
                  {item.level}
                </h3>
              </div>
              <p className="text-fg-secondary text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 max-w-2xl">
        <p className="text-fg-muted mb-6 font-mono text-[10px] tracking-[0.38em] uppercase">
          能量流动 · energy flow
        </p>
        <div className="border-accent-green/20 bg-bg-near border-l-2 p-6">
          <p className="text-fg-secondary text-sm leading-relaxed">
            能量在食物网中单向流动，从生产者到消费者逐级递减。
            每个营养级只能传递约 10% 的能量给上一级（林德曼定律），
            这就是为什么食物链通常不超过 4-5 个营养级。
          </p>
        </div>
      </section>
    </div>
  );
}
