import Link from "next/link";
import { DOMAINS, LATEST_UPDATES } from "@/lib/data";
import { RECENT_ARTICLES } from "@/lib/site-stats";

export function HomeUpdates() {
  return (
    <div className="home-today__column">
      <h3 className="home-today__heading">近期文章</h3>
      <ol className="home-today__updates">
        {RECENT_ARTICLES.map((article) => (
          <li key={article.url}>
            <Link href={article.url} className="home-today__update">
              <span className="home-today__pick-meta">
                <time dateTime={article.updated}>{article.updated}</time> ·{" "}
                {DOMAINS.find((domain) => domain.id === article.domain)?.title}
              </span>
              <span className="home-today__pick-title">{article.title}</span>
            </Link>
          </li>
        ))}
      </ol>
      <details className="home-today__milestones">
        <summary>版本里程碑</summary>
        <ol className="home-today__updates">
          {LATEST_UPDATES.slice(0, 3).map((update) => (
            <li key={update.id}>
              <Link href={update.href} className="home-today__update">
                <span className="home-today__pick-meta">
                  <time dateTime={update.date}>{update.date}</time> · {update.domain}
                </span>
                <span className="home-today__pick-title">{update.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
