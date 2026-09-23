(function(root){
'use strict';
function shuffle(list,random){random=random||Math.random;var a=list.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
function choices(length,previous,random){random=random||Math.random;var positions=Array.from({length:length},function(_,i){return i;}).filter(function(i){return length===2||i!==previous;});var at=positions[Math.floor(random()*positions.length)],rest=shuffle(Array.from({length:length-1},function(_,i){return i+1;}),random);rest.splice(at,0,0);return rest;}
function bag(value,good){return Math.max(0,Math.min(5,value+(good?-1:1)));}
function mountainDeck(random){random=random||Math.random;return shuffle(Array.from({length:10},function(_,i){return {id:i+1,trueStatement:i%2===0};}),random);}
function removeTwo(ids){return ids.slice(0,Math.max(0,ids.length-2));}
var api={shuffle:shuffle,choices:choices,bag:bag,mountainDeck:mountainDeck,removeTwo:removeTwo};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AdventureCore=api;
})(typeof window==='undefined'?{}:window);
