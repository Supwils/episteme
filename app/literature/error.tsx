"use client";

import { DomainError } from "@/components/domain/DomainError";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <DomainError homeHref="/literature" homeLabel="文学" reset={reset} />;
}
