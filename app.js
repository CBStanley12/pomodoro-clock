const timerLabel = document.querySelector('#timer-label'),
    timeLeft = document.querySelector('#time-left'),
    breakLen = document.querySelector('#break-length'),
    sessionLen = document.querySelector('#session-length'),
    audio = document.querySelector('#beep');

var timerOn = false,
    onBreak = false,
    sessionNum = parseInt(sessionLen.innerHTML),
    breakNum = parseInt(breakLen.innerHTML),
    duration = sessionNum * 60,
    minutes = getMins(duration),
    seconds = getSecs(duration, minutes);

loadBtnEventListeners();

function loadBtnEventListeners(){
    document.querySelector('#break-increment').addEventListener('click', increment);
    document.querySelector('#break-decrement').addEventListener('click', decrement);
    document.querySelector('#session-increment').addEventListener('click', increment);
    document.querySelector('#session-decrement').addEventListener('click', decrement);
    document.querySelector('#start_stop').addEventListener('click', function(){
        if(!timerOn){
        timerOn = true;
        startTimer();
        } else {
        stopTimer();
        }
    });
    document.querySelector('#reset').addEventListener('click', resetTimer);
}

function increment(){
    if (this.id.includes('break') && breakNum < 60 && !timerOn){
        breakNum++;
        breakLen.textContent = breakNum;
        if(onBreak){
            timeLeft.textContent = displayTime(breakNum, 0);
        }
    } else if (this.id.includes('session') && sessionNum < 60 && !timerOn){
        sessionNum++;
        sessionLen.textContent = sessionNum;
        setTime(sessionNum);
        if(!onBreak){
            timeLeft.textContent = displayTime(sessionNum, 0);
        }
    }
}

function decrement(){
    if (this.id.includes('break') && breakNum > 1 && !timerOn){
        breakNum--;
        breakLen.textContent = breakNum;
        if(onBreak){
            timeLeft.textContent = displayTime(breakNum, 0);
        }
    } else if (this.id.includes('session') && sessionNum > 1 && !timerOn){
        sessionNum--;
        sessionLen.textContent = sessionNum;
        setTime(sessionNum);
        if(!onBreak){
            timeLeft.textContent = displayTime(sessionNum, 0);
        }
    }
}

function countdown(){
    if(seconds == 0 && duration > 0){
        minutes--;
        seconds = getSecs(duration, minutes);
        duration--;
        seconds--;
        timeLeft.textContent = displayTime(minutes, seconds);
    } else if(duration == 0 && !onBreak){
        audio.play();
        setTime(breakNum);
        onBreak = true;
        clearInterval(sessionCount);
        startTimer();
    } else if(duration == 0 && onBreak){
        audio.play();
        setTime(sessionNum);
        onBreak = false;
        clearInterval(breakCount);
        startTimer();
    } else {
        seconds = getSecs(duration, minutes);
        duration--;
        seconds--;
        timeLeft.textContent = displayTime(minutes, seconds);
    }
}

function startTimer(){
    if(!onBreak){
        timerLabel.textContent = 'Session';
        if(duration == (sessionNum * 60)){
            timeLeft.textContent = displayTime(sessionNum, 0);
        }
        sessionCount = setInterval(countdown, 1000, sessionNum);
    } else {
        timerLabel.textContent = 'Break';
        if(duration == (breakNum * 60)){
            timeLeft.textContent = displayTime(breakNum, 0);
        }
        breakCount = setInterval(countdown, 1000, breakNum);
    }
}

function stopTimer(){
    timerOn = false;
    clearInterval(sessionCount);
    clearInterval(breakCount);
}

function resetTimer(){
    if(timerOn){
        stopTimer();
    }
    audio.pause();
    audio.currentTime = 0;
    onBreak = false;
    timerLabel.textContent = 'Session';
    sessionNum = 25;
    breakNum = 5;
    setTime(sessionNum);
    sessionLen.textContent = sessionNum;
    breakLen.textContent = breakNum;
    timeLeft.textContent = displayTime(sessionNum, 0);
}

function setTime(num){
    duration = num * 60;
    minutes = getMins(duration);
    seconds = getSecs(duration, minutes);
}

function displayTime(mins, secs){
    if(mins>=10 && secs>=10){
        return `${mins}:${secs}`;
    } else if(mins<10 && secs>=10){
        return `0${mins}:${secs}`;
    } else if(mins>=10 && secs<10){
        return `${mins}:0${secs}`;
    } else if(mins<10 && secs<10){
        return `0${mins}:0${secs}`;
    }
}

function getSecs(dur, mins){
    return dur - Math.round(mins * 60);
}

function getMins(dur){
    return Math.floor(dur / 60);
}

var colors = {
    'opt-creative' : { 'primary' : '#77dd77', 'secondary' : 'black' }, 
    'opt-happiness' : { 'primary' : '#fdfd96', 'secondary' : 'black' },
    'opt-passion' : { 'primary' : '#ff6961', 'secondary' : 'black' },
    'opt-fancy' : { 'primary' : '#b19cd9', 'secondary' : 'black' },
    'opt-calm' : { 'primary' : '#aec6cf', 'secondary' : 'black' },
    'opt-energy' : { 'primary' : '#ffb347', 'secondary' : 'black' },
    'opt-stability' : { 'primary' : '#836953', 'secondary' : 'black' },
    'opt-default' : { 'primary' : '#151E29', 'secondary' : '#808080' },
};
  
document.querySelector('#chooseMood').addEventListener('change', function() {
    document.body.style.backgroundColor = colors[this.value].primary;
    changeColors(colors[this.value].secondary);
})
  
function changeColors(clr){
    document.body.style.color = clr;
    document.getElementById('timer-container').style.borderColor = clr;
    Array.from(document.getElementsByTagName('button')).forEach(function(btn){
        btn.style.color = clr;
    });
    document.getElementById('footer').style.color = clr;
}