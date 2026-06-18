# 复盘：一次 Vercel 部署翻车，我是怎么一路摸到底，顺手把整条 CI/CD 打磨到最优的

> 这是我自己的一次真实踩坑实录。从两块莫名其妙的红色报错开始，我先后怀疑错了三个"嫌疑人"，
> 挖出两道隐形关卡，最后不光把部署修好，还顺手把生产构建提速了 10 倍、把 CI/CD 焊成了
> "测试不过就别想上线"。记下来，免得下次再踩，也给同样卡住的人留个路标。
>
> 技术栈：Next.js 15.5.18 · App Router · pnpm 10 · Vercel。

---

## 一、开局：两块红色，看起来还互不相干

那天我想发个版，结果两边同时红：

- 本地 `pnpm build` 直接崩，吐一行 `HookWebpackError: _webpack.WebpackError is not a constructor`。
- Vercel 仪表盘 `Build Failed`，配一句特别敷衍的话——_"An unexpected error occurred… may be transient."_（出了个意外错误…可能是临时的。）

我第一反应大概跟你一样：**"webpack 是不是坏了？"** 毕竟报错里白纸黑字写着 webpack。

但回头看，这就是整件事我学到的第一课：**报错信息是会撒谎的。** 它指给你看的方向，往往不是案发现场。

---

## 二、我先后怀疑错了三个人

### 嫌疑人 ①：webpack 自己坏了

我追进 `node_modules/next` 里翻，发现一个"缝合怪"：`package.json` 是新版本（15.5.18），但里面
`compiled/webpack/bundle5.js` 却是去年 7 月的旧文件——一个包里塞着两个版本的零件。

后来想明白了：是之前切 pnpm 的 `node-linker=hoisted` 时，**没删旧 `node_modules` 就直接 `pnpm install`**，
新旧两套布局叠到一块了。某个模块编译失败后，Next 想把错误包装成 `WebpackError` 报出来，可那个缝合怪
webpack 偏偏没这个构造函数——于是**报错的代码自己又报了个错**，把真正的失败盖得严严实实。这种"二次错误"
最坑人。

> 修法特别朴素：`rm -rf node_modules && pnpm install`，本地 19 秒就构建过了。
> 而且我立刻意识到一件事：**Vercel 每次都是全新安装，根本不会有这种污染**——所以本地这个崩和线上那个红，
> 压根不是一回事，它俩只是恰好同时出现，把我唬了一下。

webpack，无罪。

### 嫌疑人 ②：`node-linker=hoisted` 这条配置

线上真正的报错，跟仪表盘那句敷衍话完全不同：

> _"The framework produced an invalid deployment package for a Serverless Function. Typically this means
> that the framework produces files in symlinked directories."_

symlink（符号链接）！之前一串 commit 都在跟它死磕。`node-linker=hoisted` 的本意就是把 `node_modules`
摊平、消灭符号链接。可我实测摊平之后，`node_modules` 里**一个多余的符号链接都没有**。这条配置治的是另一种病，
跟我这问题没关系。无罪。

### 嫌疑人 ③："那一堆 .func 符号链接就是元凶"

产物 `.vercel/output/functions/` 里确实有一大堆 `.func` 符号链接。但它们是 **Next.js 自己的"函数去重"**：
几千个长得一样的路由共用同一个服务端函数，Next 就让它们 symlink 指向同一份省空间——这是**标准操作**。

为了不再瞎猜，我做了个决定性实验：换个命令 `vercel deploy --prebuilt --archive=tgz`，把同一份产物
（连同那堆符号链接）打成压缩包传上去——**居然成功上线了！**

这下第三个判断也被推翻：**符号链接本身能部署、能跑。** 那到底卡在哪？

---

## 三、第一道关卡：一个藏起来的"15000"

让真相露馅的，是另一条上传路径吐的一句话：

```
files should NOT have more than 15000 items, received 17467.
Try using --archive=tgz...
```

**17467 > 15000。** 就这么简单粗暴。

原因是我把约 2300 个动态内容页**在构建期全量预渲染**了，而 App Router 给**每个**预渲染页都生成大约 6 个产物文件
（`.html`/`.rsc`/`prerender-config.json`/`prerender-fallback.html`/`.func`+`.rsc.func`），一乘就奔着两万去了，
撞穿了 Vercel 单次部署 **15000 个文件**的隐形上限。

> 打个比方：我这是出百科全书非要"开印前把每个词条都印好、装订好、堆进仓库"——词条越多，仓库越满，直到塞不下。

**修法是改成按需渲染（ISR）**：把高基数路由的 `generateStaticParams` 从"返回全部"改成"返回空"——

```ts
// 改前：构建期把每个词条都预渲染
export function generateStaticParams() {
  return kb.getSlugs().map((slug) => ({ slug }));
}
// 改后：构建期一个都不渲，首访时现渲染再缓存（dynamicParams 默认 true）
export function generateStaticParams() {
  return [];
}
```

> 换个比方：从"全部预印堆仓库"改成"**按需印刷的书店**"——货架只摆少量畅销书，其余等读者点单时现印一本、
> 再留一份在架上给下一位。仓库不爆了，而每本书读者照样买得到。

产物从 17467 砍到 7944。我以为这就完事了。**结果掉进了第二个坑。**

---

## 四、第二道关卡：真正卡死我的，是一道"安检"

文件数降下来后，我满心欢喜 push 上去——**git 构建还是红，一字不差的 symlink 报错。**

这里我踩了个特别隐蔽的坑：我之前用 `vercel deploy --prebuilt` 成功过，就以为"证明"了能部署。**错了。**

> 关键真相：**`vercel deploy --prebuilt` 会跳过 git 集成强制执行的那道"符号链接安检"。**

用海关打个比方就清楚了：

- **git 自动构建 = 红色申报通道**：海关亲手把菜做出来，还有个安检员逐件开箱，看到"装在符号链接文件夹里的东西"一律拒收。
- **`--prebuilt` = 绿色免检通道**：我说"菜我自己做好了，你别查直接上"，安检员就跳过了。
- **`--archive` = 再把成品打成一个压缩箱递进去**，顺带连"行李不超过 15000 件"那条也绕开。

我还不死心，把**全部 63 个路由都改成 ISR**，符号链接从 2422 砍到 403，再用等价 git 的路径试——**照样被拒。**
三个量级（4774 / 2422 / 403）报错一模一样。这说明它不是"数量超标"，而是**"只要有函数符号链接就拒"**。
而只要站里有多个一样的路由，Next 就必然产生去重符号链接、归不了零。

结论冷冰冰：**这道 git 安检和 Next 的函数去重天生不合，光改我的代码救不了。**（说白了，Vercel 自己造的符号链接
被 Vercel 自己的安检拒了，更像它平台侧的一个 bug。）

| 部署方式                       | 文件数校验 | 符号链接安检 | 结果    |
| ------------------------------ | ---------- | ------------ | ------- |
| git 自动构建                   | —          | **强制**     | ❌ 拒收 |
| `vercel deploy`（非 prebuilt） | —          | **强制**     | ❌ 同上 |
| `vercel deploy --prebuilt`     | 跳过       | **跳过**     | ✅ 成功 |
| `--prebuilt --archive=tgz`     | 跳过       | 跳过         | ✅ 成功 |

---

## 五、认清现实，选最干净的让步

我一开始的奢望是："git push 自动部署 + 不加 Action + 不手动敲命令"三个全都要。但只要这道安检在，这三者
**数学上不可能同时成立**，必须放弃一个。

放弃哪个代价最小？**放弃"不加 Action"。** 因为 Action 本身就是自动化，"推代码即上线"的体验一点没丢。
于是我把唯一能过的那条"绿色通道"焊成了 CI 里的一个部署步骤：

- push 到 main → 在 GitHub 的 Linux 机器上 `vercel build` → `vercel deploy --prebuilt --prod --archive=tgz`。
- `vercel.json` 里 `git.deploymentEnabled.main=false`，把 Vercel 自己那个**会红的**原生构建关掉，眼不见心不烦。
- 顺手加了个 `pnpm deploy` 脚本当应急的手动通道。

这套不是另起炉灶——它做的就是**那次唯一成功的命令，只是从"我手动敲"变成"push 后自动敲"，还搬到了正确的
Linux 环境上**。

---

## 六、意外之喜：顺手把构建提速了 10 倍

收尾时我盯上了构建速度——一次完整构建里，**光 webpack 编译就吃掉 79 秒**，是绝对大头（毕竟我这站塞了
three.js / R3F 那套 3D）。

我本来以为要提速就得切 Turbopack，而切 Turbopack 就得动 3D，甚至冒出过"干脆把 universe 的 3D 拿掉、
换成 SVG/Canvas"的念头。但我多留了个心眼，去核实那条"逼我用 webpack 的 GLSL shader 规则"——

**发现它是死代码。** 我的 shader 根本不是 `.glsl` 文件，而是写成字符串的 `.glsl.ts` TS 模块（用命名导入
`import { starPointVert }` 引进来的）。那条 `test: /\.(glsl|vert|frag)$/` 的 webpack 规则，**全仓一个文件都
匹配不到**。

也就是说：**根本不用为了 Turbopack 去动 three.js。** 我把那条死规则一删、`next build` 加上 `--turbopack`，
编译从 **79 秒掉到 7.8 秒（10 倍）**，3D 一行没改、照常转。而且 dev 和 prod 现在用的是同一个打包器，连之前
"开发 Turbopack / 生产 webpack"的双引擎不一致都一并消除了。

> 这件事的教训：**别人给的结论也要自己验。** 那条规则"看起来"是为 shader 服务的，其实早就是个摆设了。
> 也顺便想通一件事：我这站的灵魂是"把知识讲清楚、讲好看"，而 3D 正是招牌、只集中在一个领域里——
> 它既不影响部署，也不挡 Turbopack，没有任何理由为一个"已经不存在的问题"去砍掉它。

---

## 七、最后一步：让"测试不过就别想上线"

部署能自动了，但我不想把坏代码也自动推上去白烧额度。所以我把部署焊进了已有的 CI，按顺序卡死：

```
push main
  ├─ quality: typecheck · lint · 内容校验 · 测试(435 个)  ┐
  ├─ build:   构建(Turbopack) · 体积预算                   ┘ 两个都绿才继续
  └─ deploy:  vercel build + deploy --prebuilt --archive  →  上线
```

`deploy` 这个 job `needs: [quality, build]`——**前面任何一项红，部署根本不会跑**。坏代码进不了线上，
也不浪费一次部署。再顺手给 CI 加了 `paths-ignore: [docs/**]`，**以后只改文档（比如这篇）不会触发整条构建。**

整条流水线我跑通验证过：quality ✓、build ✓、deploy ✓；线上确实是这次 Turbopack 新构建，3D 页面、
中文按需页、`/api/og`、动态 API 全是 200。

---

## 八、留给以后的我（和同路人）的几条

1. **报错信息是"最常见原因的猜测"，不是你的真实原因。** "symlinked directories" 把所有人都带偏了，
   真因其实是文件超限 + 一道符号链接安检。
2. **小心"二次错误"。** 底层报一个莫名其妙的错时，先怀疑环境（`node_modules` 干不干净）。
3. **切 pnpm `node-linker` 一定先删 `node_modules`**，否则留个缝合怪。
4. **平台有好几道隐形门槛**：单次部署 ≤ 15000 文件；git 部署会查 serverless 函数的符号链接。
5. **`--prebuilt` 会跳过安检**——所以"prebuilt 能部署"证明不了"git 能部署"。验证一定要走跟目标**同一条路**。
6. **别人的结论也要自己验**——那条"非 webpack 不可"的规则，其实是死代码。
7. **SSG 不是免费的午餐**：页面规模决定你该全量预渲染，还是按需 ISR。

---

## 写在最后

绕了一大圈，最后的样子反而很简单：**我改完代码 → push → 喝口水 → 几分钟后自动上线。** 测试不过它自己拦住，
3D 招牌一点没动，构建还快了 10 倍。一次看着吓人的"部署翻车"，最后变成了把整条 CI/CD 顺出来的契机。

_（技术细节都以当时实测为准：Next.js 15.5.18 / Vercel CLI 54 / pnpm 10。平台的上限和校验行为可能随版本变化，
照搬前最好自己再验一遍。）_
