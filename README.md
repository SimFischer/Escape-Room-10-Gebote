# Die Regenbogen-Kapelle – Version 5.0

## Neu in Version 5.0: Die Schatzkammer mit drei Bonusspielen

Ein neuer Menüknopf „🎁 Bonusspiele“ führt in die Schatzkammer. Die Spiele sind freiwillige Belohnungen ohne Zeitlimit und lassen sich jederzeit verlassen.

- **Das Echo vom Sinai** (Merkspiel): Auf der Bergszene liegen zehn Steine mit Gebotssymbolen an zufälligen Plätzen. Das Echo ruft die Gebote in ihrer Reihenfolge – erst 1–2, dann 1–3 … bis 1–10. Die Kinder tippen die Folge nach und üben so nebenbei die Reihenfolge. Ruhiges oder flottes Tempo, Klang optional (standardmäßig aus), Hilfe-Leuchten nach zwei Fehlversuchen.
- **Der Aufstieg zum Gipfel** (Jump-and-Run): Jona steigt auf Moses Spuren auf den Berg und sammelt zehn Tafelfragmente. Steuerung mit Pfeiltasten/Leertaste oder Touch-Tasten. Keine Leben: Wer abrutscht, startet am letzten Steinmännchen. Pause bei Tab-Wechsel.
- **Das Kapellenfenster** (Puzzle & Glasmalerei): Das reparierte Fenster aus `kapelle.png` als 3×3-Puzzle, wahlweise „Tauschen“ (leicht) oder „Schieben“ (knifflig), optional mit Markierung richtiger Teile. Danach öffnet sich die Glaswerkstatt: ein Rosettenfenster mit 37 Scheiben frei ausmalen. Das Bild bleibt auf dem Gerät gespeichert.

**Freischaltung:** Echo nach 2, Aufstieg nach 4 geschafften Stationen des gewählten Lernwegs, das Fenster, wenn der ganze Lernweg geschafft ist. Im Dialog „Lernweg wählen“ kann die Lehrkraft mit „Bonusspiele sofort freigeben“ alles öffnen.

**Neue Dateien:** `bonus.js`, `bonus-echo.js`, `bonus-climb.js`, `bonus-window.js`, `bonus.css`. Geändert: `index.html` (Knopf und Einbindung) und `script.js` (kleine Schnittstelle, Lehrkraft-Freigabe, Knöpfe zur Schatzkammer). Keine neuen Bilder: Die Spiele nutzen `berg.png`, `kapelle.png` und `jona.png` und zeichnen alles Weitere mit Tintenkonturen im Stil der App. Spielstände aus V4 bleiben erhalten.

Ein illustriertes Lernabenteuer für Klasse 5 über die Zehn Gebote und das Doppelgebot der Liebe. Ohne Installation, Konto oder Druckaufgaben.

## Für GitHub

ZIP entpacken. Den gesamten Inhalt mit dem vollständigen Ordner `assets` ins Hauptverzeichnis des Repositorys hochladen. Gleichnamige Dateien ersetzen; nicht die ZIP selbst hochladen. `index.html` muss direkt im veröffentlichten Ordner liegen. Bei einer bestehenden GitHub-Pages-Seite bleiben deren Einstellungen und Klassenlink erhalten.

Für ein neues Repository GitHub Pages für den Branch mit diesen Dateien und den Hauptordner aktivieren. Den von GitHub Pages angezeigten Webseitenlink mit der Klasse teilen. Zum lokalen Ausprobieren `index.html` im Browser öffnen. Für zuverlässige Speicherung und Vollbild empfiehlt sich die veröffentlichte HTTPS-Seite.

## Bildschirmgrößen in Version 4.1

Die Spielansicht nutzt etwa 94–95 % der verfügbaren Breite, bis maximal 1800 Pixel. Schrift, Antworten und Tafeln wachsen auf großen Bildschirmen mit. iPad-Ansichten behalten großzügige Schaltflächen. Die neue Datei `responsive.css` muss mit hochgeladen werden. Vorhandene Spielstände aus V4 bleiben erhalten; nur beim Wechsel von V3 beginnt die neue Aufgabenfolge mit einem neuen Stand.

## Was sich geändert hat

- Elf überarbeitete Stationen mit kurzen Schritten, verständlichen Erklärungen, Hinweisen und bewusstem Weiterklicken. Keine Zeitlimits.
- Ganzes Abenteuer, Kurzweg mit sechs Stationen oder eigene Auswahl. Beide Räume sind frei zugänglich.
- Das alte Buch steht zuerst und ist in jeder Übung erreichbar. Es trennt Bibelinhalt, historischen Kontext und Beispiele für heute. Lutherische Zählung wird ausdrücklich genannt.
- Alle zehn Gebote an der Waage; neuntes und zehntes Gebot konsistent unterschieden. Tora, Befreiung aus Ägypten und jüdischer Kontext werden erklärt.
- Sorgenweg: sechs unterschiedliche, zufällig ausgewählte Situationen aus zwölf; drei Ratschläge. Richtige Position wechselt ohne einfaches Links-rechts-Muster. Figur steht dauerhaft still. Start mit drei Laststeinen, höchstens fünf; nach sechs Situationen gibt es bei Bedarf eine begrenzte Unterstützungsrunde.
- Prüfstein: zehn Aussagen in zufälliger Reihenfolge. Entdecken ohne Abzug oder Herausforderung mit zwei verlorenen Gravuren pro fehlerhafter Runde. Fehlende Gravuren werden am Ende ergänzt. Aussage, Entscheidung und Weiterknopf bleiben beieinander.
- Karten sind deutlich markiert; Tafelfragmente, Brücke, Schloss und Werkstatt zeigen Fortschritt in der Szene. Warme illustrierte Adventure-Gestaltung bleibt erhalten.
- Fenster erst nach allen elf Stationen vollständig repariert. Kurzwege erhalten ein eigenes Zwischenziel. Keine Urkunde und kein Drucken.
- Vollbild, Tastaturbedienung, schmale Ansichten, Wiederholen abgeschlossener Stationen und Speicherung innerhalb laufender Aufgaben.

## Spielstand und Datenschutz

Die neue Aufgabenfolge beginnt mit einem neuen Spielstand. Alte V3-Abschlüsse werden nicht übernommen. V4 speichert lokal im jeweiligen Browser unter `regenbogen_kapelle_v6` (interne Datenversion 4). Es gibt keine Namen, Konten oder zentrale Ergebnisübermittlung. Ein Geräte- oder Browserwechsel übernimmt den Stand nicht. Private Browserfenster können ihn beim Schließen löschen.

Die Schaltfläche oben rechts setzt nach Rückfrage den V4-Stand zurück. Bei gesperrtem Speicher erscheint ein Hinweis. Vollbild hängt vom Browser ab; der Knopf zeigt bei fehlender Unterstützung eine Alternative an.

## Dateien

- `index.html`: Einstieg und Grundstruktur.
- `core.js`, `content.js`, `curriculum.js`, `script.js`: Spiellogik und Lerninhalte.
- `fullscreen.js`: Vollbild.
- Sieben CSS-Dateien: Gestaltung und responsive Ansichten.
- `assets`: sechs Illustrationen.
- `UNTERRICHT.md`: Unterrichtsplanung, Quellen und didaktische Hinweise.
- `PRUEFUNG.md`: Prüfungen und verbleibende Grenzen.
- `DESIGN.md`: Herkunft und Gestaltung der Illustrationen.

Kein Build, kein Backend, keine extern geladenen Schriftarten oder Bibliotheken. Quellenlinks öffnen externe Webseiten erst beim Anklicken.

## Layoutkorrektur 4.2

Sprechblase am Sorgenweg oberhalb der Bildszene; keine Überlagerung der Gesichter. Gleichmäßig breite Stationskarten, zentrierte Überschrift und Einleitung. Auf schmalen Bildschirmen zwei Spalten und zentrierte letzte Einzelkarte. Spielstände aus V4 und V4.1 bleiben erhalten.
