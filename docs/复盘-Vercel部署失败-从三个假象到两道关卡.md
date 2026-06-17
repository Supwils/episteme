# 复盘：Vercel 部署失败——从三个"假象"到两道"关卡"

> 一句话结论：失败的根因有**两层**。第一层是构建产物文件太多（17,467 > Vercel **15,000 文件上限**），
> 已用**按需渲染（ISR）**把产物降到 7,944 修复；第二层更隐蔽——Vercel 的 **git 集成部署校验**会拒绝
> Next.js App Router 标准的**函数去重符号链接**，而这一层**无法从应用代码关闭**。可靠的部署路径是
> `vercel deploy --prebuilt --archive`（它会跳过该校验），意味着需要 CI/Action 或一条手动命令。

**日期**：2026-06-17 ｜ **状态**：本地构建已修复；线上 prod 已通过 prebuilt 部署上线且运行正常；
原生"git push 自动构建"仍受第二层校验阻挡，需选定部署自动化方案。

---

## 一、现象：两块"看起来无关"的红色

- **本地**：`pnpm build` 崩，核心一行 `HookWebpackError: _webpack.WebpackError is not a constructor`。
- **线上**：Vercel 仪表盘 `Build Failed`，配一句敷衍话 _"An unexpected error occurred… may be transient."_

第一反应都会是"webpack/Turbopack 坏了？"——但这正是最大的教训：**错误信息会撒谎**。

---

## 二、侦探故事：三个假象被逐一排除

### 假象 ①：webpack 坏了

追进 `node_modules/next`，发现一个怪物：`package.json` 是新的（15.5.18），但内部
`compiled/webpack/bundle5.js` 是旧的（2025-07）。这是**新旧文件拼凑的安装**——根因是有人切了
pnpm 的 `node-linker=hoisted` 却**没删旧 `node_modules` 就 `pnpm install`**。某模块编译失败后，
Next 想把错误包成 `WebpackError` 上报，可那个拼凑出来的 webpack 没有这个构造函数，于是**报错代码
自己又报错**，把真因盖住了（这叫"二次错误"）。

> **修复**：`rm -rf node_modules && pnpm install`。本地 `pnpm build` 19 秒通过、零警告。
> 关键判断：**Vercel 每次全新安装，不会有这种污染**——所以本地失败和线上失败**根本不是一回事**。

### 假象 ②：`node-linker=hoisted` 这个配置

线上真正的报错是 _"The framework produced an invalid deployment package for a Serverless Function.
Typically this means that the framework produces files in symlinked directories."_ —— symlink！
之前一串 commit 都在打这个。`node-linker=hoisted` 本意就是摊平 `node_modules`、消除符号链接。
可实测摊平后 `node_modules` 里**一个多余符号链接都没有**。它治的是另一种病，无罪。

### 假象 ③：".func 符号链接是问题的全部"

产物 `.vercel/output/functions/` 里有大量 `.func` 符号链接——但它们是 **Next.js 的"函数去重"**：
所有路由共用同一个服务端函数，Next 让它们 `symlink` 指向同一份省空间，是**标准行为**。
为了不再猜，我们做了决定性实验：换 `vercel deploy --prebuilt --archive=tgz` 把同一份产物（连同符号链接）
打成压缩包上传——**成功上线了**。于是"符号链接是全部问题"这个判断也被推翻：**符号链接本身能部署、能运行**。

---

## 三、第一道关卡：一个隐形的"15,000"

让真相现形的，是另一条上传路径的报错：

```
Invalid request: `files` should NOT have more than 15000 items, received 17467.
Try using `--archive=tgz` to limit the amount of files you upload.
```

**17,467 > 15,000。** 我们对约 2300 个动态内容页**在构建期全部预渲染（SSG）**，而 App Router 给
**每个**预渲染页生成约 6 个产物（`.html`/`.rsc`/`prerender-config.json`/`prerender-fallback.html`/
`.func`+`.rsc.func`），轻松过万七，撞穿了 Vercel 单次部署 **15,000 文件**的隐形上限。

> **比喻**：像出版百科全书时坚持"开印前把每个词条都印好、装订好、堆进仓库"——词条越多，仓库越满。

**修复（按需 ISR）**：把 12 个最"重"的长尾路由的 `generateStaticParams` 从"返回全部"改成"返回空"：

```ts
// 改前：构建期预渲染每个词条（每页约 6 个文件）
export function generateStaticParams() {
  return universePhysicsKB.getSlugs().map((slug) => ({ slug }));
}
// 改后：构建期一个都不预渲染；首访由函数现渲染并缓存（dynamicParams 默认 true）
export function generateStaticParams() {
  return []; // ISR: render on first request + cache
}
```

> **比喻**：从"全部预印堆仓库"改成"**按需印刷的书店**"——货架只摆少量畅销书（保留预渲染、秒开），
> 其余等读者点单时现印一本并留一份在架上。仓库不再爆，而每本书读者依然买得到。

效果：产物 **17,467 → 7,944 文件**。并顺带给 `lib/knowledge-base.ts` 的 `getArticleBySlug` 补了
`decodeSlug + NFC`，让 CJK slug 按需渲染时能命中磁盘文件。

> 顺带澄清：`dynamicParams = false` **减不了文件**——实测 `app/read/[slug]`（本就设了它）产物里照样有
> 全套 prerender-fallback 结构。Next 15 的 App Router 预渲染页一律走这套结构。

---

## 四、第二道关卡：git 集成会校验符号链接（这才是真正卡住的地方）

文件数降下来后，我满以为 git push 就能成功了。我甚至用 `vercel deploy --prebuilt`（非 archive、7944 文件）
部署成功，以为"证明"了。**但这是个陷阱**：

> **`vercel deploy --prebuilt` 会跳过 git 集成强制执行的"serverless 函数符号链接校验"。**

实测把 ISR 修复 push 到 `main` 后，触发的 git 集成构建**仍然失败**，错误一字不差还是
"invalid deployment package … files in symlinked directories"——**即便文件数已是 7944**。
进一步用 `vercel deploy`（**非** prebuilt）在本地复现，**同样失败**。对照如下：

| 部署方式                                 | 文件校验 | 符号链接校验 | 结果                             |
| ---------------------------------------- | -------- | ------------ | -------------------------------- |
| git 集成（push 自动构建）                | —        | **强制**     | ❌ 拒绝 `.func` 符号链接         |
| `vercel deploy`（非 prebuilt）           | —        | **强制**     | ❌ 同上（可本地复现，4 分钟/次） |
| `vercel deploy --prebuilt`               | 跳过     | **跳过**     | ✅ 成功（线上正在用）            |
| `vercel deploy --prebuilt --archive=tgz` | 跳过     | 跳过         | ✅ 成功，且绕过 15000 上限       |

**为什么改代码救不了第二层**：那些 `.func` 符号链接是 Next.js 的 Vercel 构建器自动产生的"函数去重"，
Vercel 文档明确说"为优化资源会把尽量多的路由打包进同一个函数"，而 `functions` 配置只能把函数**拆得更多**、
**无法关闭去重**。决定性实测：把**全部 63 个 `[slug]` 路由都改成按需 ISR**，符号链接从 2422 **砍到 403**，
用等价 git 的路径部署——**依然失败**，错误一字不变。4774、2422、403 三个量级失败信息**完全一致**，说明这
**不是"数量阈值"**，而是"这套产物带了它不接受的函数符号链接"。而只要站里有多个长得一样的路由，Next 就必然
产生去重符号链接、无法归零——所以原生路径**怎么改代码都救不了**。

一句话：**这是 Vercel 平台侧 git 集成部署校验与 Next App Router 函数去重之间的不兼容，应用代码无法可靠绕过。**

---

## 五、当前状态与可靠方案

- **线上 prod 是活的**：通过 `vercel deploy --prebuilt`（跳过校验）部署的版本正在 `episteme-self.vercel.app`
  服务，静态页 / CJK 按需页 / `/api/og`（WASM）/ `/api/daily/shuffle` 全部 200。**符号链接在运行时毫无问题**。
- **ISR 修复已合入 `main`**（commit `ed8d3bc`）：它是必要且正确的改进——既压低了文件数，也让按需渲染随内容
  无限扩展；保留它没有坏处。

**最终采用并已落地：把部署从"红色安检通道"换到"绿色免检通道"，但仍由 git push 自动触发。** 三处改动：

1. `.github/workflows/deploy.yml`：push 到 `main` 时，在 CI（Linux）跑 `vercel build` + `vercel deploy --prebuilt --prod --archive=tgz`。
   仍是"推代码即上线"，且是正确的 Linux 构建。
2. `vercel.json` 加 `git.deploymentEnabled.main = false`：关掉 Vercel 自己那个**会失败的**原生构建，从此没有红色噪音。
3. `package.json` 加 `deploy` 脚本：本地 `pnpm deploy` 可手动走同一条路（应急/调试用）。

并同时把**全部 63 个 `[slug]` 内容路由都改成按需 ISR**（构建产物大幅缩小、随内容无限扩展）；`[tier]`/`[domain]`
等少参数的旗舰/落地页保留预渲染、保持秒开。

唯一一次性人工步骤：在 Vercel 后台生成一个 token，加成 GitHub 仓库 secret `VERCEL_TOKEN`（org/project ID 已写进
workflow、非机密）。加完后 push 即自动部署。

> 取舍本质：最初希望"git push 自动部署 + 不加 Action + 不手动命令"三者兼得——但 Vercel 这道校验存在时，三者
> **数学上不能同时成立**。放弃"不加 Action"代价最小：Action 本身就是自动化，"推代码即上线"的体验完全保留。

---

## 六、给后来者的清单

1. **错误信息是"最常见原因的猜测"，不是你的真实原因。** "symlinked directories" 误导了所有人；
   真因第一层是"文件数超限"，第二层是"git 集成校验拒绝函数符号链接"。
2. **警惕"二次错误"。** `WebpackError is not a constructor` 是错误上报代码自己崩了，盖住真因。
   见到诡异底层错误，先怀疑环境（`node_modules` 是否干净）。
3. **切 pnpm `node-linker` 必须先删 `node_modules`**，否则留下新旧拼凑的怪物。
4. **平台有多重隐形门槛**：单次部署文件数 ≤ 15000；git 集成部署会校验 serverless 函数的符号链接。
5. **`--prebuilt` 会跳过校验**——所以"prebuilt 能部署"**不能**证明"git 集成能部署"。验证要走和目标**同一条路径**
   （git 集成 ≈ `vercel deploy` 非 prebuilt）。
6. **SSG 不是免费午餐**：每个预渲染动态页约 6 个文件；规模决定该用全量 SSG 还是按需 ISR。
7. **对照实验破假象**：同一份产物，`--archive` 能传、git 传不上 → 一刀切开"产物坏了"还是"路径/校验问题"。

---

_本文为一次真实排障的完整复盘，技术细节以当时实测为准（Next.js 15.5.18 / Vercel CLI 54 / pnpm 10）。
平台上限与校验行为可能随版本变化，引用前请以官方文档与实测为准。_
