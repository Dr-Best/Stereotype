import { useEffect, useState } from 'react';

export interface Route {
  /** Erster Pfadabschnitt, z. B. "begriffe" */
  page: string;
  /** Optionaler zweiter Abschnitt, z. B. die Begriffs-ID */
  param?: string;
}

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  const [page = '', param] = clean.split('/').map((part) => decodeURIComponent(part));
  return { page, param: param || undefined };
}

export function href(page: string, param?: string): string {
  return param ? `#/${page}/${encodeURIComponent(param)}` : `#/${page}`;
}

/** Minimaler Hash-Router: funktioniert ohne Server-Konfiguration und ohne zusätzliche Dependency. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
