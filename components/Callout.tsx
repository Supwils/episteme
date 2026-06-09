"use client";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "quote";
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_STYLES = {
  info: {
    border: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    icon: "ℹ️",
    label: "信息",
  },
  warning: {
    border: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    icon: "⚠️",
    label: "注意",
  },
  tip: {
    border: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    icon: "💡",
    label: "提示",
  },
  quote: {
    border: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    icon: "💬",
    label: "引用",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = CALLOUT_STYLES[type];
  return (
    <div
      className="my-4 rounded-lg border-l-4 px-4 py-3"
      style={{ borderColor: style.border, backgroundColor: style.bg }}
    >
      <div className="mb-1 text-sm font-semibold">
        {style.icon} {title ?? style.label}
      </div>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
