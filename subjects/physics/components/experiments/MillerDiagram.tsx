type Props = { step: number; progress: number };

export function MillerDiagram({ step, progress }: Props) {
  return (
    <svg
      viewBox="0 0 620 360"
      role="img"
      aria-label="米勒实验流程示意：加热水、气体放电、冷凝回流，最后分析溶液"
      className="w-full rounded-xl bg-[#080c18]"
    >
      <g fill="none" stroke="#6ad0ff" strokeWidth="3">
        <path d="M85 170 V55 H285 V75 M385 130 H470 V235 H140" />
        <path d="M85 170 C15 210 35 285 95 285 C165 285 175 215 115 170 Z" />
        <circle cx="335" cy="130" r="65" />
        <path d="M295 55 V110 M375 55 V110" stroke="#ba9efa" />
      </g>
      <path
        d="M52 240 Q95 228 140 240 L145 260 Q95 290 47 260 Z"
        fill="#60a5fa"
        fillOpacity=".35"
      />
      <path d="M470 160 V220" stroke="#8bd9ff" strokeWidth="16" opacity=".35" />
      <path d="M460 165 l10 -10 l10 10 M460 213 l10 10 l10 -10" stroke="#8bd9ff" fill="none" />
      {step === 1 && (
        <path
          d="M295 110 l20 12 l-5 -16 l28 22 l-3 -18 l40 0"
          fill="none"
          stroke="#ffdc8b"
          strokeWidth="3"
        />
      )}
      {step >= 2 && (
        <g fill="#ffb45a" opacity={step === 4 ? Math.max(0.3, progress) : 0.45}>
          <circle cx="78" cy="252" r="5" />
          <circle cx="109" cy="250" r="4" />
          <circle cx="96" cy="267" r="4" />
        </g>
      )}
      <g fill="#c4d7e8" fontSize="16" textAnchor="middle">
        <text x="335" y="225">
          CH₄ · NH₃ · H₂ · 水蒸气
        </text>
        <text x="335" y="35">
          放电气室
        </text>
        <text x="535" y="190">
          冷凝器
        </text>
        <text x="95" y="325">
          水烧瓶 · 加热
        </text>
        <text x="305" y="275">
          冷凝液回流
        </text>
      </g>
      <path d="M200 230 h40 l-10 -7 m10 7 l-10 7" stroke="#ffb45a" fill="none" />
      <text x="310" y="350" textAnchor="middle" fill="#8b9fb7" fontSize="13">
        流程与装置示意 · 动画秒数不对应实际反应时间
      </text>
    </svg>
  );
}
