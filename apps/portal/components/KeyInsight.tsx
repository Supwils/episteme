"use client";

interface KeyInsightProps {
  children: React.ReactNode;
  accentColor?: string;
}

export function KeyInsight({
  children,
  accentColor = "#e8b84a",
}: KeyInsightProps) {
  return (
    <blockquote
      className="border-l-3 my-6 py-2 pl-4 text-[15px] italic leading-relaxed"
      style={{ borderColor: accentColor, color: `${accentColor}cc` }}
    >
      <span
        className="mb-1 block text-xs font-semibold uppercase tracking-widest not-italic"
        style={{ color: accentColor }}
      >
        核心洞察
      </span>
      {children}
    </blockquote>
  );
}
