import Link from "next/link";

export type Era = {
  key: string;
  /** Time span as written by the domain, e.g. 「45—40 亿年前」. */
  range: string;
  title: string;
  description?: string;
  href?: string;
};

/**
 * 时代带：一个学科按时间切成的几段，横向排开，窄屏可横滑。生命科学、数学、宇宙学、
 * 人类历史共用，服务端渲染。
 */
export function EraStrip({
  id,
  title,
  note,
  eras,
}: {
  id: string;
  title: string;
  note?: string;
  eras: Era[];
}) {
  if (eras.length === 0) return null;
  return (
    <section className="landing-block" aria-labelledby={id}>
      <h2 id={id} className="landing-block__title">
        {title}
      </h2>
      {note ? <p className="landing-block__note">{note}</p> : null}
      <ol className="era-strip" tabIndex={0} aria-label={`${title}，可横向滚动`}>
        {eras.map((era) => {
          const body = (
            <>
              <span className="era-strip__range">{era.range}</span>
              <span className="era-strip__title">{era.title}</span>
              {era.description ? (
                <span className="era-strip__description">{era.description}</span>
              ) : null}
            </>
          );
          return (
            <li key={era.key} className="era-strip__era">
              {era.href ? (
                <Link href={era.href} className="era-strip__card">
                  {body}
                </Link>
              ) : (
                <div className="era-strip__card">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
