import type { Metadata } from "next";
import HandwrittenCosmicWebPageClient from "./HandwrittenCosmicWebPageClient";

export const metadata: Metadata = {
  title: "手绘·宇宙纤维 — 宇宙物理 — Episteme · 格致",
  description: "手绘风格的宇宙纤维可视化",
  openGraph: {
    title: "手绘·宇宙纤维 — 宇宙物理",
    description: "手绘风格的宇宙纤维可视化",
    type: "website",
  },
};

export default function HandwrittenCosmicWebPage() {
  return <HandwrittenCosmicWebPageClient />;
}
