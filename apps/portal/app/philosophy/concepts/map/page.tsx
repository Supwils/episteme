import type { Metadata } from 'next';
import { ConceptMap } from '@/src-philosophy/components/visualizations/ConceptMap';

export const metadata: Metadata = {
  title: '哲学概念图谱 — Universe Knowledge',
  description: '交互式哲学概念关系图谱，可视化展示概念之间的对立、依赖与关联',
};

export default function ConceptMapPage() {
  return (
    <div className="flex h-screen flex-col bg-[#08080f] text-white">
      <header className="shrink-0 px-6 py-4 sm:px-10">
        <p className="text-fg-muted mb-1 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / concepts / map
        </p>
        <h1 className="font-display text-fg-primary text-xl tracking-tight sm:text-2xl">
          概念<em className="text-accent-gold italic"> 图谱</em>
        </h1>
      </header>
      <ConceptMap className="flex min-h-0 flex-1 flex-col" />
    </div>
  );
}
