"use client";

import dynamic from "next/dynamic";

const GlobalSearch = dynamic(
  () => import("./GlobalSearch").then((m) => m.GlobalSearch),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () => import("./ScrollToTop").then((m) => m.ScrollToTop),
  { ssr: false }
);
const VitalsReporter = dynamic(
  () => import("./VitalsReporter").then((m) => m.VitalsReporter),
  { ssr: false }
);

export function ClientShell() {
  return (
    <>
      <GlobalSearch />
      <ScrollToTop />
      <VitalsReporter />
    </>
  );
}
