import type { Metadata } from "next";
import P3PageClient from "./P3PageClient";

export const metadata: Metadata = {
  title: "相对论 — 宇宙物理 — Episteme · 格致",
  description: "相对论——时空弯曲与质能等价的革命性理论",
  openGraph: {
    title: "相对论 — 宇宙物理",
    description: "相对论——时空弯曲与质能等价的革命性理论",
    type: "website",
  },
};

export default function P3Page() {
  return <P3PageClient />;
}
