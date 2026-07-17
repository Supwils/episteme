import "../styles/pages/map.css";
import type { Metadata } from "next";
import MapClient from "./MapClient";

export const metadata: Metadata = {
  title: "历史地图 — 人类历史 — Episteme · 格致",
  description: "交互式SVG历史地图，可视化展示文明的地理变迁",
  openGraph: {
    title: "历史地图 — 人类历史",
    description: "交互式SVG历史地图，可视化展示文明的地理变迁",
    type: "website",
  },
};

export default function MapPage() {
  return <MapClient />;
}
