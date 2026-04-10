import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, description, action }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow ? <p className="text-sm uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h2>
        {description ? <p className="mt-3 max-w-2xl text-brand-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
