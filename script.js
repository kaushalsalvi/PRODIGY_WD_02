let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedMM}:${formattedSS}.${formattedMS}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    display.innerHTML = "00:00:00.00";
    lapsContainer.innerHTML = "";
    startStopBtn.textContent = "Start";
    isRunning = false;
}

function recordLap() {
    const lapTime = timeToString(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
}

startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        stopTimer();
        startStopBtn.textContent = "Start";
    } else {
        startTimer();
        startStopBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);