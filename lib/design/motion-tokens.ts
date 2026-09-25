/**
 * 动效令牌（T-DESIGN-01d），与 app/globals.css 的 --duration-* / --ease-* 同值。
 * 规则：一页至多一次编排入场（总长 ≤ ORCHESTRATED_MAX_MS），其余动效只回应读者的动作。
 * GSAP 与 Framer Motion 按页面各选其一，不引入第三个动画库。
 */
export const DURATION_MS = { fast: 150, base: 240, slow: 480 } as const;
export const ORCHESTRATED_MAX_MS = 1200;

/** 仪器：快起、长尾、落定精确。用于刻度、指针、图谱镜头。 */
export const EASE_INSTRUMENT = [0.2, 0.7, 0.1, 1] as const;
/** 纸页：平缓的 ease-out。用于展开、翻页、浮层。 */
export const EASE_PAPER = [0.33, 1, 0.68, 1] as const;
