import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Knowledge domains — each keeps its frontend code in its own src-* directory
// and must not import another domain's src-* directly. Shared code belongs in
// packages/ (see docs/工程原则.md §三 架构边界).
const DOMAINS = [
  "physics",
  "history",
  "philosophy",
  "life-science",
  "cosmology",
  "mathematics",
  "economics",
  "psychology",
  "knowledge-graph",
];

const domainBoundaryConfigs = DOMAINS.map((self) => ({
  files: [`src-${self}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: DOMAINS.filter((d) => d !== self).flatMap((d) => [
              `@/src-${d}`,
              `@/src-${d}/**`,
            ]),
            message:
              "跨知识领域 src-* 互相引用违反架构边界(docs/工程原则.md §三)。共享代码应抽到 packages/(如 @universe/graph-engine)。",
          },
        ],
      },
    ],
  },
}));

const eslintConfig = [
  { ignores: [".next/", "node_modules/", "coverage/", "playwright-report/"] },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/MarkdownRenderer.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: [
      "src-*/**/*.{ts,tsx}",
      "app/**/*.{ts,tsx}",
      "lib/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/__tests__/**", "**/*.config.{ts,mts,mjs}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  ...domainBoundaryConfigs,
];

export default eslintConfig;
