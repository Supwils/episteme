export const DOMAINS = [
  {
    id: 'universe-physics' as const,
    title: '宇宙物理',
    titleEn: 'Universe & Physics',
    description:
      '从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体。跨尺度的平滑动画下钻与科学准确的位置关系。',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
    glowColor: '#6366f1',
    bgAccent: 'rgba(99, 102, 241, 0.08)',
    borderAccent: 'rgba(99, 102, 241, 0.2)',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" fill="#6366f1" opacity="0.3" />
        <circle cx="18" cy="18" r="3" fill="#8b5cf6" />
        <ellipse cx="18" cy="18" rx="16" ry="6" stroke="#6366f1" strokeWidth="1" opacity="0.5" transform="rotate(-30 18 18)" />
        <ellipse cx="18" cy="18" rx="16" ry="6" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" transform="rotate(30 18 18)" />
        <circle cx="28" cy="10" r="1.5" fill="#a78bfa" opacity="0.6" />
        <circle cx="8" cy="26" r="1" fill="#c4b5fd" opacity="0.5" />
      </svg>
    ),
    stats: '8 宇宙层 + 9 物理层',
  },
  {
    id: 'human-history' as const,
    title: '人类历史',
    titleEn: 'Human History',
    description:
      '从公元前10000年到公元2025年，覆盖全球六大洲。时间线、知识图谱、关系图谱、世界地图与128位历史人物，80+深度讲稿。',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #fbbf24 100%)',
    glowColor: '#f59e0b',
    bgAccent: 'rgba(245, 158, 11, 0.08)',
    borderAccent: 'rgba(245, 158, 11, 0.2)',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="8" y="14" width="20" height="16" rx="1" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
        <path d="M10 14V10a8 8 0 0 1 16 0v4" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
        <rect x="14" y="20" width="8" height="6" rx="1" fill="#f59e0b" opacity="0.2" />
        <circle cx="18" cy="23" r="1.5" fill="#fbbf24" opacity="0.8" />
        <line x1="6" y1="30" x2="30" y2="30" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    stats: '73+ 事件 · 128 人物 · 80+ 讲稿',
  },
  {
    id: 'philosophy' as const,
    title: '哲学思想',
    titleEn: 'Philosophy',
    description:
      '探寻存在、知识与价值的根本问题。从古希腊到当代，梳理哲学家、流派与思想的脉络。文字驱动的知识图谱。',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #34d399 100%)',
    glowColor: '#10b981',
    bgAccent: 'rgba(16, 185, 129, 0.08)',
    borderAccent: 'rgba(16, 185, 129, 0.2)',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="8" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
        <path d="M12 22c0 4 2.5 8 6 10 3.5-2 6-6 6-10" stroke="#059669" strokeWidth="1.5" opacity="0.5" />
        <circle cx="18" cy="14" r="3" fill="#10b981" opacity="0.3" />
        <circle cx="18" cy="14" r="1" fill="#34d399" opacity="0.8" />
        <path d="M10 10l2 2M24 10l-2 2M18 5v2" stroke="#10b981" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    stats: '35 哲学家 · 32 流派 · 111 篇文章',
  },
];

export const FEATURES = [
  { icon: '◈', title: '知识图谱', desc: '以节点与连线的方式呈现知识之间的深层关联，发现跨领域的隐性联系。' },
  { icon: '◎', title: '沉浸式探索', desc: 'WebGL 3D 场景与流畅动画，在视觉交互中理解复杂概念。' },
  { icon: '◇', title: '跨文明连接', desc: '跨越地域与时代，将不同文明的知识串联成统一的认知网络。' },
  { icon: '▣', title: '深度内容', desc: '111+ 篇深度文章与 80+ 讲稿，兼顾学术严谨与大众可读性。' },
];

export const STATS = [
  { value: 3, label: '知识领域', suffix: '' },
  { value: 150, label: '探索路线', suffix: '+' },
  { value: 111, label: '深度文章', suffix: '+' },
];
