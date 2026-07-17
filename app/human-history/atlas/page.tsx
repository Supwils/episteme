import "../styles/pages/atlas.css";
import type { Metadata } from "next";
import AtlasClient from "./AtlasClient";

export const metadata: Metadata = {
  title: "知识图谱 — 人类历史 — Episteme · 格致",
  description: "交互式历史知识图谱，探索历史事件、人物与时代的关联",
  openGraph: {
    title: "知识图谱 — 人类历史",
    description: "交互式历史知识图谱，探索历史事件、人物与时代的关联",
    type: "website",
  },
};

export default function AtlasPage() {
  return <AtlasClient />;
}
