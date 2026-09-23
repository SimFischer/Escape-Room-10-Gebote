/* Drei zusätzliche Lernspiele. Alle Inhalte bleiben lokal im Browser. */
(function () {
  'use strict';

  function node(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function button(text, className, action) {
    var element = node('button', className, text);
    element.type = 'button';
    element.addEventListener('click', action);
    return element;
  }
  function focusHeading(element) {
    element.tabIndex = -1;
    element.focus({preventScroll: true});
  }

  var bridge = {
    title: 'Die Brücke der Nächstenliebe',
    intro: 'Drei Lücken versperren den Weg. Wählt hilfreiche Handlungen, schaut auf ihre Folgen und baut die Brücke Stück für Stück.',
    kind: 'bridge',
    unit: 'Brückenstücke',
    rounds: [
      {
        title: '1 · Einen Platz anbieten',
        story: 'In der Pause sitzt Sam allein. Bei eurem Spiel fehlt noch jemand. Sam schaut zu euch herüber.',
        choices: [
          {text: 'Ich ziehe Sam einfach ins Spiel.', feedback: 'Du möchtest Sam einbeziehen. Aber Sam soll selbst entscheiden dürfen. Wie kannst du einladen, ohne zu drängen?'},
          {text: 'Ich frage: „Magst du mitspielen oder lieber erst zuschauen?“', good: true, feedback: 'Sam möchte erst zuschauen und später mitspielen. Ihr lasst einen Platz frei. Nächstenliebe lädt ein und lässt eine Wahl.'},
          {text: 'Ich warte, bis Sam sich selbst traut.', feedback: 'Manchmal fällt der erste Schritt schwer. Eine freundliche Einladung kann helfen, ohne jemanden zu zwingen.'}
        ]
      },
      {
        title: '2 · Hilfe, die wirklich hilft',
        story: 'Mila versteht eine Aufgabe nicht und bittet dich um Hilfe. Du hast deine Aufgabe schon fertig.',
        choices: [
          {text: 'Ich erkläre einen Schritt und lasse Mila selbst weiterprobieren.', good: true, feedback: 'Mila versteht den Anfang und probiert weiter. Du bleibst für eine Rückfrage da. Helfen kann andere selbstständiger machen.'},
          {text: 'Ich schreibe schnell alles für Mila auf.', feedback: 'Dann wäre das Blatt voll, aber Mila hätte den Weg noch nicht verstanden. Welche Hilfe stärkt sie beim eigenen Lernen?'},
          {text: 'Ich sage: „Das ist doch total leicht!“', feedback: 'Was für dich leicht ist, kann für andere schwierig sein. Nimm Milas Frage ernst und suche einen hilfreichen ersten Schritt.'}
        ]
      },
      {
        title: '3 · Eine Grenze respektieren',
        story: 'Alex wirkt traurig und sagt: „Ich möchte gerade allein sein.“ Du würdest gern helfen.',
        choices: [
          {text: 'Ich frage immer weiter, bis Alex alles erzählt.', feedback: 'Auch gut gemeinte Fragen können Druck machen. Alex hat gerade eine Grenze genannt.'},
          {text: 'Ich verspreche: „Dann rede ich nie wieder mit dir.“', feedback: 'Eine Pause bedeutet nicht, dass eure Freundschaft vorbei ist. Du kannst Abstand lassen und trotzdem ansprechbar bleiben.'},
          {text: 'Ich sage: „Okay. Wenn du später reden möchtest, bin ich da.“', good: true, feedback: 'Alex bekommt Ruhe und weiß zugleich: Hilfe ist da. Nächstenliebe bedeutet auch, ein Nein zu respektieren.'}
        ]
      }
    ],
    ending: 'Die Brücke trägt! Einladen, beim Lernen unterstützen und Grenzen achten: So kann Nächstenliebe im Alltag aussehen.',
    reflection: 'Zum Weiterdenken: Welche kleine Brücke könntet ihr heute in eurer Klasse bauen?'
  };

  var workshop = {
    title: 'Die Versöhnungs-Werkstatt',
    intro: 'Ein Streit hat das Werkstattfenster in vier Teile zerlegt. Baut ein faires Gespräch und einen passenden nächsten Schritt zusammen.',
    kind: 'workshop',
    unit: 'Fensterteile',
    rounds: [
      {
        title: '1 · Beschreiben, was passiert ist',
        story: 'Du spielst Nora. Eli hat deinen Stift ohne zu fragen genommen. Du hast aus Ärger Elis Plakat eingerissen. Wie beginnst du das Gespräch?',
        choices: [
          {text: '„Du machst immer alles kaputt!“', feedback: '„Immer“ und „alles“ greifen die ganze Person an. Benenne lieber die konkrete Situation und auch deinen Anteil.'},
          {text: '„Du hast meinen Stift genommen, ohne zu fragen. Danach habe ich dein Plakat eingerissen.“', good: true, feedback: 'Du beschreibst beide Handlungen, ohne Eli zu beschimpfen. So habt ihr eine gemeinsame Grundlage für das Gespräch.'},
          {text: '„Hier ist eigentlich gar nichts passiert.“', feedback: 'Der Stift wurde genommen und das Plakat ist beschädigt. Das zu benennen hilft mehr, als es zu verschweigen.'}
        ]
      },
      {
        title: '2 · Gefühle und Bedürfnisse ausdrücken',
        story: 'Eli hört zu. Du möchtest erklären, warum du wütend warst, ohne das Zerreißen zu rechtfertigen.',
        choices: [
          {text: '„Ich war wütend. Mir ist wichtig, dass du fragst, bevor du meine Sachen nimmst.“', good: true, feedback: 'Du nennst dein Gefühl und deinen Wunsch. Wut darf da sein. Trotzdem bleibt es deine Verantwortung, wie du handelst.'},
          {text: '„Du bist schuld daran, dass ich dein Plakat zerreißen musste.“', feedback: 'Du musstest das Plakat nicht zerreißen. Ein Gefühl erklärt eine Reaktion, macht eine verletzende Handlung aber nicht notwendig.'},
          {text: '„Nur meine Gefühle zählen jetzt.“', feedback: 'Auch Eli hat Gefühle. Ein faires Gespräch lässt Platz für beide Seiten.'}
        ]
      },
      {
        title: '3 · Verantwortung übernehmen',
        story: 'Eli sagt: „Ich war traurig, weil ich lange an dem Plakat gearbeitet habe.“ Was antwortest du?',
        choices: [
          {text: '„Tut mir leid, aber du hast angefangen.“', feedback: 'Das „aber“ schiebt die Verantwortung wieder weg. Du kannst deinen eigenen Anteil anerkennen, auch wenn Eli ebenfalls etwas falsch gemacht hat.'},
          {text: '„Stell dich nicht so an.“', feedback: 'Damit würdest du Elis Gefühl kleinmachen. Nimm ernst, dass die Arbeit beschädigt wurde.'},
          {text: '„Dass ich dein Plakat eingerissen habe, war nicht okay. Es tut mir leid.“', good: true, feedback: 'Du übernimmst Verantwortung für deine Handlung. Dafür musst du nicht so tun, als wäre das ungefragte Ausleihen in Ordnung gewesen.'}
        ]
      },
      {
        title: '4 · Etwas wiedergutmachen',
        story: 'Das Plakat ist noch immer kaputt. Eli braucht außerdem Zeit, um wieder Vertrauen zu fassen.',
        choices: [
          {text: '„Ich habe mich entschuldigt. Jetzt musst du mir sofort verzeihen.“', feedback: 'Eine Entschuldigung verpflichtet niemanden, sofort zu verzeihen. Vertrauen kann Zeit brauchen.'},
          {text: '„Soll ich beim Reparieren helfen? Wir könnten künftig beide erst fragen, bevor wir etwas nehmen.“', good: true, feedback: 'Eli möchte das Plakat mit dir reparieren und bittet noch um etwas Abstand. Du akzeptierst das. Ihr habt eine konkrete Hilfe und eine faire Regel vereinbart.'},
          {text: '„Ich kaufe dir etwas, dann sprechen wir nie wieder darüber.“', feedback: 'Ein Geschenk ersetzt weder Zuhören noch eine passende Reparatur. Was hilft beim tatsächlichen Schaden?'}
        ]
      }
    ],
    ending: 'Das Werkstattfenster ist wieder ganz. Euer Gespräch verbindet ehrliche Worte mit einer passenden Handlung. Versöhnung darf Zeit brauchen.',
    reflection: 'Zum Weiterdenken: Bei wiederholter Ausgrenzung, Drohungen oder Gewalt müsst ihr den Streit nicht allein lösen. Holt euch Unterstützung bei einer vertrauten erwachsenen Person.'
  };

  // Brücke und Werkstatt: Jede Entscheidung zeigt ihre Folge.
  // Erst der bewusste Weiter-Klick führt zur nächsten Situation.
  function renderJourney(container, config, onSolved) {
    var index = 0, finished = false, chosen = [], accepted = false;
    var game = node('section', 'mini-game mini-' + config.kind);
    game.appendChild(node('h2', '', config.title));
    game.appendChild(node('p', 'mini-intro', config.intro));
    var visual = node('div', 'mini-visual ' + config.kind + '-visual');
    visual.setAttribute('aria-hidden', 'true');
    var pieces = [];
    for (var i = 0; i < config.rounds.length; i++) {
      var piece = node('span', 'mini-piece', config.kind === 'bridge' ? '🪵' : '✦');
      pieces.push(piece); visual.appendChild(piece);
    }
    game.appendChild(visual);
    var progress = node('p', 'mini-progress');
    game.appendChild(progress);
    var stage = node('div', 'mini-stage');
    game.appendChild(stage);container.appendChild(game);

    function refreshProgress() {
      progress.textContent = config.unit + ': ' + chosen.length + ' / ' + config.rounds.length;
      pieces.forEach(function(piece, i) {piece.classList.toggle('restored', i < chosen.length);});
    }
    function ending() {
      stage.replaceChildren();
      var title = node('h3', '', config.kind === 'bridge' ? 'Der Weg ist frei! 🌉' : 'Das Fenster leuchtet! 🛠️');
      stage.appendChild(title);stage.appendChild(node('p', 'mini-story', config.ending));
      var recap = node('ol', 'mini-recap');
      chosen.forEach(function(text) {recap.appendChild(node('li', '', text));});stage.appendChild(recap);
      stage.appendChild(node('p', 'mini-reflection', config.reflection));
      var complete = button('Station abschließen ✓', 'btn mint', function() {
        if (finished) return;finished = true;complete.disabled = true;onSolved();
      });
      stage.appendChild(complete);focusHeading(title);
    }
    function round(focus) {
      accepted = false;stage.replaceChildren();refreshProgress();
      var data = config.rounds[index], title = node('h3', '', data.title);
      stage.appendChild(title);stage.appendChild(node('p', 'mini-story', data.story));
      var options = node('div', 'options');stage.appendChild(options);
      var feedback = node('p', 'mini-feedback');feedback.setAttribute('role', 'status');feedback.setAttribute('aria-live', 'polite');stage.appendChild(feedback);
      var next = button(index === config.rounds.length - 1 ? 'Ergebnis ansehen →' : 'Nächste Situation →', 'btn sunshine mini-next', function() {
        if (!accepted) return;
        if (index === config.rounds.length - 1) ending();
        else {index++;round(true);}
      });next.hidden = true;stage.appendChild(next);
      data.choices.forEach(function(choice) {
        var option = button(choice.text, 'opt-btn', function() {
          if (accepted) return;
          feedback.textContent = (choice.good ? '✓ ' : '↻ ') + choice.feedback;
          feedback.classList.toggle('helpful', !!choice.good);
          if (choice.good) {
            accepted = true;chosen.push(choice.text);refreshProgress();option.classList.add('correct');
            options.querySelectorAll('button').forEach(function(b) {b.disabled = true;});next.hidden = false;next.focus({preventScroll:true});
          } else {option.classList.add('tried');}
        });options.appendChild(option);
      });
      if (focus) focusHeading(title);
    }
    round(false);
  }

  window.KapellenSpiele = {
    render: function(type, container, onSolved) {
      if(type === 'bridge')renderJourney(container,bridge,onSolved);
      else if(type === 'backpack')window.WorryWalk.render(container,onSolved);
      else if(type === 'workshop')renderJourney(container,workshop,onSolved);
    }
  };
})();
