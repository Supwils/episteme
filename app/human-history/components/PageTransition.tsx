"use client";

import { useEffect, useState } from "react";

// The wrapper is always the same <div> (swapping it for a fragment remounted the
// whole page), and the settled state carries no transform: even translateY(0)
// makes this div the containing block for fixed children such as the reading
// progress bar. Reduced-motion readers get the instant change from the global
// prefers-reduced-motion rule in app/globals.css.
const ENTERING_STYLE = { opacity: 0, transform: "translateY(8px)" } as const;
const TRANSITION = "opacity 0.4s ease, transform 0.4s ease";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={visible ? { transition: TRANSITION } : { ...ENTERING_STYLE, transition: TRANSITION }}
    >
      {children}
    </div>
  );
}
