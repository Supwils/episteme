import Link from 'next/link';

export function BackToHomeButton() {
  return (
    <Link
      href="/"
      className="fixed top-16 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
      aria-label="返回首页"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white/70"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <polyline points="9 21 9 14 15 14 15 21" />
      </svg>
    </Link>
  );
}
