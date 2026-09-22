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
  ];
  function createJourney(){
    var queue=[0,1,2],next=3;
    return {count:function(){return queue.length;},current:function(){return situations[queue[0]];},choose:function(good){
      if(!queue.length)return 0;
      if(good)queue.shift();else{queue.push(queue.shift());queue.push(next++%situations.length);}
      return queue.length;
    }};
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
    var calmLabel=el('label','worry-calm'),calm=el('input');calm.type='checkbox';calm.checked=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    calm.addEventListener('change',function(){scene.classList.toggle('worry-still',calm.checked);});calmLabel.appendChild(calm);calmLabel.appendChild(document.createTextNode(' Bewegung pausieren'));game.appendChild(calmLabel);scene.classList.toggle('worry-still',calm.checked);
    function refresh(){var n=journey.count();count.textContent=n+' '+(n===1?'Sorge':'Sorgen')+' im Rucksack';scene.style.setProperty('--bag-scale',String(.45+Math.min(1.15,n*.16)));scene.style.setProperty('--pace',Math.min(1.9,.65+n*.13)+'s');scene.classList.toggle('worry-free',n===0);rocks.replaceChildren();for(var i=0;i<Math.min(n,12);i++)rocks.appendChild(el('span','worry-rock'));bag.setAttribute('data-count',String(n));}
    function round(focus){
      locked=false;next.hidden=true;scene.classList.remove('worry-good','worry-bad');refresh();
      var data=journey.current();speech.textContent='Jona: „'+data.worry+'“';left.replaceChildren();right.replaceChildren();feedback.textContent='Welcher Rat hilft Jona?';
      var choices=[{good:true,text:data.good},{good:false,text:data.bad}];if(Math.random()<.5)choices.reverse();
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
