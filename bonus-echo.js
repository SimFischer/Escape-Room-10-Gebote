/* Bonusspiel 1 · Das Echo vom Sinai
   Merkspiel: Das Echo spielt die Gebote in ihrer Reihenfolge vor (1, 1–2, 1–3 …).
   Die Steine liegen verstreut – wer die Folge nachtippt, lernt die Reihenfolge. */
(function(){
'use strict';
var B=window.KapelleBonus;if(!B)return;var U=B.util;
var SYMBOLS=[['☀️','Gott allein'],['🗣️','Gottes Name'],['🕯️','Ruhetag'],['👪','Eltern ehren'],['🕊️','Leben schützen'],['💍','Treue'],['👛','Nicht stehlen'],['⚖️','Wahrheit sagen'],['🏠','Haus anderer'],['💭','Nicht begehren']];
var TONES=[262,294,330,392,440,523,587,659,784,880];
/* Zehn Liegeplätze auf dem Felsplateau (Querformat) und für schmale Bildschirme (Hochformat). */
var WIDE=[[11,46],[30,40],[50,44],[70,40],[89,46],[14,76],[33,70],[52,78],[71,70],[88,78]];
var TALL=[[20,28],[50,25],[80,28],[33,47],[67,47],[20,66],[50,63],[80,66],[33,86],[67,86]];

B.register({id:'echo',order:1,need:2,title:'Das Echo vom Sinai',kind:'Merkspiel · 5–8 Min.',doneText:'Alle zehn im Echo',
intro:'Auf dem Berg hallt ein Echo. Es ruft die Gebote in ihrer Reihenfolge – jede Runde eines mehr. Tippt die Steine in derselben Folge an. Kein Zeitdruck: Das Echo wiederholt sich, so oft ihr wollt.',
render:function(root,ctx){
  var el=ctx.el,button=ctx.button,C=ctx.commandments,d=ctx.data;
  var st={round:1,pos:0,engraved:0,repeats:0,errors:0,playing:false,help:false,slots:U.shuffle([0,1,2,3,4,5,6,7,8,9]),sound:!!d.echoSound,slow:d.echoSlow!==false},timers=[],alive=true;
  function later(fn,ms){var t=setTimeout(function(){if(alive)fn();},ms);timers.push(t);}
  function length(){return st.round+1;}                       /* Runde 1 = Gebote 1–2 … Runde 9 = 1–10 */
  function speed(){return st.slow?1050:720;}

  var bar=el('div','echo-bar');root.appendChild(bar);
  var roundInfo=el('p','round-count echo-round');bar.appendChild(roundInfo);
  var tools=el('div','echo-tools');bar.appendChild(tools);
  var slowBtn=button('',function(){st.slow=!st.slow;d.echoSlow=st.slow;ctx.save();label();},'btn ghost echo-toggle');
  var soundBtn=button('',function(){st.sound=!st.sound;d.echoSound=st.sound;ctx.save();label();},'btn ghost echo-toggle');
  tools.appendChild(slowBtn);tools.appendChild(soundBtn);
  function label(){slowBtn.textContent=st.slow?'🐢 Ruhiges Tempo':'🐇 Flottes Tempo';slowBtn.setAttribute('aria-pressed',String(st.slow));soundBtn.textContent=st.sound?'🔊 Klang an':'🔈 Klang aus';soundBtn.setAttribute('aria-pressed',String(st.sound));}
  label();

  var scene=el('div','echo-scene');root.appendChild(scene);
  var bubble=el('p','echo-bubble');bubble.setAttribute('role','status');bubble.setAttribute('aria-live','polite');scene.appendChild(bubble);
  var stones=[];
  SYMBOLS.forEach(function(sym,i){var s=button('',function(){press(i);},'echo-stone');
    s.appendChild(el('span','echo-num',''));s.appendChild(el('span','echo-sym',sym[0]));s.appendChild(el('span','echo-label',sym[1]));
    s.setAttribute('aria-label',sym[1]+' – '+C[i].label);s.title=C[i].label;s.style.setProperty('--tilt',((i*37)%9-4)+'deg');scene.appendChild(s);stones.push(s);});
  function place(){st.slots.forEach(function(slot,i){var s=stones[i];s.style.setProperty('--x',WIDE[slot][0]+'%');s.style.setProperty('--y',WIDE[slot][1]+'%');s.style.setProperty('--mx',TALL[slot][0]+'%');s.style.setProperty('--my',TALL[slot][1]+'%');});}
  place();

  var controls=el('div','echo-controls');root.appendChild(controls);
  var tablets=el('div','echo-tablets');root.appendChild(tablets);
  function drawTablets(){tablets.replaceChildren();for(var t=0;t<2;t++){var tab=el('ol','echo-tablet');tab.start=t*5+1;for(var n=t*5;n<t*5+5;n++){var got=n<st.engraved;tab.appendChild(el('li',got?'engraved':'',got?SYMBOLS[n][0]+' '+C[n].label:'…'));}tablets.appendChild(tab);}}

  function clearMarks(){stones.forEach(function(s){s.classList.remove('lit','ok','wrong','hint');s.querySelector('.echo-num').textContent='';});}
  function setDisabled(v){stones.forEach(function(s){s.disabled=v;});}
  function light(i,cls,ms){var s=stones[i];s.classList.add(cls);if(st.sound)U.tone(TONES[i],ms/1000);later(function(){s.classList.remove(cls);},ms);}

  function play(){st.playing=true;st.pos=0;clearMarks();setDisabled(true);controls.replaceChildren();roundInfo.textContent='Runde '+st.round+' / 9 · Das Echo ruft '+length()+' Gebote';drawTablets();
    bubble.textContent='Hört gut zu …';var gap=speed();
    for(var k=0;k<length();k++)(function(k){later(function(){bubble.textContent='Echo: „'+(k+1)+' · '+C[k].label+'“';var s=stones[k];s.querySelector('.echo-num').textContent=String(k+1);light(k,'lit',gap*0.8);later(function(){s.querySelector('.echo-num').textContent='';},gap*0.8);},600+k*gap);})(k);
    later(yourTurn,600+length()*gap);}
  function yourTurn(){st.playing=false;setDisabled(false);bubble.textContent='Jetzt ihr! Tippt die Steine in derselben Reihenfolge an – beginnt bei 1.';controls.replaceChildren();controls.appendChild(button('↻ Echo noch einmal hören',function(){st.repeats++;play();},'btn ghost'));if(st.help)hintNext();}
  function hintNext(){stones.forEach(function(s){s.classList.remove('hint');});if(st.help&&st.pos<length())stones[st.pos].classList.add('hint');}

  function press(i){if(st.playing||st.round>9)return;
    if(i===st.pos){var s=stones[i];s.classList.add('ok');s.querySelector('.echo-num').textContent=String(i+1);if(st.sound)U.tone(TONES[i],0.35);st.pos++;hintNext();
      if(st.pos===length())roundDone();else bubble.textContent='✓ '+(i+1)+' · '+C[i].label+' – weiter!';return;}
    st.errors++;var w=stones[i];w.classList.add('wrong');later(function(){w.classList.remove('wrong');},650);
    var roundErrors=(st.roundErrors=(st.roundErrors||0)+1);
    bubble.textContent='Hoppla – als Nächstes kommt Nummer '+(st.pos+1)+'. '+(roundErrors>=2&&!st.help?'Mögt ihr eine kleine Hilfe?':'Versucht es in Ruhe weiter oder hört das Echo noch einmal.');
    if(roundErrors>=2&&!st.help&&!controls.querySelector('.echo-help'))controls.appendChild(button('💡 Nächsten Stein leuchten lassen',function(){st.help=true;hintNext();this.remove();},'btn ghost echo-help'));}

  function roundDone(){setDisabled(true);st.engraved=length();st.roundErrors=0;stones.forEach(function(s){s.classList.remove('hint');});drawTablets();
    if(st.round===9){finish();return;}
    bubble.textContent='✓ Wunderbar! '+length()+' Gebote in der richtigen Reihenfolge.';controls.replaceChildren();
    var go=button('Nächste Runde: '+(length()+1)+' Gebote →',function(){st.round++;st.help=false;play();},'btn sunshine');controls.appendChild(go);go.focus({preventScroll:true});}

  function finish(){st.round=10;st.engraved=10;drawTablets();ctx.done();var best=d.echoBest;if(typeof best!=='number'||st.repeats<best)d.echoBest=st.repeats;ctx.save();
    scene.classList.add('echo-finished');if(st.sound)[0,2,4,7,9].forEach(function(n,k){later(function(){U.tone(TONES[n],0.6);},k*160);});
    stones.forEach(function(s,i){later(function(){s.classList.add('ok');s.querySelector('.echo-num').textContent=String(i+1);},i*(U.reducedMotion()?0:90));});
    bubble.textContent='Das ganze Echo! Alle zehn Gebote in der richtigen Reihenfolge.';controls.replaceChildren();
    var box=el('div','bonus-result');box.appendChild(el('h3','','✦ Das Echo ist vollständig'));
    box.appendChild(el('p','',st.repeats===0?'Ihr habt das Echo kein einziges Mal wiederholen müssen. Stark!':'Das Echo hat sich '+st.repeats+' Mal'+' wiederholt – Nachfragen gehört zum Lernen dazu.'));
    box.appendChild(el('p','','Probiert es zu zweit: Eine Person nennt eine Nummer, die andere sagt das passende Gebot.'));
    box.appendChild(button('Nochmal mit neuen Plätzen',function(){alive=false;timers.forEach(clearTimeout);root.replaceChildren();B.util.restart('echo');},'btn sunshine'));
    box.appendChild(button('Zur Schatzkammer',ctx.back,'btn ghost'));controls.appendChild(box);}

  /* Startbildschirm */
  drawTablets();setDisabled(true);roundInfo.textContent='9 Runden · von 2 bis 10 Geboten';bubble.textContent='Seid ihr bereit? Das Echo beginnt mit den ersten zwei Geboten.';
  var startBtn=button('▶ Echo starten',play,'btn sunshine');controls.appendChild(startBtn);
  return {stop:function(){alive=false;timers.forEach(clearTimeout);}};
}});
})();
