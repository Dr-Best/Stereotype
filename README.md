# Stereotype, Vorurteile & Bias verstehen

Eine deutschsprachige, barrierearme Lern-Web-App zu **Stereotypen, Vorurteilen, Bias und Diskriminierung**.
Sie erklärt die Begriffe verständlich, macht Zusammenhänge sichtbar und testet in einem Quiz, ob man sie sicher unterscheiden kann.

## Installation & Start

Voraussetzung: [Node.js](https://nodejs.org/) ab Version 18.

1. `npm install`
2. `npm run dev`

Anschließend die angezeigte Adresse (standardmäßig http://localhost:5173) im Browser öffnen.

Weitere Befehle:

| Befehl              | Beschreibung                                     |
| ------------------- | ------------------------------------------------ |
| `npm run build`     | TypeScript-Prüfung und Produktions-Build (`dist/`) |
| `npm run preview`   | Produktions-Build lokal ansehen                  |
| `npm test`          | Tests für Quizlogik und Inhalte (Vitest)         |
| `npm run typecheck` | Nur TypeScript prüfen                            |

Der Build nutzt relative Pfade und Hash-Routing – der Inhalt von `dist/` funktioniert auf jedem statischen Webserver ohne weitere Konfiguration.

## Online veröffentlichen (GitHub Pages)

Der Workflow `.github/workflows/deploy.yml` baut und veröffentlicht die App automatisch bei jedem Push auf `main`.

1. Im Repository unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen.
2. Änderungen in `main` übernehmen (oder den Workflow unter **Actions** manuell starten).
3. Die App ist danach unter `https://<benutzername>.github.io/<repository>/` erreichbar.

## Inhalte

- **Begriffe verstehen** – Stereotyp, Vorurteil, Bias, Conscious Bias, Unconscious Bias, Diskriminierung (mit Suche und Detailansichten)
- **Zusammenhänge** – sozialer und kognitiver Weg zu verzerrten Entscheidungen, Merksätze, Vergleichstabelle
- **Diskriminierungsformen** – 16 Formen plus Karte zur Intersektionalität
- **Beispiele** – 38 Alltagssituationen mit Filter und Übungsmodus
- **Teste dein Wissen** – 62 Quizfragen in drei Schwierigkeitsgraden, 10 zufällige Fragen pro Runde ohne Wiederholung, Sofort-Feedback mit Erklärung und Abgrenzung, Auswertung, „Falsche Antworten wiederholen“

Fachlicher Grundsatz: *Conscious* und *Unconscious Bias* sind keine Parallelbegriffe zu Stereotyp und Vorurteil, sondern beschreiben vor allem, ob eine Verzerrung bewusst oder unbewusst wirkt. Der schwere Quizmodus übt genau diese Überschneidungen.

Zusatzfunktionen: Dark Mode, lokale Speicherung des letzten Quiz-Ergebnisses (nur im Browser), Tooltips, Fortschrittsbalken, dezente Übergänge (abgeschaltet bei `prefers-reduced-motion`).

## Barrierefreiheit

Tastaturbedienbar, sichtbarer Fokus, Skip-Link, Fokusführung bei Seitenwechsel und im Quiz, aussagekräftige aria-Labels, ausreichende Kontraste in hellem und dunklem Design, große Touch-Ziele auf Mobilgeräten.

## Projektstruktur

```
src/
├── data/          Inhalte als typisierte Objekte (Begriffe, Formen, Beispiele, Quizfragen)
├── logic/         Quizlogik ohne UI (Zufallsauswahl, Auswertung, Speicherung) + Tests
├── hooks/         Hash-Router, Theme, Quiz-Zustand (Reducer)
├── components/    Wiederverwendbare Bausteine (Header, Merksatz, Tooltip, Flussdiagramm, Quiz-Ansichten)
├── pages/         Seiten der Hauptnavigation
├── styles/        Globales CSS mit Design-Tokens
└── types.ts       TypeScript-Typen
```

Neue Quizfragen oder Beispiele werden ausschließlich in `src/data/` ergänzt; die Tests prüfen u. a. Mindestanzahlen, eindeutige IDs und gültige Antwortkategorien.

## Hinweis

Alle problematischen Aussagen in der App sind als Beispiele gekennzeichnet. Sie sind weder Tatsachenbehauptungen noch Positionen der App.
