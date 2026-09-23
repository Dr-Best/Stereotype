import { useEffect, useState } from 'react';
import type { Theme } from '../hooks/useTheme';
import { href } from '../hooks/useHashRoute';

export const navItems = [
  { page: 'begriffe', label: 'Begriffe verstehen' },
  { page: 'zusammenhaenge', label: 'Zusammenhänge' },
  { page: 'formen', label: 'Diskriminierungsformen' },
  { page: 'beispiele', label: 'Beispiele' },
  { page: 'quiz', label: 'Teste dein Wissen' },
] as const;

interface HeaderProps {
  currentPage: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ currentPage, theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Menü nach Navigation schließen
  useEffect(() => setMenuOpen(false), [currentPage]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isDark = theme === 'dark';

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#/" aria-label="Startseite: Stereotype, Vorurteile und Bias verstehen">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path d="M9 11h14M9 16h10M9 21h6" stroke="var(--color-on-accent)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand__text">Bias verstehen</span>
        </a>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
            title={isDark ? 'Helles Design' : 'Dunkles Design'}
          >
            {isDark ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="visually-hidden">{menuOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <nav id="main-nav" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Hauptnavigation">
          <ul>
            {navItems.map((item, index) => {
              const active = currentPage === item.page;
              return (
                <li key={item.page}>
                  <a href={href(item.page)} aria-current={active ? 'page' : undefined} className={active ? 'is-active' : undefined}>
                    <span className="main-nav__num" aria-hidden="true">
                      {index + 1}
                    </span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
