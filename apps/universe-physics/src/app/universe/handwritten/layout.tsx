import type { ReactNode } from "react";
import { HandwrittenShell } from "./_shell/HandwrittenShell";

export default function HandwrittenLayout({ children }: { children: ReactNode }) {
  return <HandwrittenShell>{children}</HandwrittenShell>;
}
