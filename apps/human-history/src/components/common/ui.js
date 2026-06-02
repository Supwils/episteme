import { el } from '../../lib/dom.js';

export function createPageHeader(title, subtitle) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(el('h1', { class: 'section-title' }, title));
  fragment.appendChild(el('p', { class: 'section-sub' }, subtitle));
  return fragment;
}

export function createSegmentButton({ label, value, current, className, onClick }) {
  return el('button', {
    class: `${className}${current === value ? ' active' : ''}`,
    type: 'button',
    onClick,
  }, label);
}

export function createStatCard(label, value, className = 'figure-stat') {
  const item = el('div', { class: className });
  item.appendChild(el('strong', {}, String(value)));
  item.appendChild(el('span', {}, label));
  return item;
}

export function createEmptyState(title, description, className = '') {
  return el('div', { class: `empty-state${className ? ` ${className}` : ''}` },
    el('h3', {}, title),
    el('p', {}, description)
  );
}
