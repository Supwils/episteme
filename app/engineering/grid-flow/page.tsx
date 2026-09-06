import type { Metadata } from "next";
import { GridFlowSimulator } from "@/components/engineering/GridFlowSimulator";
import { EngineeringDisclaimer, LabLinks } from "@/components/engineering/lab-ui";

export const metadata: Metadata = {
  title: "电网潮流模拟器 — 工程与技术 — Episteme · 格致",
  description: "在五节点教学电网上调节火电、风电与负荷，看直流潮流如何把功率挤进走廊。",
};

export default function GridFlowPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          直流潮流
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">电网潮流模拟器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          电网每一秒都要让发电等于用电。直流潮流把这条约束收成一句教学公式：线路有功约等于两端电压角度差除以电抗。下面这张五节点示意图让你看到——电源不在负荷旁边时，功率必须穿过走廊，走廊会先热起来。
        </p>
      </header>
      <GridFlowSimulator />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          把风电拉高、工业负荷也拉高，南侧走廊会先变黄再变红。火电靠近城市，同样增加一兆瓦，过载往往更轻。平衡节点（左下）自动补足或吸收差额——真实系统里这由频率与备用完成，这里只保留功率守恒。
        </p>
        <EngineeringDisclaimer />
        <LabLinks
          items={[
            { href: "/engineering/energy/power-grid", label: "电网" },
            { href: "/engineering/energy/solar-and-wind", label: "风光发电" },
            { href: "/engineering/foundations/control-and-feedback", label: "控制与反馈" },
          ]}
        />
      </section>
    </main>
  );
}
