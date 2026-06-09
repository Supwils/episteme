'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/economics/economists', label: '经济学家', num: '01', key: 'economists' },
  { href: '/economics/theories', label: '理论', num: '02', key: 'theories' },
  { href: '/economics/concepts', label: '概念', num: '03', key: 'concepts' },
  { href: '/economics/case-studies', label: '案例', num: '04', key: 'case-studies' },
  { href: '/economics/schools', label: '学派', num: '05', key: 'schools' },
  { href: '/economics/simulations', label: '模拟器', num: '06', key: 'simulations' },
  { href: '/economics/debates', label: '大争论', num: '07', key: 'debates' },
  { href: '/economics/dialogues', label: '对话', num: '08', key: 'dialogues' },
];

function getActiveKey(pathname: string): string {
  const segment = pathname.replace('/economics/', '').replace('/economics', '');
  return segment || '';
}

export default function EconomicsNav() {
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <nav className="economics-nav-bar" aria-label="经济学导航">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link
          href="/"
          className="economics-nav-link"
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-fg-muted)',
            gap: '4px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          首页
        </Link>
        <Link href="/economics" className="economics-nav-brand">
          经济学
        </Link>
      </div>
      <div className="economics-nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`economics-nav-link${activeKey === item.key ? ' active' : ''}`}
            data-page={item.key}
          >
            <span className="economics-nav-num">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
