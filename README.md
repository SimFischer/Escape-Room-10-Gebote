# Die Regenbogen-Kapelle – Fortschrittsversion

## Bei GitHub aktualisieren
ZIP entpacken. Alle Dateien sowie den vollständigen Ordner `assets` in das Hauptverzeichnis deines bestehenden Repositorys hochladen. Gleichnamige Dateien ersetzen. Die Pages-Einstellungen und der Klassenlink bleiben gleich.

Für ein neues Repository: Settings → Pages → Deploy from a branch → main → /(root) → Save. Anschließend den dort angezeigten Webseitenlink teilen.

## Was neu ist
- Das große Fenster im Hintergrund ist zunächst zerbrochen und farblos.
- Erst nach Abschluss aller elf Stationen wechselt die gesamte Kulisse zum reparierten, bunten Fenster.
- Eine Anzeige zählt die abgeschlossenen Stationen. Jede vollständig gelöste Station wird lokal gespeichert und bleibt nach einem Neuladen erledigt. Angefangene Stationen starten beim erneuten Öffnen von vorn.
- Keine Urkunde, keine Namenseingabe und keine Druckfunktion mehr.
- Fangspiel: richtig +1, falsch −1, mindestens 0. Ziel: 8 Punkte. Richtige Treffer färben den Bildschirm kurz grün, falsche rot. Zusätzlich gibt es Text und eine farbige Punkteanzeige.
- Bei reduzierter Bewegung wird die Bildschirmtönung ausgelassen. Text und Punkteanzeige bleiben erhalten. Im ruhigen Fangspiel können Begriffe nach einer kurzen Pause erneut angeklickt werden, sodass Punktabzüge ausgeglichen werden können.

## Dateien
`index.html`, `styles.css`, `adventure.css`, `script.js`, `minigames.js`, `.nojekyll`, diese Anleitung und `DESIGN.md`.
Im Ordner `assets` liegen beide erforderlichen Bilder: `kapelle-kaputt.png` und `kapelle.png`. Den Ordner mitsamt beiden Bildern hochladen.

## Spielstand
Die Fortschrittsversion verwendet `regenbogen_kapelle_v5` im lokalen Browser. Sie beginnt beim Wechsel von einer älteren Version neu. Es werden nur Stations- und Raumabschlüsse gespeichert, keine Namen. Über den Zurücksetzen-Knopf kann das Spiel wieder von vorn begonnen werden. Keine Konten oder zentralen Ergebnislisten; alle elf bisherigen Stationen einschließlich der drei zusätzlichen Lernspiele sind enthalten.

## Prüfung
Die kaputte Startkulisse wurde im Browser geprüft. Automatisch geprüft wurden Punktgewinn, Punktabzug, Untergrenze null, wiederholbare Begriffe im ruhigen Modus, einmaliger Spielabschluss sowie die Abschlussbedingung bei 10 beziehungsweise 11 gelösten Stationen. Der vollständige neue Ablauf bis zum Hintergrundwechsel wurde noch nicht erneut im Browser durchgespielt.
