import type { Metadata } from "next";
import PhilosophyTimelineClient from "./PhilosophyTimelineClient";

export const metadata: Metadata = {
  title: "哲学时间线 — 哲学思想 — Episteme · 格致",
  description: "从古希腊到当代的哲学思想发展时间线，浏览重要思想事件",
  openGraph: {
    title: "哲学时间线 — 哲学思想",
    description: "从古希腊到当代的哲学思想发展时间线，浏览重要思想事件",
    type: "website",
  },
};

export default function TimelinePage() {
  return <PhilosophyTimelineClient />;
}
