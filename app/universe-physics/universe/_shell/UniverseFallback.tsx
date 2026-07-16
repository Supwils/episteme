import Link from "next/link";
import { BrandMark } from "@/subjects/physics/components/hud/BrandMark";
import { TIER_ORDER, TIERS, tierRouteFor } from "@/subjects/physics/lib/tier";

/**
 * Shown when the WebGL context is unavailable ("unsupported") or was lost at
 * runtime ("lost"). Rather than stranding the user on a black canvas, we route
 * them to the handwritten SVG tour — the same eight cosmic scales rendered
 * without WebGL — plus the physics knowledge base.
 */
export function UniverseFallback({ reason = "unsupported" }: { reason?: "unsupported" | "lost" }) {
  const headline = reason === "lost" ? "3D 宇宙已中断" : "3D 宇宙暂时无法显示";
  const detail =
    reason === "lost"
      ? "显卡上下文丢失了（可能是内存不足或驱动重置）。你不必错过这趟旅程——下面是同样尺度、不依赖实时 3D 的手绘版本。"
      : "你的设备或浏览器没有启用 WebGL，而沉浸式 3D 场景需要它。别担心：同一趟从可见宇宙下钻到地球的旅程，还有一个纯手绘的版本，不需要 3D 加速也能看。";

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="absolute inset-0 flex items-center justify-center overflow-y-auto px-6 py-12 focus:outline-none"
    >
      <div className="w-full max-w-2xl">
        <div className="text-fg-muted mb-6 flex items-center gap-3">
          <BrandMark className="text-accent-cool h-8 w-8" />
          <span className="text-xs tracking-widest uppercase">Episteme · 格致</span>
        </div>

        <h1 className="text-fg-primary text-2xl font-semibold sm:text-3xl">{headline}</h1>
        <p className="text-fg-muted mt-4 leading-relaxed">{detail}</p>

        <h2 className="text-fg-primary mt-10 mb-3 text-sm font-medium tracking-wide">
          手绘版尺度之旅（无需 WebGL）
        </h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIER_ORDER.map((tier) => (
            <li key={tier}>
              <Link
                href={tierRouteFor(tier, "handwritten")}
                className="border-fg-disabled/40 hover:border-accent-cool/60 hover:text-fg-primary text-fg-muted focus-visible:border-accent-cool block rounded-lg border px-3 py-3 text-sm transition-colors focus:outline-none"
              >
                {TIERS[tier].shortLabel}
                <span className="text-fg-disabled mt-0.5 block text-[11px]">
                  {TIERS[tier].label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-fg-muted mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/universe-physics/knowledge-base"
            className="hover:text-fg-primary focus-visible:text-fg-primary underline underline-offset-4 focus:outline-none"
          >
            物理知识库 →
          </Link>
          <Link
            href="/universe-physics/physics/classical-mechanics"
            className="hover:text-fg-primary focus-visible:text-fg-primary underline underline-offset-4 focus:outline-none"
          >
            从经典力学开始 →
          </Link>
          <Link
            href="/"
            className="hover:text-fg-primary focus-visible:text-fg-primary underline underline-offset-4 focus:outline-none"
          >
            返回平台首页
          </Link>
        </div>

        {reason === "unsupported" && (
          <p className="text-fg-disabled mt-8 text-xs leading-relaxed">
            想启用 3D：在浏览器设置中开启硬件加速 / WebGL，或换用较新的
            Chrome、Firefox、Safari、Edge 再访问本页。
          </p>
        )}
      </div>
    </div>
  );
}
