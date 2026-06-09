import type { Metadata } from "next";
import P5PageClient from "./P5PageClient";

export const metadata: Metadata = {
  title: "原子与分子 — 宇宙物理 — Universe Knowledge",
  description: "原子与分子物理——物质的微观构成与相互作用",
  openGraph: {
    title: "原子与分子 — 宇宙物理",
    description: "原子与分子物理——物质的微观构成与相互作用",
    type: "website",
  },
};

export default function P5Page() {
  return <P5PageClient />;
}
