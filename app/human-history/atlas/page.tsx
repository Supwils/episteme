import "../styles/pages/atlas.css";
import type { Metadata } from "next";
import AtlasClient from "./AtlasClient";

export const metadata: Metadata = {
  title: "历史图谱 — 人类历史 — Episteme · 格致",
  description: "交互式历史图谱，探索历史事件、人物与时代的关联",
  openGraph: {
    title: "历史图谱 — 人类历史",
    description: "交互式历史图谱，探索历史事件、人物与时代的关联",
    type: "website",
  },
};

export default function AtlasPage() {
  // The interactive client renders no heading, so the page supplies one for outline and search.
  return (
    <>
      <h1 className="sr-only">历史图谱</h1>
      <AtlasClient />
    </>
  );
}
