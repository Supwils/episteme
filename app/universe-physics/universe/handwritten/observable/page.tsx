import type { Metadata } from "next";
import HandwrittenObservablePageClient from "./HandwrittenObservablePageClient";

export const metadata: Metadata = {
  title: "手绘·可观测宇宙 — 宇宙物理 — Universe Knowledge",
  description: "手绘风格的可观测宇宙可视化",
  openGraph: {
    title: "手绘·可观测宇宙 — 宇宙物理",
    description: "手绘风格的可观测宇宙可视化",
    type: "website",
  },
};

export default function HandwrittenObservablePage() {
  return <HandwrittenObservablePageClient />;
}
