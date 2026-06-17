import type { Metadata } from "next";
import LifeScienceHomeClient from "./LifeScienceHomeClient";

export const metadata: Metadata = {
  title: "生命科学 — Episteme · 格致",
  description: "40亿年的生命演化史诗——从自我复制分子到寒武纪大爆发，从恐龙统治到人类崛起",
  openGraph: {
    title: "生命科学",
    description: "40亿年的生命演化史诗——从自我复制分子到寒武纪大爆发，从恐龙统治到人类崛起",
    type: "website",
  },
};

export default function LifeScienceHomePage() {
  return <LifeScienceHomeClient />;
}
