import type { CSSProperties, ReactNode } from "react";
import { OG_BRAND, OG_HEIGHT, OG_WIDTH, type OgCard } from "@/lib/og/card";

function glow(accent: string, style: CSSProperties) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: accent,
        display: "flex",
        ...style,
      }}
    />
  );
}

function backdrop(accent: string) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        overflow: "hidden",
      }}
    >
      {glow(accent, {
        top: -120,
        right: -80,
        width: 400,
        height: 400,
        opacity: 0.08,
        filter: "blur(80px)",
      })}
      {glow(accent, {
        bottom: -60,
        left: -40,
        width: 240,
        height: 240,
        opacity: 0.05,
        filter: "blur(60px)",
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          display: "flex",
        }}
      />
    </div>
  );
}

function label(card: OgCard) {
  if (!card.sectionLabel) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: card.accent,
          display: "flex",
        }}
      />
      <span style={{ fontSize: 18, color: card.accent, letterSpacing: "0.15em" }}>
        {card.sectionLabel}
      </span>
    </div>
  );
}

function description(text: string) {
  if (!text) return null;
  return (
    <p
      style={{
        fontSize: 22,
        color: "#8888a0",
        lineHeight: 1.5,
        margin: 0,
        width: 800,
        display: "block",
        lineClamp: 4,
        overflow: "hidden",
        wordBreak: "break-all",
      }}
    >
      {text}
    </p>
  );
}

function heading(card: OgCard) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
      {label(card)}
      <h1
        style={{
          fontSize: card.titleSize,
          fontWeight: 700,
          color: "#f0f0f5",
          lineHeight: 1.15,
          margin: 0,
          width: 900,
          display: "block",
          lineClamp: 4,
          overflow: "hidden",
          wordBreak: "break-all",
        }}
      >
        {card.title}
      </h1>
      {description(card.description)}
    </div>
  );
}

function brand(host: string) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <span style={{ fontSize: 16, color: "#555570", letterSpacing: "0.3em" }}>
        {OG_BRAND.toUpperCase()}
      </span>
      <span style={{ fontSize: 14, color: "#333348", letterSpacing: "0.12em" }}>{host}</span>
    </div>
  );
}

/** Satori receives host elements; all layout helpers are evaluated first. */
export function renderShareCard(card: OgCard): ReactNode {
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0f",
        padding: 60,
        fontFamily: "Noto Sans SC, Noto Sans, Noto Emoji",
        fontWeight: 700,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {backdrop(card.accent)}
      {heading(card)}
      {brand(card.host)}
    </div>
  );
}
