import type { Metadata } from "next";
import Link from "next/link";
import { MoleculeViewer } from "@/components/molecule/MoleculeViewer";
import { MOLECULES, MOLECULE_DOMAIN_ACCENT, MOLECULE_DOMAIN_LABEL } from "@/lib/molecules";

export const metadata: Metadata = {
  title: "分子图鉴 — 真实的三维分子结构 — Episteme · 格致",
  description:
    "用真实的实验测定结构（来自 RCSB 蛋白质数据库）在浏览器里旋转、缩放、探索胰岛素、血红蛋白、DNA、新冠刺突蛋白等分子——准确，而非 AI 想象。",
};

export default function MoleculesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
      <header className="mb-12">
        <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase">
          Molecule Gallery
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">分子图鉴</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">
          这里的每一个分子都不是 AI 生成或艺术想象，而是科学家用 X 射线晶体学与冷冻电镜{" "}
          <span className="text-white/80">真实测定</span>
          的三维坐标，来自{" "}
          <a
            href="https://www.rcsb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-sage underline"
          >
            RCSB 蛋白质数据库
          </a>
          。点开任意一个，就能在浏览器里亲手旋转、缩放，看清生命与药物的分子机器到底长什么样。
        </p>
        <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-white/35">
          性能说明：3D 渲染引擎（Mol*）仅在你点击「查看 3D 结构」时才按需加载，不影响页面打开速度。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {MOLECULES.map((m) => {
          const accent = MOLECULE_DOMAIN_ACCENT[m.domain];
          return (
            <article key={m.pdbId} className="flex flex-col">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{
                    color: accent,
                    background: `${accent}1a`,
                    border: `1px solid ${accent}33`,
                  }}
                >
                  {MOLECULE_DOMAIN_LABEL[m.domain]}
                </span>
                <h2 className="text-fg-primary text-lg font-semibold">{m.title}</h2>
                <span className="font-mono text-[11px] text-white/30">{m.titleEn}</span>
              </div>

              <MoleculeViewer pdbId={m.pdbId} title={m.title} accent={accent} />

              <p className="mt-1 text-[13.5px] leading-relaxed text-white/65">{m.blurb}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">
                <span className="font-semibold text-white/60">为何重要：</span>
                {m.significance}
              </p>

              {m.relatedHref && (
                <Link
                  href={m.relatedHref}
                  className="mt-3 inline-block text-[12.5px] font-medium transition-colors hover:underline"
                  style={{ color: accent }}
                >
                  延伸阅读：{m.relatedLabel} →
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
