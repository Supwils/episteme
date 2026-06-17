import type { Metadata } from "next";
import PhysicsHomeClient from "./PhysicsHomeClient";

export const metadata: Metadata = {
  title: "物理学 — Episteme · 格致",
  description:
    "从经典力学到量子场论，探索支配宇宙的基本定律——力学、电磁学、热力学、相对论与量子力学",
  openGraph: {
    title: "物理学",
    description:
      "从经典力学到量子场论，探索支配宇宙的基本定律——力学、电磁学、热力学、相对论与量子力学",
    type: "website",
  },
};

export default function HomePage() {
  return <PhysicsHomeClient />;
}
