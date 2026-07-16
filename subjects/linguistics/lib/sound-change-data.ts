export type SoundChangeHypothesisId = "regular" | "conditioned" | "borrowing" | "analogy";
export type SoundChangeAssessment = "supported" | "limited" | "contradicted" | "not-needed";

export type SoundChangeEvidenceRow = {
  meaning: string;
  earlier: string;
  comparison: string;
  outcome: string;
  note: string;
  counterexample?: boolean;
};

export type SoundChangeHypothesis = {
  assessment: SoundChangeAssessment;
  claim: string;
  evidence: string;
  nextCheck: string;
};

export type SoundChangeCase = {
  id: string;
  label: string;
  family: string;
  question: string;
  rule: string;
  context: string;
  rows: readonly SoundChangeEvidenceRow[];
  hypotheses: Record<SoundChangeHypothesisId, SoundChangeHypothesis>;
  inference: string;
  caution: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const SOUND_CHANGE_HYPOTHESIS_LABELS: Record<SoundChangeHypothesisId, string> = {
  regular: "规则对应",
  conditioned: "条件音变",
  borrowing: "借用与接触",
  analogy: "类推重组",
};

export const SOUND_CHANGE_ASSESSMENT_LABELS: Record<SoundChangeAssessment, string> = {
  supported: "当前证据支持",
  limited: "可能参与，但不足",
  contradicted: "被当前对照反驳",
  "not-needed": "无需调用",
};

export const SOUND_CHANGE_CASES: readonly SoundChangeCase[] = [
  {
    id: "hawaiian-t-k",
    label: "波利尼西亚 t → k",
    family: "南岛语系 · 波利尼西亚语族",
    question: "为什么毛利语和其他波利尼西亚语言的 t，常对应夏威夷语的 k？",
    rule: "原始波利尼西亚语 *t > 夏威夷语 k",
    context: "在夏威夷语主要方言中跨词汇发生，不依赖相邻元音。",
    rows: [
      {
        meaning: "人",
        earlier: "原始波利尼西亚语 *taŋata",
        comparison: "毛利语 tangata",
        outcome: "夏威夷语 kanaka",
        note: "两个 t 位置都对应 k；ŋ 的结果需另立规则。",
      },
      {
        meaning: "三",
        earlier: "原始波利尼西亚语 *tolu",
        comparison: "汤加语 tolu / 毛利语 toru",
        outcome: "夏威夷语 kolu",
        note: "词首 t:k 对应再次出现。",
      },
      {
        meaning: "禁忌、神圣",
        earlier: "原始波利尼西亚语 *tapu",
        comparison: "汤加语 tapu / 毛利语 tapu",
        outcome: "夏威夷语 kapu",
        note: "文化核心词也服从同一对应。",
      },
      {
        meaning: "一",
        earlier: "原始波利尼西亚语 *tasi",
        comparison: "萨摩亚语 tasi / 毛利语 tahi",
        outcome: "夏威夷语 kahi",
        note: "t:k 与 s:h 是两条独立对应，不能合并成一条。",
      },
    ],
    hypotheses: {
      regular: {
        assessment: "supported",
        claim: "一类同源词在相同语言分支稳定呈现 t:k 对应。",
        evidence: "四组意义不同、音环境不同的词都重复该对应，远强于单词相似。",
        nextCheck: "扩大到更多原始 *t 词，并检查夏威夷内部方言和借词层。",
      },
      conditioned: {
        assessment: "contradicted",
        claim: "只有某个相邻元音或音节位置触发 t > k。",
        evidence: "a、o 等不同后续元音和多个词内位置都出现变化，当前没有单一局部环境。",
        nextCheck: "若提出更复杂环境，必须预测哪些 *t 应保留并找到系统对照。",
      },
      borrowing: {
        assessment: "not-needed",
        claim: "夏威夷语分别借入了这些 k 形式。",
        evidence: "亲属词、数词和核心词汇共同呈现成套对应，用一次分支音变解释更经济。",
        nextCheck: "仍要排查晚近借词，不能把所有相似形式自动列为继承。",
      },
      analogy: {
        assessment: "limited",
        claim: "某个高频 k 模式逐词推广。",
        evidence: "类推可能影响个别词，但无法自然解释跨大量无关词根的完整音位对应。",
        nextCheck: "寻找只在某一形态范式中扩散、而非所有 *t 词都变化的证据。",
      },
    },
    inference: "最简解释是一条分支层面的规则音变；每个词还可能包含其他独立声音对应。",
    caution: "现代词不是从毛利语直接变成夏威夷语；它们是共同祖语的姐妹分支反映。",
    sourceLabel: "POLLEX-Online 与 Garrett《Sound Change》",
    sourceUrl: "https://pollex.eva.mpg.de/",
  },
  {
    id: "italian-palatalization",
    label: "意大利语条件腭化",
    family: "印欧语系 · 罗曼语族",
    question: "拉丁语 c 的后代为什么有时像 k，有时变成意大利语的 /tʃ/？",
    rule: "拉丁语 /k/ > 意大利语 /tʃ/ / __ 前元音 e, i",
    context: "变化由后续前元音触发；a、o、u 前通常保留 /k/。",
    rows: [
      {
        meaning: "一百",
        earlier: "拉丁语 centum /kentum/",
        comparison: "后接前元音 e",
        outcome: "意大利语 cento /tʃento/",
        note: "符合腭化环境。",
      },
      {
        meaning: "蜡",
        earlier: "拉丁语 cēra /keːra/",
        comparison: "后接前元音 e",
        outcome: "意大利语 cera /tʃera/",
        note: "另一词根重复同一条件。",
      },
      {
        meaning: "狗",
        earlier: "拉丁语 canis /kanis/",
        comparison: "后接低元音 a",
        outcome: "意大利语 cane /kane/",
        note: "k 保留，是关键反事实对照。",
        counterexample: true,
      },
      {
        meaning: "角",
        earlier: "拉丁语 cornū /kornuː/",
        comparison: "后接后元音 o",
        outcome: "意大利语 corno /korno/",
        note: "再次显示变化并非所有 /k/ 无条件发生。",
        counterexample: true,
      },
    ],
    hypotheses: {
      regular: {
        assessment: "limited",
        claim: "所有拉丁 /k/ 都规则变成 /tʃ/。",
        evidence: "cento 与 cera 支持变化，但 cane、corno 的保留反驳无条件版本。",
        nextCheck: "把规则改写为带环境的预测，再寻找 e、i 前的反例。",
      },
      conditioned: {
        assessment: "supported",
        claim: "前元音促使软腭音腭化，其他元音前保留。",
        evidence: "变化项和保留项在同一语言中按后续元音分组，形成最小条件对照。",
        nextCheck: "加入不同词位、重音和后续变化，检查规则的时间层次。",
      },
      borrowing: {
        assessment: "not-needed",
        claim: "每个 /tʃ/ 词都是从另一语言借入。",
        evidence: "继承词按语音环境系统分布，无需为同一条件下多词分别假设借用。",
        nextCheck: "晚期学术借词仍可能恢复 /k/，应按首次记录与语体分层。",
      },
      analogy: {
        assessment: "limited",
        claim: "词形范式把 /tʃ/ 推广到部分形式。",
        evidence: "类推可解释个别范式交替，却不是当前跨无关词根的首要共同原因。",
        nextCheck: "比较同一词根在不同后缀前是否出现范式拉平。",
      },
    },
    inference: "保留项不是规则失败，而是识别条件环境所必需的对照证据。",
    caution: "现代拼写 c 不能直接当作古代发音；结论依赖历史音值和年代分层。",
    sourceLabel: "Loporcaro, Vowel Length from Latin to Romance",
    sourceUrl:
      "https://global.oup.com/academic/product/vowel-length-from-latin-to-romance-9780199656554",
  },
  {
    id: "germanic-inheritance-loans",
    label: "日耳曼继承与拉丁借词",
    family: "印欧语系 · 日耳曼语族",
    question: "为什么 father 与 Latin pater 对应 f:p，英语 paternal 却保留 p？",
    rule: "原始印欧语 *p > 原始日耳曼语 *f；后期借词不追溯适用旧音变",
    context: "规则作用于日耳曼语形成期的继承词；更晚从拉丁语、法语借入的词进入时变化已经结束。",
    rows: [
      {
        meaning: "父亲",
        earlier: "拉丁语 pater / 梵语 pitar-",
        comparison: "共同祖语的 *p 对照",
        outcome: "英语 father",
        note: "继承词显示 p:f 对应；不是 Latin 直接变成 English。",
      },
      {
        meaning: "鱼",
        earlier: "拉丁语 piscis",
        comparison: "共同祖语的 *p 对照",
        outcome: "英语 fish",
        note: "另一核心词重复 p:f。",
      },
      {
        meaning: "父系的",
        earlier: "拉丁语 paternus",
        comparison: "中世纪以后学术借入",
        outcome: "英语 paternal",
        note: "保留 p，不是格林定律的随机例外。",
        counterexample: true,
      },
      {
        meaning: "双脚的、踏板",
        earlier: "拉丁语 pedalis",
        comparison: "后期法语/拉丁语借入",
        outcome: "英语 pedal",
        note: "与继承的 foot 构成借词层对照。",
        counterexample: true,
      },
    ],
    hypotheses: {
      regular: {
        assessment: "supported",
        claim: "继承层的原始 *p 在日耳曼分支规则对应 f。",
        evidence: "father、fish、foot 等核心继承词形成对应系列。",
        nextCheck: "加入 *t、*k 系列并处理格林定律与维尔纳定律的相对年代。",
      },
      conditioned: {
        assessment: "limited",
        claim: "p 是否变化由相邻声音决定。",
        evidence: "当前 p 保留项按借入年代分组，而不是按相邻元音分组。",
        nextCheck: "检验重音条件可解释的其他摩擦音对应，不把所有例外归借用。",
      },
      borrowing: {
        assessment: "supported",
        claim: "paternal、pedal 在旧音变后进入英语，所以保留 p。",
        evidence: "词义领域、历史记录和拉丁/法语形态共同支持晚期借入层。",
        nextCheck: "查最早文献、借入路径和中介语言，避免仅凭形式判断。",
      },
      analogy: {
        assessment: "not-needed",
        claim: "p 由某个英语范式重新恢复。",
        evidence: "借词史已解释保留，且 paternal 并非 father 范式内部的生产形式。",
        nextCheck: "若发现早期 f 形式后来受拉丁拼写影响恢复 p，才需要类推解释。",
      },
    },
    inference: "规则音变与借用可同时成立；先按词汇历史分层，所谓例外会显著减少。",
    caution: "同源、借词和祖先—后代关系必须分开；表面相似本身不能决定词源。",
    sourceLabel: "Oxford English Dictionary 与标准印欧比较材料",
    sourceUrl: "https://www.oed.com/dictionary/father_n",
  },
  {
    id: "english-plural-analogy",
    label: "英语复数类推重组",
    family: "印欧语系 · 西日耳曼语支",
    question: "同一历史元音变化为何保留在 feet、geese，却没有留下现代 *beek？",
    rule: "早期 i-变音产生元音交替；后来的生产性 -s 复数类推可重塑个别范式",
    context: "音变按历史环境作用后，形态类推能在后世消除或扩大交替。",
    rows: [
      {
        meaning: "脚（复数）",
        earlier: "古英语 fōt / fēt",
        comparison: "i-变音交替保留",
        outcome: "现代英语 foot / feet",
        note: "旧音变结果成为不规则范式。",
      },
      {
        meaning: "鹅（复数）",
        earlier: "古英语 gōs / gēs",
        comparison: "i-变音交替保留",
        outcome: "现代英语 goose / geese",
        note: "高频范式继续储存交替。",
      },
      {
        meaning: "牙（复数）",
        earlier: "古英语 tōþ / tēþ",
        comparison: "i-变音交替保留",
        outcome: "现代英语 tooth / teeth",
        note: "第三个保留系列。",
      },
      {
        meaning: "书（复数）",
        earlier: "古英语 bōc / bēc",
        comparison: "旧交替被生产模式拉平",
        outcome: "现代英语 book / books",
        note: "不是原音变漏掉，而是后期类推重建复数。",
        counterexample: true,
      },
    ],
    hypotheses: {
      regular: {
        assessment: "limited",
        claim: "原音变应在所有历史环境相同的词中留下现代交替。",
        evidence: "feet、geese、teeth 保留结果，但 books 显示后续过程可覆盖旧规则产物。",
        nextCheck: "先重建古英语范式，不能从现代形式直接判断原规则是否规则。",
      },
      conditioned: {
        assessment: "supported",
        claim: "早期复数词尾的高前元音触发词干元音前移。",
        evidence: "历史单复数对照支持同一音系环境，后来词尾消失仍留下交替。",
        nextCheck: "检查相对年代：触发元音必须在变音发生时仍存在。",
      },
      borrowing: {
        assessment: "not-needed",
        claim: "books 是后来从另一语言借入的复数。",
        evidence: "book 是继承词，历史资料直接记录 bōc/bēc；借用不能解释范式替换。",
        nextCheck: "其他词仍需逐项查词源，继承身份不能靠常用程度猜测。",
      },
      analogy: {
        assessment: "supported",
        claim: "生产性 -s 复数按单数 book 重新建立 books。",
        evidence: "现代形式接近多数名词模式，而历史 bēc 证明早期音变结果曾存在。",
        nextCheck: "比较词频、方言记录和变化时间，检验哪些范式更容易被拉平。",
      },
    },
    inference: "现代不规则分布是音变与后续形态类推叠加的结果，不能只靠一条同步规则解释。",
    caution: "类推不是说话者有意识纠错；它是按高生产性模式重组范式的历史过程。",
    sourceLabel: "Hogg & Fulk, A Grammar of Old English",
    sourceUrl:
      "https://www.wiley.com/en-us/A+Grammar+of+Old+English%2C+Volume+2%3A+Morphology-p-9780631136712",
  },
] as const;
