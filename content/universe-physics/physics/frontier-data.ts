// Planck 2018 Table 2, TT,TE,EE+lowE+lensing, flat base-ΛCDM.
// Ωb and Ωc are approximate ratios of the quoted central values to h².
export const frontierComposition = [
  {
    id: "dark-energy",
    label: "暗能量",
    fraction: 0.6847,
    value: "≈68.5%",
    color: "var(--hw-blue)",
  },
  {
    id: "cold-dark-matter",
    label: "冷暗物质",
    fraction: 0.2645,
    value: "≈26.5%",
    color: "var(--hw-red)",
  },
  { id: "baryons", label: "重子物质", fraction: 0.0493, value: "≈4.9%", color: "var(--hw-gold)" },
  {
    id: "other",
    label: "中微子等余项",
    fraction: 0.0015,
    value: "≈0.15%",
    color: "var(--hw-ink-soft)",
  },
] as const;
