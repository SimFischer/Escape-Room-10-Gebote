/* Bonusspiel 2 · Der Aufstieg zum Gipfel
   Kleines Jump-and-Run auf Canvas. Jona steigt auf Moses Spuren zum Gipfel
   und sammelt die zehn Tafelfragmente. Kein Zeitlimit, keine Leben:
   Wer abrutscht, macht beim letzten Steinmännchen weiter. */
(function(){
'use strict';
var B=window.KapelleBonus;if(!B)return;var U=B.util;
var W=960,H=540;                                   /* logische Bühnengröße */
var GRAV=2300,JUMP=900,RUN=270,COYOTE=0.12,BUFFER=0.14;
var PW=30,PH=62;                                   /* Trefferbox der Figur */

/* Der Weg wird aus Abschnitten gebaut: [Lücke, Höhenunterschied, Breite].
   Negative Werte = höher hinauf. Alle Sprünge sind bewusst kurz und gutmütig. */
var PATH=[[70,-40,180],[70,-50,170],[70,-30,260],[70,-50,180],[70,-50,170],[70,20,240],[80,-60,170],[70,-60,170],[70,-50,260],[70,30,170],
          [70,-50,170],[70,-60,260],[80,-50,170],[70,-50,170],[70,40,180],[70,-60,260],[80,-50,170],[70,-60,170],[70,-50,170],[70,40,180],
          [70,-60,260],[80,-50,170],[70,-50,170],[70,-60,180],[70,-50,560]];
var LEDGES=[[-400,500,760]];PATH.forEach(function(s){var l=LEDGES[LEDGES.length-1];LEDGES.push([l[0]+l[2]+s[0],l[1]+s[1],s[2]]);});
function top(i){return LEDGES[i][1];}function mid(i){return LEDGES[i][0]+LEDGES[i][2]/2;}
/* Felsbrocken als Hindernisse: [x, Boden-y, Radius] – auf den breiten Vorsprüngen */
var ROCKS=[3,6,9,12,16,21].map(function(i){return [LEDGES[i][0]+LEDGES[i][2]*.42,top(i),26];});
/* Tafelfragmente: auf Vorsprüngen, mit kleinem Hüpfer oder über Spalten als Sprungbelohnung */
var FRAGS=[[1,'mid'],[2,'gap'],[4,'hop'],[7,'gap'],[8,'mid'],[10,'gap'],[13,'hop'],[15,'mid'],[19,'gap'],[23,'hop']].map(function(f){var i=f[0];
  if(f[1]==='gap'){var e=LEDGES[i][0]+LEDGES[i][2],n=LEDGES[i+1][0];return [(e+n)/2,Math.min(top(i),top(i+1))-100];}
  return [mid(i)+(f[1]==='hop'?20:0),top(i)-(f[1]==='hop'?88:60)];});
/* Steinmännchen = Wiedereinstiegspunkte, jeweils hinter einem Felsbrocken */
var CAIRNS=[[40,500]].concat([3,6,9,12,16,21].map(function(i){return [LEDGES[i][0]+LEDGES[i][2]*.8,top(i)];}));
var LASTL=LEDGES[LEDGES.length-1],GOAL_X=LASTL[0]+200,GOAL_Y=LASTL[1];

/* kleiner, fester Zufallsgenerator für gleichbleibende Felsformen */
function rng(seed){return function(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};}

B.register({id:'aufstieg',order:2,need:4,title:'Der Aufstieg zum Gipfel',kind:'Geschicklichkeit · 5–10 Min.',doneText:'Gipfel erreicht',
intro:'Wie einst Mose steigt Jona auf den Berg. Unterwegs liegen die zehn Tafelfragmente. Springt über Felsbrocken und Spalten. Wer abrutscht, macht einfach beim letzten Steinmännchen weiter.',
render:function(root,ctx){
  var el=ctx.el,button=ctx.button,C=ctx.commandments,d=ctx.data;
  var wrap=el('div','climb-wrap');root.appendChild(wrap);
  var stage=el('div','climb-stage');stage.tabIndex=0;stage.setAttribute('role','application');stage.setAttribute('aria-label','Spielfläche: Aufstieg zum Gipfel. Pfeiltasten links und rechts zum Gehen, Leertaste oder Pfeil nach oben zum Springen.');wrap.appendChild(stage);
  var canvas=el('canvas','climb-canvas');stage.appendChild(canvas);var g=canvas.getContext('2d');
  var hud=el('div','climb-hud');stage.appendChild(hud);var hudTabs=[];for(var i=0;i<10;i++){var t=el('span','climb-frag',String(i+1));t.title=C[i].label;hud.appendChild(t);hudTabs.push(t);}
  var toast=el('p','climb-toast');toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');stage.appendChild(toast);
  var overlay=el('div','climb-overlay');stage.appendChild(overlay);
  var pad=el('div','climb-pad');pad.setAttribute('aria-hidden','true');stage.appendChild(pad);
  var bar=el('div','climb-bar');wrap.appendChild(bar);
  var pauseBtn=button('⏸ Pause',function(){running?pause():resume();},'btn ghost');var restartBtn=button('↺ Von vorn',function(){reset();resume();},'btn ghost');
  bar.appendChild(pauseBtn);bar.appendChild(restartBtn);bar.appendChild(el('span','climb-keys','Steuerung: ← → gehen · ↑ oder Leertaste springen'));wrap.appendChild(el('p','climb-rotate','📱↻ Tipp: Haltet das Gerät quer – dann wird die Bergwelt größer. Vollbild hilft auch.'));

  var img=new Image();img.src='assets/jona.png';var sky=new Image();sky.src='assets/berg.png';
  var keys={left:false,right:false,jump:false},p,cam,got,cp,running=false,alive=true,last=0,raf=0,shapes=[],sparks=[],toastT=0,finished=false,falls=0;

  /* Felsformen einmal vorberechnen: unregelmäßige, gezeichnete Oberkanten */
  LEDGES.forEach(function(L,k){var r=rng(k*97+13),pts=[],n=Math.max(3,Math.round(L[2]/45));for(var j=0;j<=n;j++)pts.push([L[0]+L[2]*j/n,L[1]+(j===0||j===n?4:(r()*6-3))]);var grass=[];for(var q=0;q<n;q++)if(r()>.45)grass.push(L[0]+12+r()*(L[2]-24));var cracks=[];for(var c=0;c<3;c++)cracks.push([L[0]+12+r()*(L[2]-24),L[1]+30+r()*140,r()]);shapes.push({pts:pts,grass:grass,cracks:cracks,tone:r()});});

  function reset(){got=[];cp=0;falls=0;finished=false;spawn();hudTabs.forEach(function(t){t.classList.remove('got','missing');});overlay.replaceChildren();overlay.hidden=true;}
  function spawn(){var c=CAIRNS[cp];p={x:c[0]+20,y:c[1]-PH,vx:0,vy:0,ground:true,face:1,coyote:0,buffer:0,walk:0,lastGround:c[1]};cam={x:p.x-W*0.35,y:p.y-H*0.6};}
  function solids(){var list=LEDGES.map(function(L){return {x:L[0],y:L[1],w:L[2],h:2400};});ROCKS.forEach(function(R){list.push({x:R[0]-R[2]*0.9,y:R[1]-R[2]*1.6,w:R[2]*1.8,h:R[2]*1.6,rock:true});});return list;}
  var SOLIDS=solids();

  function step(dt){
    var dir=(keys.right?1:0)-(keys.left?1:0);p.vx=dir*RUN;if(dir)p.face=dir;
    p.coyote=p.ground?COYOTE:Math.max(0,p.coyote-dt);p.buffer=keys.jumpPressed?BUFFER:Math.max(0,p.buffer-dt);keys.jumpPressed=false;
    if(p.buffer>0&&p.coyote>0){p.vy=-JUMP;p.coyote=0;p.buffer=0;p.ground=false;}
    if(!keys.jump&&p.vy<-320)p.vy=-320;                    /* kurz tippen = kleiner Sprung */
    p.vy=Math.min(p.vy+GRAV*dt,1400);
    /* horizontal bewegen und seitlich an Felsen stoppen */
    p.x+=p.vx*dt;SOLIDS.forEach(function(s){if(hit(s)){if(p.vx>0)p.x=s.x-PW;else if(p.vx<0)p.x=s.x+s.w;}});
    p.y+=p.vy*dt;var wasGround=p.ground;p.ground=false;
    SOLIDS.forEach(function(s){if(hit(s)){if(p.vy>0){p.y=s.y-PH;p.vy=0;p.ground=true;}else if(p.vy<0){p.y=s.y+s.h;p.vy=0;}}});
    if(p.ground){p.lastGround=p.y+PH;if(!wasGround)p.land=0.18;}
    p.land=Math.max(0,(p.land||0)-dt);
    p.walk+=p.ground&&dir?dt*10:0;
    if(p.x<-380)p.x=-380;
    /* Steinmännchen erreichen */
    CAIRNS.forEach(function(c,k){if(k>cp&&Math.abs(p.x+PW/2-c[0])<40&&Math.abs(p.y+PH-c[1])<20){cp=k;say('⛳ Steinmännchen erreicht – hier geht es weiter, falls ihr abrutscht.');burst(c[0],c[1]-40,'#ffd35c');}});
    /* Fragmente einsammeln */
    FRAGS.forEach(function(f,k){if(got.indexOf(k)<0&&Math.abs(p.x+PW/2-f[0])<34&&Math.abs(p.y+PH/2-f[1])<48){got.push(k);hudTabs[k].classList.add('got');hudTabs[k].classList.remove('missing');say('✦ Fragment '+(k+1)+': '+C[k].label);burst(f[0],f[1],'#fff2a8');}});
    /* abgerutscht? */
    if(p.y+PH>p.lastGround+620){falls++;spawn();say('Hoppla! Jona startet wieder am Steinmännchen. Nichts geht verloren.');}
    /* Gipfel */
    if(!finished&&p.x>GOAL_X-60&&p.ground){if(got.length===10)win();else if(!toastT||toast.dataset.goal!=='1'){var miss=[];for(var m=0;m<10;m++)if(got.indexOf(m)<0){miss.push(m+1);hudTabs[m].classList.add('missing');}say('Fast oben! Es fehlen noch '+miss.length+' Fragmente ('+miss.join(', ')+'). Sie liegen weiter unten am Weg.',true);}}
    /* Kamera folgt weich, mit etwas Vorausblick */
    var tx=p.x-W*0.36+p.face*40,ty=p.y-H*0.58;cam.x+=(tx-cam.x)*Math.min(1,dt*4);cam.y+=(ty-cam.y)*Math.min(1,dt*3.2);
    if(toastT>0){toastT-=dt;if(toastT<=0){toast.classList.remove('show');toast.dataset.goal='';}}
  }
  function hit(s){return p.x<s.x+s.w&&p.x+PW>s.x&&p.y<s.y+s.h&&p.y+PH>s.y;}
  function say(text,goal){toast.textContent=text;toast.classList.add('show');toastT=goal?4:2.6;toast.dataset.goal=goal?'1':'';}
  function burst(x,y,c){if(U.reducedMotion())return;for(var k=0;k<16;k++){var a=Math.random()*Math.PI*2,v=120+Math.random()*180;sparks.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-160,t:.7+Math.random()*.4,c:c});}}

  /* ---------- Zeichnen im Stil der App: dicke Tintenkonturen, warme Flächen ---------- */
  var INK='#38291f';
  function draw(time){
    var s=canvas.width/W;g.setTransform(s,0,0,s,0,0);
    /* Himmel: Bergbild als ruhige Kulisse mit leichter Parallaxe */
    g.fillStyle='#bfe3ef';g.fillRect(0,0,W,H);
    if(sky.complete&&sky.naturalWidth){var sc=1.25,iw=W*sc,ih=iw*sky.naturalHeight/sky.naturalWidth,ox=-Math.max(0,Math.min(iw-W,(cam.x+400)*0.035)),oy=-Math.max(0,Math.min(ih-H,(ih-H)*(0.15+Math.min(0.85,Math.max(0,(cam.y+560)/1500)))));g.drawImage(sky,ox,oy,iw,ih);g.fillStyle='rgba(255,236,190,.18)';g.fillRect(0,0,W,H);}
    /* ferne Felsgrate (Parallaxe) */
    ridge(0.3,'rgba(92,140,146,.55)',470,60,11);
    g.save();g.translate(-Math.round(cam.x),-Math.round(cam.y));
    LEDGES.forEach(function(L,k){if(L[0]+L[2]<cam.x-40||L[0]>cam.x+W+40)return;ledge(L,shapes[k]);});
    ROCKS.forEach(function(R){if(R[0]<cam.x-60||R[0]>cam.x+W+60)return;boulder(R);});
    CAIRNS.forEach(function(c,k){if(c[0]<cam.x-60||c[0]>cam.x+W+60)return;cairn(c,k<=cp);});
    summit(time);
    FRAGS.forEach(function(f,k){if(got.indexOf(k)>=0||f[0]<cam.x-40||f[0]>cam.x+W+40)return;fragment(f[0],f[1]+Math.sin(time/380+k)*5,k+1,time);});
    player(time);
    sparks.forEach(function(s){g.globalAlpha=Math.min(1,s.t*2);g.fillStyle=s.c;g.strokeStyle=INK;g.lineWidth=1.5;g.beginPath();g.moveTo(s.x,s.y-6);g.lineTo(s.x+4,s.y);g.lineTo(s.x,s.y+6);g.lineTo(s.x-4,s.y);g.closePath();g.fill();g.stroke();});g.globalAlpha=1;
    g.restore();
  }
  function ridge(f,fill,base,amp,seed){var ox=-(cam.x*f)%480-480,y0=base-cam.y*f*0.5;g.beginPath();g.moveTo(ox,H+10);for(var x=ox;x<=W+960;x+=80){var h=(Math.sin((x-ox)/137+seed)+Math.sin((x-ox)/61+seed*2))*amp*0.5;g.lineTo(x,y0-h);}g.lineTo(W+960,H+10);g.closePath();g.fillStyle=fill;g.fill();g.lineWidth=2.5;g.strokeStyle='rgba(56,41,31,.35)';g.stroke();}
  function ledge(L,S){var x=L[0],y=L[1],w=L[2],bot=y+900;
    var grd=g.createLinearGradient(0,y,0,y+260);grd.addColorStop(0,S.tone>.5?'#f6cf74':'#efc067');grd.addColorStop(.35,'#d69a52');grd.addColorStop(1,'#8e5a33');
    g.beginPath();g.moveTo(S.pts[0][0],S.pts[0][1]);S.pts.forEach(function(pt){g.lineTo(pt[0],pt[1]);});g.lineTo(x+w-6,y+60);g.lineTo(x+w+4,bot);g.lineTo(x-4,bot);g.lineTo(x+6,y+50);g.closePath();
    g.fillStyle=grd;g.fill();g.lineJoin='round';g.lineWidth=4;g.strokeStyle=INK;g.stroke();
    /* helle Oberkante und Risse */
    g.beginPath();g.moveTo(S.pts[0][0]+6,S.pts[0][1]+7);S.pts.slice(1,-1).forEach(function(pt){g.lineTo(pt[0],pt[1]+7);});g.lineTo(x+w-6,y+9);g.lineWidth=5;g.strokeStyle='rgba(255,241,196,.55)';g.stroke();
    g.lineWidth=2.5;g.strokeStyle='rgba(56,41,31,.55)';S.cracks.forEach(function(c){g.beginPath();g.moveTo(c[0],c[1]);g.lineTo(c[0]+10-c[2]*20,c[1]+24);g.lineTo(c[0]+4,c[1]+46);g.stroke();});
    g.lineWidth=2;g.strokeStyle='rgba(120,74,38,.35)';[70,150,240].forEach(function(o,k){g.beginPath();g.moveTo(x+4,y+o);g.bezierCurveTo(x+w*.3,y+o+8-k*4,x+w*.7,y+o-8+k*3,x+w-2,y+o+3);g.stroke();});
    /* Grasbüschel */
    S.grass.forEach(function(gx){g.beginPath();g.moveTo(gx-9,y+3);g.quadraticCurveTo(gx-8,y-12,gx-12,y-18);g.quadraticCurveTo(gx-2,y-10,gx,y-20);g.quadraticCurveTo(gx+3,y-8,gx+12,y-15);g.quadraticCurveTo(gx+9,y-2,gx+10,y+3);g.closePath();g.fillStyle='#7fae55';g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();});}
  function boulder(R){var x=R[0],y=R[1],r=R[2];g.beginPath();g.moveTo(x-r*.95,y);g.bezierCurveTo(x-r*1.1,y-r*1.2,x-r*.3,y-r*1.75,x+r*.25,y-r*1.6);g.bezierCurveTo(x+r*1.05,y-r*1.45,x+r*1.05,y-r*.4,x+r*.9,y);g.closePath();
    var grd=g.createLinearGradient(x-r,y-r*1.6,x+r,y);grd.addColorStop(0,'#e7d3a8');grd.addColorStop(1,'#a88257');g.fillStyle=grd;g.fill();g.lineWidth=4;g.strokeStyle=INK;g.stroke();
    g.beginPath();g.arc(x-r*.25,y-r*1.1,r*.35,Math.PI*1.1,Math.PI*1.7);g.lineWidth=3;g.strokeStyle='rgba(255,247,220,.8)';g.stroke();}
  function cairn(c,on){var x=c[0],y=c[1];[[0,-10,18,10],[2,-27,14,8],[-1,-41,10,7]].forEach(function(s){g.beginPath();g.ellipse(x+s[0],y+s[1],s[2],s[3],0,0,Math.PI*2);g.fillStyle='#cdbb98';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();});
    g.beginPath();g.moveTo(x,y-48);g.lineTo(x,y-86);g.lineWidth=3;g.strokeStyle=INK;g.stroke();g.beginPath();g.moveTo(x,y-86);g.lineTo(x+28,y-78);g.lineTo(x,y-68);g.closePath();g.fillStyle=on?'#ef805b':'#d8cdb8';g.fill();g.lineWidth=2.5;g.stroke();}
  function tablet(x,y,w,h,fill){g.beginPath();g.moveTo(x,y+h);g.lineTo(x,y+w/2);g.arc(x+w/2,y+w/2,w/2,Math.PI,0);g.lineTo(x+w,y+h);g.closePath();g.fillStyle=fill;g.fill();g.lineWidth=3.5;g.strokeStyle=INK;g.stroke();}
  function fragment(x,y,n,time){var pulse=.5+.5*Math.sin(time/300+n);g.beginPath();g.arc(x,y,30+pulse*4,0,Math.PI*2);g.fillStyle='rgba(255,226,120,'+(.25+pulse*.2)+')';g.fill();
    g.save();g.translate(x,y);g.rotate(Math.sin(time/700+n)*.12);tablet(-15,-21,30,42,'#e4dccb');g.fillStyle=INK;g.font='bold 17px Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),0,4);g.restore();}
  function summit(time){var x=GOAL_X,y=GOAL_Y;if(x<cam.x-200||x>cam.x+W+200)return;var glow=g.createRadialGradient(x+60,y-120,10,x+60,y-120,260);glow.addColorStop(0,'rgba(255,245,200,.85)');glow.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=glow;g.fillRect(x-220,y-400,560,420);
    g.save();g.translate(x+60,y-120);g.rotate(time/9000);for(var k=0;k<12;k++){g.rotate(Math.PI/6);g.beginPath();g.moveTo(0,0);g.lineTo(-18,-230);g.lineTo(18,-230);g.closePath();g.fillStyle='rgba(255,240,170,.18)';g.fill();}g.restore();
    var full=got.length===10;tablet(x+14,y-112,44,112,full?'#f1ead8':'#cfc6b3');tablet(x+66,y-112,44,112,full?'#f1ead8':'#cfc6b3');
    g.fillStyle=INK;g.font='bold 13px Georgia, serif';g.textAlign='center';for(var k=0;k<5;k++){g.fillText(got.indexOf(k)>=0?String(k+1):'·',x+36,y-76+k*14);g.fillText(got.indexOf(k+5)>=0?String(k+6):'·',x+88,y-76+k*14);}}
  function player(time){var x=p.x+PW/2,y=p.y+PH,w=58,h=87;g.save();g.translate(x,y);
    if(p.land>0)g.scale(1+p.land*.6,1-p.land*.6);
    var bob=p.ground&&keys.left!==keys.right?Math.abs(Math.sin(p.walk))*-4:0,tilt=p.ground?(keys.left!==keys.right?Math.sin(p.walk)*.06:0):Math.max(-.2,Math.min(.2,p.vy/4000))*p.face;
    g.fillStyle='rgba(56,41,31,.25)';g.beginPath();g.ellipse(0,0,20,5,0,0,Math.PI*2);if(p.ground)g.fill();
    g.translate(0,bob);g.rotate(tilt);g.scale(p.face,1);
    if(img.complete&&img.naturalWidth)g.drawImage(img,-w/2,-h,w,h);else{g.fillStyle='#e3b23c';g.fillRect(-15,-62,30,62);}
    g.restore();}

  /* ---------- Schleife, Größe, Eingaben ---------- */
  function fit(){var r=stage.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.width*dpr*H/W);}
  function frame(t){if(!alive)return;if(!stage.isConnected){stop();return;}var dt=Math.min(0.033,(t-last)/1000||0);last=t;if(running&&!finished){var n=2;for(var k=0;k<n;k++)step(dt/n);}sparks=sparks.filter(function(s){s.t-=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=500*dt;return s.t>0;});draw(t);raf=requestAnimationFrame(frame);}
  function pause(){if(finished)return;running=false;pauseBtn.textContent='▶ Weiter';overlay.hidden=false;overlay.replaceChildren();overlay.appendChild(el('h3','','Pause'));overlay.appendChild(button('▶ Weiter klettern',resume,'btn sunshine'));}
  function resume(){if(finished)return;if(!running){var r=stage.getBoundingClientRect();if(r.top<0||r.bottom>window.innerHeight)stage.scrollIntoView({block:'center',behavior:'instant'});}running=true;pauseBtn.textContent='⏸ Pause';overlay.hidden=true;overlay.replaceChildren();stage.focus({preventScroll:true});}
  function win(){finished=true;running=false;d.aufstiegFalls=falls;ctx.done();burst(GOAL_X+60,GOAL_Y-100,'#ffd35c');burst(GOAL_X+40,GOAL_Y-60,'#8ec890');say('⛰️ Die Tafeln sind vollständig!');
    setTimeout(function(){if(!alive||!finished)return;overlay.hidden=false;overlay.replaceChildren();var box=el('div','bonus-result');box.appendChild(el('h3','','⛰️ Gipfel erreicht!'));
    box.appendChild(el('p','','Alle zehn Fragmente sind zusammen: Die Tafeln sind vollständig. '+(falls?'Jona ist '+falls+' Mal abgerutscht – und jedes Mal weitergegangen.':'Jona ist kein einziges Mal abgerutscht!')));
    box.appendChild(el('p','','Nach der Erzählung empfängt Mose die Gebote auf dem Berg Sinai – als Weisung für ein gutes Zusammenleben in Freiheit.'));
    box.appendChild(button('Nochmal klettern',function(){reset();resume();},'btn sunshine'));box.appendChild(button('Zur Schatzkammer',ctx.back,'btn ghost'));overlay.appendChild(box);box.querySelector('button').focus({preventScroll:true});},U.reducedMotion()?0:1600);}
  function key(e,down){if(!stage.isConnected||document.querySelector('dialog[open]'))return;var k=e.key,tag=(e.target&&e.target.tagName)||'';if(tag==='INPUT'||tag==='TEXTAREA')return;var isBtn=tag==='BUTTON';
    if(k==='ArrowLeft'||k==='a'||k==='A'){keys.left=down;e.preventDefault();}
    else if(k==='ArrowRight'||k==='d'||k==='D'){keys.right=down;e.preventDefault();}
    else if(k==='ArrowUp'||k==='w'||k==='W'||(k===' '&&!isBtn)){if(down&&!keys.jump)keys.jumpPressed=true;keys.jump=down;e.preventDefault();}
    else if((k==='Escape'||k==='p'||k==='P')&&down&&running){pause();}}
  function kd(e){key(e,true);}function ku(e){key(e,false);}
  function blur(){keys.left=keys.right=keys.jump=false;if(running)pause();}
  function vis(){if(document.hidden)blur();}
  window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);window.addEventListener('blur',blur);document.addEventListener('visibilitychange',vis);window.addEventListener('resize',fit);
  /* Touch-/Maus-Tasten */
  [['left','◀'],['right','▶'],['jump','⤒']].forEach(function(b){var t=el('button','climb-btn climb-'+b[0],b[1]);t.type='button';t.tabIndex=-1;
    function on(e){e.preventDefault();if(b[0]==='jump'&&!keys.jump)keys.jumpPressed=true;keys[b[0]]=true;t.classList.add('down');try{t.setPointerCapture(e.pointerId);}catch(_){}}
    function off(){keys[b[0]]=false;t.classList.remove('down');}
    t.addEventListener('pointerdown',on);t.addEventListener('pointerup',off);t.addEventListener('pointercancel',off);t.addEventListener('lostpointercapture',off);t.addEventListener('contextmenu',function(e){e.preventDefault();});pad.appendChild(t);});
  function stop(){alive=false;cancelAnimationFrame(raf);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',vis);window.removeEventListener('resize',fit);}

  stage.__debug=function(){return {p:p,got:got.slice(),cp:cp,finished:finished,falls:falls,L:LEDGES,R:ROCKS,F:FRAGS};};
  reset();fit();
  overlay.hidden=false;var start=el('div','bonus-result climb-start');start.appendChild(el('h3','','Auf zum Gipfel!'));start.appendChild(el('p','','Sammelt alle zehn Tafelfragmente. Die orangefarbenen Fähnchen an den Steinmännchen merken sich euren Weg.'));
  start.appendChild(button('▶ Losklettern',resume,'btn sunshine'));overlay.appendChild(start);
  raf=requestAnimationFrame(function(t){last=t;frame(t);});
  return {stop:stop};
}});
})();
