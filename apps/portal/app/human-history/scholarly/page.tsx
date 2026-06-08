import type { Metadata } from "next";
import ScholarlyClient from "./ScholarlyClient";

export const metadata: Metadata = {
  title: "深度讲稿 — 人类历史 — Universe Knowledge",
  description: "学术级历史深度讲稿，严谨考据的历史分析",
  openGraph: {
    title: "深度讲稿 — 人类历史",
    description: "学术级历史深度讲稿，严谨考据的历史分析",
    type: "website",
  },
};

export default function ScholarlyPage() {
  return <ScholarlyClient />;
}
