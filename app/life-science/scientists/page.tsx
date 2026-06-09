import type { Metadata } from "next";
import Link from "next/link";
import { getAllScientists } from "@/subjects/life-science/lib/scientists";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "科学家 — Universe Knowledge",
  description: "改变我们理解生命的伟大科学家，从达尔文到珍·古道尔",
  openGraph: {
    title: "科学家 — Universe Knowledge",
    description: "改变我们理解生命的伟大科学家，从达尔文到珍·古道尔",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "科学家 — Universe Knowledge",
    description: "改变我们理解生命的伟大科学家，从达尔文到珍·古道尔",
  },
};

const SUPPLEMENT: Record<string, { quote: string; accent: string }> = {
  darwin: { quote: "能够生存下来的物种，不是最强壮的，也不是最聪明的，而是最能适应变化的。", accent: "#4a9e6f" },
  wallace: { quote: "大自然的每一个角落都充满了奇迹。", accent: "#4a9e6f" },
  mendel: { quote: "我的时代会到来的。", accent: "#c8a45a" },
  huxley: { quote: "人类在自然界中的位置，是所有问题中最重要的。", accent: "#4a9e6f" },
  lyell: { quote: "地球的历史只能用地球本身的力量来解释。", accent: "#8b5e3c" },
  margulis: { quote: "生命不是通过战斗征服地球的，而是通过结网。", accent: "#c678dd" },
  watson: { quote: "我们发现了生命的秘密。", accent: "#5a9ad8" },
  crick: { quote: "上帝假说是检验其他假说的试金石。", accent: "#5a9ad8" },
  gould: { quote: "进化不是'进步'的同义词。", accent: "#e8a840" },
  dawkins: { quote: "我们是基因制造的生存机器。", accent: "#e8a840" },
  woese: { quote: "进化的本质不是竞争，而是合作。", accent: "#c678dd" },
  oparin: { quote: "生命是从非生命物质中自然产生的。", accent: "#c678dd" },
  muller: { quote: "突变是进化的原材料。", accent: "#e06c75" },
  hamilton: { quote: "利他行为可以用基因的广义适合度来解释。", accent: "#98c379" },
  "wozniak-olson": { quote: "如果我们拯救了生物多样性，也就拯救了我们自己。", accent: "#98c379" },
};

const SCIENTISTS = getAllScientists();

export default function ScientistsPage() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / scientists
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          科学<em className="text-accent-green italic"> 家</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {SCIENTISTS.length} 位改变我们理解生命的伟大科学家
        </p>
      </header>

      <StaggerGrid className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
        {SCIENTISTS.map((scientist) => {
          const supp = SUPPLEMENT[scientist.id] ?? { quote: "", accent: "#4a9e6f" };
          const lifespan = scientist.deathYear
            ? `${scientist.birthYear}—${scientist.deathYear}`
            : `${scientist.birthYear}—至今`;
          return (
            <StaggerItem key={scientist.id}>
              <Link
                href={`/life-science/scientists/${scientist.id}`}
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex flex-col gap-4 border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(74,158,111,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="badge"
                    style={{ backgroundColor: `${supp.accent}15`, color: supp.accent, borderColor: `${supp.accent}30` }}
                  >
                    {scientist.field}
                  </span>
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.2em]">{lifespan}</span>
                </div>
                <div>
                  <h3 className="font-display text-fg-primary text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-green">
                    {scientist.name}
                  </h3>
                  <p className="text-fg-muted font-mono text-[10px] italic tracking-wider">{scientist.nameEn}</p>
                </div>
                <p className="text-fg-secondary text-sm leading-relaxed">{scientist.keyContribution}</p>
                {supp.quote && (
                  <blockquote className="text-fg-muted border-l-2 pl-4 text-sm italic" style={{ borderColor: `${supp.accent}40` }}>
                    &ldquo;{supp.quote}&rdquo;
                  </blockquote>
                )}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: supp.accent }}
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
