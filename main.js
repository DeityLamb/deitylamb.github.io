import { Gradient } from './gradient.js';
import { StaticTesseract } from './cube.js';

const canvas = document.getElementById("cube");
const ctx = canvas.getContext("2d");

const SPEED = 1;
const BASE_ANGLE = [192, 105];
const PULSE = 500;

const size = Math.min(canvas.width, canvas.height);

const tesseract = new StaticTesseract(size);
tesseract.rotate(...BASE_ANGLE)

const rotate = createRandomRotator(tesseract);

function loop() {
  draw(tesseract);
  rotate();
  requestAnimationFrame(loop);
}

resize()
window.addEventListener('resize', resize, false);
requestAnimationFrame(loop);

const gradient = new Gradient('#7665ff', '#ff6565', PULSE / 2);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(projection) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  const color = gradient.next()

  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.lineWidth = 0.3;
  ctx.beginPath();

  for (const edges of projection.edges) {
    const p1 = projection.nodes[edges[0]];
    const p2 = projection.nodes[edges[1]];
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function createRandomRotator(projection) {
  let i = 1;

  let x = 1 / (180 / SPEED);
  let y = 1 / (180 / SPEED);

  return () => {
    if (i % PULSE === 0) {
      x = Math.random() / (180 / SPEED);
      y = Math.random() / (180 / SPEED);
    }

    i++;
    projection.rotate(x, y);
  }
}
