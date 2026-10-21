import { isSafeHref } from "@/lib/urls";
import { RegisteredImage } from "@/components/RegisteredImage";
import { MarkdownZoomableImage } from "./MarkdownInteractions";

// Match the whole destination before deciding whether an image stands alone.
// One balanced pair also covers source URLs such as illustration_(copy).png.
const IMAGE = /^!\[([^\]]*)\]\(((?:[^()]|\([^()]*\))+)\)/;

export function matchMarkdownImage(text: string): RegExpMatchArray | null {
  return text.match(IMAGE);
}

export function MarkdownImage({
  src,
  alt,
  accentColor = "#c8a45a",
  inline = false,
}: {
  src: string;
  alt: string;
  accentColor?: string;
  inline?: boolean;
}) {
  if (!isSafeHref(src)) return null;
  const registered = src.match(/^\/images\/([a-z0-9-]+)$/);
  if (registered) return <RegisteredImage id={registered[1]!} alt={alt} inline={inline} />;
  if (!inline) return <MarkdownZoomableImage src={src} alt={alt} accentColor={accentColor} />;
  return (
    // Legacy Markdown URLs may use hosts outside the image optimizer's allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="inline max-w-full rounded"
    />
  );
}
