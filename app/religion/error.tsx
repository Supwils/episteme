"use client";

import { DomainError } from "@/components/domain/DomainError";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <DomainError homeHref="/religion" homeLabel="宗教学" reset={reset} />;
}
