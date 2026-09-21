# Die Regenbogen-Kapelle

Interaktiver Rätselraum für die 5. Klasse zu den Zehn Geboten und zum Doppelgebot der Liebe. Eigenständige Fassung des bereitgestellten Claude-Artefakts; läuft ohne Claude-Konto, zusätzliche Bibliotheken oder Build-Schritt.

## Auf GitHub hochladen und teilen

1. Die ZIP-Datei auf deinem Computer entpacken.
2. Auf GitHub ein neues **öffentliches Repository** erstellen, zum Beispiel `regenbogen-kapelle`. Du kannst dabei eine README anlegen lassen, damit der Branch `main` bereits existiert.
3. Im Repository **Add file → Upload files** öffnen. Die Dateien aus dem entpackten Ordner hochladen und mit **Commit changes** speichern. Wichtig: `index.html`, `styles.css`, `script.js` und `minigames.js` müssen direkt im Hauptverzeichnis nebeneinander liegen, nicht in einem weiteren Unterordner. Die ZIP-Datei selbst wird nicht als Webseite ausgeführt. Die README kann durch diese Anleitung ersetzt werden. `.nojekyll` ist beigefügt; falls dein Dateidialog sie ausblendet, funktioniert diese einfache Seite auch ohne sie.
4. **Settings → Pages** öffnen. Unter **Build and deployment → Source** die Option **Deploy from a branch** wählen. Branch **main**, Ordner **/(root)** auswählen und **Save** klicken.
5. Sobald die Veröffentlichung abgeschlossen ist, zeigt GitHub unter **Settings → Pages** den Link zur Webseite. Diesen Link mit der Klasse teilen. Bei dem vorgeschlagenen Repositorynamen hat er normalerweise das Muster `https://DEIN-GITHUB-NAME.github.io/regenbogen-kapelle/` – den tatsächlichen Link aus GitHub kopieren.

Die Schülerinnen und Schüler benötigen weder ein GitHub- noch ein Claude-Konto. Zum Aktualisieren die geänderten Dateien erneut hochladen; die Pages-Adresse bleibt gleich.

Offizielle Anleitung: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Enthaltene Dateien

- `index.html`: Startseite, Navigation und Abschlussurkunde.
- `styles.css`: Farben, Layout, Animationen, mobile Ansicht und Druckansicht.
- `script.js`: Aufgaben, Lösungen, Spiellogik und lokale Speicherung.
- `minigames.js`: Brücke der Nächstenliebe, unsichtbarer Rucksack und Versöhnungs-Werkstatt.
- `.nojekyll`: kennzeichnet die Veröffentlichung als statische Webseite.
- `README.md`: diese Anleitung.

Zum lokalen Ausprobieren `index.html` im Browser öffnen. Die lokale Speicherung bei direkt geöffneten Dateien hängt vom Browser ab; auf GitHub Pages ist sie an die Webseitenadresse gebunden.

## Spiel und Speicherung

Zwei Räume mit insgesamt elf Stationen, jeweils einem Hilfebuch und einem Ausgang. Aufgabenarten: Multiple Choice, Reihenfolge, Zuordnung, Fangspiel, Zahlenschloss und drei neue Lernspiele. Sind alle Gegenstände eines Raums gelöst, wird sein Ausgang freigeschaltet. Nach beiden Räumen erscheinen das farbige Fenster und die druckbare Urkunde.

### Die drei neuen Lernspiele

- **Der unsichtbare Rucksack (Raum 1):** Drei Gedanken zu Besitz, Freundschaft und Vergleichsdruck in frei wählbarer Reihenfolge untersuchen. Hilfreiche Antworten verwandeln die Steine in Pflanzen. Gefühle werden ernst genommen; Neid oder Traurigkeit gelten nicht als Fehler.
- **Die Brücke der Nächstenliebe (Raum 2):** In drei Alltagssituationen einladen, beim Lernen unterstützen und Grenzen respektieren. Jede hilfreiche Entscheidung ergänzt ein Brückenstück und zeigt die Folge der Handlung.
- **Die Versöhnungs-Werkstatt (Raum 2):** In vier Schritten einen Streit bearbeiten: Situation beschreiben, Gefühle und Bedürfnisse ausdrücken, Verantwortung übernehmen und Wiedergutmachung anbieten. Mit jedem Schritt wird ein Fensterteil repariert. Sofortiges Verzeihen wird nicht verlangt.

Nach jeder Auswahl erscheint eine Erklärung. Ungünstige Antworten können ohne Punktabzug überdacht werden. Die neuen Spiele wechseln erst nach einem ausdrücklichen Weiter-Klick zur nächsten Situation und enden mit einer Zusammenfassung und einer Reflexionsfrage. Zum Anrechnen der Station auf **Station abschließen** klicken.

Wie im Ausgangsartefakt speichert das Spiel **abgeschlossene Räume und den optionalen Urkundennamen** im lokalen Browser (`regenbogen_kapelle_v4`). Einzelne Aufgaben innerhalb eines noch nicht abgeschlossenen Raums werden nicht dauerhaft gespeichert; beim erneuten Öffnen des Raums beginnen sie von vorn. Beim Verlassen einer noch nicht abgeschlossenen Station beginnt auch diese beim erneuten Öffnen von vorn. Es gibt keine zentrale Ergebnisübersicht. Über „Spiel zurücksetzen“ wird der Spielstand dieser Version einschließlich Name zurückgesetzt.

**Update einer bestehenden GitHub-Seite:** Alle Dateien aus dieser ZIP hochladen, gleichnamige Dateien ersetzen und die neue `minigames.js` ergänzen. Die GitHub-Pages-Einstellungen und der Klassenlink bleiben gleich. Diese Version verwendet bewusst einen neuen Spielstand: Frühere Abschlüsse überspringen dadurch nicht die neuen Aufgaben. Der alte Spielstand wird nicht übernommen.

Die Anwendung sendet Spielstände und eingegebene Namen nicht an einen Server und verwendet keine Analysewerkzeuge. Beim Onlineaufruf liefert GitHub die Dateien aus. Alle Grafiken werden direkt im Browser als SVG und CSS erzeugt. Statt der extern geladenen Google Fonts verwendet diese Fassung vorhandene Systemschriften, damit keine Schriftanfragen an Google nötig sind; die Schriftwirkung kann deshalb leicht abweichen.

## Anpassungen für die eigenständige Fassung

- Claude-spezifische Rahmen-, Konto- und Laufzeitskripte entfernt.
- Spielinhalt in drei lokale Dateien aufgeteilt; relative Pfade funktionieren auch unter einem GitHub-Projektpfad.
- Druckansicht für die Urkunde ergänzt.
- Laufende Fangspiel-Timer und verzögerte Aufgabenwechsel werden beim Verlassen gestoppt.
- Fangspiel-Begriffe bleiben auch auf schmalen Bildschirmen innerhalb des Spielfelds.
- Zuordnungen per Tastatur bedienbar; Zoom bleibt möglich.
- Inhalte und Aufgaben des Ausgangsartefakts beibehalten.

Bei aktivierter Systemeinstellung für weniger Bewegung verwendet das Fangspiel wie im Ausgangsartefakt statische anklickbare Begriffe.

## Inhalte bearbeiten

In `script.js` stehen die Hilfetexte und bisherigen Aufgaben am Anfang: `ROOM1_HILFE`, `ROOM1_OBJECTS`, `ROOM2_HILFE` und `ROOM2_OBJECTS`. Die Situationen und Antworten der neuen Spiele stehen in `minigames.js` bei `bridge`, `workshop` und `stones`. Die Variablen in der ersten Zeile von `styles.css` bestimmen die Grundfarben. Texte auf Start- und Abschlussseite stehen in `index.html`.

## Geprüft

Vollständiger Browserdurchlauf durch alle elf Stationen bis zur Urkunde, Rückmeldungen auf ungünstige Entscheidungen, Tastaturbedienung in den neuen Spielen, freie Reihenfolge der Rucksack-Steine, Ausgangssperre bis zur letzten Station, Wiederherstellung abgeschlossener Räume nach dem Neuladen und mobile Darstellung der Werkstatt ohne horizontales Überlaufen.
