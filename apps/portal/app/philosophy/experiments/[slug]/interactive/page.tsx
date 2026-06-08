import type { Metadata } from 'next';
import { getExperimentSlugs } from '@/lib/experiments';
import InteractiveExperimentClient from './InteractiveExperimentClient';

export function generateStaticParams() {
  return getExperimentSlugs().map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  title: '互动思想实验 — 哲学思想 — Universe Knowledge',
  description: '交互式哲学思想实验，亲身体验电车难题、洞穴比喻等经典哲学问题',
  openGraph: {
    title: '互动思想实验 — 哲学思想',
    description: '交互式哲学思想实验，亲身体验电车难题、洞穴比喻等经典哲学问题',
    type: 'website',
  },
};

export default function InteractiveExperimentPage() {
  return <InteractiveExperimentClient />;
}
