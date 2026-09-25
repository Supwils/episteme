"use client";

import Link from "next/link";
import { useId, useState } from "react";

export type ShelfBook = {
  slug: string;
  title: string;
  subtitle: string;
  domainLabel: string;
  pigment: string;
  chapterCount: number;
  preview: string[];
  startHref: string;
};

/** 书架：点一本书脊，把它「抽出来」——下方预览换成这本的章节目录与开始阅读。 */
export function BookShelf({ books }: { books: ShelfBook[] }) {
  const [open, setOpen] = useState(books[0]!.slug);
  const previewId = useId();
  const book = books.find((b) => b.slug === open) ?? books[0]!;

  return (
    <div className="book-shelf">
      <ul className="book-shelf__row" aria-label="阅读路线书架">
        {books.map((b) => (
          <li key={b.slug}>
            <button
              type="button"
              className="book-shelf__spine"
              aria-expanded={b.slug === open}
              aria-controls={previewId}
              onClick={() => setOpen(b.slug)}
              style={{
                ["--spine-color" as string]: b.pigment,
                ["--spine-height" as string]: `${Math.min(100, 62 + b.chapterCount * 2.4)}%`,
              }}
            >
              <span className="book-shelf__spine-title">{b.title}</span>
              <span className="book-shelf__ticks" aria-hidden="true">
                {Array.from({ length: Math.min(b.chapterCount, 18) }, (_, i) => (
                  <span key={i} />
                ))}
              </span>
              <span className="sr-only">，{b.chapterCount} 章</span>
            </button>
          </li>
        ))}
      </ul>

      <div
        id={previewId}
        className="book-shelf__preview"
        style={{ ["--spine-color" as string]: book.pigment }}
      >
        <p className="book-shelf__meta">
          {book.domainLabel} · {book.chapterCount} 章
        </p>
        <h3 className="book-shelf__title">{book.title}</h3>
        <p className="book-shelf__subtitle">{book.subtitle}</p>
        <ol className="book-shelf__chapters">
          {book.preview.map((chapter) => (
            <li key={chapter}>{chapter}</li>
          ))}
          {book.chapterCount > book.preview.length ? (
            <li className="book-shelf__more">…… 共 {book.chapterCount} 章</li>
          ) : null}
        </ol>
        <div className="book-shelf__actions">
          <Link href={book.startHref} className="book-shelf__start">
            从第一章开始读 →
          </Link>
          <Link href={`/read/${book.slug}`} className="book-shelf__toc">
            看完整目录
          </Link>
        </div>
      </div>
    </div>
  );
}
