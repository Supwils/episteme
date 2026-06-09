import type { Metadata } from "next";
import MilkyWayPageClient from "./MilkyWayPageClient";

export const metadata: Metadata = {
  title: "银河系 — 宇宙物理 — Universe Knowledge",
  description: "银河系——我们的星系家园，包含2000亿至4000亿颗恒星",
  openGraph: {
    title: "银河系 — 宇宙物理",
    description: "银河系——我们的星系家园，包含2000亿至4000亿颗恒星",
    type: "website",
  },
};

export default function MilkyWayPage() {
  return <MilkyWayPageClient />;
}
