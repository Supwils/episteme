import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "物理学板块 — 宇宙物理 — Universe Knowledge",
  description: "从经典力学到前沿物理，系统探索物理学的核心理论",
  openGraph: {
    title: "物理学板块 — 宇宙物理",
    description: "从经典力学到前沿物理，系统探索物理学的核心理论",
    type: "website",
  },
};

export default function PhysicsIndex(): never {
  redirect("/universe-physics/physics/classical-mechanics");
}
