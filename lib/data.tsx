export const DOMAINS = [
  {
    id: "universe-physics" as const,
    title: "物理学",
    titleEn: "Physics",
    description:
      "从经典力学到量子场论，探索支配宇宙的基本定律。涵盖力学、电磁学、热力学、相对论与量子力学。",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
    glowColor: "#6366f1",
    bgAccent: "rgba(99, 102, 241, 0.08)",
    borderAccent: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" fill="#6366f1" opacity="0.3" />
        <circle cx="18" cy="18" r="3" fill="#8b5cf6" />
        <ellipse
          cx="18"
          cy="18"
          rx="16"
          ry="6"
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.5"
          transform="rotate(-30 18 18)"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="16"
          ry="6"
          stroke="#8b5cf6"
          strokeWidth="1"
          opacity="0.4"
          transform="rotate(30 18 18)"
        />
        <circle cx="28" cy="10" r="1.5" fill="#a78bfa" opacity="0.6" />
        <circle cx="8" cy="26" r="1" fill="#c4b5fd" opacity="0.5" />
      </svg>
    ),
    stats: "9 物理层 · 力学到量子场论",
  },
  {
    id: "cosmology" as const,
    title: "宇宙学",
    titleEn: "Cosmology",
    description:
      "从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体。跨尺度的平滑动画下钻与科学准确的位置关系。",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #818cf8 100%)",
    glowColor: "#3b82f6",
    bgAccent: "rgba(59, 130, 246, 0.08)",
    borderAccent: "rgba(59, 130, 246, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
        <circle cx="18" cy="18" r="8" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
        <circle cx="18" cy="18" r="3" fill="#818cf8" opacity="0.6" />
        <circle cx="10" cy="10" r="1.5" fill="#3b82f6" opacity="0.5" />
        <circle cx="26" cy="12" r="1" fill="#6366f1" opacity="0.4" />
        <circle cx="12" cy="26" r="1.2" fill="#818cf8" opacity="0.3" />
      </svg>
    ),
    stats: "8 宇宙层 · 从可观测宇宙到地球",
  },
  {
    id: "human-history" as const,
    title: "人类历史",
    titleEn: "Human History",
    description:
      "从公元前10000年到公元2025年，覆盖全球六大洲。时间线、知识图谱、关系图谱、世界地图与235位历史人物，104篇知识库文章。",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #fbbf24 100%)",
    glowColor: "#f59e0b",
    bgAccent: "rgba(245, 158, 11, 0.08)",
    borderAccent: "rgba(245, 158, 11, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect
          x="8"
          y="14"
          width="20"
          height="16"
          rx="1"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path d="M10 14V10a8 8 0 0 1 16 0v4" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
        <rect x="14" y="20" width="8" height="6" rx="1" fill="#f59e0b" opacity="0.2" />
        <circle cx="18" cy="23" r="1.5" fill="#fbbf24" opacity="0.8" />
        <line x1="6" y1="30" x2="30" y2="30" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    stats: "219 事件 · 235 人物 · 104 知识库",
  },
  {
    id: "philosophy" as const,
    title: "哲学思想",
    titleEn: "Philosophy",
    description:
      "探寻存在、知识与价值的根本问题。从古希腊到当代，梳理哲学家、流派与思想的脉络。文字驱动的知识图谱。",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #34d399 100%)",
    glowColor: "#10b981",
    bgAccent: "rgba(16, 185, 129, 0.08)",
    borderAccent: "rgba(16, 185, 129, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="8" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
        <path
          d="M12 22c0 4 2.5 8 6 10 3.5-2 6-6 6-10"
          stroke="#059669"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="18" cy="14" r="3" fill="#10b981" opacity="0.3" />
        <circle cx="18" cy="14" r="1" fill="#34d399" opacity="0.8" />
        <path d="M10 10l2 2M24 10l-2 2M18 5v2" stroke="#10b981" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    stats: "68 哲学家 · 38 流派 · 229 篇文章",
  },
  {
    id: "life-science" as const,
    title: "生命科学与进化",
    titleEn: "Life Science & Evolution",
    description:
      "从第一个有机分子到人类意识，探索40亿年生命演化的壮阔历程。覆盖8个时代、84物种、6次大灭绝与23关键科学家。",
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
    glowColor: "#4a9e6f",
    bgAccent: "rgba(74, 158, 111, 0.08)",
    borderAccent: "rgba(74, 158, 111, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 4C18 4 10 10 10 18s8 14 8 14"
          stroke="#4a9e6f"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M18 4C18 4 26 10 26 18s-8 14-8 14"
          stroke="#10b981"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="18" cy="14" r="3" fill="#4a9e6f" opacity="0.3" />
        <circle cx="18" cy="14" r="1.2" fill="#34d399" opacity="0.8" />
        <path d="M12 22h12M14 26h8" stroke="#4a9e6f" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    stats: "8 时代 · 84 物种 · 6 大灭绝 · 23 科学家",
  },
  {
    id: "mathematics" as const,
    title: "数学与逻辑",
    titleEn: "Mathematics & Logic",
    description: "从计数到范畴论，探索人类思维最纯粹、最有力的形式。数学家、定理、概念与对话。",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #22d3ee 100%)",
    glowColor: "#6366f1",
    bgAccent: "rgba(99, 102, 241, 0.08)",
    borderAccent: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <text x="6" y="24" fontFamily="serif" fontSize="20" fill="#6366f1" opacity="0.5">
          ∑
        </text>
        <line x1="8" y1="28" x2="28" y2="28" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
        <circle cx="28" cy="12" r="3" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="8" x2="28" y2="12" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    stats: "5 数学时代 · 定理 · 概念 · 对话",
  },
  {
    id: "economics" as const,
    title: "经济学",
    titleEn: "Economics",
    description:
      "从古典政治学到行为经济学，探索市场、贸易与政策的运行规律。涵盖经济学家、理论、概念、流派、案例与对话。",
    gradient: "linear-gradient(135deg, #e8b84a 0%, #d4a037 50%, #f0c95d 100%)",
    glowColor: "#e8b84a",
    bgAccent: "rgba(232, 184, 74, 0.08)",
    borderAccent: "rgba(232, 184, 74, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="8" y="18" width="4" height="14" rx="1" fill="#e8b84a" opacity="0.3" />
        <rect x="16" y="12" width="4" height="20" rx="1" fill="#d4a037" opacity="0.4" />
        <rect x="24" y="8" width="4" height="24" rx="1" fill="#f0c95d" opacity="0.5" />
        <path d="M6 28h24" stroke="#e8b84a" strokeWidth="1" opacity="0.3" />
        <circle cx="10" cy="15" r="1.5" fill="#e8b84a" opacity="0.6" />
        <circle cx="26" cy="6" r="1" fill="#f0c95d" opacity="0.5" />
      </svg>
    ),
    stats: "29 经济学家 · 12 理论 · 10 概念 · 9 流派",
  },
  {
    id: "psychology" as const,
    title: "心理学",
    titleEn: "Psychology",
    description:
      "从弗洛伊德到认知神经科学，探索心智、行为与认知的深层机制。涵盖理论家、实验、现象、流派、障碍与对话。",
    gradient: "linear-gradient(135deg, #d4789c 0%, #c0608a 50%, #e89ab5 100%)",
    glowColor: "#d4789c",
    bgAccent: "rgba(212, 120, 156, 0.08)",
    borderAccent: "rgba(212, 120, 156, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="16" r="10" stroke="#d4789c" strokeWidth="1.5" opacity="0.4" />
        <path
          d="M12 16c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="#c0608a"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="18" cy="16" r="3" fill="#d4789c" opacity="0.3" />
        <path d="M14 28c0-2 2-4 4-4s4 2 4 4" stroke="#e89ab5" strokeWidth="1.5" opacity="0.4" />
        <circle cx="18" cy="16" r="1" fill="#e89ab5" opacity="0.8" />
      </svg>
    ),
    stats: "36 理论家 · 26 实验 · 16 现象 · 6 流派",
  },
  {
    id: "computer-science" as const,
    title: "计算机科学",
    titleEn: "Computer Science",
    description:
      "从图灵机到大语言模型，探索计算这门新语言。涵盖先驱、核心概念、算法、计算理论与研究前沿。",
    gradient: "linear-gradient(135deg, #4f9cf0 0%, #3a7fd0 50%, #6fb0f5 100%)",
    glowColor: "#4f9cf0",
    bgAccent: "rgba(79, 156, 240, 0.08)",
    borderAccent: "rgba(79, 156, 240, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect
          x="6"
          y="9"
          width="24"
          height="16"
          rx="2"
          stroke="#4f9cf0"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <path d="M13 30h10" stroke="#6fb0f5" strokeWidth="1.5" opacity="0.5" />
        <path d="M18 25v5" stroke="#6fb0f5" strokeWidth="1.5" opacity="0.5" />
        <path
          d="M12 14l-3 3 3 3"
          stroke="#4f9cf0"
          strokeWidth="1.5"
          opacity="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 14l3 3-3 3"
          stroke="#4f9cf0"
          strokeWidth="1.5"
          opacity="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    stats: "先驱 · 概念 · 算法 · 计算理论 · 前沿",
  },
  {
    id: "political-science" as const,
    title: "政治学",
    titleEn: "Political Science",
    description:
      "权力如何被获得、约束与正当化。涵盖政治思想家、主义、核心概念、制度与政体、国际关系与研究前沿。",
    gradient: "linear-gradient(135deg, #c25b5b 0%, #a84848 50%, #d67676 100%)",
    glowColor: "#c25b5b",
    bgAccent: "rgba(194, 91, 91, 0.08)",
    borderAccent: "rgba(194, 91, 91, 0.2)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M6 30h24" stroke="#c25b5b" strokeWidth="1.5" opacity="0.4" />
        <path
          d="M18 6l10 6H8l10-6z"
          stroke="#c25b5b"
          strokeWidth="1.5"
          opacity="0.5"
          strokeLinejoin="round"
        />
        <rect x="11" y="14" width="2.5" height="12" fill="#c25b5b" opacity="0.4" />
        <rect x="17" y="14" width="2.5" height="12" fill="#a84848" opacity="0.45" />
        <rect x="23" y="14" width="2.5" height="12" fill="#d67676" opacity="0.4" />
      </svg>
    ),
    stats: "思想家 · 主义 · 概念 · 制度 · 国关 · 前沿",
  },
];

export const FEATURES = [
  {
    icon: "📖",
    title: "阅读路线",
    titleEn: "Reading Paths",
    desc: "像读一本书那样探索知识：沿一条精心编排的路线，把一个主题从头读到尾。",
    href: "/read",
  },
  {
    icon: "◈",
    title: "知识图谱",
    desc: "以节点与连线的方式呈现知识之间的深层关联，发现跨领域的隐性联系。",
    href: "/knowledge-graph",
  },
  { icon: "◎", title: "沉浸式探索", desc: "WebGL 3D 场景与流畅动画，在视觉交互中理解复杂概念。" },
  {
    icon: "◇",
    title: "跨文明连接",
    desc: "跨越地域与时代，将不同文明的知识串联成统一的认知网络。",
  },
  { icon: "▣", title: "深度内容", desc: "400+ 篇深度文章与 40 对话，兼顾学术严谨与大众可读性。" },
  {
    icon: "📅",
    title: "每日知识",
    titleEn: "Daily Knowledge",
    desc: "每天一点新知识，从历史到科学",
    href: "/daily",
  },
];

export const STATS = [
  { value: 10, label: "知识领域", suffix: "" },
  { value: 1850, label: "知识单元", suffix: "+" },
  { value: 500, label: "深度文章", suffix: "+" },
];

export const LATEST_UPDATES = [
  {
    id: "lu-1",
    domain: "宇宙学",
    domainColor: "#3b82f6",
    title: "超星系团尺度结构更新",
    description: "新增拉尼亚凯亚超星系团的 3D 可视化，包含室女座星系团与半人马座星系团的引力关系。",
    date: "2026-05",
    href: "/cosmology",
  },
  {
    id: "lu-2",
    domain: "人类历史",
    domainColor: "#f59e0b",
    title: "丝绸之路专题上线",
    description: "从长安到罗马的完整路线，覆盖 42 个关键节点城市与 15 位代表性历史人物。",
    date: "2026-05",
    href: "/human-history",
  },
  {
    id: "lu-3",
    domain: "哲学思想",
    domainColor: "#10b981",
    title: "存在主义流派深度解析",
    description: "新增海德格尔、萨特、加缪等 12 位存在主义哲学家的核心思想梳理与知识图谱。",
    date: "2026-04",
    href: "/philosophy",
  },
  {
    id: "lu-4",
    domain: "生命科学",
    domainColor: "#4a9e6f",
    title: "寒武纪大爆发可视化",
    description: "5.4 亿年前的生命大爆发场景重建，覆盖 23 个标志性物种的 3D 模型与生态关系。",
    date: "2026-04",
    href: "/life-science",
  },
  {
    id: "lu-5",
    domain: "数学与逻辑",
    domainColor: "#6366f1",
    title: "数学与逻辑板块启动",
    description: "全新知识领域上线，覆盖从古代数学到当代范畴论的完整数学发展史。",
    date: "2026-06",
    href: "/mathematics",
  },
  {
    id: "lu-6",
    domain: "经济学",
    domainColor: "#e8b84a",
    title: "经济学板块上线",
    description:
      "覆盖 29 位经济学家、12 理论、10 概念、9 流派，从古典政治学到行为经济学的完整知识体系。",
    date: "2026-06",
    href: "/economics",
  },
  {
    id: "lu-7",
    domain: "心理学",
    domainColor: "#d4789c",
    title: "心理学板块上线",
    description: "覆盖 36 位理论家、26 经典实验、16 心理现象，从精神分析到认知神经科学的全面探索。",
    date: "2026-06",
    href: "/psychology",
  },
  {
    id: "lu-8",
    domain: "奇趣知识",
    domainColor: "#e8b84a",
    title: "「奇趣知识」上线",
    description:
      "横跨十个学科、少有人知却真实而迷人的冷知识——从章鱼的三颗心脏到克娄巴特拉的时间错觉，每条都有出处。",
    date: "2026-06",
    href: "/curiosities",
  },
];

export const FEATURED_CONTENT = [
  {
    id: "fc-1",
    domain: "宇宙学",
    domainColor: "#3b82f6",
    icon: "◉",
    title: "从大爆炸到星系形成",
    description: "追溯 138 亿年宇宙演化史，从奇点到第一代恒星的点燃。",
    href: "/cosmology",
  },
  {
    id: "fc-2",
    domain: "人类历史",
    domainColor: "#f59e0b",
    icon: "◈",
    title: "文明的摇篮：美索不达米亚",
    description: "苏美尔、阿卡德、巴比伦——人类最早的城市文明如何诞生。",
    href: "/human-history",
  },
  {
    id: "fc-3",
    domain: "哲学思想",
    domainColor: "#10b981",
    icon: "◎",
    title: "柏拉图与亚里士多德",
    description: "西方哲学的两大源头，理念论与实体论的根本分歧。",
    href: "/philosophy",
  },
  {
    id: "fc-4",
    domain: "生命科学",
    domainColor: "#4a9e6f",
    icon: "◇",
    title: "DNA 双螺旋的发现",
    description: "沃森与克里克的发现如何改变了生物学，开启了分子生物学时代。",
    href: "/life-science",
  },
  {
    id: "fc-5",
    domain: "物理学",
    domainColor: "#6366f1",
    icon: "◉",
    title: "黑洞：时空的深渊",
    description: "从史瓦西半径到事件视界，理解宇宙中最神秘的天体。",
    href: "/universe-physics",
  },
  {
    id: "fc-6",
    domain: "人类历史",
    domainColor: "#f59e0b",
    icon: "◈",
    title: "文艺复兴与科学革命",
    description: "达芬奇、伽利略、牛顿——人类认知范式的根本转变。",
    href: "/human-history",
  },
  {
    id: "fc-7",
    domain: "数学与逻辑",
    domainColor: "#6366f1",
    icon: "∑",
    title: "欧几里得《几何原本》",
    description: "公理化方法的诞生——人类首次用逻辑构建完整的知识体系。",
    href: "/mathematics",
  },
  {
    id: "fc-8",
    domain: "数学与逻辑",
    domainColor: "#8b5cf6",
    icon: "∞",
    title: "微积分的发明",
    description: "牛顿与莱布尼茨的优先权之争，开启了分析学的黄金时代。",
    href: "/mathematics",
  },
  {
    id: "fc-9",
    domain: "经济学",
    domainColor: "#e8b84a",
    icon: "◈",
    title: "亚当·斯密与《国富论》",
    description: "现代经济学的奠基之作，看不见的手如何引导市场自发秩序。",
    href: "/economics",
  },
  {
    id: "fc-10",
    domain: "经济学",
    domainColor: "#d4a037",
    icon: "◎",
    title: "博弈论与纳什均衡",
    description: "从囚徒困境到市场策略，博弈论如何改变了经济学的分析范式。",
    href: "/economics",
  },
  {
    id: "fc-11",
    domain: "心理学",
    domainColor: "#d4789c",
    icon: "◉",
    title: "斯坦福监狱实验",
    description: "津巴多的经典实验揭示了情境力量如何塑造人类行为。",
    href: "/psychology",
  },
  {
    id: "fc-12",
    domain: "心理学",
    domainColor: "#c0608a",
    icon: "◇",
    title: "认知失调理论",
    description: "费斯廷格的理论揭示了人类如何处理矛盾信念与行为之间的张力。",
    href: "/psychology",
  },
];
