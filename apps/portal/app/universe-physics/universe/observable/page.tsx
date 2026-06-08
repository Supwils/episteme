import type { Metadata } from "next";
import ObservablePageClient from "./ObservablePageClient";

export const metadata: Metadata = {
  title: "可观测宇宙 — 宇宙物理 — Universe Knowledge",
  description: "可观测宇宙——直径930亿光年的宇宙全景，一切物质与能量的总和",
  openGraph: {
    title: "可观测宇宙 — 宇宙物理",
    description: "可观测宇宙——直径930亿光年的宇宙全景，一切物质与能量的总和",
    type: "website",
  },
};

export default function ObservablePage() {
  return <ObservablePageClient />;
}
