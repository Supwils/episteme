# Map Data Assets

## countries-110m.json

- Source: `world-atlas@2`
- URL: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
- Upstream data: Natural Earth Admin 0 country boundaries, converted to TopoJSON.
- Purpose: Render the `/map` world country boundary layer with a small front-end payload.
- Scale: 110m, suitable for global overview and interactive historical event browsing.
- Retrieved: 2026-05-14

For higher precision, replace this file with `countries-50m.json` from the same package or a project-normalized Natural Earth 50m/10m TopoJSON export.
