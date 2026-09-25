import Link from "next/link";
import { pigmentVar } from "@/lib/design/palette";
import { domainCluster } from "@/lib/knowledge-geometry";
import { READING_PATHS } from "@/lib/reading-paths";
import { BookShelf, type ShelfBook } from "./BookShelf";

const PREVIEW_CHAPTERS = 4;

/** ④ 读完一个主题：每条阅读路线是一本书，书脊颜色是学科所属簇的颜料，刻度是章数。 */
export function ReadingShelf() {
  const books: ShelfBook[] = READING_PATHS.map((path) => {
    const cluster = domainCluster(path.domain);
    return {
      slug: path.slug,
      title: path.title,
      subtitle: path.subtitle,
      domainLabel: path.domainLabel,
      pigment: cluster ? pigmentVar(cluster) : "var(--brass)",
      chapterCount: path.steps.length,
      preview: path.steps.slice(0, PREVIEW_CHAPTERS).map((step) => step.title),
      startHref: `${path.steps[0]!.href}?path=${path.slug}&step=1`,
    };
  });

  return (
    <section className="home-section home-shelf" aria-labelledby="shelf-title">
      <header className="home-section__header">
        <h2 id="shelf-title" className="home-section__title">
          读完一个主题
        </h2>
        <p className="home-section__meta">
          {books.length} 条阅读路线，像读一本书那样从第一章读到最后一章
        </p>
        <Link href="/read" className="home-section__link">
          全部阅读路线 →
        </Link>
      </header>
      <BookShelf books={books} />
    </section>
  );
}
