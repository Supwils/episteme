import Link from "next/link";

export function LabInviteCard({
  href,
  label,
  tease,
}: {
  href: string;
  label: string;
  tease: string;
}) {
  return (
    <aside
      aria-label="动手看"
      className="border-border-faint bg-bg-near mt-10 rounded-2xl border p-5"
    >
      <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.28em] uppercase">
        动手看 · lab
      </p>
      <p className="text-fg-primary text-[15px] font-semibold">{label}</p>
      <p className="text-fg-secondary mt-2 text-[14px] leading-relaxed">{tease}</p>
      <p className="mt-3 text-[13.5px]">
        <Link href={href} className="text-accent-gold hover:underline">
          打开实验室 →
        </Link>
      </p>
    </aside>
  );
}
