import type { Metadata } from "next";
import LessonsClient from "./LessonsClient";

export const metadata: Metadata = {
  title: "历史启示 — 人类历史 — Universe Knowledge",
  description: "从历史中汲取智慧，探索关键历史事件的深层启示",
  openGraph: {
    title: "历史启示 — 人类历史",
    description: "从历史中汲取智慧，探索关键历史事件的深层启示",
    type: "website",
  },
};

export default function LessonsPage() {
  return <LessonsClient />;
}
