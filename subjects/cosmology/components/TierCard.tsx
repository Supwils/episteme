import Link from "next/link";
import type { CosmologyTierId } from "../lib/types";
import { COSMOLOGY_TIERS, COSMOLOGY_TIER_ROUTES } from "../lib/tiers";

type TierCardProps = {
  tierId: CosmologyTierId;
};

export function TierCard({ tierId }: TierCardProps) {
  const tier = COSMOLOGY_TIERS[tierId];
  const route = COSMOLOGY_TIER_ROUTES[tierId];

  return (
    <Link
      href={`/cosmology/universe/${route}`}
      className="group border-border-faint bg-bg-near hover:border-border-subtle hover:bg-bg-elevated rounded-xl border p-5 transition-all"
    >
      <p className="text-accent-blue mb-2 text-xs tracking-wider">{tierId}</p>
      <h3 className="text-fg-primary group-hover:text-accent-blue mb-1 text-lg font-semibold transition-colors">
        {tier.shortLabel}
      </h3>
      <p className="text-fg-secondary text-sm italic">{tier.label}</p>
      <p className="text-fg-muted mt-2 text-xs">
        ~{formatScale(tier.scaleMeters)} · {tier.unit}
      </p>
    </Link>
  );
}

function formatScale(meters: number): string {
  if (meters >= 1e24) return `${(meters / 1e24).toFixed(1)} × 10²⁴ m`;
  if (meters >= 1e21) return `${(meters / 1e21).toFixed(1)} × 10²¹ m`;
  if (meters >= 1e18) return `${(meters / 1e18).toFixed(1)} × 10¹⁸ m`;
  if (meters >= 1e15) return `${(meters / 1e15).toFixed(1)} × 10¹⁵ m`;
  if (meters >= 1e12) return `${(meters / 1e12).toFixed(1)} × 10¹² m`;
  if (meters >= 1e9) return `${(meters / 1e9).toFixed(1)} × 10⁹ m`;
  if (meters >= 1e6) return `${(meters / 1e6).toFixed(1)} × 10⁶ m`;
  return `${meters.toExponential(1)} m`;
}
