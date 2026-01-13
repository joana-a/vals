// DOM elements
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");
const poemLines = document.querySelectorAll(".poem-line");

const secretMsg = document.getElementById("secretMsg");
const secretBtn = document.getElementById("secretBtn");
const musicBtn = document.getElementById("musicBtn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cardHearts = document.getElementById("cardHearts");

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Background hearts
let particles = [];
function createParticle(x, y, color) {
    particles.push({x, y, vx:(Math.random()-0.5)*2, vy:Math.random()*-2-1, alpha:1, color, size:Math.random()*15+10});
}
let floatingHearts = [];
function createFloatingHeart() {
    floatingHearts.push({x:Math.random()*canvas.width, y:canvas.height+20, vy:Math.random()*-1-0.5, size:Math.random()*15+10, alpha:Math.random()*0.7+0.3, color:["#ff4d6d","#ff1a75","#ff99cc"][Math.floor(Math.random()*3)]});
}
function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    floatingHearts.forEach((p,i)=>{ctx.globalAlpha=p.alpha; ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.size/2,0,Math.PI*2); ctx.fill(); p.y+=p.vy; if(p.y<-20) floatingHearts.splice(i,1);});
    particles.forEach((p,i)=>{ctx.globalAlpha=p.alpha; ctx.fillStyle=p.color; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x+p.size/2,p.y+p.size/2); ctx.lineTo(p.x+p.size,p.y); ctx.closePath(); ctx.fill(); p.x+=p.vx; p.y+=p.vy; p.alpha-=0.02; if(p.alpha<=0) particles.splice(i,1);});
    requestAnimationFrame(drawParticles);
}
drawParticles();
setInterval(createFloatingHeart,500);

// Animate poem
poemLines.forEach((line,index)=>{setTimeout(()=>{line.style.opacity=1;},index*1000);});
// Show question/buttons after poem
setTimeout(()=>{question.style.opacity=1; buttons.style.opacity=1;}, poemLines.length*1000+500);

// YES button
yesBtn.addEventListener("click", ()=>{
    response.style.display="block"; response.textContent="YAY!!!🥹see you on the 14th, my love!💋";
    yesBtn.style.display="none"; noBtn.style.display="none";
    document.body.style.background="#ffb6c1";
    for(let i=0;i<100;i++){createParticle(Math.random()*canvas.width,Math.random()*canvas.height,"#ff4d6d");}
});

// NO button
noBtn.addEventListener("click", ()=>{
    response.style.display="block"; response.textContent="okayy, i'll proceed to kms now💋!";
    yesBtn.style.display="none"; noBtn.style.display="none";
    document.body.style.background="#a0a0a0";
    for(let i=0;i<100;i++){createParticle(Math.random()*canvas.width,Math.random()*canvas.height,"gray");}
});

// Secret envelope
secretBtn.addEventListener("click", ()=>{
    if(!secretMsg.classList.contains("show")) {
        secretMsg.textContent="we can have dinner and share a bottle of wine... but the wine's not the only thing I'll be drinking, and the food's not the only thing you'll be eating…  ";
        secretMsg.classList.add("show");
    } else {
        // Optional: toggle off if clicked again
        secretMsg.classList.remove("show");
    }
});

// Music button
musicBtn.addEventListener("click", ()=>{window.open("https://music.apple.com/gh/playlist/falling-slowly/pl.u-oZylKL1TGEm4orZ","_blank");});

// Confetti hearts on click/tap
function triggerMiniConfetti(){for(let i=0;i<30;i++){createParticle(Math.random()*canvas.width,Math.random()*canvas.height,"#ff69b4");}}
window.addEventListener("click",e=>{if(e.target.id!=="secretBtn"&&e.target.id!=="musicBtn") triggerMiniConfetti();});
window.addEventListener("touchstart",e=>{if(e.target.id!=="secretBtn"&&e.target.id!=="musicBtn") triggerMiniConfetti();},{passive:true});

// Hearts inside card
function createCardHeart(){
    const heart=document.createElement("div");
    heart.classList.add("card-heart"); heart.textContent="💖";
    heart.style.left=Math.random()*90+"%"; heart.style.fontSize=(Math.random()*12+12)+"px";
    cardHearts.appendChild(heart);
    setTimeout(()=>heart.remove(),5000);
}
setInterval(createCardHeart,400);
