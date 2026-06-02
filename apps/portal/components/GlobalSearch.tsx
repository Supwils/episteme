'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';

type Section = 'physics' | 'history' | 'philosophy';

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  section: Section;
  href: string;
}

interface SearchIndex {
  items: SearchItem[];
  loaded: boolean;
}

const SECTION_META: Record<Section, { label: string; color: string }> = {
  physics: { label: '宇宙物理', color: '#6ad0ff' },
  history: { label: '人类历史', color: '#c8a45a' },
  philosophy: { label: '哲学思想', color: '#a88adf' },
};

async function loadSearchIndex(): Promise<SearchItem[]> {
  const items: SearchItem[] = [];

  try {
    const cosmosMods = await Promise.all([
      import('@/content/universe-physics/cosmos/T0'),
      import('@/content/universe-physics/cosmos/T1'),
      import('@/content/universe-physics/cosmos/T2'),
      import('@/content/universe-physics/cosmos/T3'),
      import('@/content/universe-physics/cosmos/T4'),
      import('@/content/universe-physics/cosmos/T5'),
      import('@/content/universe-physics/cosmos/T6'),
      import('@/content/universe-physics/cosmos/T7'),
    ]);
    const physicsMods = await Promise.all([
      import('@/content/universe-physics/physics/P0-classical-mechanics'),
      import('@/content/universe-physics/physics/P1-thermodynamics'),
      import('@/content/universe-physics/physics/P2-electromagnetism'),
      import('@/content/universe-physics/physics/P3-relativity'),
      import('@/content/universe-physics/physics/P4-quantum-mechanics'),
      import('@/content/universe-physics/physics/P5-atomic-molecular'),
      import('@/content/universe-physics/physics/P6-nuclear-particle'),
      import('@/content/universe-physics/physics/P7-standard-model'),
      import('@/content/universe-physics/physics/P8-frontier'),
    ]);
    const [eventsMod, homeDataMod] = await Promise.all([
      import('@/content/human-history/data/events.js'),
      import('@/src-philosophy/lib/home-data'),
    ]);

    const TIER_ROUTES: Record<string, string> = {
      T0: 'observable', T1: 'cosmic-web', T2: 'laniakea', T3: 'local-group',
      T4: 'milky-way', T5: 'stellar-neighborhood', T6: 'solar-system', T7: 'earth',
    };
    const PHYSICS_ROUTES: Record<string, string> = {
      P0: 'classical-mechanics', P1: 'thermodynamics', P2: 'electromagnetism',
      P3: 'relativity', P4: 'quantum-mechanics', P5: 'atomic-molecular',
      P6: 'nuclear-particle', P7: 'standard-model', P8: 'frontier',
    };

    for (const mod of cosmosMods) {
      const tier = mod.default;
      const slug = TIER_ROUTES[tier.tier] ?? tier.tier.toLowerCase();
      items.push({
        id: `cosmos-${tier.tier}`,
        title: tier.name.primary,
        subtitle: tier.name.latin,
        description: tier.tagline,
        section: 'physics',
        href: `/universe-physics/universe/${slug}`,
      });
    }

    for (const mod of physicsMods) {
      const tier = mod.default;
      const slug = PHYSICS_ROUTES[tier.tier] ?? tier.tier.toLowerCase();
      items.push({
        id: `physics-${tier.tier}`,
        title: tier.name.primary,
        subtitle: tier.name.latin,
        description: tier.tagline,
        section: 'physics',
        href: `/universe-physics/physics/${slug}`,
      });
    }

    const events = eventsMod.EVENTS as Array<{
      year: number;
      title: string;
      desc: string;
    }>;
    for (const event of events) {
      items.push({
        id: `event-${event.title}`,
        title: event.title,
        subtitle: event.year < 0 ? `公元前${Math.abs(event.year)}年` : `${event.year}年`,
        description: event.desc,
        section: 'history',
        href: '/human-history/timeline',
      });
    }

    const thinkers = homeDataMod.THINKERS as ReadonlyArray<{
      name: string;
      latin: string;
      era: string;
    }>;
    for (const thinker of thinkers) {
      items.push({
        id: `thinker-${thinker.latin}`,
        title: thinker.name,
        subtitle: thinker.latin,
        description: thinker.era,
        section: 'philosophy',
        href: '/philosophy/thinkers',
      });
    }

    const schools = (homeDataMod.SCHOOLS ?? []) as ReadonlyArray<{
      title: string;
      subtitle: string;
      description: string;
    }>;
    for (const school of schools) {
      items.push({
        id: `school-${school.title}`,
        title: school.title,
        subtitle: school.subtitle,
        description: school.description,
        section: 'philosophy',
        href: '/philosophy/schools',
      });
    }
  } catch (err) {
    console.error('[GlobalSearch] Failed to load search index:', err);
  }

  return items;
}

function matchesQuery(item: SearchItem, lowerQuery: string): boolean {
  return (
    item.title.toLowerCase().includes(lowerQuery) ||
    (item.subtitle?.toLowerCase().includes(lowerQuery) ?? false) ||
    item.description.toLowerCase().includes(lowerQuery)
  );
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchIndex, setSearchIndex] = useState<SearchIndex>({ items: [], loaded: false });
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexLoadedRef = useRef(false);

  const ensureIndex = useCallback(() => {
    if (indexLoadedRef.current) return;
    indexLoadedRef.current = true;
    setLoading(true);
    loadSearchIndex().then((items) => {
      setSearchIndex({ items, loaded: true });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) ensureIndex();
          return !prev;
        });
      }
    }
    function handleOpen() {
      ensureIndex();
      setOpen(true);
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('open-global-search', handleOpen);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('open-global-search', handleOpen);
    };
  }, [ensureIndex]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return searchIndex.items.filter((item) => matchesQuery(item, lower));
  }, [query, searchIndex.items]);

  const grouped = useMemo(() => {
    const groups: Record<Section, SearchItem[]> = {
      physics: [],
      history: [],
      philosophy: [],
    };
    for (const item of filtered) {
      groups[item.section].push(item);
    }
    return groups;
  }, [filtered]);

  const flatResults = useMemo(() => {
    const result: SearchItem[] = [];
    for (const section of ['physics', 'history', 'philosophy'] as Section[]) {
      result.push(...grouped[section]);
    }
    return result;
  }, [grouped]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && flatResults[activeIndex]) {
        e.preventDefault();
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, flatResults, activeIndex]);

  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const handleQueryChange = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setQuery(value);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="gs-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="全站搜索"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="gs-panel">
        <div className="gs-input-wrap">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="gs-search-icon"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4.5 4.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="gs-input"
            placeholder="搜索宇宙物理、人类历史、哲学思想…"
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && flatResults[activeIndex]) {
                setOpen(false);
              }
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="gs-kbd">ESC</kbd>
        </div>

        <div className="gs-results" ref={listRef}>
          {loading && (
            <div className="gs-empty">正在加载搜索索引…</div>
          )}

          {!loading && !query.trim() && (
            <div className="gs-empty">
              输入关键词开始搜索
              <span className="gs-empty-hint">支持宇宙物理、人类历史、哲学思想</span>
            </div>
          )}

          {!loading && query.trim() && flatResults.length === 0 && (
            <div className="gs-empty">
              未找到「{query}」相关结果
              <span className="gs-empty-hint">试试其他关键词</span>
            </div>
          )}

          {(['physics', 'history', 'philosophy'] as Section[]).map((section) => {
            const sectionItems = grouped[section];
            if (sectionItems.length === 0) return null;
            const meta = SECTION_META[section];
            return (
              <div key={section} className="gs-group">
                <div className="gs-group-label" style={{ color: meta.color }}>
                  {meta.label}
                </div>
                {sectionItems.map((item) => {
                  flatIndex++;
                  const isActive = flatIndex === activeIndex;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="gs-item"
                      data-active={isActive}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                    >
                      <div className="gs-item-title">
                        {item.title}
                        {item.subtitle && (
                          <span className="gs-item-subtitle">{item.subtitle}</span>
                        )}
                      </div>
                      <div className="gs-item-desc">{item.description}</div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="gs-footer">
          <span><kbd className="gs-kbd-sm">↑↓</kbd> 导航</span>
          <span><kbd className="gs-kbd-sm">↵</kbd> 打开</span>
          <span><kbd className="gs-kbd-sm">esc</kbd> 关闭</span>
        </div>
      </div>
    </div>
  );
}
