"use client";

import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui";

const GraphClient = dynamic(() => import("./GraphClient"), {
  ssr: false,
  loading: () => (
    <div className="bg-bg-deep flex h-screen w-screen items-center justify-center">
      <LoadingSpinner size="md" color="amber" label="正在加载历史图谱…" />
    </div>
  ),
});

export default function GraphLoader() {
  return <GraphClient />;
}
