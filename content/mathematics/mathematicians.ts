import type { Mathematician } from "./types";

export const MATHEMATICIANS: Mathematician[] = [
  {
    id: "thales",
    name: { zh: "泰勒斯", en: "Thales of Miletus" },
    era: "ancient",
    years: "约前624 – 前546",
    fields: ["几何学", "天文学"],
    contribution:
      "第一个用逻辑推理而非经验观察来证明数学命题的人，被誉为"数学之父"。证明了圆被直径平分、等腰三角形底角相等、对顶角相等等基本定理。预测了前585年的日食，开创了用数学方法研究自然的先河。",
    famousWork: "泰勒斯定理（半圆上的圆周角为直角）",
    quote: "万物的本原是水。",
  },
  {
    id: "pythagoras",
    name: { zh: "毕达哥拉斯", en: "Pythagoras" },
    era: "ancient",
    years: "约前570 – 前495",
    fields: ["数论", "几何学", "音乐数学"],
    contribution:
      "发现勾股定理（毕达哥拉斯定理），提出"万物皆数"的哲学思想。发现音乐和声与整数比的关系。建立了毕达哥拉斯学派，将数学视为一种精神追求。",
    famousWork: "毕达哥拉斯定理",
    quote: "万物皆数。",
  },
  {
    id: "zeno",
    name: { zh: "芝诺", en: "Zeno of Elea" },
    era: "ancient",
    years: "约前490 – 前430",
    fields: ["逻辑学", "无穷"],
    contribution:
      "提出了著名的芝诺悖论（阿基里斯追龟、飞矢不动、二分法、运动场），揭示了无穷小和连续性的深刻问题。这些悖论困扰了数学家两千多年，直到19世纪柯西和魏尔斯特拉斯建立严格的极限理论才得到解决。",
    famousWork: "芝诺悖论",
  },
  {
    id: "euclid",
    name: { zh: "欧几里得", en: "Euclid" },
    era: "ancient",
    years: "约前325 – 前265",
    fields: ["几何学", "数论"],
    contribution:
      "编写《几何原本》，建立了公理化演绎体系的典范。从五条公设出发，推导出465个命题，影响数学思维两千余年。《几何原本》是历史上仅次于《圣经》的印刷量最大的书籍。他的公理化方法成为所有科学理论构建的模板，从牛顿的《原理》到爱因斯坦的相对论都沿用了这一范式。",
    famousWork: "《几何原本》Elements",
    quote: "在几何学中没有专为国王铺设的大道。",
    keyDiscoveries: [
      "欧几里得算法（求最大公约数的辗转相除法）",
      "素数无穷多的证明",
      "五条几何公设的系统化",
      "完全数与梅森素数的早期研究",
    ],
    personalStory:
      "据说托勒密一世曾问欧几里得学习几何是否有捷径，欧几里得回答"在几何学中没有专为国王铺设的大道"。还有一位学生学完第一命题后问"学几何有什么好处"，欧几里得命令奴隶给他三个硬币，"因为他必须从学习中获得好处"。",
  },
  {
    id: "archimedes",
    name: { zh: "阿基米德", en: "Archimedes" },
    era: "ancient",
    years: "约前287 – 前212",
    fields: ["几何学", "力学", "计算数学"],
    contribution:
      "用穷竭法求出球体积和抛物线面积，预见了积分学的思想。发现了浮力原理和杠杆原理。他计算出球的表面积和体积公式，用内接和外切正96边形逼近π的值到小数点后两位。他发明的阿基米德螺旋泵至今仍在使用，其军事发明（抛石机、聚光镜）帮助叙拉古抵御罗马军队长达三年。",
    famousWork: "《论球与圆柱》《抛物线求积》",
    quote: "给我一个支点，我就能撬动地球。",
    keyDiscoveries: [
      "球体积公式 V = 4/3πr³",
      "穷竭法（积分学前身）",
      "浮力原理（阿基米德原理）",
      "杠杆原理",
      "阿基米德螺旋线",
      "用正多边形逼近圆周率",
    ],
    personalStory:
      "罗马军队攻陷叙拉古时，阿基米德正在沙盘前研究几何图形。一名罗马士兵闯入，阿基米德大喊"不要碰我的圆！"，随即被士兵杀害。罗马将军马塞勒斯事先下令不得伤害阿基米德，得知其死讯后深感痛惜，为其修建了刻有球内切于圆柱图案的墓碑。",
  },
  {
    id: "apollonius",
    name: { zh: "阿波罗尼奥斯", en: "Apollonius of Perga" },
    era: "ancient",
    years: "约前262 – 前190",
    fields: ["几何学", "天文学"],
    contribution:
      "系统研究了圆锥曲线（椭圆、抛物线、双曲线），为其命名并建立了完整的理论体系。他的工作在1800年后被开普勒用于发现行星运动定律。还研究了大数的表示法（类似指数记法）。",
    famousWork: "《圆锥曲线论》Conics",
  },
  {
    id: "eratosthenes",
    name: { zh: "埃拉托色尼", en: "Eratosthenes" },
    era: "ancient",
    years: "约前276 – 前194",
    fields: ["数论", "地理学", "天文学"],
    contribution:
      "发明了埃拉托色尼筛法，是寻找素数的经典算法，至今在计算机科学中仍有应用。通过测量亚历山大城和赛伊尼（今阿斯旺）的太阳角度差异，计算出地球周长约为40000公里，与现代测量值惊人地接近。他是第一个使用"地理学"一词的人。",
    famousWork: "埃拉托色尼筛法、地球周长测量",
  },
  {
    id: "diophantus",
    name: { zh: "丢番图", en: "Diophantus" },
    era: "ancient",
    years: "约200 – 284",
    fields: ["代数学", "数论"],
    contribution:
      '被称为"代数之父"。《算术》引入了代数符号，系统研究了不定方程（丢番图方程）。费马在阅读《算术》时在页边写下了著名的费马大定理。',
    famousWork: "《算术》Arithmetica",
  },
  {
    id: "hypatia",
    name: { zh: "希帕蒂亚", en: "Hypatia of Alexandria" },
    era: "ancient",
    years: "约360 – 415",
    fields: ["几何学", "代数学", "天文学"],
    contribution:
      "历史上第一位有详细记载的女性数学家。主持亚历山大学园，教授柏拉图和亚里士多德的哲学。评注了丢番图的《算术》和阿波罗尼奥斯的《圆锥曲线论》，改进了天文观测仪器（星盘和比重计）。",
    famousWork: "《算术》评注、《圆锥曲线论》评注",
  },
  {
    id: "aryabhata",
    name: { zh: "阿耶波多", en: "Aryabhata" },
    era: "indian-golden-age",
    years: "476 – 550",
    fields: ["天文学", "三角学", "代数学"],
    contribution:
      "提出正弦概念，给出圆周率的精确近似值（3.1416），建立了印度天文学的数学基础。提出了地球自转的理论，比哥白尼早了一千年。",
    famousWork: "《阿耶波多历算书》Aryabhatiya",
  },
  {
    id: "brahmagupta",
    name: { zh: "婆罗摩笈多", en: "Brahmagupta" },
    era: "indian-golden-age",
    years: "598 – 668",
    fields: ["代数学", "数论", "天文学"],
    contribution:
      "第一个系统定义了零的运算规则（包括零与负数的运算）。建立了负数的概念和运算法则。给出了求解一般二次方程的完整方法。发现了婆罗摩笈多公式（圆内接四边形面积公式）。",
    famousWork: "《婆罗摩修正体系》Brahmasphutasiddhanta",
  },
  {
    id: "al-khwarizmi",
    name: { zh: "花拉子密", en: "Al-Khwarizmi" },
    era: "islamic-golden-age",
    years: "约780 – 850",
    fields: ["代数学", "算法", "天文学"],
    contribution:
      '编写《代数学》（Al-jabr），奠定了代数作为独立学科的基础。他的名字演变为"算法"（algorithm）一词。系统介绍了印度-阿拉伯数字系统，对欧洲数学发展影响深远。',
    famousWork: "《代数学》Al-Kitab al-Mukhtasar fi Hisab al-Jabr",
  },
  {
    id: "omar-khayyam",
    name: { zh: "奥马尔·海亚姆", en: "Omar Khayyam" },
    era: "islamic-golden-age",
    years: "1048 – 1131",
    fields: ["代数学", "几何学", "天文学"],
    contribution:
      "用几何方法系统研究了三次方程，将三次方程归类为13种类型并逐一求解。参与改革波斯历法，制定的贾拉利历比格里高利历更精确。还是一位著名诗人，《鲁拜集》流传至今。",
    famousWork: "《代数问题》Treatise on Demonstration of Problems of Algebra",
  },
  {
    id: "fibonacci",
    name: { zh: "斐波那契", en: "Fibonacci" },
    era: "renaissance",
    years: "约1170 – 1250",
    fields: ["数论", "代数学"],
    contribution:
      "将印度-阿拉伯数字系统引入欧洲。发现斐波那契数列，该数列在自然界中广泛出现。",
    famousWork: "《算盘书》Liber Abaci",
  },
  {
    id: "madhava",
    name: { zh: "马达瓦", en: "Madhava of Sangamagrama" },
    era: "indian-golden-age",
    years: "约1340 – 1425",
    fields: ["分析学", "三角学", "无穷级数"],
    contribution:
      "印度喀拉拉学派的创始人，发现了正弦、余弦和反正切函数的无穷级数展开（泰勒级数），比欧洲早了约200年。他的工作被视为微积分的先驱，但未被欧洲数学界知晓。",
    famousWork: "马达瓦-莱布尼茨级数（π/4 的无穷级数）",
  },
  {
    id: "cardano",
    name: { zh: "卡尔达诺", en: "Gerolamo Cardano" },
    era: "renaissance",
    years: "1501 – 1576",
    fields: ["代数学", "概率论"],
    contribution:
      "发表三次方程的一般解法（卡尔达诺公式），首次系统使用虚数。著有《博弈之书》，是概率论的先驱。",
    famousWork: "《大术》Ars Magna",
  },
  {
    id: "vieta",
    name: { zh: "韦达", en: "François Viète" },
    era: "renaissance",
    years: "1540 – 1603",
    fields: ["代数学", "三角学"],
    contribution:
      "引入字母符号表示未知数和已知数，奠定了现代代数符号的基础。发现韦达定理。",
    famousWork: "《分析术入门》In Artem Analyticem Isagoge",
  },
  {
    id: "napier",
    name: { zh: "纳皮尔", en: "John Napier" },
    era: "renaissance",
    years: "1550 – 1617",
    fields: ["代数学", "计算数学"],
    contribution:
      "发明对数，将乘法运算转化为加法运算，极大简化了天文和工程计算。",
    famousWork: "《奇妙的对数表》Mirifici Logarithmorum Canonis Descriptio",
  },
  {
    id: "descartes",
    name: { zh: "笛卡尔", en: "René Descartes" },
    era: "calculus-revolution",
    years: "1596 – 1650",
    fields: ["解析几何", "哲学"],
    contribution:
      "创立解析几何，将几何问题转化为代数方程。引入坐标系，为微积分的发展铺平了道路。",
    famousWork: "《几何学》La Géométrie",
    quote: "我思故我在。",
  },
  {
    id: "fermat",
    name: { zh: "费马", en: "Pierre de Fermat" },
    era: "calculus-revolution",
    years: "1601 – 1665",
    fields: ["数论", "概率论", "解析几何"],
    contribution:
      "独立于笛卡尔发展了解析几何。提出费马大定理，困扰数学家358年。与帕斯卡共同创立概率论。",
    famousWork: "费马大定理",
    quote: "我确信已发现了一种美妙的证法，可惜这里空白的地方太小，写不下。",
  },
  {
    id: "pascal",
    name: { zh: "帕斯卡", en: "Blaise Pascal" },
    era: "calculus-revolution",
    years: "1623 – 1662",
    fields: ["概率论", "射影几何", "流体力学"],
    contribution:
      "与费马通信讨论赌博问题，共同奠定了概率论的基础。发现帕斯卡三角（杨辉三角）的许多性质。建立了射影几何中的帕斯卡定理（圆锥曲线内接六边形的对边交点共线）。提出了帕斯卡原理（流体压力传递定律），发明了机械计算器。",
    famousWork: "《论算术三角形》Traité du triangle arithmétique",
    quote: "人是一棵会思想的芦苇。",
  },
  {
    id: "newton",
    name: { zh: "牛顿", en: "Isaac Newton" },
    era: "calculus-revolution",
    years: "1642 – 1727",
    fields: ["微积分", "物理学", "天文学"],
    contribution:
      "独立发明微积分（流数法），发现万有引力定律，建立经典力学体系。证明了二项式定理的一般形式，发现了牛顿法求方程近似解。《自然哲学的数学原理》用数学语言描述了宇宙的运行规律，是科学史上最伟大的著作之一。他的光学实验揭示了白光由多种颜色组成。",
    famousWork: "《自然哲学的数学原理》Principia Mathematica",
    quote: "如果我看得更远，那是因为我站在巨人的肩膀上。",
    keyDiscoveries: [
      "微积分（流数法）",
      "万有引力定律",
      "牛顿运动三定律",
      "二项式定理",
      "牛顿迭代法",
      "光的色散实验",
    ],
    personalStory:
      "1665年伦敦大瘟疫期间，剑桥大学关闭，牛顿回到家乡伍尔索普庄园隐居18个月。在这段"奇迹年"中，他发展了微积分的基本思想，发现了万有引力定律，并进行了光学实验。据说一颗苹果的坠落启发了他对引力的思考。他终身未婚，性格孤僻，与莱布尼茨就微积分发明权进行了长达数十年的激烈争论。",
  },
  {
    id: "leibniz",
    name: { zh: "莱布尼茨", en: "Gottfried Wilhelm Leibniz" },
    era: "calculus-revolution",
    years: "1646 – 1716",
    fields: ["微积分", "逻辑学", "哲学"],
    contribution:
      "独立发明微积分，创建了 dy/dx 和 ∫ 符号系统。提出二进制，预见了计算机科学。是符号逻辑的先驱。",
    famousWork: "《一种求极大值与极小值的新方法》",
    quote: "这个世界是所有可能世界中最好的。",
  },
  {
    id: "euler",
    name: { zh: "欧拉", en: "Leonhard Euler" },
    era: "rigorization",
    years: "1707 – 1783",
    fields: ["分析学", "数论", "图论", "拓扑学"],
    contribution:
      "历史上最多产的数学家，发表了约866篇论文和著作。统一了数学符号（e, i, π, Σ, f(x)），创立图论（柯尼斯堡七桥问题），推进了数论、分析学和力学。发现了欧拉公式 e^{iπ}+1=0，被誉为"最美丽的数学公式"。他在失明后仍凭惊人的记忆力和心算能力继续产出高质量的研究。",
    famousWork: "《无穷小分析引论》Introductio in analysin infinitorum",
    quote: "a^{ei} + 1 = 0",
    keyDiscoveries: [
      "欧拉公式 e^{iπ} + 1 = 0",
      "图论（柯尼斯堡七桥问题）",
      "欧拉函数 φ(n) 与数论",
      "多面体公式 V - E + F = 2",
      "自然数倒数平方和 Σ1/n² = π²/6",
      "变分法的奠基",
      "贝塔函数与伽马函数的关系",
    ],
    personalStory:
      "欧拉一生生育了13个孩子，常在孩子们的嬉闹声中进行数学研究。他在1771年完全失明后，反而以更快的速度产出论文——他惊人的记忆力使他能在头脑中完成复杂的计算。他去世时正在计算气球飞行的轨道，最后一句话是"我死了"。欧拉的论文集至今仍在整理出版，预计超过100卷。",
  },
  {
    id: "gauss",
    name: { zh: "高斯", en: "Carl Friedrich Gauss" },
    era: "rigorization",
    years: "1777 – 1855",
    fields: ["数论", "代数学", "几何学", "统计学"],
    contribution:
      '"数学之王"。证明了代数基本定理（每个复系数多项式都有复数根），发展了最小二乘法，发现了非欧几何的内在一致性（但未发表），奠定了现代数论基础。19岁时用尺规作出了正十七边形，解决了困扰数学家两千年的难题。他的《算术研究》是数论史上最重要的著作。',
    famousWork: "《算术研究》Disquisitiones Arithmeticae",
    quote: "数学是科学的女王，数论是数学的女王。",
    keyDiscoveries: [
      "代数基本定理的证明",
      "正十七边形的尺规作图",
      "最小二乘法",
      "高斯分布（正态分布）",
      "非欧几何的发现（未发表）",
      "高斯-博内定理",
      "同余理论的系统化",
    ],
    personalStory:
      "高斯出身贫寒，父亲是园丁和砌砖工。10岁时，老师出题让学生计算1到100的和，高斯几乎立刻给出了答案5050——他发现了等差数列求和公式。他的天赋引起了不伦瑞克公爵的注意，公爵资助他完成了教育。高斯是完美主义者，只发表他认为完美的结果，他的日记显示他有许多重大发现比正式发表早了几十年。",
  },
  {
    id: "cauchy",
    name: { zh: "柯西", en: "Augustin-Louis Cauchy" },
    era: "rigorization",
    years: "1789 – 1857",
    fields: ["分析学", "代数学", "力学"],
    contribution:
      "为微积分奠定了严格的极限基础。定义了连续性、导数和积分的严格概念。柯西序列是实数构造的基础。",
    famousWork: "《分析教程》Cours d'Analyse",
  },
  {
    id: "laplace",
    name: { zh: "拉普拉斯", en: "Pierre-Simon Laplace" },
    era: "rigorization",
    years: "1749 – 1827",
    fields: ["天体力学", "概率论", "分析学"],
    contribution:
      "用数学方法证明了太阳系的稳定性（排除了大部分不稳定性）。发展了概率论的数学基础，提出拉普拉斯变换。发展了位势理论和微分方程理论。他的《天体力学》五卷是18世纪数学物理的巅峰之作。",
    famousWork: "《天体力学》Mécanique Céleste、《概率的哲学导论》",
    quote: "我们可以把宇宙的现状看作是过去的结果和未来的原因。",
  },
  {
    id: "fourier",
    name: { zh: "傅里叶", en: "Joseph Fourier" },
    era: "rigorization",
    years: "1768 – 1830",
    fields: ["分析学", "数学物理"],
    contribution:
      "发现任何周期函数都可以表示为正弦和余弦函数的无穷级数（傅里叶级数）。这一发现彻底改变了数学和物理学，为信号处理、量子力学和偏微分方程理论奠定了基础。提出了热传导方程，开创了偏微分方程的系统研究。",
    famousWork: "《热的解析理论》Théorie analytique de la chaleur",
  },
  {
    id: "abel",
    name: { zh: "阿贝尔", en: "Niels Henrik Abel" },
    era: "rigorization",
    years: "1802 – 1829",
    fields: ["代数学", "分析学"],
    contribution:
      "证明了一般五次及以上代数方程不存在根式解（阿贝尔-鲁菲尼定理），彻底解决了困扰数学家三个世纪的问题。发展了椭圆函数理论，创立了阿贝尔群的概念。26岁死于贫困和肺结核，去世后两天柏林大学的聘书才寄到。",
    famousWork: "五次方程不可解的证明",
  },
  {
    id: "galois",
    name: { zh: "伽罗瓦", en: "Évariste Galois" },
    era: "rigorization",
    years: "1811 – 1832",
    fields: ["代数学", "群论"],
    contribution:
      "创立群论，用群的概念证明了五次及以上代数方程没有一般根式解。20岁死于决斗，留下了改变代数学的手稿。",
    famousWork: "伽罗瓦理论",
  },
  {
    id: "weierstrass",
    name: { zh: "魏尔斯特拉斯", en: "Karl Weierstrass" },
    era: "rigorization",
    years: "1815 – 1897",
    fields: ["分析学", "数学基础"],
    contribution:
      '"分析之父"。用 ε-δ 语言严格定义了极限、连续性和一致连续性，彻底解决了微积分的基础问题。构造了处处连续但处处不可微的函数（魏尔斯特拉斯函数），震惊了数学界。发展了幂级数展开和解析延拓理论。',
    famousWork: "魏尔斯特拉斯函数、ε-δ 极限定义",
    quote: "整数是上帝创造的，其余都是人的工作。",
  },
  {
    id: "dedekind",
    name: { zh: "戴德金", en: "Richard Dedekind" },
    era: "rigorization",
    years: "1831 – 1916",
    fields: ["数论", "代数学", "数学基础"],
    contribution:
      "用戴德金分割严格定义了实数，填补了实数理论的关键空白。定义了理想（ideal）的概念，为代数数论奠定了基础。发展了自然数的公理化定义（戴德金-皮亚诺公理）。",
    famousWork: "戴德金分割、《连续性与无理数》",
    quote: "数是人类心灵的自由创造。",
  },
  {
    id: "riemann",
    name: { zh: "黎曼", en: "Bernhard Riemann" },
    era: "rigorization",
    years: "1826 – 1866",
    fields: ["几何学", "分析学", "数论"],
    contribution:
      "创立黎曼几何，为广义相对论提供了数学框架。提出黎曼猜想——数学中最重要的未解问题。发展了复分析和流形理论。他的就职演讲《论作为几何学基础的假设》彻底改变了人们对空间的理解，引入了流形和曲率张量的概念。",
    famousWork: "《论作为几何学基础的假设》",
    keyDiscoveries: [
      "黎曼几何（弯曲空间的几何学）",
      "黎曼猜想（素数分布）",
      "黎曼积分的定义",
      "黎曼曲面",
      "黎曼映射定理",
      "n维流形的概念",
    ],
    personalStory:
      "黎曼体弱多病，一生大部分时间都在与疾病抗争。他的就职演讲原本准备了三个题目，高斯选择了最困难的一个——几何学的基础。这篇仅16页的论文开创了黎曼几何，成为爱因斯坦广义相对论的数学基础。黎曼39岁死于肺结核，黎曼猜想至今未解，被列入千禧年七大问题。",
  },
  {
    id: "poincare",
    name: { zh: "庞加莱", en: "Henri Poincaré" },
    era: "foundations-crisis",
    years: "1854 – 1912",
    fields: ["拓扑学", "天体力学", "混沌理论", "数学物理"],
    contribution:
      '"最后一位数学全才"。创立了代数拓扑学（同调论），提出了拓扑学的基本群概念。在天体力学中证明了三体问题不存在一般解析解。发现了混沌现象的早期例子（庞加莱回归定理）。独立于爱因斯坦发展了狭义相对论的部分数学框架。',
    famousWork: "《天体力学的新方法》、庞加莱猜想",
    quote: "科学是建立在事实之上的，正如房屋是用石头建造的一样。但事实的堆积不是科学，正如石头的堆积不是房屋一样。",
  },
  {
    id: "cantor",
    name: { zh: "康托尔", en: "Georg Cantor" },
    era: "rigorization",
    years: "1845 – 1918",
    fields: ["集合论", "数学基础"],
    contribution:
      "创立集合论，证明了实数比自然数"更多"（对角线论证）。提出了连续统假设。无穷有不同的大小——这是数学中最令人震惊的发现之一。他证明了代数数是可数的而实数是不可数的，揭示了无穷的层次结构。",
    famousWork: "《集合论基础》",
    quote: "数学的本质在于它的自由。",
    keyDiscoveries: [
      "对角线论证（实数不可数）",
      "超限基数（ℵ₀, ℵ₁, ...）",
      "连续统假设",
      "康托尔集（分形先驱）",
      "代数数可数性的证明",
    ],
    personalStory:
      "康托尔的集合论遭到了当时许多数学家的强烈反对，尤其是他的老师克罗内克，后者公开称他为"科学骗子"。长期的学术孤立和攻击导致康托尔反复陷入抑郁症，最终在精神病院去世。他死后，集合论被接受为数学的基础语言。连续统假设被证明在标准公理系统中既不能证明也不能反驳。",
  },
  {
    id: "hilbert",
    name: { zh: "希尔伯特", en: "David Hilbert" },
    era: "foundations-crisis",
    years: "1862 – 1943",
    fields: ["数学基础", "泛函分析", "几何学"],
    contribution:
      "提出23个数学问题，指引了20世纪数学的方向。建立了希尔伯特空间，为量子力学提供了数学框架。提出公理化纲领，试图将全部数学建立在有穷的、完备的、一致的公理系统之上。虽然哥德尔的不完备定理证明这一纲领不可能完全实现，但其思想深刻影响了数学的发展。",
    famousWork: "《几何基础》、希尔伯特23个问题",
    quote: "我们必须知道，我们终将知道。",
    keyDiscoveries: [
      "希尔伯特23个问题",
      "希尔伯特空间",
      "《几何基础》的公理化",
      "不变量理论的有限基定理",
      "形式主义数学哲学",
    ],
    personalStory:
      "1900年，希尔伯特在巴黎国际数学家大会上提出了23个未解问题，为20世纪数学研究设定了议程。这23个问题中有10个已完全解决，7个部分解决，6个未解决。据说他晚年在哥廷根散步时，有人问他"你不再做数学了吗？"他回答"我已经太老了。"但随即又说"不过，如果我年轻二十岁……"",
  },
  {
    id: "noether",
    name: { zh: "诺特", en: "Emmy Noether" },
    era: "foundations-crisis",
    years: "1882 – 1935",
    fields: ["抽象代数", "理论物理"],
    contribution:
      "抽象代数的奠基人之一。诺特定理将对称性与守恒律联系起来，是理论物理学的基石。彻底改变了环论和理想论。",
    famousWork: "诺特定理、理想论",
  },
  {
    id: "ramanujan",
    name: { zh: "拉马努金", en: "Srinivasa Ramanujan" },
    era: "foundations-crisis",
    years: "1887 – 1920",
    fields: ["数论", "无穷级数", "连分数"],
    contribution:
      "自学成才的印度天才，留下了近4000个数学公式，许多在他去世后才被证明。与哈迪合作推进了分区函数和模形式理论。",
    famousWork: "《注记笔记本》Notebooks",
    quote: "一个方程如果没有上帝的旨意，对我来说毫无意义。",
  },
  {
    id: "zermelo",
    name: { zh: "策梅洛", en: "Ernst Zermelo" },
    era: "foundations-crisis",
    years: "1871 – 1953",
    fields: ["集合论", "数理逻辑"],
    contribution:
      "建立了公理化集合论（ZFC公理系统中的Z），解决了罗素悖论等集合论悖论。证明了良序定理（每个集合都可以被良序排列），提出了选择公理。ZFC公理系统至今仍是数学的标准基础。",
    famousWork: "策梅洛公理系统、选择公理",
  },
  {
    id: "godel",
    name: { zh: "哥德尔", en: "Kurt Gödel" },
    era: "foundations-crisis",
    years: "1906 – 1978",
    fields: ["数理逻辑", "数学基础"],
    contribution:
      "证明了不完备定理：任何足够强的一致公理系统都包含不可判定命题。这一发现终结了希尔伯特的公理化纲领，是20世纪最深刻的数学结果之一。他还证明了选择公理和连续统假设与ZF公理系统的相对一致性。",
    famousWork: "《论〈数学原理〉及有关系统的形式不可判定命题》",
    keyDiscoveries: [
      "第一不完备定理（存在不可判定命题）",
      "第二不完备定理（系统不能证明自身一致性）",
      "选择公理与ZF的相对一致性证明",
      "连续统假设与ZF的相对一致性证明",
      "可构造宇宙 L",
    ],
    personalStory:
      "哥德尔是爱因斯坦在普林斯顿最好的朋友，两人经常一起散步。1948年哥德尔准备入籍美国时，在入籍考试中向法官指出美国宪法有一个逻辑漏洞，可能导致独裁。爱因斯坦不得不在旁边安抚他。哥德尔晚年患严重的偏执症，怀疑食物被人下毒，最终因绝食而死。",
  },
  {
    id: "kolmogorov",
    name: { zh: "柯尔莫哥洛夫", en: "Andrey Kolmogorov" },
    era: "foundations-crisis",
    years: "1903 – 1987",
    fields: ["概率论", "拓扑学", "动力系统", "信息论"],
    contribution:
      "建立了概率论的公理化基础（1933年《概率论基础》），使概率论从直觉走向严格。证明了柯尔莫哥洛夫复杂性理论，为信息论和算法信息论奠基。在湍流、动力系统和经典力学等领域均有重大贡献。被称为"20世纪最伟大的概率论学家"。",
    famousWork: "《概率论基础》Grundbegriffe der Wahrscheinlichkeitsrechnung",
  },
  {
    id: "turing",
    name: { zh: "图灵", en: "Alan Turing" },
    era: "foundations-crisis",
    years: "1912 – 1954",
    fields: ["计算理论", "密码学", "人工智能"],
    contribution:
      "定义了图灵机，奠定了计算理论的基础。证明了停机问题的不可判定性。在二战中破解了恩尼格玛密码，被认为缩短了战争两年。提出了图灵测试，开创了人工智能领域。他还研究了形态发生学，用数学模型解释生物体的图案形成。",
    famousWork: "《论可计算数及其在判定问题上的应用》",
    keyDiscoveries: [
      "图灵机模型",
      "停机问题的不可判定性",
      "恩尼格玛密码的破解",
      "图灵测试",
      "形态发生学的数学模型",
    ],
    personalStory:
      "图灵是二战中破解德国恩尼格玛密码的关键人物，但因保密工作，他的贡献长期不为人知。1952年他因同性恋行为被起诉，被迫接受化学阉割。1954年他被发现死于氰化物中毒，官方裁定为自杀，但也有意外中毒的说法。2013年英国女王正式赦免了图灵，2019年他的头像被印在了50英镑纸币上。",
  },
  {
    id: "von-neumann",
    name: { zh: "冯·诺伊曼", en: "John von Neumann" },
    era: "foundations-crisis",
    years: "1903 – 1957",
    fields: ["泛函分析", "博弈论", "计算机科学"],
    contribution:
      "建立了博弈论的数学基础，提出冯·诺伊曼架构，对量子力学的数学框架做出关键贡献。被称为"最后一位数学全才"。",
    famousWork: "《博弈论与经济行为》",
  },
  {
    id: "nash",
    name: { zh: "纳什", en: "John Forbes Nash Jr." },
    era: "modern",
    years: "1928 – 2015",
    fields: ["博弈论", "微分几何", "偏微分方程"],
    contribution:
      "提出了纳什均衡的概念，彻底改变了博弈论和经济学。纳什均衡描述了一种策略组合，其中每个参与者在给定其他人策略的情况下都没有单方面改变策略的动机。他还证明了纳什嵌入定理（任何黎曼流形都可以等距嵌入欧几里得空间）。1994年获得诺贝尔经济学奖。",
    famousWork: "纳什均衡、纳什嵌入定理",
  },
  {
    id: "mandelbrot",
    name: { zh: "曼德博", en: "Benoît Mandelbrot" },
    era: "modern",
    years: "1924 – 2010",
    fields: ["分形几何", "混沌理论"],
    contribution:
      '创立了分形几何学，提出了"分形"一词。发现了曼德博集合——数学中最著名的分形图案。揭示了自然界中许多看似不规则的现象（海岸线、云朵、股票价格）都具有分形结构。他的工作将几何学从光滑的理想化形状扩展到了粗糙的现实世界。',
    famousWork: "《自然界的分形几何学》The Fractal Geometry of Nature",
    quote: "云不是球体，山不是锥体，海岸线不是圆圈，树皮不是光滑的，闪电也不是沿直线传播的。",
  },
  {
    id: "wiles",
    name: { zh: "怀尔斯", en: "Andrew Wiles" },
    era: "modern",
    years: "1953 –",
    fields: ["数论", "代数几何"],
    contribution:
      "证明了费马大定理（xⁿ + yⁿ = zⁿ 当 n>2 时无正整数解），解决了困扰数学家358年的问题。他通过证明谷山-志村猜想的特殊情况，建立了椭圆曲线与模形式之间的深刻联系。这一证明被认为是20世纪数学最伟大的成就之一。",
    famousWork: "费马大定理的证明 (1995)",
  },
  {
    id: "erdos",
    name: { zh: "爱尔迪希", en: "Paul Erdős" },
    era: "modern",
    years: "1913 – 1996",
    fields: ["组合数学", "数论", "图论"],
    contribution:
      "历史上最多产的数学家之一（约1500篇论文）。开创了组合数学和概率数论的现代研究方式。以流浪式生活与全球数学家合作闻名。",
    famousWork: "爱尔迪希数",
    quote: "数学家是把咖啡变成定理的机器。",
  },
  {
    id: "grothendieck",
    name: { zh: "格罗滕迪克", en: "Alexander Grothendieck" },
    era: "modern",
    years: "1928 – 2014",
    fields: ["代数几何", "代数拓扑", "数论"],
    contribution:
      "用概形理论彻底重建了代数几何，将代数几何、数论和拓扑学统一。被认为是20世纪最伟大的数学家之一。",
    famousWork: "《代数几何基础》EGA、《代数几何讨论班》SGA",
  },
  {
    id: "perelman",
    name: { zh: "佩雷尔曼", en: "Grigori Perelman" },
    era: "modern",
    years: "1966 –",
    fields: ["几何拓扑", "微分几何"],
    contribution:
      "证明了庞加莱猜想——千禧年七大问题之一。用里奇流方法证明了三维流形的几何化猜想。拒绝了菲尔兹奖和百万美元奖金。",
    famousWork: "庞加莱猜想的证明 (2003)",
  },
  {
    id: "tao",
    name: { zh: "陶哲轩", en: "Terence Tao" },
    era: "modern",
    years: "1975 –",
    fields: ["调和分析", "偏微分方程", "组合数学", "数论"],
    contribution:
      "当代最全能的数学家之一。在调和分析、偏微分方程、组合数学和数论等领域均有重大贡献。证明了格林-陶定理（素数包含任意长等差数列）。",
    famousWork: "格林-陶定理、压缩感知",
  },
];

export function getMathematicianById(id: string): Mathematician | null {
  return MATHEMATICIANS.find((m) => m.id === id) ?? null;
}

export const MATHEMATICIAN_IDS = MATHEMATICIANS.map((m) => m.id);
