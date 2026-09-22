/* Sorgenweg: hilfreiche Ratschläge machen den Rucksack leichter. */
(function(root){
  'use strict';
  var situations=[
    {worry:'Alle haben ein besseres Handy als ich. Bin ich weniger wert?',good:'Du darfst dir ein neues Handy wünschen. Dein Wert hängt aber nicht davon ab.',bad:'Kauf dir schnell ein besseres Handy. Dann bist du wieder genauso viel wert.',why:'Wünsche sind okay. Ein Mensch ist unabhängig von seinem Besitz wertvoll.'},
    {worry:'Meine beste Freundin spielt mit jemand anderem. Ich habe Angst, sie zu verlieren.',good:'Sag ihr, dass du gemeinsame Zeit vermisst. Sie darf trotzdem andere Freundschaften haben.',bad:'Sag ihr, sie muss sich zwischen dir und den anderen entscheiden.',why:'Nähe lässt sich wünschen, aber nicht erzwingen. Freundschaft ist kein Besitz.'},
    {worry:'Ich muss immer mithalten. Die anderen erleben viel tollere Sachen.',good:'Mach eine Vergleichspause. Überlege, was dir Freude macht, und sprich mit jemandem darüber.',bad:'Erfinde auch ein tolles Erlebnis. Dann kannst du endlich ohne Sorgen dazugehören.',why:'Du musst nichts erfinden, um dazuzugehören. Eine Pause vom Vergleichen kann entlasten.'},
    {worry:'Ich habe einen Fehler gemacht. Jetzt denken bestimmt alle schlecht von mir.',good:'Ein Fehler macht dich nicht zu einem schlechten Menschen. Schau, was du wiedergutmachen kannst.',bad:'Sorge dafür, dass niemand davon erfährt. Gib lieber jemand anderem die Schuld.',why:'Verantwortung und ein konkreter nächster Schritt helfen mehr als eine neue Lüge.'},
    {worry:'Ich verstehe die Aufgabe nicht und traue mich nicht zu fragen.',good:'Frag nach einem ersten Schritt. Hilfe anzunehmen gehört zum Lernen.',bad:'Schreib die Lösung ab. Dann sieht niemand, dass du etwas nicht verstanden hast.',why:'Eine Erklärung hilft beim Verstehen. Verstecken oder Abschreiben lässt die Unsicherheit bestehen.'},
    {worry:'Ich bin traurig. Ich will aber niemandem zur Last fallen.',good:'Du darfst traurig sein. Frag eine vertraute Person, ob sie dir zuhören kann.',bad:'Behalte es für dich und lächle. Gute Freunde haben schließlich schon genug eigene Probleme.',why:'Gefühle müssen nicht versteckt werden. Um Zuhören zu bitten ist erlaubt.'},
    {worry:'Jemand erzählt etwas Falsches über mich. Das macht mich wütend.',good:'Hol dir Unterstützung und stelle ruhig klar, was stimmt. Du musst das nicht allein lösen.',bad:'Erzähle etwas Schlimmeres über die Person. Dann hört sie bestimmt auf.',why:'Neue Gerüchte verletzen weitere Menschen. Unterstützung und eine klare Grenze können helfen.'},
    {worry:'Ich brauche eine Pause, aber alle erwarten, dass ich weitermache.',good:'Sag, dass du eine Pause brauchst. Gemeinsam könnt ihr einen machbaren nächsten Schritt suchen.',bad:'Ignoriere die Erschöpfung. Wenn du immer weitermachst, enttäuschst du niemanden.',why:'Eigene Grenzen zu achten ist wichtig. Erholung ist kein Versagen.'}
    ,{worry:'Ich wurde nicht zum Geburtstag eingeladen. Vielleicht mag mich niemand.',good:'Das tut weh. Eine Einladung entscheidet nicht über deinen Wert. Sprich mit jemandem, dem du vertraust.',bad:'Lade die Person künftig auch nie mehr ein und bring andere gegen sie auf.',why:'Enttäuschung darf da sein. Rache macht daraus oft einen größeren Streit.'},
    {worry:'Ich soll ein Geheimnis bewahren, aber es macht mir richtig Angst.',good:'Wenn dir ein Geheimnis Angst macht, darfst du Hilfe bei einer vertrauten erwachsenen Person holen.',bad:'Ein Versprechen gilt immer. Du darfst es selbst dann niemandem sagen, wenn du Angst hast.',why:'Belastende Geheimnisse musst du nicht allein tragen. Hilfe holen ist erlaubt.'},
    {worry:'In unserer Gruppe mache ich fast alles allein. Ich traue mich nicht, Nein zu sagen.',good:'Sprich an, was du bereits übernommen hast. Vereinbart gemeinsam eine faire Aufteilung.',bad:'Mach einfach alles fertig. Nur dann mögen dich die anderen weiterhin.',why:'Du musst dir Zugehörigkeit nicht durch Überlastung verdienen. Aufgaben dürfen fair verteilt werden.'},
    {worry:'Morgen muss ich etwas vortragen. Ich habe Angst, dass ich einen Fehler mache.',good:'Übe einen kleinen Abschnitt mit jemandem. Du darfst Pausen machen und auf deine Notizen schauen.',bad:'Lerne alles ohne Pause. Erst wenn du jeden Fehler ausschließen kannst, darfst du aufhören.',why:'Kleine Übungsschritte helfen. Niemand muss einen Vortrag vollkommen fehlerfrei halten.'}
  ];
  function createJourney(random){
    random=random||Math.random;
    var count=3,deck=[],current=-1,side=random()<.5?0:1;
    function draw(){
      if(!deck.length){deck=situations.map(function(_,i){return i;});for(var i=deck.length-1;i>0;i--){var j=Math.floor(random()*(i+1)),v=deck[i];deck[i]=deck[j];deck[j]=v;}if(deck.length>1&&deck[deck.length-1]===current){var x=deck[0];deck[0]=deck[deck.length-1];deck[deck.length-1]=x;}}
      current=deck.pop();
    }
    draw();
    return {count:function(){return count;},current:function(){return count?situations[current]:undefined;},side:function(){return side;},choose:function(good){if(!count)return 0;count+=good?-1:1;side=1-side;if(count)draw();return count;}};
  }
  function render(container,onSolved){
    var journey=createJourney(),locked=false,finished=false;
    function el(tag,cls,text){var n=document.createElement(tag);n.className=cls||'';if(text!==undefined)n.textContent=text;return n;}
    function button(text,cls,fn){var n=el('button',cls,text);n.type='button';n.addEventListener('click',fn);return n;}
    var game=el('section','worry-game');container.appendChild(game);
    game.appendChild(el('h2','','Der Weg mit dem Sorgenrucksack'));
    game.appendChild(el('p','worry-rules','Jona startet mit drei Sorgen. Hört zu und wählt den hilfreichen Rat der Menschen am Weg. Ein guter Rat nimmt einen Stein heraus, ein unpassender legt einen hinein. Schafft ihr es bis zum leeren Rucksack?'));
    var count=el('p','worry-count');count.setAttribute('role','status');game.appendChild(count);
    var scene=el('div','worry-scene');game.appendChild(scene);
    var speech=el('p','jona-speech');scene.appendChild(speech);
    var actors=el('div','worry-actors');scene.appendChild(actors);
    var left=el('div','adviser adviser-left'),right=el('div','adviser adviser-right');actors.appendChild(left);
    var walker=el('div','worry-walker');walker.setAttribute('aria-hidden','true');actors.appendChild(walker);
    var person=el('img','jona-person');person.src='assets/jona.png';person.alt='';walker.appendChild(person);
    var bag=el('div','worry-bag'),rocks=el('div','worry-rocks');bag.appendChild(rocks);walker.appendChild(bag);actors.appendChild(right);
    var feedback=el('p','worry-feedback','Welcher Rat hilft Jona, ohne Gefühle kleinzumachen?');feedback.setAttribute('role','status');game.appendChild(feedback);
    var next=button('Weitergehen →','btn sunshine',function(){if(!locked||finished)return;if(journey.count()===0){finished=true;next.disabled=true;onSolved();}else round(true);});next.hidden=true;game.appendChild(next);
    function refresh(){var n=journey.count();count.textContent=n+' '+(n===1?'Sorge':'Sorgen')+' im Rucksack';scene.style.setProperty('--bag-scale',String(.45+Math.min(1.15,n*.16)));scene.classList.toggle('worry-free',n===0);rocks.replaceChildren();for(var i=0;i<Math.min(n,12);i++)rocks.appendChild(el('span','worry-rock'));bag.setAttribute('data-count',String(n));}
    function round(focus){
      locked=false;next.hidden=true;scene.classList.remove('worry-good','worry-bad');refresh();
      var data=journey.current();speech.textContent='Jona: „'+data.worry+'“';left.replaceChildren();right.replaceChildren();feedback.textContent='Welcher Rat hilft Jona?';
      var choices=[{good:true,text:data.good},{good:false,text:data.bad}];if(journey.side()===1)choices.reverse();
      [left,right].forEach(function(side,i){
        var option=button(choices[i].text,'advice-bubble',function(){
          if(locked||finished)return;locked=true;var good=choices[i].good;journey.choose(good);refresh();
          scene.classList.add(good?'worry-good':'worry-bad');game.querySelectorAll('.advice-bubble').forEach(function(b){b.disabled=true;});option.classList.add(good?'advice-good':'advice-bad');
          feedback.textContent=(good?'✓ Ein Stein weniger. ':'✕ Ein zusätzlicher Stein. ')+data.why;
          if(journey.count()===0){speech.textContent='Jona: „Danke fürs Zuhören. Mein Rucksack ist jetzt leer!“';feedback.textContent+=' Geschafft! Im echten Leben dürfen Sorgen Zeit brauchen. Zuhören und Unterstützung können den Weg leichter machen.';next.textContent='Station abschließen ✓';}
          next.hidden=false;next.focus({preventScroll:true});
        });side.appendChild(option);var portrait=el('div','adviser-portrait');portrait.setAttribute('aria-hidden','true');side.appendChild(portrait);side.appendChild(el('span','adviser-name',i===0?'Rat vom linken Wegrand':'Rat vom rechten Wegrand'));
      });
      if(focus){speech.tabIndex=-1;speech.focus({preventScroll:true});}
    }
    round(false);
  }
  var api={render:render,createJourney:createJourney,situations:situations};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.WorryWalk=api;
})(typeof window==='undefined'?{}:window);
