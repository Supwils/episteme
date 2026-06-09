export const ERA_DETAIL_STYLES = `
  .era-detail-page {
    padding: 80px 24px 60px;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .era-detail-hero {
    text-align: center;
    margin-bottom: 48px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border);
  }

  .era-detail-breadcrumb {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    font-size: 0.82rem;
    color: var(--parchment-dim);
  }

  .era-detail-breadcrumb a {
    color: var(--gold);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .era-detail-breadcrumb a:hover {
    opacity: 0.8;
  }

  .era-detail-icon {
    font-size: 2.8rem;
    margin-bottom: 12px;
    display: block;
  }

  .era-detail-name {
    font-family: var(--serif);
    font-size: 2.6rem;
    font-weight: 700;
    color: var(--parchment);
    margin: 0 0 8px;
    letter-spacing: 0.04em;
  }

  .era-detail-range {
    font-family: var(--mono);
    font-size: 0.9rem;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .era-detail-desc {
    max-width: 720px;
    margin: 0 auto;
    font-size: 1rem;
    color: var(--parchment-dim);
    line-height: 1.85;
  }

  .era-detail-highlights {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
  }

  .era-highlight-tag {
    padding: 5px 14px;
    border-radius: 999px;
    border: 1px solid var(--border);
    font-size: 0.78rem;
    color: var(--parchment-dim);
    background: var(--bg-card);
  }

  .era-section {
    margin-bottom: 48px;
  }

  .era-section-title {
    font-family: var(--serif);
    font-size: 1.35rem;
    color: var(--parchment);
    margin-bottom: 24px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
    font-weight: 600;
  }

  .era-overview-quote blockquote {
    font-family: var(--serif);
    font-size: 1.15rem;
    color: var(--gold);
    font-style: italic;
    border-left: 3px solid var(--gold);
    padding: 12px 0 12px 20px;
    margin-bottom: 28px;
  }

  .era-overview-quote cite {
    display: block;
    margin-top: 8px;
    font-size: 0.85rem;
    color: var(--parchment-dim);
    font-style: normal;
  }

  .era-overview-desc p {
    color: var(--parchment-dim);
    font-size: 0.95rem;
    line-height: 1.95;
    margin-bottom: 16px;
    text-indent: 2em;
  }

  .era-overview-desc p:first-child {
    text-indent: 0;
  }

  .era-timeline {
    position: relative;
    padding-left: 32px;
  }

  .era-timeline-item {
    position: relative;
    padding-bottom: 28px;
  }

  .era-timeline-item:last-child {
    padding-bottom: 0;
  }

  .era-timeline-dot {
    position: absolute;
    left: -32px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid;
    background: var(--bg);
    z-index: 1;
  }

  .era-timeline-line {
    position: absolute;
    left: -28px;
    top: 18px;
    bottom: -16px;
    width: 1px;
    background: linear-gradient(180deg, var(--border) 0%, transparent 100%);
  }

  .era-timeline-item:last-child .era-timeline-line {
    display: none;
  }

  .era-timeline-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
  }

  .era-timeline-year {
    font-family: var(--mono);
    font-size: 0.78rem;
    font-weight: 600;
  }

  .era-timeline-cat,
  .era-timeline-region {
    font-size: 0.68rem;
    color: var(--parchment-mute);
    border: 1px solid var(--border-soft);
    padding: 1px 7px;
    border-radius: 4px;
  }

  .era-timeline-title {
    font-family: var(--serif);
    font-size: 1rem;
    color: var(--parchment);
    margin-bottom: 4px;
  }

  .era-timeline-desc {
    font-size: 0.85rem;
    color: var(--parchment-dim);
    line-height: 1.7;
  }

  .era-figures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  .era-figure-card {
    display: flex;
    gap: 16px;
    padding: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: border-color 0.3s, transform 0.3s;
  }

  .era-figure-card:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  .era-figure-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid;
    background: color-mix(in oklab, var(--gold) 10%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--brush);
    font-size: 1.6rem;
    color: var(--gold);
    flex-shrink: 0;
  }

  .era-figure-info {
    flex: 1;
    min-width: 0;
  }

  .era-figure-name {
    font-family: var(--serif);
    font-size: 1.05rem;
    color: var(--parchment);
    margin-bottom: 2px;
  }

  .era-figure-title {
    font-size: 0.78rem;
    color: var(--gold);
    display: block;
    margin-bottom: 4px;
  }

  .era-figure-dates {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--parchment-mute);
    display: block;
    margin-bottom: 6px;
  }

  .era-figure-desc {
    font-size: 0.82rem;
    color: var(--parchment-dim);
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .era-figure-quote {
    font-family: var(--serif);
    font-size: 0.75rem;
    font-style: italic;
    color: var(--parchment-dim);
    margin-top: 8px;
    opacity: 0.75;
  }

  .era-achievements-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .era-achievement-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: 0.9rem;
    color: var(--parchment-dim);
  }

  .era-achievement-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    flex-shrink: 0;
  }

  .era-reading-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .era-reading-item {
    display: flex;
    gap: 16px;
    padding: 18px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .era-reading-num {
    font-family: var(--mono);
    font-size: 1.4rem;
    color: var(--gold);
    opacity: 0.4;
    flex-shrink: 0;
    width: 36px;
    padding-top: 2px;
  }

  .era-reading-info {
    flex: 1;
  }

  .era-reading-title {
    font-family: var(--serif);
    font-size: 1rem;
    color: var(--parchment);
    margin-bottom: 2px;
  }

  .era-reading-title-en {
    font-family: var(--italic);
    font-style: italic;
    font-size: 0.78rem;
    color: var(--parchment-mute);
    display: block;
    margin-bottom: 6px;
  }

  .era-reading-meta {
    display: flex;
    gap: 12px;
    font-size: 0.78rem;
    color: var(--parchment-dim);
    margin-bottom: 6px;
  }

  .era-reading-note {
    font-size: 0.82rem;
    color: var(--parchment-dim);
    line-height: 1.65;
  }

  .era-legacy-text {
    font-size: 0.95rem;
    color: var(--parchment-dim);
    line-height: 1.9;
    padding: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    border-left: 3px solid var(--gold);
  }

  .era-nav-bottom {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }

  .era-nav-link {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    text-decoration: none;
    transition: border-color 0.3s, transform 0.3s;
    min-width: 180px;
  }

  .era-nav-link:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  .era-nav-next {
    text-align: right;
    margin-left: auto;
  }

  .era-nav-label {
    font-size: 0.75rem;
    color: var(--parchment-mute);
  }

  .era-nav-name {
    font-family: var(--serif);
    font-size: 1.05rem;
    color: var(--gold);
  }

  @media (max-width: 640px) {
    .era-detail-name {
      font-size: 1.8rem;
    }

    .era-figures-grid {
      grid-template-columns: 1fr;
    }

    .era-nav-bottom {
      flex-direction: column;
    }

    .era-nav-next {
      text-align: left;
    }
  }
`;
