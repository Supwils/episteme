"use client";

import { DomainError } from "@/components/domain/DomainError";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <DomainError homeHref="/search" homeLabel="搜索" reset={reset} />;
}
