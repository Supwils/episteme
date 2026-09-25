import Link from "next/link";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";
import type { SpineStep } from "@/lib/domain-spine";

const LEVEL_NAME = new Map(KNOWLEDGE_LEVELS.map((level) => [level.id, level.label]));

/**
 * 学习主线画成一段攀登：五级台阶自左下向右上，每一级是一篇文章和一句「为什么走到这里」。
 * 台阶高度只是排版，顺序与层级都写在文字里，窄屏退回一列。
 */
export function SpineAscent({ steps }: { steps: SpineStep[] }) {
  if (steps.length < 2) return null;
  return (
    <section className="landing-block" aria-labelledby="landing-spine">
      <h2 id="landing-spine" className="landing-block__title">
        学习主线
      </h2>
      <p className="landing-block__note">从直觉到前沿，五步走一遍这个学科。</p>
      <ol className="spine-ascent" style={{ ["--steps" as string]: steps.length }}>
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="spine-ascent__step"
            style={{ ["--rise" as string]: steps.length - 1 - index }}
          >
            <Link href={step.url} className="spine-ascent__card">
              <span className="spine-ascent__level">
                L{step.level} · {LEVEL_NAME.get(step.level)}
              </span>
              <span className="spine-ascent__label">{step.label}</span>
              <span className="spine-ascent__why">{step.transition}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
