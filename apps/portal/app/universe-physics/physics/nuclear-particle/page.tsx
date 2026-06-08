import type { Metadata } from "next";
import P6PageClient from "./P6PageClient";

export const metadata: Metadata = {
  title: "核与粒子物理 — 宇宙物理 — Universe Knowledge",
  description: "核与粒子物理——原子核内部与基本粒子的世界",
  openGraph: {
    title: "核与粒子物理 — 宇宙物理",
    description: "核与粒子物理——原子核内部与基本粒子的世界",
    type: "website",
  },
};

export default function P6Page() {
  return <P6PageClient />;
}
