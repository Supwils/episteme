import type { Metadata, Viewport } from "next";
import { spaceGrotesk, plexMono } from "./fonts";
import { SubjectHeader } from "@/components/SubjectHeader";
import { PageTransition } from "../../components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "物理学 — Universe Knowledge",
  description: "从经典力学到量子场论，探索支配宇宙的基本定律",
  openGraph: {
    title: "物理学 — Universe Knowledge",
    description: "从经典力学到量子场论，探索支配宇宙的基本定律",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "物理学 — Universe Knowledge",
    description: "从经典力学到量子场论，探索支配宇宙的基本定律",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function PhysicsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${plexMono.variable} physics-root`}>
      <SubjectHeader subject="universe-physics" />
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
