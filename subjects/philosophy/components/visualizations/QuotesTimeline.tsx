"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { PRODUCT_EASE } from "@/subjects/philosophy/lib/constants";

type Tradition = "all" | "western" | "eastern";

interface Quote {
  id: string;
  quote: string;
  philosopher: string;
  philosopherLatin: string;
  year: number;
  tradition: "western" | "eastern";
  era: string;
  source: string;
  context: string;
  relatedIdeas: string[];
}

const QUOTES: Quote[] = [
  {
    id: "confucius-ren",
    quote: "己所不欲，勿施于人",
    philosopher: "孔子",
    philosopherLatin: "Confucius",
    year: -500,
    tradition: "eastern",
    era: "轴心时代",
    source: "《论语·卫灵公》",
    context: "孔子回答弟子子贡'有一言而可以终身行之者乎'时所说。这条'恕道'成为儒家伦理的金规则，比西方的黄金律早数百年。",
    relatedIdeas: ["仁", "恕道", "黄金律"],
  },
  {
    id: "laozi-dao",
    quote: "道可道，非常道",
    philosopher: "老子",
    philosopherLatin: "Laozi",
    year: -500,
    tradition: "eastern",
    era: "轴心时代",
    source: "《道德经》第一章",
    context: "《道德经》开篇之语，揭示了道家对语言局限性的根本认识——真正的'道'超越语言所能描述的范畴。",
    relatedIdeas: ["道", "无为", "自然"],
  },
  {
    id: "buddha-suffering",
    quote: "一切皆苦",
    philosopher: "释迦牟尼",
    philosopherLatin: "Siddhartha Gautama",
    year: -480,
    tradition: "eastern",
    era: "轴心时代",
    source: "四圣谛",
    context: "佛陀在鹿野苑初转法轮时宣说的四圣谛之第一谛——苦谛。这不是悲观主义，而是对存在本质的冷静诊断。",
    relatedIdeas: ["四圣谛", "八正道", "涅槃"],
  },
  {
    id: "socrates-examined",
    quote: "未经审视的人生不值得过",
    philosopher: "苏格拉底",
    philosopherLatin: "Socrates",
    year: -399,
    tradition: "western",
    era: "古希腊",
    source: "柏拉图《申辩篇》38a",
    context: "苏格拉底在雅典法庭受审时的最后陈词。他宁愿赴死也不愿放弃哲学追问，这句话成为西方理性主义精神的基石。",
    relatedIdeas: ["苏格拉底方法", "认识你自己", "德性即知识"],
  },
  {
    id: "plato-wonder",
    quote: "哲学始于惊奇",
    philosopher: "柏拉图",
    philosopherLatin: "Plato",
    year: -380,
    tradition: "western",
    era: "古希腊",
    source: "《泰阿泰德篇》155d",
    context: "柏拉图借苏格拉底之口说出。惊奇（thaumazein）不是恐惧，而是面对存在之谜时的敬畏——这是一切哲学探索的起点。",
    relatedIdeas: ["理型论", "洞穴隐喻", "灵魂回忆说"],
  },
  {
    id: "aristotle-political",
    quote: "人是天生的政治动物",
    philosopher: "亚里士多德",
    philosopherLatin: "Aristotle",
    year: -350,
    tradition: "western",
    era: "古希腊",
    source: "《政治学》1253a",
    context: "亚里士多德认为人天生需要在城邦中生活才能实现自身的完善。孤立的个体要么是野兽，要么是神。",
    relatedIdeas: ["目的论", "德性伦理", "中庸"],
  },
  {
    id: "mencius-heart",
    quote: "人皆有不忍人之心",
    philosopher: "孟子",
    philosopherLatin: "Mencius",
    year: -300,
    tradition: "eastern",
    era: "轴心时代",
    source: "《孟子·公孙丑上》",
    context: "孟子以'今人乍见孺子将入于井'的思想实验论证人性本善，开创了中国哲学史上最重要的人性论辩。",
    relatedIdeas: ["性善论", "四端", "仁政"],
  },
  {
    id: "zhuangzi-butterfly",
    quote: "不知周之梦为蝴蝶与，蝴蝶之梦为周与",
    philosopher: "庄子",
    philosopherLatin: "Zhuangzi",
    year: -300,
    tradition: "eastern",
    era: "轴心时代",
    source: "《庄子·齐物论》",
    context: "庄周梦蝶的故事提出了关于自我认同与现实本质的深刻问题，比笛卡尔的怀疑论早了近两千年。",
    relatedIdeas: ["齐物论", "逍遥游", "物化"],
  },
  {
    id: "augustine-city",
    quote: "两座城池：一座由爱己而轻视上帝所建，另一座由爱上帝而轻视自己所建",
    philosopher: "奥古斯丁",
    philosopherLatin: "Augustine",
    year: 426,
    tradition: "western",
    era: "中世纪",
    source: "《上帝之城》XIV.28",
    context: "奥古斯丁在罗马陷落后写下此书，以'上帝之城'与'地上之城'的对立重新诠释了历史的意义。",
    relatedIdeas: ["原罪", "恩典", "神义论"],
  },
  {
    id: "averroes-intellect",
    quote: "真理不会与真理矛盾",
    philosopher: "阿维罗伊",
    philosopherLatin: "Averroes",
    year: 1170,
    tradition: "eastern",
    era: "伊斯兰黄金时代",
    source: "《矛盾的矛盾》",
    context: "阿维罗伊坚持哲学与宗教最终一致，对亚里士多德的注释深刻影响了中世纪欧洲经院哲学。",
    relatedIdeas: ["双重真理论", "理性与信仰", "亚里士多德注疏"],
  },
  {
    id: "descartes-cogito",
    quote: "我思故我在",
    philosopher: "笛卡尔",
    philosopherLatin: "Descartes",
    year: 1637,
    tradition: "western",
    era: "近代",
    source: "《方法论》第四章",
    context: "笛卡尔通过系统怀疑找到了不可怀疑的基点——思维本身的存在。这一命题成为近代哲学的出发点。",
    relatedIdeas: ["理性主义", "心物二元论", "方法论怀疑"],
  },
  {
    id: "spinoza-god",
    quote: "神即自然",
    philosopher: "斯宾诺莎",
    philosopherLatin: "Spinoza",
    year: 1677,
    tradition: "western",
    era: "近代",
    source: "《伦理学》",
    context: "斯宾诺莎的泛神论将上帝等同于自然整体，打破了人格化上帝的传统观念，影响了后来的德国浪漫主义和爱因斯坦。",
    relatedIdeas: ["泛神论", "决定论", "理智之爱"],
  },
  {
    id: "kant-stars",
    quote: "有两样东西，我对它们的思考越是深沉和持久，它们在我心灵中唤起的惊奇和敬畏就会日新月异——我头上的星空和我心中的道德律",
    philosopher: "康德",
    philosopherLatin: "Kant",
    year: 1788,
    tradition: "western",
    era: "近代",
    source: "《实践理性批判》结论",
    context: "康德将这段话刻在自己的墓碑上。外在宇宙的浩瀚与内在道德的崇高，在这位哥尼斯堡哲人身上达到了统一。",
    relatedIdeas: ["绝对命令", "先验哲学", "永久和平"],
  },
  {
    id: "hegel-owl",
    quote: "密涅瓦的猫头鹰只在黄昏降临时才起飞",
    philosopher: "黑格尔",
    philosopherLatin: "Hegel",
    year: 1820,
    tradition: "western",
    era: "近代",
    source: "《法哲学原理》序言",
    context: "黑格尔认为哲学总是来得太迟——它只能理解已经发生的事情，不能指导未来。这是对哲学功能的深刻反思。",
    relatedIdeas: ["辩证法", "绝对精神", "历史哲学"],
  },
  {
    id: "marx-theses",
    quote: "哲学家们只是用不同的方式解释世界，而问题在于改变世界",
    philosopher: "马克思",
    philosopherLatin: "Marx",
    year: 1845,
    tradition: "western",
    era: "现代",
    source: "《关于费尔巴哈的提纲》第十一条",
    context: "马克思在布鲁塞尔写下的这句名言，标志着哲学从理论转向实践的根本性突破。",
    relatedIdeas: ["历史唯物主义", "实践哲学", "异化"],
  },
  {
    id: "kierkegaard-anxiety",
    quote: "焦虑是自由的眩晕",
    philosopher: "克尔凯郭尔",
    philosopherLatin: "Kierkegaard",
    year: 1844,
    tradition: "western",
    era: "现代",
    source: "《焦虑的概念》",
    context: "克尔凯郭尔将焦虑与自由选择联系起来，开创了存在主义的先声。面对无限可能性时的眩晕感，正是人作为自由存在的证明。",
    relatedIdeas: ["存在主义", "信仰之跃", "主观真理"],
  },
  {
    id: "nietzsche-god",
    quote: "上帝死了",
    philosopher: "尼采",
    philosopherLatin: "Nietzsche",
    year: 1882,
    tradition: "western",
    era: "现代",
    source: "《快乐的科学》第125节",
    context: "尼采借'疯子'之口宣告的不是无神论的胜利，而是对西方文明价值根基崩塌的诊断——虚无主义时代的来临。",
    relatedIdeas: ["权力意志", "超人", "永恒回归"],
  },
  {
    id: "husserl-back",
    quote: "回到事物本身",
    philosopher: "胡塞尔",
    philosopherLatin: "Husserl",
    year: 1913,
    tradition: "western",
    era: "现代",
    source: "《纯粹现象学和现象学哲学的观念》",
    context: "胡塞尔创立现象学方法，要求搁置一切预设，直接面对意识中显现的现象。这一方法论革命影响了海德格尔、萨特、梅洛-庞蒂。",
    relatedIdeas: ["现象学", "意向性", "悬搁"],
  },
  {
    id: "wittgenstein-silence",
    quote: "凡不可说的，必须沉默",
    philosopher: "维特根斯坦",
    philosopherLatin: "Wittgenstein",
    year: 1921,
    tradition: "western",
    era: "现代",
    source: "《逻辑哲学论》7",
    context: "《逻辑哲学论》的最后一句话。维特根斯坦认为伦理、美学、宗教等领域超越了有意义的语言的界限。",
    relatedIdeas: ["语言转向", "家族相似", "私人语言论证"],
  },
  {
    id: "heidegger-being",
    quote: "存在者之存在本身不'是'一个存在者",
    philosopher: "海德格尔",
    philosopherLatin: "Heidegger",
    year: 1927,
    tradition: "western",
    era: "现代",
    source: "《存在与时间》",
    context: "海德格尔重新提出'存在问题'（Seinsfrage），区分存在（Sein）与存在者（Seiendes），要求重新思考被西方形而上学遗忘的根基。",
    relatedIdeas: ["此在", "向死存在", "解构"],
  },
  {
    id: "sartre-essence",
    quote: "存在先于本质",
    philosopher: "萨特",
    philosopherLatin: "Sartre",
    year: 1943,
    tradition: "western",
    era: "当代",
    source: "《存在与虚无》",
    context: "萨特在《存在主义是一种人道主义》演讲中将此命题通俗化：人没有预设的本质，他首先存在，然后通过自由选择来定义自己。",
    relatedIdeas: ["存在主义", "自由", "自欺"],
  },
  {
    id: "beauvoir-born",
    quote: "女人不是天生的，而是后天形成的",
    philosopher: "波伏娃",
    philosopherLatin: "Simone de Beauvoir",
    year: 1949,
    tradition: "western",
    era: "当代",
    source: "《第二性》",
    context: "波伏娃用存在主义框架分析女性处境，论证性别是社会建构而非生物宿命。这本书成为第二波女权运动的思想基石。",
    relatedIdeas: ["女权主义", "他者", "社会建构"],
  },
  {
    id: "rawls-justice",
    quote: "正义是社会制度的首要美德",
    philosopher: "罗尔斯",
    philosopherLatin: "Rawls",
    year: 1971,
    tradition: "western",
    era: "当代",
    source: "《正义论》",
    context: "罗尔斯通过'无知之幕'思想实验重新奠定了政治哲学的基础，复兴了社会契约论传统。",
    relatedIdeas: ["无知之幕", "差异原则", "重叠共识"],
  },
  {
    id: "foucault-power",
    quote: "哪里有权力，哪里就有抵抗",
    philosopher: "福柯",
    philosopherLatin: "Foucault",
    year: 1976,
    tradition: "western",
    era: "当代",
    source: "《性史》第一卷",
    context: "福柯将权力理解为弥散的、生产性的关系网络，而非自上而下的压迫。权力无处不在，抵抗也因此无处不在。",
    relatedIdeas: ["权力/知识", "规训", "生命政治"],
  },
  {
    id: "derrida-diff",
    quote: "文本之外别无他物",
    philosopher: "德里达",
    philosopherLatin: "Derrida",
    year: 1967,
    tradition: "western",
    era: "当代",
    source: "《论文字学》",
    context: "德里达的解构主义挑战了西方哲学的'逻各斯中心主义'，认为意义永远处于延异（différance）之中，无法被最终固定。",
    relatedIdeas: ["解构", "延异", "逻各斯中心主义"],
  },
  {
    id: "wang-yangming",
    quote: "知行合一",
    philosopher: "王阳明",
    philosopherLatin: "Wang Yangming",
    year: 1527,
    tradition: "eastern",
    era: "明代",
    source: "《传习录》",
    context: "王阳明心学的核心命题，主张真知必能行，不行只是未知。这一思想对日本明治维新产生了深远影响。",
    relatedIdeas: ["心即理", "致良知", "心学"],
  },
];

const ERA_ORDER = ["轴心时代", "古希腊", "伊斯兰黄金时代", "中世纪", "近代", "现代", "当代", "明代"] as const;

const ERA_COLORS: Record<string, string> = {
  轴心时代: "#c8a45a",
  古希腊: "#6ad0ff",
  伊斯兰黄金时代: "#e07a5f",
  中世纪: "#a88adf",
  近代: "#7aaa8a",
  现代: "#d4a0d0",
  当代: "#5a9ad8",
  明代: "#e5c07b",
};

const TRADITION_ACCENTS: Record<Tradition, string> = {
  all: "#c8a45a",
  western: "#6ad0ff",
  eastern: "#c8a45a",
};

function formatTimelineYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

function yearToPercent(year: number): number {
  const start = -600;
  const end = 2000;
  return ((year - start) / (end - start)) * 100;
}

function QuoteCard({
  quote,
  isActive,
  onToggle,
  reduce,
  index,
}: {
  quote: Quote;
  isActive: boolean;
  onToggle: () => void;
  reduce: boolean;
  index: number;
}) {
  const eraColor = ERA_COLORS[quote.era] ?? "#c8a45a";

  return (
    <motion.div
      layout
      className="flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.04, ease: PRODUCT_EASE }}
    >
      <motion.button
        onClick={onToggle}
        className={`group relative flex w-[280px] flex-col gap-3 border p-5 text-left transition-all duration-300 md:w-[320px] ${
          isActive
            ? "border-accent-gold/40 bg-bg-elevated shadow-[0_0_30px_-8px_rgba(200,164,90,0.2)]"
            : "border-border-faint bg-bg-near hover:bg-bg-elevated hover:border-border-subtle hover:shadow-[0_0_24px_-10px_rgba(200,164,90,0.12)]"
        }`}
        whileHover={reduce ? {} : { y: -4 }}
        transition={{ duration: 0.25, ease: PRODUCT_EASE }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: eraColor }}
          >
            {quote.era}
          </span>
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.18em]">
            {formatTimelineYear(quote.year)}
          </span>
        </div>

        <blockquote className="font-display text-fg-primary text-base leading-snug italic md:text-lg">
          &ldquo;{quote.quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-2">
          <span className="text-fg-secondary text-sm">{quote.philosopher}</span>
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.14em]">
            {quote.philosopherLatin}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-block px-2 py-0.5 font-mono text-[8px] tracking-[0.2em] uppercase ${
              quote.tradition === "eastern"
                ? "border border-accent-gold/20 text-accent-gold/70"
                : "border border-accent-sage/20 text-accent-sage/70"
            }`}
          >
            {quote.tradition === "eastern" ? "东方" : "西方"}
          </span>
          <span className="text-fg-disabled font-mono text-[8px] tracking-[0.14em]">
            {quote.source}
          </span>
        </div>

        {isActive && (
          <span className="text-accent-gold/60 font-mono text-[8px] tracking-[0.2em]">
            ↓ 点击收起
          </span>
        )}
        {!isActive && (
          <span className="text-fg-disabled font-mono text-[8px] tracking-[0.2em] transition-colors group-hover:text-fg-muted">
            点击展开 →
          </span>
        )}

        <span
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: eraColor }}
          aria-hidden
        />
      </motion.button>
    </motion.div>
  );
}

function ExpandedPanel({
  quote,
  onClose,
  reduce,
}: {
  quote: Quote;
  onClose: () => void;
  reduce: boolean;
}) {
  const eraColor = ERA_COLORS[quote.era] ?? "#c8a45a";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: PRODUCT_EASE }}
      className="overflow-hidden"
    >
      <div className="border-border-subtle bg-bg-elevated mx-auto max-w-2xl border p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2"
              style={{ backgroundColor: eraColor }}
              aria-hidden
            />
            <span
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: eraColor }}
            >
              {quote.era}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.18em]">
              {formatTimelineYear(quote.year)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-fg-muted hover:text-fg-primary touch-target flex items-center justify-center transition-colors"
            aria-label="收起详情"
          >
            <span className="font-mono text-xs">×</span>
          </button>
        </div>

        <blockquote className="font-display text-fg-primary mb-4 text-xl leading-relaxed italic md:text-2xl">
          &ldquo;{quote.quote}&rdquo;
        </blockquote>

        <div className="mb-5 flex items-center gap-3">
          <span className="text-fg-primary text-sm font-medium">{quote.philosopher}</span>
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.14em]">
            {quote.philosopherLatin}
          </span>
          <span
            className={`inline-block px-2 py-0.5 font-mono text-[8px] tracking-[0.2em] uppercase ${
              quote.tradition === "eastern"
                ? "border border-accent-gold/20 text-accent-gold/70"
                : "border border-accent-sage/20 text-accent-sage/70"
            }`}
          >
            {quote.tradition === "eastern" ? "东方" : "西方"}
          </span>
        </div>

        <div className="border-border-faint mb-4 border-l-2 pl-4">
          <span className="text-fg-muted mb-1 block font-mono text-[9px] tracking-[0.22em] uppercase">
            出处
          </span>
          <span className="text-fg-secondary text-sm">{quote.source}</span>
        </div>

        <p className="text-fg-secondary mb-5 text-sm leading-relaxed">{quote.context}</p>

        {quote.relatedIdeas.length > 0 && (
          <div>
            <span className="text-fg-muted mb-2 block font-mono text-[9px] tracking-[0.22em] uppercase">
              相关思想
            </span>
            <div className="flex flex-wrap gap-2">
              {quote.relatedIdeas.map((idea) => (
                <span
                  key={idea}
                  className="border-fg-disabled/20 text-fg-muted px-2.5 py-1 font-mono text-[10px] tracking-[0.14em]"
                  style={{
                    borderColor: `${eraColor}30`,
                    color: eraColor,
                  }}
                >
                  {idea}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function QuotesTimeline() {
  const reduce = useReducedMotion();
  const [tradition, setTradition] = useState<Tradition>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const filtered = tradition === "all" ? QUOTES : QUOTES.filter((q) => q.tradition === tradition);

  const activeQuote = activeId ? QUOTES.find((q) => q.id === activeId) ?? null : null;

  const handleToggle = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const scrollToQuote = useCallback((id: string) => {
    const el = cardRefs.current.get(id);
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const elLeft = el.offsetLeft;
      const elWidth = el.offsetWidth;
      const containerWidth = container.offsetWidth;
      const target = elLeft - containerWidth / 2 + elWidth / 2;
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (activeId) {
      scrollToQuote(activeId);
    }
  }, [activeId, scrollToQuote]);

  const timelineStart = -600;
  const timelineEnd = 2000;
  const centuryMarks: number[] = [];
  for (let y = -600; y <= 2000; y += 200) {
    centuryMarks.push(y);
  }

  return (
    <section className="relative w-full py-12">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: PRODUCT_EASE }}
        >
          <div className="mb-6 flex items-end gap-4">
            <h2 className="font-display text-fg-primary text-2xl font-semibold tracking-tight md:text-3xl">
              哲学名言<em className="text-accent-gold italic"> 时间线</em>
            </h2>
            <div className="bg-accent-gold/30 mb-0.5 hidden h-8 w-px md:block" aria-hidden />
            <span className="text-fg-muted mb-0.5 hidden font-mono text-[10px] tracking-[0.2em] md:block">
              {filtered.length} quotes · {formatTimelineYear(timelineStart)} — {formatTimelineYear(timelineEnd)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-fg-muted font-mono text-[9px] tracking-[0.28em] uppercase">
              传统
            </span>
            {(["all", "western", "eastern"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTradition(t);
                  setActiveId(null);
                }}
                className={`border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-all duration-200 ${
                  tradition === t
                    ? "border-accent-gold/50 bg-accent-gold/10 text-accent-gold"
                    : "border-fg-disabled/20 text-fg-muted hover:border-fg-disabled/40 hover:text-fg-secondary"
                }`}
              >
                {t === "all" ? "全部" : t === "western" ? "西方 Western" : "东方 Eastern"}
              </button>
            ))}
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.14em]">
              {tradition === "all" ? `${QUOTES.length}` : `${filtered.length}`} 条
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative h-8 w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
            </div>
            {centuryMarks.map((y) => {
              const pct = yearToPercent(y);
              return (
                <div
                  key={y}
                  className="absolute top-0 flex h-full flex-col items-center justify-end"
                  style={{ left: `${pct}%` }}
                >
                  <span className="text-fg-disabled font-mono text-[8px] tracking-[0.1em]">
                    {formatTimelineYear(y)}
                  </span>
                  <div className="bg-fg-disabled/30 mt-0.5 h-1.5 w-px" />
                </div>
              );
            })}
            {filtered.map((q) => {
              const pct = yearToPercent(q.year);
              const eraColor = ERA_COLORS[q.era] ?? "#c8a45a";
              const isActive = activeId === q.id;
              return (
                <button
                  key={q.id}
                  className={`absolute top-0 flex h-full items-end transition-all duration-300 ${
                    isActive ? "z-10" : "z-0"
                  }`}
                  style={{ left: `${pct}%` }}
                  onClick={() => handleToggle(q.id)}
                  title={`${q.philosopher}: ${q.quote}`}
                >
                  <div
                    className={`mb-0 h-3 w-3 -translate-x-1/2 rounded-full transition-all duration-300 ${
                      isActive ? "scale-150" : "hover:scale-125"
                    }`}
                    style={{
                      backgroundColor: eraColor,
                      boxShadow: isActive ? `0 0 12px ${eraColor}80` : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-4"
          style={{ scrollSnapType: "x proximity" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((q, i) => (
              <div
                key={q.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(q.id, el);
                }}
                style={{ scrollSnapAlign: "start" }}
              >
                <QuoteCard
                  quote={q}
                  isActive={activeId === q.id}
                  onToggle={() => handleToggle(q.id)}
                  reduce={!!reduce}
                  index={i}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activeQuote && (
            <ExpandedPanel
              quote={activeQuote}
              onClose={() => setActiveId(null)}
              reduce={!!reduce}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
