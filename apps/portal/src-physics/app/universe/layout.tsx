import type { ReactNode } from "react";
import { UniverseShell } from "./_shell/UniverseShell";

export default function UniverseLayout({ children }: { children: ReactNode }) {
  return <UniverseShell>{children}</UniverseShell>;
}
