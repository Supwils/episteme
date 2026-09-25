import type { SealDomain } from "@/lib/design/seals";
import { plateSymbolHref, sealSymbolHref } from "@/lib/design/sprites";
import { PLATE_HEIGHT, PLATE_WIDTH } from "@/lib/plates";

/**
 * 学科印与标本图版的图标集引用版：页面只带一个 `<use>`，字形与刻线从
 * `/sprites/*.svg` 取一次。装饰性，旁边的文字负责说明。
 */
export function SpriteSeal({
  domain,
  size = 24,
  color = "var(--cinnabar)",
  className,
}: {
  domain: SealDomain;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ color, flexShrink: 0 }}
    >
      <use href={sealSymbolHref(domain)} width="100" height="100" />
    </svg>
  );
}

export function SpritePlate({
  domain,
  accent,
  className,
}: {
  domain: SealDomain;
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ ["--plate-accent" as string]: accent }}
    >
      <use href={plateSymbolHref(domain)} width={PLATE_WIDTH} height={PLATE_HEIGHT} />
    </svg>
  );
}
