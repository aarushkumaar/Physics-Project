const boxCanvas = document.getElementById('box-canvas');
const boxCtx = boxCanvas.getContext('2d');
const quantumSlider = document.getElementById('quantum-number');
const quantumValue = document.getElementById('quantum-number-value');

let n = parseInt(quantumSlider.value);
let width = boxCanvas.width;
let height = boxCanvas.height;
let L = 1;
let frame = 0;

function drawParticleInBox(n, t) {
  boxCtx.clearRect(0, 0, width, height);
  boxCtx.beginPath();
  boxCtx.moveTo(0, height / 2);

  for (let x = 0; x <= width; x++) {
    let xVal = (x / width) * L;
    let psi = Math.sqrt(2 / L) * Math.sin(n * Math.PI * xVal / L) * Math.cos(2 * Math.PI * n * n * t);
    let y = height / 2 - psi * (height / 2 - 10);
    boxCtx.lineTo(x, y);
  }

  boxCtx.strokeStyle = '#ff00ff';
  boxCtx.lineWidth = 2;
  boxCtx.stroke();
}

function animateBox() {
  frame++;
  let t = frame / 100;
  drawParticleInBox(n, t);
  requestAnimationFrame(animateBox);
}

quantumSlider.addEventListener('input', (e) => {
  n = parseInt(e.target.value);
  quantumValue.innerText = n;
});

animateBox();


