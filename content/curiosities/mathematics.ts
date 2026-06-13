import type { Curiosity } from "@/lib/curiosities";

export const MATHEMATICS_CURIOSITIES: Curiosity[] = [
  {
    id: "shuffled-deck-unique",
    title: "你洗好的这副牌，几乎可以肯定是宇宙历史上第一次出现的顺序",
    detail:
      "一副 52 张牌的排列数是 52!，约 8×10^67——比可观测宇宙的恒星数还多得多。即便全人类不停地洗牌至今，也只覆盖了其中微不足道的一角。",
    source: "52! ≈ 8.07×10^67",
    tags: ["排列", "大数"],
    url: "/mathematics",
  },
  {
    id: "birthday-paradox",
    title: "只要 23 个人，就有超过一半的概率两人同一天生日",
    detail:
      "直觉以为需要上百人，但要比较的是「任意两人」的配对（23 人有 253 对）。到 70 人时同生日的概率已超过 99.9%。这就是「生日悖论」。",
    tags: ["概率", "悖论"],
    url: "/mathematics/paradoxes",
  },
  {
    id: "point-nine-recurring",
    title: "0.999… 不是「约等于」1，而是严格等于 1",
    detail:
      "它们是同一个实数的两种写法。一个简单证明：1/3 = 0.333…，两边乘 3，得 1 = 0.999…。这常让人不适，却是实数构造的必然结果。",
    tags: ["实数", "极限"],
    url: "/mathematics/concepts",
  },
  {
    id: "cantor-infinity-sizes",
    title: "无穷大也有大小之分——实数的无穷大「比」整数的无穷大大得多",
    detail:
      "康托尔 1891 年用「对角线论证」证明：无论你如何把实数列成一张无穷长的表，总能构造出一个不在表上的实数。整数是「可数无穷」，实数是「不可数无穷」，两者之间存在无法逾越的鸿沟。",
    source: "Cantor's diagonal argument (1891)",
    tags: ["无穷", "集合论", "康托尔"],
    url: "/mathematics",
  },
  {
    id: "banach-tarski-paradox",
    title: "在数学上，一个球可以被拆成两个与原来一样大的球",
    detail:
      "巴拿赫-塔斯基悖论（1924）证明：只用「旋转和平移」这两种刚性操作，就能将一个实心球分解再重组成两个原大小的球。关键在于分解出的「零件」根本没有体积（不可测集），物理上无法实现，但逻辑上无懈可击。",
    source: "Banach & Tarski (1924)",
    tags: ["悖论", "集合论", "选择公理"],
    url: "/mathematics",
  },
  {
    id: "ramanujan-taxicab-1729",
    title: "病床上的天才随口说出一个「无聊」的出租车号，背后藏着深刻的数论",
    detail:
      "1918 年，哈代乘出租车 1729 号探望病中的拉马努金，说这个号码「毫无趣味」。拉马努金立刻回答：1729 是能以两种不同方式写成两个正整数立方之和（1³+12³，9³+10³）的最小正整数。如今这个数被称为「哈代-拉马努金数」。",
    source: "Hardy-Ramanujan Number, 1729",
    tags: ["数论", "拉马努金"],
    url: "/mathematics",
  },
  {
    id: "four-color-theorem-computer",
    title: "世界上第一个「人类无法独立验证」的数学证明，是用计算机完成的",
    detail:
      "1976 年，阿佩尔与哈肯证明四色定理时，将问题归结为 1936 种构型，逐一由计算机检验，耗时超过千小时。这是数学史上第一个无法靠人工逐步检查来验证的证明，引发了「计算机辅助证明是否算真正的证明」的哲学争论。",
    source: "Appel & Haken (1976)",
    tags: ["图论", "四色定理", "计算机辅助"],
    url: "/mathematics",
  },
  {
    id: "euler-identity",
    title: "e^(iπ) + 1 = 0：五个最重要的数学常数，竟然藏在一个等式里",
    detail:
      "欧拉恒等式把 e（自然对数底）、i（虚数单位）、π（圆周率）、1 和 0 联系在同一个等式中。1988 年《数学智林》读者票选，它被评为数学史上最美的公式。",
    source: "Euler's identity: e^(iπ) + 1 = 0",
    tags: ["欧拉", "复数", "π"],
    url: "/mathematics",
  },
  {
    id: "weierstrass-function",
    title: "一条处处连续却处处不可微的曲线——数学家曾以为这不可能存在",
    detail:
      "19 世纪大多数数学家认为，连续曲线总该「在某些点上」有切线。1872 年魏尔斯特拉斯给出反例：他构造的函数在每一点都连续，却在每一点都没有导数，图像像一个无限自相似的分形。这彻底震惊了当时的数学界。",
    source: "Weierstrass (1872)",
    tags: ["实分析", "分形", "连续性"],
    url: "/mathematics",
  },
  {
    id: "hilbert-hotel-paradox",
    title: "一家住满客人的无穷大酒店，仍然可以再容纳无穷多新客",
    detail:
      "希尔伯特旅馆有无穷多个房间，全部住满。新来一位客人：只需让每位住客从 n 号房搬到 n+1 号房，1 号房就空出来了。若来了无穷多位新客，让现有客人搬到偶数号房，奇数号房全部空出——无穷集合的算术完全不同于有限集合。",
    source: "Hilbert (1924–1925 lecture)",
    tags: ["无穷", "集合论", "悖论"],
    url: "/mathematics",
  },
  {
    id: "gabriels-horn-painters-paradox",
    title: "有一个形状，可以被油漆填满，却永远无法被油漆涂满它的表面",
    detail:
      "将 y = 1/x（x ≥ 1）的图像绕 x 轴旋转，得到「加百列号角」。它的体积恰好等于 π（有限），但表面积却是无穷大。这意味着你可以往里面灌入有限量的油漆填满它，却没有足够的油漆涂满它的外表面——这就是「画家悖论」。",
    source: "Torricelli, 17th century; calculus verification",
    tags: ["微积分", "无穷", "悖论"],
    url: "/mathematics",
  },
  {
    id: "goldbach-conjecture-unproven",
    title: "每个大于 2 的偶数都是两个质数之和——这句话提出近 280 年，至今无人证明",
    detail:
      "1742 年哥德巴赫在给欧拉的信中提出此猜想。计算机已验证它对所有小于 4×10^18 的偶数成立，但普遍证明至今是数学最著名的未解难题之一。",
    source: "Goldbach letter to Euler (1742); verified to 4×10^18",
    tags: ["数论", "质数", "未解问题"],
    url: "/mathematics",
  },
  {
    id: "pigeonhole-principle-power",
    title: "伦敦必有两人头发根数完全相同——靠的是鸽巢原理",
    detail:
      "人类头发数量上限约 20 万根，而伦敦人口超过 900 万。把「人」塞进「头发数量」这个「巢」，必有至少一个数值被多人共享。这个由狄利克雷 1834 年系统阐述的原理，是组合数学最强有力的武器之一。",
    source: "Dirichlet's box principle (1834)",
    tags: ["组合数学", "鸽巢原理"],
    url: "/mathematics",
  },
  {
    id: "pi-transcendental",
    title: "直到 1882 年，人类才终于证明「化圆为方」在逻辑上是不可能的",
    detail:
      "林德曼 1882 年证明 π 是超越数——不是任何有理系数多项式的根。这直接推翻了古希腊「仅用圆规直尺作出与给定圆等面积的正方形」的千年梦想，证明此任务在逻辑上永远无法完成。",
    source: "Lindemann (1882)",
    tags: ["π", "超越数", "几何"],
    url: "/mathematics",
  },
  {
    id: "collatz-conjecture",
    title: "一个小学生能理解的数列规则，难倒了全世界所有数学家",
    detail:
      "柯拉兹猜想：取任意正整数，若为偶数除以 2，若为奇数乘 3 加 1，不断重复，最终总会到达 1。计算机已验证到 2.36×10^21，从未例外，但没有人能证明它对所有正整数成立。数学家保罗·爱多士曾说：「数学还没准备好面对这类问题。」",
    source: "Collatz conjecture; verified to 2.36×10^21",
    tags: ["数论", "未解问题", "序列"],
    url: "/mathematics",
  },
  {
    id: "benford-law",
    title: "在真实数据中，约 30% 的数字以「1」开头，而不是你以为的 11%",
    detail:
      "本福特定律：在大量自然产生的数据（人口、股价、河流长度……）里，首位数字是 1 的频率约为 30.1%，是 9 的频率的 6 倍多。这个规律稳健到可以用来检测财务造假——伪造数据的人往往不知道要模拟这个分布。",
    source: "Newcomb (1881); Benford (1938)",
    tags: ["统计", "概率", "数据科学"],
    url: "/mathematics",
  },
  {
    id: "monty-hall-problem",
    title: "你选了一扇门，主持人打开另一扇空门——换门，你的胜率会从 1/3 变成 2/3",
    detail:
      "蒙提·霍尔问题：三扇门背后一辆车、两只羊。你选一扇后，知情主持人打开一扇羊门。此时换门获奖概率是 2/3，不换仅 1/3。这个结论 1990 年发表后，数千读者（含数学博士）写信怒斥答案错误，但电脑模拟一遍遍证明它是对的。",
    source: "Selvin (1975); vos Savant (1990)",
    tags: ["概率", "悖论", "博弈论"],
    url: "/mathematics/paradoxes",
  },
  {
    id: "godel-incompleteness",
    title: "任何足够强的数学系统，都包含既无法证明也无法证伪的命题",
    detail:
      "1931 年，25 岁的哥德尔证明了不完备性定理：在包含基本算术的一致公理系统中，必然存在「系统内无法判断真假」的命题。这粉碎了希尔伯特「把全部数学建立在完备公理体系上」的梦想，是 20 世纪最深刻的逻辑发现。",
    source: "Gödel (1931)",
    tags: ["逻辑", "公理系统", "哥德尔"],
    url: "/mathematics",
  },
];
