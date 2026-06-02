import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function ContentRenderer({
  content,
  accentColor,
}: {
  content: string;
  accentColor?: string;
}) {
  return <MarkdownRenderer content={content} accentColor={accentColor} />;
}
