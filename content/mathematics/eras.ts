import type { MathEra } from "./types";

export const MATH_ERAS: MathEra[] = [
  {
    id: "ancient",
    name: { zh: "古代数学", en: "Ancient Mathematics" },
    timeRange: "3000 BCE – 500 CE",
    description:
      "从巴比伦和埃及的实用计算到希腊的公理化演绎。数学从解决土地测量、天文历法的工具，升华为追求永恒真理的学科。欧几里得的《几何原本》建立了公理化方法的典范，阿基米德将数学与物理结合，丢番图开创了代数符号。",
    keyFigures: ["euclid", "pythagoras", "archimedes", "diophantus"],
    keyDiscoveries: [
      "勾股定理",
      "欧几里得《几何原本》",
      "阿基米德求积法",
      "丢番图方程",
      "圆周率的近似计算",
    ],
  },
  {
    id: "indian-golden-age",
    name: { zh: "印度数学黄金时代", en: "Indian Golden Age" },
    timeRange: "500 – 1200 CE",
    description:
      "印度数学家发明了十进位值制记数法和零的概念，彻底改变了人类的计算方式。阿耶波多提出了正弦概念，婆罗摩笈多建立了负数运算规则。这些创新通过阿拉伯世界传入欧洲，成为现代数学的基础。",
    keyFigures: ["aryabhata", "brahmagupta"],
    keyDiscoveries: [
      "十进位值制",
      "零的概念",
      "正弦函数",
      "负数运算规则",
      "不定方程的一般解法",
    ],
  },
  {
    id: "islamic-golden-age",
    name: { zh: "伊斯兰黄金时代", en: "Islamic Golden Age" },
    timeRange: "800 – 1400 CE",
    description:
      "阿拉伯数学家系统化了代数学，发展了算法概念。花拉子密的《代数学》奠定了代数作为独立学科的基础，他的名字演变为"算法"（algorithm）一词。这一时期还保存并发展了希腊和印度的数学遗产。",
    keyFigures: ["al-khwarizmi", "omar-khayyam"],
    keyDiscoveries: [
      "代数学的系统化",
      "算法概念",
      "三次方程的几何解法",
      "三角学的发展",
      "组合数学",
    ],
  },
  {
    id: "renaissance",
    name: { zh: "文艺复兴时期", en: "Renaissance" },
    timeRange: "1400 – 1600",
    description:
      "欧洲数学复兴，意大利代数学家发现了三次和四次方程的一般解法。韦达引入了代数符号系统，纳皮尔发明了对数。数学开始从几何主导向代数主导转变。",
    keyFigures: ["fibonacci", "cardano", "vieta", "napier"],
    keyDiscoveries: [
      "三次方程求根公式",
      "四次方程求根公式",
      "代数符号系统",
      "对数",
      "虚数的首次出现",
    ],
  },
  {
    id: "calculus-revolution",
    name: { zh: "微积分革命", en: "Calculus Revolution" },
    timeRange: "1600 – 1700",
    description:
      "数学史上最伟大的突破之一。牛顿和莱布尼茨独立发明微积分，为描述连续变化提供了强大工具。费马和笛卡尔创立了解析几何，将几何与代数统一。这一时期的数学与物理学紧密结合，推动了科学革命。",
    keyFigures: ["descartes", "fermat", "newton", "leibniz"],
    keyDiscoveries: [
      "解析几何",
      "微积分",
      "万有引力的数学描述",
      "费马大定理的提出",
      "概率论的开端",
    ],
  },
  {
    id: "rigorization",
    name: { zh: "严格化时代", en: "Era of Rigorization" },
    timeRange: "1800 – 1900",
    description:
      "数学从直觉和计算走向严格化和抽象化。柯西和魏尔斯特拉斯为微积分奠定了严格的极限基础，伽罗瓦创立了群论，黎曼革命了几何学，康托尔建立了集合论。非欧几何的发现动摇了数学真理的绝对性。",
    keyFigures: ["euler", "gauss", "cauchy", "riemann", "galois", "cantor"],
    keyDiscoveries: [
      "ε-δ 极限定义",
      "群论",
      "非欧几何",
      "黎曼几何",
      "集合论",
      "复分析",
      "代数数论",
    ],
  },
  {
    id: "foundations-crisis",
    name: { zh: "基础危机", en: "Foundations Crisis" },
    timeRange: "1900 – 1950",
    description:
      "集合论悖论引发了数学基础的危机。希尔伯特提出了公理化纲领，试图为全部数学建立一致且完备的公理系统。但哥德尔的不完备定理证明了这一纲领不可实现。图灵的可计算性理论为计算机科学奠定了基础。",
    keyFigures: ["hilbert", "noether", "godel", "turing", "von-neumann"],
    keyDiscoveries: [
      "哥德尔不完备定理",
      "停机问题",
      "图灵机",
      "抽象代数",
      "测度论",
      "博弈论",
    ],
  },
  {
    id: "modern",
    name: { zh: "现代数学", en: "Modern Mathematics" },
    timeRange: "1950 – 至今",
    description:
      "数学进入多元化和应用化时代。计算机的出现开辟了全新的数学领域——密码学、计算复杂性、混沌理论。格罗滕迪克的概形理论统一了代数几何，佩雷尔曼证明了庞加莱猜想，陶哲轩在调和分析领域取得突破。数学与物理、生物、金融的交叉日益深入。",
    keyFigures: ["erdos", "grothendieck", "perelman", "tao"],
    keyDiscoveries: [
      "概形理论",
      "费马大定理的证明",
      "庞加莱猜想的证明",
      "混沌理论",
      "RSA 密码学",
      "朗兰兹纲领",
    ],
  },
];

export function getEraById(id: string): MathEra | null {
  return MATH_ERAS.find((era) => era.id === id) ?? null;
}

export function getEraByIndex(index: number): MathEra | null {
  return MATH_ERAS[index] ?? null;
}

export const ERA_IDS = MATH_ERAS.map((era) => era.id);
