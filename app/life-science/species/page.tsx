import type { Metadata } from 'next';
import SpeciesClient from './SpeciesClient';

export const metadata: Metadata = {
  title: '物种图鉴 — 生命科学 — Universe Knowledge',
  description: '改变生命演化进程的关键物种图鉴，涵盖从太古宙到全新世的代表性物种',
  openGraph: {
    title: '物种图鉴 — 生命科学',
    description: '改变生命演化进程的关键物种图鉴，涵盖从太古宙到全新世的代表性物种',
    type: 'website',
  },
};

export default function SpeciesPage() {
  return <SpeciesClient />;
}
