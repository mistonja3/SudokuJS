/////////////
//STOPWATCH//
/////////////
var min = "00";
var sec = "00";
var ms = "00";
var minSpan = document.getElementById("min")
var secSpan = document.getElementById("sec")
var msSpan = document.getElementById("ms")
var startBtn = document.getElementById("start-btn")
var pauseBtn = document.getElementById("pause-btn")
var resetBtn = document.getElementById("reset-btn")
var interval;

startBtn.addEventListener('click', startTime)

pauseBtn.addEventListener('click', ()=>{
    clearInterval(interval);
})

resetBtn.addEventListener('click', resetTime)

function startTime(){
    clearInterval(interval);
    interval = setInterval(startStopwatch, 10);
}

function resetTime(){
    clearInterval(interval);
    ms = "00";
  	sec = "00";
    min = "00"
    msSpan.innerHTML = ms;
  	secSpan.innerHTML = sec;
  	minSpan.innerHTML = min;
}

function startStopwatch () {
    ms++; 
    
    if(ms <= 9){
        msSpan.innerHTML = "0" + ms;
    }
    
    if (ms > 9){
        msSpan.innerHTML = ms;
    } 
    
    if (ms > 99) {
      sec++;
      secSpan.innerHTML = "0" + sec;
      ms = 0;
      msSpan.innerHTML = "0" + 0;
    }
    
    if (sec > 9){
      secSpan.innerHTML = sec;
    }

    if(sec > 59){
        min++
        minSpan.innerHTML = "0" + min
        sec = 0;
        secSpan.innerHTML = "0" + 0
    }
}