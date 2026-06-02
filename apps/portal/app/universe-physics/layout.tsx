import type { ReactNode } from "react";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import "./globals.css";

export default function UniversePhysicsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} bg-bg-deep text-fg-primary fixed inset-0 z-40 overflow-hidden antialiased`}
    >
      {children}
    </div>
  );
}
