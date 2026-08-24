type Citation = {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  doi?: string;
};

type DeepReadingSection = {
  title: string;
  content: string[];
};

export type DeepReadingProps = {
  introduction: string;
  sections: DeepReadingSection[];
  citations: Citation[];
};

export function DeepReading({ introduction, sections, citations }: DeepReadingProps) {
  return (
    <section className="mt-16">
      <h2 className="text-fg-primary mb-8 text-3xl font-bold" id="deep-reading">
        深度阅读
      </h2>

      <div className="text-fg-secondary mb-8 leading-relaxed">{introduction}</div>

      {sections.map((section, i) => (
        <div key={i} className="mb-8">
          <h3 className="text-fg-primary mb-4 text-xl font-semibold" id={`deep-section-${i}`}>
            {section.title}
          </h3>
          {section.content.map((p, j) => (
            <p key={j} className="text-fg-secondary mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      ))}

      {citations.length > 0 && (
        <div className="border-border-faint mt-12 border-t pt-8">
          <h3 className="text-fg-primary mb-4 text-lg font-semibold" id="citations">
            参考文献
          </h3>
          <ol className="space-y-2">
            {citations.map((cite, i) => (
              <li key={cite.id} className="text-fg-muted text-sm">
                [{i + 1}] {cite.authors} ({cite.year}). {cite.title}. <em>{cite.journal}</em>.
                {cite.doi && (
                  <a
                    href={`https://doi.org/${cite.doi}`}
                    className="text-accent-green ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DOI
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
