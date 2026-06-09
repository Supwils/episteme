import Link from 'next/link';
import type { CosmologyTierId } from '../lib/types';
import { COSMOLOGY_TIERS, COSMOLOGY_TIER_ROUTES } from '../lib/tiers';

type TierCardProps = {
  tierId: CosmologyTierId;
};

export function TierCard({ tierId }: TierCardProps) {
  const tier = COSMOLOGY_TIERS[tierId];
  const route = COSMOLOGY_TIER_ROUTES[tierId];

  return (
    <Link
      href={`/cosmology/universe/${route}`}
      className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
    >
      <p className="text-xs text-[#3b82f6] mb-2 tracking-wider">{tierId}</p>
      <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
        {tier.shortLabel}
      </h3>
      <p className="text-sm text-[#9ca3af] italic">{tier.label}</p>
      <p className="text-xs text-[#4b5563] mt-2">
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
