import type { Metadata } from "next";
import LaniakeaPageClient from "./LaniakeaPageClient";

export const metadata: Metadata = {
  title: "拉尼亚凯亚 — 宇宙物理 — Universe Knowledge",
  description: "拉尼亚凯亚超星系团——银河系所在的宇宙家园，包含10万个星系",
  openGraph: {
    title: "拉尼亚凯亚 — 宇宙物理",
    description: "拉尼亚凯亚超星系团——银河系所在的宇宙家园，包含10万个星系",
    type: "website",
  },
};

export default function LaniakeaPage() {
  return <LaniakeaPageClient />;
}
