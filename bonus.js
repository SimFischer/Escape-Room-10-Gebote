/* Regenbogen-Kapelle · Schatzkammer mit Bonusspielen.
   Die Spiele selbst liegen in bonus-echo.js, bonus-climb.js und bonus-window.js
   und melden sich über KapelleBonus.register() an. */
(function(){
'use strict';
var H=window.KapelleHost;if(!H)return;
var el=H.el,button=H.button,games=[],active=null;

function data(){var s=H.state;if(!s.bonus||typeof s.bonus!=='object'||Array.isArray(s.bonus))s.bonus={};return s.bonus;}
function progress(){var route=H.required(),done=route.filter(function(id){return H.state.solved[id];}).length;return {done:done,total:route.length};}
function needed(g){var p=progress();return Math.min(g.need,p.total);}
function isOpen(g){if(data().teacherOpen)return true;return progress().done>=needed(g);}
function openCount(){return games.filter(isOpen).length;}

/* Laufendes Spiel sauber beenden (Animationsschleifen, Tastatur). */
function stopActive(){if(active&&active.stop){try{active.stop();}catch(e){}}active=null;}

function refresh(){var b=document.getElementById('bonusBtn');if(!b)return;var d=data(),n=openCount(),seen=Number(d.seen)||0;b.textContent='🎁 Bonusspiele'+(n?' · '+n+'/'+games.length:'');b.classList.toggle('bonus-new',n>seen);if(n>seen)b.setAttribute('aria-label','Bonusspiele – neu freigeschaltet');else b.removeAttribute('aria-label');}

function show(){stopActive();H.screen('game');var d=data();d.seen=openCount();H.save();refresh();
  var box=document.getElementById('roomContent');box.replaceChildren();box.className='card room-card room-bonus';
  box.appendChild(el('h2','','Die Schatzkammer · Bonusspiele'));
  box.appendChild(el('p','','Kleine Belohnungen für euren Weg. Sie sind freiwillig, ohne Zeitdruck und können jederzeit beendet werden.'));
  var p=progress(),grid=el('div','hotspot-grid bonus-grid');box.appendChild(grid);
  games.forEach(function(g){var open=isOpen(g),t=button('',function(){if(open)openGame(g);},'hotspot bonus-card '+(open?(d[g.id+'Done']?'hotspot-done':'hotspot-open'):'hotspot-locked'));
    t.dataset.bonus=g.id;t.appendChild(el('div','hotspot-icon bonus-art'));t.appendChild(el('div','hotspot-label',g.title));t.appendChild(el('small','station-meta',g.kind));
    if(!open){t.setAttribute('aria-disabled','true');var rest=needed(g)-p.done;t.appendChild(el('span','station-state','🔒 Noch '+rest+(rest===1?' Station':' Stationen')+' eures Lernwegs'));}
    else if(d[g.id+'Done'])t.appendChild(el('span','station-state','✓ '+(g.doneText||'Geschafft')+' · nochmal spielen'));
    else t.appendChild(el('span','station-state','✦ Freigeschaltet'));
    grid.appendChild(t);});
  var hint=el('p','bonus-hint',data().teacherOpen?'Die Lehrkraft hat alle Bonusspiele freigegeben.':'Freischalten: '+games.map(function(g){return g.title+' nach '+needed(g)+(needed(g)===1?' Station':' Stationen');}).join(' · ')+' eures Lernwegs ('+p.done+' / '+p.total+' geschafft).');
  box.appendChild(hint);H.focusHeading(box);}

function openGame(g){stopActive();document.body.classList.add('in-exercise');var box=document.getElementById('roomContent');box.replaceChildren();box.className='card exercise-card bonus-card-wrap';
  var toolbar=el('div','exercise-toolbar');toolbar.appendChild(button('← Schatzkammer',show,'btn ghost'));box.appendChild(toolbar);
  var area=el('section','exercise bonus-game bonus-'+g.id);area.dataset.bonus=g.id;box.appendChild(area);area.appendChild(el('h2','',g.title));area.appendChild(el('p','exercise-intro',g.intro));
  var body=el('div','exercise-body');area.appendChild(body);
  active=g.render(body,{data:data(),save:H.save,el:el,button:button,done:function(){data()[g.id+'Done']=true;H.save();},back:show,commandments:window.AdventureData.commandments})||null;
  H.focusHeading(area);}

/* Wenn die App über Raum-Knöpfe verlassen wird, laufende Spiele anhalten. */
['roomOne','roomTwo','routeBtn','finalBtn','resetBtn'].forEach(function(id){var b=document.getElementById(id);if(b)b.addEventListener('click',stopActive,true);});
var nav=document.getElementById('bonusBtn');if(nav)nav.addEventListener('click',show);

window.KapelleBonus={register:function(g){games.push(g);games.sort(function(a,b){return a.order-b.order;});refresh();},show:show,refresh:refresh};

/* Gemeinsame Hilfen für die Spiele */
window.KapelleBonus.util={
  reducedMotion:function(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;},
  shuffle:window.AdventureCore.shuffle,
  /* Leise, freundliche Töne – nur, wenn eingeschaltet. */
  restart:function(id){var g=games.find(function(x){return x.id===id;});if(g)openGame(g);},
  tone:(function(){var ctx=null;return function(freq,dur){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;o.type='triangle';o.frequency.value=freq;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.18,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||0.5));o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+(dur||0.5)+0.05);}catch(e){}};})()
};
})();
