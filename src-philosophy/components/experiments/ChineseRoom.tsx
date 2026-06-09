'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RULE_BOOK: Record<string, string> = {
  你好: 'Hello',
  世界: 'World',
  人: 'person',
  爱: 'love',
  水: 'water',
  火: 'fire',
  山: 'mountain',
  月亮: 'moon',
  太阳: 'sun',
  花: 'flower',
  鸟: 'bird',
  鱼: 'fish',
  书: 'book',
  家: 'home',
  吃: 'eat',
  喝: 'drink',
  走: 'walk',
  看: 'see',
  大: 'big',
  小: 'small',
  好: 'good',
  坏: 'bad',
  天: 'sky',
  地: 'earth',
};

function translate(input: string): string {
  const trimmed = input.trim();
  if (RULE_BOOK[trimmed]) return RULE_BOOK[trimmed];

  let result = '';
  let i = 0;
  while (i < trimmed.length) {
    let matched = false;
    for (let len = 4; len >= 2; len--) {
      const sub = trimmed.substring(i, i + len);
      if (RULE_BOOK[sub]) {
        result += (result ? ' ' : '') + RULE_BOOK[sub];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const char = trimmed[i]!;
      if (char >= '\u4e00' && char <= '\u9fff') {
        result += (result ? ' ' : '') + `[${char}]`;
      } else {
        result += char;
      }
      i++;
    }
  }
  return result || '...';
}

export default function ChineseRoom() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showPhilosophy, setShowPhilosophy] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    setOutput(translate(input));
    setShowPhilosophy(false);
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="relative h-56 w-full sm:h-64">
          <svg viewBox="0 0 500 240" className="h-full w-full">
            <rect x="120" y="30" width="260" height="160" rx="4" fill="var(--color-bg-deep)" stroke="var(--color-fg-disabled)" strokeWidth="2" />

            <rect x="140" y="60" width="50" height="30" rx="2" fill="var(--color-bg-elevated)" stroke="var(--color-accent-gold)" strokeWidth="1" />
            <text x="165" y="80" textAnchor="middle" fill="var(--color-accent-gold)" fontSize="9" fontFamily="var(--font-mono)">输入</text>

            <rect x="310" y="60" width="50" height="30" rx="2" fill="var(--color-bg-elevated)" stroke="var(--color-accent-sage)" strokeWidth="1" />
            <text x="335" y="80" textAnchor="middle" fill="var(--color-accent-sage)" fontSize="9" fontFamily="var(--font-mono)">输出</text>

            <circle cx="250" cy="110" r="25" fill="var(--color-bg-elevated)" stroke="var(--color-fg-disabled)" strokeWidth="1.5" />
            <rect x="238" y="98" width="24" height="24" rx="2" fill="var(--color-bg-near)" stroke="var(--color-fg-muted)" strokeWidth="1" />
            <line x1="242" y1="105" x2="258" y2="105" stroke="var(--color-fg-muted)" strokeWidth="0.5" />
            <line x1="242" y1="110" x2="258" y2="110" stroke="var(--color-fg-muted)" strokeWidth="0.5" />
            <line x1="242" y1="115" x2="254" y2="115" stroke="var(--color-fg-muted)" strokeWidth="0.5" />
            <text x="250" y="145" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="8" fontFamily="var(--font-mono)">规则手册</text>

            <text x="250" y="175" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="9" fontFamily="var(--font-mono)">不懂中文的人</text>

            <motion.line
              x1="190" y1="75" x2="225" y2="95"
              stroke="var(--color-accent-gold)"
              strokeWidth="1"
              strokeDasharray="4 2"
              animate={{ opacity: input ? [0.3, 1, 0.3] : 0.3 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.line
              x1="275" y1="95" x2="310" y2="75"
              stroke="var(--color-accent-sage)"
              strokeWidth="1"
              strokeDasharray="4 2"
              animate={{ opacity: output ? [0.3, 1, 0.3] : 0.3 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />

            <text x="250" y="215" textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="10" fontFamily="var(--font-display)" fontStyle="italic">
              中文房间 · Chinese Room
            </text>
          </svg>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入中文..."
            className="touch-target flex-1 border border-[var(--color-border-faint)] bg-[var(--color-bg-deep)] px-4 py-3 font-mono text-sm text-[var(--color-fg-primary)] placeholder:text-[var(--color-fg-disabled)] focus:border-[var(--color-accent-gold)] focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            className="touch-target cursor-pointer border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 px-5 py-3 font-mono text-sm text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)]/20"
          >
            翻译
          </button>
        </div>

        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-sage)] uppercase">
                  输出 · Output
                </p>
                <p className="mt-2 font-mono text-lg text-[var(--color-fg-primary)]">{output}</p>
                <p className="mt-3 text-xs text-[var(--color-fg-muted)]">
                  房间里的人按规则翻译，但他一个中文字也不认识。
                </p>
              </div>

              <button
                onClick={() => setShowPhilosophy(!showPhilosophy)}
                className="touch-target mt-3 cursor-pointer text-left font-mono text-xs tracking-wider text-[var(--color-accent-gold)] transition-colors hover:text-[var(--color-accent-gold-bright)]"
              >
                {showPhilosophy ? '收起' : '→ 这说明了什么？'}
              </button>

              <AnimatePresence>
                {showPhilosophy && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 border-l-2 border-[var(--color-accent-gold)] pl-4 text-sm leading-relaxed text-[var(--color-fg-secondary)]">
                      <p>
                        约翰·塞尔（John Searle, 1980）认为：即使房间能完美地&quot;翻译&quot;中文，房间里的人并不<strong className="text-[var(--color-fg-primary)]">理解</strong>中文。
                        他只是在机械地执行规则。
                      </p>
                      <p className="mt-2">
                        这挑战了强人工智能的观点——&quot;语法不等于语义&quot;。程序永远无法产生真正的理解。
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
