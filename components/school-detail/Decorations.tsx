export function OrnamentalDivider({ color }: { color?: string }) {
  return (
    <div className="my-10 flex items-center gap-3" aria-hidden>
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, transparent, ${color ?? "#c8a45a"}40)`,
        }}
      />
      <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: color ?? "#c8a45a" }} />
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to left, transparent, ${color ?? "#c8a45a"}40)`,
        }}
      />
    </div>
  );
}
