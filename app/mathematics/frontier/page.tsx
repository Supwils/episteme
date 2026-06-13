import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";

export const metadata: Metadata = {
  title: "研究前沿 — 数学 — Universe Knowledge",
  description:
    "数学领域当下正在推进的研究前沿：尚未解决的开放问题、攻关的团队与机构、近年的突破，以及仍然未知的边界。",
};

export default function FrontierPage() {
  return <FrontierListView domain="mathematics" />;
}
