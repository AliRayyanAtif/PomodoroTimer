let timer;
let totalSeconds;
let originalTime;
let sessionCount = 0;
let breakCount = 0;
let totalBreakSeconds;
let originalBreakTime;
let isBreak = false;

let angle = 360;
//to make the ring look black when the site loads
document.querySelector('.ring').style.background = `conic-gradient(#333 ${angle}deg, orange ${angle}deg)`;


function startTimer() {
    clearInterval(timer);

    isBreak = false;
    // let minutes = document.getElementById("minutesInput").value; this is used to get the input from index.html but this is saved as string so to convert into integer we parse it. 
    let minutes = parseInt(document.getElementById("WorkminutesInput").value);
    let seconds = parseInt(document.getElementById("WorksecondsInput").value);

   

    if (minutes < 0 || seconds < 0) {
        alert("Please enter non-negative values.");
        return;
    }
    if (isNaN(minutes)) minutes = 0;
    if (isNaN(seconds)) seconds = 0;
    // isNan Means not a number 
    totalSeconds = seconds + (minutes * 60);
    originalTime = totalSeconds
    if (totalSeconds <= 0) {
        alert("Please enter a valid Pomodoro duration.");
        return;
    }
    document.getElementById("pomodoroSound").play();
    //After clicking on start it will automatically make the circle bigger
    document.querySelector(".ring").classList.add("enlarged")
    document.querySelector(".center").classList.add("enlarged")
    //Will scroll to top once you click start
     window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    timer = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timer)
            sessionCount++;
            document.getElementById("timerDisplay").textContent = "break starting"
            document.getElementById("sessionCount").textContent = `Sessions: ${sessionCount}`
            startBreakTimer()
        }
        minutes = Math.floor(totalSeconds / 60)
        seconds = totalSeconds % 60
        let paddedminutes = String(minutes).padStart(2, '0');
        let paddedseconds = String(seconds).padStart(2, '0');
        document.getElementById("timerDisplay").textContent = `${paddedminutes}:${paddedseconds}`
        document.getElementById("Titlee").textContent =  `${paddedMins}:${paddedSecs}`;
        totalSeconds = totalSeconds - 1
        let progress = totalSeconds / originalTime;
        let angle = 360 * (1 - progress);
        document.querySelector('.ring').style.background = `conic-gradient(#333 ${angle}deg, orange ${angle}deg)`;



    }, 1000)

    // document.getElementById("WorkminutesInput").value = "";
    // document.getElementById("WorksecondsInput").value = "";
}

function startBreakTimer() {

    clearInterval(timer)
    isBreak = true;

    let inputBreakMinutes = parseInt(document.getElementById("BreakminutesInput").value);
    let inputBreakSeconds = parseInt(document.getElementById("BreaksecondsInput").value);

    if (isNaN(inputBreakMinutes)) inputBreakMinutes = 0;
    if (isNaN(inputBreakSeconds)) inputBreakSeconds = 0;

    totalBreakSeconds = inputBreakSeconds + (inputBreakMinutes * 60);
    originalBreakTime = totalBreakSeconds;
    if (totalBreakSeconds <= 0) {
        alert("Please enter a valid Break duration.");
        return;
    }



    if (inputBreakMinutes < 0 || inputBreakSeconds < 0) {
        alert("Please enter non-negative values.");
        return;

    }

    document.getElementById("breakSound").play();


    timer = setInterval(() => {

        let mins = Math.floor(totalBreakSeconds / 60);
        let secs = totalBreakSeconds % 60;
        let paddedMins = String(mins).padStart(2, '0');
        let paddedSecs = String(secs).padStart(2, '0');
        document.getElementById("timerDisplay").textContent = `${paddedMins}:${paddedSecs}`;

        totalBreakSeconds = totalBreakSeconds - 1
        if (totalBreakSeconds <= 0) {
            clearInterval(timer);
            breakCount++;
            document.getElementById("breakCount").textContent = `Break: ${breakCount}`;
            startTimer()
            return; // exit the interval to avoid negative time
        }

        let progress = totalBreakSeconds / originalBreakTime;
        let angle = 360 * (1 - progress);
        document.querySelector('.ring').style.background = `conic-gradient(#333 ${angle}deg, orange ${angle}deg)`;

    }, 1000)
    // document.getElementById("BreakminutesInput").value = "";
    // document.getElementById("BreaksecondsInput").value = "";

}

function pauseTimer() {
    clearInterval(timer)

}
function resumeTimer() {
    clearInterval(timer)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (totalSeconds === 0 & isBreak === false) {
        alert("Please enter values");
        return;
    }
    if (totalBreakSeconds === 0 & isBreak === true) {
        alert("Break values invalid");
        return;
    }


    if (isBreak === false) {
        timer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timer)
                sessionCount++;
                document.getElementById("timerDisplay").textContent = "break starting"
                document.getElementById("sessionCount").textContent = `Sessions: ${sessionCount}`
                startBreakTimer()

            }
            minutes = Math.floor(totalSeconds / 60)
            seconds = totalSeconds % 60
            let paddedminutes = String(minutes).padStart(2, '0');
            let paddedseconds = String(seconds).padStart(2, '0');
            document.getElementById("timerDisplay").textContent = `${paddedminutes}:${paddedseconds}`
            totalSeconds = totalSeconds - 1
            let progress = totalSeconds / originalTime;
            let angle = 360 * (1 - progress);
            document.querySelector('.ring').style.background = `conic-gradient(#333 ${angle}deg, orange ${angle}deg)`;



        }, 1000)
    }
    if (isBreak === true) {
        timer = setInterval(() => {

            let mins = Math.floor(totalBreakSeconds / 60);
            let secs = totalBreakSeconds % 60;
            let paddedMins = String(mins).padStart(2, '0');
            let paddedSecs = String(secs).padStart(2, '0');
            document.getElementById("timerDisplay").textContent = `${paddedMins}:${paddedSecs}`;

            totalBreakSeconds = totalBreakSeconds - 1
            if (totalBreakSeconds <= 0) {
                clearInterval(timer);
                breakCount++;
                document.getElementById("breakCount").textContent = `Break: ${breakCount}`;
                startTimer()
                return; // exit the interval to avoid negative time
            }

            let progress = totalBreakSeconds / originalBreakTime;
            let angle = 360 * (1 - progress);
            document.querySelector('.ring').style.background = `conic-gradient(#333 ${angle}deg, orange ${angle}deg)`;

        }, 1000)
    }

}

function resetTimer() {
    clearInterval(timer)

    totalBreakSeconds = 0;
    totalSeconds = 0;

    document.getElementById("timerDisplay").textContent = `00:00`
    let angle = 360;
    document.querySelector('.ring').style.background = `conic-gradient(#333 ${angle}deg, orange ${angle}deg)`;
    document.getElementById("BreakminutesInput").value = "";
    document.getElementById("BreaksecondsInput").value = "";

    document.getElementById("WorkminutesInput").value = "";
    document.getElementById("WorksecondsInput").value = "";

    document.querySelector(".ring").classList.remove("enlarged")
    document.querySelector(".center").classList.remove("enlarged")

}
function presetTimer(workMin, workSec, breakMin, breakSec) {
    clearInterval(timer)
    document.getElementById("WorkminutesInput").value = workMin;
    document.getElementById("WorksecondsInput").value = workSec;
    document.getElementById("BreakminutesInput").value = breakMin;
    document.getElementById("BreaksecondsInput").value = breakSec;

}
