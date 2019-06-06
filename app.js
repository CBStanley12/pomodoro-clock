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

function countdown(num){}

function startTimer(){}

function stopTimer(){}

function resetTimer(){}

function setTime(num){}

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