# Die Regenbogen-Kapelle – Bergprüfung

## Bei GitHub aktualisieren
ZIP entpacken. Alle Dateien sowie den vollständigen Ordner `assets` in das Hauptverzeichnis deines bestehenden Repositorys hochladen. Gleichnamige Dateien ersetzen. Die Pages-Einstellungen und der Klassenlink bleiben gleich. Nicht nur die ZIP hochladen.

Für ein neues Repository: Settings → Pages → Deploy from a branch → main → /(root) → Save. Anschließend den dort angezeigten Webseitenlink teilen.

## Der neue Prüfstein
- Eine illustrierte Bergszene mit zwei Steintafeln und Sprechblasen aus dem Himmel.
- Echte Gebote und heutige Umschreibungen wechseln sich mit verfälschten Aussagen ab.
- Eine richtige Auswahl graviert ein bisher fehlendes Gebot ein. Ziel: zehn unterschiedliche Gebote.
- Eine falsche Auswahl entfernt die letzten zwei Gravuren (bei null oder einer Gravur entsprechend weniger). Die entfernten Gebote können wieder gesammelt werden.
- Richtige Treffer geben grünes, falsche rotes Feedback und eine Erklärung. Bei reduzierter Bewegung entfällt die Bildschirmtönung.
- Falsche Aussagen vorbeiziehen lassen. Verpasste richtige Aussagen kommen wieder; dafür gibt es keinen Abzug.
- Nach jeder Aussage bleibt Zeit zum Lesen der Rückmeldung. Mit „Nächste Wolke“ geht es weiter. Pause und „Ohne Zeitdruck spielen“ sind verfügbar.
- Erst mit „Station abschließen“ wird die erfolgreich bestandene Bergprüfung gespeichert.

## Weiterhin enthalten
Alle elf Stationen einschließlich Rucksack, Brücke und Versöhnungswerkstatt. Das große Fenster bleibt bis zum Abschluss aller Stationen kaputt und farblos. Danach erscheint es repariert und bunt. Keine Urkunde, Namenseingabe oder Druckfunktion.

## Dateien
`index.html`, `styles.css`, `adventure.css`, `mountain.css`, `script.js`, `minigames.js`, `mountain.js`, `.nojekyll`, diese Anleitung und `DESIGN.md`.
Im Ordner `assets` liegen drei erforderliche Bilder: `kapelle-kaputt.png`, `kapelle.png` und `berg.png`. Alle drei mit hochladen. Kein Build und keine Installation erforderlich.

## Spielstand
Die Seite speichert abgeschlossene Stationen lokal im jeweiligen Browser unter `regenbogen_kapelle_v5`. Angefangene Stationen starten beim erneuten Öffnen von vorn. Beim Aktualisieren der bisherigen Fortschrittsversion bleiben andere Stationsabschlüsse erhalten; die neue Bergprüfung muss einmal neu bestanden werden. Über den Zurücksetzen-Knopf beginnt das Spiel von vorn. Keine Konten oder zentralen Ergebnislisten.

## Prüfung
Die Bergprüfung wurde im Browser bis zu allen zehn Gravuren durchgespielt, einschließlich eines absichtlichen Fehlers mit Abzug von zwei Gravuren, erneutem Sammeln und gespeichertem Stationsabschluss nach Neuladen. Die Smartphoneansicht wurde bei 390 Pixeln Breite geprüft. Automatische Logikprüfungen decken doppelte Einträge, Untergrenze null, Abzug der letzten zwei Einträge und erneutes Vervollständigen ab. Der vollständige Ablauf aller anderen Stationen wurde für diese Änderung nicht erneut durchgespielt.
