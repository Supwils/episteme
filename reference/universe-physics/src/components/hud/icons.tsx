import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d="M3 9 L9 3" />
      <path d="M4 3 H9 V8" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d="M2 2 L10 10" />
      <path d="M10 2 L2 10" />
    </svg>
  );
}

export function ExternalLink(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d="M5 2 H2 V10 H10 V7" />
      <path d="M7 2 H10 V5" />
      <path d="M5 7 L10 2" />
    </svg>
  );
}
