import type { Metadata } from "next";
import { RitualLab } from "@/components/religion/RitualLab";
import { ReligionDisclaimer, ReligionLinks } from "@/components/religion/lab-ui";

export const metadata: Metadata = {
  title: "仪式结构实验室 — 宗教学 — Episteme · 格致",
  description: "用分离—阈限—聚合三步看通过仪礼，不是操作手册。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">仪式结构实验室</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          范热内普把通过仪礼写成三步：离开旧位置、待在中间、进入新位置。特纳后来强调中间那段暂时的共同体。实验室只让你切换分析镜头，不提供任何可照做的流程。
        </p>
      </header>
      <RitualLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          毕业典礼、朝圣与婚礼都是公开事件，所以适合当练习材料。换案例时问自己：谁被要求离开旧座位？中间那段有没有暂时的平等？结束时哪一项权利或称谓真的变了？
        </p>
        <p>
          若某传统把仪式细节视为不可公开传授的知识，这里不会补上。分析范畴可以共用，操作步骤不能共用。
        </p>
        <ReligionDisclaimer />
        <ReligionLinks
          items={[
            { href: "/religion/religion-foundations/ritual-and-practice", label: "仪式与实践" },
            {
              href: "/religion/religion-and-society/pilgrimage-and-sacred-space",
              label: "朝圣与圣地",
            },
            { href: "/religion/world-map", label: "世界宗教示意地图" },
          ]}
        />
      </section>
    </main>
  );
}
