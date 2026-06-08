import type { Metadata } from "next";
import HandwrittenEarthPageClient from "./HandwrittenEarthPageClient";

export const metadata: Metadata = {
  title: "手绘·地球 — 宇宙物理 — Universe Knowledge",
  description: "手绘风格的地球可视化",
  openGraph: {
    title: "手绘·地球 — 宇宙物理",
    description: "手绘风格的地球可视化",
    type: "website",
  },
};

export default function HandwrittenEarthPage() {
  return <HandwrittenEarthPageClient />;
}
