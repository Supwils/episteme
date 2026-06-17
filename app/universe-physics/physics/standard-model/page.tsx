import type { Metadata } from "next";
import P7PageClient from "./P7PageClient";

export const metadata: Metadata = {
  title: "标准模型 — 宇宙物理 — Episteme · 格致",
  description: "标准模型——描述基本粒子与基本相互作用的理论框架",
  openGraph: {
    title: "标准模型 — 宇宙物理",
    description: "标准模型——描述基本粒子与基本相互作用的理论框架",
    type: "website",
  },
};

export default function P7Page() {
  return <P7PageClient />;
}
