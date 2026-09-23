import type { ConceptCard, DiscriminationForm } from '../types';

export const discriminationForms: DiscriminationForm[] = [
  {
    id: 'sexismus',
    name: 'Sexismus',
    definition: 'Benachteiligung aufgrund des Geschlechts oder zugeschriebener Geschlechterrollen.',
    example: 'Bei gleicher Qualifikation wird eine Bewerberin nicht befördert, weil man annimmt, sie werde bald in Elternzeit gehen.',
  },
  {
    id: 'rassismus',
    name: 'Rassismus',
    definition:
      'Benachteiligung oder Abwertung aufgrund rassifizierender Zuschreibungen, Hautfarbe, Herkunft oder Ethnisierung.',
    example: 'Eine Person wird wegen ihrer Hautfarbe an der Clubtür abgewiesen, während andere eingelassen werden.',
  },
  {
    id: 'antisemitismus',
    name: 'Antisemitismus',
    definition:
      'Feindselige, abwertende oder diskriminierende Einstellungen oder Handlungen gegenüber jüdischen Menschen bzw. dem Judentum.',
    example: 'Eine Schülerin wird wegen ihres jüdischen Glaubens auf dem Schulhof beleidigt und ausgegrenzt.',
  },
  {
    id: 'ableismus',
    name: 'Ableismus',
    definition:
      'Benachteiligung oder Abwertung von Menschen aufgrund tatsächlicher oder zugeschriebener Behinderungen.',
    example: 'Einem Rollstuhlnutzer wird eine Stelle nicht angeboten, obwohl der Arbeitsplatz leicht barrierefrei gestaltet werden könnte.',
    note: 'Ableismus ist der gebräuchliche deutsche Begriff. Im Englischen kommen „ableism“ und „disablism“ vor – je nach Kontext mit teilweise unterschiedlicher Schwerpunktsetzung.',
  },
  {
    id: 'ageismus',
    name: 'Ageismus / Altersdiskriminierung',
    definition: 'Benachteiligung aufgrund des Alters.',
    example: 'Eine 58-jährige Bewerberin wird mit der Begründung abgelehnt, das Team sei „jung und dynamisch“.',
    note: 'Betrifft ältere wie auch jüngere Menschen.',
  },
  {
    id: 'klassismus',
    name: 'Klassismus',
    definition:
      'Benachteiligung oder Abwertung aufgrund sozialer Herkunft, sozialer Lage oder gesellschaftlicher Klasse.',
    example: 'Ein Kind erhält trotz guter Noten keine Gymnasialempfehlung, weil man ihm „aus diesem Elternhaus“ wenig Unterstützung zutraut.',
  },
  {
    id: 'sexuelle-orientierung',
    name: 'Diskriminierung aufgrund sexueller Orientierung',
    definition: 'Benachteiligung z. B. gegenüber homosexuellen oder bisexuellen Menschen.',
    example: 'Ein Paar erhält eine Wohnung nicht, nachdem der Vermieter erfährt, dass es sich um zwei Männer handelt.',
  },
  {
    id: 'geschlechtliche-identitaet',
    name: 'Diskriminierung aufgrund geschlechtlicher Identität',
    definition: 'Benachteiligung z. B. gegenüber trans oder nichtbinären Menschen.',
    example: 'Einer trans Frau wird im Verein die Teilnahme an Angeboten verweigert, ohne dass es dafür eine sachliche Grundlage gibt.',
  },
  {
    id: 'religion',
    name: 'Religionsbezogene Diskriminierung',
    definition: 'Benachteiligung aufgrund tatsächlicher oder zugeschriebener Religionszugehörigkeit.',
    example: 'Einem Mitarbeiter wird ein religiöser Feiertag grundsätzlich verwehrt, während andere Urlaubswünsche problemlos genehmigt werden.',
  },
  {
    id: 'antimuslimischer-rassismus',
    name: 'Antimuslimischer Rassismus',
    definition: 'Abwertung oder Benachteiligung von Menschen, die als muslimisch wahrgenommen werden.',
    example: 'Eine Bewerberin mit Kopftuch wird trotz passender Qualifikation seltener zum Gespräch eingeladen.',
    note: 'Betroffen sein können auch Menschen, die gar nicht muslimisch sind, aber so wahrgenommen werden.',
  },
  {
    id: 'xenophobie',
    name: 'Xenophobie / Fremdenfeindlichkeit',
    definition: 'Ablehnung oder Abwertung von Menschen, die als fremd oder nicht zugehörig wahrgenommen werden.',
    example: 'Neu Zugezogene werden in der Nachbarschaft gemieden, weil sie „nicht von hier“ seien.',
  },
  {
    id: 'lookismus',
    name: 'Lookismus',
    definition: 'Benachteiligung aufgrund des Aussehens.',
    example: 'Bei gleicher Leistung erhalten Beschäftigte, die als attraktiver gelten, häufiger Kundenkontakt und Beförderungen.',
  },
  {
    id: 'gewicht',
    name: 'Gewichtsdiskriminierung',
    definition: 'Benachteiligung oder Abwertung aufgrund des Körpergewichts.',
    example: 'Einer Bewerberin wird ohne Prüfung unterstellt, sie sei weniger belastbar, weil sie mehrgewichtig ist.',
  },
  {
    id: 'nationalitaet',
    name: 'Diskriminierung aufgrund Nationalität oder Herkunft',
    definition: 'Benachteiligung aufgrund tatsächlicher oder zugeschriebener nationaler Herkunft.',
    example: 'Eine Wohnungsanfrage bleibt unbeantwortet, nachdem die Person ihre Staatsangehörigkeit angegeben hat.',
  },
  {
    id: 'sprache',
    name: 'Sprachbezogene Diskriminierung',
    definition: 'Benachteiligung aufgrund von Sprache, Dialekt oder Akzent.',
    example: 'Ein Bewerber mit starkem Dialekt wird als „weniger kompetent“ eingeschätzt, obwohl seine Fachkenntnisse überzeugen.',
  },
  {
    id: 'bildung',
    name: 'Bildungsbezogene Diskriminierung',
    definition: 'Benachteiligung aufgrund von Bildungsabschluss oder Bildungsbiografie.',
    example: 'Eine erfahrene Fachkraft wird für eine Projektleitung nicht berücksichtigt, nur weil sie kein Abitur hat.',
  },
];

export const intersectionality: ConceptCard = {
  id: 'intersektionalitaet',
  name: 'Intersektionalität',
  definition:
    'Intersektionalität beschreibt, dass unterschiedliche Diskriminierungsdimensionen gleichzeitig wirken und sich überschneiden können.',
  example:
    'Eine ältere Frau mit Behinderung kann Erfahrungen machen, die sich nicht allein durch Alter, Geschlecht oder Behinderung erklären lassen.',
  clarification:
    'Intersektionalität ist nicht einfach eine weitere Diskriminierungsform, sondern ein Konzept zur Betrachtung sich überschneidender Dimensionen.',
};
