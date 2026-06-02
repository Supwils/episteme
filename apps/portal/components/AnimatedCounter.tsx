'use client';

import { useEffect, useState } from 'react';

export function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}
