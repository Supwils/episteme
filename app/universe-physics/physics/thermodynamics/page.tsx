import type { Metadata } from "next";
import P1PageClient from "./P1PageClient";

export const metadata: Metadata = {
  title: "热力学 — 宇宙物理 — Episteme · 格致",
  description: "热力学——能量、熵与热力学定律，理解热现象的本质",
  openGraph: {
    title: "热力学 — 宇宙物理",
    description: "热力学——能量、熵与热力学定律，理解热现象的本质",
    type: "website",
  },
};

export default function P1Page() {
  return <P1PageClient />;
}
