import type { ReactNode } from 'react';

/** Kennzeichnet problematische Beispielsätze eindeutig als Beispiele. */
export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="disclaimer" role="note">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" className="disclaimer__icon">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v6M12 16.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
