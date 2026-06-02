'use client';

// @ts-check

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { EVENTS } from '@/data/events';
import { FIGURES } from '@/data/figures';
import { SCHOLARLY_TITLES } from '@/data/scholarly-titles';

interface SearchItem {
  type: string;
  label: string;
  sub: string;
  desc: string;
  href: string;
  search: string;
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const f of FIGURES) {
    items.push({
      type: '人物',
      label: f.name,
      sub: f.title,
      desc: f.desc,
      href: `/figures?name=${encodeURIComponent(f.name)}`,
      search: `${f.name} ${f.title} ${f.desc} ${f.era} ${f.region}`,
    });
  }

  for (const ev of EVENTS) {
    const yearStr = ev.year < 0 ? `前${Math.abs(ev.year)}` : String(ev.year);
    items.push({
      type: '事件',
      label: ev.title,
      sub: `${yearStr}年`,
      desc: ev.desc,
      href: `/timeline?event=${encodeURIComponent(ev.title)}`,
      search: `${ev.title} ${ev.desc} ${ev.era} ${ev.region} ${ev.cat}`,
    });
  }

  for (const title of SCHOLARLY_TITLES) {
    if (EVENTS.some((ev) => ev.title === title)) continue;
    items.push({
      type: '讲稿',
      label: title,
      sub: '深度讲稿',
      desc: '深度阅读 · 5页讲稿',
      href: `/scholarly/${encodeURIComponent(title)}`,
      search: `${title} 深度讲稿`,
    });
  }

  return items;
}

function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const tokens = query.trim().split(/\s+/);
  let result = text;
  for (const t of tokens) {
    const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
  }
  return result;
}

function truncate(text: string, max: number): string {
  if (!text || text.length <= max) return text;
  return text.slice(0, max) + '…';
}

export default function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => buildIndex(), []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return [];
    const tokens = q.split(/\s+/);
    return searchIndex
      .filter((item) => tokens.every((t) => item.search.toLowerCase().includes(t)))
      .slice(0, 25);
  }, [debouncedQuery, searchIndex]);

  const grouped = useMemo(() => {
    const map: Record<string, SearchItem[]> = {};
    for (const r of results) {
      if (!map[r.type]) map[r.type] = [];
      map[r.type].push(r);
    }
    return map;
  }, [results]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setDebouncedQuery('');
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && open) {
        close();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function handleSelect(item: SearchItem) {
    close();
    router.push(item.href);
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) close();
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="gs-overlay open"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="全局搜索"
    >
      <div className="gs-box">
        <input
          ref={inputRef}
          className="gs-input"
          type="search"
          placeholder="搜索人物、事件、深度讲稿…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <div className="gs-list">
          {!debouncedQuery.trim() ? (
            <div className="gs-empty">输入关键词搜索人物、事件和深度讲稿</div>
          ) : results.length === 0 ? (
            <div className="gs-empty">未找到 &ldquo;{debouncedQuery}&rdquo; 的相关结果</div>
          ) : (
            Object.entries(grouped).map(([type, items]) => (
              <div key={type} className="gs-section">
                <div className="gs-section-label">{type}</div>
                {items.map((item) => (
                  <button
                    key={`${item.type}-${item.label}`}
                    className="gs-result"
                    onClick={() => handleSelect(item)}
                    type="button"
                  >
                    <div className="gs-result-head">
                      <span
                        className="gs-result-label"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(item.label, debouncedQuery),
                        }}
                      />
                      <span className="gs-result-sub">{item.sub}</span>
                    </div>
                    <p
                      className="gs-result-desc"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(truncate(item.desc, 100), debouncedQuery),
                      }}
                    />
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
