import type { Term } from '../types';

const DISCLAIMER_STEREOTYP =
  'Diese Aussagen sind Beispiele für Stereotype – keine Tatsachenbehauptungen.';
const DISCLAIMER_VORURTEIL =
  'Dies sind Beispiele für Vorurteile – keine Aussagen, die diese App unterstützt.';
const DISCLAIMER_CONSCIOUS =
  'Die Aussagen sind Beispiele für bewusste Voreingenommenheit – keine Aussagen, die diese App unterstützt.';

export const terms: Term[] = [
  {
    id: 'stereotyp',
    name: 'Stereotyp',
    subtitle: 'Die gedankliche „Schublade“',
    teaser: 'Eine verallgemeinernde Annahme über typische Merkmale einer Gruppe.',
    definition:
      'Ein Stereotyp ist eine verallgemeinernde Annahme bzw. Zuschreibung über typische Merkmale einer sozialen oder gesellschaftlichen Gruppe.',
    formula: 'Stereotyp = pauschale Zuschreibung',
    keyQuestion: 'Was schreibe ich einer Gruppe pauschal zu?',
    tableExample: '„Jugendliche hängen ständig am Smartphone.“',
    sections: [
      {
        heading: 'Das ist wichtig',
        bullets: [
          'Es handelt sich um eine gedankliche Vereinfachung – eine Art „Schublade“.',
          'Ein Stereotyp muss nicht von der gesamten Gesellschaft geteilt werden.',
          'Es kann positiv, negativ oder scheinbar neutral sein.',
          'Es bezieht sich typischerweise auf Gruppen von Menschen.',
          'Ein Stereotyp ist noch nicht zwingend eine persönliche Bewertung einer konkreten Person.',
        ],
      },
    ],
    exampleGroups: [
      {
        heading: 'Beispiele für Stereotype',
        examples: [
          '„Ältere Menschen sind weniger technikaffin.“',
          '„Frauen sind kommunikativer.“',
          '„Ingenieure denken besonders rational.“',
          '„Jugendliche hängen ständig am Smartphone.“',
          '„Menschen aus Großstädten sind hektischer.“',
        ],
        disclaimer: DISCLAIMER_STEREOTYP,
      },
    ],
    keySentences: ['Nicht jedes Stereotyp führt zu einem Vorurteil.'],
    keywords: ['Schublade', 'Zuschreibung', 'Verallgemeinerung', 'Klischee', 'Gruppe'],
  },
  {
    id: 'vorurteil',
    name: 'Vorurteil',
    subtitle: 'Die vorgefasste Bewertung',
    teaser: 'Eine bewertende Haltung – oft auf Basis von Stereotypen und ohne Prüfung im Einzelfall.',
    definition:
      'Ein Vorurteil ist eine vorgefasste, bewertende Haltung gegenüber einer Person oder Gruppe, häufig auf Grundlage von Stereotypen und ohne ausreichende individuelle Prüfung.',
    formula: 'Vorurteil = pauschale Bewertung',
    keyQuestion: 'Wie bewerte ich eine Person oder Gruppe aufgrund solcher Zuschreibungen?',
    tableExample: '„Ein junger Bewerber ist wahrscheinlich unzuverlässig.“',
    sections: [
      {
        heading: 'Der Unterschied zum Stereotyp',
        paragraphs: [
          'Ein Stereotyp beschreibt, was einer Gruppe zugeschrieben wird. Ein Vorurteil geht einen Schritt weiter: Es bewertet – häufig eine konkrete Person – auf Grundlage dieser Zuschreibung, ohne den Einzelfall wirklich zu prüfen.',
        ],
      },
    ],
    contrast: {
      leftLabel: 'Stereotyp',
      left: '„Ältere Menschen sind weniger technikaffin.“',
      rightLabel: 'Vorurteil',
      right: '„Dieser ältere Bewerber ist deshalb wahrscheinlich für den digitalen Arbeitsplatz ungeeignet.“',
    },
    exampleGroups: [
      {
        heading: 'Weitere Beispiele für Vorurteile',
        examples: [
          '„Eine Frau ist für diese Führungsposition zu emotional.“',
          '„Ein junger Bewerber ist wahrscheinlich unzuverlässig.“',
          '„Menschen mit Behinderung sind für anspruchsvolle Tätigkeiten weniger geeignet.“',
          '„Jemand aus dieser sozialen Gruppe wird vermutlich nicht in unser Team passen.“',
          '„Ein Mann ist für die Arbeit in einer Kita weniger geeignet.“',
        ],
        disclaimer: DISCLAIMER_VORURTEIL,
      },
    ],
    keySentences: ['Nicht jedes Vorurteil führt automatisch zu Diskriminierung.'],
    keywords: ['Bewertung', 'Haltung', 'Einstellung', 'vorgefasst', 'Urteil'],
  },
  {
    id: 'bias',
    name: 'Bias',
    subtitle: 'Verzerrung, Voreingenommenheit',
    teaser: 'Eine systematische Tendenz in Wahrnehmung, Denken oder Entscheidungen.',
    definition:
      'Bias bedeutet Verzerrung, Voreingenommenheit oder systematische Tendenz in Wahrnehmung, Denken oder Entscheidungen.',
    formula: 'Bias = Verzerrung in Wahrnehmung oder Entscheidung',
    keyQuestion: 'Welche Verzerrung beeinflusst meine Wahrnehmung oder Entscheidung?',
    tableExample: 'Die erste genannte Zahl beeinflusst alle weiteren Schätzungen (Ankereffekt).',
    sections: [
      {
        heading: 'Bias ist breiter als Vorurteil',
        paragraphs: [
          'Ein Bias kann sich auf soziale Gruppen beziehen und hängt dann oft mit Stereotypen oder Vorurteilen zusammen. Man spricht dann auch von sozialem Bias.',
          'Es gibt aber auch viele kognitive Biases, die überhaupt nichts mit sozialen Gruppen oder Diskriminierung zu tun haben. Sie beschreiben allgemeine Denkabkürzungen unseres Gehirns.',
        ],
      },
      {
        heading: 'Kognitive Biases – müssen keine Vorurteile sein',
        items: [
          {
            title: 'Confirmation Bias / Bestätigungsfehler',
            text: 'Menschen beachten bevorzugt Informationen, die ihre bereits vorhandene Meinung bestätigen.',
          },
          {
            title: 'Anchoring Bias / Ankereffekt',
            text: 'Eine zuerst genannte Zahl oder Information beeinflusst spätere Einschätzungen übermäßig stark.',
          },
          {
            title: 'Availability Bias / Verfügbarkeitsheuristik',
            text: 'Ereignisse, an die man sich leicht erinnert, erscheinen wahrscheinlicher oder häufiger.',
          },
          {
            title: 'Hindsight Bias / Rückschaufehler',
            text: 'Im Nachhinein erscheinen Ereignisse vorhersehbarer, als sie tatsächlich waren.',
          },
          {
            title: 'Overconfidence Bias / Selbstüberschätzung',
            text: 'Menschen überschätzen die Genauigkeit ihres Wissens oder ihrer Einschätzung.',
          },
        ],
      },
      {
        heading: 'Soziale Biases – können mit Vorurteilen verbunden sein',
        bullets: [
          'bevorzugte Einladung jüngerer Bewerberinnen und Bewerber',
          'unterschiedliche Kompetenzzuschreibung bei Männern und Frauen',
          'Bevorzugung von Personen mit ähnlichem Hintergrund („Similarity Bias“)',
          'automatische Annahmen über Menschen mit Behinderung',
          'unterschiedliche Bewertung gleicher Lebensläufe aufgrund eines Namens',
        ],
      },
    ],
    exampleGroups: [],
    keySentences: ['Nicht jeder Bias ist ein Vorurteil.'],
    keywords: [
      'Verzerrung',
      'kognitiv',
      'Ankereffekt',
      'Bestätigungsfehler',
      'Confirmation',
      'Anchoring',
      'Availability',
      'Hindsight',
      'Overconfidence',
      'Heuristik',
    ],
  },
  {
    id: 'conscious-bias',
    name: 'Conscious Bias',
    subtitle: 'Bewusste Voreingenommenheit',
    teaser: 'Die Person weiß um ihre Haltung, Präferenz oder Abneigung.',
    definition:
      'Ein Conscious Bias ist eine bewusste Voreingenommenheit. Die Person ist sich ihrer Haltung, Präferenz oder Abneigung bewusst.',
    formula: 'Conscious Bias = bewusste Voreingenommenheit',
    keyQuestion: 'Ist mir diese Voreingenommenheit bewusst?',
    tableExample: '„Ich traue Männern technische Aufgaben eher zu.“',
    sections: [
      {
        heading: 'Kein Parallelbegriff, sondern eine Eigenschaft',
        paragraphs: [
          '„Conscious“ und „Unconscious“ beschreiben vor allem, wie eine Verzerrung wirkt: bewusst oder unbewusst. Ein Conscious Bias kann also auf einem Stereotyp beruhen und ein Vorurteil enthalten – entscheidend ist, dass die Person ihre Voreingenommenheit kennt und oft auch offen ausspricht.',
        ],
      },
    ],
    exampleGroups: [
      {
        heading: 'Beispiele für Conscious Bias',
        examples: [
          '„Ich stelle lieber jüngere Mitarbeitende ein, weil ich ältere für weniger flexibel halte.“',
          '„Ich traue Männern technische Aufgaben eher zu.“',
          '„Ich möchte keine Person aus dieser Gruppe in meinem Team.“',
          '„Ich bevorzuge bewusst Bewerber mit einem bestimmten sozialen Hintergrund.“',
          '„Ich halte Menschen mit sichtbarer Behinderung grundsätzlich für weniger belastbar.“',
        ],
        disclaimer: DISCLAIMER_CONSCIOUS,
      },
    ],
    keywords: ['bewusst', 'explizit', 'Präferenz', 'Abneigung', 'absichtlich'],
  },
  {
    id: 'unconscious-bias',
    name: 'Unconscious Bias',
    subtitle: 'Unbewusste oder automatische Voreingenommenheit',
    teaser: 'Eine Verzerrung, die automatisch wirkt – oft ohne dass die Person es merkt.',
    definition:
      'Ein Unconscious Bias ist eine unbewusste oder automatische Verzerrung in Wahrnehmung oder Entscheidung. Die Person muss sich dieser Verzerrung nicht bewusst sein.',
    formula: 'Unconscious Bias = unbewusste oder automatische Voreingenommenheit',
    keyQuestion: 'Wirkt die Verzerrung automatisch oder unbewusst?',
    tableExample: 'Eine Führungskraft hält sich für neutral, lädt aber systematisch häufiger Jüngere ein.',
    sections: [
      {
        heading: 'Woran man ihn erkennt',
        paragraphs: [
          'Typisch ist ein Widerspruch zwischen Selbstbild und Verhalten: Die Person ist überzeugt, fair zu entscheiden – ein Muster in ihren Entscheidungen zeigt aber eine systematische Tendenz.',
        ],
      },
      {
        heading: 'Wichtig',
        paragraphs: [
          'Nicht jeder Unconscious Bias ist diskriminierend. Unbewusste kognitive Verzerrungen können auch völlig andere Entscheidungen betreffen – etwa, wie man Preise einschätzt oder Risiken bewertet.',
        ],
      },
    ],
    exampleGroups: [
      {
        heading: 'Beispiele für Unconscious Bias',
        examples: [
          'Eine Führungskraft hält sich für völlig neutral, lädt aber systematisch häufiger jüngere Bewerberinnen und Bewerber ein.',
          'Gleiche Aussagen werden bei einem Mann als „durchsetzungsstark“, bei einer Frau eher als „dominant“ wahrgenommen.',
          'Menschen bevorzugen Bewerbende, die ihnen selbst ähnlich sind.',
          'Ein ausländisch klingender Name beeinflusst unbewusst die Einschätzung eines ansonsten identischen Lebenslaufs.',
          'Eine Person mit Behinderung wird automatisch als hilfsbedürftig wahrgenommen, obwohl es dafür im konkreten Fall keine Grundlage gibt.',
        ],
      },
    ],
    keywords: ['unbewusst', 'implizit', 'automatisch', 'implicit'],
  },
  {
    id: 'diskriminierung',
    name: 'Diskriminierung',
    subtitle: 'Benachteiligung im Handeln, in Regeln oder Strukturen',
    teaser: 'Benachteiligung oder Ausgrenzung aufgrund tatsächlicher oder zugeschriebener Merkmale.',
    definition:
      'Diskriminierung bezeichnet eine Benachteiligung, Ungleichbehandlung oder Ausgrenzung von Menschen aufgrund tatsächlicher oder zugeschriebener Merkmale bzw. Gruppenzugehörigkeiten.',
    formula: 'Diskriminierung = Benachteiligung im Handeln oder in Strukturen',
    keyQuestion: 'Entsteht daraus eine Benachteiligung oder Ungleichbehandlung?',
    tableExample: 'Eine Bewerbung wird wegen des Alters der Person aussortiert.',
    sections: [
      {
        heading: 'Mehr als Denken',
        paragraphs: [
          'Diskriminierung beschreibt nicht nur Denken, sondern Benachteiligung im Handeln, in Regeln oder Strukturen.',
        ],
      },
      {
        heading: 'Drei Ebenen',
        items: [
          {
            title: 'Individuelle Diskriminierung',
            text: 'Benachteiligendes Verhalten einzelner Menschen – z. B. eine Vermieterin, die bestimmte Interessenten gar nicht erst zur Besichtigung einlädt.',
          },
          {
            title: 'Institutionelle Diskriminierung',
            text: 'Regeln, Verfahren oder Routinen einer Organisation führen zu Benachteiligungen – z. B. eine Stellenausschreibung, die ohne sachlichen Grund „perfektes Deutsch als Muttersprache“ verlangt.',
          },
          {
            title: 'Strukturelle Diskriminierung',
            text: 'Gesellschaftliche Strukturen oder historisch gewachsene Bedingungen führen systematisch zu unterschiedlichen Chancen – z. B. wenn Bildungserfolg stark vom Elternhaus abhängt.',
          },
        ],
      },
      {
        heading: 'Wichtig',
        paragraphs: [
          'Stereotype oder Vorurteile führen nicht automatisch zu Diskriminierung. Sie können aber Entscheidungen und Verhalten beeinflussen.',
        ],
      },
    ],
    exampleGroups: [],
    keySentences: ['Nicht jedes Vorurteil führt automatisch zu Diskriminierung.'],
    keywords: ['Benachteiligung', 'Ungleichbehandlung', 'Ausgrenzung', 'institutionell', 'strukturell', 'individuell'],
  },
];

export const termById = (id: string): Term | undefined => terms.find((t) => t.id === id);

/** Didaktische Merksätze, die an mehreren Stellen hervorgehoben werden. */
export const keySentences = {
  biasNotPrejudice: 'Nicht jeder Bias ist ein Vorurteil.',
  stereotypeNotPrejudice: 'Nicht jedes Stereotyp führt zu einem Vorurteil.',
  prejudiceNotDiscrimination: 'Nicht jedes Vorurteil führt automatisch zu Diskriminierung.',
} as const;
