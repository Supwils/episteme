import type { Metadata } from "next";
import LifeScienceHomeClient from "./LifeScienceHomeClient";
import type { LifeHomeStat, LifeQuickLink } from "./LifeScienceHomeClient";
import { QUICK_LINKS } from "@/subjects/life-science/lib/home-data";
import { getAllEras } from "@/subjects/life-science/lib/eras";
import { getAllExtinctions } from "@/subjects/life-science/lib/extinctions";
import { getAllScientists } from "@/subjects/life-science/lib/scientists";
import { getAllSpecies } from "@/subjects/life-science/lib/species";

export const metadata: Metadata = {
  title: "生命科学 — Episteme · 格致",
  description: "40亿年的生命演化史诗——从自我复制分子到寒武纪大爆发，从恐龙统治到人类崛起",
  openGraph: {
    title: "生命科学",
    description: "40亿年的生命演化史诗——从自我复制分子到寒武纪大爆发，从恐龙统治到人类崛起",
    type: "website",
  },
};

export default function LifeScienceHomePage() {
  // Counted from the real loaders so hero stats never drift from content.
  const speciesCount = getAllSpecies().length;
  const scientistCount = getAllScientists().length;

  const stats: LifeHomeStat[] = [
    { value: getAllEras().length, label: "地质时代", suffix: "个" },
    { value: speciesCount, label: "关键物种", suffix: "" },
    { value: getAllExtinctions().length, label: "大灭绝", suffix: "次" },
    { value: scientistCount, label: "科学家", suffix: "位" },
  ];

  const quickLinks: LifeQuickLink[] = QUICK_LINKS.map((link) => {
    if (link.href === "/life-science/species") {
      return { ...link, description: `${speciesCount} 个关键物种的详细档案与演化故事` };
    }
    if (link.href === "/life-science/scientists") {
      return { ...link, description: `${scientistCount} 位改变我们理解生命的伟大科学家` };
    }
    return { ...link };
  });

  return <LifeScienceHomeClient stats={stats} quickLinks={quickLinks} />;
}
