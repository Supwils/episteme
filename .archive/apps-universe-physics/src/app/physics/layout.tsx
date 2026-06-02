import type { ReactNode } from "react";
import { PhysicsShell } from "./_shell/PhysicsShell";

export default function PhysicsLayout({ children }: { children: ReactNode }) {
  return <PhysicsShell>{children}</PhysicsShell>;
}
