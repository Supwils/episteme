import type { ThoughtTour } from "./thought-tours";

export const MATURE_CONTENT_TOURS: ThoughtTour[] = [
  {
    id: "proof-to-trustworthy-software",
    title: "从证明到可信软件",
    subtitle: "数学公理如何经过类型、编译与验证，进入真实分布式系统",
    waypoints: [
      "mathematics:axiom",
      "mathematics:proof",
      "computer-science:lambda-calculus-type-theory",
      "computer-science:compilers",
      "computer-science:formal-methods-and-verification",
      "computer-science:computer-security-principles",
      "computer-science:distributed-systems",
      "computer-science:consensus-algorithms",
    ],
    steps: [
      {
        nodeId: "mathematics:axiom",
        title: "先声明推理从哪里开始",
        summary:
          "公理不是不容质疑的真理，而是形式系统明确接受的起点；改变公理，就会改变可推导的数学世界。",
        focus: "形式起点",
      },
      {
        nodeId: "mathematics:proof",
        title: "把可信度变成可检查步骤",
        summary: "证明要求每一步都由定义、公理或既有结论推出，让结论不再只依赖样例、直觉或权威。",
        focus: "演绎链条",
      },
      {
        nodeId: "computer-science:lambda-calculus-type-theory",
        title: "命题和程序在类型中相遇",
        summary:
          "命题即类型的对应把构造证明与编写程序连接起来，使某些程序性质能够在类型检查阶段被保证。",
        focus: "逻辑与程序",
      },
      {
        nodeId: "computer-science:compilers",
        title: "编译器必须保存语言语义",
        summary:
          "编译器跨越源语言、优化和机器代码；可信转换要求优化后的程序仍保持原始程序应有的行为。",
        focus: "语义保持",
      },
      {
        nodeId: "computer-science:formal-methods-and-verification",
        title: "把需求写成机器可检验性质",
        summary:
          "模型检查、定理证明和形式化规范能够发现测试难以覆盖的状态，但结论仍取决于规范是否写对。",
        focus: "形式化验证",
      },
      {
        nodeId: "computer-science:computer-security-principles",
        title: "安全先从威胁模型开始",
        summary:
          "最小权限、纵深防御和安全默认值只有针对明确攻击者、资产和信任边界时，才能形成可评估设计。",
        focus: "安全边界",
      },
      {
        nodeId: "computer-science:distributed-systems",
        title: "网络把失败组合起来",
        summary: "多机系统同时面对延迟、丢包、部分故障和并发，单机正确性不能自动推出整体正确性。",
        focus: "部分故障",
      },
      {
        nodeId: "computer-science:consensus-algorithms",
        title: "共识把局部状态组织成共同历史",
        summary:
          "Paxos 与 Raft 在明确故障假设下复制日志，使节点对操作顺序达成一致，但不能消除网络和可用性的权衡。",
        focus: "一致性协议",
      },
    ],
  },
  {
    id: "equations-to-interpretable-ai",
    title: "从方程到可解释 AI",
    subtitle: "连续模型、数值近似与优化，如何进入 Transformer 和机制解释",
    waypoints: [
      "mathematics:differential-equation",
      "mathematics:numerical-methods",
      "mathematics:optimization",
      "computer-science:gradient-descent-backprop",
      "computer-science:attention-and-transformers",
      "computer-science:large-language-models",
      "computer-science:ai-interpretability",
    ],
    steps: [
      {
        nodeId: "mathematics:differential-equation",
        title: "用变化率描述系统演化",
        summary:
          "微分方程不直接列出未来，而是规定状态如何随时间变化，为连续动力过程建立可推演模型。",
        focus: "动力模型",
      },
      {
        nodeId: "mathematics:numerical-methods",
        title: "解析答案缺席时控制近似误差",
        summary: "数值方法把连续问题离散化并迭代求解，步长、稳定性和舍入误差决定计算是否可信。",
        focus: "近似计算",
      },
      {
        nodeId: "mathematics:optimization",
        title: "把学习写成目标与约束",
        summary: "最优化明确模型要减小什么损失、受到什么约束，也揭示局部极值、不可辨识和目标错配。",
        focus: "目标函数",
      },
      {
        nodeId: "computer-science:gradient-descent-backprop",
        title: "梯度把误差传回参数",
        summary:
          "反向传播高效计算每个参数对损失的影响，梯度下降据此更新参数，却不保证学到因果或稳健规律。",
        focus: "训练机制",
      },
      {
        nodeId: "computer-science:attention-and-transformers",
        title: "注意力重组序列依赖",
        summary: "Transformer 让每个位置按内容选择信息来源，以并行矩阵运算取代严格顺序递归。",
        focus: "模型架构",
      },
      {
        nodeId: "computer-science:large-language-models",
        title: "规模化预训练产生通用能力",
        summary:
          "基础模型从大规模数据学习统计结构，但训练目标、数据分布与真实任务之间仍存在不可忽略的距离。",
        focus: "规模与迁移",
      },
      {
        nodeId: "computer-science:ai-interpretability",
        title: "解释必须成为可证伪假设",
        summary:
          "机制可解释性试图定位内部表征和计算回路；漂亮可视化只有在干预和反事实检验后才接近机制证据。",
        focus: "机制审计",
      },
    ],
  },
  {
    id: "molecule-to-clinical-evidence",
    title: "从分子证据到临床治疗",
    subtitle: "反应机理、立体结构与分析证据，如何跨越药物研发和临床试验",
    waypoints: [
      "chemistry:reaction-mechanisms",
      "chemistry:organic-synthesis",
      "chemistry:chirality",
      "chemistry:spectroscopy",
      "chemistry:mass-spectrometry",
      "chemistry:medicinal-chemistry",
      "medicine:drug-development",
      "medicine:clinical-trials",
      "medicine:evidence-based-medicine",
    ],
    steps: [
      {
        nodeId: "chemistry:reaction-mechanisms",
        title: "先解释键如何断裂和形成",
        summary:
          "反应机理用电子移动、中间体和过渡态解释产物来源，为选择条件和预测副反应提供因果模型。",
        focus: "电子机制",
      },
      {
        nodeId: "chemistry:organic-synthesis",
        title: "把目标分子拆成可执行路线",
        summary: "逆合成从目标结构向可得原料倒推，再用成键顺序、保护策略和纯化条件将方案变成实验。",
        focus: "路线设计",
      },
      {
        nodeId: "chemistry:chirality",
        title: "镜像结构可能产生不同生物作用",
        summary:
          "对映体拥有相同连接关系，却会被手性受体和酶不同识别，因此立体纯度直接关系疗效与安全。",
        focus: "立体选择性",
      },
      {
        nodeId: "chemistry:spectroscopy",
        title: "结构主张需要多维观测",
        summary:
          "核磁、红外和紫外等光谱从不同相互作用提供局部环境证据，单一峰图通常不足以完成结构确认。",
        focus: "结构证据",
      },
      {
        nodeId: "chemistry:mass-spectrometry",
        title: "质荷比进一步确认组成",
        summary:
          "精确质量、同位素分布和碎片谱帮助识别分子式与结构片段，并可与色谱联用分析复杂样品。",
        focus: "分子鉴定",
      },
      {
        nodeId: "chemistry:medicinal-chemistry",
        title: "候选分子必须同时优化多项目标",
        summary: "药物化学在活性、选择性、溶解度、代谢和毒性之间迭代，最强结合并不等于最好药物。",
        focus: "先导优化",
      },
      {
        nodeId: "medicine:drug-development",
        title: "分子进入高失败率转化过程",
        summary:
          "临床前研究、制剂、生产和监管要求逐层淘汰候选物，把机制可能性转化为可在人群中检验的干预。",
        focus: "转化漏斗",
      },
      {
        nodeId: "medicine:clinical-trials",
        title: "对照试验估计真实获益与伤害",
        summary:
          "随机化、预设终点和分期研究减少偏倚，但代表性、依从、罕见风险和长期结局仍需后续证据。",
        focus: "干预评价",
      },
      {
        nodeId: "medicine:evidence-based-medicine",
        title: "单项试验最终进入证据体系",
        summary:
          "循证医学结合研究质量、效应大小、患者价值和具体情境，避免把统计显著直接翻译为临床决策。",
        focus: "证据整合",
      },
    ],
  },
];
