// -- GLOBAL VARIABLES --
let secondsLeft;
let countdown;
let interval;
let str1;

// -- DEFAULTS -- 

let defaults = {
    sessionTime: 0,
    storedTime: 0,
    sessionPaused: 0,
    breakTime: 0,
    counter: 0
};

// -- HTML SELECTORS --

let session20 = document.querySelector(".m20");
let session30 = document.querySelector(".m30");
let session45 = document.querySelector(".m45");

let break5 = document.querySelector(".b5");
let break10 = document.querySelector(".b10");
let break15 = document.querySelector(".b15");

let increaseSessionBtn = document.querySelector("#increase-session");
let chooseSessionDuration = document.querySelector("#session-length-number");
let decreaseSessionBtn = document.querySelector("#decrease-session");

let increaseBreakBtn = document.querySelector("#increase-break");
let chooseBreakDuration = document.querySelector("#countdown-break");
let decreaseBreakBtn = document.querySelector("#decrease-break");
chooseBreakDuration.innerHTML = "00:00";

let sessionTimer = document.querySelector("#countdown-session");
sessionTimer.innerHTML = defaults.sessionTime

let controlBtnStart = document.querySelector("#start-button");
let controlBtnPause = document.querySelector("#pause-button");
let controlBtnResume = document.querySelector("#resume-button");
let controlBtnReset = document.querySelector("#reset-button");

let sessionCounter = document.querySelector("#completed-sessions");
let sessionLive = document.querySelector("#live-session");





// -- FUNCTIONS --

// -- COUNTDOWN Functions --

// Function to In / Decrease the SESSION time
increaseSessionTime = () => {
    ++ defaults.sessionTime;
    displayTime();
}
decreaseSessionTime = () => {
    -- defaults.sessionTime;
    if(defaults.sessionTime <= 1) { defaults.sessionTime = 1;}
    displayTime();
}

// Function that STARTS the countdown of the session
countdown = (seconds) => {
    
    if(defaults.sessionPaused == 0) {
        seconds = defaults.sessionTime;
        const now = Date.now();
        const then = now + seconds * 1000;
    
        interval = setInterval(() => { 
            secondsLeft = Math.round((then - Date.now()) / 1000);
         
            // Counts how many sessions were completed
            if(secondsLeft == 0) {
                defaults.counter ++;
                countSessions();
                breakCountdown();
            }

            if(secondsLeft < 0) {
                sessionLive.innerHTML = "";
                return;
            } else {
                sessionLive.innerHTML = "LIVE";
            }

        displayCountdown();
        // sessionTimer.innerHTML = secondsLeft;
        console.log(secondsLeft);
        }, 1000); 

        // Countdown with stored time after calling resume function
    } else if(defaults.sessionPaused == 1) {
        seconds = defaults.storedTime;
        const now = Date.now();
        const then = now + seconds * 1000;
    
        interval = setInterval(() => { 
            secondsLeft = Math.round((then - Date.now()) / 1000);

            // Counts how many sessions were completed
            if(secondsLeft == 0) {
                defaults.counter ++;
                countSessions();
                breakCountdown();
            }

            if(secondsLeft < 0) {
                sessionLive.innerHTML = "LIVE";
                return;
            } else {
                sessionLive.innerHTML = "";
            }
       
    // Displaying the REMAINING countdown on the app
    displayCountdown();
    console.log(secondsLeft);
    }, 1000);
    }
}

// Function to DISPLAY the countdown in minutes and seconds
 displayCountdown = () => {
     if(secondsLeft < 10) {
         sessionTimer.innerHTML = `00:0${secondsLeft}`
     } else { 
         sessionTimer.innerHTML = `00:${secondsLeft}`
     }
 }

 // Function to DISPLAY the session time in minutes and seconds
 displayTime = () => {
     if(defaults.sessionTime < 10) {
         sessionTimer.innerHTML = `00:0${defaults.sessionTime}`;
     } else {
         sessionTimer.innerHTML = `00:${defaults.sessionTime}`;
     }
 }

 // Function to DISPLAY the break countdown in minutes and seconds
 displayBreakCountdown = () => {
    if(secondsLeft < 10) {
        chooseBreakDuration.innerHTML = `00:0${secondsLeft}`
    } else {
     chooseBreakDuration.innerHTML = `00:${secondsLeft}`;
 }
}
 
 // Function to DISPLAY the break time in minutes and seconds
 displayBreak = () => {
     if(defaults.breakTime < 10) {
         chooseBreakDuration.innerHTML = `00:0${defaults.breakTime}`;
     } else {
         chooseBreakDuration.innerHTML = `00:${defaults.breakTime}`;
     }
 }

// Function to PAUSE the countdown session
pauseCountdown = () => {
    defaults.sessionPaused = 1;
    clearInterval(interval);
    storePause();
}

// Function to STORE the number of the paused countdown
storePause = () => {
    str1 = sessionTimer.innerHTML;
    str1 = str1.replace(/:/g, "");
    defaults.storedTime = parseFloat(str1);
}

// Function to RESUME the paused countdown 
resumeCountdown = () => {
    // storePause();
    countdown(defaults.storedTime);
}

// Function to RESET the countdown to its default stored time
resetCountdown = () => {
    defaults.sessionPaused = 0;
    defaults.counter = 0;
    sessionCounter.innerHTML = `Sessions completed: ${defaults.counter}`;
    displayTime();
}

// -- BREAK Functions --

// Function to In / Decrease the BREAK time
increaseBreakTime = () => {
    ++ defaults.breakTime;
    displayBreak();
}
decreaseBreakTime = () => {
    -- defaults.breakTime;
    if(defaults.breakTime <= 1) { defaults.breakTime = 1;}
    displayBreak();
}

breakCountdown = (seconds) => {
    seconds = defaults.breakTime;
    const now = Date.now();
    const then = now + seconds * 1000;

    interval = setInterval(() => { 
        secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft == 0) {
            defaults.sessionPaused = 0;
            countdown();
        }

        // if(secondsLeft > 0) {
        //     sessionTimer.innerHTML = `Take ${defaults.breakTime}!`;
        // }

        if(secondsLeft < 0) {
            return;
    }

   

    // Displaying the countdown on the app
    displayBreakCountdown();
    console.log(secondsLeft);
    }, 1000);

}

// -- SESSION COUNTER -- 
countSessions = () => {
    sessionCounter.innerHTML = `Sessions Completed: ${defaults.counter}`;
}

// -- RESET SESSIONS --
resetSessions = () => {
    defaults.sessionPaused = 0;
    defaults.counter = 0;
    sessionCounter.innerHTML = `Sessions completed: ${defaults.counter}`;
}


// -- PRE CHOICES --
sessionPreChoice20 = () => {
    defaults.sessionTime = 20;
    displayTime();
}

sessionPreChoice30 = () => {
    defaults.sessionTime = 30;
    displayTime();
}

sessionPreChoice45 = () => {
    defaults.sessionTime = 45;
    displayTime();
}

sessionBreak5 = () => {
    defaults.breakTime = 5;
    displayBreak();
}

sessionBreak10 = () => {
    defaults.breakTime = 10;
    displayBreak();
}

sessionBreak15 = () => {
    defaults.breakTime = 15;
    displayBreak();
}

goClicked = () => {
    controlBtnStart.disabled = true;
    controlBtnPause.disabled = false;
    controlBtnResume.disabled = true;
    controlBtnReset.disabled = true;
    countdown(defaults.sessionTime);
}

pauseClicked = () => {
    controlBtnStart.disabled = true;
    controlBtnPause.disabled = true;
    controlBtnResume.disabled = false;
    controlBtnReset.disabled = false;
    pauseCountdown();
}

resumeClicked = () => {
    controlBtnStart.disabled = true;
    controlBtnPause.disabled = false;
    controlBtnResume.disabled = true;
    controlBtnReset.disabled = true;
    resumeCountdown(defaults.storedTime);
}

resetClicked = () => {
    controlBtnStart.disabled = false;
    controlBtnPause.disabled = true;
    controlBtnResume.disabled = true;
    controlBtnReset.disabled = true;
    resetCountdown();
}


// -- ON CLICKS --

session20.onclick = sessionPreChoice20;
session30.onclick = sessionPreChoice30;
session45.onclick = sessionPreChoice45;

break5.onclick = sessionBreak5;
break10.onclick = sessionBreak10;
break15.onclick = sessionBreak15;

// On-Click of In / Decrease Button, the In / Decrease Functions runs
increaseSessionBtn.onclick = increaseSessionTime;
decreaseSessionBtn.onclick = decreaseSessionTime;

// On-Click of In / Decrease Button, the In / Decrease Functions runs
increaseBreakBtn.onclick = increaseBreakTime;
decreaseBreakBtn.onclick = decreaseBreakTime;

// On-Click of START button, the countdown function runs
// controlBtnStart.onclick = countdown;
controlBtnStart.onclick = goClicked;

// On-Click of PAUSE button, the countdown gets paused
// controlBtnPause.onclick = pauseCountdown;
    controlBtnPause.onclick = pauseClicked;    

// On-Click of RESUME button, the countdown continues
// controlBtnResume.onclick = resumeCountdown;
controlBtnResume.onclick = resumeClicked;

// On-Click of RESET button, the countdown resets 
// controlBtnReset.onclick = resetCountdown;
controlBtnReset.onclick = resetClicked;
