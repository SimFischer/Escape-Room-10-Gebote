(function(){
'use strict';var D=window.AdventureData;
D.commandments.forEach(function(g,i){g.label=['Gott allein verehren','Gottes Namen achten','Den Ruhetag heiligen','Vater und Mutter ehren','Nicht töten','In der Ehe treu sein','Nicht stehlen','Niemanden falsch beschuldigen','Nicht das Haus anderer begehren','Nicht Beziehungen und Besitz anderer begehren'][i];});
D.thirdAdvice=[
'Vergleiche noch genauer, welches Handy die meisten Funktionen hat.',
'Warte ab, ohne deinen Wunsch nach gemeinsamer Zeit anzusprechen.',
'Strenge dich noch mehr an, um bei jedem Erlebnis mithalten zu können.',
'Entschuldige dich sofort für alles, auch für Dinge, die du nicht getan hast.',
'Lies die Aufgabe immer wieder allein, auch wenn du nicht weiterkommst.',
'Lenk dich ab und sprich erst darüber, wenn du gar nicht mehr traurig bist.',
'Beweise allen im Klassenchat sofort, dass nur du recht hast.',
'Versprich, nach der Pause doppelt so viel für alle zu erledigen.',
'Frag alle anderen, warum du wohl nicht eingeladen wurdest.',
'Erzähle das Geheimnis der ganzen Klasse, damit viele Bescheid wissen.',
'Bitte erst um Hilfe, wenn wirklich gar nichts mehr geht.',
'Bitte jemanden, den ganzen Vortrag an deiner Stelle zu halten.'
];
D.thirdWhy=[
'Noch mehr Vergleiche beantworten nicht die Frage nach deinem Wert.',
'Abwarten ist möglich. Ein offenes, freundliches Gespräch spricht die Sorge hier direkter an.',
'Immer mithalten zu wollen kann den Druck weiter erhöhen.',
'Übernimm deinen eigenen Anteil, nicht die Verantwortung für alles.',
'Wenn du feststeckst, kann eine Erklärung weiterhelfen.',
'Ablenkung kann kurz guttun. Du musst mit einem Gespräch aber nicht warten, bis die Traurigkeit weg ist.',
'Öffentlicher Streit kann neue Verletzungen auslösen. Suche Unterstützung für einen ruhigen nächsten Schritt.',
'Damit würdest du dir gleich neuen Druck machen.',
'Das kann Gerüchte auslösen. Sprich lieber vertraulich mit jemandem, der dir zuhört.',
'Wähle eine vertraute erwachsene Person. Du musst es nicht öffentlich machen.',
'Du darfst um faire Verteilung bitten, bevor alles zu viel wird.',
'Unterstützung beim Üben stärkt dich mehr, als die Aufgabe ganz abzugeben.'
];
D.book=[
{n:1,text:'Du sollst keine anderen Götter neben Gott haben.',then:'Das Gebot fordert Israel auf, allein seinem Gott zu vertrauen und ihn zu verehren.',now:'Ein Gespräch heute: Was bestimmt mein Leben? Das ist eine Anwendung, keine neue Übersetzung.'},
{n:2,text:'Du sollst Gottes Namen nicht missbrauchen.',then:'Gottes Name soll nicht benutzt werden, um andere zu täuschen oder Unrecht zu rechtfertigen.',now:'Benutze Religion nicht als Vorwand, um andere zu verletzen.'},
{n:3,text:'Du sollst den Ruhetag heiligen.',then:'Der Sabbat ist der siebte Tag. Auch abhängige Menschen und Tiere sollen Ruhe erhalten.',now:'Viele Christen feiern den Sonntag. Gemeinsame Ruhe und Zeit für Gott sind wichtige Anliegen; Sabbat und Sonntag sind nicht derselbe Tag.'},
{n:4,text:'Du sollst deinen Vater und deine Mutter ehren.',then:'Auch erwachsene Kinder tragen Verantwortung für ihre Eltern, besonders wenn diese alt und hilfsbedürftig sind.',now:'Respekt und Unterstützung sind wichtig. Ehren bedeutet nicht, Gewalt zu ertragen oder zu allem Ja zu sagen.'},
{n:5,text:'Du sollst nicht töten.',then:'Das Gebot schützt menschliches Leben.',now:'Eine Anwendung: Konflikte ohne Gewalt lösen und Hilfe holen, wenn jemand bedroht wird.'},
{n:6,text:'Du sollst nicht ehebrechen.',then:'Das Gebot schützt die Ehe und die Treue zwischen Eheleuten.',now:'Vertrauen ist auch in Freundschaften wichtig. Das ist ein Vergleich; Freundschaft und Ehe sind nicht dasselbe.'},
{n:7,text:'Du sollst nicht stehlen.',then:'Das Eigentum anderer wird geschützt.',now:'Frage, bevor du etwas ausleihst, und gib Gefundenes zurück.'},
{n:8,text:'Du sollst niemanden durch falsche Aussagen beschuldigen.',then:'Falsche Zeugenaussagen können Unschuldigen schwer schaden.',now:'Verbreite keine erfundenen Vorwürfe, auch nicht im Klassenchat.'},
{n:9,text:'Du sollst nicht das Haus deines Nächsten begehren.',then:'Es geht darum, nicht auf das Haus eines anderen aus zu sein.',now:'Etwas schön zu finden ist erlaubt. Plane nicht, jemandem sein Zuhause wegzunehmen.'},
{n:10,text:'Du sollst nicht die Beziehungen und den Besitz anderer begehren.',then:'Der alte Text nennt die Ehefrau, abhängige Menschen, Tiere und Besitz eines Haushalts. Er stammt aus einer anderen Gesellschaft.',now:'Menschen sind kein Besitz. Wünsche und Neid als Gefühle sind erlaubt; versuche nicht, anderen ihre Beziehungen oder ihren Besitz zu entziehen.'}
];
function q(prompt,correct,wrong1,wrong2,explanation,hint){return {type:'mc',prompt:prompt,options:[correct,wrong1,wrong2],explanation:explanation,hint:hint||explanation};}
D.stations=[
{id:'bedeutung',room:1,title:'Die Schriftrolle',icon:'📜',time:'3–4 Min.',kind:'quiz',intro:'Entdeckt, was die Gebote schützen.',steps:[q('Die Gebote stehen nach der Erzählung vom Auszug aus Ägypten. Was passt zu diesem Zusammenhang?','Gott hat Israel befreit. Die Gebote ordnen das gemeinsame Leben.','Israel muss erst alle Gebote schaffen, bevor Gott es befreit.','Die Gebote erzählen, wie ein einzelner Mensch berühmt wird.','In der biblischen Erzählung steht Gottes Befreiung vor den Geboten. Sie richten sich an ein gemeinsames Leben.'),q('Was ist der ursprüngliche Schwerpunkt des ersten Gebots?','Israel soll allein seinen Gott verehren.','Jeder Mensch soll einfach sein liebstes Hobby wählen.','Menschen sollen möglichst viele wichtige Dinge besitzen.','Das erste Gebot handelt von Gott. Über eigene Prioritäten nachzudenken ist ein möglicher heutiger Transfer, nicht der ganze Inhalt.')]},
{id:'alltag',room:1,title:'Die Situationskarten',icon:'🗺️',time:'3–4 Min.',kind:'match',intro:'Heftet jede Karte zum passenden Gebot.',buckets:[{key:4,label:'4 · Eltern ehren'},{key:7,label:'7 · Nicht stehlen'},{key:8,label:'8 · Nicht falsch beschuldigen'},{key:10,label:'10 · Besitz anderer nicht begehren'}],cards:[{text:'Eine erwachsene Tochter hilft ihrem alten Vater beim Einkaufen.',key:4,why:'Das ist ein Beispiel für Verantwortung gegenüber hilfsbedürftigen Eltern.'},{text:'Ben nimmt heimlich einen Stift aus Leas Tasche und behält ihn.',key:7,why:'Hier wird tatsächlich etwas weggenommen. Darum passt das Verbot des Stehlens.'},{text:'Lea behauptet absichtlich, Ben habe das Fenster zerbrochen, obwohl es nicht stimmt.',key:8,why:'Ein erfundener Vorwurf schadet einem anderen Menschen.'},{text:'Ben will Leas Handy unbedingt für sich haben und plant, es ihr wegzulocken.',key:10,why:'Hier geht es um das gezielte Habenwollen fremden Besitzes. Das bloße Gefühl von Neid wäre noch nicht diese Handlung.'}]},
{id:'reihenfolge',room:1,title:'Die Steintafel',icon:'🪨',time:'3–4 Min.',kind:'tablet',intro:'Setzt drei passende Gebotsfragmente ein. Erklärt danach eure Wahl.',steps:[q('Eine Familie braucht Ruhe. Welches Gebot passt auf dieses Fragment?','3 · Den Ruhetag heiligen','7 · Nicht stehlen','9 · Nicht das Haus anderer begehren','Der Ruhetag schützt eine gemeinsame Unterbrechung der Arbeit. Er betrifft mehr als nur Freizeit.'),q('Niemand soll einem anderen durch eine erfundene Anschuldigung schaden. Welches Fragment passt?','8 · Niemanden falsch beschuldigen','6 · In der Ehe treu sein','4 · Vater und Mutter ehren','Falsche Aussagen können Menschen zu Unrecht in Schwierigkeiten bringen.'),q('Jemand plant, dem Nachbarn sein Zuhause wegzunehmen. Welches Fragment passt?','9 · Nicht das Haus anderer begehren','10 · Andere Beziehungen und Besitz nicht begehren','2 · Gottes Namen achten','In unserer lutherischen Zählung nennt das neunte Gebot ausdrücklich das Haus.')]},
{id:'bergpruefung',room:1,title:'Der Prüfstein',icon:'⛰️',time:'5–7 Min.',kind:'mountain',intro:'Zehn Aussagen, zehn Gebote. Lest in Ruhe und prüft die Bedeutung.'},
{id:'sorgenweg',room:1,title:'Der Sorgenweg',icon:'🎒',time:'4–6 Min.',kind:'worry',intro:'Sechs zufällige Situationen aus zwölf. Findet hilfreiche nächste Schritte. Echte Sorgen dürfen Zeit brauchen.'},
{id:'frage',room:2,title:'Die Frage',icon:'💬',time:'2–3 Min.',kind:'quiz',intro:'Nehmt am Gespräch über das wichtigste Gebot teil.',steps:[q('Was fragt der Gesetzeslehrer Jesus nach Matthäus 22?','Welches Gebot im Gesetz am wichtigsten ist.','Wie die Zehn Gebote genau nummeriert werden.','Welches Gebot nur für Kinder gelten soll.','Im Gespräch geht es darum, worauf es bei Gottes Geboten besonders ankommt.'),q('Woher stammen die beiden Gebote, die Jesus nennt?','Aus der Tora, den Schriften Israels.','Jesus erfindet beide Sätze in diesem Gespräch neu.','Aus einer Regel für den Bau einer Kapelle.','Jesus verbindet Deuteronomium 6,5 und Levitikus 19,18. Er lehrt innerhalb der jüdischen Tradition.')]},
{id:'antwort',room:2,title:'Jesu Antwort',icon:'📿',time:'3–4 Min.',kind:'quiz',intro:'Gottesliebe und Nächstenliebe gehören zusammen. Die Formulierungen sind sinngemäß.',steps:[q('Was gehört zum Doppelgebot der Liebe?','Gott lieben und den Mitmenschen wie sich selbst lieben.','Nur anderen helfen und die eigenen Grenzen vergessen.','Gott lieben, ohne darauf zu achten, wie man andere behandelt.','Beide Beziehungen gehören zusammen. „Wie dich selbst“ lässt auch den eigenen Wert sichtbar werden.'),q('Was bedeutet hier, Gott mit ganzem Herzen zu lieben?','Die Beziehung zu Gott betrifft das ganze Leben.','Gute Gefühle müssen ununterbrochen da sein.','Wer zweifelt, darf keine Fragen stellen.','Liebe und Vertrauen lassen sich nicht an dauernd guten Gefühlen messen. Fragen haben Platz.') ]},
{id:'sortieren',room:2,title:'Die Waage der Liebe',icon:'⚖️',time:'4–5 Min.',kind:'match',intro:'Ordnet alle zehn Gebote nach ihrem Schwerpunkt. Beide Seiten gehören zusammen.',buckets:[{key:'gott',label:'Liebe zu Gott'},{key:'mensch',label:'Liebe zum Mitmenschen'}],cards:D.commandments.map(function(g,i){return {text:(i+1)+' · '+g.label,key:i<3?'gott':'mensch',why:i<3?'Dieses Gebot richtet sich unmittelbar auf Gott. Auch der Umgang mit Menschen bleibt damit verbunden.':'Dieses Gebot schützt das Zusammenleben mit Menschen. Es steht zugleich im Zusammenhang mit Gottes Geboten.'};})},
{id:'doppel',room:2,title:'Das Herzensschloss',icon:'🔑',time:'2–3 Min.',kind:'lock',intro:'Zwei gute Entscheidungen öffnen zwei Riegel.',steps:[q('Sam bittet um Ruhe. Welche Antwort achtet Sam und lässt Hilfe offen?','„Okay. Wenn du später reden willst, bin ich da.“','„Erzähl es sofort, dann kann ich alles lösen.“','„Ich frage deine Freunde, was mit dir los ist.“','Zuhören schließt ein, eine Grenze zu respektieren.'),q('Du bist erschöpft und jemand bittet um Hilfe. Was passt zur Nächstenliebe?','„Ich brauche eine Pause. Danach kann ich dir einen Schritt erklären.“','„Ich muss immer sofort alles für andere machen.“','„Wenn ich eine Pause brauche, darf ich nie mehr helfen.“','Eigene Grenzen und Hilfe für andere müssen kein Widerspruch sein.')]},
{id:'bruecke',room:2,title:'Die Brücke der Nächstenliebe',icon:'🌉',time:'3–4 Min.',kind:'bridge',intro:'Drei hilfreiche Entscheidungen setzen die fehlenden Bretter ein.',steps:D.bridge.rounds.map(function(r){var good=r.choices.find(function(c){return c.good;}),bad=r.choices.filter(function(c){return !c.good;});return q(r.story,good.text,bad[0].text,bad[1].text,good.feedback);})},
{id:'werkstatt',room:2,title:'Die Versöhnungs-Werkstatt',icon:'🛠️',time:'4–5 Min.',kind:'workshop',intro:'Repariert vier Teile: beschreiben, Gefühle nennen, Verantwortung übernehmen und handeln.',steps:D.workshop.rounds.map(function(r){var good=r.choices.find(function(c){return c.good;}),bad=r.choices.filter(function(c){return !c.good;});return q(r.story,good.text,bad[0].text,bad[1].text,good.feedback);})}
];
D.shortRoute=['bedeutung','alltag','sorgenweg','frage','antwort','werkstatt'];
D.mountainFalse=[
'Du sollst deine eigenen Wünsche zu deinem einzigen Gott machen.',
'Du darfst Gottes Namen missbrauchen, wenn es nur ein Scherz ist.',
'Der Ruhetag gilt nur für Menschen, die niemandem helfen müssen.',
'Du musst zu deinen Eltern immer Ja sagen, auch wenn sie dir wehtun.',
'Das Leben musst du nur bei Menschen achten, die du magst.',
'In der Ehe ist Treue nur wichtig, solange jemand zusieht.',
'Du darfst etwas stehlen, wenn die andere Person genug davon hat.',
'Du darfst jemanden falsch beschuldigen, wenn deine Freunde es auch tun.',
'Du darfst auf das Haus anderer aus sein, wenn es schöner ist.',
'Du darfst andere unter Druck setzen, damit sie dir ihre Beziehungen und ihren Besitz überlassen.'
];
})();
