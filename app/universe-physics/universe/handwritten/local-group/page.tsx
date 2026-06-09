import type { Metadata } from "next";
import HandwrittenLocalGroupPageClient from "./HandwrittenLocalGroupPageClient";

export const metadata: Metadata = {
  title: "手绘·本星系群 — 宇宙物理 — Universe Knowledge",
  description: "手绘风格的本星系群可视化",
  openGraph: {
    title: "手绘·本星系群 — 宇宙物理",
    description: "手绘风格的本星系群可视化",
    type: "website",
  },
};

export default function HandwrittenLocalGroupPage() {
  return <HandwrittenLocalGroupPageClient />;
}
