import type { Metadata } from "next";
import GraphWrapper from "./GraphWrapper";

export const metadata: Metadata = {
  title: "关系图谱 — 人类历史 — Universe Knowledge",
  description: "历史事件与人物的关系网络图谱，可视化探索历史的因果关联",
  openGraph: {
    title: "关系图谱 — 人类历史",
    description: "历史事件与人物的关系网络图谱，可视化探索历史的因果关联",
    type: "website",
  },
};

export default function GraphPage() {
  return <GraphWrapper />;
}
