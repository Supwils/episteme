"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getIpaSounds,
  type IpaSound,
  type SoundKind,
  type Voicing,
} from "@/subjects/linguistics/lib/ipa-explorer-data";

const ACCENT = "#2f9f8f";

function createVoicingCue(context: AudioContext, voicing: Voicing): AudioNode[] {
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.55);
  gain.connect(context.destination);

  if (voicing === "voiced") {
    const oscillator = context.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.value = 125;
    oscillator.connect(gain);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.58);
    return [oscillator, gain];
  }

  const frameCount = Math.ceil(context.sampleRate * 0.58);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    channel[index] = Math.random() * 2 - 1;
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 900;
  noise.buffer = buffer;
  noise.connect(filter);
  filter.connect(gain);
  noise.start();
  noise.stop(context.currentTime + 0.58);
  return [noise, filter, gain];
}

function ArticulationMap({ sound }: { sound: IpaSound }) {
  const isVowel = sound.kind === "vowel";
  return (
    <svg
      viewBox="0 0 100 82"
      className="h-full w-full"
      role="img"
      aria-label={`${sound.symbol} 的发音位置示意：${sound.articulation}`}
    >
      <path
        d="M12 63 C18 28 36 11 68 12 C84 13 92 24 91 39 C90 57 78 70 58 72 C40 74 24 69 12 63Z"
        fill="none"
        stroke="var(--color-border-subtle)"
        strokeWidth="1.4"
      />
      <path
        d="M20 58 C34 64 55 64 76 55 C68 63 56 69 40 68"
        fill="none"
        stroke="var(--color-fg-disabled)"
        strokeWidth="1.2"
      />
      <path
        d="M27 31 C42 22 61 21 78 28"
        fill="none"
        stroke="var(--color-fg-muted)"
        strokeWidth="1.2"
      />
      <path
        d="M47 24 C52 30 54 39 53 54"
        fill="none"
        stroke="var(--color-border-subtle)"
        strokeDasharray="2 2"
        strokeWidth="0.8"
      />
      {isVowel ? (
        <>
          <path
            d={`M29 61 Q${sound.x} ${sound.y} 71 57`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx={sound.x} cy={sound.y} r="4" fill={ACCENT} />
        </>
      ) : (
        <>
          <circle cx={sound.x} cy={sound.y} r="7" fill={`${ACCENT}22`} stroke={ACCENT} />
          <circle cx={sound.x} cy={sound.y} r="2.2" fill={ACCENT} />
        </>
      )}
      <g transform="translate(12 10)">
        <circle
          cx="4"
          cy="4"
          r="3.5"
          fill={sound.voicing === "voiced" ? ACCENT : "none"}
          stroke={ACCENT}
        />
        <text x="11" y="6" fill="var(--color-fg-muted)" fontSize="5.3">
          {sound.voicing === "voiced" ? "声带振动" : "声带不持续振动"}
        </text>
      </g>
    </svg>
  );
}

export function IPAExplorer() {
  const [kind, setKind] = useState<SoundKind>("consonant");
  const sounds = useMemo(() => getIpaSounds(kind), [kind]);
  const [symbol, setSymbol] = useState("p");
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sound = sounds.find((candidate) => candidate.symbol === symbol) ?? sounds[0]!;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      void contextRef.current?.close();
    };
  }, []);

  const changeKind = (nextKind: SoundKind) => {
    setKind(nextKind);
    setSymbol(getIpaSounds(nextKind)[0]!.symbol);
    setPlaying(false);
  };

  const playCue = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!contextRef.current || contextRef.current.state === "closed") {
      contextRef.current = new AudioContext();
    }
    await contextRef.current.resume();
    createVoicingCue(contextRef.current, sound.voicing);
    setPlaying(true);
    timerRef.current = setTimeout(() => setPlaying(false), 620);
  };

  return (
    <section
      className="border-border-subtle bg-bg-near my-12 overflow-hidden border"
      aria-labelledby="ipa-explorer-title"
      data-testid="ipa-explorer"
    >
      <header className="border-border-faint flex flex-col gap-4 border-b px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="text-fg-disabled font-mono text-[10px] tracking-[0.2em] uppercase">
            Articulation Lab · 1/2
          </p>
          <h2 id="ipa-explorer-title" className="text-fg-primary mt-1 text-xl font-medium">
            发音与 IPA 探索器
          </h2>
          <p className="text-fg-muted mt-1 max-w-2xl text-sm leading-6">
            从部位、方法与声带状态理解符号。示例采用宽式转写，实际音值会随语言和语境变化。
          </p>
        </div>
        <div
          className="flex w-fit border"
          style={{ borderColor: `${ACCENT}66` }}
          role="group"
          aria-label="声音类型"
        >
          {(["consonant", "vowel"] as const).map((value) => {
            const selected = kind === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => changeKind(value)}
                className="min-w-20 px-3 py-2 font-mono text-xs transition-colors motion-reduce:transition-none"
                style={{
                  color: selected ? ACCENT : "var(--color-fg-muted)",
                  background: selected ? `${ACCENT}14` : "transparent",
                }}
              >
                {value === "consonant" ? "辅音" : "元音"}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-border-faint border-b p-4 sm:p-6 lg:border-r lg:border-b-0">
          <p className="text-fg-disabled mb-3 font-mono text-[10px] tracking-[0.18em] uppercase">
            选择音标
          </p>
          <ul
            className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4"
            aria-label={`${kind === "consonant" ? "辅音" : "元音"}音标`}
          >
            {sounds.map((candidate) => {
              const selected = candidate.symbol === sound.symbol;
              return (
                <li key={candidate.symbol}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={`${candidate.symbol}，${candidate.name}`}
                    onClick={() => setSymbol(candidate.symbol)}
                    className="border-border-subtle flex min-h-14 w-full items-center justify-center border text-2xl transition-colors motion-reduce:transition-none"
                    style={{
                      borderColor: selected ? ACCENT : undefined,
                      color: selected ? ACCENT : "var(--color-fg-secondary)",
                      background: selected ? `${ACCENT}12` : "transparent",
                    }}
                  >
                    {candidate.symbol}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 aspect-[5/4] min-h-56 w-full">
            <ArticulationMap sound={sound} />
          </div>
          <p className="text-fg-disabled mt-2 text-xs leading-5">
            示意图用于比较发音位置，不按真实解剖比例绘制。元音标记表示约定的舌位空间。
          </p>
        </div>

        <div className="flex min-w-0 flex-col p-4 sm:p-6" aria-live="polite">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-5xl" style={{ color: ACCENT }}>
                {sound.symbol}
              </div>
              <h3 className="text-fg-primary mt-2 text-lg font-medium">{sound.name}</h3>
            </div>
            <div className="text-right font-mono text-[10px] leading-5 tracking-[0.12em] uppercase">
              <div className="text-fg-disabled">
                {sound.place} · {sound.manner}
              </div>
              <div style={{ color: ACCENT }}>{sound.voicing === "voiced" ? "有声" : "清音"}</div>
            </div>
          </div>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-fg-disabled font-mono text-[10px] tracking-[0.16em] uppercase">
                发音动作
              </dt>
              <dd className="text-fg-secondary mt-1 text-sm leading-6">{sound.articulation}</dd>
            </div>
            <div>
              <dt className="text-fg-disabled font-mono text-[10px] tracking-[0.16em] uppercase">
                跨语言实例
              </dt>
              <dd className="text-fg-secondary mt-1 text-sm leading-6">{sound.example}</dd>
            </div>
            <div>
              <dt className="text-fg-disabled font-mono text-[10px] tracking-[0.16em] uppercase">
                比较线索
              </dt>
              <dd className="text-fg-secondary mt-1 text-sm leading-6">{sound.contrast}</dd>
            </div>
            <div>
              <dt className="text-fg-disabled font-mono text-[10px] tracking-[0.16em] uppercase">
                身体练习
              </dt>
              <dd className="text-fg-secondary mt-1 text-sm leading-6">{sound.cue}</dd>
            </div>
          </dl>

          <div className="border-border-faint mt-6 border-t pt-5">
            <button
              type="button"
              onClick={() => void playCue()}
              disabled={playing}
              className="border px-4 py-2.5 font-mono text-xs transition-colors disabled:opacity-60 motion-reduce:transition-none"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              {playing ? "正在播放机制示意" : "播放声带状态示意"}
            </button>
            <p className="text-fg-disabled mt-3 text-xs leading-5">
              这段合成声只对比周期振动与湍流噪声，不是 {sound.symbol}{" "}
              的标准发音录音。音频关闭时，发音动作与练习提示提供等价结构信息。
            </p>
          </div>
        </div>
      </div>

      <footer className="border-border-faint text-fg-disabled border-t px-4 py-3 text-xs leading-5 sm:px-6">
        符号与分类依据 International Phonetic Association 官方图表（CC BY-SA
        4.0）；示例用于展示对比，不定义整门语言的唯一发音。
      </footer>
    </section>
  );
}
