import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  PoliticalScienceLabDisclaimer,
  PoliticalScienceLabLinks,
} from "@/components/political-science/lab-ui";

const SeatThresholdLab = dynamic(
  () =>
    import("@/components/political-science/SeatThresholdLab").then((mod) => mod.SeatThresholdLab),
  { loading: () => <p className="text-fg-muted text-sm">示意正在载入</p> }
);

export const metadata: Metadata = {
  title: "席位与否决示意 — 政治学 — Episteme · 格致",
  description: "改赞成票和否决者人数，看示意议案过不过。不是选举预测器，不跟踪选民，不保存进度。",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">席位与否决示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          改席位、赞成票和否决者人数，看一条示意议案过不过两条整数线、过不过全体同意。这是计数，不是选举预测。
        </p>
      </header>
      <SeatThresholdLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          席位 N 从 50 到 300，步长 10。赞成票 Y 从 0 到 N。简单多数通过线是
          floor(N/2)+1，也就是过半后的第一张赞成票。三分之二通过线是赞成票不少于 ceil(2N/3)。N 为
          100 时，两条线是 51 和 67：66 票过半通过、三分之二不通过；67 票两条都通过。
        </p>
        <p>
          这条三分之二线只是把专页里的「三分之二多数」收成可数的整数门槛，不是对任何议会的预报。《政治问责》写的是美国参议院弹劾定罪需三分之二多数，历史上四次都没达到。这里不重放那四次票数，也不外推下一次。
        </p>
        <p>
          否决者 k 从 1 到 5，同意人数 a 从 0 到 k。议案只有 a 等于 k
          才通过，少一人即否决。《制衡》的意思是：否决点越多，现状越稳；多一个否决点，现状就多一道关。同意在这里是人数，不是概率，也不是选举模型。
        </p>
        <p>
          专页里能对上的规则是「过半」「简单多数」和「三分之二多数」。没有可迁移的当选概率，所以本页不补民调，也不补选举门槛的百分比。
        </p>
        <PoliticalScienceLabDisclaimer />
        <PoliticalScienceLabLinks
          items={[
            { href: "/political-science/concepts/checks-and-balances", label: "制衡" },
            { href: "/political-science/concepts/accountability", label: "政治问责" },
          ]}
        />
      </section>
    </div>
  );
}
