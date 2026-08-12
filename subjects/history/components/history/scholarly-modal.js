import { el } from '../../lib/dom.js';
import { SCHOLARLY_TITLES } from '@/content/human-history/data/scholarly-titles.js';
import { loadScholarlyDetail } from '../../lib/scholarly-data';
import { saveReadingProgress } from '../../lib/reading-progress.js';
import { renderReferences } from '../../lib/references.js';

let activeCleanup = null;

export function hasScholarlyDetail(title) {
  return SCHOLARLY_TITLES.has(title);
}

function attachOverlay(overlay, onClose) {
  overlay.addEventListener('click', (e) => { if (e.target === overlay) onClose(); });
  const onKey = (e) => { if (e.key === 'Escape') onClose(); };
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
  activeCleanup = () => {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    activeCleanup = null;
  };
  requestAnimationFrame(() => {
    overlay.classList.add('open');
    overlay.querySelector('.modal-close')?.focus();
  });
}

function showScholarlyLoading(eventTitle) {
  const overlay = el('div', { class: 'modal-overlay scholarly-overlay' });
  overlay.innerHTML = `
    <div class="modal-card scholarly-modal" role="dialog" aria-modal="true" aria-busy="true" aria-label="深度阅读：${eventTitle}">
      <div class="sch-head">
        <div class="sch-head-label">深度阅读 · 课堂讲稿</div>
        <h2 class="sch-head-title">${eventTitle}</h2>
        <div class="sch-head-actions">
          <button class="modal-close" aria-label="关闭">✕</button>
        </div>
      </div>
      <div class="sch-loading" role="status" aria-live="polite" style="padding:48px 32px;text-align:center;color:var(--parchment-dim)">
        正在载入「${eventTitle}」的讲稿…
      </div>
    </div>
  `;
  overlay.querySelector('.modal-close').addEventListener('click', () => cleanupScholarlyModal());
  attachOverlay(overlay, cleanupScholarlyModal);
  return overlay;
}

function showScholarlyLoadError(overlay, retry) {
  overlay.querySelector('.modal-card').removeAttribute('aria-busy');
  const body = overlay.querySelector('.sch-loading');
  body.setAttribute('role', 'alert');
  body.innerHTML = `
    <p style="margin:0 0 12px">讲稿载入失败，请检查网络后重试。</p>
    <button type="button" class="scholarly-btn sch-load-retry">重新载入</button>
  `;
  body.querySelector('.sch-load-retry').addEventListener('click', retry);
}

export async function openScholarlyModal(eventTitle, options = {}) {
  cleanupScholarlyModal();
  const loadingOverlay = showScholarlyLoading(eventTitle);

  let data;
  try {
    data = await loadScholarlyDetail(eventTitle);
  } catch {
    if (loadingOverlay.isConnected) {
      showScholarlyLoadError(loadingOverlay, () => openScholarlyModal(eventTitle, options));
    }
    return;
  }
  // The reader may have closed the overlay while the batch was downloading.
  if (!loadingOverlay.isConnected) return;
  cleanupScholarlyModal();
  if (!data) return;

  const scrollMode = options.scrollMode ?? false;

  const overlay = el('div', { class: 'modal-overlay scholarly-overlay' });
  const pagesHtml = data.pages.map((page, i) => `
    <div class="sch-page" id="sch-page-${i}">
      <div class="sch-page-num">${String(i + 1).padStart(2, '0')}</div>
      <h3 class="sch-page-title">${page.title}</h3>
      <p class="sch-page-body">${page.body}</p>
    </div>
  `).join('');

  const factsHtml = data.facts.map(f => `<li class="sch-fact">${f}</li>`).join('');
  const refsHtml = renderReferences(data.references);

  overlay.innerHTML = `
    <div class="modal-card scholarly-modal${scrollMode ? ' scholarly-modal--scroll' : ''}" role="dialog" aria-modal="true" aria-label="深度阅读：${eventTitle}">
      <div class="sch-head">
        <div class="sch-head-label">深度阅读 · 课堂讲稿</div>
        <h2 class="sch-head-title">${eventTitle}</h2>
        <div class="sch-head-actions">
          <button class="sch-mode-toggle" type="button" aria-label="切换阅读模式">${scrollMode ? '分页阅读' : '连续阅读'}</button>
          <button class="modal-close" aria-label="关闭">✕</button>
        </div>
      </div>
      <div class="sch-pages">${pagesHtml}</div>
      <div class="sch-facts-section">
        <h3 class="sch-section-title">事实卡</h3>
        <ul class="sch-facts-list">${factsHtml}</ul>
      </div>
      ${data.quote ? `<blockquote class="sch-quote">"${data.quote.text}"<cite>——${data.quote.author}</cite></blockquote>` : ''}
      ${refsHtml}
    </div>
  `;

  const close = () => {
    saveReadingProgress({ title: eventTitle, page: 0, type: 'scholarly' });
    cleanupScholarlyModal();
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.querySelector('.sch-mode-toggle').addEventListener('click', () => {
    cleanupScholarlyModal();
    openScholarlyModal(eventTitle, { scrollMode: !scrollMode });
  });
  attachOverlay(overlay, close);
}

export function cleanupScholarlyModal() {
  if (activeCleanup) activeCleanup();
  const stale = document.querySelector('.scholarly-overlay');
  if (stale) stale.remove();
}
