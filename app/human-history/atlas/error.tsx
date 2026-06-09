"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem" }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)" }}>
        出错了
      </p>
      <h2 style={{ fontFamily: "var(--display)", fontSize: "1.5rem", color: "var(--parchment)" }}>页面加载失败</h2>
      <p style={{ color: "var(--parchment-dim)", fontSize: "0.875rem" }}>{error.message}</p>
      <button
        onClick={reset}
        style={{ padding: "0.5rem 1.5rem", border: "1px solid var(--gold)", background: "rgba(200, 169, 81, 0.1)", color: "var(--gold)", cursor: "pointer", borderRadius: "9999px" }}
      >
        重试
      </button>
    </div>
  );
}
