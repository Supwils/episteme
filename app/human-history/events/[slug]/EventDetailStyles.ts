export const EVENT_DETAIL_STYLES = `
  .ev-detail-page {
    padding: 80px 24px 60px;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .ev-hero {
    text-align: center;
    margin-bottom: 48px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border);
  }

  .ev-breadcrumb {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    font-size: 0.82rem;
    color: var(--parchment-dim, rgba(255,255,255,0.5));
  }

  .ev-breadcrumb a {
    color: var(--gold, #C8A951);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .ev-breadcrumb a:hover {
    opacity: 0.8;
  }

  .ev-title {
    font-family: var(--serif, serif);
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--parchment, #fff);
    margin: 0 0 16px;
    letter-spacing: 0.04em;
  }

  .ev-meta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .ev-year {
    font-family: var(--mono, monospace);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .ev-era-tag,
  .ev-region-tag,
  .ev-cat-tag {
    font-size: 0.72rem;
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    text-decoration: none;
    transition: border-color 0.3s;
  }

  .ev-era-tag:hover {
    opacity: 0.8;
  }

  .ev-desc {
    max-width: 680px;
    margin: 0 auto;
    font-size: 1rem;
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    line-height: 1.85;
  }

  .ev-section {
    margin-bottom: 48px;
  }

  .ev-section-title {
    font-family: var(--serif, serif);
    font-size: 1.3rem;
    color: var(--parchment, #fff);
    margin-bottom: 24px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border, rgba(255,255,255,0.15));
    font-weight: 600;
  }

  .ev-pages {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .ev-page {
    padding: 24px;
    background: var(--bg-card, rgba(255,255,255,0.04));
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: var(--radius, 8px);
  }

  .ev-page-title {
    font-family: var(--serif, serif);
    font-size: 1.1rem;
    color: var(--parchment, #fff);
    margin: 0 0 14px;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .ev-page-num {
    font-family: var(--mono, monospace);
    font-size: 1.4rem;
    color: var(--gold, #C8A951);
    opacity: 0.4;
    flex-shrink: 0;
  }

  .ev-page-body p {
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    font-size: 0.92rem;
    line-height: 1.95;
    margin-bottom: 14px;
    text-indent: 2em;
  }

  .ev-page-body p:last-child {
    margin-bottom: 0;
  }

  .ev-long-desc p {
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    font-size: 0.92rem;
    line-height: 1.95;
    margin-bottom: 14px;
    text-indent: 2em;
  }

  .ev-long-desc p:first-child {
    text-indent: 0;
  }

  .ev-facts {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ev-fact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-card, rgba(255,255,255,0.04));
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: var(--radius, 8px);
    font-size: 0.88rem;
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    line-height: 1.7;
  }

  .ev-fact-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold, #C8A951);
    flex-shrink: 0;
    margin-top: 7px;
  }

  .ev-quote {
    font-family: var(--serif, serif);
    font-size: 1.1rem;
    color: var(--gold, #C8A951);
    font-style: italic;
    border-left: 3px solid var(--gold, #C8A951);
    padding: 16px 0 16px 24px;
    margin: 0;
  }

  .ev-quote p {
    margin: 0 0 8px;
  }

  .ev-quote cite {
    display: block;
    font-size: 0.82rem;
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    font-style: normal;
  }

  .ev-figures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px;
  }

  .ev-figure-card {
    display: flex;
    gap: 14px;
    padding: 16px;
    background: var(--bg-card, rgba(255,255,255,0.04));
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: var(--radius, 8px);
    text-decoration: none;
    transition: border-color 0.3s, transform 0.3s;
  }

  .ev-figure-card:hover {
    border-color: var(--border-hover, rgba(255,255,255,0.3));
    transform: translateY(-2px);
  }

  .ev-figure-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid;
    background: color-mix(in oklab, var(--gold, #C8A951) 10%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--brush, serif);
    font-size: 1.3rem;
    color: var(--gold, #C8A951);
    flex-shrink: 0;
  }

  .ev-figure-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ev-figure-name {
    font-family: var(--serif, serif);
    font-size: 0.95rem;
    color: var(--parchment, #fff);
  }

  .ev-figure-role {
    font-size: 0.72rem;
    color: var(--gold, #C8A951);
    opacity: 0.8;
  }

  .ev-related-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ev-related-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: var(--bg-card, rgba(255,255,255,0.04));
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: var(--radius, 8px);
    text-decoration: none;
    transition: border-color 0.3s, transform 0.3s;
  }

  .ev-related-item:hover {
    border-color: var(--border-hover, rgba(255,255,255,0.3));
    transform: translateY(-2px);
  }

  .ev-related-type {
    font-size: 0.68rem;
    padding: 2px 8px;
    border: 1px solid;
    border-radius: 4px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ev-related-title {
    font-family: var(--serif, serif);
    font-size: 0.92rem;
    color: var(--parchment, #fff);
    flex-shrink: 0;
  }

  .ev-related-desc {
    font-size: 0.78rem;
    color: var(--parchment-dim, rgba(255,255,255,0.5));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ev-refs-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ev-ref-item {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-card, rgba(255,255,255,0.04));
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: var(--radius, 8px);
  }

  .ev-ref-num {
    font-family: var(--mono, monospace);
    font-size: 0.82rem;
    color: var(--gold, #C8A951);
    opacity: 0.5;
    flex-shrink: 0;
    padding-top: 1px;
  }

  .ev-ref-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ev-ref-title {
    font-family: var(--serif, serif);
    font-size: 0.9rem;
    color: var(--parchment, #fff);
  }

  .ev-ref-title-en {
    font-style: italic;
    font-size: 0.75rem;
    color: var(--parchment-mute, rgba(255,255,255,0.3));
  }

  .ev-ref-meta {
    font-size: 0.75rem;
    color: var(--parchment-dim, rgba(255,255,255,0.5));
  }

  .ev-nav-bottom {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid var(--border, rgba(255,255,255,0.15));
  }

  .ev-nav-link {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 14px 18px;
    background: var(--bg-card, rgba(255,255,255,0.04));
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: var(--radius, 8px);
    text-decoration: none;
    transition: border-color 0.3s, transform 0.3s;
    min-width: 160px;
  }

  .ev-nav-link:hover {
    border-color: var(--border-hover, rgba(255,255,255,0.3));
    transform: translateY(-2px);
  }

  .ev-nav-next {
    text-align: right;
    margin-left: auto;
  }

  .ev-nav-label {
    font-size: 0.72rem;
    color: var(--parchment-mute, rgba(255,255,255,0.3));
  }

  .ev-nav-name {
    font-family: var(--serif, serif);
    font-size: 0.95rem;
    color: var(--gold, #C8A951);
  }

  @media (max-width: 640px) {
    .ev-title {
      font-size: 1.7rem;
    }

    .ev-meta-row {
      gap: 8px;
    }

    .ev-figures-grid {
      grid-template-columns: 1fr;
    }

    .ev-related-item {
      flex-wrap: wrap;
    }

    .ev-related-desc {
      width: 100%;
      white-space: normal;
    }

    .ev-nav-bottom {
      flex-direction: column;
    }

    .ev-nav-next {
      text-align: left;
    }
  }
`;
