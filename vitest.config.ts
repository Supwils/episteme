import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx", "**/*.test.mjs"],
    exclude: ["e2e/**", "node_modules/**", ".next/**", "reference/**"],
    globals: true,
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});
