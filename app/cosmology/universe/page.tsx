import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "宇宙地图 — 宇宙学 — Episteme · 格致",
  description: "从可观测宇宙到地球的跨尺度宇宙漫游",
  openGraph: {
    title: "宇宙地图 — 宇宙学",
    description: "从可观测宇宙到地球的跨尺度宇宙漫游",
    type: "website",
  },
};

export default function UniverseIndexPage(): never {
  redirect("/cosmology/universe/observable");
}
