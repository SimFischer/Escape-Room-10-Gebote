(function(){
  'use strict';
  var button=document.getElementById('fullscreenBtn'),status=document.getElementById('fullscreenStatus');
  function refresh(){var active=!!document.fullscreenElement;button.textContent=active?'⛶ Vollbild verlassen':'⛶ Vollbild';button.setAttribute('aria-pressed',String(active));}
  button.addEventListener('click',async function(){
    status.hidden=true;
    try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else throw new Error('unsupported');}
    catch(e){status.textContent='Vollbild ist hier nicht verfügbar. Öffnet das Spiel direkt im Browser. Am Computer könnt ihr auch F11 verwenden (auf manchen Geräten Fn + F11).';status.hidden=false;}
    refresh();
  });
  document.addEventListener('fullscreenchange',refresh);refresh();
})();
