import type { Metadata } from "next";
import InteractiveExperimentClient from "./InteractiveExperimentClient";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export const metadata: Metadata = {
  title: "互动思想实验 — 哲学思想 — Episteme · 格致",
  description: "交互式哲学思想实验，亲身体验电车难题、洞穴比喻等经典哲学问题",
  openGraph: {
    title: "互动思想实验 — 哲学思想",
    description: "交互式哲学思想实验，亲身体验电车难题、洞穴比喻等经典哲学问题",
    type: "website",
  },
};

export default function InteractiveExperimentPage() {
  return <InteractiveExperimentClient />;
}
