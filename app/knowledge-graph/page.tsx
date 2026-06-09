import type { Metadata } from 'next';
import { ALL_NODES, ALL_EDGES } from '@/src-knowledge-graph/data/graph-data';
import { KnowledgeGraphClient } from './KnowledgeGraphClient';
import './globals.css';

export const metadata: Metadata = {
  title: '知识图谱 — Universe Knowledge',
  description:
    '探索1600+知识单元之间的关联网络，从宇宙物理到人类历史，从哲学思想到生命科学',
};

export default function KnowledgeGraphPage() {
  return <KnowledgeGraphClient nodes={ALL_NODES} edges={ALL_EDGES} />;
}
