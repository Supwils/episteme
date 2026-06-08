import type { Metadata } from "next";
import LocalGroupPageClient from "./LocalGroupPageClient";

export const metadata: Metadata = {
  title: "本星系群 — 宇宙物理 — Universe Knowledge",
  description: "本星系群——银河系与仙女座星系所在的星系群，包含50余个星系",
  openGraph: {
    title: "本星系群 — 宇宙物理",
    description: "本星系群——银河系与仙女座星系所在的星系群，包含50余个星系",
    type: "website",
  },
};

export default function LocalGroupPage() {
  return <LocalGroupPageClient />;
}
