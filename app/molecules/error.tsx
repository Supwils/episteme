"use client";

import { DomainError } from "@/components/domain/DomainError";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <DomainError homeHref="/molecules" homeLabel="分子图鉴" reset={reset} />;
}
