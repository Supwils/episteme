import type { Metadata } from "next";
import EarthPageClient from "./EarthPageClient";

export const metadata: Metadata = {
  title: "地球 — 宇宙物理 — Universe Knowledge",
  description: "地球——我们唯一的家园行星，距太阳1.5亿公里的宜居世界",
  openGraph: {
    title: "地球 — 宇宙物理",
    description: "地球——我们唯一的家园行星，距太阳1.5亿公里的宜居世界",
    type: "website",
  },
};

export default function EarthPage() {
  return <EarthPageClient />;
}
