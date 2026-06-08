// @vitest-environment happy-dom
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('framer-motion', () => ({
  useInView: () => true,
  useMotionValue: (init: number) => {
    let val = init;
    return {
      get: () => val,
      set: (v: number) => { val = v; },
      on: (_event: string, _cb: any) => () => {},
    };
  },
  useTransform: (_mv: any, fn: (v: number) => number) => ({
    on: (_event: string, cb: (v: number) => void) => {
      cb(fn(0));
      return () => {};
    },
  }),
  useReducedMotion: () => true,
  animate: (_val: any, _target: number, _opts?: any) => ({ stop: () => {} }),
  motion: {
    span: ({ children, ref, ...props }: any) => <span ref={ref} {...props}>{children}</span>,
  },
}));

import { DomainCard } from '../DomainCard';
import { AnimatedCounter } from '../AnimatedCounter';
import { ScrollToTop } from '../ScrollToTop';
import { MarkdownRenderer } from '../../src-philosophy/components/MarkdownRenderer';
import { DeepReading } from '../../src-life-science/components/DeepReading';
import { LifeStats } from '../../src-life-science/components/LifeStats';

afterEach(() => {
  cleanup();
});

const mockDomain = {
  id: 'philosophy' as const,
  title: '哲学思想',
  titleEn: 'PHILOSOPHY',
  description: '探索人类最深刻的思想',
  gradient: 'linear-gradient(135deg, #c8a45a, #e8d5a3)',
  glowColor: '#c8a45a',
  bgAccent: 'rgba(200,164,90,0.08)',
  borderAccent: 'rgba(200,164,90,0.15)',
  icon: <span>icon</span>,
  stats: '100+ 哲学家',
};

describe('DomainCard', () => {
  it('renders domain title', () => {
    render(<DomainCard domain={mockDomain} index={0} />);
    expect(screen.getByText('哲学思想')).toBeDefined();
  });

  it('renders domain description', () => {
    render(<DomainCard domain={mockDomain} index={0} />);
    expect(screen.getByText('探索人类最深刻的思想')).toBeDefined();
  });

  it('links to correct URL', () => {
    render(<DomainCard domain={mockDomain} index={0} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/philosophy');
  });

  it('renders English subtitle', () => {
    render(<DomainCard domain={mockDomain} index={0} />);
    expect(screen.getByText('PHILOSOPHY')).toBeDefined();
  });

  it('renders stats badge', () => {
    render(<DomainCard domain={mockDomain} index={0} />);
    expect(screen.getByText('100+ 哲学家')).toBeDefined();
  });

  it('renders explore CTA', () => {
    render(<DomainCard domain={mockDomain} index={0} />);
    expect(screen.getByText('进入探索')).toBeDefined();
  });
});

describe('AnimatedCounter', () => {
  it('renders with target value', () => {
    render(<AnimatedCounter target={42} />);
    expect(screen.getByLabelText('42')).toBeDefined();
  });

  it('renders with suffix', () => {
    render(<AnimatedCounter target={100} suffix="+" />);
    expect(screen.getByLabelText('100+')).toBeDefined();
  });

  it('renders the aria-label correctly', () => {
    render(<AnimatedCounter target={50} suffix="亿年" />);
    expect(screen.getByLabelText('50亿年')).toBeDefined();
  });
});

describe('ScrollToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('is hidden when not scrolled', () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('is visible after scrolling past threshold', () => {
    render(<ScrollToTop />);
    Object.defineProperty(window, 'scrollY', { value: 400 });
    fireEvent.scroll(window);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('has correct aria-label', () => {
    render(<ScrollToTop />);
    Object.defineProperty(window, 'scrollY', { value: 400 });
    fireEvent.scroll(window);
    expect(screen.getByLabelText('回到顶部')).toBeDefined();
  });

  it('calls scrollTo on click', () => {
    const scrollToSpy = vi.fn();
    vi.stubGlobal('scrollTo', scrollToSpy);
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));

    render(<ScrollToTop />);
    Object.defineProperty(window, 'scrollY', { value: 400 });
    fireEvent.scroll(window);

    fireEvent.click(screen.getByRole('button'));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});

describe('MarkdownRenderer', () => {
  it('renders h1 headings', () => {
    render(<MarkdownRenderer content="# Hello World" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Hello World' })).toBeDefined();
  });

  it('renders h2 headings', () => {
    render(<MarkdownRenderer content="## Section Title" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Section Title' })).toBeDefined();
  });

  it('renders h3 headings', () => {
    render(<MarkdownRenderer content="### Subsection" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Subsection' })).toBeDefined();
  });

  it('renders paragraphs', () => {
    render(<MarkdownRenderer content="This is a paragraph." />);
    expect(screen.getByText('This is a paragraph.')).toBeDefined();
  });

  it('renders bold text', () => {
    const { container } = render(<MarkdownRenderer content="This is **bold** text." />);
    const strong = container.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toBe('bold');
  });

  it('renders inline code', () => {
    const { container } = render(<MarkdownRenderer content="Use `console.log` for debugging." />);
    const code = container.querySelector('code');
    expect(code).not.toBeNull();
    expect(code!.textContent).toBe('console.log');
  });

  it('renders multiple paragraphs separated by blank lines', () => {
    const content = ['First paragraph.', 'Second paragraph.'].join('\n\n');
    const { container } = render(<MarkdownRenderer content={content} />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]!.textContent).toBe('First paragraph.');
    expect(paragraphs[1]!.textContent).toBe('Second paragraph.');
  });

  it('renders blockquotes', () => {
    const { container } = render(<MarkdownRenderer content="> A wise quote" />);
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).not.toBeNull();
  });

  it('renders unordered lists', () => {
    const { container } = render(<MarkdownRenderer content="- Item one\n- Item two" />);
    const ul = container.querySelector('ul');
    expect(ul).not.toBeNull();
  });

  it('renders horizontal rules', () => {
    const { container } = render(<MarkdownRenderer content="---" />);
    const hr = container.querySelector('[aria-hidden]');
    expect(hr).not.toBeNull();
  });
});

describe('DeepReading', () => {
  const defaultProps = {
    introduction: 'This is the introduction to the topic.',
    sections: [
      { title: 'Section One', content: ['Paragraph A.', 'Paragraph B.'] },
      { title: 'Section Two', content: ['Paragraph C.'] },
    ],
    citations: [
      {
        id: 'c1',
        authors: 'Smith et al.',
        year: 2020,
        title: 'A Great Paper',
        journal: 'Nature',
        doi: '10.1038/example',
      },
      {
        id: 'c2',
        authors: 'Jones',
        year: 2019,
        title: 'Another Paper',
        journal: 'Science',
      },
    ],
  };

  it('renders sections', () => {
    const { container } = render(<DeepReading {...defaultProps} />);
    const headings = container.querySelectorAll('h3');
    const sectionTitles = Array.from(headings).map((h) => h.textContent);
    expect(sectionTitles).toContain('Section One');
    expect(sectionTitles).toContain('Section Two');
    expect(screen.getByText('Paragraph A.')).toBeDefined();
    expect(screen.getByText('Paragraph C.')).toBeDefined();
  });

  it('renders introduction', () => {
    render(<DeepReading {...defaultProps} />);
    expect(screen.getByText('This is the introduction to the topic.')).toBeDefined();
  });

  it('renders citations', () => {
    const { container } = render(<DeepReading {...defaultProps} />);
    const citationList = container.querySelector('ol');
    expect(citationList).not.toBeNull();
    const citationItems = citationList!.querySelectorAll('li');
    expect(citationItems.length).toBe(2);
  });

  it('renders DOI links', () => {
    render(<DeepReading {...defaultProps} />);
    const doiLinks = screen.getAllByText('DOI');
    expect(doiLinks.length).toBe(1);
    expect(doiLinks[0]!.getAttribute('href')).toBe('https://doi.org/10.1038/example');
  });

  it('renders heading "深度阅读"', () => {
    render(<DeepReading {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 2, name: '深度阅读' })).toBeDefined();
  });

  it('renders heading "参考文献"', () => {
    render(<DeepReading {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3, name: '参考文献' })).toBeDefined();
  });

  it('renders without citations', () => {
    const { container } = render(
      <DeepReading
        introduction="Intro"
        sections={[{ title: 'Sec', content: ['P'] }]}
        citations={[]}
      />,
    );
    const citationHeading = container.querySelector('#citations');
    expect(citationHeading).toBeNull();
  });
});

describe('LifeStats', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all stat items', () => {
    render(<LifeStats />);
    expect(screen.getByText('地质时代')).toBeDefined();
    expect(screen.getByText('物种记录')).toBeDefined();
    expect(screen.getByText('大灭绝事件')).toBeDefined();
    expect(screen.getByText('科学家')).toBeDefined();
    expect(screen.getByText('生命演化跨度')).toBeDefined();
  });

  it('renders stat icons', () => {
    const { container } = render(<LifeStats />);
    const icons = container.querySelectorAll('.text-xl');
    expect(icons.length).toBe(5);
    expect(icons[0]!.textContent).toBe('🌍');
    expect(icons[1]!.textContent).toBe('🦕');
    expect(icons[2]!.textContent).toBe('💥');
    expect(icons[3]!.textContent).toBe('🔬');
    expect(icons[4]!.textContent).toBe('⏳');
  });

  it('renders stat aria-labels with suffixes', () => {
    render(<LifeStats />);
    expect(screen.getByLabelText('8个')).toBeDefined();
    expect(screen.getByLabelText('50+')).toBeDefined();
    expect(screen.getByLabelText('5次')).toBeDefined();
    expect(screen.getByLabelText('20+')).toBeDefined();
    expect(screen.getByLabelText('40亿年')).toBeDefined();
  });
});
