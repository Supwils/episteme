import Link from "next/link";

export type DigestItem = { href: string; title: string; meta?: string };

function DigestList({
  id,
  title,
  items,
  more,
}: {
  id: string;
  title: string;
  items: DigestItem[];
  more?: { href: string; label: string };
}) {
  if (items.length === 0) return null;
  return (
    <section className="digest" aria-labelledby={id}>
      <h2 id={id} className="landing-block__title">
        {title}
      </h2>
      <ul className="digest__list">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="digest__item">
              <span className="digest__title">{item.title}</span>
              {item.meta ? <span className="digest__meta">{item.meta}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
      {more ? (
        <Link href={more.href} className="digest__more">
          {more.label}
        </Link>
      ) : null}
    </section>
  );
}

/** 页脚两栏：最近更新与研究前沿。哪一栏没有内容就不出现。 */
export function LandingDigest({
  domain,
  recent,
  frontier,
}: {
  domain: string;
  recent: DigestItem[];
  frontier: DigestItem[];
}) {
  if (recent.length === 0 && frontier.length === 0) return null;
  return (
    <div className="landing-digest">
      <DigestList id="landing-recent" title="最近更新" items={recent} />
      <DigestList
        id="landing-frontier"
        title="研究前沿"
        items={frontier}
        more={{ href: `/${domain}/frontier`, label: "全部前沿" }}
      />
    </div>
  );
}
