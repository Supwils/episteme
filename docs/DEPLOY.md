# 部署速查

> 本文只讲**怎么操作、出问题怎么查**。机制与设计理由见 `CI-CD与渲染策略.md`，事故复盘见 `复盘-从一次Vercel部署翻车到CICD最优解.md`。

## 一句话

**push `main` = 触发生产部署。** 没有别的部署入口——Vercel 原生 git 集成在 `vercel.json` 里被**刻意关闭**（`git.deploymentEnabled.main = false`），生产发布只走 `.github/workflows/ci.yml`。

代理默认**不 push**：commit / merge / push 三个动作都由用户口令触发（见 `CLAUDE.md` 的 Git 纪律）。

## 推送前的本地规程（与 CI 一致）

```bash
pnpm install --frozen-lockfile
pnpm gen-all && git status --short      # 索引与内容一致，产物纳入改动
pnpm prepush                            # husky 也会自动跑这条
pnpm build                              # 真实 Turbopack 生产构建
pnpm audit-rendering                    # SSG/ISR 契约（读生产产物）
pnpm bundle-check -- --skip-build       # JS/CSS/搜索索引预算
CI=1 pnpm test:e2e:smoke                # 可选，云端 Build job 也会跑
```

紧急绕过 pre-push 钩子：`git push --no-verify`（会把风险直接送进生产流水线，慎用）。

## push 之后发生什么

| 阶段        | 内容                                                                                    | 失败影响   |
| ----------- | --------------------------------------------------------------------------------------- | ---------- |
| **Quality** | `gen-all` 幂等性 → typecheck → lint → check-content + 四项知识审计 → 单元测试           | 阻断部署   |
| **Build**   | `pnpm build` → `audit-rendering` → `bundle-check` → Lighthouse 预算 → Playwright smoke  | 阻断部署   |
| **Deploy**  | `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod --archive=tgz` | 生产未更新 |

Quality 与 Build 并行；Deploy 需要两者都过，且只在非 PR 的 `main` 上运行。只改 `docs/**` 被 `paths-ignore` 跳过（不构建、不部署）。

## 配置要点

- **Vercel 项目**：Framework Next.js，Root Directory 为仓库根目录，Build `pnpm build`，Install `pnpm install`（写在 `vercel.json`）。
- **凭证**：仓库 secret `VERCEL_TOKEN`。`VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` 写在 workflow env 里——它们是资源标识，不是凭证。
- **环境变量**：运行时不依赖额外环境变量；SEO/OG 用 `NEXT_PUBLIC_SITE_URL` 指向生产域名（未设置时有默认值）。
- **排除项**：`.vercelignore` 排除 `reference/`、`docs/`、`e2e/`。

## 常见故障与定位

| 症状                                        | 原因与处理                                                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Quality 挂在"Generated indexes are current" | 忘了 `pnpm gen-all` 或漏提交生成产物。本地补跑并把 `lib/wiki-link-index.ts`、`public/*.json`、`generated/*` 一起提交。 |
| Vercel 报文件数超限 / 符号链接被拒          | 只能走 `--prebuilt --archive=tgz`。**不要**打开原生 git 集成，也不要给高基数 `[slug]` 路由返回全部 slug。              |
| `bundle-check` 超预算                       | 先看是哪条线（共享首载 / 路由 CSS / 单块 / 搜索索引），提额需在 `任务清单.md` 决策记录里写依据。                       |
| Lighthouse TBT 偶发超标                     | `/knowledge-graph` 在 CI runner 上方差可达 3 倍，脚本已有确认采样机制；已决策接受偶发重跑（决策记录第 2 条）。         |
| 本地 `pnpm build` webpack 报错              | 历史坑：删掉 `node_modules` 重装（见复盘文档）。生产构建用 Turbopack，不走 webpack。                                   |
| Lighthouse 指标看起来不对                   | 必须指向本项目独占端口。`pnpm start` 在 3000；若被占用，换端口并设 `LH_BASE`。                                         |
