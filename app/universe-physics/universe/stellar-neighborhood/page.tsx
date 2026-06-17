import type { Metadata } from "next";
import StellarNeighborhoodPageClient from "./StellarNeighborhoodPageClient";

export const metadata: Metadata = {
  title: "恒星邻里 — 宇宙物理 — Episteme · 格致",
  description: "恒星邻里——太阳附近的恒星与星际空间，距太阳约20光年范围",
  openGraph: {
    title: "恒星邻里 — 宇宙物理",
    description: "恒星邻里——太阳附近的恒星与星际空间，距太阳约20光年范围",
    type: "website",
  },
};

export default function StellarNeighborhoodPage() {
  return <StellarNeighborhoodPageClient />;
}
