import type { Metadata } from "next";
import P0PageClient from "./P0PageClient";

export const metadata: Metadata = {
  title: "经典力学 — 宇宙物理 — Episteme · 格致",
  description: "经典力学——牛顿运动定律与万有引力的基础物理",
  openGraph: {
    title: "经典力学 — 宇宙物理",
    description: "经典力学——牛顿运动定律与万有引力的基础物理",
    type: "website",
  },
};

export default function P0Page() {
  return <P0PageClient />;
}
