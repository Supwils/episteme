import "../styles/pages/civilizations.css";
import type { Metadata } from "next";
import CivilizationsClient from "./CivilizationsClient";

export const metadata: Metadata = {
  title: "文明对比 — 人类历史 — Episteme · 格致",
  description:
    "通过六维雷达图对比人类历史上最伟大的文明：罗马、汉朝、波斯、埃及、玛雅、蒙古、奥斯曼、大英帝国",
  openGraph: {
    title: "文明对比 — 人类历史",
    description: "通过六维雷达图对比人类历史上最伟大的文明",
    type: "website",
  },
};

export default function CivilizationsPage() {
  return <CivilizationsClient />;
}
