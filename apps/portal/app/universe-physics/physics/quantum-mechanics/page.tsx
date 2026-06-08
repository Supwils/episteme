import type { Metadata } from "next";
import P4PageClient from "./P4PageClient";

export const metadata: Metadata = {
  title: "量子力学 — 宇宙物理 — Universe Knowledge",
  description: "量子力学——微观世界的概率与不确定性，叠加与纠缠",
  openGraph: {
    title: "量子力学 — 宇宙物理",
    description: "量子力学——微观世界的概率与不确定性，叠加与纠缠",
    type: "website",
  },
};

export default function P4Page() {
  return <P4PageClient />;
}
