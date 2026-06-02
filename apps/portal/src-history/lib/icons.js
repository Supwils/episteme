export const ERA_ICONS = {
  prehistoric: 'mdi:tent',
  classical: 'mdi:temple-hindu',
  medieval: 'mdi:castle',
  earlyModern: 'mdi:sail-boat',
  modern: 'mdi:factory',
  contemporary: 'mdi:earth',
  future: 'mdi:rocket-launch',
};

export const NAV_ICONS = {
  home: 'mdi:home',
  timeline: 'mdi:timeline-clock',
  atlas: 'mdi:map-legend',
  graph: 'mdi:graph-outline',
  map: 'mdi:map',
  figures: 'mdi:account-group',
};

export const CAT_ICONS = {
  politics: 'mdi:scale-balance',
  military: 'mdi:sword-cross',
  economy: 'mdi:chart-line',
  culture: 'mdi:palette',
  science: 'mdi:flask',
  technology: 'mdi:cog',
};

export const DETAIL_ICONS = {
  figures: 'mdi:account-group',
  causes: 'mdi:magnify-scan',
  consequences: 'mdi:lightning-bolt',
  legacy: 'mdi:pillar',
  facts: 'mdi:lightbulb-on',
  quote: 'mdi:format-quote-close',
  connections: 'mdi:connection',
  summary: 'mdi:text-box',
  close: 'mdi:chevron-up',
  expand: 'mdi:chevron-down',
};

export function icon(name, size = 18) {
  return `<iconify-icon icon="${name}" width="${size}" height="${size}" style="vertical-align:middle"></iconify-icon>`;
}
