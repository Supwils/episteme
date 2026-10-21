# 依赖补丁

## Next.js 内置 React 水合修复

`next@15.5.28.patch` 回移 React 已合并的 [#35494](https://github.com/react/react/pull/35494)，对应本仓库 `T-ENG-08`。当前 App Router 使用 Next 内置的 `19.2.0-canary-0bdb9206-20250818`；修改顶层 `react-dom` 依赖不会修复它。

宿主元素认领服务端 DOM 后，其 Flight 延迟子节点可能挂起，并在下一个调度片段前就绪。重放宿主元素前需要恢复水合游标，否则 React 会把父元素与其第一个子元素比较，误报 418 并丢弃服务端 DOM。补丁仅在 HostComponent 重放入口恢复原有水合上下文，保留真实不匹配的错误与恢复行为；同时覆盖普通、profiling 两种入口的生产与开发运行时，不改实验通道。

补丁由 `pnpm.patchedDependencies` 和锁文件共同安装，Next 固定为 `15.5.28`。不要直接修改 `node_modules`。更新 Next 时，先检查其内置 React 是否已包含上游修复；确认后移除补丁声明、补丁文件与本说明，再重新安装、构建并验证。不要只因顶层 React 版本升级就移除。

T-ENG-22 升级到 15.5.28 时，官方包中上述四个未打补丁的运行时文件与 15.5.25 逐字节相同，仍缺少游标恢复；现有补丁可原样应用，内容与哈希不变，仅迁移版本声明和文件名。

`e2e/hydration-replay.spec.ts` 在原生浏览器中直接打包 Next 内置运行时，覆盖 `main` / `div`、四个运行时入口、片段间就绪 / 延后就绪 / 非 transition 水合及真实文本不匹配。正确场景必须复用原 DOM 且交互可用；真实不匹配必须继续上报并替换 DOM。它随生产全量 e2e 运行：

```bash
NEXT_DIST_DIR=.next-prod pnpm test:e2e:full e2e/hydration-replay.spec.ts
```

还需构建实际站点并复验阅读页、全站冒烟与包体预算；独立运行时样例不能替代应用集成验收。

## Next.js 图像依赖的安全版本

Next、`@next/mdx` 与 `eslint-config-next` 同步精确锁为 `15.5.28`，对应[官方 2026-10-14 安全更新](https://nextjs.org/blog/nextjs-security-update-october-14-2026)。这是 15.5 维护版本更新，不执行跨大版本 API 迁移。

Next 15.5.28 的 optional dependency 接受 `sharp: ^0.34.3 || ^0.35.5`，旧锁文件仍可能保留 0.34.5，不能仅凭 Next 版本判定图像库已修复。内容图像脚本本来就直接导入 sharp，现将其声明为直接依赖并精确锁为 `0.35.5`，另用 `next@15.5.28>sharp` 定向约束主应用框架路径。更新 Next 时同步复核该选择器与实际解析结果；不要为旧 importer 添加全局覆盖。

官方 [SVG 图像优化公告](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw)针对特定 Linux/glibc 路径；本机 macOS 回归不能证明 Linux 不受影响。[Server Action DoS](https://github.com/vercel/next.js/security/advisories/GHSA-p3m5-59mp-jv5r) 另要求应用有 Server Action，本仓库当前没有；[Cache Components 的类型混淆公告](https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr)只涉及 Next 16，不据此给 Next 15 标记可利用。安装后按 Next 所在目录解析 sharp，配合 frozen 安装、受信图像再生成与生产回归验收，不将版本检查当作攻击复现。

## Playwright 浏览器退出后释放继承标准流

`playwright-core@1.60.0.patch` 是本仓库 `T-ENG-10` 的本地修复，**不是上游已合并补丁**。macOS 系统 Chrome 155.0.8059.85 的全量回归在桌面项目完成后停住：两个 Chrome 主进程已退出，工作进程仍等待 `Browser.close`。`lsof` 确认工作进程的 stdout/stderr 对端仍被同次启动的 crashpad 与 GoogleUpdater 辅助进程持有；通过调试器只关闭测试工作进程中的两个读端后，Playwright 立即完成原有关闭与临时目录清理，未终止辅助进程。

Playwright 1.60.0 的 `launchProcess` 只在 Node 子进程 `close` 事件上完成清理；标准流被后代继承时，真实 `exit` 已发生，`close` 仍会无限等待。补丁在真实 `exit` 后留 1 秒排空日志；若此时 `close` 仍未发生，仅销毁本方持有的该子进程标准流，继续原有 `close`、退出码、错误与清理逻辑。正常关闭会取消计时器，没有额外等待；计时器不阻止自然退出，补丁不发送进程终止信号。

`@playwright/test` 固定为 `1.60.0`，补丁和哈希经 `pnpm.patchedDependencies` 与锁文件安装。升级 Playwright 时先检查其实际进程关闭实现，并运行以下确定性样例和两个通道的完整功能回归；只有上游实现已正确处理该边界时，才移除声明、补丁文件和版本限制。

```bash
pnpm test:e2e:browser-lifecycle:regression
E2E_BROWSER_CHANNEL=chromium pnpm test:e2e:browser-lifecycle:regression
NEXT_DIST_DIR=.next-prod pnpm test:e2e:full
NEXT_DIST_DIR=.next-prod E2E_BROWSER_CHANNEL=chromium pnpm test:e2e:full
```

确定性样例以独立包装进程启动真实浏览器，让受控后代保留 stdout/stderr 与调试管道。未打补丁时在 `server.close` 超时；修复后自然退出，持有管道的后代仍存活，随后由样例自身清理。另一条样例让启动进程以 42 退出，必须继续返回失败并保留退出码；启动失败时原有进程树清理仍执行。报告保存在 `.cache/browser-lifecycle/retained-stdio-*`。普通启动/关闭诊断、可调时限与通道参数见 `docs/CI-CD与渲染策略.md`。

[上游 #39736](https://github.com/microsoft/playwright/issues/39736)报告过相似现象，但因缺少可运行复现已关闭；本补丁的依据是本机描述符、关闭干预和确定性样例，不把该 issue 当作上游修复或根因确认。

## 兼容传递依赖的维护约束

T-ENG-23 沿实际依赖路径维护修补版本，不使用全局 audit fix：

| 路径                                          | 约束与理由                                                                                                                    |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `next@15.5.28>postcss`                        | 8.5.23；Next 的 8.4.31 固定依赖仍含旧 source map 行为。现有 8.5.x 消费者同步到该维护版本，旧 importer 的 8.4.x 不被范围覆盖。 |
| `postcss@8.5.23` 的 nanoid / source-map-js    | 分别为 3.3.18 / 1.2.2，避免宽松范围沿用旧锁中的未修补实例。                                                                   |
| Babel 7 的 compilation-targets → browserslist | 4.28.7，其 baseline-browser-mapping 固定 2.11.0；浏览器查询和统计来自本地构建配置。                                           |
| `three-stdlib@2.36.1>fflate`                  | 0.6.11，保留原 0.6 API 分支。                                                                                                 |
| `@shuding/opentype.js@1.4.0-beta.0>fflate`    | 0.7.5，保留原 0.7 API 分支；OG 当前读取固定的本地 TTF，调用的是 inflate 而非 ZIP 解析。                                       |
| KaTeX                                         | 直接依赖固定 0.18.2，修复继承选项与内部元数据读取；同时复核 0.18 的内部 CSS 类名前缀迁移。                                    |

依据为 [PostCSS 8.5.23](https://github.com/postcss/postcss/releases/tag/8.5.23)、[Browserslist 缓存公告](https://github.com/browserslist/browserslist/security/advisories/GHSA-c83g-rgw3-j3cx)、[fflate 修复提交](https://github.com/101arrowz/fflate/commit/e6d5e6e1076892f72770ac732d83c81da9f3316e)及 [KaTeX 安全公告](https://github.com/KaTeX/KaTeX/security/advisories/GHSA-238p-pmpm-9mq7)。PostCSS 的文件访问与 Browserslist 的资源问题都要求对应可控输入；当前站点没有提供 CSS 编译或目标浏览器查询接口，不将依赖样例当作公网攻击复现。

`postcss-source-map.test.ts` 从 Next 目录解析实际实例，检查无基准路径、越界路径和合法同目录 map，避免误测 Tailwind 的另一个版本；`katex-security.test.ts` 同时验证继承选项无效、显式信任选项与展开预算仍有效。ZIP64 诊断在自有临时子进程中运行并有 2.5 秒预算，普通 ZIP 为正对照。样例只访问自建文件，不读取其他项目或真实凭证。

升级上述父包时检查选择器是否仍适用，并运行实际解析与行为对照；若上游已包含修复，先通过回归再移除对应约束。KaTeX 升级还须扫描现有选择器、完整正文渲染、中文/超宽公式与双主题排版，保留原有识别规则、最大尺寸和展开预算。`sprintf-js` 的审计项没有已发布修复版本，当前仅在 js-yaml 的 CLI 参数链中使用，应用的 gray-matter/YAML API 不加载该链；记录此边界，不用跨版本强换 argparse 破坏其 CLI。
