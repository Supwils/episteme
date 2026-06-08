export type ConceptRelationType = 'opposes' | 'requires' | 'extends' | 'related';

export type ConceptRelation = {
  source: string;
  target: string;
  type: ConceptRelationType;
  description: string;
};

export type ConceptNode = {
  id: string;
  label: string;
  label_en: string;
  field: string;
};

export const FIELD_COLORS: Record<string, string> = {
  形而上学: '#c678dd',
  认识论: '#61afef',
  伦理学: '#e06c75',
  美学: '#e5c07b',
  政治哲学: '#56b6c2',
  逻辑学: '#98c379',
  语言哲学: '#d19a66',
  心灵哲学: '#a88adf',
  宗教哲学: '#c8a45a',
  科学哲学: '#be5046',
};

export const RELATION_COLORS: Record<ConceptRelationType, string> = {
  opposes: '#e06c75',
  requires: '#61afef',
  extends: '#98c379',
  related: 'rgba(255,255,255,0.25)',
};

export const CONCEPT_NODES: ConceptNode[] = [
  // 形而上学 (Metaphysics)
  { id: 'existence', label: '存在', label_en: 'Existence', field: '形而上学' },
  { id: 'nothingness', label: '虚无', label_en: 'Nothingness', field: '形而上学' },
  { id: 'being', label: '本体', label_en: 'Being', field: '形而上学' },
  { id: 'essence', label: '本质', label_en: 'Essence', field: '形而上学' },
  { id: 'substance', label: '实体', label_en: 'Substance', field: '形而上学' },
  { id: 'causality', label: '因果', label_en: 'Causality', field: '形而上学' },
  { id: 'necessity', label: '必然性', label_en: 'Necessity', field: '形而上学' },
  { id: 'contingency', label: '偶然性', label_en: 'Contingency', field: '形而上学' },

  // 认识论 (Epistemology)
  { id: 'knowledge', label: '知识', label_en: 'Knowledge', field: '认识论' },
  { id: 'truth', label: '真理', label_en: 'Truth', field: '认识论' },
  { id: 'belief', label: '信念', label_en: 'Belief', field: '认识论' },
  { id: 'justification', label: '证成', label_en: 'Justification', field: '认识论' },
  { id: 'skepticism', label: '怀疑论', label_en: 'Skepticism', field: '认识论' },
  { id: 'reason', label: '理性', label_en: 'Reason', field: '认识论' },

  // 伦理学 (Ethics)
  { id: 'virtue', label: '德性', label_en: 'Virtue', field: '伦理学' },
  { id: 'justice', label: '正义', label_en: 'Justice', field: '伦理学' },
  { id: 'happiness', label: '幸福', label_en: 'Happiness', field: '伦理学' },
  { id: 'duty', label: '义务', label_en: 'Duty', field: '伦理学' },
  { id: 'freedom', label: '自由', label_en: 'Freedom', field: '伦理学' },
  { id: 'responsibility', label: '责任', label_en: 'Responsibility', field: '伦理学' },
  { id: 'good-evil', label: '善恶', label_en: 'Good & Evil', field: '伦理学' },

  // 美学 (Aesthetics)
  { id: 'beauty', label: '美', label_en: 'Beauty', field: '美学' },
  { id: 'sublime', label: '崇高', label_en: 'Sublime', field: '美学' },
  { id: 'taste', label: '趣味', label_en: 'Taste', field: '美学' },
  { id: 'art', label: '艺术', label_en: 'Art', field: '美学' },

  // 政治哲学 (Political Philosophy)
  { id: 'state', label: '国家', label_en: 'State', field: '政治哲学' },
  { id: 'social-contract', label: '社会契约', label_en: 'Social Contract', field: '政治哲学' },
  { id: 'rights', label: '权利', label_en: 'Rights', field: '政治哲学' },
  { id: 'equality', label: '平等', label_en: 'Equality', field: '政治哲学' },
  { id: 'democracy', label: '民主', label_en: 'Democracy', field: '政治哲学' },

  // 逻辑学 (Logic)
  { id: 'logic', label: '逻辑', label_en: 'Logic', field: '逻辑学' },
  { id: 'dialectic', label: '辩证法', label_en: 'Dialectic', field: '逻辑学' },
  { id: 'paradox', label: '悖论', label_en: 'Paradox', field: '逻辑学' },
  { id: 'syllogism', label: '三段论', label_en: 'Syllogism', field: '逻辑学' },

  // 语言哲学 (Philosophy of Language)
  { id: 'language', label: '语言', label_en: 'Language', field: '语言哲学' },
  { id: 'meaning', label: '意义', label_en: 'Meaning', field: '语言哲学' },
  { id: 'reference', label: '指称', label_en: 'Reference', field: '语言哲学' },

  // 心灵哲学 (Philosophy of Mind)
  { id: 'mind', label: '心灵', label_en: 'Mind', field: '心灵哲学' },
  { id: 'consciousness', label: '意识', label_en: 'Consciousness', field: '心灵哲学' },
  { id: 'will', label: '意志', label_en: 'Will', field: '心灵哲学' },
];

export const CONCEPT_RELATIONS: ConceptRelation[] = [
  // 形而上学内部
  { source: 'existence', target: 'nothingness', type: 'opposes', description: '存在与虚无的对立' },
  { source: 'existence', target: 'being', type: 'related', description: '存在是本体论的基本问题' },
  { source: 'being', target: 'essence', type: 'related', description: '本体与本质的区分（存在先于本质）' },
  { source: 'substance', target: 'essence', type: 'extends', description: '实体承载本质属性' },
  { source: 'necessity', target: 'contingency', type: 'opposes', description: '必然与偶然的对立' },
  { source: 'causality', target: 'necessity', type: 'related', description: '因果关系与必然性' },
  { source: 'existence', target: 'essence', type: 'related', description: '存在主义的核心问题' },

  // 认识论内部
  { source: 'knowledge', target: 'belief', type: 'requires', description: '知识需要信念作为基础' },
  { source: 'knowledge', target: 'justification', type: 'requires', description: '知识需要证成（JTB理论）' },
  { source: 'knowledge', target: 'truth', type: 'requires', description: '知识必须为真' },
  { source: 'skepticism', target: 'knowledge', type: 'opposes', description: '怀疑论质疑知识的可能性' },
  { source: 'reason', target: 'knowledge', type: 'extends', description: '理性是获取知识的途径' },
  { source: 'truth', target: 'belief', type: 'related', description: '真理与信念的关系' },

  // 伦理学内部
  { source: 'virtue', target: 'happiness', type: 'related', description: '德性与幸福（亚里士多德）' },
  { source: 'duty', target: 'freedom', type: 'related', description: '义务与自由意志' },
  { source: 'justice', target: 'equality', type: 'requires', description: '正义要求平等' },
  { source: 'good-evil', target: 'virtue', type: 'related', description: '善恶与德性的关系' },
  { source: 'responsibility', target: 'freedom', type: 'requires', description: '责任以自由为前提' },
  { source: 'duty', target: 'good-evil', type: 'related', description: '义务论的道德判断' },

  // 美学内部
  { source: 'beauty', target: 'sublime', type: 'related', description: '美与崇高的审美范畴' },
  { source: 'taste', target: 'beauty', type: 'requires', description: '趣味判断美的能力' },
  { source: 'art', target: 'beauty', type: 'extends', description: '艺术追求美的表达' },
  { source: 'art', target: 'sublime', type: 'related', description: '艺术中的崇高体验' },

  // 政治哲学内部
  { source: 'social-contract', target: 'state', type: 'extends', description: '社会契约论解释国家起源' },
  { source: 'rights', target: 'freedom', type: 'requires', description: '权利保障自由' },
  { source: 'democracy', target: 'equality', type: 'requires', description: '民主以平等为基础' },
  { source: 'state', target: 'justice', type: 'related', description: '国家与正义的关系' },
  { source: 'democracy', target: 'rights', type: 'related', description: '民主制度保障权利' },

  // 逻辑学内部
  { source: 'logic', target: 'reason', type: 'extends', description: '逻辑是理性的工具' },
  { source: 'dialectic', target: 'logic', type: 'extends', description: '辩证法是逻辑的动态形式' },
  { source: 'paradox', target: 'logic', type: 'opposes', description: '悖论挑战逻辑系统' },
  { source: 'syllogism', target: 'logic', type: 'extends', description: '三段论是经典逻辑推理形式' },
  { source: 'dialectic', target: 'paradox', type: 'related', description: '辩证法通过矛盾推动思想' },

  // 语言哲学内部
  { source: 'meaning', target: 'reference', type: 'related', description: '意义与指称的关系' },
  { source: 'language', target: 'meaning', type: 'requires', description: '语言承载意义' },
  { source: 'language', target: 'truth', type: 'related', description: '语言表达真理命题' },
  { source: 'reference', target: 'existence', type: 'related', description: '指称与存在的本体论承诺' },

  // 心灵哲学内部
  { source: 'consciousness', target: 'mind', type: 'extends', description: '意识是心灵的核心特征' },
  { source: 'will', target: 'freedom', type: 'related', description: '意志与自由意志' },
  { source: 'mind', target: 'consciousness', type: 'related', description: '心灵哲学的核心问题' },

  // 跨领域关系
  { source: 'reason', target: 'truth', type: 'requires', description: '理性追求真理' },
  { source: 'freedom', target: 'responsibility', type: 'related', description: '萨特：自由与责任' },
  { source: 'justice', target: 'rights', type: 'related', description: '正义保障权利' },
  { source: 'knowledge', target: 'existence', type: 'related', description: '知识论与本体论的关联' },
  { source: 'beauty', target: 'truth', type: 'related', description: '美与真的统一（柏拉图）' },
  { source: 'virtue', target: 'knowledge', type: 'related', description: '苏格拉底：德性即知识' },
  { source: 'will', target: 'duty', type: 'related', description: '意志与道德义务（康德）' },
  { source: 'dialectic', target: 'existence', type: 'related', description: '辩证法与存在论（黑格尔）' },
  { source: 'consciousness', target: 'knowledge', type: 'related', description: '意识与认知的关系' },
  { source: 'art', target: 'meaning', type: 'related', description: '艺术与意义的表达' },
  { source: 'logic', target: 'language', type: 'related', description: '逻辑与语言分析' },
  { source: 'paradox', target: 'skepticism', type: 'related', description: '悖论引发怀疑' },
  { source: 'social-contract', target: 'freedom', type: 'related', description: '社会契约与自由的让渡' },
  { source: 'state', target: 'democracy', type: 'related', description: '国家治理形式' },
];
