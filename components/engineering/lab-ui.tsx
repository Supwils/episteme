import Link from "next/link";

export function LabSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
  accent = "#8a919e",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  display: string;
  hint: string;
  accent?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-[12.5px]">
        <span className="text-fg-secondary">{label}</span>
        <span className="text-fg-primary font-mono">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number.parseFloat(event.target.value))}
        className="w-full"
        style={{ accentColor: accent }}
      />
      <span className="text-fg-muted mt-1 block text-[10.5px] leading-snug">{hint}</span>
    </label>
  );
}

export function LabMetric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border-border-faint bg-bg-elevated rounded-lg border px-3 py-2.5">
      <div className="text-fg-muted text-[10.5px] tracking-wide">{label}</div>
      <div className="text-fg-primary text-lg font-semibold">{value}</div>
      <div className="text-fg-muted text-[10px] leading-snug">{sub}</div>
    </div>
  );
}

export function EngineeringDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      本页为教科书级教学模型，不是运行或设计手册。任何工程作业须由持照专业人员按当地法规执行。
    </p>
  );
}

export function LabLinks({ items }: { items: readonly { href: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-4 pt-2 text-[13.5px]">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-accent-gold hover:underline">
          {item.label} →
        </Link>
      ))}
    </div>
  );
}
