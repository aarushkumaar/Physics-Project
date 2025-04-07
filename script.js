// Get the canvas elements
const signalCanvas = document.getElementById('signal-canvas');
const tunedSignalCanvas = document.getElementById('tuned-signal-canvas');

// Get the context for each canvas
const signalContext = signalCanvas.getContext('2d');
const tunedSignalContext = tunedSignalCanvas.getContext('2d');

// Define the parameters
let frequency = 10;
let tuningFrequency = 15;
let samplingRate = 1000;
let time = [];

// Generate the time array
for (let i = 0; i < samplingRate; i++) {
    time.push(i / samplingRate);
}

// Function to generate the signal
function generateSignal(frequency) {
    const signal = [];
    for (let i = 0; i < time.length; i++) {
        signal.push(Math.sin(2 * Math.PI * frequency * time[i]));
    }
    return signal;
}

// Function to apply the tuning effect
function applyTuningEffect(signal, tuningFrequency) {
    const tunedSignal = [];
    for (let i = 0; i < signal.length; i++) {
        tunedSignal.push(signal[i] * Math.sin(2 * Math.PI * tuningFrequency * time[i]));
    }
    return tunedSignal;
}

// Function to draw the signal on the canvas
function drawSignal(canvasContext, signal) {
    const { width, height } = canvasContext.canvas;
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.beginPath();
    canvasContext.moveTo(0, height / 2);

    for (let i = 0; i < signal.length; i++) {
        let x = (i / signal.length) * width;
        let y = height / 2 - signal[i] * (height / 2);
        canvasContext.lineTo(x, y);
    }
    canvasContext.stroke();
}

// Generate and draw the original signal
let originalSignal = generateSignal(frequency);
drawSignal(signalContext, originalSignal);

// Generate and draw the tuned signal
let tunedSignal = applyTuningEffect(originalSignal, tuningFrequency);
drawSignal(tunedSignalContext, tunedSignal);

// Add event listeners to the range inputs
document.getElementById('frequency').addEventListener('input', (e) => {
    frequency = parseInt(e.target.value);
    document.getElementById('frequency-value').innerText = `${frequency} Hz`;

    originalSignal = generateSignal(frequency);
    drawSignal(signalContext, originalSignal);

    // Update tuned signal based on new frequency
    tunedSignal = applyTuningEffect(originalSignal, tuningFrequency);
    drawSignal(tunedSignalContext, tunedSignal);
});

document.getElementById('tuning-frequency').addEventListener('input', (e) => {
    tuningFrequency = parseInt(e.target.value);
    document.getElementById('tuning-frequency-value').innerText = `${tuningFrequency} Hz`;

    // Apply tuning effect to the latest signal
    tunedSignal = applyTuningEffect(originalSignal, tuningFrequency);
    drawSignal(tunedSignalContext, tunedSignal);
});

function showSection(sectionId) {
    const sections = ['tuning', 'particle', 'tunneling'];
    sections.forEach(id => {
        const el = document.getElementById(`${id}-section`);
        if (el) el.style.display = id === sectionId ? 'block' : 'none';
    });
}
