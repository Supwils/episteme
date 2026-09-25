import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { getAllConcepts } from "@/lib/concepts";
import { getAllDialogues } from "@/lib/dialogues";
import { getAllExperiments } from "@/lib/experiments";
import { getAllIsms } from "@/lib/isms";
import { getAllQuestions, getAllThinkers } from "@/lib/mdx";
import { getAllSchools } from "@/lib/schools";
import { ThinkerCarousel } from "@/subjects/philosophy/components/ThinkerCarousel";
import QuotesTimeline from "@/subjects/philosophy/components/visualizations/QuotesTimeline";
import { THINKERS } from "@/subjects/philosophy/lib/home-data";

export const metadata: Metadata = {
  title: "哲学思想 — Episteme · 格致",
  description: "从古希腊到当代的哲学知识图谱——探索思想家、流派与核心问题",
  openGraph: {
    title: "哲学思想",
    description: "从古希腊到当代的哲学知识图谱——探索思想家、流派与核心问题",
    type: "website",
  },
};

export default function PhilosophyHomePage() {
  const sections = [
    {
      href: "/philosophy/thinkers",
      label: "哲学家",
      description: "东西方哲学家的生平、思想与遗产",
      count: getAllThinkers().length,
    },
    {
      href: "/philosophy/schools",
      label: "流派",
      description: "跨越文明的哲学流派全景图",
      count: getAllSchools().length,
    },
    {
      href: "/philosophy/isms",
      label: "主义",
      description: "从唯物主义到存在主义的思想光谱",
      count: getAllIsms().length,
    },
    {
      href: "/philosophy/experiments",
      label: "思想实验",
      description: "改变哲学进程的思想实验",
      count: getAllExperiments().length,
    },
    {
      href: "/philosophy/questions",
      label: "大问题",
      description: "哲学史上最根本的追问与回答",
      count: getAllQuestions().length,
    },
    {
      href: "/philosophy/concepts",
      label: "概念",
      description: "读懂哲学论证要先掌握的基本概念",
      count: getAllConcepts().length,
    },
    {
      href: "/philosophy/dialogues",
      label: "对话",
      description: "让不同时代的哲学家就同一个问题交锋",
      count: getAllDialogues().length,
    },
    {
      href: "/philosophy/timeline",
      label: "时间线",
      description: "按年代排开的哲学家与流派",
      tag: "时间线",
    },
    {
      href: "/philosophy/tree",
      label: "传承树",
      description: "哲学家之间影响与传承的交互图",
      tag: "交互图",
    },
  ];

  return (
    <DomainLanding
      domain="philosophy"
      lede="从古希腊广场的问答到当代语言哲学的边界，从孔子的仁礼到尼采的权力意志——一座穿越文明与时代的哲学知识图谱。"
      sections={sections}
    >
      <section className="landing-block" aria-labelledby="landing-thinkers">
        <h2 id="landing-thinkers" className="landing-block__title">
          重要思想家
        </h2>
        <p className="landing-block__note">一人一句，横向翻阅。</p>
        <ThinkerCarousel thinkers={THINKERS} />
      </section>
      <QuotesTimeline />
    </DomainLanding>
  );
}
