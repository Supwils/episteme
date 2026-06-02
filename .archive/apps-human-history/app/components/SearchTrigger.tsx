'use client';

// @ts-check

import { useEffect, useState } from 'react';

export default function SearchTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'));
  }, []);

  function handleClick() {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    );
  }

  return (
    <button className="nav-search-hint" onClick={handleClick} type="button">
      {isMac ? '⌘K' : 'Ctrl+K'}
    </button>
  );
}
