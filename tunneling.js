const canvas = document.getElementById('tunneling-canvas');
const ctx = canvas.getContext('2d');

const barrierSlider = document.getElementById('barrier-height');
const barrierValue = document.getElementById('barrier-height-value');

const energySlider = document.getElementById('particle-energy');
const energyValue = document.getElementById('particle-energy-value');

const toggleBtn = document.getElementById('toggle-animation');

let V0 = parseFloat(barrierSlider.value);
let E = parseFloat(energySlider.value);
let animationId = null;
let isAnimating = true;
let frame = 0;

barrierSlider.addEventListener('input', () => {
  V0 = parseFloat(barrierSlider.value);
  barrierValue.innerText = V0;
});

energySlider.addEventListener('input', () => {
  E = parseFloat(energySlider.value);
  energyValue.innerText = E;
});

toggleBtn.addEventListener('click', () => {
  isAnimating = !isAnimating;
  toggleBtn.innerText = isAnimating ? 'Stop' : 'Start';
  if (isAnimating) animate();
  else cancelAnimationFrame(animationId);
});

function drawTunneling(frame) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width;
  const h = canvas.height;

  const barrierStart = w * 0.4;
  const barrierEnd = w * 0.6;
  const barrierWidth = barrierEnd - barrierStart;

  // Draw barrier
  ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
  ctx.fillRect(barrierStart, 0, barrierWidth, h);

  // Draw wave
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  for (let x = 0; x <= w; x++) {
    let y;
    const waveX = x / w;
    const waveTime = frame / 50;
    const omega = Math.sqrt(E);

    if (x < barrierStart) {
      y = Math.sin(2 * Math.PI * omega * waveX - waveTime);
    } else if (x >= barrierStart && x <= barrierEnd) {
      const decay = Math.exp(-Math.sqrt(V0 - E) * (x - barrierStart) / 50);
      y = decay * Math.sin(2 * Math.PI * omega * waveX - waveTime);
    } else {
      const decay = Math.exp(-Math.sqrt(V0 - E) * (barrierEnd - barrierStart) / 50);
      y = decay * Math.sin(2 * Math.PI * omega * waveX - waveTime);
    }

    const yPos = h / 2 - y * 100;
    ctx.lineTo(x, yPos);
  }

  ctx.strokeStyle = '#ff0077';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function animate() {
  frame++;
  drawTunneling(frame);
  animationId = requestAnimationFrame(animate);
}

// Start animation
animate();
