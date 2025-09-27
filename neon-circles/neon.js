const body = document.body;
let vw = window.innerWidth;
let vh = window.innerHeight;
let attract = -1;

const minDistance = 5;
const positions = [];

const MIN_SIZE = 3;
const MAX_SIZE = 10;
const DENSITY_FACTOR = 350 / (1920 * 1080);

// === CREATE CIRCLE ===
function createCircle(x, y, size) {
  const circle = document.createElement('div');
  circle.classList.add('neon-circle');
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  body.appendChild(circle);

  positions.push({
    x: x + size / 2,
    y: y + size / 2,
    r: size / 2,
    originalX: x,
    originalY: y,
    el: circle,
    offsetX: 0,
    offsetY: 0
  });
}

// === CHECK OVERLAP ===
function isTooClose(x, y, r) {
  for (const pos of positions) {
    const dx = x - pos.x;
    const dy = y - pos.y;
    const distance = Math.hypot(dx, dy);
    if (distance < r + pos.r + minDistance) return true;
  }
  return false;
}

// === GENERATE GRID ===
function generateCircles(targetCount) {
  let added = 0;
  let attempts = 0;
  const MAX_ATTEMPTS = 10000;

  while (added < targetCount && attempts < MAX_ATTEMPTS) {
    const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
    const r = size / 2;
    const x = Math.random() * (vw - size);
    const y = Math.random() * (vh - size);
    attempts++;

    if (!isTooClose(x + r, y + r, r)) {
      createCircle(x, y, size);
      added++;
    }
  }

  if (attempts >= MAX_ATTEMPTS) {
    console.warn(`Stopped after ${MAX_ATTEMPTS} attempts. Only added ${added}/${targetCount} circles.`);
  }
}

// === INIT GRID ===
function initializeCircles() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  const totalArea = vw * vh;
  const targetNum = Math.floor(totalArea * DENSITY_FACTOR);
  const toAdd = targetNum - positions.length;

  if (toAdd > 0) {
    generateCircles(toAdd);
  }
}

// === RESIZE SUPPORT ===
window.addEventListener('resize', () => {
  vw = window.innerWidth;
  vh = window.innerHeight;
  initializeCircles(); // add more if needed
});

initializeCircles(); // on load

// === CURSOR TRAIL ===
const cursor = document.createElement('div');
cursor.classList.add('cursor-trail');
body.appendChild(cursor);

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.transform = `translate(${cursorX - 3.5}px, ${cursorY - 3.5}px)`;
});

// === SET ATTRACT ===
function set_attract() {
  const button = document.getElementById('neon-button');
  attract *= -1;

  if (attract > 0) {
    button.innerHTML = "REPEL";
  } else {
    button.innerHTML = "ATTRACT";
  }
}

// === MOVE CIRCLES ===
function moveCirclesToCursor() {
  const RADIUS = 100;
  const MAX_OFFSET = 50;
  const RETURN_SPEED = 0.4;

  for (const pos of positions) {
    const dx = cursorX - pos.x;
    const dy = cursorY - pos.y;
    const dist = Math.hypot(dx, dy);

    if (dist < RADIUS) {
      const angle = Math.atan2(dy, dx);
      const offset = (RADIUS - dist) / RADIUS * MAX_OFFSET;
      pos.offsetX = attract * Math.cos(angle) * offset;
      pos.offsetY = attract * Math.sin(angle) * offset;
    } else {
      // Gradual return to original position
      pos.offsetX *= (1 - RETURN_SPEED);
      pos.offsetY *= (1 - RETURN_SPEED);
    }

    const newX = pos.originalX + pos.offsetX;
    const newY = pos.originalY + pos.offsetY;
    pos.el.style.left = `${newX}px`;
    pos.el.style.top = `${newY}px`;
  }

  requestAnimationFrame(moveCirclesToCursor);
}

moveCirclesToCursor();