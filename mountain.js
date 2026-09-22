/* Der Prüfstein: zehn unterschiedliche Gebote auf zwei Tafeln sammeln. */
(function(root){
  'use strict';
  var commandments=[
    {id:1,label:'Nur an einen Gott glauben',words:['Du sollst keine anderen Götter neben Gott haben.','Du sollst Gott an die erste Stelle setzen.']},
    {id:2,label:'Gottes Namen achten',words:['Du sollst Gottes Namen nicht missbrauchen.','Du sollst Gottes Namen respektvoll gebrauchen.']},
    {id:3,label:'Den Feiertag heiligen',words:['Du sollst den Feiertag heiligen.','Du sollst den Ruhetag achten.']},
    {id:4,label:'Vater und Mutter ehren',words:['Du sollst deinen Vater und deine Mutter ehren.','Du sollst deinen Eltern mit Achtung begegnen.']},
    {id:5,label:'Nicht töten',words:['Du sollst nicht töten.','Du sollst das Leben anderer Menschen achten.']},
    {id:6,label:'In der Ehe treu sein',words:['Du sollst nicht ehebrechen.','Du sollst in der Ehe treu sein.']},
    {id:7,label:'Nicht stehlen',words:['Du sollst nicht stehlen.','Du sollst nichts nehmen, was anderen gehört.']},
    {id:8,label:'Nicht falsch Zeugnis reden',words:['Du sollst nicht falsch Zeugnis reden wider deinen Nächsten.','Du sollst niemanden durch falsche Aussagen beschuldigen.']},
    {id:9,label:'Nicht das Haus anderer begehren',words:['Du sollst nicht begehren deines Nächsten Haus.','Du sollst nicht darauf aus sein, anderen ihr Haus wegzunehmen.']},
    {id:10,label:'Nicht die Beziehungen und den Besitz anderer begehren',words:['Du sollst nicht begehren deines Nächsten Frau, Menschen in seinem Haus oder seinen Besitz.','Du sollst anderen nicht ihre Beziehungen und ihren Besitz wegnehmen wollen.']}
  ];
  var distractions=[
    {text:'Du sollst nur dann die Wahrheit sagen, wenn du keinen Ärger bekommst.',why:'Das achte Gebot schützt andere vor falschen Aussagen. Es gilt auch, wenn die Wahrheit unbequem ist.'},
    {text:'Du darfst etwas nehmen, wenn die andere Person genug davon hat.',why:'Das siebte Gebot verbietet Stehlen. Viel Besitz ist keine Erlaubnis, jemandem etwas wegzunehmen.'},
    {text:'Du sollst den Feiertag nutzen, um alle anderen bei der Arbeit zu überholen.',why:'Das dritte Gebot schützt den Ruhetag. Es fordert keinen Wettbewerb um möglichst viel Arbeit.'},
    {text:'Du darfst Gottes Namen missbrauchen, wenn es nur ein Scherz ist.',why:'Das zweite Gebot verlangt einen respektvollen Umgang mit Gottes Namen.'},
    {text:'Du sollst deinen Eltern nur dann mit Achtung begegnen, wenn sie deiner Meinung sind.',why:'Das vierte Gebot meint Respekt auch bei Meinungsverschiedenheiten. Du darfst trotzdem widersprechen und Grenzen setzen.'},
    {text:'Du sollst in der Ehe nur so lange treu sein, wie es niemand kontrolliert.',why:'Das sechste Gebot spricht von Treue. Sie hängt nicht davon ab, ob jemand zusieht.'},
    {text:'Du sollst das Haus deines Nächsten unbedingt besitzen, wenn es schöner ist.',why:'Das neunte Gebot warnt davor, das Haus eines anderen haben zu wollen.'},
    {text:'Du darfst falsch über jemanden aussagen, wenn deine Freunde es auch tun.',why:'Das achte Gebot schützt Menschen vor falschen Beschuldigungen, auch innerhalb einer Gruppe.'},
    {text:'Du sollst deine Wünsche zu deinem einzigen Gott machen.',why:'Das erste Gebot richtet den Blick auf Gott, nicht auf die eigenen Wünsche als höchsten Maßstab.'},
    {text:'Du sollst das Leben nur der Menschen achten, die du magst.',why:'Das fünfte Gebot schützt das Leben. Es macht keine Ausnahme für Menschen, die du nicht magst.'},
    {text:'Du sollst anderen ihre wichtigen Beziehungen abnehmen, damit du beliebter bist.',why:'Das zehnte Gebot warnt davor, anderen ihre Beziehungen und ihren Besitz wegnehmen zu wollen.'},
    {text:'Du darfst stehlen, solange niemand merkt, dass etwas fehlt.',why:'Das siebte Gebot gilt unabhängig davon, ob ein Diebstahl entdeckt wird.'}
  ];
  function createLedger(){
    var entries=[];
    return {
      ids:function(){return entries.slice();},
      add:function(id){if(!commandments.some(function(g){return g.id===id;})||entries.includes(id))return false;entries.push(id);return true;},
      lose:function(){return entries.splice(Math.max(0,entries.length-2));},
      complete:function(){return entries.length===10;}
    };
  }
  function render(container,onSolved,hooks){
    var ledger=createLedger(),disposed=false,finished=false,active=null,paused=false,serial=0,flashId=null,previousBad=-1;
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function el(tag,cls,text){var e=document.createElement(tag);e.className=cls||'';if(text!==undefined)e.textContent=text;return e;}
    function btn(text,cls,fn){var b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
    var game=el('section','mountain-game');container.appendChild(game);
    game.appendChild(el('h2','','Der Prüfstein auf dem Berg'));
    game.appendChild(el('p','mountain-rules','Fangt nur Aussagen ein, die zu den Zehn Geboten passen. Jede richtige Aussage graviert ein anderes Gebot ein. Ein falscher Klick entfernt die letzten zwei Einträge. Falsche Aussagen lasst ihr vorbeiziehen.'));
    game.appendChild(el('p','mountain-note','Wir verwenden dieselbe Zählung wie im alten Buch. Die Aussagen sind zum Teil in heutiger Sprache formuliert.'));
    var toolbar=el('div','mountain-toolbar'),score=el('strong','mountain-score','0 / 10 Gebote eingraviert');score.setAttribute('role','status');toolbar.appendChild(score);
    var pause=btn('Pause ⏸','btn ghost',togglePause);pause.disabled=true;toolbar.appendChild(pause);game.appendChild(toolbar);
    var scene=el('div','mountain-scene');game.appendChild(scene);
    var sky=el('div','mountain-sky');scene.appendChild(sky);
    var idle=el('p','mountain-idle','Die Tafeln warten auf die zehn Gebote.');sky.appendChild(idle);
    var tablets=el('div','stone-tablets');scene.appendChild(tablets);var slots=[];
    for(var t=0;t<2;t++){
      var tablet=el('section','stone-tablet');tablet.setAttribute('aria-label',t===0?'Erste Steintafel, Gebote 1 bis 5':'Zweite Steintafel, Gebote 6 bis 10');
      tablet.appendChild(el('h3','',t===0?'I · V':'VI · X'));var list=el('ol','engraved-list');list.start=t*5+1;
      for(var k=t*5;k<t*5+5;k++){var li=el('li','empty','Noch nicht eingraviert');li.dataset.commandment=String(k+1);slots.push(li);list.appendChild(li);}tablet.appendChild(list);tablets.appendChild(tablet);
    }
    var notice=el('p','mountain-feedback','Lest genau: Manchmal verändert ein einziges Wort die Bedeutung.');notice.setAttribute('role','status');game.appendChild(notice);
    var controls=el('div','mountain-controls');game.appendChild(controls);
    var skip=btn('Vorbeiziehen lassen →','btn ghost',function(){settle(false);});skip.hidden=true;controls.appendChild(skip);
    var next=btn('Auf den Berg! ☁','btn sunshine',nextCloud);controls.appendChild(next);
    var calm=el('label','mountain-calm'),check=el('input');check.type='checkbox';check.checked=reduced;
    check.addEventListener('change',function(){reduced=check.checked;if(active){active.bubble.classList.toggle('still',reduced);active.bubble.style.animationPlayState=paused?'paused':'running';}});
    calm.appendChild(check);calm.appendChild(document.createTextNode(' Ohne Zeitdruck spielen'));game.appendChild(calm);
    function update(){
      var ids=ledger.ids();score.textContent=ids.length+' / 10 Gebote eingraviert';
      slots.forEach(function(slot,i){var done=ids.includes(i+1);slot.classList.toggle('empty',!done);slot.classList.toggle('engraved',done);slot.textContent=done?commandments[i].label:'Noch nicht eingraviert';});
    }
    function glow(good){
      clearTimeout(flashId);document.body.classList.remove('hit-good','hit-bad');scene.classList.remove('mountain-good','mountain-bad');
      scene.classList.add(good?'mountain-good':'mountain-bad');if(!reduced)document.body.classList.add(good?'hit-good':'hit-bad');
      flashId=hooks.later(function(){document.body.classList.remove('hit-good','hit-bad');scene.classList.remove('mountain-good','mountain-bad');},500);
    }
    function nextCloud(){
      if(disposed||finished||active)return;
      sky.replaceChildren();paused=false;pause.textContent='Pause ⏸';pause.disabled=false;next.hidden=true;skip.hidden=false;
      var missing=commandments.filter(function(g){return !ledger.ids().includes(g.id);});
      var good=Math.random()<.57,item;
      if(good){var g=missing[Math.floor(Math.random()*missing.length)];item={id:g.id,text:g.words[Math.floor(Math.random()*g.words.length)]};}
      else {var choices=distractions.map(function(d,i){return i;}).filter(function(i){return i!==previousBad;});previousBad=choices[Math.floor(Math.random()*choices.length)];item=distractions[previousBad];}
      var bubble=btn(item.text,'sky-bubble',function(){settle(true);});bubble.setAttribute('aria-label',item.text);
      bubble.classList.toggle('still',reduced);bubble.style.setProperty('--flight-time',Math.max(7,11-ledger.ids().length*.35)+'s');
      active={bubble:bubble,item:item,good:good,serial:++serial};
      bubble.addEventListener('animationend',function(e){if(e.animationName==='cloud-descend'&&active&&active.bubble===bubble&&!paused&&!reduced)settle(false);});
      sky.appendChild(bubble);notice.textContent='Passt diese Aussage zu einem der Zehn Gebote?';bubble.focus({preventScroll:true});
    }
    function settle(clicked){
      if(!active||paused||finished||disposed)return;
      var current=active;active=null;current.bubble.disabled=true;current.bubble.classList.add('settled');pause.disabled=true;skip.hidden=true;
      if(clicked&&current.good){
        ledger.add(current.item.id);update();glow(true);slots[current.item.id-1].classList.add('fresh-engraving');
        hooks.later(function(){slots[current.item.id-1].classList.remove('fresh-engraving');},800);
        notice.textContent='✓ Gebot '+current.item.id+' eingraviert: '+commandments[current.item.id-1].label+'.';
      }else if(clicked){
        var removed=ledger.lose();update();glow(false);
        notice.textContent='✕ '+current.item.why+' '+(removed.length?'Entfernt: Gebot '+removed.join(' und ')+'. Sammelt sie erneut!':'Die Tafeln sind noch leer – es wird nichts entfernt.');
      }else notice.textContent=current.good?'Dieses Gebot wäre richtig gewesen. Es kommt später wieder. Kein Eintrag geht verloren.':'✓ Gut erkannt! '+current.item.why;
      if(ledger.complete()){
        finished=true;notice.textContent='✦ Alle zehn Gebote sind eingraviert! Ihr habt die Bergprüfung bestanden.';
        current.bubble.remove();sky.appendChild(el('p','mountain-victory','Die Tafeln sind vollständig! ✦'));
        next.textContent='Station abschließen ✓';next.hidden=false;next.removeEventListener('click',nextCloud);
        // Der einmalige Abschluss bleibt auch bei schnellen Mehrfachklicks einmalig.
        next.addEventListener('click',function(){if(disposed)return;disposed=true;next.disabled=true;cleanup();onSolved();},{once:true});
      }else{next.textContent='Nächste Wolke ☁';next.hidden=false;}
      next.focus({preventScroll:true});
    }
    function togglePause(){if(!active)return;paused=!paused;active.bubble.style.animationPlayState=paused?'paused':'running';active.bubble.disabled=paused;skip.disabled=paused;pause.textContent=paused?'Weiter ▶':'Pause ⏸';}
    function visibility(){if(document.hidden&&active&&!paused)togglePause();}
    document.addEventListener('visibilitychange',visibility);
    function cleanup(){disposed=true;clearTimeout(flashId);document.removeEventListener('visibilitychange',visibility);document.body.classList.remove('hit-good','hit-bad');}
    return cleanup;
  }
  var api={render:render,createLedger:createLedger,commandments:commandments,distractions:distractions};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MountainTrial=api;
})(typeof window==='undefined'?{}:window);
