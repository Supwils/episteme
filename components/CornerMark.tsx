const positionStyles: Record<string, React.CSSProperties> = {
  tl: { top: -1, left: -1, borderTop: '2px solid', borderLeft: '2px solid' },
  tr: { top: -1, right: -1, borderTop: '2px solid', borderRight: '2px solid' },
  bl: { bottom: -1, left: -1, borderBottom: '2px solid', borderLeft: '2px solid' },
  br: { bottom: -1, right: -1, borderBottom: '2px solid', borderRight: '2px solid' },
};

export function CornerMark({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <span
      aria-hidden="true"
      className="absolute w-4 h-4 pointer-events-none animate-corner-pulse"
      style={{
        ...positionStyles[position],
        borderColor: 'rgba(99, 102, 241, 0.4)',
      }}
    />
  );
}
