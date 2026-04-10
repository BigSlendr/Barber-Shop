import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, description, action }: Props) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="space-y-3">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent/90">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        {description ? <p className="max-w-2xl text-brand-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
