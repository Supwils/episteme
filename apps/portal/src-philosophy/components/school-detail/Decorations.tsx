export function CornerMarks() {
  return (
    <>
      <span
        aria-hidden
        className="border-accent-gold/40 absolute top-0 left-0 h-4 w-4 border-t border-l"
      />
      <span
        aria-hidden
        className="border-accent-gold/40 absolute top-0 right-0 h-4 w-4 border-t border-r"
      />
      <span
        aria-hidden
        className="border-accent-gold/40 absolute bottom-0 left-0 h-4 w-4 border-b border-l"
      />
      <span
        aria-hidden
        className="border-accent-gold/40 absolute right-0 bottom-0 h-4 w-4 border-b border-r"
      />
    </>
  );
}

export function OrnamentalDivider({ color }: { color?: string }) {
  return (
    <div className="my-10 flex items-center gap-3" aria-hidden>
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, transparent, ${color ?? "#c8a45a"}40)`,
        }}
      />
      <span
        className="h-1.5 w-1.5 rotate-45"
        style={{ backgroundColor: color ?? "#c8a45a" }}
      />
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to left, transparent, ${color ?? "#c8a45a"}40)`,
        }}
      />
    </div>
  );
}
