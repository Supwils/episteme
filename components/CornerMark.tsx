const positionStyles: Record<string, React.CSSProperties> = {
  tl: { top: -1, left: -1, borderTop: "2px solid", borderLeft: "2px solid" },
  tr: { top: -1, right: -1, borderTop: "2px solid", borderRight: "2px solid" },
  bl: { bottom: -1, left: -1, borderBottom: "2px solid", borderLeft: "2px solid" },
  br: { bottom: -1, right: -1, borderBottom: "2px solid", borderRight: "2px solid" },
};

export function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  return (
    <span
      aria-hidden="true"
      className="animate-corner-pulse pointer-events-none absolute h-4 w-4"
      style={{
        ...positionStyles[position],
        borderColor: "color-mix(in oklab, var(--color-accent-gold) 45%, transparent)",
      }}
    />
  );
}
