import type { Metadata } from "next";
import P8PageClient from "./P8PageClient";

export const metadata: Metadata = {
  title: "前沿物理 — 宇宙物理 — Universe Knowledge",
  description: "前沿物理——暗物质、暗能量与量子引力等未解之谜",
  openGraph: {
    title: "前沿物理 — 宇宙物理",
    description: "前沿物理——暗物质、暗能量与量子引力等未解之谜",
    type: "website",
  },
};

export default function P8Page() {
  return <P8PageClient />;
}
