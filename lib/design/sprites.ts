/**
 * 学科印与标本图版的 SVG 图标集（E4）。首页一次要画 22 方印与 22 张图版，
 * 内联会同时进 HTML 与 RSC（图版约 88 KB 原文），所以改为构建期生成两份
 * 静态图标集，页面用 `<use href="/sprites/…#id">` 引用：浏览器取一次、可缓存，
 * 不进 HTML 与 RSC。
 *
 * 图标集是外部文档，页面的样式表进不去，所以颜色只靠继承：线用
 * `currentColor`，点睛用 `var(--plate-accent)`（自定义属性会继承进 use 的影子树）。
 * 印只做朱文：白文靠 mask，而外部图标集里的 mask 引用各浏览器支持不一。
 */
import { DOMAIN_SEALS, type SealDomain } from "@/lib/design/seals";
import { SEAL_GLYPHS } from "@/lib/design/seal-glyphs.generated";
import { sealFramePath } from "@/lib/design/seal-frame";
import {
  PLATE_GENERATORS,
  PLATE_HEIGHT,
  PLATE_WIDTH,
  drawPlate,
  type StrokeRole,
} from "@/lib/plates";

export const SEAL_SPRITE = "/sprites/seals.svg";
export const PLATE_SPRITE = "/sprites/plates.svg";

export const sealSymbolHref = (domain: SealDomain) => `${SEAL_SPRITE}#seal-${domain}`;
export const plateSymbolHref = (domain: SealDomain) => `${PLATE_SPRITE}#plate-${domain}`;

function sprite(symbols: string[]): string {
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`;
}

export function buildSealSprite(): string {
  return sprite(
    (Object.keys(DOMAIN_SEALS) as SealDomain[]).map((domain) => {
      const glyph = SEAL_GLYPHS[DOMAIN_SEALS[domain].char] ?? "";
      return (
        `<symbol id="seal-${domain}" viewBox="0 0 100 100">` +
        `<path d="${sealFramePath(domain)}" fill="none" stroke="currentColor" stroke-width="6"/>` +
        `<path d="${glyph}" fill="currentColor" transform="translate(50 50) scale(0.86) translate(-50 -50)"/>` +
        `</symbol>`
      );
    })
  );
}

const PLATE_ROLE_STYLE: Record<StrokeRole, { color: string; width: number }> = {
  major: { color: "currentColor", width: 1.2 },
  minor: { color: "currentColor", width: 0.7 },
  accent: { color: "var(--plate-accent, currentColor)", width: 1.6 },
};

export function buildPlateSprite(): string {
  return sprite(
    (Object.keys(PLATE_GENERATORS) as SealDomain[]).map((domain) => {
      const paths = drawPlate(domain).map((s) => {
        const { color, width } = PLATE_ROLE_STYLE[s.role];
        // Minor lines recede by opacity: the sprite cannot reach the muted token.
        const minor = s.role === "minor" ? ' opacity="0.45"' : "";
        const paint = s.fill
          ? `style="fill:${color}" stroke="none"`
          : `fill="none" style="stroke:${color}" stroke-width="${width}"${s.dashed ? ' stroke-dasharray="3 3"' : ""}`;
        return `<path d="${s.d}" ${paint}${minor} vector-effect="non-scaling-stroke"/>`;
      });
      return (
        `<symbol id="plate-${domain}" viewBox="0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}" preserveAspectRatio="xMidYMid slice">` +
        `<g stroke-linecap="round" stroke-linejoin="round">${paths.join("")}</g></symbol>`
      );
    })
  );
}

/** Served from a force-static route: computed at build, cached by the browser. */
export function spriteResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
