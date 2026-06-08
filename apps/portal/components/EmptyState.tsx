import { EmptyState as BaseEmptyState, type EmptyStateProps as BaseEmptyStateProps } from "@universe/ui";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: "book" | "search" | "compass";
};

export function EmptyState({ title, description, actionLabel, actionHref, icon = "compass" }: EmptyStateProps) {
  return (
    <BaseEmptyState
      title={title}
      description={description}
      icon={icon}
      action={actionLabel && actionHref ? { label: actionLabel, href: actionHref } : undefined}
    />
  );
}
