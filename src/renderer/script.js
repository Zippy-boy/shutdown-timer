const shutdowne = require('electron-shutdown-command');

let active = "tillTime"

const tillTimeButton = document.getElementById('tillTime');
const atTimeButton = document.getElementById('atTime');
const enterButton = document.getElementById('enter');

const putItInMeTillTime = document.getElementById('putItInMeTillISayCumOut');
const putItInMeAtTime = document.getElementById('putItInMeAtTimeISay');
const putItInMeLoading = document.getElementById('putItInMeLoading');

// Till Time

const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const hoursIncrement = document.getElementById('incrementHours');
const minutesIncrement = document.getElementById('incrementMinutes');
const secondsIncrement = document.getElementById('incrementSeconds');

const hoursDecrement = document.getElementById('decrementHours');
const minutesDecrement = document.getElementById('decrementMinutes');
const secondsDecrement = document.getElementById('decrementSeconds');

// At Time

const hoursAt = document.getElementById('hour');
const minutesAt = document.getElementById('minute');

const hoursIncrementAt = document.getElementById('incrementHour');
const minutesIncrementAt = document.getElementById('incrementMinute');

const hoursDecrementAt = document.getElementById('decrementHour');
const minutesDecrementAt = document.getElementById('decrementMinute');

// Loading

const currentTime = document.getElementById('currentTime');
const timeTill = document.getElementById('timeTill');
const shutDownTime = document.getElementById('shutDownTime');

// Till Time

hoursIncrement.addEventListener('click', () => {
    if (hours.value == null || hours.value == undefined || hours.value == '') { hours.value = 0; }
    if (hours.value < 24) {
        hours.value = parseInt(hours.value) + 1;
    }
});
minutesIncrement.addEventListener('click', () => {
    if (minutes.value == null || minutes.value == undefined || minutes.value == '') { minutes.value = 0; }
    if (minutes.value < 59) {
        minutes.value = parseInt(minutes.value) + 1;
    }
});
secondsIncrement.addEventListener('click', () => {
    if (seconds.value == null || seconds.value == undefined || seconds.value == '') { seconds.value = 0; }
    if (seconds.value < 59) {
        seconds.value = parseInt(seconds.value) + 1;
    }
});

hoursDecrement.addEventListener('click', () => {
    if (hours.value != 1 && hours.value != 0) {
        hours.value = parseInt(hours.value) - 1;
    } else {
        hours.value = '';
    }
});
minutesDecrement.addEventListener('click', () => {
    if (minutes.value != 1 && minutes.value != 0) {
        minutes.value = parseInt(minutes.value) - 1;
    } else {
        minutes.value = '';
    }
});
secondsDecrement.addEventListener('click', () => {
    if (seconds.value != 1 && seconds.value != 0) {
        seconds.value = parseInt(seconds.value) - 1;
    } else {
        seconds.value = '';
    }
});

function HKeyUp() {
    console.log(hours.value);
    if (hours.value >= 25) {
        hours.value = 24;
    }
}

function MKeyUp() {
    console.log(minutes.value);
    if (minutes.value >= 60) {
        minutes.value = 59;
    }
}

function SKeyUp() {
    console.log(seconds.value);
    if (seconds.value >= 60) {
        seconds.value = 59;
    }
}


// At Time

hoursIncrementAt.addEventListener('click', () => {
    if (hoursAt.value == null || hoursAt.value == undefined || hoursAt.value == '') { hoursAt.value = 0; }
    if (hoursAt.value < 24) {
        hoursAt.value = parseInt(hoursAt.value) + 1;
    }
});
minutesIncrementAt.addEventListener('click', () => {
    if (minutesAt.value == null || minutesAt.value == undefined || minutesAt.value == '') { minutesAt.value = 0; }
    if (minutesAt.value < 59) {
        minutesAt.value = parseInt(minutesAt.value) + 1;
    }
});

hoursDecrementAt.addEventListener('click', () => {
    if (hoursAt.value != 1 && hoursAt.value != 0) {
        hoursAt.value = parseInt(hoursAt.value) - 1;
    } else {
        hoursAt.value = '';
    }
});
minutesDecrementAt.addEventListener('click', () => {
    if (minutesAt.value != 1 && minutesAt.value != 0) {
        minutesAt.value = parseInt(minutesAt.value) - 1;
    } else {
        minutesAt.value = '';
    }
});

function HKeyUpAt() {
    console.log(hoursAt.value);
    if (hoursAt.value >= 25) {
        hoursAt.value = 24;
    }
}

function MKeyUpAt() {
    console.log(minutesAt.value);
    if (minutesAt.value >= 60) {
        minutesAt.value = 59;
    }
}

// Switching


function tillTimeframe() {
    putItInMeAtTime.style.display = 'none';
    putItInMeTillTime.style.display = 'block';
    active = "tillTime";
}

function atTimeframe() {
    putItInMeTillTime.style.display = 'none';
    putItInMeAtTime.style.display = 'block';
    active = "atTime";
}



async function shutdown() {
    putItInMeLoading.style.display = 'block';
    putItInMeTillTime.style.display = 'none';
    putItInMeAtTime.style.display = 'none';
    atTimeButton.style.display = 'none';
    tillTimeButton.style.display = 'none';
    enterButton.style.display = 'none';

    let totalSeconds = 0;
    console.log({ active })

    if (active == "tillTime") {
        let hoursValue = formatNumber(hours.value);
        let minutesValue = formatNumber(minutes.value);
        let secondsValue = formatNumber(seconds.value);

        console.log({ hoursValue, minutesValue, secondsValue })

        if (hoursValue == null || hoursValue == undefined || hoursValue == '') { hoursValue = 0; }
        if (minutesValue == null || minutesValue == undefined || minutesValue == '') { minutesValue = 0; }
        if (secondsValue == null || secondsValue == undefined || secondsValue == '') { secondsValue = 0; }
        totalSeconds = (hoursValue * 60 * 60) + (minutesValue * 60) + secondsValue;
        console.log(totalSeconds);
        await shutdownBack(totalSeconds);

    } else if (active == "atTime") {
        const now = Date.now();
        console.log(now);

        let hoursValue = hoursAt.value;
        let minutesValue = minutesAt.value;

        if (hoursValue == null || hoursValue == undefined || hoursValue == '') { hoursValue = 0; }
        if (minutesValue == null || minutesValue == undefined || minutesValue == '') { minutesValue = 0; }

        let timeInseconds = new Date().getTime() / 1000;
        let timeInsecondsFrom = new Date().setHours(hoursValue, minutesValue, 0, 0) / 1000;
        let totalSeconds = timeInsecondsFrom - timeInseconds;
        if (totalSeconds < 0) {
            totalSeconds = totalSeconds + 86400;
        }
        console.log(totalSeconds);
        await shutdownBack(totalSeconds);

    };

}



async function shutdownBack(totalSeconds) {
    let date = new Date();
    let time = date.getTime();

    timeTill.innerHTML = `${secsToOther(totalSeconds)}`;

    currentTime.innerHTML = currentTimeFormat();

    shutDownTime.innerHTML = shutDownTimeFormat(totalSeconds, time);


    let secs = 0
    setInterval(() => {
        secs = secs + 0.5;
        if (secs < totalSeconds) {
            updateProgress(convert(secs, 1, totalSeconds, 1, 100))
            // console.log({ secs });
            // console.log({ totalSeconds });

            // console.log(convert(secs, 1, totalSeconds, 0, 100));
            timeTill.innerHTML = `${secsToOther(totalSeconds - secs)}`;
        } else {
            // stop loop
            clearInterval();
            console.log("done");
        }

        date = new Date();
        time = date.getTime();
        currentTime.innerHTML = currentTimeFormat();

    }, 500);
}

const progressBar = document.querySelector(".progress-bar");

function updateProgress(percentage) {

    progressBar.style.width = `${percentage}%`;

    // Create a progress bar fill animation
    const progressBarFill = document.createElement("div");
    progressBarFill.classList.add("progress-bar-fill");
    progressBarFill.style.backgroundColor = "#272639";
    progressBarFill.style.width = "0%";
    progressBarFill.style.height = "100%";
    progressBarFill.style.borderRadius = "20px";
    //   progressBarFill.style.ma = "0 0 10px #171721";

    // Add the progress bar fill to the progress bar
    progressBar.appendChild(progressBarFill);

    // animate the progress bar fill in the center of the progress bar
    progressBarFill.style.top = "0";
    progressBarFill.style.left = "0";
    progressBarFill.style.position = "absolute";
    progressBarFill.style.animation = "progress-bar-fill 1s linear infinite";
}


// usefull
function formatNumber(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}

function shutDownTimeFormat(totalSeconds, time) {
    // plus the current time in seconds to totalSeconds and then format it
    let date = new Date();
    let time2 = date.getTime();
    let time3 = time2 + (totalSeconds * 1000);
    let date2 = new Date(time3);
    let hours = date2.getHours();
    let minutes = date2.getMinutes();
    let seconds = date2.getSeconds();
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');

}

function currentTimeFormat() {
    let date = new Date();
    let time = date.getTime();
    // in 01:23:45 format
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
}

function secsToOther(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    seconds = Math.round(seconds);


    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
}


function convert(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min) / (
        in_max - in_min
    ) + out_min)
}