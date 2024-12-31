let bubble = document.getElementById('bubble');
let bubble2 = document.getElementById('bubble2');

let bubblePosX = 0;
let bubblePosY = 0;
let bubble2PosX = 100;
let bubble2PosY = 100;

let amplitude = 500; 
let speed = 0.001;
let x = 100;
let colordiff = 'rgba(179 + x, 60, 248, 0.703)'

function floatBubble1() {
    let time = Date.now() * speed; // Time-based animation

    bubblePosY = Math.sin(time) * amplitude;

    bubblePosX = Math.cos(time * 0.5) * amplitude * 0.2;

    bubble.style.transform = `translate(${bubblePosX}px, ${bubblePosY}px)`;

    requestAnimationFrame(floatBubble1);
}


function floatBubble2() {
    let time = Date.now() * speed; 

    bubble2PosY = Math.sin(time) * amplitude;

    bubble2PosX = Math.cos(time * 0.5) * amplitude * 0.2 +1000;

    bubble2.style.borderColor = colordiff;
    x+=100;
    bubble2.style.transform = `translate(${bubble2PosX}px, ${bubble2PosY}px)`;
    

    requestAnimationFrame(floatBubble2);
}

floatBubble1();
floatBubble2();

function pop(bubblex) {
    console.log("Bubble clicked!");
    bubblex.style.opacity = 0;
}