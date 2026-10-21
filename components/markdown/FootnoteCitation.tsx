import { footnoteFragment, type FootnoteReference } from "./footnotes";

/** RSC may reach this node late; its metadata is already complete and immutable. */
export function FootnoteCitation({
  reference,
  label,
  title,
}: {
  reference: FootnoteReference;
  label: string;
  title: string;
}) {
  return (
    <a
      id={reference.anchor}
      href={footnoteFragment(reference.target)}
      className="text-accent-gold align-super font-mono text-xs"
      title={title}
    >
      [{label}]
    </a>
  );
}
