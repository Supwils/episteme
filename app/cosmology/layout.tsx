import type { Metadata, Viewport } from "next";
import { spaceGrotesk, plexMono } from "./fonts";
import { SubjectHeader } from "@/components/SubjectHeader";
import { PageTransition } from "../../components/PageTransition";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "宇宙学 — Universe Knowledge",
  description: "从可见宇宙的整体结构出发，探索宇宙的起源、演化与最终命运",
  openGraph: {
    title: "宇宙学 — Universe Knowledge",
    description: "从可见宇宙的整体结构出发，探索宇宙的起源、演化与最终命运",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "宇宙学 — Universe Knowledge",
    description: "从可见宇宙的整体结构出发，探索宇宙的起源、演化与最终命运",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function CosmologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${plexMono.variable} cosmology-root`}>
      <SubjectHeader subject="cosmology" />
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
