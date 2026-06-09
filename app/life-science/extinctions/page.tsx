import type { Metadata } from "next";
import Link from "next/link";
import { getAllExtinctions } from "@/subjects/life-science/lib/extinctions";
import { FadeInSection } from "@/components/FadeInSection";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "大灭绝事件 — Universe Knowledge",
  description: "地球历史上 5 次大灭绝事件的原因、过程与后果",
  openGraph: {
    title: "大灭绝事件 — Universe Knowledge",
    description: "地球历史上 5 次大灭绝事件的原因、过程与后果",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "大灭绝事件 — Universe Knowledge",
    description: "地球历史上 5 次大灭绝事件的原因、过程与后果",
  },
};

const SUPPLEMENT: Record<string, { victims: string; aftermath: string; accent: string }> = {
  ordovician: {
    victims: "三叶虫、笔石、腕足类大量灭绝",
    aftermath: "为鱼类的辐射演化腾出了生态位",
    accent: "#5a9ad8",
  },
  devonian: {
    victims: "盾皮鱼全军覆没，珊瑚礁几乎消失",
    aftermath: "两栖动物开始登上陆地",
    accent: "#5a9ad8",
  },
  permian: {
    victims: "96% 海洋物种、70% 陆地脊椎动物灭绝",
    aftermath: "生态系统恢复花了近 1000 万年，恐龙趁机崛起",
    accent: "#d85a5a",
  },
  "triassic-jurassic": {
    victims: "大部分大型两栖动物、许多爬行动物类群",
    aftermath: "恐龙开始统治陆地",
    accent: "#e8a840",
  },
  cretaceous: {
    victims: "非鸟类恐龙、翼龙、沧龙、菊石全部灭绝",
    aftermath: "哺乳动物迅速辐射演化，开启新生代",
    accent: "#d85a5a",
  },
};

const EXTINCTIONS = getAllExtinctions();

const CURRENT_EXTINCTION = {
  name: "第六次大灭绝",
  latin: "Holocene / Anthropocene Extinction",
  when: "进行中",
  rate: "比自然背景灭绝速率高 100—1000 倍",
  causes: [
    "栖息地破坏与碎片化",
    "过度捕捞与狩猎",
    "气候变化",
    "污染（塑料、化学物质）",
    "外来物种入侵",
  ],
  facts: [
    "自 1970 年以来，野生动物种群数量下降了 69%",
    "每天约有 150—200 个物种灭绝",
    "全球约 100 万种动植物面临灭绝威胁",
    "珊瑚礁可能在 2050 年前全部消失",
  ],
};

export default function ExtinctionsPage() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-16">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / mass extinctions
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          大灭绝<em className="text-accent-green italic"> 事件</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {EXTINCTIONS.length} 次大灭绝重塑了生命演化的轨迹——每一次灾难都为新的生命形式创造了机会
        </p>
      </header>

      <StaggerGrid className="space-y-8 mb-16">
        {EXTINCTIONS.map((ext) => {
          const supp = SUPPLEMENT[ext.id] ?? { victims: "", aftermath: "", accent: "#5a9ad8" };
          return (
            <StaggerItem key={ext.id}>
              <Link
                href={`/life-science/extinctions/${ext.id}`}
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated block border p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(74,158,111,0.12)]"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex flex-col items-center sm:items-start sm:min-w-[140px]">
                    <span
                      className="font-display text-4xl font-bold tabular-nums"
                      style={{ color: supp.accent }}
                    >
                      {ext.speciesLostPercent}%
                    </span>
                    <span className="text-fg-muted font-mono text-[9px] tracking-[0.22em] uppercase mt-1">
                      物种灭绝率
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-display text-fg-primary text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-green">
                        {ext.name}
                      </h2>
                      <span className="text-fg-disabled font-mono text-[9px] italic">{ext.nameEn}</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4 block" style={{ color: supp.accent }}>
                      {ext.dateDisplay}
                    </span>
                    <p className="text-fg-secondary text-sm leading-relaxed mb-4">{ext.description}</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="info-card" style={{ borderLeftColor: "var(--color-danger)" }}>
                        <div className="info-card-title" style={{ color: "var(--color-danger)" }}>受害者</div>
                        <p className="text-fg-secondary text-sm leading-relaxed">{supp.victims}</p>
                      </div>
                      <div className="info-card info-card-green">
                        <div className="info-card-title" style={{ color: "var(--color-accent-green)" }}>后果</div>
                        <p className="text-fg-secondary text-sm leading-relaxed">{supp.aftermath}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>

      <FadeInSection className="border-border-faint border-t pt-16">
        <div className="mb-8">
          <h2 className="font-display text-fg-primary text-2xl font-semibold mb-2">
            {CURRENT_EXTINCTION.name}
          </h2>
          <p className="text-fg-muted font-mono text-[10px] tracking-[0.22em] uppercase">
            {CURRENT_EXTINCTION.latin} · {CURRENT_EXTINCTION.when}
          </p>
        </div>

        <div className="info-card" style={{ borderLeftColor: "var(--color-danger)" }}>
          <div className="info-card-title" style={{ color: "var(--color-danger)" }}>灭绝速率</div>
          <p className="text-fg-primary text-sm font-medium">{CURRENT_EXTINCTION.rate}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-8">
          <div>
            <h3 className="font-display text-fg-primary text-lg font-semibold mb-4">主要原因</h3>
            <ul className="space-y-3">
              {CURRENT_EXTINCTION.causes.map((cause) => (
                <li key={cause} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                  <span className="text-fg-secondary text-sm leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-fg-primary text-lg font-semibold mb-4">关键数据</h3>
            <ul className="space-y-3">
              {CURRENT_EXTINCTION.facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" />
                  <span className="text-fg-secondary text-sm leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
