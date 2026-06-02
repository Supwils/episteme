import { REFERENCES } from '../data/references.js';

export function renderReferences(refKeys) {
  if (!refKeys || refKeys.length === 0) return '';
  const items = refKeys
    .map(key => REFERENCES[key])
    .filter(Boolean)
    .sort((a, b) => (a.year || 0) - (b.year || 0));

  if (items.length === 0) return '';

  const rows = items.map(ref => {
    const year = ref.year < 0 ? `前${Math.abs(ref.year)}` : ref.year;
    const titleEn = ref.titleEn ? ` <span class="ref-en">${ref.titleEn}</span>` : '';
    return `<div class="ref-item"><span class="ref-year">${year}</span><span class="ref-author">${ref.author}</span><span class="ref-title">${ref.title}</span>${titleEn}</div>`;
  }).join('');

  return `<div class="ref-section"><div class="ref-section-title">参考文献</div><div class="ref-list">${rows}</div></div>`;
}
