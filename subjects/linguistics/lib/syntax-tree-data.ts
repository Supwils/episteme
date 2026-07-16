export type SyntaxMode = "constituency" | "dependency";

export interface SyntaxNode {
  id: string;
  label: string;
  detail: string;
  role: string;
  x: number;
  y: number;
  revealStage: 0 | 1 | 2;
}

export interface SyntaxEdge {
  source: string;
  target: string;
  label?: string;
}

export interface SyntaxAnalysis {
  id: string;
  label: string;
  interpretation: string;
  constituency: { nodes: readonly SyntaxNode[]; edges: readonly SyntaxEdge[] };
  dependency: { nodes: readonly SyntaxNode[]; edges: readonly SyntaxEdge[] };
}

export interface SyntaxExample {
  id: string;
  language: string;
  order: string;
  sentence: string;
  translation: string;
  evidence: string;
  analyses: readonly SyntaxAnalysis[];
}

const phrase = (
  id: string,
  label: string,
  detail: string,
  role: string,
  x: number,
  y: number,
  revealStage: 0 | 1 | 2
): SyntaxNode => ({ id, label, detail, role, x, y, revealStage });

const basicAnalysis = (
  id: string,
  label: string,
  interpretation: string,
  words: readonly [string, string, string],
  roles: readonly [string, string, string],
  linearOrder: readonly [number, number, number]
): SyntaxAnalysis => {
  const [subject, verb, object] = words;
  const tokenX = (semanticIndex: number) => [18, 50, 82][linearOrder.indexOf(semanticIndex)]!;
  return {
    id,
    label,
    interpretation,
    constituency: {
      nodes: [
        phrase("s", "S", "完整小句：把名词短语与谓词短语组合起来。", "小句", 50, 12, 2),
        phrase("np-s", "NP", `主语短语：${words[0]}`, roles[0], 24, 38, 1),
        phrase("vp", "VP", `谓词短语：${words[1]} ${words[2]}`, "谓词", 67, 38, 1),
        phrase("w-s", words[0], `承担${roles[0]}角色。`, roles[0], tokenX(0), 77, 0),
        phrase("w-v", words[1], `中心谓词，组织参与者关系。`, roles[1], tokenX(1), 77, 0),
        phrase("w-o", words[2], `承担${roles[2]}角色。`, roles[2], tokenX(2), 77, 0),
      ],
      edges: [
        { source: "s", target: "np-s" },
        { source: "s", target: "vp" },
        { source: "np-s", target: "w-s" },
        { source: "vp", target: "w-v" },
        { source: "vp", target: "w-o" },
      ],
    },
    dependency: {
      nodes: [
        phrase("root", verb, "句法中心：其他成分通过依存关系连接到它。", roles[1], 50, 18, 2),
        phrase("dep-s", subject, `通过主语关系连接中心词。`, roles[0], 22, 66, 0),
        phrase("dep-o", object, `通过宾语关系连接中心词。`, roles[2], 78, 66, 0),
      ],
      edges: [
        { source: "root", target: "dep-s", label: "主语" },
        { source: "root", target: "dep-o", label: "宾语" },
      ],
    },
  };
};

const englishInstrument: SyntaxAnalysis = {
  id: "instrument",
  label: "工具附着",
  interpretation: "我使用望远镜看见了那个人；介词短语修饰看见事件。",
  constituency: {
    nodes: [
      phrase("s", "S", "完整小句。", "小句", 50, 9, 2),
      phrase("np", "NP", "主语 I。", "感知者", 13, 34, 1),
      phrase("vp", "VP", "saw 与两个成分共同组成谓词短语。", "谓词", 61, 34, 1),
      phrase("i", "I", "看见事件的感知者。", "施事/体验者", 10, 82, 0),
      phrase("saw", "saw", "中心谓词。", "谓词", 38, 82, 0),
      phrase("person", "the person", "被看见的参与者。", "受事", 62, 82, 0),
      phrase("pp", "with a telescope", "附着到 VP，表示看见事件使用的工具。", "工具", 84, 58, 1),
    ],
    edges: [
      { source: "s", target: "np" },
      { source: "s", target: "vp" },
      { source: "np", target: "i" },
      { source: "vp", target: "saw" },
      { source: "vp", target: "person" },
      { source: "vp", target: "pp" },
    ],
  },
  dependency: {
    nodes: [
      phrase("saw", "saw", "句法中心。", "谓词", 50, 17, 2),
      phrase("i", "I", "看见者。", "主语", 12, 68, 0),
      phrase("person", "person", "被看见的人。", "宾语", 55, 68, 0),
      phrase("telescope", "telescope", "直接依存于 saw，表示工具。", "工具修饰", 86, 68, 0),
    ],
    edges: [
      { source: "saw", target: "i", label: "主语" },
      { source: "saw", target: "person", label: "宾语" },
      { source: "saw", target: "telescope", label: "工具" },
    ],
  },
};

const englishModifier: SyntaxAnalysis = {
  ...englishInstrument,
  id: "modifier",
  label: "名词附着",
  interpretation: "我看见了携带望远镜的那个人；介词短语修饰 person。",
  constituency: {
    nodes: englishInstrument.constituency.nodes.map((node) =>
      node.id === "person"
        ? {
            ...node,
            label: "NP",
            detail: "the person 与介词短语组成较大的名词短语。",
            y: 58,
            revealStage: 1 as const,
          }
        : node.id === "pp"
          ? { ...node, detail: "附着到名词短语，描述 person。", role: "名词修饰" }
          : node
    ),
    edges: englishInstrument.constituency.edges
      .filter((edge) => !(edge.source === "vp" && edge.target === "pp"))
      .concat({ source: "person", target: "pp" }),
  },
  dependency: {
    nodes: englishInstrument.dependency.nodes.map((node) =>
      node.id === "telescope"
        ? { ...node, detail: "直接依存于 person，描述那个人。", role: "名词修饰" }
        : node
    ),
    edges: englishInstrument.dependency.edges
      .filter((edge) => edge.target !== "telescope")
      .concat({ source: "person", target: "telescope", label: "修饰" }),
  },
};

export const SYNTAX_EXAMPLES: readonly SyntaxExample[] = [
  {
    id: "mandarin",
    language: "普通话",
    order: "SVO",
    sentence: "张三 收到 一封信",
    translation: "Zhangsan received a letter.",
    evidence: "普通话在这个中性及物小句中展示 SVO；话题化等结构可以产生其他表面顺序。",
    analyses: [
      basicAnalysis(
        "basic",
        "基础分析",
        "名词短语在动词前，宾语在动词后。",
        ["张三", "收到", "一封信"],
        ["主语", "谓词", "宾语"],
        [0, 1, 2]
      ),
    ],
  },
  {
    id: "japanese",
    language: "日语",
    order: "SOV",
    sentence: "John ga tegami o yonda",
    translation: "John read the letter.",
    evidence: "ga 与 o 标示论元关系，动词位于小句末；表面位置和形态标记共同提供证据。",
    analyses: [
      basicAnalysis(
        "basic",
        "基础分析",
        "宾语位于动词前，格助词帮助识别语法关系。",
        ["John-ga", "yonda", "tegami-o"],
        ["主语", "谓词", "宾语"],
        [0, 2, 1]
      ),
    ],
  },
  {
    id: "irish",
    language: "爱尔兰语",
    order: "VSO",
    sentence: "Léann na sagairt na leabhair",
    translation: "The priests read the books.",
    evidence: "限定动词 Léann 位于主语和宾语之前，展示 VSO 顺序。",
    analyses: [
      basicAnalysis(
        "basic",
        "基础分析",
        "动词在小句开头，但仍是组织论元关系的中心。",
        ["na sagairt", "Léann", "na leabhair"],
        ["主语", "谓词", "宾语"],
        [1, 0, 2]
      ),
    ],
  },
  {
    id: "english-ambiguity",
    language: "英语",
    order: "SVO + PP 歧义",
    sentence: "I saw the person with a telescope",
    translation: "我（用望远镜）看见了（拿望远镜的）那个人。",
    evidence: "相同词序允许两种介词短语附着；上下文、韵律和结构共同影响解释。",
    analyses: [englishInstrument, englishModifier],
  },
];

export function visibleSyntaxNodes(nodes: readonly SyntaxNode[], stage: number): SyntaxNode[] {
  return nodes.filter((node) => node.revealStage <= Math.min(stage, 2));
}
