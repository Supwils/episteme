"use client";

// @ts-check

import { useEffect, useState } from "react";

export default function SearchTrigger() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleClick() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }

  const isMac = mounted && navigator.platform.toUpperCase().includes("MAC");

  return (
    <button className="nav-search-hint" onClick={handleClick} type="button">
      {isMac ? "⌘K" : "Ctrl+K"}
    </button>
  );
}
