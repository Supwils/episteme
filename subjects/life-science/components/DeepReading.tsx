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
      <h2 className="text-3xl font-bold text-white mb-8" id="deep-reading">
        深度阅读
      </h2>

      <div className="mb-8 text-white/70 leading-relaxed">{introduction}</div>

      {sections.map((section, i) => (
        <div key={i} className="mb-8">
          <h3
            className="text-xl font-semibold text-white mb-4"
            id={`deep-section-${i}`}
          >
            {section.title}
          </h3>
          {section.content.map((p, j) => (
            <p key={j} className="text-white/60 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      ))}

      {citations.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3
            className="text-lg font-semibold text-white mb-4"
            id="citations"
          >
            参考文献
          </h3>
          <ol className="space-y-2">
            {citations.map((cite, i) => (
              <li key={cite.id} className="text-white/50 text-sm">
                [{i + 1}] {cite.authors} ({cite.year}). {cite.title}.{" "}
                <em>{cite.journal}</em>.
                {cite.doi && (
                  <a
                    href={`https://doi.org/${cite.doi}`}
                    className="text-emerald-400 ml-1"
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
