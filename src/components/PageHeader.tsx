import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}

/** Seitenkopf. Die Überschrift erhält den Fokus nach einem Seitenwechsel (siehe App). */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 id="page-title" tabIndex={-1}>
        {title}
      </h1>
      {intro && <div className="page-header__intro">{intro}</div>}
    </header>
  );
}
