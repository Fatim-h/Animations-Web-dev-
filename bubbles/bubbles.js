let bubble = document.getElementById('bubble');
let bubble2 = document.getElementById('bubble2');

let bubblePosX = 0;
let bubblePosY = 0;
let bubble2PosX = 100;
let bubble2PosY = 100;

let amplitudey = 200;
let amplitudex = 500; 
let speed = 0.001;
let x = 100;
let colordiff = 'rgba(179 + x, 60, 248, 0.703)';

function floatBubble1() {
    let time = Date.now() * speed; // Time-based animation

    bubblePosY = Math.sin(time) * amplitudey;
    bubblePosX = Math.cos(time * 0.5) * amplitudex * 0.2;

    bubble.style.transform = `translate(${bubblePosX}px, ${bubblePosY}px)`;
    requestAnimationFrame(floatBubble1);
}

function floatBubble2() {
    let time = Date.now() * speed; 

    bubble2PosY = Math.sin(time) * amplitudey;
    bubble2PosX = Math.cos(time * 0.5) * amplitudex * 0.2 + 1000;

    bubble2.style.transform = `translate(${bubble2PosX}px, ${bubble2PosY}px)`;
    requestAnimationFrame(floatBubble2);
}

floatBubble1();
floatBubble2();

function pop(bubblex, popcirclex, splatterx, splattery) {
    popcirclex.style.opacity = 1;
    popcirclex.classList.add("animate");
    splatterx.classList.add("animateit");
    splattery.classList.add("animateit");

    popcirclex.addEventListener('animationend', function() {
        popcirclex.classList.remove("animate");
        splatterx.classList.remove("animateit");
        splattery.classList.remove("animateit");
        bubblex.style.opacity = 0;
    });
   
}

/*let u = 100;
function changeBubbleColor() {
    u = (u + 1) % 255;
    bubble.style.borderColor = `rgba(${179 + u}, 60, 248, 0.703)`;
    bubble2.style.borderColor = `rgba(${248 - u}, 60, 60, 0.703)`;
    requestAnimationFrame(changeBubbleColor);
}
changeBubbleColor();*/
