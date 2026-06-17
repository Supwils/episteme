import type { Metadata } from "next";
import CosmicWebPageClient from "./CosmicWebPageClient";

export const metadata: Metadata = {
  title: "宇宙纤维 — 宇宙物理 — Episteme · 格致",
  description: "宇宙纤维——宇宙最大尺度的丝状结构，星系沿暗物质骨架分布",
  openGraph: {
    title: "宇宙纤维 — 宇宙物理",
    description: "宇宙纤维——宇宙最大尺度的丝状结构，星系沿暗物质骨架分布",
    type: "website",
  },
};

export default function CosmicWebPage() {
  return <CosmicWebPageClient />;
}
