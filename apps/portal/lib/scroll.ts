import { prefersReducedMotion } from "./a11y";

export function scrollToSection(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
