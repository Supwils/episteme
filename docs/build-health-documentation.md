# Build & Health Pipeline

## 原子写入（Atomic Writes）

从 2026-09-04 开始，所有生成脚本（`pnpm gen-all` 执行的 10 步）使用原子写入，避免构建过程中读取器看到部分写入的文件。

### 实现

- **核心工具**：`lib/atomic-write.ts` 的 `writeFileAtomic()` 
- **机制**：写临时文件 → 原子性 rename（POSIX）
- **影响范围**：
  - `scripts/gen-search-index.ts` — `public/search-index.json`, `generated/corpus.txt`, `generated/corpus-meta.json`
  - `scripts/gen-wiki-links-index.ts` — `lib/wiki-link-index.ts`, `lib/backlinks-index.ts`, `public/link-previews/*.json`
  - `scripts/gen-history-route-data.ts` — `content/human-history/data/generated/*`
  - `scripts/gen-philo-index.ts`, `gen-econ-index.ts`, `gen-psych-index.ts`, `gen-life-index.ts` — `content/*/...-data.ts`
  - `scripts/gen-kb-index.ts` — 通过 `format-ts.ts`
  - `scripts/gen-content-images.ts` — `public/images/manifest.json`
  - `scripts/gen-narration-audio.ts` — `lib/narration-manifest.json`
  - `scripts/gen-icons.ts` — `public/icons/*.png`

### 并发安全性

当前不处理并发 `gen-all`。如果未来需要并发支持：

- 选项 A：给 `pnpm gen-all` 加文件锁（`wx` flag），并发调用等待或快速失败
- 选项 B：改为消息队列驱动、单一 worker

## 健康检查端点

### `/api/health` — GET

部署就绪检查，验证关键生成产物存在、可解析且结构正确。

**成功响应（200）**：

```json
{
  "ok": true,
  "timestamp": "2026-09-04T14:30:00.000Z",
  "artifacts": {
    "search-index-v1": { "ok": true, "count": 2833, "size": 2769920 },
    "wiki-link-index": { "ok": true, "count": 3186, "size": 248648 },
    "backlinks-index": { "ok": true, "count": 1951, "size": 1755289 }
  }
}
```

**失败响应（503）**：

```json
{
  "ok": false,
  "timestamp": "2026-09-04T14:30:00.000Z",
  "artifacts": {
    "search-index": { "ok": false, "error": "not found" },
    "wiki-link-index": { "ok": true, "count": 3186, "size": 248648 },
    "backlinks-index": { "ok": true, "count": 1951, "size": 1755289 }
  }
}
```

### 校验的产物

1. **`public/search-index.json`**：MiniSearch tier 1，必须有 `v` 字段、非空 `docs` 数组
2. **`lib/wiki-link-index.ts`**：Wiki 链接正向索引，必须有导出常量和 `resolveWikiLink` 函数
3. **`lib/backlinks-index.ts`**：反向链接索引，必须有导出常量和 `getBacklinks` 函数

### 集成指南（可选）

Vercel 原生不支持自定义健康检查，但可在 CI/CD 中使用：

```bash
# 构建后验证
pnpm build
curl -f http://localhost:3000/api/health || exit 1
```

或部署后验证（作为 smoke test）：

```bash
curl -f https://episteme.com/api/health || exit 1
```

### 不适用场景

- **不检查 Tier 2 语料库**（`generated/corpus.txt` 10MB+）— 完整扫描太慢
- **不检查图像/音频资产** — 规模太大
- **不检查 MDX 内容本体** — 由 `pnpm check-content` 负责

## 与既有流水线的关系

| 阶段 | 已有检查 | 新增能力 |
|------|---------|---------|
| `pnpm gen-all` | 无 | 原子写入，避免部分写入 |
| `pnpm build` | Next.js 构建错误 | 无变化 |
| `pnpm audit-rendering` | 渲染模式契约 | 无变化 |
| `pnpm bundle-check` | 包体预算 | 无变化 |
| `pnpm test:e2e:smoke` | 生产路由冒烟 | 可增加 `/api/health` 检查 |
| **新** `/api/health` | 无 | 验证生成产物完整性 |

## 历史背景

在引入原子写入前，`pnpm gen-all` 期间应用或构建可能读取部分写入的 JSON/TS，导致：

- 应用启动时解析错误
- 测试中随机失败
- CI 偶发性构建失败

原子写入 + 健康端点 = 明确的「索引可用」信号，支持零停机重新部署。

## 参考

- **实现**：`lib/atomic-write.ts`、`app/api/health/route.ts`
- **测试**：`lib/__tests__/atomic-write.test.ts`、`app/api/health/__tests__/route.test.ts`
- **相关流程**：`docs/CI-CD与渲染策略.md`
