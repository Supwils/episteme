import type { Metadata } from "next";
import HumanHistoryClient from "./HumanHistoryClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "人类历史 — Episteme · 格致",
  description: "人类历史知识图谱——时间线、图谱、人物与地图，从远古到当代",
  openGraph: {
    title: "人类历史",
    description: "人类历史知识图谱——时间线、图谱、人物与地图，从远古到当代",
    type: "website",
  },
};

export default function HomePage() {
  return <HumanHistoryClient />;
}
