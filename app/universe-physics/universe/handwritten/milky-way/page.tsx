import type { Metadata } from "next";
import HandwrittenMilkyWayPageClient from "./HandwrittenMilkyWayPageClient";

export const metadata: Metadata = {
  title: "手绘·银河系 — 宇宙物理 — Episteme · 格致",
  description: "手绘风格的银河系可视化",
  openGraph: {
    title: "手绘·银河系 — 宇宙物理",
    description: "手绘风格的银河系可视化",
    type: "website",
  },
};

export default function HandwrittenMilkyWayPage() {
  return <HandwrittenMilkyWayPageClient />;
}
