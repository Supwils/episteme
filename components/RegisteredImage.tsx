import { loadImageManifest } from "@/lib/image-rights";

/**
 * 登记图像的服务端渲染（T-IMAGE-01）：文章中 `![alt](/images/<id>)` 渲染为
 * 响应式 <figure>——webp srcset、显式宽高（防 CLS）、lazy/async、署名
 * figcaption。只读构建期 manifest，不进客户端 bundle。
 */
export function RegisteredImage({ id, alt }: { id: string; alt: string }) {
  const entry = loadImageManifest()[id];
  if (!entry || entry.variants.length === 0) return null;

  const srcSet = entry.variants.map((v) => `/images/${v.file} ${v.width}w`).join(", ");
  const fallback = entry.variants[entry.variants.length - 1]!;
  // 展示尺寸按 900px 文章栏宽估算 DPR 选择，小屏全宽。
  const sizes = "(min-width: 900px) 880px, 100vw";

  return (
    <figure className="my-8">
      {/* 刻意用原生 img：变体在构建期由 gen-content-images 生成（webp srcset），
          next/image 的运行时优化与静态导出部署模型不符（同 MarkdownInteractions 的既有取舍）。 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/${fallback.file}`}
        srcSet={srcSet}
        sizes={sizes}
        width={entry.width}
        height={entry.height}
        alt={alt || entry.title}
        loading="lazy"
        decoding="async"
        className="border-border-faint h-auto w-full rounded-lg border"
      />
      <figcaption className="text-fg-muted mt-2.5 text-[12px] leading-relaxed">
        {entry.title}
        {entry.attribution ? <span className="text-fg-disabled">　{entry.attribution}</span> : null}
      </figcaption>
    </figure>
  );
}
