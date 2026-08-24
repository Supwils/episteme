/** Closing one-liner after the article body — "带走一句原来如此". */
export function ArticleTakeaway({ text, accent }: { text: string; accent: string }) {
  return (
    <aside aria-label="原来如此" className="border-border-faint mt-12 border-t pt-8">
      <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
        原来如此
      </p>
      <p
        className="font-display text-fg-primary text-[1.15rem] leading-relaxed font-medium sm:text-[1.25rem]"
        style={{ borderLeft: `3px solid ${accent}`, paddingLeft: "1rem" }}
      >
        {text}
      </p>
    </aside>
  );
}
