'use client';

import { useEffect, useRef } from 'react';

export type GraphA11yAnnouncerProps = {
  nodeCount: number;
  edgeCount: number;
  selectedLabel?: string | null;
  selectedType?: string | null;
  selectedDomain?: string | null;
  filteredNodeCount?: number | null;
};

const DOMAIN_LABELS: Record<string, string> = {
  physics: '宇宙物理',
  history: '人类历史',
  philosophy: '哲学思想',
  'life-science': '生命科学',
};

export function GraphA11yAnnouncer({
  nodeCount,
  edgeCount,
  selectedLabel,
  selectedType,
  selectedDomain,
  filteredNodeCount,
}: GraphA11yAnnouncerProps) {
  const regionRef = useRef<HTMLDivElement>(null);
  const hasAnnouncedLoad = useRef(false);

  useEffect(() => {
    if (nodeCount > 0 && !hasAnnouncedLoad.current) {
      hasAnnouncedLoad.current = true;
      announce(`已加载 ${nodeCount} 个节点和 ${edgeCount} 条边`);
    }
  }, [nodeCount, edgeCount]);

  useEffect(() => {
    if (selectedLabel && selectedType && selectedDomain) {
      const domainLabel = DOMAIN_LABELS[selectedDomain] ?? selectedDomain;
      announce(`已选择：${selectedLabel}，类型：${selectedType}，属于：${domainLabel}`);
    }
  }, [selectedLabel, selectedType, selectedDomain]);

  useEffect(() => {
    if (filteredNodeCount !== null && filteredNodeCount !== undefined) {
      announce(`显示 ${filteredNodeCount} 个关联节点`);
    }
  }, [filteredNodeCount]);

  function announce(message: string) {
    if (!regionRef.current) return;
    regionRef.current.textContent = '';
    requestAnimationFrame(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
    });
  }

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
