import type { Metadata } from "next";
import { Suspense } from "react";
import { KnowledgeGraphClient } from "./KnowledgeGraphClient";
import "./globals.css";

export const metadata: Metadata = {
  title: "知识图谱 — Episteme · 格致",
  description: "探索1600+知识单元之间的关联网络，从宇宙物理到人类历史，从哲学思想到生命科学",
};

export default function KnowledgeGraphPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex h-screen w-full items-center justify-center bg-[#08080f] text-sm text-white/45"
          role="status"
          aria-live="polite"
        >
          正在加载知识图谱…
        </div>
      }
    >
      <KnowledgeGraphClient />
    </Suspense>
  );
}
