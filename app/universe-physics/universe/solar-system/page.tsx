import type { Metadata } from "next";
import SolarSystemPageClient from "./SolarSystemPageClient";

export const metadata: Metadata = {
  title: "太阳系 — 宇宙物理 — Universe Knowledge",
  description: "太阳系——八大行星与太阳的引力家园，距银河系中心2.6万光年",
  openGraph: {
    title: "太阳系 — 宇宙物理",
    description: "太阳系——八大行星与太阳的引力家园，距银河系中心2.6万光年",
    type: "website",
  },
};

export default function SolarSystemPage() {
  return <SolarSystemPageClient />;
}
