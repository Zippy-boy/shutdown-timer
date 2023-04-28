const shutdowne = require('electron-shutdown-command');

const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const hoursIncrement = document.getElementById('incrementHours');
const minutesIncrement = document.getElementById('incrementMinutes');
const secondsIncrement = document.getElementById('incrementSeconds');

const hoursDecrement = document.getElementById('decrementHours');
const minutesDecrement = document.getElementById('decrementMinutes');
const secondsDecrement = document.getElementById('decrementSeconds');


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


async function shutdown() {
    let hoursValue = hours.value;
    let minutesValue = minutes.value;
    let secondsValue = seconds.value;
    if (hours.value == null || hours.value == undefined || hours.value == '') { hoursValue = 0; }
    if (minutes.value == null || minutes.value == undefined || minutes.value == '') { minutesValue = 0; }
    if (seconds.value == null || seconds.value == undefined || seconds.value == '') { secondsValue = 0; }

    let totalSeconds = (hoursValue * 60 * 60) + (minutesValue * 60) + secondsValue;
    console.log(totalSeconds);

    // Create a timer that will fire after the specified amount of time.
    let timer = setTimeout(() => {
        // When the timer fires, call the shutdown function.
        console.log("shutdowne.shutdown();")
    }, totalSeconds * 1000);

    // Return a promise that will be resolved when the timer fires.
    return new Promise((resolve, reject) => {
        timer.on('timeout', resolve);
        timer.on('error', reject);
    });
}

function loadContainer(containerId) {
    // Get the container element by ID.
    const container = document.getElementById(containerId);

    // Load the HTML file for the container.
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${containerId}.html`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // The request was successful.
            const containerContent = xhr.responseText;
            container.innerHTML = containerContent;
        } else {
            // The request failed.
            alert("Error loading container: " + xhr.status);
        }
    };
    xhr.send();
}