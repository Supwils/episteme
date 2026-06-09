import { defineConfig } from 'vite';

// Split the large, route-lazy-loaded history data layer into domain chunks so
// no single chunk exceeds the 500 kB advisory limit, and edits to one domain
// only invalidate that chunk (better cache granularity + parallel fetching).
// Uses Rolldown's advancedChunks (Vite 8) with minSize:0 so each group is
// emitted as its own chunk instead of being merged back.
export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        codeSplitting: {
          minSize: 0,
          groups: [
            { name: 'data-scholarly', test: /[\\/]data[\\/]scholarly[\\/]/ },
            { name: 'data-figures', test: /[\\/]data[\\/]figures[\\/]/ },
            { name: 'data-details-parallel', test: /event-details-tier3-parallel/ },
            { name: 'data-details-tier', test: /event-details-(tier3-core|tier2-expansion)/ },
            { name: 'data-details-geo', test: /[\\/]data[\\/]details[\\/]|[-]details\.js$|geo-enrichment/ },
          ],
        },
      },
      onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
      },
    },
  },
});
