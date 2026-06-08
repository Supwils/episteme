"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "1rem",
      }}
    >
      <h2 style={{ fontFamily: "var(--display)", fontSize: "1.5rem" }}>出了点问题</h2>
      <p style={{ color: "var(--parchment-dim)" }}>页面加载时遇到错误。</p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid var(--gold)",
          background: "transparent",
          color: "var(--gold)",
          cursor: "pointer",
        }}
      >
        重试
      </button>
    </div>
  );
}
