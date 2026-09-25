import { useId } from "react";
import { BRAND_SEAL } from "@/lib/design/seals";
import { SEAL_GLYPHS } from "@/lib/design/seal-glyphs.generated";
import { sealFramePath } from "@/lib/design/seal-frame";

// Two-character seals set each character in a tall, narrow column, read right
// column first — the usual layout for a two-character square seal.
const COLUMNS = [
  { char: BRAND_SEAL.chars[0], x: 73 },
  { char: BRAND_SEAL.chars[1], x: 27 },
];

/**
 * 站印「格致」，朱砂白文。只在服务端渲染（由根布局传进页头），字形数据不进客户端包。
 */
export function BrandSeal({ size = 28, className }: { size?: number; className?: string }) {
  const maskId = `brand-seal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
      focusable="false"
      style={{ color: "var(--cinnabar)", flexShrink: 0 }}
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <rect width="100" height="100" fill="#fff" />
        {COLUMNS.map(({ char, x }) => (
          <path
            key={char}
            d={SEAL_GLYPHS[char] ?? ""}
            fill="#000"
            transform={`translate(${x} 50) scale(0.56 1.08) translate(-50 -50)`}
          />
        ))}
      </mask>
      <path d={sealFramePath("brand")} fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}
