"use client";

import dynamic from "next/dynamic";
import { SearchLauncher } from "./SearchLauncher";
import { NavigationProgress } from "./NavigationProgress";
import { RevealObserver } from "./motion/RevealObserver";

const ScrollToTop = dynamic(() => import("./ScrollToTop").then((m) => m.ScrollToTop), {
  ssr: false,
});
const ReadingPathBar = dynamic(() => import("./ReadingPathBar").then((m) => m.ReadingPathBar), {
  ssr: false,
});
const NarrationPlayer = dynamic(
  () => import("./narration/NarrationPlayer").then((m) => m.NarrationPlayer),
  { ssr: false }
);

export function ClientShell() {
  return (
    <>
      <NavigationProgress />
      <RevealObserver />
      <SearchLauncher />
      <ScrollToTop />
      <ReadingPathBar />
      <NarrationPlayer />
    </>
  );
}
