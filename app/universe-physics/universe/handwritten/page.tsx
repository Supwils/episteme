import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "手绘宇宙 — 宇宙物理 — Episteme · 格致",
  description: "手绘风格的宇宙尺度图集",
  openGraph: {
    title: "手绘宇宙 — 宇宙物理",
    description: "手绘风格的宇宙尺度图集",
    type: "website",
  },
};

export default function HandwrittenIndex(): never {
  redirect("/universe-physics/universe/handwritten/observable");
}
