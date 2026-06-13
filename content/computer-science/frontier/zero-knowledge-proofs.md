---
title: 零知识证明与隐私计算
title_en: Zero-Knowledge Proofs and Privacy-Preserving Computation
status: published
updated: 2026-06-13
category: 密码学
horizon: 2020s
order: 5
tags:
  - 零知识证明
  - zk-SNARK
  - 隐私计算
  - 区块链
  - 密码学
researchers:
  - Shafi Goldwasser（MIT / Weizmann，零知识证明奠基人）
  - Silvio Micali（MIT，零知识证明奠基人）
  - Eli Ben-Sasson（Technion，StarkWare 联合创始人）
  - Jens Groth（伦敦大学学院，Groth16 算法）
institutions:
  - MIT CSAIL
  - Ethereum 基金会
  - StarkWare
  - Aztec Network
  - Zcash 基金会
related:
  - public-key-rsa
  - formal-verification
---

# 零知识证明与隐私计算

想象这样一个场景：你想向一家医院证明你没有某种遗传性疾病，但不想透露你的基因数据。你想向银行证明你的信用分足以申请贷款，但不想暴露你的财务明细。你想证明你年满 18 岁，但不想给对方看你的身份证。

在传统密码学框架里，这些场景都难以实现——你要么提供完整数据，要么对方无法验证你的声明。

**零知识证明（Zero-Knowledge Proof, ZKP）**在密码学上打破了这个两难：可以证明一个命题为真，而不泄露任何使命题为真的**理由或数据**。这听起来像魔法，但是有严格数学基础的密码学原语。

## 破除误解：零知识不是"匿名"

零知识证明常常与"匿名"混为一谈。实际上，这两个概念不同：

匿名指**隐藏身份**（谁做了这件事）；零知识证明指**证明某件事为真而不泄露证明的内容**（这件事为什么是真的）。

例如：在一个 ZKP 交易系统里，你可以证明"我有足够的余额，且我没有双重花费"，但不暴露具体余额和交易金额——这不一定让你匿名（身份可能仍然可知），但保护了财务隐私。

## 数学基础：交互式证明与三个性质

零知识证明（最初称为"交互式证明系统"）由 Shafi Goldwasser、Silvio Micali 和 Charles Rackoff 在 1985 年的论文中定义，三人后来因此获得图灵奖（Goldwasser 和 Micali，2012 年）。

一个合法的零知识证明系统需要满足三个性质：

1. **完备性（Completeness）**：如果命题为真，诚实的证明者能让诚实的验证者相信。

2. **可靠性（Soundness）**：如果命题为假，任何欺骗性的证明者都无法让验证者相信（除非以极小概率成功）。

3. **零知识性（Zero-Knowledge）**：验证者除了"命题为真"之外，学不到任何其他信息。形式化地说：验证者的视图（接收到的消息）可以在不知道证明的情况下被模拟出来。

经典例子（阿里巴巴的洞穴）：一个圆形洞穴，中间有一扇只有知道密码才能打开的门。证明者（P）进洞，验证者（V）在外面喊"从哪条路出来"，P 每次都能正确出现——这证明 P 知道密码，但 V 完全不知道密码是什么。

## 非交互式零知识：zk-SNARK

原始的零知识证明是**交互式**的——需要证明者和验证者来回通信。这在区块链等需要"任何人可在任何时候验证"的场景下不实用。

**非交互式零知识（Non-Interactive Zero-Knowledge, NIZK）**解决了这个问题：证明者产生一个可以**单独被任何人独立验证**的证明字符串，不需要和验证者交互。

**zk-SNARK**（Zero-Knowledge Succinct Non-Interactive ARgument of Knowledge）是最广泛使用的 NIZK 方案族：

- **零知识（Zero-Knowledge）**：验证者学不到任何额外信息
- **简洁（Succinct）**：证明大小极小（几百字节到几 KB），验证时间短（毫秒级），与被证明计算的规模无关
- **非交互式**：一次性产生，可公开验证
- **知识论证（ARgument of Knowledge）**：证明者真正拥有某个"见证"（witness），不只是命题为真

Groth16（Jens Groth, 2016）是最常用的 zk-SNARK 构造，提供极小的证明大小（约 200 字节）和快速验证，但需要一个"可信设置"（Trusted Setup）——一次性仪式生成公共参数，若参与者中有任何人保留了"毒素"（toxic waste），可以伪造证明。

**zk-STARK**（Scalable Transparent ARgument of Knowledge，Ben-Sasson 等, 2018）不需要可信设置，基于哈希函数，理论上可抗量子，但证明大小更大（几十到几百 KB）。

## 谁在做，做到了哪一步

### 区块链与隐私交易

**Zcash**（2016 年）：最早大规模部署 zk-SNARK 的加密货币，用零知识证明隐藏交易金额和地址，同时保证交易合法性（没有凭空创造代币）。Zcash 的 Sapling 升级（2018）大幅提升了证明生成速度。

**以太坊 ZK rollup**（2022-2025）：以太坊区块链的可扩展性方案。把大量交易的计算移出以太坊主链，只把一个 zk-SNARK 证明发到链上——验证者通过验证这个证明，确认所有链下计算正确执行，而无需重做每一笔交易。

代表项目：StarkWare（使用 zk-STARK + Cairo 语言）、zkSync（使用 PLONK 方案）、Polygon zkEVM（兼容以太坊 EVM 的零知识虚拟机）。

以太坊 ZK rollup 在 2023-2025 年成为实际使用的基础设施，处理大量交易，每笔交易的 gas 费比直接在以太坊主链上低数倍到数十倍。

### 身份与隐私合规

**Semaphore / Proof of Humanity**：在不暴露身份的情况下，用 ZKP 证明"我是一个唯一的真实人类"，防止机器人和重复身份。

**EU EUDI Wallet**（欧盟数字身份钱包框架）正在探索选择性披露（Selective Disclosure）技术，允许用户只证明特定属性（如年龄 > 18），而不出示完整身份证件。

| 技术路线     | 代表方案      | 证明大小      | 可信设置        | 抗量子 |
| ------------ | ------------- | ------------- | --------------- | ------ |
| Groth16      | Zcash Sapling | ~200 字节     | 需要            | 否     |
| PLONK        | zkSync        | ~400-600 字节 | 通用设置（URS） | 否     |
| zk-STARK     | StarkNet      | ~几十-几百 KB | 不需要          | 是     |
| Bulletproofs | Monero        | 较大          | 不需要          | 否     |

## 全同态加密：计算不可见的数据

零知识证明的"堂兄"是**全同态加密（Fully Homomorphic Encryption, FHE）**：在不解密数据的情况下，在密文上直接进行任意计算，结果解密后等于对明文计算的结果。

FHE 由 Craig Gentry 在 2009 年首次实现（基于格密码学）。当时的实现速度极慢（对简单操作需要数秒），被称为"密码学的圣杯，但尚不实用"。

2023-2025 年，硬件加速（GPU、专用 ASIC）和算法改进（如 TFHE、CKKS 方案的优化），让 FHE 性能提升了数个数量级：简单神经网络推理可以在加密数据上在秒级完成。

Zama（法国初创公司）在 2024 年发布了 fhevm——支持在 FHE 下运行以太坊智能合约。IBM Research、Microsoft SEAL 等也有活跃的 FHE 工具链。FHE 仍比明文计算慢数个数量级，但对某些隐私关键场景（医疗数据分析、金融合规审计）已经接近实用。

## 代价与争议

**证明生成速度**：生成 zk-SNARK 证明的计算量远大于直接运行被证明的计算。对复杂计算（如完整的 EVM 执行），生成证明可能需要数分钟到数小时。专用硬件（证明加速器 ASIC）和并行化是主要优化方向。

**可信设置的风险**：Groth16 等方案的可信设置如果遭到破坏，可以无声地伪造任意证明。各项目通过"多方计算仪式"（MPC Ceremony）降低风险，但无法从根本上消除。

**审计难度**：ZKP 系统的正确性依赖底层密码学方案和实现代码同时没有 bug。以太坊 ZK rollup 的证明电路极为复杂，已发现的安全漏洞表明这是一个高风险领域。

**量子计算威胁**：基于椭圆曲线的 zk-SNARK（如 Groth16）对量子计算机不安全。Shor 算法破解椭圆曲线离散对数，可以还原零知识证明的"见证"。zk-STARK（基于哈希）被认为抗量子，但证明更大。

## 未知的边界

- FHE 的计算开销是否能降低到足以在端侧（手机、边缘设备）实用？
- ZKP 系统的形式化验证（见[[formal-verification]]条目）是否能覆盖实际部署的 ZK 电路？
- 隐私与监管合规之间的张力如何解决？ZKP 可以向监管者证明合规性，而不暴露数据——这是否足够满足监管需求，各国立场不一。
- 量子计算机成熟后，当前基于椭圆曲线的 ZKP 方案将需要迁移到格密码学或哈希基础方案——迁移路径和时间线尚不明确。

## 跨域连接

- **[[public-key-rsa]]**：ZKP 和公钥密码学都是现代密码学的核心原语，共享椭圆曲线密码学的数学基础，也共同面临量子计算的威胁。
- **[[formal-verification]]**：ZKP 系统的安全性极度依赖实现正确性，形式化验证 ZK 电路是活跃研究领域。
- **博弈论**：ZKP 的核心性质（可靠性）可以从博弈论角度理解：欺骗性证明者在计算意义上无法"赢得"验证游戏。
- **哲学**：零知识证明是"知识（knowledge）"这个概念在数学上的精确化——一个实体"知道"某件事，当且仅当它能高效生成关于这件事的证明。

---

## 延伸阅读

- Goldwasser, S., Micali, S. & Rackoff, C. _The Knowledge Complexity of Interactive Proof Systems._ SIAM J. Comput. 18(1), 1989. （零知识证明的奠基论文）
- Groth, J. _On the Size of Pairing-Based Non-interactive Arguments._ Eurocrypt 2016. （Groth16 算法）
- Ben-Sasson, E. et al. _Scalable, Transparent, and Post-Quantum Secure Computational Integrity._ IACR ePrint 2018/046. （zk-STARK 论文）
- Gentry, C. _A Fully Homomorphic Encryption Scheme._ 博士论文，Stanford University, 2009.
- Boneh, D. et al. _A Graduate Course in Applied Cryptography._ 第20章（零知识证明）. crypto.stanford.edu. （免费在线）
