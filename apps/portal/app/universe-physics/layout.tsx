import type { Metadata, Viewport } from "next";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import { PageTransition } from "../../components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "universe-physics — scale atlas",
  description:
    "A browser-delivered scale atlas of the universe, from the observable horizon to a single planet.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function PhysicsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} physics-root`}
    >
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
