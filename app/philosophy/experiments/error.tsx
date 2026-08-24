"use client";

import { DomainError } from "@/components/domain/DomainError";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <DomainError homeHref="/philosophy" homeLabel="哲学思想" reset={reset} />;
}
