import type { Metadata } from "next";
import HandwrittenStellarNeighborhoodPageClient from "./HandwrittenStellarNeighborhoodPageClient";

export const metadata: Metadata = {
  title: "手绘·恒星邻里 — 宇宙物理 — Universe Knowledge",
  description: "手绘风格的恒星邻里可视化",
  openGraph: {
    title: "手绘·恒星邻里 — 宇宙物理",
    description: "手绘风格的恒星邻里可视化",
    type: "website",
  },
};

export default function HandwrittenStellarNeighborhoodPage() {
  return <HandwrittenStellarNeighborhoodPageClient />;
}
