import type { Metadata } from "next";
import Link from "next/link";
import { withCanonicalPath } from "@/lib/article-canonical";
import { summitOverview } from "@/lib/summit-catalog";
import { buildSummitModel } from "@/lib/summit-model";
import { SummitOverview } from "./SummitDirectory";
import { SummitPlan } from "./SummitPlan";
import { SummitStage } from "./SummitStage";
import "./summit.css";

export const metadata: Metadata = withCanonicalPath("/knowledge-summit", {
  title: "格致山 — Episteme · 格致",
  description:
    "二十二个学科铺成一座山。山脚是直觉启蒙，山顶是综合前沿。从上往下看，它就是首页的星盘。",
});

export default function KnowledgeSummitPage() {
  const model = buildSummitModel();
  return (
    <article className="summit">
      <header className="summit-header">
        <h1>格致山</h1>
        <p>
          二十二个学科围成一圈。半径是认知层级：山脚是直觉启蒙，山顶是综合前沿。从上往下看，这座山就是首页的星盘。
        </p>
        <p>
          窄屏先停在平面图上，立体图要自己打开。没有脚本时，从下面的学科页往下读。
          <Link href="/knowledge-graph">网络视图</Link>
        </p>
      </header>
      <SummitStage>
        <SummitPlan beacons={model.beacons} />
      </SummitStage>
      <SummitOverview groups={summitOverview()} beacons={model.beacons} />
    </article>
  );
}
