import type { Metadata } from 'next';
import { TIER_ORDER, TIER_ROUTES } from '@/subjects/physics/lib/tier';
import UniverseTierPageClient from './UniverseTierPageClient';

export function generateStaticParams() {
  return TIER_ORDER.map((tierId) => ({ tier: TIER_ROUTES[tierId] }));
}

export const metadata: Metadata = {
  title: '宇宙尺度 — 宇宙物理 — Universe Knowledge',
  description: '探索不同宇宙尺度层级的结构与特征，从可观测宇宙到地球',
  openGraph: {
    title: '宇宙尺度 — 宇宙物理',
    description: '探索不同宇宙尺度层级的结构与特征，从可观测宇宙到地球',
    type: 'website',
  },
};

export default async function UniverseTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const resolvedParams = await params;
  return <UniverseTierPageClient params={resolvedParams} />;
}
