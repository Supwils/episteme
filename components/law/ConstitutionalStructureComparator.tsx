"use client";

import { useState } from "react";

// 法学域主题金（与 lib/data.tsx 中 law 域 accent 一致）
const ACCENT = "#a8843c";

type OrganId = "legislative" | "executive" | "judicial";
type PolityId = "us" | "de" | "cn";
type DimensionId = "head" | "dissolve" | "budget";

// 制度事实来源：
// - 美国：《美国宪法》第一/二/三条。总统经选举人团产生，兼国家元首与政府首脑；
//   拨款权在国会（第一条第九款）；总统无权解散国会，国会可弹劾总统；
//   司法审查由 Marbury v. Madison (1803) 确立。
// - 德国：《基本法》。联邦总理由联邦议院选举产生（第 63 条）；议院只能以
//   「建设性不信任投票」倒阁——须同时选出新总理（第 67 条）；信任案未通过时
//   联邦总统应总理请求可解散议院（第 68 条）；预算以法律形式由联邦议院审议
//   （第 110 条）；联邦宪法法院法官由议院与参议院各选半数（第 94 条）。
// - 中国：《宪法》。全国人大是最高国家权力机关（第 57 条），国务院、国家监察委、
//   最高法、最高检由其产生、对其负责（第 3 条民主集中制）；全国人大审查和批准
//   国家预算（第 62 条），可罢免由其产生的国家机关领导人员（第 63 条）；
//   不存在西方式的相互解散与制衡结构。
const ORGAN_LABELS: Record<OrganId, string> = {
  legislative: "立法",
  executive: "行政",
  judicial: "司法",
};

const POLITIES: Record<
  PolityId,
  {
    label: string;
    system: string;
    organs: Record<OrganId, { name: string; origin: string }>;
    answers: Record<DimensionId, { highlight: OrganId[]; text: string }>;
  }
> = {
  us: {
    label: "美国",
    system: "总统制",
    organs: {
      legislative: {
        name: "国会（参众两院）",
        origin: "议员分别由各州直选产生；掌握立法权与「钱袋权」（拨款权）。",
      },
      executive: {
        name: "总统",
        origin: "经选举人团间接选举产生，任期四年；兼任国家元首与政府首脑。",
      },
      judicial: {
        name: "联邦法院",
        origin: "法官由总统提名、参议院确认，终身任职；行使司法审查权。",
      },
    },
    answers: {
      head: {
        highlight: ["executive"],
        text: "总统一身二任：既是国家元首也是政府首脑，对选民负责而非对国会负责，内阁只是他的工作班子。",
      },
      dissolve: {
        highlight: ["legislative", "executive"],
        text: "谁也不能解散谁。总统无权解散国会；国会只能以弹劾（众议院提出、参议院审判）罢免总统。僵局靠选举与任期化解。",
      },
      budget: {
        highlight: ["legislative"],
        text: "国会掌握「钱袋权」：任何拨款都必须由国会立法（宪法第一条第九款），总统只能提出预算请求——政府「关门」即源于此。",
      },
    },
  },
  de: {
    label: "德国",
    system: "议会制",
    organs: {
      legislative: {
        name: "联邦议院 + 联邦参议院",
        origin: "议院由选民直选，参议院由各州政府代表组成；议院是核心立法机关。",
      },
      executive: {
        name: "联邦总理 / 联邦政府",
        origin: "总理由联邦议院选举产生（基本法第 63 条），是政府首脑；联邦总统为虚位元首。",
      },
      judicial: {
        name: "联邦宪法法院",
        origin: "法官由议院、参议院各选举半数；专司违宪审查，可宣布法律无效。",
      },
    },
    answers: {
      head: {
        highlight: ["executive"],
        text: "联邦总理是政府首脑，但由议会产生、对议会负责——行政权从立法权中「长出来」，这是议会制与总统制的根本分野。",
      },
      dissolve: {
        highlight: ["legislative", "executive"],
        text: "双向但有闸门：议院只能以「建设性不信任投票」倒阁（须同时选出新总理，第 67 条）；信任案未通过时，总统应总理请求可解散议院（第 68 条）。",
      },
      budget: {
        highlight: ["legislative"],
        text: "预算以法律形式由联邦议院审议批准（基本法第 110 条），参议院对部分条款有参与权；政府只能按批准的预算支出。",
      },
    },
  },
  cn: {
    label: "中国",
    system: "人民代表大会制",
    organs: {
      legislative: {
        name: "全国人民代表大会",
        origin: "最高国家权力机关，代表由下一级人大选举产生；常设机关为全国人大常委会。",
      },
      executive: {
        name: "国务院（中央人民政府）",
        origin: "总理由国家主席提名、全国人大决定；国务院对全国人大及其常委会负责。",
      },
      judicial: {
        name: "最高人民法院 / 最高人民检察院",
        origin: "由全国人大产生，对其负责、受其监督；依法独立行使审判权、检察权。",
      },
    },
    answers: {
      head: {
        highlight: ["executive"],
        text: "国务院总理是政府首脑，由全国人大决定产生；国家主席是礼仪性国家元首。行政权由权力机关产生、对其负责。",
      },
      dissolve: {
        highlight: ["legislative", "executive"],
        text: "不存在相互解散。按民主集中制，国家行政、审判、检察机关都由人大产生、对人大负责；全国人大可罢免由其产生的国家机关领导人员（宪法第 63 条）。",
      },
      budget: {
        highlight: ["legislative"],
        text: "全国人大审查和批准国家预算及预算执行情况的报告（宪法第 62 条）；闭会期间的部分调整由常委会审批。",
      },
    },
  },
};

const POLITY_ORDER: PolityId[] = ["us", "de", "cn"];

const DIMENSIONS: Record<DimensionId, { label: string; hint: string }> = {
  head: { label: "谁是政府首脑", hint: "行政权的顶端是谁、向谁负责" },
  dissolve: { label: "谁解散谁", hint: "立法与行政之间的「拆解」机制" },
  budget: { label: "预算谁批", hint: "钱袋子的钥匙在谁手里" },
};

export function ConstitutionalStructureComparator() {
  const [dimension, setDimension] = useState<DimensionId>("head");

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: `color-mix(in oklab, ${ACCENT} 42%, var(--color-fg-primary))` }}
        >
          宪法权力结构 · 交互
        </span>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="比较维度">
          {(Object.keys(DIMENSIONS) as DimensionId[]).map((id) => {
            const active = id === dimension;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => setDimension(id)}
                className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em] transition-colors"
                style={{
                  borderColor: active ? ACCENT : "var(--color-border-subtle)",
                  color: active ? "#0e0f14" : "var(--color-fg-muted)",
                  backgroundColor: active ? ACCENT : "transparent",
                }}
              >
                {DIMENSIONS[id].label}
              </button>
            );
          })}
        </div>
      </figcaption>

      <div className="p-4 sm:p-6">
        <p className="text-fg-muted font-mono text-[10px] tracking-[0.1em]">
          {DIMENSIONS[dimension].hint}
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {POLITY_ORDER.map((pid) => {
            const p = POLITIES[pid];
            const answer = p.answers[dimension];
            return (
              <section
                key={pid}
                className="border-border-faint flex flex-col rounded-md border p-4"
                aria-label={`${p.label} · ${p.system}`}
              >
                <header className="flex items-baseline justify-between gap-2">
                  <h3 className="text-fg-primary text-sm font-semibold">
                    {p.label} · {p.system}
                  </h3>
                </header>

                <div className="mt-3 flex flex-col gap-2">
                  {(Object.keys(ORGAN_LABELS) as OrganId[]).map((oid) => {
                    const lit = answer.highlight.includes(oid);
                    const organ = p.organs[oid];
                    return (
                      <div
                        key={oid}
                        className="rounded border px-3 py-2 transition-colors"
                        style={{
                          borderColor: lit ? ACCENT : "var(--color-border-subtle)",
                          backgroundColor: lit
                            ? `color-mix(in oklab, ${ACCENT} 12%, transparent)`
                            : "transparent",
                        }}
                      >
                        <p className="flex items-baseline justify-between gap-2">
                          <span
                            className="font-mono text-[9px] tracking-[0.18em] uppercase"
                            style={{ color: lit ? ACCENT : "var(--color-fg-disabled)" }}
                          >
                            {ORGAN_LABELS[oid]}
                          </span>
                          <span className="text-fg-primary text-xs font-medium">{organ.name}</span>
                        </p>
                        <p className="text-fg-muted mt-1 text-[11px] leading-snug">
                          {organ.origin}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p
                  className="text-fg-secondary border-border-faint mt-3 border-t pt-3 text-xs leading-relaxed"
                  aria-live="polite"
                >
                  {answer.text}
                </p>
              </section>
            );
          })}
        </div>

        <p className="text-fg-muted mt-5 text-xs leading-relaxed">
          注：三种结构代表三种组织公共权力的思路——总统制让行政权
          <strong className="text-fg-secondary">独立于</strong>立法权生存，议会制让行政权
          <strong className="text-fg-secondary">产生于</strong>立法权，人民代表大会制让一切国家机关
          <strong className="text-fg-secondary">统一于</strong>
          权力机关。高亮块为当前维度下的关键机构。
        </p>
      </div>
    </figure>
  );
}
