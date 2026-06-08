import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  test: {
    include: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '../../packages/graph-engine/src/**/*.test.ts',
    ],
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
    globals: true,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
});
