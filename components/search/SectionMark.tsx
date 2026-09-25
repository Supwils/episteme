"use client";

import { LazySeal } from "@/components/design/LazySeal";
import { sectionDomain } from "./section-domain";

/** The domain seal beside a search group or preview, in its cluster pigment. */
export function SectionMark({ section, size = 16 }: { section: string; size?: number }) {
  return <LazySeal domain={sectionDomain(section)} size={size} />;
}
