# Die Regenbogen-Kapelle

Interaktiver Rätselraum für die 5. Klasse zu den Zehn Geboten und zum Doppelgebot der Liebe. Eigenständige Fassung des bereitgestellten Claude-Artefakts; läuft ohne Claude-Konto, zusätzliche Bibliotheken oder Build-Schritt.

## Auf GitHub hochladen und teilen

1. Die ZIP-Datei auf deinem Computer entpacken.
2. Auf GitHub ein neues **öffentliches Repository** erstellen, zum Beispiel `regenbogen-kapelle`. Du kannst dabei eine README anlegen lassen, damit der Branch `main` bereits existiert.
3. Im Repository **Add file → Upload files** öffnen. Die Dateien aus dem entpackten Ordner hochladen und mit **Commit changes** speichern. Wichtig: `index.html`, `styles.css` und `script.js` müssen direkt im Hauptverzeichnis nebeneinander liegen, nicht in einem weiteren Unterordner. Die ZIP-Datei selbst wird nicht als Webseite ausgeführt. Die README kann durch diese Anleitung ersetzt werden. `.nojekyll` ist beigefügt; falls dein Dateidialog sie ausblendet, funktioniert diese einfache Seite auch ohne sie.
4. **Settings → Pages** öffnen. Unter **Build and deployment → Source** die Option **Deploy from a branch** wählen. Branch **main**, Ordner **/(root)** auswählen und **Save** klicken.
5. Sobald die Veröffentlichung abgeschlossen ist, zeigt GitHub unter **Settings → Pages** den Link zur Webseite. Diesen Link mit der Klasse teilen. Bei dem vorgeschlagenen Repositorynamen hat er normalerweise das Muster `https://DEIN-GITHUB-NAME.github.io/regenbogen-kapelle/` – den tatsächlichen Link aus GitHub kopieren.

Die Schülerinnen und Schüler benötigen weder ein GitHub- noch ein Claude-Konto. Zum Aktualisieren die geänderten Dateien erneut hochladen; die Pages-Adresse bleibt gleich.

Offizielle Anleitung: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Enthaltene Dateien

- `index.html`: Startseite, Navigation und Abschlussurkunde.
- `styles.css`: Farben, Layout, Animationen, mobile Ansicht und Druckansicht.
- `script.js`: Aufgaben, Lösungen, Spiellogik und lokale Speicherung.
- `.nojekyll`: kennzeichnet die Veröffentlichung als statische Webseite.
- `README.md`: diese Anleitung.

Zum lokalen Ausprobieren `index.html` im Browser öffnen. Die lokale Speicherung bei direkt geöffneten Dateien hängt vom Browser ab; auf GitHub Pages ist sie an die Webseitenadresse gebunden.

## Spiel und Speicherung

Zwei Räume mit jeweils vier Gegenständen, Hilfebuch und Ausgang. Aufgabenarten: Multiple Choice, Reihenfolge, Zuordnung, Fangspiel und Zahlenschloss. Sind alle Gegenstände eines Raums gelöst, wird sein Ausgang freigeschaltet. Nach beiden Räumen erscheinen das farbige Fenster und die druckbare Urkunde.

Wie im Ausgangsartefakt speichert das Spiel **abgeschlossene Räume und den optionalen Urkundennamen** im lokalen Browser (`regenbogen_kapelle_v3`). Einzelne Aufgaben innerhalb eines noch nicht abgeschlossenen Raums werden nicht dauerhaft gespeichert; beim erneuten Öffnen des Raums beginnen sie von vorn. Es gibt keine zentrale Ergebnisübersicht. Über „Spiel zurücksetzen“ wird der gespeicherte Spielstand einschließlich Name zurückgesetzt.

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

In `script.js` stehen die Hilfetexte und Aufgaben am Anfang: `ROOM1_HILFE`, `ROOM1_OBJECTS`, `ROOM2_HILFE` und `ROOM2_OBJECTS`. Die Variablen in der ersten Zeile von `styles.css` bestimmen die Grundfarben. Texte auf Start- und Abschlussseite stehen in `index.html`.
