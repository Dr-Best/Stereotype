import { PageHeader } from '../components/PageHeader';

export function NotFoundPage() {
  return (
    <>
      <PageHeader title="Seite nicht gefunden" intro={<p>Diese Seite gibt es leider nicht.</p>} />
      <a className="button button--primary" href="#/">
        Zur Startseite
      </a>
    </>
  );
}
