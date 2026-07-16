"use client";

import dynamic from "next/dynamic";
import { GlobalSearch } from "./GlobalSearch";

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
      <GlobalSearch />
      <ScrollToTop />
      <ReadingPathBar />
      <NarrationPlayer />
    </>
  );
}
