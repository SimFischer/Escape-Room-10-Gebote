# Die Regenbogen-Kapelle – Adventure-Version 2

## Auf GitHub aktualisieren
ZIP entpacken. Den gesamten Inhalt (einschließlich des vollständigen Ordners `assets`) in das Hauptverzeichnis des bestehenden Repositorys hochladen und gleichnamige Dateien ersetzen. Nicht die ZIP selbst hochladen. Die bisherigen GitHub-Pages-Einstellungen und der Klassenlink bleiben gleich.

Bei einem neuen Repository: Settings → Pages → Deploy from a branch → main → /(root) → Save. Den dort angezeigten Webseitenlink mit der Klasse teilen.

## Änderungen
- Sorgenweg: Die Figur steht dauerhaft still. Es gibt keinen Bewegungsschalter. Der Rucksack ändert weiterhin seine Größe entsprechend der Last.
- Zwölf verschiedene Situationen werden zufällig gemischt. Vor Wiederholungen wird der gesamte Vorrat durchlaufen; auch zwischen zwei Durchläufen wiederholt sich keine Situation direkt.
- Start mit drei Sorgen; hilfreicher Rat −1, unpassender Rat +1. Bei null Sorgen kann die Station abgeschlossen werden. Die erste richtige Antwortseite ist zufällig, danach wechseln die Seiten von Runde zu Runde.
- Auch bei den Auswahlfragen wie der Schriftrolle ist die richtige Antwort nicht immer an erster Stelle. Nach einer richtigen Antwort wechselt ihre Position.
- Prüfstein: „Vorbeiziehen lassen“ steht jetzt oben, direkt vor dem Himmel mit der Sprechblase. Richtige Gebote gravieren die Steintafeln, falsche Treffer entfernen die letzten zwei Gravuren.
- Das alte Buch ist der erste, hervorgehobene Punkt in jedem Raum. Ein Schnellverweis öffnet es während jeder Übung über der laufenden Aufgabe. Auswahl und Fortschritt bleiben erhalten. Eine laufende Bergprüfung wird beim Nachschlagen pausiert.
- Alle elf Stationen haben illustrierte Motive. Neun neue Szenen ergänzen Bergprüfung und Sorgenweg; passende Papier-, Stein-, Metall- und Holzgestaltung unterstützt die Aufgaben.
- Erst nach allen elf Stationen erstrahlt das kaputte Kapellenfenster wieder. Keine Urkunde und keine Druckfunktion.

## Dateien
HTML: `index.html`.
Stile: `styles.css`, `adventure.css`, `mountain.css`, `backpack.css`, `stations.css`.
Spiel: `script.js`, `minigames.js`, `mountain.js`, `backpack.js`.
Bilder: `assets/kapelle.png`, `assets/kapelle-kaputt.png`, `assets/berg.png`, `assets/sorgenweg.png`, `assets/jona.png`, `assets/stationen.png`.
Außerdem `.nojekyll`, `README.md` und `DESIGN.md` mit Bildprompts. Kein Build, keine Installation und kein Backend nötig.

## Spielstand
Abgeschlossene Stationen werden nur im jeweiligen Browser unter `regenbogen_kapelle_v5` gespeichert. Vorhandene Abschlüsse dieser Stationen bleiben bei diesem Update erhalten. Angefangene Stationen werden beim Verlassen oder Neuladen neu begonnen. Über den Zurücksetzen-Knopf lässt sich neu starten. Keine Namen, Konten oder zentralen Ergebnislisten.

## Geprüft
Automatische Prüfungen: zwölf verschiedene Situationen pro Mischdurchlauf, zufällige Starts, wechselnde richtige Antwortseiten, Plus-/Minuspunkte und Untergrenze null. Browserprüfungen: ruhige Figur ohne Schalter, Seitenwechsel nach richtiger Antwort, altes Buch ohne Verlust einer ausgewählten Situationskarte, Steuerung über der Prüfstein-Sprechblase sowie Desktop- und Smartphoneansichten. Die vollständige Lösung aller elf Stationen wurde bei diesem Update nicht erneut durchgespielt.
