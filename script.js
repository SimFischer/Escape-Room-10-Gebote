/* Die Regenbogen-Kapelle – eigenständige Fassung des Claude-Artefakts.
   Keine Bibliotheken, kein Backend, keine externen Anfragen. */
(function () {
  "use strict";
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  var ROOM1_HILFE =
    '<h4>Die Zehn Gebote (kurz erklärt)</h4><ul class="plain">' +
    '<li><b>1.</b> „Ich bin der Herr, dein Gott, du sollst keine anderen Götter neben mir haben.“<br><i>Damals: Gott ist für die Menschen wichtig, sie sollen sich an ihm orientieren. Heute: Überlege, was dir im Leben wirklich wichtig ist.</i></li>' +
    '<li><b>2.</b> „Du sollst den Namen des Herrn, deines Gottes, nicht missbrauchen.“<br><i>Damals: Gottes Namen respektvoll benutzen. Heute: Sprich respektvoll über Glauben und Religion – auch über den anderer.</i></li>' +
    '<li><b>3.</b> „Du sollst den Feiertag heiligen.“<br><i>Damals: Am siebten Tag ausruhen. Heute: Dir Zeit zum Erholen nehmen und etwas Schönes mit anderen machen.</i></li>' +
    '<li><b>4.</b> „Du sollst deinen Vater und deine Mutter ehren.“<br><i>Damals: Kinder sollen ihre Eltern achten und respektieren. Heute: Respektvoll mit deiner Familie umgehen.</i></li>' +
    '<li><b>5.</b> „Du sollst nicht töten.“<br><i>Damals: Niemandem das Leben nehmen. Heute: Niemandem wehtun – weder mit Taten noch mit Worten. Streit friedlich lösen.</i></li>' +
    '<li><b>6.</b> „Du sollst nicht ehebrechen.“<br><i>Damals: In der Ehe treu sein. Heute: Versprechen halten, ehrlich sein in Freundschaften und Beziehungen.</i></li>' +
    '<li><b>7.</b> „Du sollst nicht stehlen.“<br><i>Damals: Nichts nehmen, was einem nicht gehört. Heute: Das Eigentum anderer respektieren, Gefundenes zurückgeben.</i></li>' +
    '<li><b>8.</b> „Du sollst nicht falsch Zeugnis reden wider deinen Nächsten.“<br><i>Damals: Vor Gericht die Wahrheit sagen – ein falsches Zeugnis konnte einen Unschuldigen bestrafen. Heute: Nicht lügen, niemanden falsch beschuldigen, keine unwahren Dinge über andere verbreiten.</i></li>' +
    '<li><b>9.</b> „Du sollst nicht begehren deines Nächsten Haus.“<br><i>Damals: Nicht begehren, was dem Nachbarn gehört. Heute: Dich nicht ständig mit anderen vergleichen, dankbar sein für das, was du hast.</i></li>' +
    '<li><b>10.</b> „Du sollst nicht begehren deines Nächsten Weib, Knecht, Magd, Vieh noch alles, was sein ist.“<br><i>Heute: Nicht versuchen, anderen ihre wichtigen Menschen wegzunehmen. Akzeptieren, dass andere mehrere Freund:innen haben können.</i></li></ul>';
  var ROOM1_ORDER = ["Nur an einen Gott glauben", "Gottes Namen achten", "Den Feiertag heiligen", "Eltern ehren", "Nicht töten", "Treu sein", "Nicht stehlen", "Die Wahrheit sagen", "Nicht neidisch aufs Haus anderer", "Nicht neidisch auf das, was andere haben"];
  var ROOM1_OBJECTS = [
    {id:'bedeutung', icon:'📜', label:'Die Schriftrolle', flavor:'Auf einer vergilbten Schriftrolle stehen zwei Rätsel über die Bedeutung der Gebote.', steps:[
      {type:'mc', prompt:function(){return 'Gebot 1: „Ich bin der Herr, dein Gott, du sollst keine anderen Götter neben mir haben.“ Was bedeutet das für unser Leben heute?';}, options:['Es ist gut, sich zu überlegen, was einem im Leben wirklich wichtig ist.','Man darf sich im Leben um gar nichts kümmern.','Das Gebot hat mit unserem Alltag nichts zu tun.'],correct:0,help:'Schaut im alten Buch bei Gebot 1 nach.'},
      {type:'mc', prompt:function(){return 'Gebot 8: „Du sollst nicht falsch Zeugnis reden wider deinen Nächsten.“ Früher ging es vor allem um Lügen vor Gericht. Was bedeutet das Gebot heute – auch außerhalb von Gerichten?';}, options:['Nicht lügen, niemanden falsch beschuldigen und keine unwahren Dinge über andere verbreiten.','Man darf über alles lügen, außer vor Gericht.','Das Gebot gilt nur für Erwachsene.'],correct:0,help:'Schaut im alten Buch bei Gebot 8 nach.'}
    ]},
    {id:'alltag',icon:'🗺️',label:'Die Situationskarten',flavor:'Vier Karten zeigen Szenen aus dem Alltag. Findet heraus, zu welchem Gebot sie passen.',steps:[
      {type:'match',intro:'Zu welchem Gebot passt die Situation?',statements:[
        {t:'Du hilfst deinen Eltern im Haushalt, ohne dass sie dich extra darum bitten müssen.',bucket:'g4'},
        {t:'Ein Mitschüler nimmt heimlich den Kuli aus der Federtasche eines anderen.',bucket:'g7'},
        {t:'Am Sonntag nimmst du dir bewusst Zeit für deine Familie, statt den ganzen Tag zu lernen.',bucket:'g3'},
        {t:'Du bist so neidisch auf das neue Handy deines Freundes, dass du an nichts anderes mehr denken kannst.',bucket:'g9'}
      ],buckets:[{key:'g3',label:'Gebot 3'},{key:'g4',label:'Gebot 4'},{key:'g7',label:'Gebot 7'},{key:'g9',label:'Gebot 9'}],help:'Schaut im alten Buch nach, worum es bei den Geboten geht.'}
    ]},
    {id:'reihenfolge',icon:'🪨',label:'Die Steintafel',flavor:'Die steinerne Tafel ist zerbrochen! Setzt die Gebote in der richtigen Reihenfolge wieder zusammen – von 1 bis 10.',steps:[{type:'assemble',intro:'Tippt die Gebote in der richtigen Reihenfolge an (1 bis 10):',target:ROOM1_ORDER,help:'Schaut im alten Buch nach, welches Gebot welche Nummer hat.'}]},
    {id:'fangspiel',icon:'🎯',label:'Der Prüfstein',flavor:'Ein alter Prüfstein testet euer Gespür: Welches Verhalten passt zu den Zehn Geboten?',steps:[{type:'catch',intro:'Fangt ein, was zu den Zehn Geboten passt – und lasst den Rest fallen!',good:['Eltern respektieren','Die Wahrheit sagen','Streit friedlich lösen','Versprechen halten','Nichts wegnehmen, was mir nicht gehört','Zufrieden sein mit dem, was ich habe','Sich einen Ruhetag gönnen','Andere nicht beneiden'],bad:['Lügen','Stehlen','Schlagen','Eltern anschreien','Immer mehr haben wollen','Nie zur Ruhe kommen'],target:8,badHint:'Das widerspricht einem der Zehn Gebote – lieber stehen lassen!'}]}
  ];
  var ROOM2_HILFE = '<h4>Das wichtigste Gebot</h4><p>Ein Gesetzeslehrer fragte Jesus: „Welches ist das wichtigste Gebot im Gesetz Gottes?“</p><p>Jesus antwortete: „Du sollst den Herrn, deinen Gott, lieben von ganzem Herzen, mit ganzer Hingabe und mit deinem ganzen Verstand. Das ist das erste und wichtigste Gebot. Ebenso wichtig ist aber ein zweites: Liebe deinen Mitmenschen wie dich selbst.“</p><p>Jesus sagte dazu: Alle anderen Gebote – auch die Zehn Gebote – stecken in diesen beiden Sätzen.</p>';
  var ROOM2_OBJECTS = [
    {id:'frage',icon:'💬',label:'Die Frage',flavor:'Irgendwo hier hat einst ein Gesetzeslehrer Jesus eine wichtige Frage gestellt …',steps:[{type:'mc',prompt:function(){return 'Was wollte der Gesetzeslehrer von Jesus wissen?';},options:['Welches das wichtigste Gebot im Gesetz Gottes ist.','Wie man schnell reich wird.','Wo Jesus aufgewachsen ist.'],correct:0,help:'Schaut im alten Buch nach, was der Gesetzeslehrer fragte.'}]},
    {id:'antwort',icon:'📿',label:'Jesu Antwort',flavor:'Setzt Jesu Antwort zusammen und findet heraus, was sie wirklich bedeutet.',steps:[
      {type:'assemble',intro:'Tippt die Teile in der richtigen Reihenfolge an:',target:['Du sollst den Herrn, deinen Gott, lieben','von ganzem Herzen, mit ganzer Hingabe','und mit deinem ganzen Verstand.','Liebe deinen Mitmenschen','wie dich selbst.'],help:'Schaut im alten Buch nach dem genauen Wortlaut.'},
      {type:'mc',prompt:function(){return 'Was ist damit gemeint, Gott „von ganzem Herzen“ zu lieben?';},options:['Mit dem ganzen Leben – nicht nur nebenbei.','Nur sonntags in der Kirche.','Nur wenn man gerade traurig ist.'],correct:0,help:"Überlegt: Was bedeutet 'ganz' im Gegensatz zu 'ein bisschen'?"}
    ]},
    {id:'sortieren',icon:'⚖️',label:'Die Waage der Liebe',flavor:'Jesus sagt: Alle Zehn Gebote stecken in diesen beiden Sätzen. Doch welches Gebot gehört auf welche Seite der Waage?',steps:[{type:'match',intro:'Ordnet die Gebote der passenden Hälfte des Doppelgebots zu:',statements:[
      {t:'Nur an einen Gott glauben',bucket:'gott'},{t:'Gottes Namen achten',bucket:'gott'},{t:'Den Feiertag heiligen',bucket:'gott'},{t:'Eltern ehren',bucket:'naechster'},{t:'Nicht töten',bucket:'naechster'},{t:'Treu sein',bucket:'naechster'},{t:'Nicht stehlen',bucket:'naechster'},{t:'Die Wahrheit sagen',bucket:'naechster'},{t:'Nicht neidisch auf das sein, was andere haben',bucket:'naechster'}
    ],buckets:[{key:'gott',label:'❤️ Liebe zu Gott'},{key:'naechster',label:'🤝 Liebe zum Nächsten'}],help:'Überlegt: Geht es bei diesem Gebot vor allem um Gott oder um andere Menschen?'}]},
    {id:'doppel',icon:'🔢',label:'Das Zahlenschloss',flavor:'Ein kleines Schloss mit einer letzten Frage zum Doppelgebot.',steps:[{type:'keypad',prompt:function(){return 'Das Gebot heißt „DOPPELgebot der Liebe“. Aus wie vielen einzelnen Geboten besteht es? Gebt die Zahl ein.';},answer:function(){return 2;},help:'Ein Doppel... besteht aus wie vielen Teilen?'}]}
  ];

  ROOM1_OBJECTS.push({id:'rucksack',icon:'🎒',label:'Der unsichtbare Rucksack',flavor:'Drei Gedanken wiegen schwer. Findet heraus, was entlasten kann, ohne Gefühle wegzuschieben.',steps:[{type:'backpack'}]});
  ROOM2_OBJECTS.push({id:'bruecke',icon:'🌉',label:'Die Brücke der Nächstenliebe',flavor:'Zwischen euch und der anderen Seite fehlen drei Brückenstücke. Hilfreiche Entscheidungen schließen die Lücken.',steps:[{type:'bridge'}]});
  ROOM2_OBJECTS.push({id:'werkstatt',icon:'🛠️',label:'Die Versöhnungs-Werkstatt',flavor:'Ein Streit hat das Werkstattfenster zerbrochen. Mit einem fairen Gespräch und einer passenden Handlung könnt ihr es reparieren.',steps:[{type:'workshop'}]});
  ROOM1_HILFE += '<h4>Zum unsichtbaren Rucksack</h4><p>Neid und Traurigkeit sind Gefühle, keine Fehler. Du darfst dir etwas wünschen, ohne dich oder andere abzuwerten. Freundschaft ist kein Besitz. Vergleichspausen und Gespräche können helfen.</p>';
  ROOM2_HILFE += '<h4>Brücken der Nächstenliebe</h4><p>Lade ein, ohne zu drängen. Unterstütze andere beim eigenen Lernen. Respektiere Grenzen und bleibe ansprechbar.</p><h4>Die Versöhnungs-Werkstatt</h4><p>Beschreibe, was passiert ist. Sage, wie du dich fühlst und was du brauchst. Übernimm Verantwortung für deine Handlung. Biete eine passende Wiedergutmachung an. Niemand muss sofort verzeihen. Bei Drohungen oder Gewalt helfen vertraute Erwachsene.</p>';

  // Neue Inhalte sollen auch nach einem früheren Spielabschluss offen sein.
  var STORAGE_KEY = 'regenbogen_kapelle_v5';
  var state = loadState();
  // Laufende Animationen und verzögerte Aufgaben beim Verlassen stoppen.
  var timers = new Set();
  var intervals = new Set();
  function later(fn, ms) { var id = setTimeout(function(){timers.delete(id);fn();},ms);timers.add(id);return id; }
  function stopActivities(){timers.forEach(clearTimeout);timers.clear();intervals.forEach(clearInterval);intervals.clear();document.body.classList.remove('hit-good','hit-bad');}
  function emptyState(){return {room1:false,room2:false,solved:{}};}
  function loadState(){
    var next=emptyState();
    try{var parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));if(parsed&&parsed.solved){
      ROOM1_OBJECTS.concat(ROOM2_OBJECTS).forEach(function(o){if(parsed.solved[o.id]===true)next.solved[o.id]=true;});
      next.room1=parsed.room1===true&&ROOM1_OBJECTS.every(function(o){return next.solved[o.id];});
      next.room2=next.room1&&parsed.room2===true&&ROOM2_OBJECTS.every(function(o){return next.solved[o.id];});
    }}catch(e){}return next;
  }
  function solvedCount(){return ROOM1_OBJECTS.concat(ROOM2_OBJECTS).filter(function(o){return state.solved[o.id];}).length;}
  function allSolved(){return solvedCount()===11;}
  function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){}}

  var WEDGE_COLORS={1:'var(--sunshine)',2:'var(--coral)'};
  var wedgeDefs=[1,1,1,1,1,2,2,2,2,2];
  var pts=[[400,180],[352.2,327],[227.25,417.75],[72.75,417.75],[-52.25,327],[-100,180],[-52.25,33],[72.75,-57.75],[227.25,-57.75],[352.25,33]];
  function buildWindowSVG(id){
    var ns='http://www.w3.org/2000/svg';
    function svgEl(tag,attrs){var e=document.createElementNS(ns,tag);Object.keys(attrs).forEach(function(k){e.setAttribute(k,attrs[k]);});return e;}
    var svg=svgEl('svg',{id:id,viewBox:'20 40 260 300','aria-hidden':'true'});
    var defs=svgEl('defs',{}), clip=svgEl('clipPath',{id:id+'-clip'});
    var framePath='M40,320 L40,180 A110,110 0 0 1 260,180 L260,320 Z';
    clip.appendChild(svgEl('path',{d:framePath}));defs.appendChild(clip);
    var radial=svgEl('radialGradient',{id:id+'-glow'});
    radial.innerHTML='<stop offset="0%" stop-color="#FFF6D8" stop-opacity="0.9"/><stop offset="100%" stop-color="#FFF6D8" stop-opacity="0"/>';
    defs.appendChild(radial);svg.appendChild(defs);
    svg.appendChild(svgEl('circle',{class:'glow',cx:150,cy:180,r:140,fill:'url(#'+id+'-glow)'}));
    var g=svgEl('g',{'clip-path':'url(#'+id+'-clip)'});
    pts.forEach(function(p,i){var next=pts[(i+1)%10],grp=wedgeDefs[i];g.appendChild(svgEl('path',{d:'M150,180 L'+p[0]+','+p[1]+' L'+next[0]+','+next[1]+' Z',class:'wedge','data-group':grp,'data-color':WEDGE_COLORS[grp],fill:'var(--grey-glass)',opacity:i%2===0?1:.85}));});
    svg.appendChild(g);svg.appendChild(svgEl('path',{d:framePath,fill:'none',stroke:'var(--sunshine-dark)','stroke-width':8}));
    for(var i=0;i<10;i+=2)svg.appendChild(svgEl('line',{x1:150,y1:180,x2:pts[i][0],y2:pts[i][1],stroke:'var(--cream)','stroke-width':2.5,opacity:.55,'clip-path':'url(#'+id+'-clip)'}));
    svg.appendChild(svgEl('circle',{cx:150,cy:180,r:24,fill:'var(--cream)',stroke:'var(--sunshine-dark)','stroke-width':4}));return svg;
  }
  var windowSvg=buildWindowSVG('windowSvg');
  function refreshWindow(){
    var count=solvedCount(),complete=allSolved();
    document.body.classList.toggle('restored',complete);
    document.querySelectorAll('[data-progress]').forEach(function(e){e.textContent=count+' / 11 Stationen geschafft';});
    windowSvg.querySelectorAll('.wedge').forEach(function(w,i){w.setAttribute('fill',complete?w.dataset.color:'var(--grey-glass)');w.setAttribute('opacity',complete?'1':(i%3===0?'.25':'.8'));});
    windowSvg.classList.toggle('complete',complete);
  }
  function placeWindow(holderId,size){var holder=document.getElementById(holderId);holder.innerHTML='';holder.appendChild(windowSvg);windowSvg.style.width=size==='small'?'100%':size==='finale'?'250px':'220px';}
  function showScreen(id){stopActivities();document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});document.getElementById(id).classList.add('active');}
  document.getElementById('startBtn').addEventListener('click',function(){showScreen('screen-game');placeWindow('gameWindowHolder','small');renderRoom(!state.room1?1:!state.room2?2:1);});
  function resetGame(){stopActivities();document.querySelectorAll('.confetti').forEach(function(c){c.remove();});state=emptyState();saveState();refreshWindow();placeWindow('introWindowHolder');showScreen('screen-intro');}
  document.getElementById('resetBtn').addEventListener('click',function(){if(confirm('Wirklich von vorne beginnen? Euer Fortschritt geht dann verloren.'))resetGame();});
  document.getElementById('replayBtn').addEventListener('click',resetGame);
  function updateMap(){
    document.querySelectorAll('#roomNav .node').forEach(function(n){var r=n.dataset.room;n.classList.remove('locked','active','done');if(r==='final'){var all=state.room1&&state.room2;n.classList.add(all?'active':'locked');n.querySelector('.dot').textContent=all?'🌟':'🔒';}else{var done=state['room'+r],unlocked=r==='1'||state['room'+(r-1)];n.classList.add(done?'done':unlocked?'active':'locked');n.querySelector('.dot').textContent=done?'✅':unlocked?(r==='1'?'📜':'❤️'):'🔒';}n.setAttribute('aria-disabled',n.classList.contains('locked')?'true':'false');});
    document.getElementById('conn1').classList.toggle('done',state.room1);document.getElementById('conn2').classList.toggle('done',state.room2);refreshWindow();
  }
  function shake(node){node.classList.add('shake');later(function(){node.classList.remove('shake');},400);}
  document.getElementById('roomNav').addEventListener('click',function(e){var node=e.target.closest('.node');if(!node)return;if(node.classList.contains('locked')){shake(node.querySelector('.dot'));return;}var r=node.dataset.room;if(r==='final')showFinale();else renderRoom(parseInt(r,10));});
  function finishRoom(n,message){
    stopActivities();state['room'+n]=true;saveState();updateMap();var box=document.getElementById('roomContent');box.innerHTML='';var wrap=el('div','success-box');wrap.appendChild(el('span','big-emoji','🎉'));wrap.appendChild(el('p','',message));var next=el('button','btn '+(n===1?'coral':'sunshine'),n<2?'Weiter zum nächsten Raum →':'Zur strahlenden Kapelle 🌟');next.addEventListener('click',function(){if(n<2)renderRoom(n+1);else showFinale();});wrap.appendChild(document.createElement('br'));wrap.appendChild(next);box.appendChild(wrap);
  }
  function showFinale(){if(!allSolved())return;showScreen('screen-finale');placeWindow('finaleWindowHolder','finale');refreshWindow();launchConfetti();}
  function reducedMotion(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
  function launchConfetti(){if(reducedMotion())return;var colors=['#FFC94D','#FF7A93','#4FC3E8','#34D1A6','#9B7EDE'];for(var i=0;i<28;i++)(function(){var c=el('div','confetti');c.style.left=Math.random()*100+'vw';c.style.background=colors[Math.floor(Math.random()*colors.length)];c.style.animationDuration=(2.2+Math.random()*1.6)+'s';c.style.animationDelay=Math.random()*.6+'s';document.body.appendChild(c);setTimeout(function(){c.remove();},4500);})();}
  function renderRoom(n){
    stopActivities();updateMap();var box=document.getElementById('roomContent');box.className='card room-card room-'+n;box.innerHTML='';
    if(n===1)buildRoomScene(box,{badge:'Raum 1 · Die Zehn Gebote',intro:'Ihr betretet die Gebotskammer. Fünf geheimnisvolle Gegenstände warten darauf, untersucht zu werden – darunter ein unsichtbarer Rucksack. Findet den Weg zum Ausgang!',objects:ROOM1_OBJECTS,hilfe:ROOM1_HILFE,onComplete:function(){finishRoom(1,'Ihr habt die Zehn Gebote erkundet und hilfreiche Gedanken für den unsichtbaren Rucksack gefunden! Fünf Stationen sind geschafft. Das Fenster wartet noch auf die übrigen Teile!');}});
    if(n===2)buildRoomScene(box,{badge:'Raum 2 · Das Doppelgebot der Liebe',intro:'Ihr betretet die Kammer der Liebe. Auch hier warten Gegenstände darauf, entdeckt zu werden …',objects:ROOM2_OBJECTS,hilfe:ROOM2_HILFE,onComplete:function(){finishRoom(2,'„Liebe Gott von ganzem Herzen – und deinen Mitmenschen wie dich selbst.“ Genau das ist das Doppelgebot der Liebe: In diesen zwei Sätzen stecken alle Zehn Gebote. Alle elf Stationen sind geschafft – das Fenster ist repariert und erstrahlt wieder!');}});
  }
  function buildHotspot(icon,label,status){var tile=el('button','hotspot hotspot-'+status);tile.appendChild(el('div','hotspot-icon',icon));tile.appendChild(el('div','hotspot-label',label));if(status==='done')tile.appendChild(el('div','hotspot-badge hotspot-badge-done','✓'));if(status==='locked'){tile.appendChild(el('div','hotspot-badge hotspot-badge-locked','🔒'));tile.setAttribute('aria-disabled','true');}return tile;}
  function runObjectSteps(container,steps,onAllDone){
    var idx=0,dots=null;if(steps.length>1){dots=el('div','progress-dots');steps.forEach(function(){dots.appendChild(el('span'));});container.appendChild(dots);}var stepBox=el('div');container.appendChild(stepBox);
    function solved(){if(dots)dots.children[idx].classList.add('filled');later(function(){idx++;if(idx>=steps.length)onAllDone();else render();},650);}
    function render(){stepBox.innerHTML='';var step=steps[idx];if(step.type==='keypad')renderKeypadStep(stepBox,step,solved);else if(step.type==='mc')renderMCStep(stepBox,step,solved);else if(step.type==='assemble')renderAssembleStep(stepBox,step,solved);else if(step.type==='match')renderMatchStep(stepBox,step,solved);else if(step.type==='catch')renderCatchStep(stepBox,step,solved);else if(['bridge','backpack','workshop'].includes(step.type))window.KapellenSpiele.render(step.type,stepBox,solved);}
    render();
  }
  function buildRoomScene(box,opts){
    var solved=state.solved;box.appendChild(el('span','eyebrow-badge',opts.badge));var intro=el('p','scene-intro',opts.intro);box.appendChild(intro);var grid=el('div','hotspot-grid');box.appendChild(grid);var detail=el('div','detail-view');detail.style.display='none';box.appendChild(detail);
    function renderGrid(){grid.innerHTML='';opts.objects.forEach(function(o){var tile=buildHotspot(o.icon,o.label,solved[o.id]?'done':'open');tile.addEventListener('click',function(){if(!solved[o.id])openObject(o);});grid.appendChild(tile);});var book=buildHotspot('📖','Das alte Buch','info');book.addEventListener('click',function(){showDetail(function(c){c.appendChild(el('div','hilfe-panel',opts.hilfe));});});grid.appendChild(book);var ready=opts.objects.every(function(o){return solved[o.id];});var exit=buildHotspot('🚪','Der Ausgang',ready?'exit-ready':'locked');exit.addEventListener('click',function(){if(ready)opts.onComplete();else shake(exit);});grid.appendChild(exit);}
    function showDetail(builder){stopActivities();grid.style.display='none';intro.style.display='none';detail.style.display='block';detail.innerHTML='';var back=el('button','btn ghost back-btn','← Zurück zum Raum');back.addEventListener('click',closeDetail);detail.appendChild(back);builder(detail);}
    function closeDetail(){stopActivities();detail.innerHTML='';detail.style.display='none';grid.style.display='';intro.style.display='';renderGrid();}
    function openObject(o){showDetail(function(c){c.appendChild(el('p','object-flavor',o.flavor));runObjectSteps(c,o.steps,function(){solved[o.id]=true;saveState();refreshWindow();closeDetail();});});}
    renderGrid();
  }
  function makeHint(){var hint=el('p','hint','');hint.setAttribute('aria-live','polite');return hint;}
  function buildKeypad(onConfirm){var wrap=el('div','keypad'),display=el('div','keypad-display','–');display.setAttribute('aria-live','polite');wrap.appendChild(display);var grid=el('div','keypad-grid'),buf='';function refresh(){display.textContent=buf||'–';}['1','2','3','4','5','6','7','8','9','⌫','0','✓'].forEach(function(k){var b=el('button','keypad-btn',k);if(k==='✓'){b.classList.add('keypad-ok');b.setAttribute('aria-label','Antwort prüfen');}if(k==='⌫'){b.classList.add('keypad-del');b.setAttribute('aria-label','Letzte Ziffer löschen');}b.addEventListener('click',function(){if(k==='⌫'){buf=buf.slice(0,-1);refresh();}else if(k==='✓'){if(buf)onConfirm(parseInt(buf,10),function(){buf='';refresh();});}else if(buf.length<2){buf+=k;refresh();}});grid.appendChild(b);});wrap.appendChild(grid);return wrap;}
  function renderKeypadStep(container,step,onSolved){container.appendChild(el('p','question-text',step.prompt()));var hint=makeHint();var kp=buildKeypad(function(val,reset){if(val===step.answer()){hint.textContent='';kp.querySelectorAll('button').forEach(function(b){b.disabled=true;});onSolved();}else{hint.textContent=step.help;shake(kp);later(reset,450);}});container.appendChild(kp);container.appendChild(hint);}
  function renderMCStep(container,step,onSolved){container.appendChild(el('p','question-text',step.prompt()));var hint=makeHint(),opts=el('div','options');step.options.forEach(function(text,i){var b=el('button','opt-btn',text);b.addEventListener('click',function(){if(i===step.correct){b.classList.add('correct');opts.querySelectorAll('button').forEach(function(x){x.disabled=true;});hint.textContent='';onSolved();}else{b.classList.add('wrong');shake(b);hint.textContent=step.help;later(function(){b.classList.remove('wrong');},500);}});opts.appendChild(b);});container.appendChild(opts);container.appendChild(hint);}
  function shuffle(items){var result=items.slice();for(var i=result.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var value=result[i];result[i]=result[j];result[j]=value;}return result;}
  function renderAssembleStep(container,step,onSolved){container.appendChild(el('p','',step.intro));var chosen=[],sentence=el('div','sentence-box');sentence.appendChild(el('span','placeholder','Hier entsteht eure Reihenfolge …'));container.appendChild(sentence);var pool=el('div','chip-pool');container.appendChild(pool);var hint=makeHint();container.appendChild(hint);shuffle(step.target).forEach(function(word){var c=el('button','chip',word);c.addEventListener('click',function(){if(word===step.target[chosen.length]){chosen.push(word);c.classList.add('used');c.disabled=true;sentence.textContent=chosen.join(' · ');hint.textContent='';if(chosen.length===step.target.length)onSolved();}else{shake(c);hint.textContent=step.help;}});pool.appendChild(c);});}
  function renderMatchStep(container,step,onSolved){
    container.appendChild(el('p','',step.intro));var selected=null,placed=0,pool=el('div','statement-pool');container.appendChild(pool);var buckets=el('div','buckets'),bucketEls={};
    step.buckets.forEach(function(bd){var b=el('div','bucket');b.tabIndex=0;b.setAttribute('role','button');b.setAttribute('aria-label',bd.label);b.appendChild(el('h4','',bd.label));var list=el('div');b.appendChild(list);bucketEls[bd.key]={el:b,list:list};buckets.appendChild(b);});container.appendChild(buckets);var hint=makeHint();container.appendChild(hint);
    var cards=step.statements.map(function(s){var c=el('button','statement-card',s.t);c.setAttribute('aria-pressed','false');c.addEventListener('click',function(){pool.querySelectorAll('.statement-card').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});selected=selected===c?null:c;if(selected){c.classList.add('selected');c.setAttribute('aria-pressed','true');}});pool.appendChild(c);return {el:c,data:s};});
    function tryPlace(key){if(!selected){hint.textContent='Tippt zuerst eine Aussage an.';return;}var card=cards.find(function(x){return x.el===selected;});if(!card)return;if(card.data.bucket===key){card.el.classList.remove('selected');card.el.classList.add('placed');card.el.disabled=true;bucketEls[key].list.appendChild(el('div','bucket-item','✓ '+card.data.t));selected=null;placed++;hint.textContent='';if(placed===step.statements.length)onSolved();}else{shake(bucketEls[key].el);hint.textContent=step.help;}}
    step.buckets.forEach(function(bd){bucketEls[bd.key].el.addEventListener('click',function(){tryPlace(bd.key);});bucketEls[bd.key].el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tryPlace(bd.key);}});});
  }
  function renderCatchStep(container,step,onSolved){
    container.appendChild(el('p','',step.intro));
    container.appendChild(el('p','catch-rules','Richtig: +1 Punkt · Falsch: −1 Punkt (mindestens 0). Sammelt '+step.target+' Punkte!'));
    var score=el('div','catch-score','Gefangen: 0 / '+step.target);score.setAttribute('aria-live','polite');container.appendChild(score);
    var hint=makeHint(),caught=0,finished=false,spawnTimer=null,flashTimer=null;
    function feedback(good){
      clearTimeout(flashTimer);timers.delete(flashTimer);
      document.body.classList.remove('hit-good','hit-bad');document.body.classList.add(good?'hit-good':'hit-bad');
      flashTimer=later(function(){document.body.classList.remove('hit-good','hit-bad');},420);
      score.classList.toggle('score-good',good);score.classList.toggle('score-bad',!good);
    }
    function handleWord(good,chip,staticMode){
      if(finished||chip.disabled)return;
      chip.disabled=true;
      caught=good?caught+1:Math.max(0,caught-1);
      score.textContent='Gefangen: '+caught+' / '+step.target;
      hint.textContent=good?'✓ +1 Punkt – das passt zu den Zehn Geboten!':'✕ −1 Punkt (mindestens 0). '+step.badHint;
      feedback(good);
      if(caught>=step.target){finished=true;clearInterval(spawnTimer);intervals.delete(spawnTimer);hint.textContent='✓ Geschafft! Ihr habt '+step.target+' Punkte gesammelt.';later(onSolved,700);}
      chip.classList.add(good?'catch-caught':'catch-wrong');
      later(function(){if(staticMode){chip.classList.remove('catch-caught','catch-wrong');chip.disabled=finished;}else chip.remove();},450);
    }
    if(reducedMotion()){
      container.appendChild(el('p','catch-rules','Ruhiger Modus: Tippt passende Begriffe an. Nach einem kurzen Moment könnt ihr sie erneut auswählen.'));
      var pool=el('div','catch-static-pool');
      shuffle(step.good.map(function(w){return {w:w,good:true};}).concat(step.bad.map(function(w){return {w:w,good:false};}))).forEach(function(item){
        var chip=el('button','catch-chip',item.w);chip.addEventListener('click',function(){handleWord(item.good,chip,true);});pool.appendChild(chip);
      });container.appendChild(pool);container.appendChild(hint);
    }else{
      var game=el('div','catch-game');container.appendChild(game);container.appendChild(hint);var activeCount=0;
      spawnTimer=setInterval(function(){
        if(finished||activeCount>=5)return;
        var good=Math.random()<.55,list=good?step.good:step.bad,chip=el('button','catch-chip falling',list[Math.floor(Math.random()*list.length)]);
        chip.style.animationDuration=(4.5+Math.random()*2)+'s';activeCount++;
        chip.addEventListener('click',function(){if(chip.dataset.done||finished)return;chip.dataset.done='1';activeCount--;handleWord(good,chip,false);});
        chip.addEventListener('animationend',function(){if(!chip.dataset.done){chip.dataset.done='1';activeCount--;chip.remove();}});
        game.appendChild(chip);chip.style.left=Math.max(0,Math.random()*(game.clientWidth-chip.offsetWidth))+'px';
      },850);intervals.add(spawnTimer);
    }
  }
  placeWindow('introWindowHolder');refreshWindow();updateMap();
})();
