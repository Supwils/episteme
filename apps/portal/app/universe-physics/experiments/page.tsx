import type { Metadata } from 'next';
import ExperimentsClient from './ExperimentsClient';

export const metadata: Metadata = {
  title: '经典科学实验 — 宇宙物理 — Universe Knowledge',
  description: '交互式动画重现改变世界的经典科学实验，涵盖力学、量子、电磁、天体等领域',
  openGraph: {
    title: '经典科学实验 — 宇宙物理',
    description: '交互式动画重现改变世界的经典科学实验，涵盖力学、量子、电磁、天体等领域',
    type: 'website',
  },
};

export default function ExperimentsPage() {
  return <ExperimentsClient />;
}
