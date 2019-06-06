const timerLabel = document.querySelector('#timer-label'),
    timeLeft = document.querySelector('#time-left'),
    breakLen = document.querySelector('#break-length'),
    sessionLen = document.querySelector('#session-length');

var timerOn = false,
    onBreak = false,
    sessionNum = parseInt(sessionLen.innerHTML),
    breakNum = parseInt(breakLen.innerHTML),
    duration = sessionNum * 60,
    minutes = getMins(duration),
    seconds = getSecs(duration, minutes);

function increment(){}

function decrement(){}

function countdown(num){}

function startTimer(){}

function stopTimer(){}

function resetTimer(){}

function setTime(num){}

function displayTime(mins, secs){}

function getSecs(dur, mins){
    return dur - Math.round(mins * 60);
}

function getMins(dur){
    return Math.floor(dur / 60);
}