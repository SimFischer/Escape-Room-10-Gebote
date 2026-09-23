/* Bonusspiel 3 · Das Kapellenfenster
   Teil 1: Puzzle aus dem reparierten Fenster (Tauschen = leicht, Schieben = knifflig).
   Teil 2: Glasmalerei – ein eigenes Fenster frei ausmalen. Ohne Punkte, ohne Ende. */
(function(){
'use strict';
var B=window.KapelleBonus;if(!B)return;var U=B.util;
/* Ausschnitt des Fensters in assets/kapelle.png (1672 × 941) */
var IMG={w:1672,h:941,x:906,y:0,cw:258,ch:396};
var N=3;
var GLASS=[['Rubin','#c8324a'],['Koralle','#ef805b'],['Bernstein','#f0a431'],['Sonne','#ffd84d'],['Minze','#8fd19e'],['Smaragd','#2f9b62'],['Türkis','#35b3b0'],['Himmel','#4c9be0'],['Veilchen','#8a63c9'],['Klarglas','#f4f1e4']];
var EMPTY='#b9bdb2';

/* ---------- Glasfenster als SVG: Rosette oben, Lanzettfenster unten ---------- */
function pt(cx,cy,r,a){return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function sector(cx,cy,r0,r1,a0,a1){var p0=pt(cx,cy,r1,a0),p1=pt(cx,cy,r1,a1),p2=pt(cx,cy,r0,a1),p3=pt(cx,cy,r0,a0),large=(a1-a0)>Math.PI?1:0;
  if(r0===0)return 'M'+cx+' '+cy+'L'+p0+'A'+r1+' '+r1+' 0 '+large+' 1 '+p1+'Z';
  return 'M'+p0+'A'+r1+' '+r1+' 0 '+large+' 1 '+p1+'L'+p2+'A'+r0+' '+r0+' 0 '+large+' 0 '+p3+'Z';}
function windowPaths(){var P=[],cx=200,cy=190,TAU=Math.PI*2,k;
  P.push('M'+(cx-34)+' '+cy+'a34 34 0 1 0 68 0a34 34 0 1 0 -68 0Z');                                   /* Sonne in der Mitte */
  for(k=0;k<8;k++)P.push(sector(cx,cy,34,76,k*TAU/8-Math.PI/2,(k+1)*TAU/8-Math.PI/2));
  for(k=0;k<12;k++)P.push(sector(cx,cy,76,120,k*TAU/12-Math.PI/2+TAU/24,(k+1)*TAU/12-Math.PI/2+TAU/24));
  /* vier Zwickel zwischen Spitzbogen und Rosette */
  P.push('M200 20A160 160 0 0 0 40 180L40 190L80 190A120 120 0 0 1 200 70Z');
  P.push('M200 20A160 160 0 0 1 360 180L360 190L320 190A120 120 0 0 0 200 70Z');
  P.push('M40 190L40 340L200 340L200 310A120 120 0 0 1 80 190Z');
  P.push('M360 190L360 340L200 340L200 310A120 120 0 0 0 320 190Z');
  /* drei Lanzetten mit je vier Dreiecksscheiben */
  var cols=[40,146.67,253.33,360],rows=[340,460,580];
  for(var c=0;c<3;c++)for(var r=0;r<2;r++){var x0=cols[c],x1=cols[c+1],y0=rows[r],y1=rows[r+1];
    if((c+r)%2===0){P.push('M'+x0+' '+y0+'L'+x1+' '+y0+'L'+x0+' '+y1+'Z');P.push('M'+x1+' '+y0+'L'+x1+' '+y1+'L'+x0+' '+y1+'Z');}
    else{P.push('M'+x0+' '+y0+'L'+x1+' '+y0+'L'+x1+' '+y1+'Z');P.push('M'+x0+' '+y0+'L'+x1+' '+y1+'L'+x0+' '+y1+'Z');}}
  return P;}
var PATHS=windowPaths();
/* Ein stimmiger Vorschlag für „Überraschung“: Sonne, Regenbogenring, Himmel und Wiese */
function surprise(){var a=[3],off=Math.floor(Math.random()*8),warm=Math.random()<.5?[2,3]:[1,3],k;for(k=0;k<8;k++)a.push(warm[k%2]);for(k=0;k<12;k++)a.push([0,1,2,3,4,5,6,7,8,0,1,2][(k+off)%12]);a.push(7,7,6,6);for(k=0;k<12;k++)a.push([5,4,6,4,5,7][k%6]);return a;}

B.register({id:'fenster',order:3,need:99,title:'Das Kapellenfenster',kind:'Puzzle & Glasmalerei',doneText:'Fenster gelegt',
intro:'Setzt das leuchtende Fenster der Kapelle wieder zusammen. Danach dürft ihr in der Glaswerkstatt ein eigenes Fenster gestalten.',
render:function(root,ctx){
  var el=ctx.el,button=ctx.button,d=ctx.data,alive=true;
  var tabs=el('div','window-tabs');tabs.setAttribute('role','tablist');root.appendChild(tabs);
  var pane=el('div','window-pane');root.appendChild(pane);
  var tPuzzle=button('🧩 Puzzle',function(){showPuzzle();},'btn ghost window-tab'),tPaint=button('🎨 Glaswerkstatt',function(){if(d.fensterDone)showPaint();},'btn ghost window-tab');
  tabs.appendChild(tPuzzle);tabs.appendChild(tPaint);
  function tab(which){[tPuzzle,tPaint].forEach(function(b){b.setAttribute('aria-selected',String(b===which));b.classList.toggle('active',b===which);});tPaint.disabled=!d.fensterDone;tPaint.title=d.fensterDone?'':'Öffnet sich, wenn das Puzzle gelegt ist.';}

  /* ---------- Puzzle ---------- */
  function tileStyle(t,n){var col=n%N,row=Math.floor(n/N),tw=IMG.cw/N,th=IMG.ch/N;
    t.style.backgroundSize=(IMG.w/tw*100)+'% '+(IMG.h/th*100)+'%';
    t.style.backgroundPosition=((IMG.x+col*tw)/(IMG.w-tw)*100)+'% '+((IMG.y+row*th)/(IMG.h-th)*100)+'%';}
  function showPuzzle(){tab(tPuzzle);pane.replaceChildren();var mode=d.fensterMode==='slide'?'slide':'swap';
    var modes=el('div','window-modes');pane.appendChild(modes);
    [['swap','Tauschen · leicht'],['slide','Schieben · knifflig']].forEach(function(m){var b=button(m[1],function(){d.fensterMode=m[0];ctx.save();showPuzzle();},'btn ghost window-mode');b.setAttribute('aria-pressed',String(mode===m[0]));modes.appendChild(b);});
    var help=el('p','window-help',mode==='swap'?'Tippt ein Teil an und dann das Teil, mit dem es den Platz tauschen soll.':'Tippt ein Teil neben der Lücke an – es rutscht hinein. Wie bei einem echten Schiebepuzzle.');pane.appendChild(help);
    var layout=el('div','window-layout');pane.appendChild(layout);
    var board=el('div','window-board');board.setAttribute('role','group');board.setAttribute('aria-label','Puzzle-Fläche mit neun Feldern');layout.appendChild(board);
    var side=el('div','window-side');layout.appendChild(side);
    var ref=el('div','window-ref');side.appendChild(el('p','window-ref-label','So soll es aussehen:'));tileStyle(ref,0);ref.style.backgroundSize=(IMG.w/IMG.cw*100)+'% '+(IMG.h/IMG.ch*100)+'%';ref.style.backgroundPosition=(IMG.x/(IMG.w-IMG.cw)*100)+'% 0%';side.appendChild(ref);
    var counter=el('p','round-count window-count');side.appendChild(counter);
    var marks=el('label','window-marks'),mbox=el('input');mbox.type='checkbox';mbox.checked=!!d.fensterMarks;marks.appendChild(mbox);marks.appendChild(document.createTextNode(' Richtige Teile markieren'));side.appendChild(marks);
    mbox.addEventListener('change',function(){d.fensterMarks=mbox.checked;ctx.save();render();});
    side.appendChild(button('🔀 Neu mischen',function(){start();render();},'btn ghost'));
    var status=el('p','window-status');status.setAttribute('role','status');pane.appendChild(status);
    var order,picked=-1,moves=0,solved=false,blank=N*N-1;
    function isSolved(){return order.every(function(v,i){return v===i;});}
    function neighbors(i){var r=Math.floor(i/N),c=i%N,a=[];if(r>0)a.push(i-N);if(r<N-1)a.push(i+N);if(c>0)a.push(i-1);if(c<N-1)a.push(i+1);return a;}
    function start(){moves=0;solved=false;picked=-1;order=[];for(var i=0;i<N*N;i++)order.push(i);
      if(mode==='swap'){do{order=U.shuffle(order);}while(isSolved()||order.filter(function(v,i){return v===i;}).length>2);}
      else{var at=blank,prev=-1;for(var k=0;k<60||isSolved();k++){var nb=neighbors(at).filter(function(n){return n!==prev;}),n=nb[Math.floor(Math.random()*nb.length)];order[at]=order[n];order[n]=blank;prev=at;at=n;}}}
    function render(){board.replaceChildren();board.classList.toggle('solved',solved);board.classList.toggle('slide',mode==='slide');
      order.forEach(function(piece,i){var isBlank=mode==='slide'&&piece===blank&&!solved;var t=el('button','window-tile'+(isBlank?' blank':'')+(picked===i?' picked':'')+(d.fensterMarks&&piece===i&&!isBlank&&!solved?' right':''));t.type='button';
        if(!isBlank)tileStyle(t,piece);t.setAttribute('aria-label',isBlank?'Lücke':'Teil '+(piece+1)+' auf Feld '+(i+1)+(d.fensterMarks&&piece===i?', richtig':''));
        if(solved||isBlank)t.disabled=true;t.addEventListener('click',function(){tap(i);});board.appendChild(t);});
      counter.textContent=moves+(moves===1?' Zug':' Züge');}
    function tap(i){if(solved)return;
      if(mode==='swap'){if(picked<0){picked=i;status.textContent='Teil gewählt – jetzt das Ziel antippen.';}else{if(picked!==i){var v=order[i];order[i]=order[picked];order[picked]=v;moves++;status.textContent='';}picked=-1;}}
      else{var b=order.indexOf(blank);if(neighbors(b).indexOf(i)<0){status.textContent='Nur Teile direkt neben der Lücke können rutschen.';return;}order[b]=order[i];order[i]=blank;moves++;status.textContent='';}
      if(isSolved()){solved=true;render();win();return;}
      render();var again=board.children[i];if(again&&!again.disabled)again.focus({preventScroll:true});}
    function win(){var first=!d.fensterDone;ctx.done();tab(tPuzzle);var best=d['fensterBest_'+mode];if(typeof best!=='number'||moves<best)d['fensterBest_'+mode]=moves;ctx.save();
      status.textContent='';var box=el('div','bonus-result');box.appendChild(el('h3','','🌈 Das Fenster leuchtet wieder!'));
      box.appendChild(el('p','','Gelegt in '+moves+' Zügen'+(best!==undefined&&moves>=best?' (euer bester Wert: '+best+').':'.')+' '+(first?'Die Glaswerkstatt ist jetzt geöffnet.':'')));
      box.appendChild(button('🎨 Zur Glaswerkstatt →',showPaint,'btn sunshine'));box.appendChild(button('Nochmal puzzeln',function(){start();render();box.remove();},'btn ghost'));pane.appendChild(box);box.querySelector('button').focus({preventScroll:true});}
    start();render();}

  /* ---------- Glaswerkstatt ---------- */
  function showPaint(){tab(tPaint);pane.replaceChildren();var paint=Array.isArray(d.fensterPaint)&&d.fensterPaint.length===PATHS.length?d.fensterPaint:PATHS.map(function(){return -1;});var color=typeof d.fensterColor==='number'?d.fensterColor:3,light=true;
    pane.appendChild(el('p','window-help','Wählt eine Glasfarbe und tippt auf die Scheiben. Alles ist erlaubt – es gibt kein Richtig oder Falsch.'));
    var layout=el('div','paint-layout');pane.appendChild(layout);
    var frame=el('div','paint-frame');layout.appendChild(frame);
    var NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 400 600');svg.setAttribute('class','paint-svg');svg.setAttribute('role','group');svg.setAttribute('aria-label','Glasfenster zum Ausmalen mit '+PATHS.length+' Scheiben');frame.appendChild(svg);
    var defs=document.createElementNS(NS,'defs');defs.innerHTML='<radialGradient id="glassShine" cx="50%" cy="28%" r="70%"><stop offset="0" stop-color="#fffbe6" stop-opacity=".55"/><stop offset=".55" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient><clipPath id="archClip"><path d="M40 580L40 180A160 160 0 0 1 360 180L360 580Z"/></clipPath>';svg.appendChild(defs);
    var shapes=PATHS.map(function(dpath,i){var p=document.createElementNS(NS,'path');p.setAttribute('d',dpath);p.setAttribute('class','pane');p.setAttribute('tabindex','0');p.setAttribute('role','button');
      function fill(){p.setAttribute('fill',paint[i]<0?EMPTY:GLASS[paint[i]][1]);p.setAttribute('aria-label','Scheibe '+(i+1)+': '+(paint[i]<0?'noch leer':GLASS[paint[i]][0]));}
      p._fill=fill;fill();
      function set(){paint[i]=color;fill();store();if(d.echoSound)U.tone(300+color*40,.18);}
      p.addEventListener('click',set);p.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();set();}});svg.appendChild(p);return p;});
    var shine=document.createElementNS(NS,'path');shine.setAttribute('d','M40 580L40 180A160 160 0 0 1 360 180L360 580Z');shine.setAttribute('fill','url(#glassShine)');shine.setAttribute('pointer-events','none');shine.setAttribute('class','paint-shine');svg.appendChild(shine);
    var frameLine=document.createElementNS(NS,'path');frameLine.setAttribute('d','M40 580L40 180A160 160 0 0 1 360 180L360 580Z');frameLine.setAttribute('class','paint-stone');svg.appendChild(frameLine);
    var rays=el('div','paint-rays');rays.setAttribute('aria-hidden','true');frame.appendChild(rays);
    function store(){d.fensterPaint=paint.slice();ctx.save();rays.style.setProperty('--c1',col(1));rays.style.setProperty('--c2',col(9));rays.style.setProperty('--c3',col(21));rays.style.setProperty('--c4',col(30));}
    function col(i){return paint[i]<0?'#fff5d0':GLASS[paint[i]][1];}
    var tools=el('div','paint-tools');layout.appendChild(tools);
    tools.appendChild(el('h3','','Glasfarben'));var pal=el('div','paint-palette');tools.appendChild(pal);
    GLASS.concat([['Radierer',null]]).forEach(function(gc,k){var idx=k<GLASS.length?k:-1,b=button('',function(){color=idx;d.fensterColor=idx;ctx.save();mark();},'paint-swatch'+(idx<0?' eraser':''));b.style.setProperty('--glass',gc[1]||EMPTY);b.setAttribute('aria-label',gc[0]);b.title=gc[0];if(idx<0)b.textContent='⌫';pal.appendChild(b);});
    function mark(){Array.from(pal.children).forEach(function(b,k){var idx=k<GLASS.length?k:-1;b.setAttribute('aria-pressed',String(idx===color));});now.textContent='Pinsel: '+(color<0?'Radierer':GLASS[color][0]);}
    var now=el('p','paint-now');tools.appendChild(now);mark();
    var row=el('div','paint-actions');tools.appendChild(row);
    row.appendChild(button('✨ Überraschung',function(){var s=surprise();paint=PATHS.map(function(_,i){return s[i]!==undefined?s[i]:Math.floor(Math.random()*GLASS.length);});shapes.forEach(function(p){p._fill();});store();},'btn ghost'));
    row.appendChild(button('🪣 Alles in dieser Farbe',function(){if(color<0)return;paint=paint.map(function(v){return v<0?color:v;});shapes.forEach(function(p){p._fill();});store();},'btn ghost'));
    row.appendChild(button('🧽 Neu beginnen',function(){if(!confirm('Das ganze Fenster leeren?'))return;paint=PATHS.map(function(){return -1;});shapes.forEach(function(p){p._fill();});store();},'btn ghost'));
    var lightBtn=button('',function(){light=!light;frame.classList.toggle('lit',light);lightBtn.textContent=light?'🌙 Licht aus':'☀️ Sonne scheinen lassen';},'btn sunshine');row.appendChild(lightBtn);
    frame.classList.toggle('lit',light);lightBtn.textContent='🌙 Licht aus';
    tools.appendChild(el('p','paint-note','Euer Fenster wird auf diesem Gerät gespeichert. Tipp: Gestaltet zu zweit ein Fenster zu einem Gebot – und erklärt euch gegenseitig die Farben.'));
    store();}

  tab(tPuzzle);if(d.fensterDone&&d.fensterLast==='paint')showPaint();else showPuzzle();
  tPaint.addEventListener('click',function(){d.fensterLast='paint';ctx.save();});tPuzzle.addEventListener('click',function(){d.fensterLast='puzzle';ctx.save();});
  return {stop:function(){alive=false;}};
}});
})();
