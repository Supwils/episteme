import type { TierContent } from "./types";

const content: TierContent = {
  tier: "T7",
  name: { primary: "地球", latin: "Earth · Terra" },
  tagline: "我们站着的这颗",
  whisper: "蓝白色的薄壳，挂在百亿光年深的黑里。",
  dataCards: [
    {
      label: "赤道半径",
      latinLabel: "Equatorial radius",
      value: "6378.137 km",
      hint: "WGS84",
    },
    {
      label: "质量",
      latinLabel: "Mass",
      value: "5.972 × 10²⁴ kg",
    },
    {
      label: "表面平均温度",
      latinLabel: "Surface temperature",
      value: "+14.9 °C",
      hint: "1991–2020 NOAA",
    },
    {
      label: "公转周期",
      latinLabel: "Orbital period",
      value: "365.256 d",
    },
    {
      label: "自转周期",
      latinLabel: "Sidereal day",
      value: "23h 56m 4.1s",
    },
    {
      label: "大气主要成分",
      latinLabel: "Atmosphere",
      value: "N₂ 78% · O₂ 21%",
    },
    {
      label: "月球轨道半径",
      latinLabel: "Lunar distance",
      value: "60.3 R⊕",
      hint: "384 399 km",
    },
    {
      label: "地球年龄",
      latinLabel: "Age",
      value: "4.54 Gyr",
      hint: "±0.05",
    },
    {
      label: "内核半径",
      latinLabel: "Inner core radius",
      value: "1 221 km",
      hint: "Lehmann 1936 · 地震波",
    },
    {
      label: "大氧化事件",
      latinLabel: "Great Oxidation Event",
      value: "≈ 2.4 Gya",
      hint: "Bekker 2004 · S 同位素",
    },
    {
      label: "最近一次地磁反转",
      latinLabel: "Brunhes–Matuyama",
      value: "0.78 Mya",
      hint: "古地磁同位素年代",
    },
    {
      label: "五大灭绝最严重",
      latinLabel: "End-Permian extinction",
      value: "≈ 252 Mya",
      hint: "海洋物种损失 ~96%",
    },
    {
      label: "表面磁场强度",
      latinLabel: "Surface B-field",
      value: "25–65 μT",
      hint: "偶极矩 ≈ 7.75 × 10²² A·m²",
    },
    {
      label: "板块运动速率",
      latinLabel: "Plate velocity",
      value: "1–10 cm/yr",
      hint: "GPS/GNSS 直接测量",
    },
    {
      label: "大气 CO₂ 浓度",
      latinLabel: "Atmospheric CO₂",
      value: "≈ 425 ppm",
      hint: "2024 年均值 · Mauna Loa",
    },
    {
      label: "海洋 pH",
      latinLabel: "Ocean pH",
      value: "≈ 8.05",
      hint: "较工业化前下降 ~0.1",
    },
    {
      label: "JWST 地球级观测",
      latinLabel: "JWST Earth-analog detection",
      value: "尚未直接成像",
      hint: "JWST 优先目标为 TRAPPIST-1 等近邻系统",
    },
    {
      label: "Laschamp 地磁漂移",
      latinLabel: "Laschamp excursion",
      value: "≈ 41 kya",
      hint: "磁场强度降至 ~5% · 全球确认",
    },
    {
      label: "内核差速旋转",
      latinLabel: "Inner core differential rotation",
      value: "近年减缓",
      hint: "Yang & Song 2023 · Nature",
    },
    {
      label: "内内核半径",
      latinLabel: "Inner inner core radius",
      value: "≈ 650 km",
      hint: "Pham et al. 2024 · Nature · 各向异性差异",
    },
  ],
  narrative: [
    {
      heading: "薄到不可思议的家",
      body: [
        "地球的「可居住层」其实极薄：海洋平均深度 3.7 km，对流层顶 ~12 km。把这层和地球半径 (6378 km) 比一比，可居住带占地球半径不到 0.2%。如果地球缩到苹果大，这一层比果皮还薄。",
        "我们在这层壳里完成了所有的故事 — 一切已知生命、一切人类历史、一切「外部世界」。从这张图上看，地球不过是一颗 12 千公里直径的蓝色球，但它在所有已知宇宙物体里是独一无二的。",
        "这层壳的薄度也意味着它对外部和内部扰动都极其敏感。太阳风的轻微增强 (CME 事件) 就能引发磁暴，改变大气电离层的电子密度，干扰无线电通信和 GPS 精度。地球轨道参数的微小变化 (米兰科维奇旋回：偏心率 ~100 kyr、轴倾角 ~41 kyr、岁差 ~23 kyr 周期) 就能触发或终结冰期。内部热流 (地幔对流速度 ~cm/yr，板块运动速率 ~cm/yr) 在百万年尺度上重塑大陆布局、改变洋流格局、影响全球气候。地球的宜居性不是静态的属性，而是多尺度耦合系统的动态平衡——天文学、地质学和生物学在这个薄壳里交汇。",
      ],
    },
    {
      heading: "大气是颜色，也是护盾",
      body: [
        "你看到的「地球蓝」来自两件事：海洋反射的天空蓝，以及大气本身的 Rayleigh 散射。短波长光被空气分子优先散射，所以从外太空看地球边缘有一圈薄薄的蓝光晕 — 这就是「Earthrise」(Apollo 8, 1968) 那张照片里最打动人的一笔。",
        "大气还把我们和真空、太阳风、紫外线、流星雨隔开。臭氧层 (O₃, 25 km 处) 阻挡了 97%–99% 的 UV-B；磁层在 10 R⊕ 外把太阳风偏折掉。少了任何一个，地表都难维持复杂生命。",
        "大气的演化史比我们直觉想象的要剧烈得多。太古宙 (4.0–2.5 Gya) 的大气以 CO₂ 和 N₂ 为主，几乎没有 O₂，气压可能是今天的 10–100 倍——这可以从古土壤 (paleosol) 中 Fe²⁺/Fe³⁺ 比值和条带状铁矿 (BIF) 的全球分布推断出来。光合作用蓝藻在 ~2.7 Gya 开始释放 O₂，但最初都被海洋中的 Fe²⁺ 和地表的还原性物质「吃掉」了。直到 ~2.4 Gya，这些汇饱和后 O₂ 才在大气中积累——这就是大氧化事件 (GOE, Bekker 2004)。GOE 之后 O₂ 水平经历了多次波动：~2.3 Gya 的 Huronian 冰期可能部分由 GOE 引起的甲烷消耗触发；~0.8 Gya 的 Snowball Earth 期间 O₂ 可能降至 < 1%；寒武纪大爆发 (~0.54 Gya) 前后 O₂ 回升到 ~15% 以上，为大型动物的呼吸代谢提供了条件。今天大气 O₂ 的 21% 是生物圈和岩石圈长期共演化的产品，不是「天然」的——它需要光合作用的持续维持。",
      ],
    },
    {
      heading: "月球：被绑架的同伴",
      body: [
        "月球是太阳系里相对母体最大的卫星 (月-地质量比 1:81)。主流假说 (Giant Impact, Hartmann & Davis 1975) 是 ~45 亿年前一颗火星大小的天体 Theia 撞击原始地球，溅射出的物质重凝成月球。这能解释月球与地幔的同位素相似性，以及月球缺乏铁核的事实。",
        "月球正在以 3.8 cm/年的速度远离地球 (Lunar Laser Ranging, 1969 起)，这是潮汐摩擦在搬运角动量。如果时间足够长，月球最终会与地球的自转潮汐锁定 — 不过那要等到太阳变红巨星之后。",
        "Giant Impact 假说在 2000 年代遇到了一个挑战：Apollo 样品显示月球岩石的氧、钛、硅同位素组成与地球地幔几乎完全一致——如果 Theia 是一颗独立形成的天体，它的同位素指纹应该与地球不同。2015 年以来的解决方案包括：(1) Theia 与地球在同位素上本来就相似（共同形成于 L4/L5 拉格朗日点）；(2) 撞击后地球和月球物质在高温蒸气盘中充分混合 (Ćuk & Stewart 2012)；(3) 撞击能量足够大以至于整个地球被熔融 (Lock et al. 2018 的 synestia 模型——撞击后形成一个旋转的岩石蒸气甜甜圈，月球从中凝聚)。月球对地球的宜居性也有深远影响：它稳定了地球自转轴在 ~23.5° 附近 (Laskar et al. 1993 指出如果没有月球，轴倾角可能在 0°–85° 之间混沌摆动)，潮汐为浅海生态系提供周期性能量输入，月光影响夜行动物的行为节律。没有月球的地球，可能是一颗截然不同的星球。",
      ],
    },
    {
      heading: "我们离开过这里",
      body: [
        "1961 (Gagarin 进入轨道) — 1969 (Apollo 11 登月) — 2024 (Artemis I 测试) 之间，有 24 个人见过整个地球作为一个球体的样子。在那 600 多公里高度的近地轨道之上，看下去的视角永远把所有的国界都抹掉了。",
        "目前国际空间站 (ISS) 在 400 km 处持续有人驻守 (2000 起)。商业航天 (SpaceX Crew Dragon, Blue Origin) 把这个高度的票价拉低到 7 位数美元。我们距离「家门」越来越近，但回头看那颗蓝色球时，仍然只有一个。",
        "载人航天的下一个里程碑是重返月球。Artemis II (2026 年 4 月) 已完成自 Apollo 17 (1972) 以来首次载人绕月飞行，4 名宇航员绕月往返约 10 天；后续的 Artemis III 将在月球南极着陆，首次让女性和有色人种踏上月球。中国的嫦娥六号 (2024) 已经从月球背面带回了第一批样品，嫦娥七号 (2026) 将在南极寻找水冰。更远的目标是火星：SpaceX 的 Starship 被设计为火星运输工具，但载人火星任务至少需要 ~6 个月的单程飞行、~500 天的火星停留和辐射防护、生命维持等技术突破。Carl Sagan 在《暗淡蓝点》中把任何智慧物种面对小行星与彗星撞击的长远抉择概括为「航天，或者灭绝 (spaceflight or extinction)」——不是因为地球不好，而是因为一个只住在一颗行星上的物种，在宇宙的时间尺度上是脆弱的。",
      ],
    },
    {
      heading: "「淡蓝色圆点」",
      body: [
        "1990 年 2 月 14 日，旅行者 1 号从 60 亿公里外回望地球，拍下那张 0.12 像素大小的「淡蓝色圆点 (Pale Blue Dot)」。在那张照片里，地球是阳光散射条纹中的一颗粒尘。",
        "Carl Sagan 写下名句：「On it everyone you love, everyone you know, every human being who ever was, lived out their lives.」这是从尺度最大处俯瞰，回到本档的注脚 —— 我们整个尺度阶梯，最终终结于这粒蓝色尘埃。",
        "Pale Blue Dot 不仅是一个哲学意象——它也是一个精确的观测约束。在 Voyager 1 拍摄时，地球的角直径只有 ~0.12 像素（相机分辨率 640×640），这意味着从 ~60 亿公里外看地球，它比肉眼分辨率极限小 ~50 倍——肉眼完全看不到。这个事实有力地回击了「外星人应该能从远处看到地球上的城市灯光」的幻想——即使在最近的恒星 (4.24 ly) 处，地球也是不可分辨的点光源。SETI 的策略不是「看到」而是「听到」——电磁信号比光学信号更容易在星际距离上被探测。Pale Blue Dot 的科学遗产是双重的：它既是对人类自大的校正，也是对我们观测能力极限的提醒——我们在宇宙中既是渺小的，又是有意识的，这本身就是最大的悖论。",
      ],
    },
    {
      heading: "生物圈：唯一的样本",
      body: [
        "Drake 方程粗算银河系里通讯文明的数量从 1 到百万；Fermi 悖论问：那「他们」在哪？我们目前唯一拥有的「生命」样本就是脚下这一颗。从厌氧古菌、光合作用到大氧化事件、寒武纪大爆发、智人，这层壳里发生过自然界已知最复杂的现象。",
        "今天 (2026)：陆地森林正以 ~10⁵ km²/年的速率丢失；海洋酸化 pH 已下降 ~0.1；全球均温较 1880 年高 +1.2 °C。气候模型 (IPCC AR6) 给出 1.5°C / 2.0°C 两道阈值 —— 我们正在测试我们这层 ±20 km 的壳还能承受多少。",
        "Fermi 悖论的可能解法可以粗分为三类：(1) 外星文明不存在或极其稀少——这要求大过滤器 (Great Filter) 在我们身后（即生命起源或复杂生命的出现概率极低），或者在我们前方（即技术文明很快自我毁灭）；(2) 外星文明存在但不可探测——它们可能使用我们无法识别的通信方式，或者刻意不暴露 (Zoo Hypothesis)；(3) 时间尺度不匹配——银河系 130 亿年的历史中，技术文明可能只占极短的窗口 (~100–1000 年)，两个文明在时间和空间上同时存在的概率极低。2024 年的观测进展正在缩小搜索空间：全天天线阵列 (SKA) 将在 2030 年代把 SETI 灵敏度提高 100 倍；JWST 已经开始用透射光谱在系外行星大气中搜索生物标志气体 (O₂, O₃, CH₄ 的非平衡组合)。无论 Fermi 悖论的最终答案是什么，它的价值在于迫使我们把「地球的唯一性」从直觉变成可检验的假设。",
      ],
    },
    {
      heading: "地球内部 · 用地震波切的洋葱",
      body: [
        "地球内部我们无法直接钻达 —— 最深的科拉超深钻孔也只到 12.3 km，连地壳都没穿透。所有的内部知识都来自地震波：P 波 (纵波) 能穿过液体，S 波 (横波) 不能。Mohorovičić 1909 用 P 波折射界面发现了地壳-地幔的「莫霍面」(~35 km 下方)；Gutenberg 1914 用 S 波在 2890 km 深处消失证明那里是液态外核；Lehmann 1936 又用 P 波弱折射在 5150 km 处发现了固态内核。",
        "今天的图像更精细：内核 1 221 km 半径、温度 ~5400 K，主要是 Fe-Ni 合金；外核 2 260 km 厚，电流回路产生地磁场；地幔 2 890 km 厚，固态但在地质时间尺度上像极慢的流体，是板块运动的引擎；最外层是几十 km 的脆性岩石圈。互文 P5 凝聚态：内核虽然温度比太阳表面还高，但 300+ GPa 的巨压让铁保持固态。",
        "地磁场是地球最重要的保护层之一。它由外核中液态铁的对流运动通过自激发电机 (dynamo) 机制产生，偶极矩约 7.75 × 10²² A·m²。地磁场的极性在地质历史上多次反转——最近一次是 0.78 Mya 的 Brunhes-Matuyama 反转。反转期间磁场强度可能降至正常的 ~10%，持续数百到数千年 (Valet et al. 2012)，期间太阳风和宇宙射线对大气的轰击会增强——但化石记录显示反转并未引发大规模灭绝，说明大气和生物圈有能力承受暂时的磁场减弱。2020 年代 Swarm 卫星 (ESA) 正在高精度监测地磁场的全球变化，发现南大西洋异常区 (SAA) 的磁场强度在过去 50 年下降了 ~6%，是否预示着下一次反转尚不清楚。内核的各向异性 (P 波沿南北轴传播更快) 暗示固态铁可能存在晶体取向——这正在被地球物理学家用超高压实验和第一性原理计算逐年解密。",
      ],
    },
    {
      heading: "板块、灭绝、大氧化 · 把 45 亿年压成一段叙事",
      body: [
        "1912 年 Wegener 提出大陆漂移，被讥讽了半个世纪；1960 年代海底磁异常条带 (Vine-Matthews 1963) 证实了海底扩张，板块构造一夜之间从异端变成主流，Wilson cycle 把超大陆 ~500 Myr 一次的聚散写成可预测的节律 —— Pangaea (250 Mya) 是上一个，Amasia 可能是下一个。板块边界还驱动了五次大灭绝中的两次：二叠纪末 (252 Mya) 西伯利亚大火成岩省、白垩纪-古近纪界 (66 Mya) 撞击叠加德干 Traps。",
        "更深的故事在大气层。在 ~2.4 Gya 之前地球大气几乎没有 O₂；蓝藻光合作用慢慢积累的氧把海洋里的 Fe²⁺ 一次性氧化成 Fe₃O₄ 沉积成带状铁矿 (BIF)，再过剩的 O₂ 涌进大气 —— Bekker 2004 用硫同位素 Δ³³S 信号锁住了这次「大氧化事件 (GOE)」。氧化的大气在 0.7 Gya 又催生了 Snowball Earth，再过 1 亿多年化解出寒武纪大爆发。Anthropocene 起点 (1950s 核试验放射性峰值 vs 工业革命) 至今仍在 IUGS 表决中。",
        "板块构造本身可能是地球宜居性的关键因素。它通过火山释放 CO₂ (degassing) 和俯冲带回收碳 (subduction) 维持了一个长期碳循环，使地表温度在 45 亿年内保持在液态水的范围内——尽管太阳光度在此期间增加了 ~30% (Faint Young Sun paradox, Sagan & Mullen 1972)。没有板块构造的行星 (如火星和金星) 要么失去了大气 (火星无磁场保护)，要么失控温室化 (金星)。2025 年代的系外行星大气光谱 (JWST, ELT, HWO) 将开始在 rocky planet 大气中搜索 CO₂ 和 O₂ 的平衡组合——如果检测到，那将是板块构造在另一颗行星上运行的间接证据。地球不是唯一可能有生命的岩石行星，但板块构造 + 磁场 + 大型卫星 (月球) 的三重组合可能比我们想象的更稀缺。",
      ],
    },
    {
      heading: "地磁反转的证据与 Laschamp 漂移：磁场的不稳定性",
      body: [
        "地磁场并非恒定不变——它在地质历史上经历了数百次极性反转，每次反转期间磁场强度可降至正常的 ~10%，持续数百到数千年。最近一次完整反转是 0.78 Mya 的 Brunhes-Matuyama 反转，但更近的一次「未完成反转」(geomagnetic excursion) 是 ~41 kya 的 Laschamp 事件——磁场强度降至正常的 ~5%，磁极短暂漂移到南半球后又弹回。2021 年 Nature 发表的论文 (Cooper et al. 2021) 用新西兰和塔斯马尼亚的精确定年湖芯和泥炭芯，把 Laschamp 事件与 ~42–41 kya 的全球气候剧变 (Adams 事件) 联系起来——磁场极弱期间太阳风和宇宙射线对大气的轰击增强，可能触发了臭氧层损耗、大气环流重组、甚至导致了澳大利亚大型动物群的灭绝和尼安德特人的消亡。",
        "这个「Adams 事件」假说 (以 Douglas Adams 命名，因他写了「42」) 仍有争议，但 Laschamp 事件本身的全球记录已经被多条独立证据线确认：深海沉积芯中的 ¹⁰Be 和 ³⁶Cl 含量峰值、火山岩的古地磁方向、冰芯中的 ¹⁰Be/⁹Be 比值。2023 年的研究 (Nilsson et al. 2023) 进一步用全球古地磁数据库重建了 Laschamp 期间磁场的三维结构——它不是一个简单的偶极翻转，而是经历了四极和八极分量短暂主导的混乱阶段。今天的南大西洋异常区 (SAA) 是一个磁场强度比全球平均低 ~30% 的区域，正在缓慢扩大和分裂——Swarm 卫星 (ESA) 的监测数据显示 SAA 在过去 50 年间强度下降了 ~6%。这不一定意味着反转即将到来（SAA 可能是外核对流的局部扰动），但它提醒我们磁场保护不是永久保证。",
      ],
    },
    {
      heading: "地球深部结构的新发现：内核在减速",
      body: [
        "地球内核长期以来被认为以略快于地幔的角速度旋转 (super-rotation)，早期研究 (Song & Richards 1996) 估计差速约 1°/年。然而 2023 年 Yang & Song (Nature Geoscience) 发表了关键论文：通过分析 1960 年代到 2020 年代的重复地震波路径数据，发现内核的差速旋转在 ~2009 年左右从超旋转变为亚旋转 (sub-rotation)——即内核相对于地幔的旋转速度不仅减慢了，而且开始反向。这意味着内核大约每 ~70 年完成一次相对于地幔的振荡周期。",
        "这个发现的地表效应虽然极其微弱，但可能与地球物理观测中一些长期悬而未决的周期性信号相关：日长 (LOD) 的 ~6–7 年变化、地磁场的 ~6–7 年变化、以及地表重力场的微弱振荡。内核的差速旋转由地幔和外核的电磁耦合 (electromagnetic coupling) 和引力耦合 (gravitational coupling) 共同驱动——如果内核真的在 ~70 年周期振荡，那将对地磁场发电机模型和地幔对流模型产生深远影响。与此同时，地震层析成像 (seismic tomography) 的分辨率在 2020 年代持续提升：法国核试验和地震台阵的密集数据 (2023) 揭示了内核顶部存在 ~40–80 km 厚的各向异性过渡层，可能反映了固态铁的晶体取向变化——内核不是一块均质的铁球，而是一个有纹理、有层次的复杂结构。地球深部的最后一块拼图正在被逐年拼上。",
      ],
    },
    {
      heading: "最新发现：地球内内核与地磁场反转的新证据",
      body: [
        "2023 年 Pham & Tkalčić (Nature Communications) 在地震学界引发了一次重大震动：通过分析近十年约 200 次 6 级以上地震、追踪穿过地心多次往返反射的地震波，发现地球内核内部还存在一个「内内核 (inner inner core)」——半径约 650 km，其晶体各向异性的优先取向轴与外层内核的各向异性轴明显不同。这意味着内核不是一块均质的铁球，而是至少由两层不同晶体取向的固态铁组成。最可能的解释是：内内核形成于地球历史的更早期 (可能是 ~5 亿年前的一次地磁发电机重组事件)，其晶体在当时的热流条件下沿不同方向生长；外层内核在后续数十亿年中逐渐凝固，受到不同的应力场约束而形成了不同的取向。这一发现将内核的形成史从「单调的球体冷却」改写为「至少两个阶段的结构分化」——地球的最深处比我们想象的更复杂。",
        "地磁场反转的证据链也在 2024–2025 年间进一步加强。Bono et al. (2024, Science Advances) 用全球古地磁数据库 (PINT/QPI) 的新统计分析显示，在过去 1.6 亿年中，地磁反转的频率并非随机泊松过程——它存在约 26 Myr 的准周期性 (confidence > 95%)，与大灭绝事件和大型火成岩省 (LIP) 的喷发频率在统计上重叠。虽然因果链尚未确立，但一种假说认为：地幔柱 (mantle plume) 上升到核幔边界 (CMB) 时扰动了外核对流格局，同时触发了地磁反转和 LIP 喷发。另一个重要进展来自南极冰芯中的 ¹⁰Be 记录：Raisbeck et al. (2024) 在 ~42 kya 的 Laschamp 事件层位中检测到了 ¹⁰Be 浓度峰值，比此前估计高出 ~50%，这意味着 Laschamp 期间宇宙射线通量的增加可能比预期更大——对大气臭氧层的影响和地表生物圈的辐射暴露需要向上修正。南大西洋异常区 (SAA) 的持续扩大 (Swarm 卫星 2024 年数据显示分裂为两个中心) 仍在被密切监测：它是否代表了一次反转的前兆，还是只是外核对流的局部波动，需要至少 10–20 年的连续数据才能判断。",
      ],
    },
  ],
  sources: [
    {
      label: "NASA Earth Fact Sheet",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html",
      kind: "agency",
    },
    {
      label: "WGS 84 — World Geodetic System",
      url: "https://nsgreg.nga.mil/doc/view?i=4085",
      kind: "agency",
    },
    {
      label: "Hartmann & Davis 1975 — Giant impact origin of the Moon",
      url: "https://www.sciencedirect.com/science/article/pii/0019103575900702",
      kind: "paper",
    },
    {
      label: "NOAA Global Climate Report",
      url: "https://www.ncei.noaa.gov/access/monitoring/monthly-report/global",
      kind: "agency",
    },
    {
      label: "IPCC AR6 — Climate Change 2023 synthesis",
      url: "https://www.ipcc.ch/report/ar6/syr/",
      kind: "agency",
    },
    {
      label: "Sagan 1994 — Pale Blue Dot",
      url: "https://www.planetary.org/articles/pale-blue-dot",
      kind: "encyclopedia",
    },
    {
      label: "Bekker et al. 2004 — Dating the Great Oxidation Event",
      url: "https://www.nature.com/articles/nature02260",
      kind: "paper",
    },
    {
      label: "Vine & Matthews 1963 — Seafloor spreading magnetic anomalies",
      url: "https://www.nature.com/articles/199947a0",
      kind: "paper",
    },
    {
      label: "USGS — Earth's interior structure",
      url: "https://www.usgs.gov/special-topics/water-science-school/science/earths-interior",
      kind: "agency",
    },
    {
      label: "Laskar et al. 1993 — Chaotic obliquity of the planets",
      url: "https://www.nature.com/articles/361615a0",
      kind: "paper",
    },
    {
      label: "Valet et al. 2012 — Geomagnetic reversals and excursions",
      url: "https://arxiv.org/abs/1209.0646",
      kind: "paper",
    },
    {
      label: "Cooper et al. 2021 — Laschamp excursion and global Adams Event",
      url: "https://www.science.org/doi/10.1126/science.abb8677",
      kind: "paper",
    },
    {
      label: "Yang & Song 2023 — Inner core differential rotation reversal",
      url: "https://www.nature.com/articles/s41561-023-01143-4",
      kind: "paper",
    },
    {
      label: "Pham et al. 2024 — Earth's inner inner core (Nature)",
      url: "https://www.nature.com/articles/s41586-024-07948-2",
      kind: "paper",
    },
    {
      label: "Bono et al. 2024 — Periodicity in geomagnetic reversal frequency",
      url: "https://www.science.org/doi/10.1126/sciadv.adn5256",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "earth-surface",
      name: { primary: "地球表面", latin: "Earth Surface" },
      position: [0, 1.0, 0],
      description:
        "薄到 0.2% 半径的可居住层在这里。海洋占 71%，陆地 29%。已知生命的全部都活在这层 ±20 km 的壳里。",
      data: [
        { label: "海洋占比", value: "71%" },
        { label: "陆地占比", value: "29%" },
        { label: "已知生物多样性", value: "~870 万种" },
      ],
      color: "#a3c9ff",
      size: 0.08,
    },
    {
      id: "atmosphere",
      name: { primary: "大气层", latin: "Atmosphere" },
      position: [0, 0, 1.12],
      description:
        "78% N₂ + 21% O₂ + 1% Ar、CO₂、水蒸气等。Rayleigh 散射让短波长（蓝光）优先被散射，这就是天蓝色和地球边缘蓝光晕的成因。臭氧层 (O₃) 在 25 km 高度挡掉了 97%–99% 的 UV-B。",
      data: [
        { label: "对流层顶", value: "~12 km" },
        { label: "Kármán 线", value: "100 km" },
        { label: "外大气层", value: "~10 000 km" },
      ],
      color: "#7cbcff",
      size: 0.1,
    },
    {
      id: "geostationary",
      name: { primary: "地球同步轨道", latin: "Geostationary Orbit" },
      position: [6.6, 0, 0],
      description:
        "高度 35 786 km (6.6 R⊕)，公转周期与地球自转同步 (23h 56m)。卫星在这条轨道上对地面看起来「悬停」，是通信和气象卫星的主要驻留地。GOES / Himawari / Inmarsat 系列都在这里。",
      data: [
        { label: "半径", value: "6.6 R⊕" },
        { label: "高度", value: "35 786 km" },
        { label: "周期", value: "23h 56m 4s" },
      ],
      color: "#6ad0ff",
      size: 0.12,
    },
    {
      id: "moon",
      name: { primary: "月球", latin: "Moon · Luna" },
      // Visually compressed: real Moon orbits at 60.3 R⊕; placed at 5 R⊕
      // here for framing. The marker carries the real value.
      position: [5, 0.15, 0],
      description:
        "地球唯一的天然卫星，半径 1737 km (0.273 R⊕)，质量比 1:81。Giant Impact 起源 (Hartmann & Davis 1975)。当前以 3.8 cm/年的速度远离地球，由地月系统的潮汐摩擦驱动。本图把月距从真实的 60.3 R⊕ 压缩到 5 R⊕，方便构图；marker 数据保留真值。",
      data: [
        { label: "真实轨道半径", value: "60.3 R⊕ (384 399 km)" },
        { label: "半径", value: "0.273 R⊕" },
        { label: "起源", value: "Giant Impact" },
      ],
      color: "#e6e6f0",
      size: 0.32,
    },
    {
      id: "inner-core",
      name: { primary: "内核", latin: "Inner Core" },
      // 1221 km / 6378 km ≈ 0.191 R⊕ — embedded under the sphere surface (marker
      // floats just inside the equator so the hover halo reads above the planet).
      position: [0.0, 0.0, 0.5],
      description:
        "Lehmann 1936 用 P 波弱折射在 5150 km 深处发现了固态内核。今天的图像更精细：半径 1 221 km，温度 ~5400 K，主要是 Fe-Ni 合金；外层 2 260 km 厚的液态外核电流回路产生地磁场。虽然温度比太阳表面还高，但 300+ GPa 的巨压让铁保持固态 —— 互文 P5 凝聚态。",
      data: [
        { label: "半径", value: "1 221 km" },
        { label: "温度", value: "~5400 K" },
        { label: "压强", value: "330 – 360 GPa" },
        { label: "发现", value: "Lehmann 1936" },
      ],
      color: "#ffb066",
      size: 0.12,
    },
    {
      id: "plate-tectonics",
      name: { primary: "板块构造", latin: "Plate Tectonics" },
      // Surface, opposite hemisphere from earth-surface marker.
      position: [-0.95, 0.18, -0.25],
      description:
        "Wegener 1912 提出大陆漂移；Vine-Matthews 1963 用海底磁异常条带证实海底扩张，板块构造一夜之间从异端变成主流。Wilson cycle 把超大陆的聚散写成 ~500 Myr 节律 (Pangaea ↔ Amasia)。板块边界也驱动了五次大灭绝中的两次：二叠纪末 (252 Mya) 西伯利亚 LIP、白垩纪末 (66 Mya) 撞击叠加德干 Traps。",
      data: [
        { label: "节律", value: "Wilson cycle ~500 Myr" },
        { label: "Pangaea", value: "~250 Mya" },
        { label: "首份证据", value: "Vine-Matthews 1963" },
      ],
      color: "#c3a880",
      size: 0.085,
    },
  ],
  discussionQuestions: [
    "地球的可居住层仅占半径的 0.2%——如果地球没有月球稳定自转轴，复杂生命还能出现吗？",
    "大氧化事件把地球大气从无氧变成有氧——这对当时的厌氧生物是一场灾难。未来的「大氧化事件」会是什么？",
    "Fermi 悖论的「大过滤器」可能在我们前面（技术文明自我毁灭）或后面（生命起源极难）——你更倾向于哪种解释？",
  ],
};

export default content;
