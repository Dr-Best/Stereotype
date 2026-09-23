import { useEffect, type ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useHashRoute } from './hooks/useHashRoute';
import { useTheme } from './hooks/useTheme';
import { HomePage } from './pages/HomePage';
import { TermsPage } from './pages/TermsPage';
import { TermDetailPage } from './pages/TermDetailPage';
import { RelationsPage } from './pages/RelationsPage';
import { FormsPage } from './pages/FormsPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { QuizPage } from './pages/QuizPage';
import { NotFoundPage } from './pages/NotFoundPage';

const pageTitles: Record<string, string> = {
  '': 'Start',
  begriffe: 'Begriffe verstehen',
  zusammenhaenge: 'Zusammenhänge',
  formen: 'Diskriminierungsformen',
  beispiele: 'Beispiele',
  quiz: 'Teste dein Wissen',
};

export function App() {
  const route = useHashRoute();
  const [theme, toggleTheme] = useTheme();
  const routeKey = `${route.page}/${route.param ?? ''}`;

  // Seitenwechsel: Titel setzen, nach oben scrollen, Fokus auf die Hauptüberschrift
  useEffect(() => {
    const title = pageTitles[route.page] ?? 'Seite nicht gefunden';
    document.title = `${title} · Stereotype, Vorurteile & Bias verstehen`;
    window.scrollTo({ top: 0 });
    const isInitialLoad = !document.body.dataset.navigated;
    document.body.dataset.navigated = 'true';
    if (!isInitialLoad) {
      document.getElementById('page-title')?.focus({ preventScroll: true });
    }
  }, [routeKey, route.page]);

  let content: ReactNode;
  switch (route.page) {
    case '':
      content = <HomePage />;
      break;
    case 'begriffe':
      content = route.param ? <TermDetailPage termId={route.param} /> : <TermsPage />;
      break;
    case 'zusammenhaenge':
      content = <RelationsPage />;
      break;
    case 'formen':
      content = <FormsPage />;
      break;
    case 'beispiele':
      content = <ExamplesPage />;
      break;
    case 'quiz':
      content = <QuizPage />;
      break;
    default:
      content = <NotFoundPage />;
  }

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        Zum Inhalt springen
      </a>
      <Header currentPage={route.page} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1} className="main">
        <div className="page" key={routeKey}>
          {content}
        </div>
      </main>
      <Footer />
    </>
  );
}
