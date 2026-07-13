/* ============================
   Match Animal to Sound
   Part 1
============================ */

const animals = [
{
id:"cow",
name:"Cow",
image:"assets/cow.jpg",
sound:"assets/moo.mp3.mp3"
},
{
id:"dog",
name:"Dog",
image:"assets/dog.jpg",
sound:"assets/woof.mp3.mp3"
},
{
id:"cat",
name:"Cat",
image:"assets/cat.jpg",
sound:"assets/meow.mp3.mp3"
},
{
id:"horse",
name:"Horse",
image:"assets/horse.jpg",
sound:"assets/neigh.mp3.mp3"
},
{
id:"pig",
name:"Pig",
image:"assets/pig.jpg",
sound:"assets/oink.mp3.mp3"
},
{
id:"lion",
name:"Lion",
image:"assets/lion.jpg",
sound:"assets/roar.mp3.mp3"
},
{
id:"snake",
name:"Snake",
image:"assets/snake.jpg",
sound:"assets/hiss.mp3.mp3"
},
{
id:"tiger",
name:"Tiger",
image:"assets/tiger.jpg",
sound:"assets/growl.mp3.mp3"
}
];

/* ========================= */

let selectedSound = null;
let score = 0;
let matched = 0;

/* ========================= */

const animalColumn = document.getElementById("animalColumn");
const soundColumn = document.getElementById("soundColumn");

const scoreBox = document.getElementById("score");

const message = document.getElementById("message");

/* =========================
   PRELOAD AUDIO
========================= */

animals.forEach(a=>{
let audio = new Audio(a.sound);
audio.preload="auto";
});

document.getElementById("correctAudio").load();
document.getElementById("wrongAudio").load();

/* =========================
   SPEECH
========================= */

function speak(text){

if(!("speechSynthesis" in window))
return;

speechSynthesis.cancel();

const speech = new SpeechSynthesisUtterance(text);

speech.rate=.9;
speech.pitch=1.1;
speech.volume=1;

speechSynthesis.speak(speech);

}

/* =========================
   SHUFFLE
========================= */

function shuffle(array){

let arr=[...array];

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[arr[i],arr[j]]=[arr[j],arr[i]];

}

return arr;

}

/* =========================
   CREATE GAME
========================= */

function createGame(){

animalColumn.innerHTML="";
soundColumn.innerHTML="";

animals.forEach(animal=>{

let card=document.createElement("div");

card.className="animalCard";

card.dataset.id=animal.id;

card.innerHTML=`

<img src="${animal.image}" alt="${animal.name}">

<span>${animal.name}</span>

`;

card.onclick=()=>selectAnimal(card);

animalColumn.appendChild(card);

});

/* Shuffle Sounds */

shuffle(animals).forEach(animal=>{

let card=document.createElement("div");

card.className="soundCard";

card.dataset.id=animal.id;

card.innerHTML="🔊 Sound";

card.onclick=()=>{

document
.querySelectorAll(".soundCard")
.forEach(c=>c.classList.remove("selected"));

card.classList.add("selected");

selectedSound=animal.id;

/* play sound */

let audio=new Audio(animal.sound);

audio.play();

};

soundColumn.appendChild(card);

});

}

/* =========================
   SPLASH SCREEN
========================= */

window.onload=function(){

setTimeout(()=>{

document
.getElementById("logoScreen")
.classList.add("hidden");

document
.getElementById("instructionScreen")
.classList.remove("hidden");

speak(
"Welcome! Match the animal to its sound. Click a sound card and then click the matching animal picture."
);

},5000);

};

/* =========================
   START BUTTON
========================= */

document
.getElementById("startBtn")
.onclick=function(){

document
.getElementById("instructionScreen")
.classList.add("hidden");

document
.getElementById("gameScreen")
.classList.remove("hidden");

createGame();

speak(
"Let's begin. Click on a sound card and then tap the correct animal."
);

};/* =========================
   PART 2
========================= */

/* Correct Answer */

function showMessage(text,color){

message.innerHTML=text;
message.style.color=color;
message.style.display="block";

setTimeout(()=>{
message.style.display="none";
},1800);

}

/* ========================= */

function createStars(){

for(let i=0;i<20;i++){

let star=document.createElement("div");

star.className="star";

star.innerHTML="⭐";

star.style.left=Math.random()*100+"vw";
star.style.top="-50px";
star.style.animationDuration=(1+Math.random()*2)+"s";

document.body.appendChild(star);

setTimeout(()=>{
star.remove();
},2500);

}

}

/* ========================= */

function selectAnimal(card){

if(selectedSound===null){

speak("Click on a sound card first.");

return;

}

const animalID=card.dataset.id;

/* Correct */

if(animalID===selectedSound){

card.classList.add("correct");

document.querySelectorAll(".soundCard").forEach(sound=>{

if(sound.dataset.id===animalID){

sound.classList.add("correct");

sound.style.pointerEvents="none";

}

});

document.getElementById("correctAudio").play();

showMessage("⭐ ⭐ ⭐<br>👍","green");

createStars();

score++;
matched++;

scoreBox.innerHTML=score;

selectedSound=null;

if(matched===animals.length){

setTimeout(endGame,1500);

}

}

/* Wrong */

else{

document.getElementById("wrongAudio").play();

showMessage("❌<br>Try Again","red");

speak("Try again.");

}

}

/* =========================
   END GAME
========================= */

function endGame(){

document
.getElementById("gameScreen")
.classList.add("hidden");

document
.getElementById("endScreen")
.classList.remove("hidden");

document
.getElementById("finalScore")
.innerHTML=
"Your Score : "+score+" / "+animals.length;

speak(
"Congratulations! You scored "+
score+
" out of "+
animals.length
);

createConfetti();

}

/* =========================
   CONFETTI
========================= */

function createConfetti(){

for(let i=0;i<80;i++){

let confetti=document.createElement("div");

confetti.style.position="fixed";

confetti.style.width="10px";
confetti.style.height="10px";

const colors=[
"#ff0000",
"#00ff00",
"#0000ff",
"#ffff00",
"#ff00ff",
"#00ffff",
"#ff8800"
];

confetti.style.background=
colors[Math.floor(Math.random()*colors.length)];

confetti.style.left=
Math.random()*100+"vw";

confetti.style.top="-20px";

confetti.style.opacity="0.9";

confetti.style.zIndex="9999";

confetti.style.transition="all 3s linear";

document.body.appendChild(confetti);

setTimeout(()=>{

confetti.style.transform=
"translateY(110vh) rotate(720deg)";

confetti.style.opacity="0";

},50);

setTimeout(()=>{

confetti.remove();

},3200);

}

}

/* =========================
   EXTRA VOICE HELP
========================= */

let idleTimer;

function resetVoiceTimer(){

clearTimeout(idleTimer);

idleTimer=setTimeout(()=>{

if(matched<animals.length){

speak(
"Tap a sound card. Listen carefully and then tap the correct animal."
);

}

},12000);

}

document.addEventListener("click",resetVoiceTimer);

resetVoiceTimer();

/* =========================
   PREVENT IMAGE DRAG
========================= */

document.addEventListener("dragstart",function(e){

e.preventDefault();

});

/* =========================
   MOBILE TOUCH
========================= */

document.addEventListener("touchstart",function(){},{passive:true});

/* =========================
   GAME READY
========================= */

console.log("Match Animal To Sound Loaded Successfully");
