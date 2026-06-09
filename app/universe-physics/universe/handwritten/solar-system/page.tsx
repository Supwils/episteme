import type { Metadata } from "next";
import HandwrittenSolarSystemPageClient from "./HandwrittenSolarSystemPageClient";

export const metadata: Metadata = {
  title: "手绘·太阳系 — 宇宙物理 — Universe Knowledge",
  description: "手绘风格的太阳系可视化",
  openGraph: {
    title: "手绘·太阳系 — 宇宙物理",
    description: "手绘风格的太阳系可视化",
    type: "website",
  },
};

export default function HandwrittenSolarSystemPage() {
  return <HandwrittenSolarSystemPageClient />;
}
