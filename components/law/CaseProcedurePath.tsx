"use client";

import { useState } from "react";

// 法学域主题金（与 lib/data.tsx 中 law 域 accent 一致）
const ACCENT = "#a8843c";

type TrackId = "criminal" | "civil";

type Step = {
  label: string;
  short: string;
  detail: string;
};

// 流程节点以中国法为基准。事实来源：
// - 上诉/抗诉期：刑事判决 10 日、裁定 5 日（《刑事诉讼法》第 230 条）；
//   民事判决 15 日、裁定 10 日（《民事诉讼法》，2023 修正第 171 条）。
// - 两审终审制：二审判决、裁定作出即生效（两诉法共通规则）。
// - 民事立案期限：符合起诉条件的，法院 7 日内立案（《民事诉讼法》第 126 条）。
// - 刑事审查起诉期限：一般 1 个月，重大复杂可延长 15 日（《刑事诉讼法》第 172 条）。
const TRACKS: Record<TrackId, { label: string; steps: Step[] }> = {
  criminal: {
    label: "刑事案件",
    steps: [
      {
        label: "侦查",
        short: "公安/检察查明事实",
        detail:
          "公安机关（自侦案件为检察机关）收集证据、查明犯罪事实，可依法采取拘留、逮捕等强制措施。侦查终结后认为应当追究刑责的，移送检察院审查起诉。",
      },
      {
        label: "审查起诉",
        short: "检察院决定是否公诉",
        detail:
          "检察院审查证据是否确实、充分：符合起诉条件的提起公诉；证据不足或情节显著轻微的可不起诉。一般应在一个月内作出决定，重大复杂案件可延长十五日。",
      },
      {
        label: "一审",
        short: "开庭审理 · 控辩对抗",
        detail:
          "法院开庭审理：法庭调查、举证质证、法庭辩论，控辩双方平等对抗，法官居中裁判。被告人享有辩护权与最后陈述权——这是程序正义最直观的形态。",
      },
      {
        label: "二审 / 上诉",
        short: "上诉期 10 日 · 终审",
        detail:
          "不服一审判决的上诉、抗诉期限为十日（裁定为五日），从接到文书次日起算。二审判决、裁定作出即生效——中国实行两审终审制，没有第三审上诉权。",
      },
      {
        label: "生效 · 再审",
        short: "交付执行 · 审判监督",
        detail:
          "生效判决交付执行（刑罚由监狱、社区矫正机构等执行）。发现确有错误的，可经审判监督程序再审——再审是例外救济，不是「第三审」，原则上不停止原判决执行。",
      },
    ],
  },
  civil: {
    label: "民事案件",
    steps: [
      {
        label: "起诉与受理",
        short: "提交诉状 · 7 日内立案",
        detail:
          "原告向有管辖权的法院递交起诉状。符合起诉条件的，法院应当在七日内立案并通知当事人；不符合的，七日内裁定不予受理，原告可对该裁定上诉。",
      },
      {
        label: "一审",
        short: "事实审 + 法律审",
        detail:
          "一审全面审理事实与法律问题：举证、质证、辩论。适用普通程序的案件一般应在立案之日起六个月内审结；简单案件可适用简易程序或小额诉讼程序。",
      },
      {
        label: "上诉",
        short: "判决 15 日 · 裁定 10 日",
        detail:
          "不服地方法院一审判决的，有权在判决书送达之日起十五日内向上一级法院上诉；不服裁定的为十日。逾期未上诉，一审判决即生效。",
      },
      {
        label: "二审",
        short: "终审 · 判决即生效",
        detail:
          "二审围绕上诉请求审查事实认定与法律适用，可开庭也可书面审理。二审判决、裁定是终审判决、裁定，作出即发生法律效力（两审终审制）。",
      },
      {
        label: "生效 · 执行",
        short: "强制执行 · 申请再审",
        detail:
          "义务人不履行生效判决的，权利人可向法院申请强制执行（查封、划拨、列入失信名单等）。认为生效裁判确有错误的，可申请再审，但不停止执行。",
      },
    ],
  },
};

// 法域差异注释。来源：
// - 美国：联邦法院三级（地区法院→巡回上诉法院→最高法院），最高法院以调卷令
//   certiorari 裁量受理，通常每年仅受理约 1% 的申请，不存在当然的第三审。
// - 德国：四级三审制。第二审「控诉」(Berufung) 兼审事实与法律；第三审「上告」
//   (Revision) 仅作法律审，不再审查事实（德国《法院组织法》《民事诉讼法典》）。
const JURISDICTION_NOTES = [
  {
    name: "中国",
    text: "两审终审制：一个案件最多经过两级法院审理即告终结，二审判决作出即生效；再审属审判监督性质的例外救济。",
  },
  {
    name: "美国",
    text: "联邦系统为三级法院，但上诉原则上只有一次（of right）；最高法院以调卷令裁量受理案件，败诉方没有「打到最高法院」的权利。",
  },
  {
    name: "德国",
    text: "四级三审制：第二审（Berufung）既审事实也审法律，第三审（Revision）只审查法律适用是否错误，不再触碰事实。",
  },
];

export function CaseProcedurePath() {
  const [track, setTrack] = useState<TrackId>("criminal");
  const [selected, setSelected] = useState(0);
  const steps = TRACKS[track].steps;
  const step = steps[selected] ?? steps[0];

  const switchTrack = (id: TrackId) => {
    setTrack(id);
    setSelected(0);
  };

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: `color-mix(in oklab, ${ACCENT} 42%, var(--color-fg-primary))` }}
        >
          案件程序路径 · 交互
        </span>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="案件类型">
          {(Object.keys(TRACKS) as TrackId[]).map((id) => {
            const active = id === track;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => switchTrack(id)}
                className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em] transition-colors"
                style={{
                  borderColor: active ? ACCENT : "var(--color-border-subtle)",
                  // 金色填充上用深色文字以保证对比度
                  color: active ? "#0e0f14" : "var(--color-fg-muted)",
                  backgroundColor: active ? ACCENT : "transparent",
                }}
              >
                {TRACKS[id].label}
              </button>
            );
          })}
        </div>
      </figcaption>

      <div className="p-4 sm:p-6">
        {/* 步骤条：移动端竖排，桌面端横排；节点为原生按钮，Tab/Enter 可选 */}
        <ol className="flex flex-col gap-1.5 sm:flex-row sm:items-stretch sm:gap-0">
          {steps.map((s, i) => {
            const active = i === selected;
            return (
              <li key={s.label} className="flex items-center sm:flex-1">
                <button
                  onClick={() => setSelected(i)}
                  aria-pressed={active}
                  aria-label={`第 ${i + 1} 步：${s.label}，${s.short}`}
                  className="w-full rounded-md border px-3 py-2.5 text-left transition-colors sm:min-h-[76px]"
                  style={{
                    borderColor: active ? ACCENT : "var(--color-border-subtle)",
                    backgroundColor: active
                      ? `color-mix(in oklab, ${ACCENT} 14%, transparent)`
                      : "transparent",
                  }}
                >
                  <span
                    className="font-mono text-[9px] tracking-[0.18em] uppercase"
                    style={{ color: active ? ACCENT : "var(--color-fg-disabled)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg-primary block text-sm font-medium">{s.label}</span>
                  <span className="text-fg-muted mt-0.5 block text-[11px] leading-snug">
                    {s.short}
                  </span>
                </button>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="text-fg-disabled shrink-0 px-1 font-mono text-xs max-sm:mx-auto max-sm:rotate-90"
                  >
                    →
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* 选中节点说明卡 */}
        <div
          className="border-border-faint mt-5 rounded-md border-l-2 py-1 pl-4"
          style={{ borderLeftColor: ACCENT }}
          aria-live="polite"
        >
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            {TRACKS[track].label} · 第 {selected + 1} 步
          </p>
          <p className="text-fg-primary mt-1 text-sm font-semibold">{step?.label}</p>
          <p className="text-fg-secondary mt-1.5 text-sm leading-relaxed">{step?.detail}</p>
        </div>

        {/* 法域差异注释 */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {JURISDICTION_NOTES.map((j) => (
            <dl key={j.name} className="border-border-faint border-l-2 pl-3">
              <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                {j.name}
              </dt>
              <dd className="text-fg-secondary mt-1 text-xs leading-relaxed">{j.text}</dd>
            </dl>
          ))}
        </div>

        <p className="text-fg-muted mt-5 text-xs leading-relaxed">
          注：流程节点以<strong className="text-fg-secondary">中国法</strong>
          为基准，展示的是普通程序的典型路径；简易程序、速裁程序、自诉案件与附带民事诉讼另有特别规定。上诉期限均自收到裁判文书的次日起算。
        </p>
      </div>
    </figure>
  );
}
