import type { Curiosity } from "@/lib/curiosities";

export const LIFE_SCIENCE_CURIOSITIES: Curiosity[] = [
  {
    id: "octopus-three-hearts",
    title: "章鱼有三颗心脏、蓝色的血，还有「分布式」的神经系统",
    detail:
      "两颗心脏给鳃供血，一颗给身体；血液用含铜的血蓝蛋白运氧，所以是蓝色的。它五亿个神经元里约三分之二分布在八条腕上——每条腕都能某种程度上「自己思考」。",
    source: "头足类生理学",
    tags: ["章鱼", "神经系统"],
    url: "/life-science/species",
  },
  {
    id: "tardigrade-survival",
    title: "水熊虫能在真空、极寒和致命辐射中存活",
    detail:
      "缓步动物（水熊虫）通过脱水进入「隐生」状态，可耐受接近绝对零度、太空真空，以及人类致死量上千倍的辐射。2007 年它们在地球轨道暴露于太空后仍能复活繁殖。",
    source: "Jönsson et al., Current Biology (2008)",
    tags: ["水熊虫", "极端生命"],
    url: "/life-science",
  },
  {
    id: "microbiome-cells",
    title: "你身上的微生物细胞数，和你自己的细胞数大致相当",
    detail:
      "曾流传「微生物是人体细胞的 10 倍」，2016 年的重新估算把比例修正为约 1.3:1——仍意味着「你」在细胞数上几乎一半是别的生物。它们影响你的免疫、消化甚至情绪。",
    source: "Sender, Fuchs & Milo, PLoS Biology (2016)",
    tags: ["微生物组"],
    url: "/life-science",
  },
  {
    id: "slime-mold-tokyo-rail",
    title: "没有大脑的黏菌，独立「设计」出了东京铁路网",
    detail:
      "2010 年，日本科学家把食物放在东京各大车站对应的位置，让黏菌（Physarum polycephalum）自由蔓延。数天后，菌丝网络的结构与实际铁路线高度吻合，连工程师耗费数年优化的冗余和效率也被「无脑」复刻。黏菌通过收缩优化管道粗细，以一种物理计算方式找到全局最优路径。",
    source: "Tero et al., Science (2010)",
    tags: ["黏菌", "生物智能", "网络优化"],
    url: "/life-science",
  },
  {
    id: "naked-mole-rat-cancer",
    title: "裸鼹鼠几乎不得癌症，寿命是同体型啮齿动物的五倍",
    detail:
      "裸鼹鼠（Heterocephalus glaber）体重不足 35 克，却能活 37 年——同体型的小鼠通常只活 3 年。它们的组织中富含超高分子量透明质酸，阻止细胞过度增殖；同时对痛觉和缺氧有极强的耐受性。科学家已将裸鼹鼠的长寿基因转入小鼠，后者寿命和健康状态均有所改善。",
    source: "Tian et al., Nature (2013); Fang et al., Nature (2024)",
    tags: ["裸鼹鼠", "抗癌", "长寿"],
    url: "/life-science",
  },
  {
    id: "mantis-shrimp-vision",
    title: "螳螂虾有 16 种光感受器，但它辨色能力可能不如人类",
    detail:
      "人类有 3 种视锥细胞，螳螂虾有多达 16 种——却不是用来「看更多颜色」的。2014 年发表于《科学》的研究发现，螳螂虾辨别相近颜色的能力反而弱于人类。它的多感受器用于超快速颜色识别，类似于扫码而非调色板比较，可能只需数毫秒就完成颜色分类。",
    source: "Thoen et al., Science (2014)",
    tags: ["螳螂虾", "视觉", "感知"],
    url: "/life-science",
  },
  {
    id: "crow-compound-tools",
    title: "新喀里多尼亚乌鸦能把多个零件拼成复合工具",
    detail:
      "2018 年，牛津大学研究者给乌鸦提供三根独立的短木棍——每根单独都够不到食物——发现乌鸦会自行把它们插接成一根足够长的复合工具。更令人惊讶的是，完全没有受过训练的乌鸦也能自发完成这一操作，这是非人类动物中极罕见的即兴制造行为。",
    source: "Auersperg et al., Scientific Reports (2018)",
    tags: ["乌鸦", "工具使用", "动物智能"],
    url: "/life-science",
  },
  {
    id: "electric-eel-860v",
    title: "电鳗能放出 860 伏高压，相当于普通插座电压的四倍",
    detail:
      "2019 年发现的新种电鳗（Electrophorus voltai）创下动物界放电纪录：860 伏。它体内约 80% 的躯干空间被三种发电器官占据，数以千计的放电细胞像电池串联一样叠加电压。低压脉冲用于探测环境，高压脉冲则可在毫秒内让猎物肌肉痉挛。",
    source: "de Santana et al., Nature Communications (2019)",
    tags: ["电鳗", "生物电", "鱼类"],
    url: "/life-science",
  },
  {
    id: "planaria-memory-headless",
    title: "扁形虫被砍掉头再生后，仍「记得」训练前学到的东西",
    detail:
      "塔夫茨大学研究者训练扁形虫（涡虫）在亮光区域进食，然后将其斩首。新头颅再生后，这些虫子重新学习同一行为的速度，比未受训练的对照组明显更快——说明「记忆」某种程度上储存在了大脑以外的身体组织中。",
    source: "Shomrat & Levin, Journal of Experimental Biology (2013)",
    tags: ["扁形虫", "记忆", "再生"],
    url: "/life-science",
  },
  {
    id: "mycorrhizal-network",
    title: "森林地下有一张真菌互联网，老树通过它向幼苗输送碳和养分",
    detail:
      "菌根真菌的菌丝把土壤中的树木根系连接成庞大网络，称为菌根网络。1997 年实验首次证实碳可以在两棵树之间经菌丝传输；后续研究发现，处于遮蔽下的幼苗确实会收到来自大树的糖分。不过，「树木主动帮助后代」的通俗描述存在争议，真菌更可能是出于自身利益而非树木的「利他意志」在调配资源。",
    source: "Simard et al., Nature (1997)",
    tags: ["菌根", "森林", "植物"],
    url: "/life-science",
  },
  {
    id: "gut-serotonin",
    title: "你体内 90% 以上的血清素，是在肠道里合成的，而非大脑",
    detail:
      "血清素通常被称为「快乐激素」，但大脑只负责合成其中不到 10%。肠道壁上的肠嗜铬细胞是最主要的血清素产地，肠道菌群的组成会直接影响肠道血清素水平，进而通过迷走神经影响大脑情绪回路。这也是「肠脑轴」研究的核心发现之一。",
    source: "Yano et al., Cell (2015)",
    tags: ["肠脑轴", "微生物组", "血清素"],
    url: "/life-science",
  },
  {
    id: "elephant-mirror-self",
    title: "大象会照镜子认出自己，还会主动检查镜中看到的身体标记",
    detail:
      "2006 年发表于《美国国家科学院院刊》的研究显示，亚洲象「Happy」在面对大镜子时反复用象鼻触摸镜子无法直视的额头上的标记——说明它认出了镜中的那头象就是自己。能通过「镜子测试」的动物极少，仅包括大型猿类、宽吻海豚、喜鹊和大象。",
    source: "Plotnik, de Waal & Reiss, PNAS (2006)",
    tags: ["大象", "自我意识", "动物认知"],
    url: "/life-science",
  },
  {
    id: "immortal-jellyfish",
    title: "一种水母在压力下可以「返老还童」，理论上能无限循环",
    detail:
      "灯塔水母（Turritopsis dohrnii）受到伤害或老化时，会将已分化的细胞逆转为最初的多能状态，退回水螅体阶段重新发育。这一过程称为「转分化」，在已知多细胞动物中仅此一例。说它「不死」仍是简化——它照样会被捕食或染病，但从理论上它没有固定的寿命上限。",
    source: "Piraino et al., Biological Bulletin (1996)",
    tags: ["水母", "不老", "转分化"],
    url: "/life-science",
  },
  {
    id: "bone-living-organ",
    title: "骨骼不是死物：它每十年几乎完全被替换一次，还会分泌激素",
    detail:
      "骨骼中的破骨细胞不断溶解旧骨，成骨细胞不断填充新骨，成年人的骨骼约每 10 年完成一次整体更新。更出人意料的是，骨细胞会分泌骨钙素（osteocalcin），作用于大脑、胰腺和肌肉，影响记忆、血糖调节和运动表现，使骨骼实际上也是一个内分泌器官。",
    source: "Karsenty & Oury, Cell Metabolism (2012)",
    tags: ["骨骼", "内分泌", "骨钙素"],
    url: "/life-science",
  },
  {
    id: "salamander-limb-regrowth",
    title: "蝾螈是已知唯一能在成体阶段再生四肢、眼睛乃至心脏部分组织的脊椎动物",
    detail:
      "成年蝾螈断肢后，断端细胞会「去分化」退回类干细胞状态，随后精确重建骨骼、肌肉、神经和血管，且新生肢体功能完全正常。研究者已找到多个关键调控基因，这被视为哺乳动物再生医学的重要参考方向。",
    source: "Tanaka, Science (2016)",
    tags: ["蝾螈", "再生", "脊椎动物"],
    url: "/life-science",
  },
  {
    id: "trees-measure-time",
    title: "植物能「感知」昼夜长短并用来决定何时开花，精确度超过大多数机械钟",
    detail:
      "植物的生理钟依赖叶片中光敏色素对红光/远红光的比例感应，区分白昼与黑夜。许多植物用连续黑暗时长（而非光照时长）判断季节，误差在分钟级别。农业上人工补光打断黑暗期，即可操控作物提前或推迟开花。",
    source: "Bünning, The Physiological Clock (1963 及后续研究)",
    tags: ["植物", "生理钟", "开花"],
    url: "/life-science",
  },
  {
    id: "shark-electroreception",
    title: "鲨鱼能感知猎物心跳产生的微弱电场，灵敏度达十亿分之一伏",
    detail:
      "鲨鱼吻部的洛伦兹尼壶腹（Ampullae of Lorenzini）是充满导电凝胶的毛孔，能探测低至 1 纳伏/厘米的电场——这相当于在 1000 公里外感知一节 AA 电池的电场。猎物肌肉收缩、心脏跳动产生的微小电信号，对鲨鱼来说清晰可辨。",
    source: "Kalmijn, Journal of Experimental Biology (1971)",
    tags: ["鲨鱼", "电感知", "感官"],
    url: "/life-science",
  },
  {
    id: "coral-spawning-synchrony",
    title: "珊瑚礁数百种珊瑚会在同一天夜晚「集体产卵」，靠的是月光而不是气味",
    detail:
      "大堡礁每年春季满月后数天，数百种珊瑚在同一夜几乎同步释放精卵束，场面壮观如水下雪景。触发信号的关键是光周期：珊瑚对月光的蓝光波段极为敏感，并通过光敏蛋白整合月相信息，确保跨越数百公里的种群在最高受精概率的时机同步繁殖。",
    source: "Vize, BioEssays (2009); Sweeney et al., Science (2011)",
    tags: ["珊瑚", "繁殖", "同步"],
    url: "/life-science",
  },
];
