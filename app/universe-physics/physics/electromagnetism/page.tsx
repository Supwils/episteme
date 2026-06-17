import type { Metadata } from "next";
import P2PageClient from "./P2PageClient";

export const metadata: Metadata = {
  title: "电磁学 — 宇宙物理 — Episteme · 格致",
  description: "电磁学——电场、磁场与电磁波的统一理论",
  openGraph: {
    title: "电磁学 — 宇宙物理",
    description: "电磁学——电场、磁场与电磁波的统一理论",
    type: "website",
  },
};

export default function P2Page() {
  return <P2PageClient />;
}
