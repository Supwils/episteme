import type { Metadata } from "next";
import TimelineClient from "./TimelineClient";

export const metadata: Metadata = {
  title: "历史时间线 — 人类历史 — Universe Knowledge",
  description: "从远古到当代的人类历史时间线，浏览重大历史事件",
  openGraph: {
    title: "历史时间线 — 人类历史",
    description: "从远古到当代的人类历史时间线，浏览重大历史事件",
    type: "website",
  },
};

export default function TimelinePage() {
  return <TimelineClient />;
}
