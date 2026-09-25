import { useId } from "react";
import { DOMAIN_SEALS, type SealDomain } from "@/lib/design/seals";
import { SEAL_GLYPHS } from "@/lib/design/seal-glyphs.generated";
import { sealFramePath } from "@/lib/design/seal-frame";

type SealProps = {
  domain: SealDomain;
  /** Rendered edge length in px. */
  size?: number;
  /**
   * intaglio 白文：印面着色、字留白，最醒目，用于领域首页与卡片。
   * relief 朱文：字与边框着色、底透明，轻，用于行内与小尺寸。
   */
  cut?: "intaglio" | "relief";
  /** cinnabar 朱砂（默认，印泥本色）或所属簇的颜料（`var(--pigment-…)`）。 */
  color?: string;
  /** Pass false when a visible label sits next to the seal. */
  label?: string | false;
  className?: string;
};

/**
 * 学科印。纯 SVG、服务端可渲染、不依赖字体；每方约 1 KB。
 * 白文用遮罩挖出字形而不是 evenodd：字体轮廓的笔画互相重叠，evenodd 会在
 * 笔画交叉处多挖出洞。
 */
export function Seal({
  domain,
  size = 24,
  cut = "intaglio",
  color = "var(--cinnabar)",
  label,
  className,
}: SealProps) {
  const { char, name } = DOMAIN_SEALS[domain];
  const glyph = SEAL_GLYPHS[char] ?? "";
  const frame = sealFramePath(domain);
  const accessibleName = label === false ? undefined : (label ?? name);
  // The domain is in the id so that even colliding ids (separate render roots)
  // can only ever resolve to a mask with the same glyph.
  const maskId = `seal-${domain}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={accessibleName ? "img" : undefined}
      aria-label={accessibleName}
      aria-hidden={accessibleName ? undefined : true}
      focusable="false"
      style={{ color, flexShrink: 0 }}
    >
      {cut === "intaglio" ? (
        <>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect width="100" height="100" fill="#fff" />
            <path d={glyph} fill="#000" />
          </mask>
          <path d={frame} fill="currentColor" mask={`url(#${maskId})`} />
        </>
      ) : (
        <>
          <path d={frame} fill="none" stroke="currentColor" strokeWidth={6} />
          <path
            d={glyph}
            fill="currentColor"
            transform="translate(50 50) scale(0.86) translate(-50 -50)"
          />
        </>
      )}
    </svg>
  );
}
