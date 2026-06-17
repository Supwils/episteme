import type { Metadata } from "next";
import HandwrittenLaniakeaPageClient from "./HandwrittenLaniakeaPageClient";

export const metadata: Metadata = {
  title: "手绘·拉尼亚凯亚 — 宇宙物理 — Episteme · 格致",
  description: "手绘风格的拉尼亚凯亚超星系团可视化",
  openGraph: {
    title: "手绘·拉尼亚凯亚 — 宇宙物理",
    description: "手绘风格的拉尼亚凯亚超星系团可视化",
    type: "website",
  },
};

export default function HandwrittenLaniakeaPage() {
  return <HandwrittenLaniakeaPageClient />;
}
